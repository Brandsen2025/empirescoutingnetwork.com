#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Builds and splices France Division 1 1990-91 (421 players, Onze Mondial
Hors-Serie n5) and France Division 1 1995-96 (494 players, FBref) into the
Empire Scouting Network platform, following the same pattern established by
the Argentina/El Grafico batch and the Portugal/France 1988-89 batch.

Differences from the 1988-89 batch this is adapted from:
  - Two seasons instead of two countries; many players appear in BOTH new
    seasons AND/OR already have a page from the 1988-89 batch or an earlier
    hand-authored profile. Person-level grouping (by normalised name) comes
    first; a person's page gets one RECORDS entry per season they appear in.
  - 1995-96 (FBref) has birth YEAR only (no month/day) and NO birthplace at
    all. Per Jim's explicit decision (2026-09-06): birthplace displays
    "Not stated in source"; birth date displays year-only, flagged as
    partial -- never a fabricated full date.
  - 1995-96 also carries real match stats (MP, starts, minutes, goals,
    assists, cards) from FBref's Standard Stats table -- included in the
    season record, unlike the roster-only 1988-89/1990-91 sources.
  - Existing-profile categorisation (RECORDS_APPEND vs FULL_PROFILE_APPEND)
    is auto-detected per matched file (presence of "var RECORDS = [") rather
    than a hand-curated set, because the match count here is much larger.
    Full categorisation is printed for review before any write happens.

