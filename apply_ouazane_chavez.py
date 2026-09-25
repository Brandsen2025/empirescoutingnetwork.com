# -*- coding: utf-8 -*-
"""
Update Abdellah Ouazane and Mateo Chavez cards on the client-facing platform:
  - photo (URLs supplied by Jim)
  - full bio/physical details (DOB, height, weight, foot, contract, intl note)
  - corrected/added season stat rows from freshly-pulled FBref exports
  - Tactical DNA Pairing: ranked list + percentages, using the platform's
    EXISTING (previously unused) p.pairingPlayer / p.pairingVerified /
    p.pairingNote schema -- confirmed present in openModal() but populated
    on zero players platform-wide before this edit.

Per Jim's explicit decision (AskUserQuestion, 2026-09-23/24): publish the
pairing percentages exactly as the scouting reports state them, but flag
the card clearly as preliminary/unvalidated pending video validation.
Both source PDFs (ESN-OUA-2026-001, ESN-CHV-2026-003) are marked
"DRAFT -- EVIDENCE INCOMPLETE -- NOT CLIENT-READY" and instruct that no
similarity percentage should be quoted to a client until Section 7/8
validation gates clear. This is why pairingVerified=False and pairingNote
opens with an explicit warning on both cards, and why the raw Tier 3
video sub-metric grades (OBI/SII/DMA/etc, some flagged as containing
duplicate/mislabeled events) are deliberately NOT added to the platform
in this pass -- Jim only authorized the pairing percentages, not the
underlying (partially contaminated) event-level grades.

Data-integrity fix folded in (same pattern as the Anisse Saidi age fix
earlier this session): both players' "age" fields were stale, and
Chavez's existing 2025-26 AZ Alkmaar row had wrong season totals
(mp16/min618/g0/a1 vs FBref's confirmed final mp20/min829/g1/a2, which
also matches the scouting report's own Tier 1 table). Corrected with a
cited sch note rather than silently overwritten.

Sources:
  - Jim, chat, 2026-09-24: photo URLs, "fill properly", pairing decision.
  - Empire FGA Scouting Report -- Abdellah Ouazane (ESN-OUA-2026-001,
    analyst Jim Totime, opened 2026-07-24, not completed).
  - Empire FGA Scouting Report -- Mateo Chavez (ESN-CHV-2026-003, analyst
    Jim Totime, opened 2026-09-24, not completed).
  - FBref exports supplied by Jim (Standard/Shooting/Playing_Time/
    Miscellaneous Stats, both players), read via pandas.read_html
    2026-09-24.
"""
import json
import sys
import os

DATA_DIR = sys.argv[1] if len(sys.argv) > 1 else '.'
OUT_DIR = sys.argv[2] if len(sys.argv) > 2 else './out'

TODAY = '2026-09-24'

OUAZANE_PHOTO = "https://sortitoutsi.b-cdn.net/uploads/face/face_2000467056.png"
CHAVEZ_PHOTO = "https://sortitoutsi.b-cdn.net/uploads/face/face_2000283330.png"

OUAZANE_BIONOTE = (
    "Morocco U17 international — Player of the Tournament, AFCON U17 2025 "
    "(6 matches, 2 goals, 2 assists, CAF/beIN)."
)

OUAZANE_PAIRING_NOTE = (
    "⚠ PRELIMINARY — PENDING VIDEO VALIDATION. Based on 1 of 12 Tier 3 "
    "metrics logged (OBI_P only, ✅ OK; every other sub-metric is "
    "VIDEO_PENDING or MATCH_SPREAD); FGA_v3_Final is BLOCKED; only 2 of 5 "
    "required matches are registered and Match 1's own event log does not "
    "reconcile with its register entry. Treat every percentage below as a "
    "working hypothesis, not a confirmed rating. "
    "Tactical DNA Pairing — Number 10 lineage, ranked: "
    "1. Zinedine Zidane 79% (primary — 183cm, defensive brief + feint-based "
    "dribbling, closest structural match). "
    "2. Mustapha Hadji 75% (secondary — height match ±1cm, but downweighted "
    "on club output: 12 PL goals across 3 seasons vs reputation). "
    "3. Jude Bellingham 74% (tertiary — was 82% pre-video; revised down 8pts, "
    "decision-making gap is the largest divergence). "
    "4. Jay-Jay Okocha 72% (isolation-dribbler branch — matches the flagged "
    "\"does too much\" pattern in the decision-making data). "
    "5. Luka Modrić 68% (demoted — was 76%; video passing evidence is almost "
    "entirely negative). "
    "6. Zico 63% (rejected — fails the physical/role filter; confirms he is "
    "NOT a pure technical-playmaker archetype). "
    "Also assessed and removed from the tree: Abdelmajid Dolmy (168cm, 15cm "
    "below Ouazane — different physical/aerial profile). "
    "Known data-quality issues in the underlying event log (per the report's "
    "own integrity flags): 2 duplicate-timestamp entries inflating scores, "
    "5 failure events mis-tagged \"positive indicator\" (would drop DMA from "
    "6.15 to ~5.4 if corrected — the single number that decides whether "
    "Zidane holds at 79% or falls into the low 70s), and Match 1's opponent "
    "does not match its register entry. "
    "Source: Empire FGA Scouting Report ESN-OUA-2026-001 (analyst Jim "
    "Totime, opened 2026-07-24, not completed). Full validation requires 5 "
    "matches minimum, OBI_T and SII_R currently unscored (zero events "
    "each), and independent second-scout blind cross-validation."
)

