#!/usr/bin/env python3
"""
Batch patch: Enner Valencia, Samson Kpardeh, Jonathan Jimenez, Mexx Meerdink,
Lee Seung-Woo, Mateo Chavez.

Applies identical P-array / CLUBS / EXISTING_PROFILES mutations to
platform.html and platform_es.html, and players.html directory + reportPdf
wiring. Run from the directory containing platform.html, platform_es.html,
players.html. Writes *_new.html outputs (does not overwrite inputs).
"""
import json
import re
import sys

P_MARKER = 'const P    = '
EP_PREFIX = 'const EXISTING_PROFILES=new Set(['
CLUBS_MARKER = 'const CLUBS={'


_DECODER = json.JSONDecoder()


def find_array_bounds(content, marker):
    # Fast path: use the C-accelerated json scanner via raw_decode instead of a
    # per-character Python loop (the latter takes 30+ seconds on this machine for
    # a 33MB file -- raw_decode does the same job in well under a second).
    start = content.index(marker) + len(marker)
    obj, end = _DECODER.raw_decode(content, start)
    return start, end


PAIRING_JIMENEZ = [
    {"name": "Hwang Hee-chan", "pct": 77, "primary": True},
    {"name": "Nicolás González", "pct": 75, "primary": False},
    {"name": "Sadio Mané", "pct": 72, "primary": False},
    {"name": "Kingsley Coman", "pct": 70, "primary": False},
]
PAIRING_LEE = [
    {"name": "Takashi Inui", "pct": 78, "primary": True},
    {"name": "Santi Cazorla", "pct": 74, "primary": False},
    {"name": "Jay-Jay Okocha", "pct": 71, "primary": False},
]
PAIRING_MEERDINK = [
    {"name": "Davor Šuker", "pct": 81, "primary": True},
    {"name": "Arkadiusz Milik", "pct": 78, "primary": False},
    {"name": "Robbie Fowler", "pct": 76, "primary": False},
    {"name": "Martín Palermo", "pct": 73, "primary": False},
    {"name": "Toni Polster", "pct": 71, "primary": False},
    {"name": "Fabrizio Ravanelli", "pct": 68, "primary": False},
    {"name": "El Loco Abreu", "pct": 65, "primary": False},
]
PAIRING_VALENCIA = [
    {"name": "Christian \"Chucho\" Benítez", "pct": 86, "primary": True},
    {"name": "Nelson Haedo Valdez", "pct": 82, "primary": False},
    {"name": "Eduardo Vargas", "pct": 78, "primary": False},
    {"name": "Mario Jardel", "pct": 76, "primary": False},
    {"name": "Salomón Rondón", "pct": 74, "primary": False},
]
PAIRING_KPARDEH = [
    {"name": "Sadio Mané", "pct": 84, "primary": True},
    {"name": "Kamaldeen Sulemana", "pct": 78, "primary": False},
    {"name": "Bruma", "pct": 76, "primary": False},
    {"name": "Cobi Jones", "pct": 74, "primary": False},
]