Run from the repo root:  python3 scripts/build_9091_9596_batch.py [--dry-run]
"""
import json, re, sys, os, unicodedata, html

DRY_RUN = "--dry-run" in sys.argv
ROOT = os.getcwd()

assert os.path.exists(os.path.join(ROOT, "platform.html")), \
    "Run this from the repo root (platform.html not found in cwd)."

# ---------------------------------------------------------------------------
# Data
# ---------------------------------------------------------------------------
D9091 = json.load(open(os.path.join(ROOT, "france_1990_91_all.json"), encoding="utf-8"))
D9596 = json.load(open(os.path.join(ROOT, "france_1995_96_all.json"), encoding="utf-8"))

for p in D9091:
    p["_season"] = "1990-91"
for p in D9596:
    p["_season"] = "1995-96"

ALL = D9091 + D9596
print(f"Loaded {len(D9091)} (1990-91) + {len(D9596)} (1995-96) = {len(ALL)} season-records")

# ---------------------------------------------------------------------------
# Existing-profile lookup (platform.html EXISTING_PROFILES set)
# ---------------------------------------------------------------------------
platform_html = open(os.path.join(ROOT, "platform.html"), encoding="utf-8").read()
m = re.search(r"const EXISTING_PROFILES=new Set\((\[.*?\])\)", platform_html)
existing_files = json.loads(m.group(1))
print(f"EXISTING_PROFILES: {len(existing_files)} files")


def strip_accents(s):
    return "".join(c for c in unicodedata.normalize("NFD", s) if unicodedata.category(c) != "Mn")


def norm(s):
    s = strip_accents(s).lower()
    s = re.sub(r"[^a-z0-9]+", "_", s).strip("_")
    return s


def base_name(name):
    return re.sub(r"\s*\([^)]*\)\s*", " ", name).strip()


existing_map = {}
for fn in existing_files:
    base = fn[:-5] if fn.endswith(".html") else fn
    existing_map.setdefault(norm(base), []).append(fn)

# ---------------------------------------------------------------------------
# Group season-records by PERSON (normalised name) -- a person with records
# in both 1990-91 and 1995-96 gets ONE page/one set of appended entries,
# not two colliding ones.
# ---------------------------------------------------------------------------
persons = {}  # norm(name) -> {"name": preferred spelling, "records": [p,...]}
for p in ALL:
    key = norm(base_name(p["name"]))
    if key not in persons:
        persons[key] = {"name": base_name(p["name"]), "records": []}
    else:
        # prefer the FBref (1995-96) spelling if it has more accents than
        # the currently stored one (machine-sourced diacritics tend to be
        # more reliable than hand-transcribed magazine spellings)
        cur = persons[key]["name"]
        cand = base_name(p["name"])
        if p["_season"] == "1995-96" and strip_accents(cand) == strip_accents(cur) and cand != cur:
            persons[key]["name"] = cand
    persons[key]["records"].append(p)

print(f"Grouped into {len(persons)} distinct people "
      f"({sum(1 for v in persons.values() if len(v['records'])>1)} appear in both seasons)")

matches = {}       # norm_key -> target filename
new_people = []     # list of norm_keys with no existing page
for key, info in persons.items():
    if key in existing_map:
        matches[key] = existing_map[key][0]
    else:
        new_people.append(key)

print(f"Exact-name matches against EXISTING_PROFILES: {len(matches)}")
print(f"New standalone pages to build: {len(new_people)}")

# ---------------------------------------------------------------------------
# Auto-categorise matches by architecture (printed for manual review)
# ---------------------------------------------------------------------------
RECORDS_APPEND = set()
FULL_PROFILE_APPEND = set()
BODY_APPEND = set()
uncategorised = []
file_cache = {}
for key, fn in matches.items():
    path = os.path.join(ROOT, fn)
    if fn not in file_cache:
        file_cache[fn] = open(path, encoding="utf-8").read()
    content = file_cache[fn]
    if "var RECORDS = [" in content:
        RECORDS_APPEND.add(key)
    elif "</main>" in content:
        FULL_PROFILE_APPEND.add(key)
    elif "</body>" in content:
        BODY_APPEND.add(key)
    else:
        uncategorised.append((key, fn))

print(f"\n  RECORDS_APPEND (bio-stub architecture): {len(RECORDS_APPEND)}")
print(f"  FULL_PROFILE_APPEND (hand-authored, additive section before </main>): {len(FULL_PROFILE_APPEND)}")
print(f"  BODY_APPEND (hand-authored, no <main>, additive section before </body>): {len(BODY_APPEND)}")
if uncategorised:
    print(f"  **UNCATEGORISED** ({len(uncategorised)}):")
    for key, fn in uncategorised:
        print(f"    {persons[key]['name']!r} -> {fn}")
    raise SystemExit("Aborting -- categorise the files above by hand first.")

# ---------------------------------------------------------------------------
# Filenames for new pages + collision checks
# ---------------------------------------------------------------------------
def filename_for(name):
    return name.replace(" ", "_") + ".html"

seen = {}
collisions = []
for key in new_people:
    fn = filename_for(persons[key]["name"])
    fkey = norm(fn[:-5])
    if fkey in seen:
        collisions.append((persons[key]["name"], seen[fkey]))
    else:
        seen[fkey] = persons[key]["name"]
    persons[key]["_filename"] = fn

if collisions:
    print(f"\n!!! {len(collisions)} FILENAME COLLISIONS within the new batch:")
    for c in collisions:
        print("  ", c)
    raise SystemExit("Aborting -- resolve collisions by hand before proceeding.")
print("No filename collisions within the new batch.")

disk_collisions = []
for key in new_people:
    fp = os.path.join(ROOT, persons[key]["_filename"])
    if os.path.exists(fp):
        existing_content = open(fp, encoding="utf-8").read()
        if "Empire FGA Bio Stub" in existing_content and ("1990-91" in existing_content or "1995-96" in existing_content):
            pass  # our own prior (partial/crashed) run
        else:
            disk_collisions.append(persons[key]["_filename"])
if disk_collisions:
    print(f"\n!!! {len(disk_collisions)} new filenames collide with a DIFFERENT existing file on disk:")
    for f in disk_collisions:
        print("  ", f)
    raise SystemExit("Aborting -- these would overwrite existing files not created by this script.")
print("No on-disk filename collisions.")

# ---------------------------------------------------------------------------
# Nationality -> 3-letter code, position -> GK/DF/MF/FW
# ---------------------------------------------------------------------------
NAT_MAP_9091 = {
    "Français": "FRA", "Algérien": "ALG", "Allemand": "GER", "Anglais": "ENG",
    "Argentin": "ARG", "Belge": "BEL", "Brésilien": "BRA", "Béninois": "BEN",
    "Camerounais": "CMR", "Colombien": "COL", "Danois": "DEN", "Espagnol": "ESP",
    "Ghanéen": "GHA", "Guinéen": "GUI", "Hongrois": "HUN", "Ivoirien": "CIV",
    "Libérien": "LBR", "Luxembourgeois": "LUX", "Malien": "MLI", "Marocain": "MAR",
    "Néerlandais": "NED", "Paraguayen": "PAR", "Polonais": "POL", "Portugais": "POR",
    "Soviétique": "URS", "Suédois": "SWE", "Sénégalais": "SEN", "Tchadien": "CHA",
    "Tchécoslovaque": "TCH", "Uruguayen": "URU", "Yougoslave": "YUG", "Écossais": "SCO",
}
FR_TERRITORY_IOC = {"GLP", "GUF", "MTQ"}
POS_PRIMARY = {"G": "GK", "D": "DF", "M": "MF", "A": "FW"}


def nat3(p):
    if p["_season"] == "1995-96":
        code = p["nat_ioc"]
        return "FRA" if code in FR_TERRITORY_IOC else code
    n = NAT_MAP_9091.get(p["nat"])
    return n or "UNK"


def fmt_stat(v):
    if v is None:
        return "—"
    try:
        f = float(v)
        return str(int(f)) if f.is_integer() else str(f)
    except (TypeError, ValueError):
        return str(v)


def pos_gkdfmffw(p):
    raw = p.get("pos")
    if not raw:
        return ""
    first = raw.split("/")[0]
    return POS_PRIMARY.get(first, "")


print("\nSample nat mapping check (should show no UNK):")
unk = sorted(set(p["nat"] for p in D9091 if nat3(p) == "UNK"))
if unk:
    print("  UNKNOWN nat adjectives:", unk)
    raise SystemExit("Aborting -- extend NAT_MAP_9091 for the adjectives above.")
print("  OK -- every 1990-91 nat adjective maps to a code.")


def flag_for(_country="FR"):
    return "🇫🇷"


def league_for(_country="FR"):
    return "Division 1"


def country_name(_country="FR"):
    return "France"


def source_label(season):
    return ("Onze Mondial Hors-Série n°5 — Le Guide du Championnat 90-91"
            if season == "1990-91" else
            "FBref — Championnat de France Division 1 1995-96 (Standard Stats)")


def source_table_label(season):
    return "L'effectif" if season == "1990-91" else "Standard Stats table"


def dob_ddmmyy(iso):
    y, mth, d = iso.split("-")
    return f"{int(d)}-{int(mth)}-{y[2:]}"


def slug(s):
    return re.sub(r"-+", "-", re.sub(r"[^a-z0-9]+", "-", strip_accents(s).lower())).strip("-")


def js_str(s):
    return json.dumps(s, ensure_ascii=False)

if DRY_RUN:
    print("\n--dry-run: stopping before any writes.")
    sys.exit(0)

# ---------------------------------------------------------------------------
# Page template (same skeleton as the 1988-89 batch's bio-stub pages)
# ---------------------------------------------------------------------------
PAGE_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{name_esc} &mdash; Empire FGA Bio Stub</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
:root{{--bg:#071122;--card:#0b1624;--white:#f0f6fc;--muted:#8b949e;--accent1:#0b5bb0;--accent2:#ffd24d;--warn:#ff6b6b;--warnbg:rgba(255,107,107,.08);--warnbd:rgba(255,107,107,.35);}}
*{{margin:0;padding:0;box-sizing:border-box;}}
html,body{{min-height:100%;background:radial-gradient(900px 500px at 8% 12%,rgba(11,91,176,.06),transparent 10%),radial-gradient(800px 400px at 92% 88%,rgba(255,210,77,.04),transparent 8%),var(--bg);color:var(--white);-webkit-font-smoothing:antialiased;font-family:'Inter',sans-serif;}}
header{{max-width:1300px;margin:18px auto;padding:0 22px;display:flex;align-items:center;justify-content:space-between;}}
.header-left{{display:flex;align-items:center;gap:12px;}}
.header-title{{font-size:20px;font-weight:800;color:var(--accent2);}}
.container{{max-width:1300px;margin:18px auto;padding:22px;display:grid;grid-template-columns:340px 1fr;gap:26px;}}
.card{{background:var(--card);padding:18px;border-radius:12px;border:1px solid rgba(255,255,255,.04);margin-bottom:18px;}}
.title{{font-size:30px;font-weight:900;margin:10px 0 4px;color:var(--white);}}
.sub{{color:var(--muted);margin-bottom:10px;font-size:14px;}}
.pill{{display:inline-block;background:rgba(11,91,176,.12);padding:6px 11px;border-radius:999px;font-weight:700;font-size:12px;color:var(--white);margin:4px 6px 4px 0;border:1px solid rgba(255,210,77,.18);}}
table{{width:100%;border-collapse:collapse;margin-top:10px;font-size:13px;}}
th,td{{padding:9px;border:1px solid rgba(255,255,255,.06);vertical-align:top;text-align:left;}}
th{{background:linear-gradient(90deg,rgba(11,91,176,.85),rgba(255,210,77,.85));font-weight:800;color:#071122;}}
.section h2{{font-size:21px;font-weight:800;color:var(--accent2);margin-bottom:12px;}}
.section h3{{font-size:15px;font-weight:700;color:var(--accent2);margin:14px 0 8px;}}
.small{{color:var(--muted);font-size:13.5px;line-height:1.65;}}
.info-row{{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.06);}}
.info-row:last-child{{border-bottom:none;}}
.info-label{{color:var(--muted);font-size:13px;}}
.info-value{{color:var(--white);font-weight:600;font-size:13px;text-align:right;}}
.banner{{border-radius:10px;padding:14px 16px;margin-bottom:16px;font-size:13.5px;line-height:1.6;}}
.banner-warn{{background:var(--warnbg);border:1px solid var(--warnbd);color:#ffd8d8;}}
.banner-info{{background:rgba(11,91,176,.10);border:1px solid rgba(11,91,176,.35);color:#cfe4ff;}}
.banner-gold{{background:rgba(255,210,77,.08);border:1px solid rgba(255,210,77,.45);color:#ffe9ad;}}
.banner b{{color:#fff;}}
select#season-select{{background:var(--card);color:var(--white);border:1px solid rgba(255,210,77,.35);border-radius:8px;padding:7px 10px;font-family:'Inter',sans-serif;font-size:13px;font-weight:600;margin-bottom:14px;}}
footer{{background:var(--card);padding:26px;text-align:center;border-top:1px solid rgba(255,210,77,.12);margin-top:20px;}}
@media (max-width:980px){{.container{{grid-template-columns:1fr;}}}}
</style>
</head>
<body>
<header>
  <div class="header-left"><div class="header-title">EMPIRE FGA SCOUTING NETWORK</div></div>
</header>

<div class="container">
  <div>
    <div class="card">
      <div class="title">{name_esc}</div>
      <div class="sub">{sub_line_esc}</div>
      <span class="pill">BIO STUB &mdash; NOT GRADED</span>
      <span class="pill">{pos}</span>
    </div>
  </div>

  <div>
    <div class="card">
      <div class="banner banner-warn">
        <b>This is a bio stub, not a graded Empire FGA profile.</b> There is no video evidence behind this page &mdash; no OBI/SII, no core-12 sub-metrics, no ultProxy. Facts (birthdates, birthplaces, position, stats) are reproduced directly from the cited source since facts aren't copyrightable.
      </div>

      <select id="season-select" hidden></select>
      <div id="season-record-body">
{body_html}
      </div>

    </div>
  </div>
</div>

<footer>
  <p style="color:var(--muted);font-size:13px;"><strong style="color:var(--accent2);">Empire FGA Scouting Network</strong> &mdash; Bio stub, not Tier-3 graded</p>
</footer>

<script>
var RECORDS = [
{records_js}
];
function renderRecord(i) {{
  var r = RECORDS[i];
  var subEl = document.querySelector('.sub');
  if (subEl) subEl.innerHTML = r.subLine;
  var bodyEl = document.getElementById('season-record-body');
  if (bodyEl) bodyEl.innerHTML = r.bodyHtml;
}}
(function(){{
  var sel = document.getElementById('season-select');
  RECORDS.forEach(function(r, i){{
    var o = document.createElement('option');
    o.value = i; o.textContent = r.label;
    sel.appendChild(o);
  }});
  sel.hidden = false;
  sel.selectedIndex = 0;
  sel.addEventListener('change', function(){{ renderRecord(parseInt(sel.value, 10)); }});
}})();
</script>
</body>
</html>
"""


