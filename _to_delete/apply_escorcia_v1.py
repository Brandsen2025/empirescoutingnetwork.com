#!/usr/bin/env python3
"""
Adds José Escorcia as a brand-new player: TWO rows sharing one pid, following
the established dual-competition-context pattern already on the platform
(Joseph Junior Andreou Gabriel: "FA Youth Cup"/Man Utd U18 + "UEFA European
U17 Championship Qualifying"/England U17, same pid, same season, different
l/sq/mp).

Source: Empire FGA Scouting Report ESN-ESC-2026-001 (DRAFT, analyst Jim
Totime) + companion workbook Empire_FGA_Video_Scoring_Jose_Escorcia.xlsx
(93 logged events, all tagged "Positive indicator", across 4 of 5 registered
matches -- confirmed identical in both files, no PDF/xlsx contradiction this
time, unlike Fjeldberg).

Row A -- "Liga Dimayor U20" / Atlético Nacional Medellín U20 (club identity
only -- the report contains ZERO video evidence from club matches; every
logged event comes from the Colombia U17 register). mp/min/g/a/crdY/tier3/
obi/sii all left at 0/{}/null on this row -- NOT because he made zero club
appearances (he almost certainly has a real U20 career), but because this
report scores none of it. "Liga Dimayor U20" IS added to the static CLUBS
lookup (matches the Samson Kpardeh/"NCAA Division I"->"Liberty Flames"
precedent for a real, ongoing domestic club competition), with "Atlético
Nacional Medellín U20" as its first and only club so far.

Row B -- "Sudamericano U17" / Colombia U17 (the evidence row -- all 93
events, all scoring). Matches the Joseph Junior Andreou Gabriel /
Ilyes Mansouri Touzani precedent for national-youth-team competitions:
deliberately NOT added to CLUBS (neither "FA Youth Cup", "UEFA European U17
Championship Qualifying" nor "U17 Nationaux" are in CLUBS either) -- these
rows are reached via player search/profile link, not the club filter.

Height/weight are NOT given anywhere in the source (report's own punch list
item #9, still open) -- left unset on both rows, not guessed.

Run from the directory containing platform.html and platform_es.html.
Writes platform_esc.html / platform_es_esc.html (does not overwrite inputs).
"""
import json

P_MARKER = 'const P    = '
CLUBS_MARKER = 'const CLUBS={'
_DECODER = json.JSONDecoder()


def find_array_bounds(content, marker):
    start = content.index(marker) + len(marker)
    obj, end = _DECODER.raw_decode(content, start)
    return start, end


PID = "jose-escorcia-col-unk"