SCH_JIMENEZ = (
    "2026-09-28: Tier 1 refreshed from Empire FGA Scouting Report ESN-JIM-2026-001 "
    "(single-match video assessment, analyst Jim Totime). Season line updated from an "
    "2026-08-19 FBref snapshot (18 apps) to the report's later 2026 total (26 apps). "
    "Tier 3: mean quality 9.31 from 13 events in ONE match (Westchester SC 5-0 Richmond "
    "Kickers) -- 1 of 5 matches required, so no obi/sii/tier3 composite fields were added, "
    "only the pairing set below. FGA is a provisional range (7.0-7.8), not final. COACH "
    "not scored, no second scout, FGA_v3_Final BLOCKED. Report flags an unresolved "
    "positional-identity issue: 5 different roles observed in 5 matches (LB x2, AM, LW, "
    "LM) -- not resolved here, carried over as an open question. Report states age 24; "
    "this row's age (25, from the Aug upload) was left unchanged for lack of a DOB -- "
    "flagged, not corrected. Status: DRAFT -- not client-ready."
)
SCH_LEE = (
    "2026-09-28: New Tier 1/bio/pairing data added from Empire FGA Scouting Report "
    "ESN-LEE-2026-001 (analyst Jim Totime). Season totals refreshed to the report's "
    "full 2026 K League 1 season (29 apps) from a mid-season snapshot (23 apps). DOB "
    "1998-01-06 per report resolves this pid's legacy '1997' birth-year tag (pid left "
    "unchanged). Display name changed from 'Lee Seung-woo' to 'Lee Seung Woo' so the "
    "View Full Profile link resolves to the existing standalone dashboard file "
    "(Lee_Seung_Woo.html) -- cosmetic only, same player. Tier 3: mean quality 9.05 from "
    "11 events in ONE match (a Jeonbuk-Ulsan derby cameo) -- 1 of 5 matches required, so "
    "no obi/sii/tier3 composite fields were added, only the pairing set below. FGA is a "
    "provisional range (6.8-7.5), not final. COACH not scored, no second scout, "
    "FGA_v3_Final BLOCKED. Career context: La Masia youth (2010-16, banned by FIFA "
    "2013-16, never played a Barca first-team match), failed spells at Hellas Verona, "
    "Sint-Truiden and Portimonense before the K League breakthrough. Status: DRAFT -- "
    "not client-ready. Separately flagged: the pre-existing standalone dashboard page "
    "for this player omits the literal word 'DRAFT' from its closing status line even "
    "though the source report uses it -- not fixed in this pass."
)
SCH_MEERDINK_MAIN = (
    "2026-09-28: Photo, bio (DOB/height/foot) and pairing set added from Empire FGA "
    "Scouting Report ESN-MEE-2026-001 (analyst Jim Totime). Cleared a stray 'Brazilian "
    "School' tag that was sitting on a Dutch player's row with no evident source. Age "
    "updated 22->23 (DOB 2003-07-24 per report). NOT updated: this row's own 2025-26 "
    "stat line (9 apps/575 min/3g/1a) vs. the report's stated 2025-26 season total (25 "
    "apps/5g/1a, no minutes given) -- a large, unreconciled gap; left as-is rather than "
    "guessed. Existing fga:58.97/tmf:65.05 values are not addressed anywhere in this "
    "report and their origin is unconfirmed -- flagged, not touched. Tier 3: mean "
    "quality 9.17 from 6 events in ONE match (Netherlands 2-1 Serbia, Nations League, "
    "his first senior international start) -- 1 of 5 matches required, so no obi/sii/"
    "tier3 composite fields were added, only the pairing set below (report explicitly "
    "notes an earlier pairing draft wrongly anchored on right-footed players, since "
    "corrected). FGA is a provisional range (7.0-7.8), not final. FGA_v3_Final BLOCKED. "
    "Status: DRAFT -- not client-ready. Separately flagged: the standalone dashboard "
    "file for this player (Mexx_Meerdink.html) on disk is corrupted -- it actually "
    "contains Lee Seung-Woo's page content byte-for-byte. Not rebuilt in this pass, and "
    "NOT registered in EXISTING_PROFILES/players.html because of that -- needs a real "
    "rebuild."
)
SCH_MEERDINK_NEW = (
    "2026-09-28: New row for the 2026-27 season, added from Empire FGA Scouting Report "
    "ESN-MEE-2026-001. Combines Eredivisie (7 apps/558 min/3g/2a) and UEFA Europa League "
    "(1 app/82 min) as reported -- not split by competition, unlike this player's other "
    "rows. See the 2025-26 AZ Alkmaar row's own note for the pairing set, photo/bio "
    "source and the DRAFT/single-match Tier 3 caveats, which apply equally here."
)
SCH_VALENCIA = (
    "2026-09-28: Tier 1 refreshed and pairing set added from Empire FGA Scouting Report "
    "ESN-VAL-2026-002 (DRAFT v2, analyst Jim Totime). Season totals updated from a "
    "1-app/14-min stub to the report's 2026 all-competitions total (7 apps/339 min/4g/"
    "1a); the t1 sub-object (shots/SoT/fouls/etc.) is from the old stub and was NOT "
    "refreshed -- the report gives no comparable per-shot breakdown, so it's left stale "
    "and flagged rather than guessed. No obi/sii/tier3 composite fields were added: the "
    "report gives NO OBI/SII composite figures at all (only a Tier 3 sub-metric event "
    "log), and its own stated Tier 3 mean is internally inconsistent (8.25 'audited' vs. "
    "8.59/8.83 from the raw 16-event log, unreconciled by the report itself). FGA is a "
    "provisional range (7.2-7.8), not final. Evidence base: ONE match (Boca Juniors 3-2 "
    "Racing Club, Copa Argentina hat-trick from 2-0 down), 1 of 5 required. FGA_v3_Final "
    "BLOCKED. Report also includes a full 14-season/7-club career table (Pachuca, West "
    "Ham, Everton, Tigres, Fenerbahce, Internacional, Boca) that is NOT backfilled as "
    "historical rows here -- flagged as available follow-up work if wanted. Status: "
    "DRAFT v2 -- not client-ready."
)
SCH_KPARDEH = (
    "2026-09-28: New player, added from Empire FGA Scouting Report ESN-KPA-2026-004 "
    "(DRAFT v4, analyst Jim Totime). First platform entry for NCAA Division I / Liberty "
    "Flames -- the league filter picks this up automatically (it's built from live p.l "
    "values), and 'Liberty Flames' was added to the static CLUBS lookup in the same pass "
    "so the club sub-filter works too. Tier 3: mean quality 9.07 but PARTIAL -- 14 "
    "events across only 2 of 5 required matches, and the 3 matches in which he actually "
    "scored (FGCU, Georgia Southern, American) are NOT among the two logged -- the 9.07 "
    "is a peak/best-case sample, not a season baseline. The report's own Section 9 flags "
    "an unresolved SII composite reconciliation (9.01 vs. 9.07). FGA is a provisional "
    "range (7.8-8.4), not final. First GPS-integrated ESN file in the series: 19.60 mph "
    "peak top speed (19.15 mph average across 5 matches) -- top-half collegiate, below "
    "pro/international tiers. COACH not scored, no second scout, FGA_v3_Final BLOCKED. "
    "Age/DOB: NOT stated anywhere in the report (only 'Sophomore' class year) -- left "
    "null rather than guessed; needs a follow-up ask. No standalone dashboard page "
    "exists for this player -- NOT registered in EXISTING_PROFILES or players.html, "
    "since that link would 404. Status: DRAFT v4 -- not client-ready."
)