def season_table_html_9091(p):
    note = ("Transcribed from the club's \"L'effectif\" roster table (grouped Gardiens/Défenseurs/"
            "Milieux/Attaquants, with the \"SELECTIONS A ET ESPOIRS\" column) in the guide. Position is "
            "printed directly in the source table, not inferred. Nationality: an explicit foreign cap "
            "marker or foreign birthplace with a former foreign club is used to infer non-French "
            "nationality; otherwise assumed Français (including players born in French overseas "
            "territories, who are French citizens).")
    return f'''
        <div class="card section" style="margin-top:0;">
          <h2>Season Record (1990-91, {source_table_label("1990-91")})</h2>
          <table>
            <tr><th>Joueur (as printed)</th><th>Date de naissance</th><th>Lieu de naissance</th><th>Nationalité</th><th>Poste</th><th>Club</th></tr>
            <tr><td>{html.escape(p["name"])}</td><td>{dob_ddmmyy(p["birth"])}</td><td>{html.escape(p["birthplace"])}</td><td>{html.escape(p["nat"])}</td><td>{p["pos"]}</td><td>{html.escape(p["club"])}</td></tr>
          </table>
          <p class="small" style="margin-top:10px;">{note}</p>
        </div>
'''


def season_table_html_9596(p):
    birth_disp = f'{p["birth_year"]} (year only — source gives no month/day)' if p.get("birth_year") else "Not stated in source"
    place_disp = "Not stated in source"
    stat = lambda k: ("—" if p.get(k) is None else (int(p[k]) if float(p[k]).is_integer() else p[k]))
    note = ("Transcribed from FBref's Standard Stats table for Division 1 1995-96. FBref's export gives "
            "birth YEAR only (no month/day) and no birthplace at all — both shown as \"not stated in "
            "source\" rather than guessed. Position and stats are printed directly from the source table.")
    return f'''
        <div class="card section" style="margin-top:0;">
          <h2>Season Record (1995-96, {source_table_label("1995-96")})</h2>
          <table>
            <tr><th>Player (as printed)</th><th>Birth year</th><th>Birthplace</th><th>Nationality</th><th>Position</th><th>Club</th></tr>
            <tr><td>{html.escape(p["name"])}</td><td>{birth_disp}</td><td>{place_disp}</td><td>{html.escape(p["nat"])}</td><td>{html.escape(p["pos"] or "Not stated in source")}</td><td>{html.escape(p["club"])}</td></tr>
          </table>
          <table style="margin-top:10px;">
            <tr><th>MP</th><th>Starts</th><th>Min</th><th>Gls</th><th>Ast</th><th>Yellow</th><th>Red</th></tr>
            <tr><td>{stat("mp")}</td><td>{stat("starts")}</td><td>{stat("minutes")}</td><td>{stat("goals")}</td><td>{stat("assists")}</td><td>{stat("yellow")}</td><td>{stat("red")}</td></tr>
          </table>
          <p class="small" style="margin-top:10px;">{note}</p>
        </div>
'''


