# -*- coding: utf-8 -*-
"""
Update Frank Daroma's card (pid frank-daroma-usa-2000) on the client-facing
platform, per the new Empire FGA Scouting Report ESN-DAR-2026-002
(analyst Jim Totime, opened 2026-09-10, PDF generated 2026-09-25).

This supersedes an EXISTING, already-populated record from an earlier
grading pass (2026-09-14/21, gradingProgress=10, obi=7.40, sii=7.27,
pairingPlayer="Nampalys Mendy" — an explicitly unvalidated PROXY_ESTIMATE
from Jim's separate pairing database, not a computed Tactical DNA Pairing).

Changes:
  - photo (URL supplied by Jim)
  - bio fields (dob/ht/wt/foot) -- not previously on this record
  - Tier 3 composites re-graded under the report's new Quality/Reliability
    two-number methodology: obi 7.40->7.64, sii 7.27->7.57. rmv and
    ultProxy recomputed using the SAME formula already established on this
    exact record (rmv=avg(CRK,DMA,SOA,CRS,CLM,MCS,SPI), ultProxy=avg(OBI,
    SII,rmv)*10 -- both per the pre-existing sch note, "consistent with
    the Dimarco precedent") with the new quality inputs. gradingProgress
    10->11 (report: 11 of 12 core metrics transfer-ready, only MCS below
    threshold). tier3/videoMetrics dicts rebuilt from the new report's
    metric set (dgp/mrk/unp/lgp/rds dropped -- not part of the new
    methodology's metric set, superseded, not silently kept).
  - Tactical DNA Pairing REPLACED with the new report's full 5-entry
    ranked list + eliminated-on-height list, per Jim's explicit
    instruction ("for the pairing add the entire list match"). Still
    flagged preliminary/unvalidated (pairingVerified=False) because the
    report's own status line is still DRAFT and explicitly forbids
    quoting a similarity percentage to a client until Section 9
    validation gates clear -- same standing policy Jim set for
    Ouazane/Chavez (AskUserQuestion, 2026-09-23/24: publish anyway,
    flagged as draft/unvalidated).

Deliberately NOT changed: mp/min/g/a/crdY/xps/stk/int/fgaProxy/
footageClips. The report's own Tier 1 table (18 apps, 2026 Colorado
Springs) conflicts with a fresh same-day FBref pull (20 apps) AND with
this row's existing figure (14 apps) -- a three-way disagreement with no
clear correction, unlike Chavez's case where FBref and the report agreed
with each other against a stale platform figure. Flagged in sch, not
silently resolved. The 92.8% pass-accuracy figure the report calls "the
single most important number in the file" (it anchors the primary
Verratti pairing) could not be checked this round -- no passing-stats
file was in this upload batch.

Sources:
  - Jim, chat, 2026-09-25: "His T3 is graded, for the pairing add the
    entire list match." + photo URL.
  - Empire FGA Scouting Report -- Frank Daroma (ESN-DAR-2026-002).
  - FBref exports supplied by Jim (Standard/Shooting/Playing_Time/
    Miscellaneous/Player_Club_Summary/Last_5_Matches), read via
    pandas.read_html 2026-09-25.
"""
import json
import sys
import os

DATA_DIR = sys.argv[1] if len(sys.argv) > 1 else '.'
OUT_DIR = sys.argv[2] if len(sys.argv) > 2 else './out'

DAROMA_PHOTO = "https://images.fotmob.com/image_resources/playerimages/1252846.png"

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

T3STATUS = (
    "⚠️ Re-graded 2026-09-25 per Empire FGA Scouting Report "
    "ESN-DAR-2026-002 (upgraded Quality/Reliability two-number "
    "methodology) — 11 of 12 core metrics transfer-ready (only MCS below "
    "threshold: 2 distinct matches vs 3 required), 134 logged events "
    "across 7 matches, balance check PASSED (2 vs top-third opposition, "
    "2 away, 1 while losing). Still 1 scout only (Jim Totime) — second "
    "scout for blind cross-validation NOT ASSIGNED. Supersedes the prior "
    "2026-09-21 workbook pass (10/12 metrics, 6 matches)."
)