SCH_NOTE_HEAD = (
    "2026-09-30: New player, added from Empire FGA Scouting Report ESN-ESC-2026-001 "
    "(DRAFT, analyst Jim Totime) plus its companion video-scoring workbook "
    "(Empire_FGA_Video_Scoring_Jose_Escorcia.xlsx, 93 logged events -- matches the PDF's "
    "own '~85' rounding, all 4 of 4 scored matches accounted for). No contradiction found "
    "between the PDF and the xlsx this time -- both independently state the same league "
    "('Liga Dimayor U20 / Sudamericano U17'), club, position and match register. "
    "|| LEAGUE NAMING FLAG: Jim's chat instruction proposed 'Colombia Primera A U20' and "
    "asked me to check it. That name does NOT appear anywhere in Jim's own source files -- "
    "both the PDF header and the xlsx PLAYER_PROFILE tab independently and consistently say "
    "'Liga Dimayor U20', which is what's used here instead. I could not independently verify "
    "'Liga Dimayor U20' against an official DIMAYOR or FCF source either: DIMAYOR's own site "
    "lists no Sub-20 competition at all (only Liga BetPlay DIMAYOR, Torneo BetPlay DIMAYOR, "
    "Liga Femenina, Copa and Superliga -- all senior). The closest independent corroboration "
    "is Wikipedia's 'Divisiones menores de Atletico Nacional' article, which names a 'Torneo "
    "Nacional Sub-20' that Nacional's own U20 side has played in and won (2016, 2018; runner-up "
    "2012) -- a related but not confirmed-identical competition name. Treat 'Liga Dimayor U20' "
    "as provisional, sourced from Jim's own report rather than an independently confirmed "
    "official name -- flag for Jim to confirm. || SUDAMERICANO U17: PDF/xlsx both say "
    "'Sudamericano U17', used as-is for consistency with the source. Independently verified via "
    "English Wikipedia (Spanish Wikipedia would not fetch in this environment): the CONMEBOL "
    "competition's full official name is 'Campeonato Sudamericano Sub-17', 2026 edition hosted "
    "in Paraguay. || CLUBS LOOKUP: 'Liga Dimayor U20' WAS added to the static CLUBS object (with "
    "'Atletico Nacional Medellin U20' as its first club) -- a real, ongoing domestic club "
    "competition, same treatment as Samson Kpardeh's 'NCAA Division I'/'Liberty Flames' addition. "
    "'Sudamericano U17' was deliberately NOT added to CLUBS -- matches the existing platform "
    "convention for national-youth-team competitions (Joseph Junior Andreou Gabriel's 'FA Youth "
    "Cup' and 'UEFA European U17 Championship Qualifying' rows, Ilyes Mansouri Touzani's 'U17 "
    "Nationaux' row -- none of those three are in CLUBS either); these rows are reached via "
    "player search/profile link, not the club sub-filter. || EVIDENCE SPLIT: unlike the Joseph "
    "Junior Andreou Gabriel precedent (real evidence split across both competitions), 100% of "
    "this report's 93 logged events come from the Colombia U17 register (Sudamericano U17 vs "
    "Brazil/Argentina/Paraguay + 1 international friendly vs Germany U17) -- zero come from "
    "Atletico Nacional Medellin U20 club matches. The club-context row is therefore identity-only: "
    "mp/min/g/a/crdY are 0 and tier3/obi/sii are null/empty on that row NOT because he made zero "
    "club appearances (he almost certainly has a real U20 league career) but because this report "
    "scores none of it -- all grading lives on the Sudamericano U17 sister row. || SUDAMERICANO "
    "U17 ROW -- STATUS: DRAFT, video completeness 5 of 12 core metrics, FGA_v3_Final BLOCKED. "
    "5 matches registered (Brazil U17 W, Argentina U17 W, Paraguay U17 W, Germany U17 D, Uruguay "
    "U17 L) but only 4 have logged events -- Match 5 (Uruguay) has NONE despite being registered, "
    "per the report's own blocker #3. Match 3 (Paraguay) carries an unplayable-pitch/weather "
    "caveat (workbook Punch List item #1). ALL 93 logged events are tagged 'Positive indicator' "
    "-- zero anti-indicators in the workbook; failure events are counted as positives (report's "
    "own blocker #1, re-tagging still required, not resolved here: M1 15'02 SOA=4, M1 18'28 "
    "SOA=5, M1 63'08 DMA=5, M2 1'19 DMA=7). Provisional FGA range 7.9-8.5 (Excellent, not "
    "finalised) -- no single finalized FGA number exists, so fga/ult left null rather than "
    "averaging the range myself. Tier 3 transfer-ready average 8.39 (8 of 15 sub-metrics clear "
    "both the >=3-event and >=3-match thresholds: SII_A 8.30, CHR 8.50, DMA 8.85, SOA 8.85, "
    "SPI 8.67, OMS 8.60, OBI_P 8.00, OBI_S 7.33 -- OMS has no dedicated slot in this row's tier3 "
    "schema, same gap already present on the Gabriel precedent row, so it's noted here only). "
    "The tier3 field below ALSO carries MCS 9.70, CLM 8.50, CRS 9.00 and CRK 9.40 despite each "
    "individually failing the match-spread or event-count minimum (MCS/CRK: <3 matches; CLM: "
    "1 event only; CRS: <3 events) -- included with this explicit low-confidence caveat, same "
    "convention already used on the Gabriel row for CHR(2 events). OBI composite and SII "
    "composite are BOTH left null, not estimated -- the report explicitly states 'OBI composite "
    "cannot be transferred' (OBI_T has only 1 match) and 'SII composite cannot be computed' "
    "(SII_R has zero events). COACH not scored -- only 1 COACH_R event logged, far short of the "
    "3-observations/2-context minimum the COACH rubric requires. No second scout assigned -- "
    "single-scout (Jim Totime), fails the v4.0 2-scout SCOUT_VALIDATED bar, PARTIAL_VALIDATION "
    "only. || Photo added (URL supplied by Jim). Age 17 stated; DOB NOT given anywhere in the "
    "source -- left unset rather than guessed (pid uses the same '-unk' suffix as Samson "
    "Kpardeh's row for exactly this situation). Height/weight NOT given anywhere in the source "
    "either -- the report's own punch list item #9 (medium priority) explicitly says 'Confirm "
    "height/weight for the pairing physical comparisons' is still an open action item -- left "
    "unset, not guessed. Foot: right-footed, 'comfortable both' per the report -- foot field set "
    "to 'Right', ambidexterity noted in bioNote. Pairing set (6 entries, matching the report's own "
    "explicit include list in its Tactical DNA Pairing section -- Mbappe/Doku/Dembele/Ronaldinho "
    "are explicitly EXCLUDED by the report and correctly left out here) added as preliminary/"
    "unverified. reportPdf added. No video footage link/file was supplied for this player this "
    "turn (unlike Fjeldberg) -- footageClips left unset. No standalone dashboard page exists for "
    "this player -- NOT registered in EXISTING_PROFILES or players.html, since that link would "
    "404. Note: an UNRELATED legacy 'Jose_Escorcia.html' (no accent) already sits in "
    "EXISTING_PROFILES for a different/unconnected historical player -- this player's own name "
    "'Jose Escorcia' preserves the accent (matching the platform's accent-preservation "
    "convention elsewhere, e.g. Mateo Chavez), so its computed profile filename would be "
    "'Jose_Escorcia.html' with the accent, which does NOT collide with that legacy no-accent "
    "entry. Status: DRAFT ESN-ESC-2026-001 -- not client-ready."
)