def record_for(p):
    season = p["_season"]
    if season == "1990-91":
        sub_line = f'b. {dob_ddmmyy(p["birth"])}, {html.escape(p["birthplace"])} ({nat3(p)})'
        body = season_table_html_9091(p)
        label = f'1990-91 ({source_table_label("1990-91")})'
    else:
        yr = p.get("birth_year")
        sub_line = f'b. {yr} (year only) — birthplace not stated in source ({nat3(p)})' if yr else f'Birth date not stated in source ({nat3(p)})'
        body = season_table_html_9596(p)
        label = f'1995-96 ({source_table_label("1995-96")})'
    return {
        "label": label,
        "season": season,
        "subLine": sub_line,
        "bodyHtml": body,
        "pos_display": (p["pos"] if season == "1990-91" else (p["pos"] or "Not stated in source")),
    }


def js_record(r):
    return ("  {\n"
            f"    label: {js_str(r['label'])},\n"
            f"    season: {js_str(r['season'])},\n"
            f"    subLine: {js_str(r['subLine'])},\n"
            f"    bodyHtml: {js_str(r['bodyHtml'])}\n"
            "  }")


def build_page(person_records, name):
    records = [record_for(p) for p in sorted(person_records, key=lambda p: p["_season"])]
    first = records[0]
    return PAGE_TEMPLATE.format(
        name_esc=html.escape(name),
        sub_line_esc=first["subLine"],
        pos=first["pos_display"],
        body_html=first["bodyHtml"],
        records_js=",\n".join(js_record(r) for r in records),
    )


