import json, os, hashlib

BASE = os.path.expanduser("~/mnt/ESN - Git")
MARKER = 'const P    = '
FILES = ['platform.html', 'platform_es.html', 'platform_fr.html']

BIO_NOTE = (
    "US Torcy U16 right back (primary) / defensive midfielder (secondary), 177cm at 16 "
    "(born July 2010, exact day not given). Dual France/DR Congo nationality (born "
    "Montreuil-sous-Bois, France); registered and assessed entirely in French domestic "
    "youth football -- platform league/nationality fields set to France, DR Congo heritage "
    "noted here per the report. Cognitive-first profile: elite positional anticipation "
    "(OBI_P 8.0), vocal leadership under pressure (CHR 8.0), immediate coachability to "
    "sideline instruction (COACH_R 8.0, one event -- COACH_T/COACH_I not yet assessed, "
    "COACH has no platform field). Lowest signal is creative risk in possession (CRK 6.0). "
    "Pairing set (v1.1, rebuilt for the right-back role after a v1.0 error paired him with "
    "centre backs/CMs): Lauren Bisan Etame primary, Augustine Eguavoen secondary, Johan "
    "Mosquera tertiary, Emmanuel Eboue and Serge Aurier as references -- all provisional, "
    "not verified. UNRESOLVED DATA CONTRADICTION the report flags itself: the PDF scores "
    "OBI_P 8.0 and SII_R 8.0 from specific timestamped events, but an independently logged "
    "16-second clip of the same PSG U16 R1 fixture shows only jogging pace, zero recovery "
    "sprints, and no separation from the opponent in the shared frame. The report's own "
    "verdict: 'Neither is wrong... treat the 7.20 figure as the upper bound of what the file "
    "can currently support.' Every sub-metric carries a VIDEO_PENDING flag (1 event each, "
    "video completeness 1/12, well below the 7-metric threshold). No second scout assigned. "
    "FGA_v3_Final is BLOCKED (sample requirement not met). Weight and preferred foot are not "
    "recorded in the report -- the file's own 'RB -> likely right' foot note is explicitly "
    "an inference, not a confirmed value, so foot is left unset here rather than guessed."
)

SCH_NOTE = (
    "2026-09-30: New player, added from Empire FGA Scouting Report ESN-MUT-2026-001 v1.1 "
    "(DRAFT -- report's own status line reads 'NOT CLIENT-READY'), analyst Jim Totime. "
    "Jim asked for exactly two rows: this one (2025-2026, US Torcy U16, partially graded) "
    "and a 2026-2027 US Torcy U17 placeholder row (same pid) that he will grade himself -- "
    "not built from this report, which has zero U17-season evidence. || LEAGUE FLAG: "
    "the PDF never names a league for the regular season, only match-level context "
    "('LOG L3 Regional Derby') and a separate cup name ('Coupe de Paris U16') for the Massy "
    "fixture. Verified independently (sportcorico.com / FFF club page) that US Torcy's U16 "
    "squad plays in 'U16 R1' (Regional 1) for 2025-26 -- this corroborates, rather than "
    "contradicts, the PDF's own 'PSG U16 R1' match notation (R1 = the division, not part of "
    "the opponent's name). Added 'U16 R1': ['US Torcy U16'] to CLUBS as a new real domestic "
    "league entry, per platform convention. || DATA FLAGS carried structurally: obi (7.30) "
    "and sii (7.25) are the PDF's own stated composites, stored as real numbers per this "
    "platform's convention for confidence-flagged-but-computed metrics (see e.g. Alex Luna, "
    "Sam Beukema) -- NOT the same situation as Jose Escorcia, whose composites were left "
    "null because the report stated they were not computable at all; here they ARE computed, "
    "just single-match/single-event and PDF-vs-clip-log-contradicted, so treat as provisional "
    "ceiling, not confirmed. tier3 covers only the 4 sub-metrics the report actually scored "
    "(chr, oms, soa, crk) -- dma/mcs/spi/clm/crs/dyn are simply absent from this report, not "
    "zero. gradingProgress=6 (of 12: the 4 tier3 keys above + obi + sii). mp=2 counts the two "
    "registered-with-events matches from the report's own Match Register table (PSG U16 R1 "
    "full assessment + Massy partial clip log, Coupe de Paris U16) -- matches 3-5 in that "
    "table are explicitly 'NOT REGISTERED'. min/g/a/crdY set to 0 -- not box-score-tracked in "
    "a video-evidence-only report, same convention used for Escorcia. Ultimate FGA 7.20/10 "
    "and Lars U16 83.07/100 are the PDF's own provisional headline figures -- deliberately "
    "NOT written into the platform's fga/ult composite fields (left null), matching the "
    "site's standing convention for single-match/unvalidated drafts (see Escorcia). COACH "
    "7.55 (COACH_R 8.0 only) has no platform field to carry it -- noted in bioNote only."
)

SCH_NOTE_U17 = (
    "2026-09-30: Placeholder row added per Jim Totime's explicit instruction ('I am going "
    "to grade him') -- same pid as the 2025-2026 US Torcy U16 row above, next-season "
    "progression to US Torcy U17. Zero evidence: no report, no matches, no events. league "
    "'U17 R1' is an UNCONFIRMED ASSUMPTION (continuation of this season's verified 'U16 R1' "
    "division) -- not sourced for 2026-27, not added to CLUBS, flagged here for Jim to "
    "correct once real data exists. mp/min/g/a/crdY all 0, tier3 empty, obi/sii/fga/ult all "
    "null, gradingProgress 0 -- nothing to grade yet."
)