BIO_NOTE = (
    "First-generation Colombian youth prospect at Atletico Nacional's academy -- the most "
    "successful club in Colombian football and a consistent producer of national-team talent. "
    "Right-footed left winger (comfortable both feet) whose game is built on elite 1v1 dribbling "
    "-- step-overs, nutmegs, sole-taps, flip-flaps -- combined with ghost runs off the ball, high "
    "pressing out of possession, combination play and clinical finishing. Assessed at Sudamericano "
    "U17 level against Brazil, Argentina and Paraguay (all wins, all away), plus an international "
    "friendly against Germany U17 (draw) and a Uruguay U17 fixture with no video coverage. The two "
    "strongest evidence matches -- both top-third opposition, both away, both won -- are Brazil "
    "U17 and Argentina U17. The analyst's own video note explicitly records 'a gesture similar to "
    "Neymar Jr.' at the moment of a flip-flap that eliminated a German defender. Provisional FGA "
    "range 7.9-8.5 (Excellent, not finalised); Tier 3 transfer-ready average 8.39 across 8 of 15 "
    "sub-metrics. One visible weakness: OBI_S 7.33 -- not a movement issue (positioning reads as "
    "correct) but a service issue, teammates not connecting with his runs."
)

PAIRING_LIST = [
    {"name": "Neymar Jr. (Santos 2009-12)", "pct": "84%", "primary": True},
    {"name": "Robinho (Santos 2002-04)", "pct": "82%", "primary": False},
    {"name": "Luis Díaz (Junior 2017-19)", "pct": "78%", "primary": False},
    {"name": "Vinícius Jr. (Flamengo 2017-18)", "pct": "76%", "primary": False},
    {"name": "Marcelo (Fluminense 2005-06)", "pct": "71%", "primary": False},
    {"name": "Denílson (São Paulo 1994-96)", "pct": "68%", "primary": False},
]

PHOTO = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI4Nr-ej9eriJOhomEIppglp9da0Ba-QYoS85WgKMT0w&s"
REPORT_PDF = "reports/Jose_Escorcia_Empire_FGA_Scouting_Report.pdf"

TIER3_EVIDENCE = {
    "dma": 8.85,
    "chr": 8.50,
    "mcs": 9.70,
    "soa": 8.85,
    "spi": 8.67,
    "clm": 8.50,
    "crs": 9.00,
    "crk": 9.40,
}