# ---------------------------------------------------------------------------
# Write new standalone pages
# ---------------------------------------------------------------------------
written = 0
for key in new_people:
    info = persons[key]
    path = os.path.join(ROOT, info["_filename"])
    with open(path, "w", encoding="utf-8") as f:
        f.write(build_page(info["records"], info["name"]))
    written += 1
print(f"\nWrote {written} new player pages.")

# ---------------------------------------------------------------------------
# RECORDS-append (bio-stub architecture matches)
# ---------------------------------------------------------------------------
appended_records = 0
for key in RECORDS_APPEND:
    info = persons[key]
    target_file = matches[key]
    path = os.path.join(ROOT, target_file)
    content = open(path, encoding="utf-8").read()
    if "var RECORDS = [" not in content:
        raise SystemExit(f"{target_file}: expected 'var RECORDS = [' not found -- architecture mismatch, aborting.")
    for p in sorted(info["records"], key=lambda p: p["_season"]):
        r = record_for(p)
        idempotency_marker = r["label"]
        if idempotency_marker in content:
            continue
        marker = "var RECORDS = ["
        idx = content.index(marker) + len(marker)
        content = content[:idx] + "\n" + js_record(r) + "," + content[idx:]
        appended_records += 1
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
print(f"RECORDS-appended {appended_records} season records across {len(RECORDS_APPEND)} existing bio-stub pages.")

