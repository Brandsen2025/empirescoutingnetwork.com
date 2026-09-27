# -*- coding: utf-8 -*-
"""
Gabriel Mec, per Jim's message 2026-09-27:
  "Next one, Gabriel Mec. You have to create his card for 2026-2027 as
  well because he's recently signed for FC Porto"
  + attachments: Empire FGA Scouting Report PDF (ref ESN-MEC-2026-001,
    "first fully complete file in the ESN series", 11pp) and 5 FBref
    xls exports (Miscellaneous/Player Club Summary/Playing Time/
    Shooting/Standard Stats).

Gabriel Mec was NOT a new player -- he already has a fully-graded card
(pid gabriel-mec-bra-2007, season 2025-2026, Grêmio), graded 2026-08-28,
already wired into EXISTING_PROFILES/players.html/Gabriel_Mec.html (all
pre-existing, not part of this pass). Two things done here:

  1. NEW ROW: 2026-2027, FC Porto, per Jim's explicit ask. 0 MP/0 min
     across every FBref sheet uploaded today ("signed, no appearances
     yet" -- matches the report's own Club (2026-27) line). No Tier-3
     video data on this row -- the OBI/SII/rmv/ultProxy/tier3 numbers
     on the Grêmio row are graded from Grêmio match footage and do not
     carry over to a new club; deliberately left off this row rather
     than duplicated. Player-level fields (pairing set, reportPdf)
     ARE duplicated here, matching the established convention that
     those describe the player, not the season.

  2. REFRESH of the existing 2025-2026 Grêmio row against today's
     report, field by field (checked against the live row before
     writing anything):
       - tier3.crk: 8.52 -> 8.37 (real change)
       - tier3.soa: 8.17 -> 8.18 (rounding-level)
       - dma/crs/clm/mcs/spi: unchanged, confirmed identical
       - obi: 7.43 -> 7.42, sii: 7.93 -> 7.97 (both ~rounding-level)
       - rmv: recomputed from the 7 legacy tier3 keys, 8.23 -> 8.21
       - ultProxy: recomputed 78.6 -> 78.7 using the formula this
         platform's OWN existing t3status note gives for this specific
         player (avg(obi, sii, rmv) x 10) -- that note explicitly
         flags that 2 of 5 other fully-graded players deviate from
         this formula via an unrecorded manual override, and says
         "if override logic should apply here too, tell me and I'll
         adjust." No override applied -- following that note's own
         default instruction, not guessing.
       - t1/stk/xps/int: left untouched. Today's uploaded FBref sheets
         (Standard/Shooting/Misc/Playing-Time/Club-Summary) match the
         existing t1 block exactly (13 shots, 3 SoT, 9 fouls, 19
         fouled, 6 crosses, 0 offside, 8 tklW) -- nothing to change.
       - pairingPlayer -> pairingList: existing single-player pairing
         (Ronaldinho, metrics-verified via direct OBI/SII/RMV/ultProxy
         comparison, 2026-08-28) upgraded to today's report's 3-entry
         ranked set (Ronaldinho 84% / Neymar Santos-era 79% / Paquetá
         76%, derived from a component-alignment table -- a different
         but corroborating methodology). pairingVerified stays True.
       - reportPdf: added, same reports/ mechanism as
         Dimarco/Luna/Daroma/Almada Correia.

  UNRESOLVED, flagged not fixed: this pid encodes a 2007 birth year
  (age 18 on the existing row, set 2026-07/08). Today's report states
  "Age: 17 (b. 2008)" on both its cover and profile page -- a full
  year of disagreement about his actual birth year. NOT reconciled
  here. pid/age left exactly as they were rather than guessed at,
  since the pid string is load-bearing (EXISTING_PROFILES entry,
  players.html row, Gabriel_Mec.html filename all depend on it).

  ALSO NOT TOUCHED: Gabriel_Mec.html (the standalone profile page).
  It's dated 2026-09-06 on disk -- predates even the prior 2026-08-28
  grading update, so it's now stale on multiple fronts (old crk value,
  no Porto row, no new pairing set, no report link). Flagged in the
  chat reply, not rebuilt -- wasn't asked for this pass and I don't
  want to guess at its layout/content the way I would data fields.

Sources: Jim, chat, 2026-09-27 + PDF attachment (Empire FGA Scouting
Report ref ESN-MEC-2026-001, 11pp) + 5 FBref xls exports (uploaded same
message).
"""
import json
import sys
import os

DATA_DIR = sys.argv[1] if len(sys.argv) > 1 else '.'
OUT_DIR = sys.argv[2] if len(sys.argv) > 2 else './out'

PID = 'gabriel-mec-bra-2007'
REPORT_PDF = 'reports/Gabriel_Mec_Empire_FGA_Scouting_Report.pdf'

NEW_CRK = 8.37
NEW_SOA = 8.18
NEW_OBI = 7.42
NEW_SII = 7.97