def patch_platform(content):
    # ---------- P array ----------
    s, e = find_array_bounds(content, P_MARKER)
    data = json.loads(content[s:e])

    def find_one(pid, sq=None, season=None):
        for r in data:
            if r.get("pid") != pid:
                continue
            if sq is not None and r.get("sq") != sq:
                continue
            if season is not None and r.get("season") != season:
                continue
            return r
        raise KeyError((pid, sq, season))

    # --- Jonathan Jimenez ---
    r = find_one("jonathan-jimenez-usa-2000")
    r["mp"] = 26
    r["min"] = 1848
    r["g"] = 6
    r["a"] = 3
    r["crdY"] = 3
    r["t1"]["shots"] = 31.0
    r["t1"]["sot"] = 15.0
    r["t1"]["fouls"] = 19.0
    r["t1"]["fouled"] = 48.0
    r["t1"]["crosses"] = 8.0
    r["t1"]["offside"] = 6.0
    r["t1"]["tklW"] = 23.0
    r["t1"]["source"] = (
        "FBref Standard/Shooting/Miscellaneous Stats, USL League One 2026 season "
        "(refreshed 2026-09-28 via Empire FGA Scouting Report ESN-JIM-2026-001; "
        "supersedes 2026-08-19 snapshot)"
    )
    r["photo"] = "https://cdn-img.staticzz.com/img/jogadores/new/25/56/982556_jonathan_jimenez_20260308175116.png"
    r["reportPdf"] = "reports/Jonathan_Jimenez_Empire_FGA_Scouting_Report.pdf"
    r["pairingList"] = PAIRING_JIMENEZ
    r["pairingVerified"] = False
    r["sch"] = SCH_JIMENEZ

    # --- Lee Seung-Woo ---
    r = find_one("lee-seung-woo-kor-1997")
    r["n"] = "Lee Seung Woo"
    r["mp"] = 29
    r["min"] = 1701
    r["g"] = 8
    r["a"] = 3
    r["crdY"] = 7
    r["t1"]["shots"] = 43.0
    r["t1"]["sot"] = 16.0
    r["t1"]["fouls"] = 22.0
    r["t1"]["fouled"] = 36.0
    r["t1"]["crosses"] = 23.0
    r["t1"]["offside"] = 2.0
    r["t1"]["tklW"] = 9.0
    r["t1"]["source"] = (
        "FBref Standard/Shooting/Misc, K League 1 2026 season (refreshed 2026-09-28 "
        "via Empire FGA Scouting Report ESN-LEE-2026-001)"
    )
    r["dob"] = "1998-01-06"
    r["ht"] = 1.72
    r["wt"] = 64
    r["foot"] = "Right"
    r["photo"] = "https://sortitoutsi.b-cdn.net/uploads/face/face_67207191.png"
    r["reportPdf"] = "reports/Lee_Seung_Woo_Empire_FGA_Scouting_Report.pdf"
    r["pairingList"] = PAIRING_LEE
    r["pairingVerified"] = False
    r["sch"] = SCH_LEE

    # --- Mexx Meerdink: existing AZ Alkmaar row ---
    r_az = find_one("mexx-meerdink-ned-2003", sq="AZ Alkmaar", season="2025-2026")
    r_az["age"] = 23
    r_az["dob"] = "2003-07-24"
    r_az["ht"] = 1.82
    r_az["foot"] = "Left"
    r_az["photo"] = "https://sortitoutsi.b-cdn.net/uploads/face/face_37086853.png"
    r_az["reportPdf"] = "reports/Mexx_Meerdink_Empire_FGA_Scouting_Report.pdf"
    r_az["pairingList"] = PAIRING_MEERDINK
    r_az["pairingVerified"] = False
    r_az["sch"] = SCH_MEERDINK_MAIN

    # --- Mexx Meerdink: Jong AZ row (player-level fields only) ---
    r_jong = find_one("mexx-meerdink-ned-2003", sq="Jong AZ", season="2025-2026")
    r_jong["age"] = 23
    r_jong["dob"] = "2003-07-24"
    r_jong["ht"] = 1.82
    r_jong["foot"] = "Left"
    r_jong["photo"] = "https://sortitoutsi.b-cdn.net/uploads/face/face_37086853.png"
    r_jong["reportPdf"] = "reports/Mexx_Meerdink_Empire_FGA_Scouting_Report.pdf"
    r_jong["pairingList"] = PAIRING_MEERDINK
    r_jong["pairingVerified"] = False

    # --- Mexx Meerdink: new 2026-27 row ---
    r_new = dict(r_az)  # copy player-level fields
    r_new["season"] = "2026-2027"
    r_new["mp"] = 8
    r_new["min"] = 640
    r_new["g"] = 3
    r_new["a"] = 2
    r_new["crdY"] = None
    r_new["fga"] = None
    r_new["ult"] = None
    r_new["tmf"] = None
    r_new["t1"] = {
        "shots": 26.0, "sot": 9.0, "fouls": 13.0, "fouled": 12.0,
        "crosses": None, "offside": None, "tklW": None,
        "pkwon": 0, "pkcon": 0, "og": 0.0,
        "source": "Empire FGA Scouting Report ESN-MEE-2026-001, 2026-27 combined "
                   "Eredivisie + UEFA Europa League totals, added 2026-09-28",
    }
    r_new["sch"] = SCH_MEERDINK_NEW
    data.append(r_new)

    # --- Enner Valencia ---
    r = find_one("enner-valencia-ecu-1989")
    r["mp"] = 7
    r["min"] = 339
    r["g"] = 4
    r["a"] = 1
    r["dob"] = "1989-11-04"
    r["ht"] = 1.77
    r["wt"] = 74
    r["foot"] = "Right"
    r["photo"] = "https://sortitoutsidospaces.b-cdn.net/megapacks/cutoutfaces/originals/13.02/86012153.png"
    r["reportPdf"] = "reports/Enner_Valencia_Empire_FGA_Scouting_Report.pdf"
    r["pairingList"] = PAIRING_VALENCIA
    r["pairingVerified"] = False
    r["sch"] = SCH_VALENCIA

    # --- Mateo Chavez: 3 rows get reportPdf + an appended note ---
    note_suffix = (
        " || 2026-09-28: new PDF upload of this same report (ESN-CHV-2026-003) "
        "ingested; reportPdf added. The report's own 2026-27 Tier 1 table (6 apps/469 "
        "min) is now stale versus this row's live FBref-sourced total (7 apps/559 min, "
        "pulled 2026-09-24) -- the platform is ahead of the document here, left as-is. "
        "Tier 3 is still 0/12, FGA_v3_Final still BLOCKED. The fga:62.9/tmf:72.77 "
        "values on the 2025-26 row remain of unconfirmed origin -- not addressed by "
        "this report either -- flagged, not touched."
    )
    for sq, season in [("AZ Alkmaar", "2025-2026"), ("AZ Alkmaar", "2026-2027"), ("Jong AZ", "2025-2026")]:
        r = find_one("mateo-chavez-mex-2004", sq=sq, season=season)
        r["reportPdf"] = "reports/Mateo_Chavez_Empire_FGA_Scouting_Report.pdf"
        r["sch"] = (r.get("sch") or "") + note_suffix

    # --- Samson Kpardeh: brand new row ---
    kpardeh = {
        "n": "Samson Kpardeh",
        "l": "NCAA Division I",
        "c": "United States",
        "f": "🇺🇸",
        "sq": "Liberty Flames",
        "nat": "USA",
        "pos": "LWFW",
        "age": None,
        "mp": 5,
        "min": 433,
        "g": 5,
        "a": 0,
        "crdY": 2,
        "fga": None, "ult": None, "tmf": None, "log": None, "cci": None,
        "clu": None, "har": None, "thi": None, "ctx": None,
        "mgr": "", "phil": "",
        "sch": SCH_KPARDEH,
        "t1": {
            "shots": 29.0, "sot": 12.0, "fouls": None, "fouled": None,
            "crosses": None, "offside": None, "tklW": None,
            "pkwon": 1, "pkcon": 0, "og": 0.0,
            "source": "Liberty Flames 2026 box score, via Empire FGA Scouting Report "
                      "ESN-KPA-2026-004, added 2026-09-28",
        },
        "season": "2026",
        "pid": "samson-kpardeh-usa-unk",
        "photo": "https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Flibertyuni.sidearmsports.com%2Fimages%2F2026%2F8%2F13%2FSamson_Kpardeh__2026__JvCwK.jpg&width=180&height=270&type=webp",
        "ht": 1.73,
        "wt": 68,
        "foot": "Right",
        "pairingList": PAIRING_KPARDEH,
        "pairingVerified": False,
        "reportPdf": "reports/Samson_Kpardeh_Empire_FGA_Scouting_Report.pdf",
    }
    data.append(kpardeh)

    new_array_text = json.dumps(data, ensure_ascii=False, allow_nan=True)
    content = content[:s] + new_array_text + content[e:]

    # ---------- EXISTING_PROFILES ----------
    ep_idx = content.index(EP_PREFIX) + len(EP_PREFIX)
    insertion = '"Jonathan_Jimenez.html", "Lee_Seung_Woo.html", '
    content = content[:ep_idx] + insertion + content[ep_idx:]

    # ---------- CLUBS ----------
    clubs_idx = content.index(CLUBS_MARKER) + len(CLUBS_MARKER)
    clubs_insertion = '\n  "NCAA Division I": ["Liberty Flames"],'
    content = content[:clubs_idx] + clubs_insertion + content[clubs_idx:]

    # Bug fix (flagged by Jim, 2026-09-29): the USL League One club list in this
    # static CLUBS lookup says "Charlotte" but every player row for that club uses
    # sq="Charlotte Independence" (MLS's Charlotte FC row correctly uses sq="Charlotte"
    # and is untouched) -- so the USL League One + Charlotte combination in the club
    # sub-filter dropdown selected a club no USL row actually has, silently returning
    # zero players. Fix scoped to the USL League One list only.
    clubs_section_end = content.index('\n};', clubs_idx)
    usl_marker = '"USL League One": ['
    usl_start = content.index(usl_marker, clubs_idx, clubs_section_end)
    usl_list_start = usl_start + len(usl_marker)
    usl_list_end = content.index(']', usl_list_start)
    usl_list_text = content[usl_list_start:usl_list_end]
    fixed_usl_list_text, n_subs = re.subn(r'"Charlotte"', '"Charlotte Independence"', usl_list_text)
    if n_subs != 1:
        raise AssertionError(
            "expected exactly 1 'Charlotte' entry in the USL League One CLUBS list, "
            "found %d -- aborting so this isn't applied blind" % n_subs
        )
    content = content[:usl_list_start] + fixed_usl_list_text + content[usl_list_end:]

    return content