CHAVEZ_BIONOTE = (
    "Mexico senior international — 1 World Cup start, 1 goal (2026 World Cup "
    "vs Czechia, 55'). Youngest Mexican World Cup goalscorer at 22 years, 41 "
    "days; MVP award, 89% pass accuracy, 4/5 ground duels won."
)

CHAVEZ_PAIRING_NOTE = (
    "⚠ PRELIMINARY — PENDING VIDEO VALIDATION. 0 of 12 Tier 3 metrics "
    "scored; no ESN video assessment has been conducted; FGA_v3_Final is "
    "BLOCKED. Every percentage below is a research-phase hypothesis derived "
    "from public data and analyst consensus, not a validated finding. "
    "Tactical DNA Pairing — Pure Left-Back Lineage, ranked: "
    "1. Silvio Marzolini 78% (primary — identical height 177cm, orthodox "
    "carrilero role, technical-quality-over-physicality profile). "
    "2. Giovanni van Bronckhorst 77% (modern benchmark — Messi's "
    "favourite-XI pick, 2010 World Cup final captain; matches Chávez's "
    "two-way output). "
    "3. Alberto Tarantini 75% (physical twin — 179cm/72kg vs 177cm/72kg, "
    "same career evolution from defensive LB to wing-back, matching \"fiery "
    "temper\"). "
    "4. José Antonio Camacho 73% (defensive benchmark — \"ferocious "
    "man-marking of Johan Cruyff\"; Chávez's top-5% tackle rate and 32 "
    "successful 1v1 duels are measured against this). "
    "5. Marinho Chagas 72% (attacking-extreme branch — role match near-exact, "
    "but defensive profiles diverge — Chagas was explicitly criticised for "
    "defensive lapses). "
    "6. Raphaël Guerreiro 71% (technical mirror — closest match for left-foot "
    "delivery and build-up play, but 7cm height gap and lower defensive "
    "output are real divergences). "
    "Superseded: an earlier draft (pre-v2.1) used Salcido 73% / Lahm 76% "
    "under an inverted-full-back model — corrected once his role was "
    "confirmed as orthodox left-back (81% of career apps at LB). "
    "Domestic Mexican conversion pathway (reference only, not a pairing): "
    "Ramón Ramírez → Carlos Salcido → Jesús Gallardo → Chávez — every "
    "significant modern Mexican left-back was converted from another "
    "position; Chávez follows the same path. "
    "The swing factor for his ceiling: 0.31 yellow cards/match (36 Y / 2 R "
    "in 115 apps) is a discipline outlier against this entire lineage — "
    "Marzolini, Camacho and Van Bronckhorst were all controlled "
    "competitors; this has followed him from Chivas to AZ and is not yet "
    "solved. "
    "Source: Empire FGA Scouting Report ESN-CHV-2026-003 (analyst Jim "
    "Totime, opened 2026-09-24, not completed). Validation requires 5 "
    "matches minimum video-logged (0 of 5 done), all 12 Tier 3 sub-metrics "
    "currently empty, and independent second-scout blind cross-validation."
)

CHAVEZ_ROW1_SCH_ADD = (
    "Season totals corrected 2026-09-24 (Domestic Eredivisie 2025-26): "
    "mp 16→20, min 618→829, g 0→1, a 1→2 — prior figures were stale; "
    "corrected values cross-confirmed by FBref export and the scouting "
    "report's own Tier 1 table (ESN-CHV-2026-003)."
)

CHAVEZ_ROW3_SCH = (
    "New row added 2026-09-24 (current season, sourced FBref export "
    "supplied by Jim). 2026-27 Eredivisie: 7 apps (2 starts), 559 min, "
    "1G/3A, 1 yellow. Same player as the AZ Alkmaar 2025-26 and Jong AZ "
    "2025-26 rows on this platform (pid mateo-chavez-mex-2004)."
)