BASE_FIELDS = {
    "n": "José Escorcia",
    "nat": "COL",
    "pos": "LWFW",
    "age": 17,
    "fga": None, "ult": None, "tmf": None, "log": None, "cci": None,
    "clu": None, "har": None, "thi": None, "ctx": None,
    "mgr": "", "phil": "",
    "season": "2025-2026",
    "pid": PID,
    "photo": PHOTO,
    "foot": "Right",
    "pairingList": PAIRING_LIST,
    "pairingVerified": False,
    "reportPdf": REPORT_PDF,
    "pairingPlayer": "Neymar Jr. — 84% (Primary, preliminary)",
    "bioNote": BIO_NOTE,
    "vid": None,
    "phi9": {},
    "foundation5": {},
    "compositeMapped": False,
}


def make_row_club():
    r = dict(BASE_FIELDS)
    r["l"] = "Liga Dimayor U20"
    r["c"] = "Colombia"
    r["f"] = "🇨🇴"
    r["sq"] = "Atlético Nacional Medellín U20"
    r["mp"] = 0
    r["min"] = 0
    r["g"] = 0
    r["a"] = 0
    r["crdY"] = 0
    r["sch"] = SCH_NOTE_HEAD + " This row = the Atlético Nacional Medellín U20 club context (identity only, no video evidence in this report)."
    r["obi"] = None
    r["sii"] = None
    r["tier3"] = {}
    r["gradingProgress"] = 0
    r["t3status"] = "⚠️ No video evidence for this competition in ESN-ESC-2026-001 -- club-context row only. Full Tier 3 grading is on the sister 'Sudamericano U17' row (same pid)."
    return r


def make_row_sudamericano():
    r = dict(BASE_FIELDS)
    r["l"] = "Sudamericano U17"
    r["c"] = "Colombia"
    r["f"] = "🇨🇴"
    r["sq"] = "Colombia U17"
    r["mp"] = 5
    r["min"] = 0
    r["g"] = 0
    r["a"] = 0
    r["crdY"] = 0
    r["sch"] = SCH_NOTE_HEAD + " This row = the Colombia U17 / Sudamericano U17 evidence base (all 93 logged events, 4 of 5 registered matches scored)."
    r["obi"] = None
    r["sii"] = None
    r["tier3"] = TIER3_EVIDENCE
    r["gradingProgress"] = 5
    r["t3status"] = "⚠️ 5/12 core video-completeness metrics (8/15 sub-metrics transfer-ready overall). 1 scout (Jim Totime) -- fails v4.0's 2-scout SCOUT_VALIDATED bar. PARTIAL_VALIDATION. FGA_v3_Final BLOCKED."
    return r


def patch_platform(content):
    s, e = find_array_bounds(content, P_MARKER)
    data = json.loads(content[s:e])

    for r in data:
        assert r.get("pid") != PID, f"pid {PID} already exists -- refusing to double-add"

    new_rows = [make_row_club(), make_row_sudamericano()]
    data.extend(new_rows)

    new_array_text = json.dumps(data, ensure_ascii=False, allow_nan=True)
    content = content[:s] + new_array_text + content[e:]

    # --- CLUBS patch: add "Liga Dimayor U20": ["Atlético Nacional Medellín U20"] ---
    cs, ce = 0, 0
    cidx = content.index(CLUBS_MARKER)
    obj_start = cidx + len(CLUBS_MARKER) - 1  # position of the opening '{'
    # find matching closing '};' the same way the rest of the file already does it
    close = content.index("};", obj_start) + 1  # position right after '}'
    insertion = '\n  "Liga Dimayor U20": ["Atlético Nacional Medellín U20"],'
    # insert right after the opening brace
    brace_pos = content.index("{", cidx)
    content = content[:brace_pos + 1] + insertion + content[brace_pos + 1:]

    return content


def main():
    with open("platform.html", encoding="utf-8") as f:
        en = f.read()
    with open("platform_es.html", encoding="utf-8") as f:
        es = f.read()

    en_new = patch_platform(en)
    es_new = patch_platform(es)

    with open("platform_esc.html", "w", encoding="utf-8") as f:
        f.write(en_new)
    with open("platform_es_esc.html", "w", encoding="utf-8") as f:
        f.write(es_new)

    print("OK: wrote platform_esc.html, platform_es_esc.html")


if __name__ == "__main__":
    main()
