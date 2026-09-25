# -*- coding: utf-8 -*-
"""
Second pass on Frank Daroma's card (pid frank-daroma-usa-2000), per Jim's
follow-up after seeing the v1-deployed card live:

  "I don't see other season stats! and all pairings! All! All pairing
  match in the same line! and add his new footage for 2025-2026 :
  [dropbox link]. Please fill his card properly."

Changes on top of the v1 patch (obi/sii/rmv/ultProxy/tier3/videoMetrics/
photo/dob/ht/wt/foot already applied):

  1. Three NEW historical season rows added (career only had the single
     2025-2026 CS Switchbacks row before this): 2020-2021 LV Lights FC,
     2021-2022 LV Lights FC, 2024-2025 El Paso. Stats sourced from the
     FBref exports Jim supplied (Standard/Shooting/Miscellaneous_Stats),
     domestic-league-only figures, matching the convention already used
     on this player's existing row. Season-string convention confirmed
     against the existing 2026->"2025-2026" row (platform uses
     "(calendar_year-1)-(calendar_year)").
       - t1 (Advanced Stats box) populated per season from the same
         export: shots/sot/fouls/fouled/crosses/tklW always included;
         offside/og/sentOffs included only when nonzero for that season
         (avoids zero-value noise -- documented here, not silently
         decided).
       - photo/dob/ht/wt/foot/pairingPlayer/pairingVerified/pairingNote
         duplicated onto all three new rows, matching the precedent
         already established on this platform for Ouazane's multi-row
         record (player-level fields follow the player across seasons;
         grading fields (obi/sii/tier3/videoMetrics/t3status/
         gradingProgress) do NOT -- those stay only on the one row that
         was actually graded from match footage, 2025-2026).
       - fgaProxy/xps/stk/int are NOT added to the new rows -- no
         documented formula for these platform-derived figures was
         available, so they are left absent rather than guessed.
     NOT touched: the existing 2025-2026 row's own stat line (still the
     unresolved 14/18/20 three-way apps conflict from the v1 patch,
     flagged, not corrected).

  2. pairingPlayer on the current (2025-2026) row AND the new historical
     rows replaced with the full 5-entry ranked list in one line, per
     Jim's explicit "all pairing match in the same line" instruction --
     previously only "Marco Verratti -- 79% (Primary, preliminary)" was
     shown in that field, with the rest of the list buried in
     pairingNote. Still flagged preliminary (pairingVerified stays
     False) -- Jim did not ask to lift the draft/unvalidated flag, only
     to surface the full list.

  3. A 4th footage clip added to footageClips on the 2025-2026 row: the
     new Dropbox link Jim supplied for 2025-2026 footage. URL normalized
     from the pasted "&dl=0...raw=1" to "&raw=1" to match the format of
     the other three clips already on this record exactly.

Sources:
  - Jim, chat, 2026-09-25 (second message): season stats / full pairing
    line / new footage clip instructions + Dropbox URL.
  - FBref exports supplied earlier this session (Standard_Stats.xls,
    Shooting_Stats.xls, Miscellaneous_Stats.xls), read via
    pandas.read_html 2026-09-25.
"""
import json
import sys
import os

DATA_DIR = sys.argv[1] if len(sys.argv) > 1 else '.'
OUT_DIR = sys.argv[2] if len(sys.argv) > 2 else './out'

PID = 'frank-daroma-usa-2000'

PHOTO = "https://images.fotmob.com/image_resources/playerimages/1252846.png"
DOB = '2001-04-12'
HT = 1.63
WT = 60
FOOT = 'Right'

PAIRING_PLAYER_FULL = (
    "1. Marco Verratti 79% (Primary) · 2. Santi Cazorla 76% · "
    "3. N'Golo Kanté 72% · 4. Jody Morris 71% · "
    "5. Claude Makélélé 68% — preliminary, unvalidated"
)