SCH_ADD = (
    "Card updated 2026-09-25 per Empire FGA Scouting Report "
    "ESN-DAR-2026-002: photo added; Tier 3 composites re-graded under "
    "the new Quality/Reliability methodology (OBI 7.40→7.64, SII "
    "7.27→7.57; rmv/ultProxy recomputed with the same pre-existing "
    "platform formula on this record); Tactical DNA Pairing replaced "
    "(was \"Nampalys Mendy\" proxy-estimate — now a full 5-way ranked "
    "comparison, flagged preliminary per standing policy). Season stat "
    "line (mp/min/g/a) deliberately left untouched: the report's own "
    "Tier 1 table (18 apps, 2026 Colorado Springs) conflicts with a "
    "fresh same-day FBref pull (20 apps) and with this row's existing "
    "figure (14 apps) — a three-way disagreement, not corrected pending "
    "primary-source verification (Sofascore/Transfermarkt/official club "
    "pages) per the report's own punch list item #1. The 92.8% pass-"
    "accuracy figure anchoring the primary pairing could not be checked "
    "this round — no passing-stats file was supplied."
)

NEW_TIER3 = {
    'clm': 8.60, 'dma': 8.17, 'oms': 8.20, 'chr': 8.00, 'soa': 7.88,
    'spi': 7.29, 'int': 7.08, 'drb': 8.33, 'dyn': 6.00, 'crs': 8.50,
    'crk': 8.50, 'mcs': 7.00,
}

NEW_VIDEO_METRICS = {
    'key': 8.67, 'otp': 7.80, 'hzp': 7.71, 'car': 7.50, 'tac': 9.00,
    'vrp': 7.50, 'stk': 7.00,
    'source': (
        'Tier-3 video scoring per Empire FGA Scouting Report '
        'ESN-DAR-2026-002 (Philosophy-Fit Priority Metrics table), '
        'Quality column (0-10 positive-event average); Hit Rate/'
        'Reliability shown separately in the report, not duplicated '
        'here. Re-graded 2026-09-25, supersedes the 2026-09-21 workbook '
        'pass -- dgp/mrk/unp/lgp/rds from that earlier pass are not part '
        'of this report\'s metric set and are dropped rather than kept '
        'stale.'
    ),
}


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
    decoder = json.JSONDecoder()
    data, idx = decoder.raw_decode(array_text)
    assert idx == len(array_text), f'{fname}: trailing content after array'

    row = None
    for r in data:
        if r.get('pid') == 'frank-daroma-usa-2000':
            assert row is None, f'{fname}: duplicate Daroma row'
            row = r
    assert row is not None, f'{fname}: Daroma row NOT FOUND'

    # baseline sanity checks -- abort if the record isn't what we expect
    assert row.get('obi') == 7.4 and row.get('sii') == 7.27, (
        f"{fname}: unexpected baseline obi={row.get('obi')} sii={row.get('sii')}"
    )
    assert row.get('pairingPlayer') == 'Nampalys Mendy', (
        f"{fname}: unexpected baseline pairingPlayer={row.get('pairingPlayer')!r}"
    )
    assert row.get('gradingProgress') == 10, (
        f"{fname}: unexpected baseline gradingProgress={row.get('gradingProgress')}"
    )

    rmv = round((8.50 + 8.17 + 7.88 + 8.50 + 8.60 + 7.00 + 7.29) / 7, 2)
    ult_proxy = round((7.64 + 7.57 + rmv) / 3 * 10, 2)

    row['photo'] = DAROMA_PHOTO
    row['dob'] = '2001-04-12'
    row['ht'] = 1.63
    row['wt'] = 60
    row['foot'] = 'Right'

    row['obi'] = 7.64
    row['sii'] = 7.57
    row['rmv'] = rmv
    row['ultProxy'] = ult_proxy
    row['gradingProgress'] = 11
    row['t3status'] = T3STATUS
    row['tier3'] = dict(NEW_TIER3)
    row['videoMetrics'] = dict(NEW_VIDEO_METRICS)

    row['pairingPlayer'] = 'Marco Verratti — 79% (Primary, preliminary)'
    row['pairingVerified'] = False
    row['pairingNote'] = PAIRING_NOTE

    row['sch'] = append_note(row.get('sch'), SCH_ADD)

    new_array_text = json.dumps(data, ensure_ascii=False, allow_nan=True)
    new_content = content[:start] + new_array_text + content[end:]

    os.makedirs(OUT_DIR, exist_ok=True)
    out_path = os.path.join(OUT_DIR, fname)
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f'{fname}: total_count {len(data)}, rmv={rmv}, ultProxy={ult_proxy}, wrote {out_path}')


if __name__ == '__main__':
    for fname in ('platform.html', 'platform_es.html'):
        apply_to_file(fname)