# ---------------------------------------------------------------------------
# Full-profile append (hand-authored pages, additive <section>)
# ---------------------------------------------------------------------------
appended_sections = 0
for key in FULL_PROFILE_APPEND:
    info = persons[key]
    target_file = matches[key]
    path = os.path.join(ROOT, target_file)
    content = open(path, encoding="utf-8").read()
    if "</main>" not in content:
        raise SystemExit(f"{target_file}: expected '</main>' not found -- architecture mismatch, aborting.")
    for p in sorted(info["records"], key=lambda p: p["_season"]):
        season = p["_season"]
        anchor = f"hist-{season.replace('-', '')}"
        if f'id="{anchor}"' in content:
            continue
        if season == "1990-91":
            body_table = f'''
        <table>
          <thead><tr><th>Joueur (as printed)</th><th>Date of birth</th><th>Birthplace</th><th>Nationality</th><th>Position</th><th>Club</th></tr></thead>
          <tbody>
            <tr><td>{html.escape(p["name"])}</td><td>{dob_ddmmyy(p["birth"])}</td><td>{html.escape(p["birthplace"])}</td><td>{html.escape(p["nat"])}</td><td>{POS_PRIMARY.get(p["pos"],p["pos"])}</td><td>{html.escape(p["club"])}</td></tr>
          </tbody>
        </table>'''
        else:
            yr = p.get("birth_year")
            birth_disp = f'{yr} (year only)' if yr else "Not stated in source"
            body_table = f'''
        <table>
          <thead><tr><th>Player (as printed)</th><th>Birth year</th><th>Birthplace</th><th>Nationality</th><th>Position</th><th>Club</th><th>MP</th><th>Min</th><th>Gls</th><th>Ast</th></tr></thead>
          <tbody>
            <tr><td>{html.escape(p["name"])}</td><td>{birth_disp}</td><td>Not stated in source</td><td>{html.escape(p["nat"])}</td><td>{html.escape(p["pos"] or "Not stated in source")}</td><td>{html.escape(p["club"])}</td><td>{fmt_stat(p.get("mp"))}</td><td>{fmt_stat(p.get("minutes"))}</td><td>{fmt_stat(p.get("goals"))}</td><td>{fmt_stat(p.get("assists"))}</td></tr>
          </tbody>
        </table>'''
        section = f'''
      <section class="section" aria-labelledby="{anchor}">
        <h2 id="{anchor}" style="color:var(--accent)">{season} Season &mdash; Contemporary Source (Added Sep 2026)</h2>
        <p class="small">The row below is transcribed from {html.escape(source_label(season))}, as part of a full-league France Division 1 {season} historical batch (all 20 top-flight clubs). This is additive context and does not affect the graded analysis above.</p>{body_table}
      </section>
'''
        content = content.replace("</main>", section + "    </main>", 1)
        appended_sections += 1
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
print(f"Full-profile-appended {appended_sections} season sections across {len(FULL_PROFILE_APPEND)} existing hand-authored pages.")