# pairingNote is unchanged from v1 -- it already contains the full ranked
# list in prose form; this pass only changes what shows on the headline
# pairingPlayer line. Re-declared here so it can be applied to the new
# historical rows too (player-level field, follows the player).
PAIRING_NOTE = (
    "⚠ PRELIMINARY — PENDING FULL VALIDATION. Tier 3 is materially "
    "stronger than the earlier ESN draft files (11 of 12 core metrics "
    "transfer-ready, 134 logged events across 7 matches, balance check "
    "PASSED) — that is the differentiator from the earlier cards. But "
    "the report's own status line is still DRAFT, and it explicitly says "
    "no similarity percentage should be quoted to a client until Section "
    "9 validation gates clear, because Tier 1 (career stats) remains "
    "UNVERIFIED against a primary source and the primary pairing leans on "
    "it directly: \"If [pass accuracy] holds at 92%+, the pairing "
    "strengthens... if the true figure is closer to 86%, the "
    "ball-retention argument weakens materially and the rating pulls "
    "back toward 7.3\" (report, Section 8). That 92.8% figure could not "
    "be independently checked this round — the FBref export supplied "
    "doesn't include a passing-accuracy table. Separately, a same-day "
    "FBref cross-check found a discrepancy the report doesn't resolve "
    "either: report's 2026 Colorado Springs apps = 18, fresh FBref pull "
    "= 20 — worth reconciling via Sofascore/Transfermarkt/official club "
    "pages per the report's own punch list. "
    "Tactical DNA Pairing — Height-Filtered Small-Midfielder Lineage, "
    "ranked (full list): "
    "1. Marco Verratti 79% (primary — 165cm, 2cm taller than Daroma, the "
    "only elite modern midfielder built around being under 170cm; "
    "height/weight/position alignment 94–98%, but decision-consistency "
    "is the gap — Verratti rarely failed, Daroma fails about 1 in 4 "
    "times). "
    "2. Santi Cazorla 76% (secondary — technical two-footed benchmark, "
    "168cm; the 5cm gap is the main divergence, plus higher creative "
    "output and a more advanced role). "
    "3. N'Golo Kanté 72% (modern defensive benchmark — proof a "
    "sub-170cm midfielder can win the Premier League, Champions League "
    "and World Cup; role and duel-winning rate near-exact, but the "
    "weight gap, 68–71kg vs Daroma's 60kg, is the largest in this set). "
    "4. Jody Morris 71% (exact height match — the only 163cm player in "
    "the reference set, reached the Premier League with Chelsea at "
    "Daroma's exact height, but as a squad rotation player with a less "
    "technical game — proof of concept, not a stylistic template). "
    "5. Claude Makélélé 68% (defensive-midfield ceiling — positional "
    "mastery compensating for physical limitation, but the 6–11cm "
    "height gap and 4–10kg weight gap are material — Makélélé was "
    "small, not Daroma-small). "
    "Eliminated on height (the reflexive comparisons the report rules "
    "out): Xavi (170cm, +7cm), Andrés Iniesta (171cm, +8cm), Luka Modrić "
    "(172cm, +9cm) — all operate in a different physical register at "
    "7–9cm taller. "
    "Source: Empire FGA Scouting Report ESN-DAR-2026-002 (analyst Jim "
    "Totime, opened 2026-09-10, not completed). Supersedes the prior "
    "\"Nampalys Mendy\" pairing on this card (2026-09-14 proxy-estimate, "
    "an unweighted positional/physical comparison, not a computed "
    "metric match) — this is now a full Tactical DNA Pairing analysis."
)

NEW_CLIP = {
    "file": "Frank Daroma 2026.mp4",
    "type": "reel",
    "dbLink": "https://www.dropbox.com/scl/fi/uuuj7gqcigszrl6fmamhb/Frank-Daroma-2026.mp4?rlkey=dnbxnew0mqceyd1vacvsm19ud&raw=1",
}

# --- Historical season rows, sourced from FBref (domestic league only,
# matching this record's existing convention) ---
HIST_ROWS = [
    {
        "season": "2020-2021", "sq": "LV Lights FC", "age": 19,
        "mp": 32, "min": 2593, "g": 0, "a": 1, "crdY": 8,
        "t1": {
            "shots": 12, "sot": 3, "fouls": 42, "fouled": 57,
            "crosses": 9, "offside": 1, "tklW": 31, "og": 1,
            "source": "FBref, pulled 2026-09-25",
        },
    },
    {
        "season": "2021-2022", "sq": "LV Lights FC", "age": 20,
        "mp": 32, "min": 2388, "g": 0, "a": 2, "crdY": 6,
        "t1": {
            "shots": 13, "sot": 3, "fouls": 32, "fouled": 61,
            "crosses": 14, "offside": 2, "tklW": 25, "sentOffs": 1,
            "source": "FBref, pulled 2026-09-25",
        },
    },
    {
        "season": "2024-2025", "sq": "El Paso", "age": 23,
        "mp": 29, "min": 2410, "g": 1, "a": 4, "crdY": 9,
        "t1": {
            "shots": 19, "sot": 7, "fouls": 32, "fouled": 50,
            "crosses": 9, "tklW": 31,
            "source": "FBref, pulled 2026-09-25",
        },
    },
]