def find_array_text(content, marker):
    start = content.index(marker) + len(marker)
    depth = 0; in_str = False; esc = False; i = start
    while i < len(content):
        ch = content[i]
        if in_str:
            if esc: esc = False
            elif ch == '\\': esc = True
            elif ch == '"': in_str = False
        else:
            if ch == '"': in_str = True
            elif ch == '[': depth += 1
            elif ch == ']':
                depth -= 1
                if depth == 0:
                    i += 1
                    break
        i += 1
    return content[start:i], start, i

def make_base_row(season, sq, l, c, f, mp, tier3, obi, sii, gp, t3status, sch, bio=None):
    row = {
        "n": "Elior Muteba",
        "nat": "FRA",
        "pos": "RBDM",
        "age": 16,
        "fga": None, "ult": None, "tmf": None, "log": None, "cci": None, "clu": None,
        "har": None, "thi": None, "ctx": None,
        "mgr": "", "phil": "",
        "season": season,
        "pid": "elior-muteba-fra-2010",
        "foot": None,
        "ht": 1.77,
        "pairingList": [
            {"name": "Lauren Bisan Etame (Cameroon / Arsenal)", "pct": "88%", "primary": True},
            {"name": "Augustine Eguavoen (Nigeria / 1994 WC)", "pct": "84%", "primary": False},
            {"name": "Johan Mosquera (Colombia)", "pct": "79%", "primary": False},
            {"name": "Emmanuel Eboue (Ivory Coast / Arsenal)", "pct": "76%", "primary": False},
            {"name": "Serge Aurier (Ivory Coast / PSG / Tottenham)", "pct": "72%", "primary": False},
        ],
        "pairingVerified": False,
        "reportPdf": "reports/Elior_Muteba_Empire_FGA_Scouting_Report.pdf",
        "pairingPlayer": "Lauren Bisan Etame — 88% (Primary, preliminary)",
        "bioNote": bio if bio is not None else BIO_NOTE,
        "vid": None,
        "phi9": {}, "foundation5": {}, "compositeMapped": False,
        "l": l, "c": c, "f": f, "sq": sq,
        "mp": mp, "min": 0, "g": 0, "a": 0, "crdY": 0,
        "sch": sch,
        "t3status": t3status,
        "tier3": tier3,
        "obi": obi, "sii": sii,
        "gradingProgress": gp,
    }
    return row

row_u16 = make_base_row(
    season="2025-2026", sq="US Torcy U16", l="U16 R1", c="France", f="🇫🇷",
    mp=2,
    tier3={"chr": 8.0, "oms": 7.0, "soa": 7.0, "crk": 6.0},
    obi=7.30, sii=7.25, gp=6,
    t3status=("⚠️ PARTIAL_VALIDATION — 1 scout (Jim Totime), 1 match fully assessed (PSG U16 R1, "
              "7 events) + 1 partial clip log (Massy, Coupe de Paris U16, 3 events). Every "
              "sub-metric VIDEO_PENDING, 1 event each — well below the 3-event/5-match "
              "framework minimums. PDF scores (OBI_P 8.0, SII_R 8.0) are directly contradicted "
              "by an independently logged 16-second clip of the same fixture (jogging pace, "
              "zero recovery sprints, no separation) — unresolved, not silently picked a side. "
              "No second scout. FGA_v3_Final BLOCKED."),
    sch=SCH_NOTE,
)

row_u17 = make_base_row(
    season="2026-2027", sq="US Torcy U17", l="U17 R1", c="France", f="🇫🇷",
    mp=0,
    tier3={}, obi=None, sii=None, gp=0,
    t3status="⚠️ NOT YET STARTED — placeholder row, Jim Totime has not begun grading this season.",
    sch=SCH_NOTE_U17,
    bio=("US Torcy U17 — next-season progression row for Elior Muteba (same player as the "
         "2025-2026 US Torcy U16 row; see that row for his full profile, report, and pairing "
         "set). No 2026-27 evidence exists yet — Jim Totime is grading this season."),
)

results = {}
for fname in FILES:
    path = os.path.join(BASE, fname)
    with open(path, encoding='utf-8') as fh:
        content = fh.read()
    arr_text, astart, aend = find_array_text(content, MARKER)
    arr = json.loads(arr_text)
    assert not any(p.get('pid') == 'elior-muteba-fra-2010' for p in arr), f"{fname}: pid already exists!"
    before = len(arr)
    arr.append(row_u16)
    arr.append(row_u17)
    new_arr_text = json.dumps(arr, ensure_ascii=False, allow_nan=True)
    new_content = content[:astart] + new_arr_text + content[aend:]

    # patch CLUBS: add "U16 R1": ["US Torcy U16"]
    clubs_marker = 'const CLUBS={'
    cidx = new_content.index(clubs_marker)
    insert_at = cidx + len(clubs_marker)
    clubs_addition = '"U16 R1":["US Torcy U16"],'
    assert '"U16 R1"' not in new_content[cidx:new_content.index('};', cidx)+2], f"{fname}: U16 R1 already in CLUBS"
    new_content = new_content[:insert_at] + clubs_addition + new_content[insert_at:]

    with open(path, 'w', encoding='utf-8', newline='') as fh:
        fh.write(new_content)

    results[fname] = {
        'before_rows': before,
        'after_rows': before + 2,
        'sha256': hashlib.sha256(new_content.encode('utf-8')).hexdigest(),
        'bytes': len(new_content.encode('utf-8')),
    }

for fname, r in results.items():
    print(fname, r)