def patch_players_html(content):
    anchor_jonathan = '<a class="p-row" href="Jonathan_Mexique.html" data-name="jonathan mexique">'
    insert_jonathan = (
        '<a class="p-row" href="Jonathan_Jimenez.html" data-name="jonathan jimenez">'
        '<span class="p-name">Jonathan Jimenez</span><span class="p-arrow">&rsaquo;</span></a>\n      '
    )
    assert content.count(anchor_jonathan) == 1
    content = content.replace(anchor_jonathan, insert_jonathan + anchor_jonathan, 1)

    anchor_lena = '<a class="p-row" href="Lena_Oberdorf.html" data-name="lena oberdorf">'
    insert_lee = (
        '<a class="p-row" href="Lee_Seung_Woo.html" data-name="lee seung woo">'
        '<span class="p-name">Lee Seung Woo</span><span class="p-arrow">&rsaquo;</span></a>\n      '
    )
    assert content.count(anchor_lena) == 1
    content = content.replace(anchor_lena, insert_lee + anchor_lena, 1)

    return content


def main():
    with open("platform.html", encoding="utf-8") as f:
        en = f.read()
    with open("platform_es.html", encoding="utf-8") as f:
        es = f.read()
    with open("players.html", encoding="utf-8") as f:
        pl = f.read()

    en_new = patch_platform(en)
    es_new = patch_platform(es)
    pl_new = patch_players_html(pl)

    with open("platform_new.html", "w", encoding="utf-8") as f:
        f.write(en_new)
    with open("platform_es_new.html", "w", encoding="utf-8") as f:
        f.write(es_new)
    with open("players_new.html", "w", encoding="utf-8") as f:
        f.write(pl_new)

    print("OK: wrote platform_new.html, platform_es_new.html, players_new.html")


if __name__ == "__main__":
    main()