# ---------------------------------------------------------------------------
# Body-append (hand-authored pages with no <main>, additive section right
# before </body> instead -- same additive/non-destructive principle).
# ---------------------------------------------------------------------------
appended_body_sections = 0
for key in BODY_APPEND:
    info = persons[key]
    target_file = matches[key]
    path = os.path.join(ROOT, target_file)
    content = open(path, encoding="utf-8").read()
    if "</body>" not in content:
        raise SystemExit(f"{target_file}: expected '</body>' not found -- architecture mismatch, aborting.")
    for p in sorted(info["records"], key=lambda p: p["_season"]):
        season = p["_season"]
        anchor = f"hist-{season.replace('-', '')}"
        if f'id="{anchor}"' in content:
            continue
        if season == "1990-91":
            body_table = f'''
        <table>
          <thead><tr><th>Joueur (as printed)</th><th>Date of birth</th><th>Birthplace</th><th>Nationality</th><th>Position</th><th>Club</th></tr></thead>
          <tbody>
            <tr><td>{html.escape(p["name"])}</td><td>{dob_ddmmyy(p["birth"])}</td><td>{html.escape(p["birthplace"])}</td><td>{html.escape(p["nat"])}</td><td>{POS_PRIMARY.get(p["pos"],p["pos"])}</td><td>{html.escape(p["club"])}</td></tr>
          </tbody>
        </table>'''
        else:
            yr = p.get("birth_year")
            birth_disp = f'{yr} (year only)' if yr else "Not stated in source"
            body_table = f'''
        <table>
          <thead><tr><th>Player (as printed)</th><th>Birth year</th><th>Birthplace</th><th>Nationality</th><th>Position</th><th>Club</th><th>MP</th><th>Min</th><th>Gls</th><th>Ast</th></tr></thead>
          <tbody>
            <tr><td>{html.escape(p["name"])}</td><td>{birth_disp}</td><td>Not stated in source</td><td>{html.escape(p["nat"])}</td><td>{html.escape(p["pos"] or "Not stated in source")}</td><td>{html.escape(p["club"])}</td><td>{fmt_stat(p.get("mp"))}</td><td>{fmt_stat(p.get("minutes"))}</td><td>{fmt_stat(p.get("goals"))}</td><td>{fmt_stat(p.get("assists"))}</td></tr>
          </tbody>
        </table>'''
        section = f'''
<section class="section" aria-labelledby="{anchor}" style="max-width:1300px;margin:18px auto;padding:22px;">
  <h2 id="{anchor}" style="color:#ffd24d">{season} Season &mdash; Contemporary Source (Added Sep 2026)</h2>
  <p style="color:#8b949e;font-size:13.5px;line-height:1.65;">The row below is transcribed from {html.escape(source_label(season))}, as part of a full-league France Division 1 {season} historical batch (all 20 top-flight clubs). This is additive context appended after the existing graded profile above and does not affect it.</p>{body_table}
</section>
'''
        content = content.replace("</body>", section + "</body>", 1)
        appended_body_sections += 1
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
print(f"Body-appended {appended_body_sections} season sections across {len(BODY_APPEND)} existing hand-authored pages.")

