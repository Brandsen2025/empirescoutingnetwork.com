#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Builds and splices the Portugal Primeira Divisão 1988-89 (533 players) and
France Division 1 1988-89 (415 players) historical batch into the Empire
Scouting Network platform, following the exact pattern already established
by the Argentina 1989-90/1995-96 (El Gráfico) batch.

Run from the repo root:  python3 build_1988_89_batch.py [--dry-run]
"""
import json, re, sys, os, unicodedata, html, datetime

DRY_RUN = "--dry-run" in sys.argv

ROOT = os.path.dirname(os.path.abspath(__file__))

# ---------------------------------------------------------------------------
# Data
# ---------------------------------------------------------------------------
PT = json.load(open(os.path.join(ROOT, "portugal_1988_89_all.json"), encoding="utf-8"))
FR = json.load(open(os.path.join(ROOT, "france_1988_89_all.json"), encoding="utf-8"))

for p in PT:
    p["_country"] = "PT"
for p in FR:
    p["_country"] = "FR"

ALL = PT + FR
print(f"Loaded {len(PT)} Portugal + {len(FR)} France = {len(ALL)} players")

# ---------------------------------------------------------------------------
# Existing-profile lookup (platform.html EXISTING_PROFILES set)
# ---------------------------------------------------------------------------
platform_html = open(os.path.join(ROOT, "platform.html"), encoding="utf-8").read()
m_start = platform_html.find("const EXISTING_PROFILES=new Set([")
m_open = m_start + len("const EXISTING_PROFILES=new Set(")
m_close = platform_html.find("])", m_open)
existing_files = re.findall(r'"([^"]+)"', platform_html[m_open:m_close+1])
print(f"EXISTING_PROFILES: {len(existing_files)} files")


def strip_accents(s):
    return "".join(c for c in unicodedata.normalize("NFD", s) if unicodedata.category(c) != "Mn")


def norm(s):
    s = strip_accents(s)
    s = s.lower()
    s = re.sub(r"[^a-z0-9]+", "_", s).strip("_")
    return s


def base_name(name):
    return re.sub(r"\s*\([^)]*\)\s*", " ", name).strip()


existing_map = {}
for fn in existing_files:
    base = fn[:-5] if fn.endswith(".html") else fn
    existing_map.setdefault(norm(base), []).append(fn)

# Manually verified categorisation of the 13 exact-name matches against
# EXISTING_PROFILES (checked by hand: 2 are bio-stub RECORDS-architecture
# pages from the Argentina batch -- append a RECORDS entry; 11 are full
# hand-authored "Empire FGA Profile (Expanded)" pages with no RECORDS
# array at all -- append an additive historical-record <section> instead,
# never touching their existing content/structure).
RECORDS_APPEND = {"Alberto Marcico", "Jorge Burruchaga"}
FULL_PROFILE_APPEND = {
    "Rabah Madjer", "Jean Tigana", "Eric Cantona", "Philippe Vercruysse",
    "Abedi Pelé (Ayew)", "Klaus Allofs", "Manuel Amoros", "Glenn Hoddle",
    "Carlos Valderrama", "Roger Milla", "Enzo Francescoli",
}

matches = {}
for p in ALL:
    key = norm(base_name(p["name"]))
    if key in existing_map:
        matches[p["name"]] = existing_map[key][0]

print(f"Exact-name matches against EXISTING_PROFILES: {len(matches)}")
for n, f in matches.items():
    tag = "RECORDS_APPEND" if n in RECORDS_APPEND else ("FULL_PROFILE_APPEND" if n in FULL_PROFILE_APPEND else "**UNCATEGORISED**")
    print(f"  {n!r} -> {f}  [{tag}]")
    if tag == "**UNCATEGORISED**":
        raise SystemExit(f"New/unexpected match not in either category: {n!r} -> {f}. Aborting -- categorise by hand first.")

NEW_PLAYERS = [p for p in ALL if p["name"] not in matches]
print(f"New standalone pages to build: {len(NEW_PLAYERS)}")

# ---------------------------------------------------------------------------
# Filename generation + collision check
# ---------------------------------------------------------------------------
def filename_for(name):
    bn = base_name(name)
    fn = bn.replace(" ", "_") + ".html"
    return fn

seen = {}
collisions = []
for p in NEW_PLAYERS:
    fn = filename_for(p["name"])
    key = norm(fn[:-5])
    if key in seen:
        collisions.append((p["name"], p["club"], seen[key]))
    else:
        seen[key] = (p["name"], p["club"])
    p["_filename"] = fn

if collisions:
    print(f"\n!!! {len(collisions)} FILENAME COLLISIONS within the new batch:")
    for c in collisions:
        print("  ", c)
    raise SystemExit("Aborting -- resolve collisions by hand before proceeding.")
else:
    print("No filename collisions within the new batch.")

# Also double check: none of the new filenames already exist as a file on
# disk (belt & braces beyond the EXISTING_PROFILES check above).
disk_collisions = []
for p in NEW_PLAYERS:
    fp = os.path.join(ROOT, p["_filename"])
    if os.path.exists(fp):
        existing_content = open(fp, encoding="utf-8").read()
        if "Empire FGA Bio Stub" in existing_content and "1988-89" in existing_content:
            pass  # our own output from an earlier (partial/crashed) run of this exact script -- safe to overwrite
        else:
            disk_collisions.append(p["_filename"])
if disk_collisions:
    print(f"\n!!! {len(disk_collisions)} new filenames collide with a DIFFERENT existing file on disk:")
    for f in disk_collisions:
        print("  ", f)
    raise SystemExit("Aborting -- these would overwrite existing files not created by this script.")
else:
    print("No on-disk filename collisions (any pre-existing files are this script's own prior output).")

# ---------------------------------------------------------------------------
# Nationality adjective -> 3-letter code, and position -> GK/DF/MF/FW
# ---------------------------------------------------------------------------
NAT_MAP = {
    "Português": "POR", "Portugais": "POR",
    "Brasileiro": "BRA", "Brésilien": "BRA",
    "Angolano": "ANG", "Cabo-verdiano": "CPV", "Moçambicano": "MOZ",
    "Guineense": "GNB", "Zairense": "ZAI", "Zaïrois": "ZAI",
    "Sul-africano": "RSA", "Espanhol": "ESP", "Inglês": "ENG", "Anglais": "ENG",
    "Holandês": "NED", "Néerlandais": "NED", "Búlgaro": "BUL",
    "Húngaro": "HUN", "Hongrois": "HUN", "Polaco": "POL", "Polonais": "POL",
    "Dinamarquês": "DEN", "Danois": "DEN", "Sueco": "SWE", "Egípcio": "EGY",
    "Maltês": "MLT", "Marroquino": "MAR", "Marocain": "MAR",
    "Argelino": "ALG", "Algérien": "ALG", "Nigeriano": "NGA",
    "Venezuelano": "VEN", "Paraguaio": "PAR", "Uruguaio": "URU", "Uruguayen": "URU",
    "Jugoslavo": "YUG", "Yougoslave": "YUG", "Malgache": "MAD", "Gabonais": "GAB",
    "Français": "FRA", "Allemand": "GER", "Belga": "BEL", "Belge": "BEL",
    "Argentin": "ARG", "Colombien": "COL", "Britannique": "ENG",
    "Camerounais": "CMR", "Ivoirien": "CIV", "Sénégalais": "SEN",
    "Ghanéen": "GHA", "Libérien": "LBR", "Soviétique": "URS", "Suisse": "SUI",
}
POS_MAP = {"GR": "GK", "DEF": "DF", "MED": "MF", "AV": "FW",
           "G": "GK", "D": "DF", "M": "MF", "A": "FW"}


def nat3(p):
    n = NAT_MAP.get(p["nat"])
    if n == "ENG" and re.search(r"Écosse|Scotland|Glasgow|Bellshill", p.get("birthplace", "")):
        return "SCO"
    return n or "UNK"


def flag_for(country):
    return "🇵🇹" if country == "PT" else "🇫🇷"


def league_for(country):
    return "Primeira Divisão" if country == "PT" else "Division 1"


def country_name(country):
    return "Portugal" if country == "PT" else "France"


def source_label(country):
    return "A Bola — Guia do Campeonato 1988-89" if country == "PT" else "France Football — Guide de la saison 1988-89"


def source_table_label(country):
    return "QUADRO DE JOGADORES" if country == "PT" else "L'effectif"


def dob_ddmmyy(iso):
    # iso is YYYY-MM-DD -> "D-M-YY" (matches the source magazines' own
    # date style, and the Argentina batch's "2-4-63" convention).
    y, mth, d = iso.split("-")
    return f"{int(d)}-{int(mth)}-{y[2:]}"


def slug(s):
    return re.sub(r"-+", "-", re.sub(r"[^a-z0-9]+", "-", strip_accents(s).lower())).strip("-")


print("\nSample nat mapping check (should show no UNK):")
unk = sorted(set(p["nat"] for p in ALL if nat3(p) == "UNK"))
if unk:
    print("  UNKNOWN nat adjectives:", unk)
    raise SystemExit("Aborting -- extend NAT_MAP for the adjectives above.")
else:
    print("  OK -- every nat adjective maps to a code.")

if DRY_RUN:
    print("\n--dry-run: stopping before any writes.")
    sys.exit(0)

# ---------------------------------------------------------------------------
# New standalone bio-stub page template (mirrors the Argentina/El Gráfico
# batch's Abelardo_Eliseo_Vallejos.html template exactly: same CSS, same
# RECORDS/renderRecord/season-select JS pattern; only the source-specific
# wording and the single-row season table differ).
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
      <div class="section">
        <div class="info-row"><span class="info-label">Height / Weight</span><span class="info-value">Not stated in source</span></div>
        <div class="info-row"><span class="info-label">Nationality</span><span class="info-value">{nat3} (inferred from birthplace/printed nationality)</span></div>
        <div class="info-row"><span class="info-label">Position</span><span class="info-value">{pos} (as printed &mdash; source table section, not inferred)</span></div>
      </div>
    </div>
  </div>

  <div>
    <div class="card">
      <div class="banner banner-warn">
        <b>This is a bio stub, not a graded Empire FGA profile.</b> There is no video evidence behind this page &mdash; no OBI/SII, no core-12 sub-metrics, no ultProxy. Every field below comes from a single secondary source: <i>{source_esc}</i>. Facts (birthdates, birthplaces, position) are reproduced directly since facts aren't copyrightable.
      </div>
      <div class="banner banner-info">
        Part of a full-league {country} 1988-89 batch: all 20 clubs of that season's top flight, transcribed club-by-club from the guide's "{table_label_esc}" roster tables (scope confirmed against the guide's own final league table, which lists the same 20 clubs).
      </div>

      <select id="season-select" hidden></select>
      <div id="season-record-body">
{body_html}
      </div>

    </div>

    <div class="card section">
      <h2>Source</h2>
      <p class="small">
        {source_esc} (contemporary season guide). Uploaded by Jim Totime, September 2026. Cross-reference against a modern source (Transfermarkt / RSSSF) recommended before this is used for anything client-facing &mdash; this stub has not been independently verified against a second source.
      </p>
    </div>
  </div>
</div>

<footer>
  <p style="color:var(--muted);font-size:13px;"><strong style="color:var(--accent2);">Empire FGA Scouting Network</strong> &mdash; Bio stub, not Tier-3 graded</p>
</footer>

<script>
var RECORDS = [
  {{
    label: {label_js},
    season: {season_js},
    subLine: {sub_line_js},
    bodyHtml: {body_html_js}
  }}
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

def season_table_html(p, country):
    src_row_label = "Jogador (as printed)" if country == "PT" else "Joueur (as printed)"
    dob_label = "Data de nascimento" if country == "PT" else "Date de naissance"
    place_label = "Naturalidade" if country == "PT" else "Lieu de naissance"
    nat_label = "Nacionalidade" if country == "PT" else "Nationalité"
    pos_label = "Posição" if country == "PT" else "Poste"
    club_label = "Clube" if country == "PT" else "Club"
    heading = f"Season Record (1988-89, {source_table_label(country)})"
    note = (
        "Transcribed from the club's \"QUADRO DE JOGADORES\" table in the guide. "
        "Position is printed directly in the source table (Guarda-Redes/Defesas/Médios/Avançados), not inferred. "
        "Nationality is the adjective printed in the source (assumed Português when the source prints no annotation)."
        if country == "PT" else
        "Transcribed from the club's \"L'effectif\" table in the guide. "
        "Position is printed directly in the source table (Gardiens/Défenseurs/Milieux/Attaquants), not inferred. "
        "Nationality is the adjective printed in the source (assumed Français when the source prints no annotation)."
    )
    html_block = f'''
        <div class="card section" style="margin-top:0;">
          <h2>{heading}</h2>
          <table>
            <tr><th>{src_row_label}</th><th>{dob_label}</th><th>{place_label}</th><th>{nat_label}</th><th>{pos_label}</th><th>{club_label}</th></tr>
            <tr><td>{html.escape(p["name"])}</td><td>{dob_ddmmyy(p["birth"])}</td><td>{html.escape(p["birthplace"])}</td><td>{html.escape(p["nat"])}</td><td>{p["pos"]}</td><td>{html.escape(p["club"])}</td></tr>
          </table>
          <p class="small" style="margin-top:10px;">{note}</p>
        </div>
'''
    return html_block


def js_str(s):
    return json.dumps(s, ensure_ascii=False)


def build_page(p):
    country = p["_country"]
    name_esc = html.escape(p["name"])
    sub_line = f'b. {dob_ddmmyy(p["birth"])}, {html.escape(p["birthplace"])} ({nat3(p)})'
    body = season_table_html(p, country)
    return PAGE_TEMPLATE.format(
        name_esc=name_esc,
        sub_line_esc=sub_line,
        pos=POS_MAP[p["pos"]],
        nat3=nat3(p),
        source_esc=html.escape(source_label(country)),
        country=country_name(country),
        table_label_esc=html.escape(source_table_label(country)),
        body_html=body,
        label_js=js_str(f"1988-89 ({source_table_label(country)})"),
        season_js=js_str("1988-89"),
        sub_line_js=js_str(sub_line),
        body_html_js=js_str(body),
    )


# ---------------------------------------------------------------------------
# Write the 935 new standalone pages
# ---------------------------------------------------------------------------
written = 0
for p in NEW_PLAYERS:
    path = os.path.join(ROOT, p["_filename"])
    with open(path, "w", encoding="utf-8") as f:
        f.write(build_page(p))
    written += 1
print(f"\nWrote {written} new player pages.")

# ---------------------------------------------------------------------------
# RECORDS-append: Alberto Marcico (Toulouse) and Jorge Burruchaga (Nantes)
# ---------------------------------------------------------------------------
records_append_players = {p["name"]: p for p in ALL if p["name"] in RECORDS_APPEND}
for name, target_file in matches.items():
    if name not in RECORDS_APPEND:
        continue
    p = records_append_players[name]
    country = p["_country"]
    path = os.path.join(ROOT, target_file)
    content = open(path, encoding="utf-8").read()
    if "var RECORDS = [" not in content:
        raise SystemExit(f"{target_file}: expected 'var RECORDS = [' not found -- architecture mismatch, aborting.")
    idempotency_marker = f"1988-89 ({source_table_label(country)})"
    if idempotency_marker in content:
        print(f"SKIP (already applied): {target_file}")
        continue
    sub_line = f'b. {dob_ddmmyy(p["birth"])}, {html.escape(p["birthplace"])} ({nat3(p)})'
    body = season_table_html(p, country)
    new_record = (
        "  {\n"
        f"    label: {js_str(f'1988-89 ({source_table_label(country)})')},\n"
        f"    season: {js_str('1988-89')},\n"
        f"    subLine: {js_str(sub_line)},\n"
        f"    bodyHtml: {js_str(body)}\n"
        "  }"
    )
    marker = "var RECORDS = ["
    idx = content.index(marker) + len(marker)
    content = content[:idx] + "\n" + new_record + "," + content[idx:]
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"RECORDS-appended 1988-89 France season to {target_file}")

# ---------------------------------------------------------------------------
# Full-profile append: additive <section> just before </main>, never
# touching the existing hand-authored content.
# ---------------------------------------------------------------------------
full_profile_players = {p["name"]: p for p in ALL if p["name"] in FULL_PROFILE_APPEND}
for name, target_file in matches.items():
    if name not in FULL_PROFILE_APPEND:
        continue
    p = full_profile_players[name]
    country = p["_country"]
    path = os.path.join(ROOT, target_file)
    content = open(path, encoding="utf-8").read()
    if "</main>" not in content:
        raise SystemExit(f"{target_file}: expected '</main>' not found -- architecture mismatch, aborting.")
    if 'id="hist-1988-89"' in content:
        print(f"SKIP (already applied): {target_file}")
        continue
    src_row_label = "Jogador (as printed)" if country == "PT" else "Joueur (as printed)"
    section = f'''
      <section class="section" aria-labelledby="hist-1988-89">
        <h2 id="hist-1988-89" style="color:var(--accent)">1988-89 Season &mdash; Contemporary Source (Added Sep 2026)</h2>
        <p class="small">The row below is transcribed verbatim from {html.escape(source_label(country))}, a contemporary club-by-club roster guide for that season, as part of a full-league {country_name(country)} 1988-89 historical batch (all 20 top-flight clubs). This is additive context and does not affect the graded analysis above.</p>
        <table>
          <thead><tr><th>{src_row_label}</th><th>Date of birth</th><th>Birthplace</th><th>Nationality</th><th>Position</th><th>Club</th></tr></thead>
          <tbody>
            <tr><td>{html.escape(p["name"])}</td><td>{dob_ddmmyy(p["birth"])}</td><td>{html.escape(p["birthplace"])}</td><td>{html.escape(p["nat"])}</td><td>{POS_MAP[p["pos"]]}</td><td>{html.escape(p["club"])}</td></tr>
          </tbody>
        </table>
      </section>
'''
    content = content.replace("</main>", section + "    </main>", 1)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Full-profile-appended 1988-89 historical section to {target_file}")

# ---------------------------------------------------------------------------
# P-array entries for ALL 948 players (new pages AND the 13 matches --
# matches the Vallejos precedent of a player having multiple P entries,
# one per historical season/source).
# ---------------------------------------------------------------------------
def p_entry(p):
    country = p["_country"]
    birthyear = int(p["birth"][:4])
    age = 1989 - birthyear
    pid = f"{slug(base_name(p['name']))}-{nat3(p).lower()}-{birthyear}-8889"
    obj = {
        "n": base_name(p["name"]),
        "l": league_for(country),
        "c": country_name(country),
        "f": flag_for(country),
        "sq": p["club"],
        "nat": nat3(p),
        "pos": POS_MAP[p["pos"]],
        "age": age,
        "mp": 0, "min": 0, "g": 0, "a": 0, "crdY": 0,
        "fga": None, "ult": None, "tmf": None, "log": None,
        "cci": None, "clu": None, "har": None, "thi": None, "ctx": None,
        "mgr": "", "phil": "",
        "sch": f"Bio stub -- {source_label(country)}, not video-graded",
        "season": "1988-89",
        "pid": pid,
    }
    return json.dumps(obj, ensure_ascii=False, separators=(",", ":"))

p_entries_js = ",".join(p_entry(p) for p in ALL)
print(f"\nBuilt {len(ALL)} P-array entry objects.")

def splice_into_platform(path):
    content = open(path, encoding="utf-8").read()
    if '-8889"' in content:
        print(f"SKIP (already applied): {path}")
        return
    for marker in ("<<<<<<< ", "\n=======\n", ">>>>>>> "):
        if marker in content:
            raise SystemExit(f"{path}: contains a conflict marker, refusing to edit.")
    if len(re.findall(r"const\s+P\s*=\s*\[|var\s+P\s*=\s*\[", content)) != 1:
        raise SystemExit(f"{path}: expected exactly one P array declaration, aborting.")
    m = re.search(r"(var|const)\s+P\s*=\s*\[", content)
    insert_at = m.end()
    content = content[:insert_at] + p_entries_js + "," + content[insert_at:]
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Spliced {len(ALL)} P entries into {path}")

splice_into_platform(os.path.join(ROOT, "platform.html"))
splice_into_platform(os.path.join(ROOT, "platform_es.html"))

# ---------------------------------------------------------------------------
# Mirror EXISTING_PROFILES into platform_es.html too (platform.html's own
# copy will be regenerated authoritatively by scripts/build_directory.py
# right after this script finishes).
# ---------------------------------------------------------------------------
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
print("(regenerates players.html, sitemap.xml, and platform.html's EXISTING_PROFILES)")