PAIRING_PLAYER_SHORT = "Ronaldinho Gaúcho — 84% (Primary)"
PAIRING_NOTE = (
    "Two independently metrics-derived pairings agree on the same "
    "primary comparison. Existing (2026-08-28, Jim Totime): direct "
    "OBI/SII/RMV/ultProxy comparison against Ronaldinho's own 1998 "
    "Grêmio card (pid ronaldinho-gaucho-bra-1980) -- same age (18), "
    "same shirt, within 1.0pt on ultProxy. New (Empire FGA Scouting "
    "Report ref ESN-MEC-2026-001, 2026-09-27): component-by-component "
    "alignment table (club of emergence, position, style, SPI/SOA/CRK, "
    "\"for show\" tendency, emergence age, OBI_T) ranks Ronaldinho 84% "
    "primary, Neymar (Santos era) 79% secondary, Lucas Paquetá 76% "
    "tertiary. The two methodologies corroborate rather than conflict."
)
PAIRING_LIST = [
    {"name": "Ronaldinho Gaúcho", "pct": "84%", "primary": True},
    {"name": "Neymar (Santos era)", "pct": "79%"},
    {"name": "Lucas Paquetá", "pct": "76%"},
]

GREMIO_SCH_ADD = (
    "Refresh 2026-09-27 (analyst: Jim Totime) -- new Empire FGA "
    "Scouting Report (ref ESN-MEC-2026-001, 'first fully complete file "
    "in the ESN series', 12/12 metrics, ~185 logged events). Field-by-"
    "field vs. the 2026-08-28 grading already on this row: crk "
    "8.52->8.37 (real change), soa 8.17->8.18 (rounding-level), "
    "dma/crs/clm/mcs/spi all unchanged. obi 7.43->7.42, sii 7.93->7.97 "
    "(both ~rounding-level). rmv recomputed 8.23->8.21 (avg of the 7 "
    "tier3 keys). ultProxy recomputed 78.6->78.7 using the formula "
    "this platform's own t3status note gives for this player "
    "specifically (avg(obi,sii,rmv)x10) -- that note also warns 2 of 5 "
    "other fully-graded players deviate from this formula via an "
    "unrecorded manual override; no override applied here, per that "
    "note's own default instruction. t1/stk/xps/int untouched -- "
    "today's uploaded Standard/Shooting/Misc/Playing-Time/Club-Summary "
    "FBref sheets match the existing t1 block exactly (13 shots, 3 "
    "SoT, 9 fouls, 19 fouled, 6 crosses, 0 offside, 8 tklW), nothing to "
    "change. UNRESOLVED DISCREPANCY, flagged not fixed: this row's pid "
    "and existing age (18) imply a 2007 birth year; today's report "
    "states 'Age: 17 (b. 2008)' on its cover and profile page -- a "
    "full year off. Not reconciled; pid left unchanged since "
    "EXISTING_PROFILES/players.html/Gabriel_Mec.html all depend on it. "
    "Replaced single-player pairingPlayer with pairingList (3-entry "
    "ranked set) -- see pairingNote. Added reportPdf (same reports/ "
    "mechanism as Dimarco/Luna/Daroma/Almada Correia); source PDF's "
    "own closing line: 'DRAFT -- Match 8 unregistered, all events "
    "tagged positive, COACH missing, no second scout -- no pairing "
    "percentage should be quoted to a client until Section 8's "
    "validation gates clear' -- published anyway, consistent with "
    "Jim's standing call on this document class. Gabriel_Mec.html "
    "(standalone profile page) NOT touched -- dated 2026-09-06, "
    "predates even the prior 2026-08-28 update, now stale on multiple "
    "fronts; flagged in chat, not rebuilt."
)

PORTO_SCH = (
    "Added 2026-09-27 (analyst: Jim Totime) -- new 2026-2027 card "
    "following Gabriel Mec's transfer to FC Porto, per the Player Club "
    "Summary and Playing Time FBref sheets uploaded the same message "
    "(both show 0 MP / 0 min for Porto as of upload -- 'signed, no "
    "appearances yet', matching the Empire FGA Scouting Report's own "
    "Club (2026-27) line, ref ESN-MEC-2026-001). No Tier-3 video "
    "grading on this row by design -- the OBI/SII/rmv/ultProxy/tier3 "
    "figures on the 2025-2026 Grêmio row are graded from Grêmio "
    "match footage and don't transfer to a new club; this row carries "
    "none of that data until Porto footage exists. Player-level fields "
    "(pairingPlayer/pairingList/pairingNote/pairingVerified, "
    "reportPdf) duplicated from the Grêmio row, matching the "
    "platform's existing convention that those describe the player, "
    "not the season. Age/pid inherited unchanged from the Grêmio row "
    "-- see that row's sch note for the unresolved 2007-vs-2008 "
    "birth-year discrepancy, which applies here too."
)