SCH_ADD = (
    "Card updated 2026-09-25 (second pass, same day): added 3 historical "
    "season rows (2020-2021 LV Lights FC, 2021-2022 LV Lights FC, "
    "2024-2025 El Paso) sourced from FBref domestic-league stats -- prior "
    "to this the card only carried the current 2025-2026 season. t1 "
    "advanced-stats box populated per season from the same export; "
    "zero-value offside/OG/sent-off fields omitted by convention rather "
    "than shown as noise. pairingPlayer changed from showing only the "
    "primary match to the full 5-entry ranked list on one line, applied "
    "to all rows for this pid, per Jim's explicit instruction. New "
    "2025-2026 footage clip added (Frank Daroma 2026.mp4)."
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


def make_hist_row(base_row, hist):
    row = {
        "n": base_row["n"],
        "l": base_row["l"],
        "c": base_row["c"],
        "f": base_row["f"],
        "sq": hist["sq"],
        "nat": base_row["nat"],
        "pos": base_row["pos"],
        "age": hist["age"],
        "mp": hist["mp"],
        "min": hist["min"],
        "g": hist["g"],
        "a": hist["a"],
        "crdY": hist["crdY"],
        "fga": None, "ult": None, "tmf": None, "log": None, "cci": None,
        "clu": None, "har": None, "thi": None, "ctx": None,
        "mgr": "", "phil": "",
        "sch": "FBref domestic-league stats, pulled 2026-09-25. Position assumed MF (career-long, not confirmed season-by-season from this export).",
        "season": hist["season"],
        "pid": PID,
        "photo": PHOTO, "dob": DOB, "ht": HT, "wt": WT, "foot": FOOT,
        "t1": hist["t1"],
        "pairingPlayer": PAIRING_PLAYER_FULL,
        "pairingVerified": False,
        "pairingNote": PAIRING_NOTE,
    }
    return row


def apply_to_file(fname):
    path = os.path.join(DATA_DIR, fname)
    with open(path, encoding='utf-8') as f:
        content = f.read()

    start, end = find_array_bounds(content)
    array_text = content[start:end]
    decoder = json.JSONDecoder()
    data, idx = decoder.raw_decode(array_text)
    assert idx == len(array_text), f'{fname}: trailing content after array'

    rows = [r for r in data if r.get('pid') == PID]
    assert len(rows) == 1, f'{fname}: expected exactly 1 Daroma row (v1 baseline), found {len(rows)}'
    row = rows[0]

    # baseline sanity checks against the v1-patched state
    assert row.get('obi') == 7.64 and row.get('sii') == 7.57, (
        f"{fname}: unexpected v1 baseline obi={row.get('obi')} sii={row.get('sii')}"
    )
    assert row.get('pairingPlayer') == 'Marco Verratti — 79% (Primary, preliminary)', (
        f"{fname}: unexpected v1 baseline pairingPlayer={row.get('pairingPlayer')!r}"
    )
    assert len(row.get('footageClips', [])) == 3, (
        f"{fname}: unexpected v1 baseline footageClips count={len(row.get('footageClips', []))}"
    )

    # 1. new footage clip on the current row
    row['footageClips'] = list(row['footageClips']) + [dict(NEW_CLIP)]

    # 2. full pairing list on one line, current row
    row['pairingPlayer'] = PAIRING_PLAYER_FULL

    # 3. sch note
    row['sch'] = append_note(row.get('sch'), SCH_ADD)

    # 4. three new historical rows
    new_rows = [make_hist_row(row, h) for h in HIST_ROWS]

    # Insert new rows immediately after the existing Daroma row's index,
    # preserving overall array order/locality (doesn't matter for the
    # renderer, but keeps the diff clean and predictable).
    daroma_idx = next(i for i, r in enumerate(data) if r.get('pid') == PID)
    data[daroma_idx + 1:daroma_idx + 1] = new_rows

    new_array_text = json.dumps(data, ensure_ascii=False, allow_nan=True)
    new_content = content[:start] + new_array_text + content[end:]

    os.makedirs(OUT_DIR, exist_ok=True)
    out_path = os.path.join(OUT_DIR, fname)
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f'{fname}: total_count {len(data)} (+{len(new_rows)}), wrote {out_path}')


if __name__ == '__main__':
    for fname in ('platform.html', 'platform_es.html'):
        apply_to_file(fname)