OUAZANE_ROW1_SCH_ADD = (
    "Age corrected 16→17 (2026-09-24) — DOB 2009-01-15 per Empire FGA "
    "Scouting Report ESN-OUA-2026-001; player turned 17 in Jan 2026."
)

OUAZANE_ROW2_SCH = (
    "New row added 2026-09-24 (current season, first-team minutes, sourced "
    "FBref export supplied by Jim — not covered by the scouting report, "
    "which predates this breakthrough). 2026-27 Eredivisie (Ajax "
    "Amsterdam first team): 7 apps (2 starts), 274 min, 1G, 1 yellow, "
    "1 red (sent off). Same player as the Jong Ajax 2025-26 row on this "
    "platform (pid abdellah-ouazane-mar-2009)."
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
    decoder = json.JSONDecoder()
    data, idx = decoder.raw_decode(array_text)
    assert idx == len(array_text), f'{fname}: trailing content after array'

    # ---- locate existing rows ----
    ouazane_row = None
    chavez_row1 = None  # AZ Alkmaar Eredivisie 2025-26
    chavez_row2 = None  # Jong AZ Keuken Kampioen Divisie 2025-26
    for r in data:
        if r.get('pid') == 'abdellah-ouazane-mar-2009' and r.get('season') == '2025-2026':
            assert ouazane_row is None, f'{fname}: duplicate Ouazane 2025-2026 row'
            ouazane_row = r
        if r.get('pid') == 'mateo-chavez-mex-2004' and r.get('season') == '2025-2026':
            if r.get('sq') == 'AZ Alkmaar':
                assert chavez_row1 is None, f'{fname}: duplicate Chavez AZ Alkmaar row'
                chavez_row1 = r
            elif r.get('sq') == 'Jong AZ':
                assert chavez_row2 is None, f'{fname}: duplicate Chavez Jong AZ row'
                chavez_row2 = r

    assert ouazane_row is not None, f'{fname}: Ouazane 2025-2026 row NOT FOUND'
    assert chavez_row1 is not None, f'{fname}: Chavez AZ Alkmaar 2025-26 row NOT FOUND'
    assert chavez_row2 is not None, f'{fname}: Chavez Jong AZ 2025-26 row NOT FOUND'

    # ---- OUAZANE: existing 2025-26 Jong Ajax row ----
    assert ouazane_row['age'] == 16, f"expected age 16, got {ouazane_row['age']}"
    ouazane_row['age'] = 17
    ouazane_row['photo'] = OUAZANE_PHOTO
    ouazane_row['dob'] = '2009-01-15'
    ouazane_row['ht'] = 1.83
    ouazane_row['wt'] = 74
    ouazane_row['foot'] = 'Right'
    ouazane_row['bioNote'] = OUAZANE_BIONOTE
    ouazane_row['t1'] = {
        'shots': 34, 'sot': 13, 'fouls': 14, 'fouled': 38, 'crosses': 4,
        'tklW': 8, 'source': 'FBref, pulled 2026-09-24',
    }
    ouazane_row['pairingPlayer'] = 'Zinedine Zidane — 79% (Primary, preliminary)'
    ouazane_row['pairingVerified'] = False
    ouazane_row['pairingNote'] = OUAZANE_PAIRING_NOTE
    ouazane_row['sch'] = append_note(ouazane_row.get('sch'), OUAZANE_ROW1_SCH_ADD)

    # ---- OUAZANE: new 2026-27 Ajax first-team row ----
    ouazane_row2 = {
        'n': 'Abdellah Ouazane', 'l': 'Eredivisie', 'c': 'Netherlands', 'f': '\U0001F1F3\U0001F1F1',
        'sq': 'Ajax Amsterdam', 'nat': 'MAR', 'pos': 'MF', 'age': 17,
        'mp': 7, 'min': 274, 'g': 1, 'a': 0, 'crdY': 2,
        'fga': None, 'ult': None, 'tmf': None, 'log': None, 'cci': None,
        'clu': None, 'har': None, 'thi': None, 'ctx': None,
        'mgr': '', 'phil': '', 'sch': OUAZANE_ROW2_SCH,
        'season': '2026-2027', 'pid': 'abdellah-ouazane-mar-2009',
        'photo': OUAZANE_PHOTO, 'dob': '2009-01-15', 'ht': 1.83, 'wt': 74,
        'foot': 'Right', 'bioNote': OUAZANE_BIONOTE,
        't1': {
            'shots': 16, 'sot': 4, 'fouls': 3, 'fouled': 3, 'crosses': 14,
            'tklW': 2, 'sentOffs': 1, 'source': 'FBref, pulled 2026-09-24',
        },
        'pairingPlayer': 'Zinedine Zidane — 79% (Primary, preliminary)',
        'pairingVerified': False,
        'pairingNote': OUAZANE_PAIRING_NOTE,
    }
    oz_idx = data.index(ouazane_row)
    data.insert(oz_idx + 1, ouazane_row2)

    # ---- CHAVEZ: existing AZ Alkmaar 2025-26 row (correct + enrich) ----
    assert chavez_row1['mp'] == 16 and chavez_row1['min'] == 618, (
        f"unexpected Chavez row1 baseline mp={chavez_row1['mp']} min={chavez_row1['min']}"
    )
    chavez_row1['mp'] = 20
    chavez_row1['min'] = 829
    chavez_row1['g'] = 1
    chavez_row1['a'] = 2
    chavez_row1['photo'] = CHAVEZ_PHOTO
    chavez_row1['dob'] = '2004-05-12'
    chavez_row1['ht'] = 1.77
    chavez_row1['wt'] = 72
    chavez_row1['foot'] = 'Left'
    chavez_row1['contractEnd'] = '2030-06-30'
    chavez_row1['bioNote'] = CHAVEZ_BIONOTE
    chavez_row1['t1'] = {
        'shots': 15, 'sot': 5, 'fouls': 13, 'fouled': 15, 'crosses': 24,
        'tklW': 33, 'source': 'FBref, pulled 2026-09-24',
    }
    chavez_row1['pairingPlayer'] = 'Silvio Marzolini — 78% (Primary, preliminary)'
    chavez_row1['pairingVerified'] = False
    chavez_row1['pairingNote'] = CHAVEZ_PAIRING_NOTE
    chavez_row1['sch'] = append_note(chavez_row1.get('sch'), CHAVEZ_ROW1_SCH_ADD)

    # ---- CHAVEZ: existing Jong AZ 2025-26 row (enrich, no stat correction needed) ----
    chavez_row2['photo'] = CHAVEZ_PHOTO
    chavez_row2['dob'] = '2004-05-12'
    chavez_row2['ht'] = 1.77
    chavez_row2['wt'] = 72
    chavez_row2['foot'] = 'Left'
    chavez_row2['contractEnd'] = '2030-06-30'
    chavez_row2['bioNote'] = CHAVEZ_BIONOTE
    chavez_row2['t1'] = {
        'shots': 3, 'sot': 1, 'fouls': 1, 'fouled': 1, 'crosses': 6,
        'tklW': 1, 'source': 'FBref, pulled 2026-09-24',
    }
    chavez_row2['pairingPlayer'] = 'Silvio Marzolini — 78% (Primary, preliminary)'
    chavez_row2['pairingVerified'] = False
    chavez_row2['pairingNote'] = CHAVEZ_PAIRING_NOTE

    # ---- CHAVEZ: new 2026-27 AZ Alkmaar row ----
    chavez_row3 = {
        'n': 'Mateo Chávez', 'l': 'Eredivisie', 'c': 'Netherlands', 'f': '\U0001F1F3\U0001F1F1',
        'sq': 'AZ Alkmaar', 'nat': 'MEX', 'pos': 'DF', 'age': 22,
        'mp': 7, 'min': 559, 'g': 1, 'a': 3, 'crdY': 1,
        'fga': None, 'ult': None, 'tmf': None, 'log': None, 'cci': None,
        'clu': None, 'har': None, 'thi': None, 'ctx': None,
        'mgr': '', 'phil': '', 'sch': CHAVEZ_ROW3_SCH,
        'season': '2026-2027', 'pid': 'mateo-chavez-mex-2004',
        'photo': CHAVEZ_PHOTO, 'dob': '2004-05-12', 'ht': 1.77, 'wt': 72,
        'foot': 'Left', 'contractEnd': '2030-06-30', 'bioNote': CHAVEZ_BIONOTE,
        't1': {
            'shots': 8, 'sot': 4, 'fouls': 9, 'fouled': 6, 'crosses': 18,
            'tklW': 10, 'source': 'FBref, pulled 2026-09-24',
        },
        'pairingPlayer': 'Silvio Marzolini — 78% (Primary, preliminary)',
        'pairingVerified': False,
        'pairingNote': CHAVEZ_PAIRING_NOTE,
    }
    cv_idx = data.index(chavez_row1)
    data.insert(cv_idx + 1, chavez_row3)

    new_array_text = json.dumps(data, ensure_ascii=False, allow_nan=True)
    new_content = content[:start] + new_array_text + content[end:]

    os.makedirs(OUT_DIR, exist_ok=True)
    out_path = os.path.join(OUT_DIR, fname)
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f'{fname}: total_count {len(data)} (was {len(data)-2}), wrote {out_path}')


if __name__ == '__main__':
    for fname in ('platform.html', 'platform_es.html'):
        apply_to_file(fname)