def find_array_bounds(content):
    idx = content.index('const P')
    start = content.index('[', idx)
    depth = 0
    in_str = False
    str_ch = ''
    esc = False
    for i in range(start, len(content)):
        ch = content[i]
        if in_str:
            if esc:
                esc = False
            elif ch == '\\':
                esc = True
            elif ch == str_ch:
                in_str = False
        else:
            if ch in ('"', "'", '`'):
                in_str = True
                str_ch = ch
            elif ch == '[':
                depth += 1
            elif ch == ']':
                depth -= 1
                if depth == 0:
                    return start, i + 1
    raise ValueError('no matching bracket found')


def append_note(existing, addition):
    existing = (existing or '').strip()
    return (existing + ' ' + addition).strip() if existing else addition


def apply_to_file(fname):
    path = os.path.join(DATA_DIR, fname)
    with open(path, encoding='utf-8') as f:
        content = f.read()

    start, end = find_array_bounds(content)
    array_text = content[start:end]
    data = json.JSONDecoder().raw_decode(array_text)[0]

    rows = [r for r in data if r.get('pid') == PID]
    assert len(rows) == 1, f'{fname}: expected exactly 1 existing Gabriel Mec row, found {len(rows)}'
    idx = next(i for i, r in enumerate(data) if r.get('pid') == PID)
    gremio = data[idx]

    assert gremio['season'] == '2025-2026', f'{fname}: unexpected season {gremio["season"]}'
    assert gremio.get('photo') is None, f'{fname}: photo already set -- unexpected'
    assert gremio.get('reportPdf') is None, f'{fname}: reportPdf already set -- unexpected'
    assert gremio['tier3']['crk'] == 8.52, f'{fname}: unexpected baseline crk {gremio["tier3"]["crk"]}'
    assert gremio['obi'] == 7.43 and gremio['sii'] == 7.93, f'{fname}: unexpected baseline obi/sii'
    assert gremio['t1']['shots'] == 13 and gremio['t1']['fouled'] == 19, f'{fname}: unexpected baseline t1'

    # --- 1. refresh the Grêmio row ---
    gremio['tier3']['crk'] = NEW_CRK
    gremio['tier3']['soa'] = NEW_SOA
    gremio['obi'] = NEW_OBI
    gremio['sii'] = NEW_SII

    legacy_keys = ['crk', 'dma', 'soa', 'crs', 'clm', 'mcs', 'spi']
    new_rmv = round(sum(gremio['tier3'][k] for k in legacy_keys) / len(legacy_keys), 2)
    gremio['rmv'] = new_rmv
    new_ultproxy = round((gremio['obi'] + gremio['sii'] + gremio['rmv']) / 3 * 10, 1)
    gremio['ultProxy'] = new_ultproxy

    gremio.pop('pairingPlayer', None)
    gremio['pairingPlayer'] = PAIRING_PLAYER_SHORT
    gremio['pairingNote'] = PAIRING_NOTE
    gremio['pairingList'] = [dict(p) for p in PAIRING_LIST]
    gremio['pairingVerified'] = True
    gremio['reportPdf'] = REPORT_PDF

    gremio['sch'] = append_note(gremio.get('sch'), GREMIO_SCH_ADD)

    # --- 2. build the new Porto row ---
    porto = {
        "n": "Gabriel Mec",
        "l": "Primeira Liga",
        "c": "Portugal",
        "f": "\U0001F1F5\U0001F1F9",
        "sq": "FC Porto",
        "nat": "BRA",
        "pos": gremio.get('pos', 'MF'),
        "age": gremio.get('age'),
        "mp": 0,
        "min": 0,
        "g": 0,
        "a": 0,
        "crdY": 0,
        "fga": None, "ult": None, "tmf": None, "log": None,
        "cci": None, "clu": None, "har": None, "thi": None, "ctx": None,
        "mgr": "",
        "phil": "",
        "sch": PORTO_SCH,
        "season": "2026-2027",
        "pid": PID,
        "pairingPlayer": PAIRING_PLAYER_SHORT,
        "pairingNote": PAIRING_NOTE,
        "pairingList": [dict(p) for p in PAIRING_LIST],
        "pairingVerified": True,
        "reportPdf": REPORT_PDF,
    }

    data.insert(idx + 1, porto)

    new_array_text = json.dumps(data, ensure_ascii=False, allow_nan=True)
    new_content = content[:start] + new_array_text + content[end:]

    os.makedirs(OUT_DIR, exist_ok=True)
    out_path = os.path.join(OUT_DIR, fname)
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f'{fname}: total_count {len(data)} (was {len(data)-1}), refreshed Grêmio row (new rmv={new_rmv}, ultProxy={new_ultproxy}), added Porto row, wrote {out_path}')


if __name__ == '__main__':
    for fname in ('platform.html', 'platform_es.html'):
        apply_to_file(fname)