# ---------------------------------------------------------------------------
# P-array entries: one per season-record (915 total)
# ---------------------------------------------------------------------------
def p_entry(p):
    season = p["_season"]
    season_tag = season.replace("-", "")
    if season == "1990-91":
        birthyear = int(p["birth"][:4])
        age = 1990 - birthyear
    else:
        birthyear = p.get("birth_year")
        age = (1995 - birthyear) if birthyear else None
    pid = f"{slug(base_name(p['name']))}-{nat3(p).lower()}-{birthyear or 'unk'}-{season_tag}"
    obj = {
        "n": base_name(p["name"]),
        "l": league_for(), "c": country_name(), "f": flag_for(),
        "sq": p["club"], "nat": nat3(p), "pos": pos_gkdfmffw(p),
        "age": age,
        "mp": int(p["mp"]) if season == "1995-96" and p.get("mp") is not None else 0,
        "min": int(p["minutes"]) if season == "1995-96" and p.get("minutes") is not None else 0,
        "g": int(p["goals"]) if season == "1995-96" and p.get("goals") is not None else 0,
        "a": int(p["assists"]) if season == "1995-96" and p.get("assists") is not None else 0,
        "crdY": int(p["yellow"]) if season == "1995-96" and p.get("yellow") is not None else 0,
        "fga": None, "ult": None, "tmf": None, "log": None,
        "cci": None, "clu": None, "har": None, "thi": None, "ctx": None,
        "mgr": "", "phil": "",
        "sch": f"Bio stub -- {source_label(season)}, not video-graded",
        "season": season,
        "pid": pid,
    }
    return json.dumps(obj, ensure_ascii=False, separators=(",", ":"))

p_entries_js = ",".join(p_entry(p) for p in ALL)
print(f"\nBuilt {len(ALL)} P-array entry objects.")

def splice_into_platform(path):
    content = open(path, encoding="utf-8").read()
    if '-9091"' in content or '-9596"' in content:
        print(f"SKIP (already applied): {path}")
        return
    for marker in ("<<<<<<< ", "\n=======\n", ">>>>>>> "):
        if marker in content:
            raise SystemExit(f"{path}: contains a conflict marker, refusing to edit.")
    if len(re.findall(r"const\s+P\s*=\s*\[|var\s+P\s*=\s*\[", content)) != 1:
        raise SystemExit(f"{path}: expected exactly one P array declaration, aborting.")
    m2 = re.search(r"(var|const)\s+P\s*=\s*\[", content)
    insert_at = m2.end()
    content = content[:insert_at] + p_entries_js + "," + content[insert_at:]
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Spliced {len(ALL)} P entries into {path}")

splice_into_platform(os.path.join(ROOT, "platform.html"))
splice_into_platform(os.path.join(ROOT, "platform_es.html"))

def update_existing_profiles_es():
    path = os.path.join(ROOT, "platform_es.html")
    content = open(path, encoding="utf-8").read()
    all_files = sorted(f for f in os.listdir(ROOT) if f.endswith(".html"))
    new_line = "const EXISTING_PROFILES=new Set(" + json.dumps(all_files, ensure_ascii=False) + ");"
    pattern = re.compile(r"const EXISTING_PROFILES=new Set\(.*?\);")
    if pattern.search(content):
        content = pattern.sub(new_line, content, count=1)
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated EXISTING_PROFILES in platform_es.html ({len(all_files)} files)")
    else:
        print("WARNING: EXISTING_PROFILES not found in platform_es.html -- skipped.")

update_existing_profiles_es()

print("\nDone. Now run:  python3 scripts/build_directory.py")
