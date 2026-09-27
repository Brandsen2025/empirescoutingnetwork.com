# -*- coding: utf-8 -*-
"""
Lenny Almada Correia refresh, per Jim's message 2026-09-27:
  "Next one to update: Lenny Almada Correia, photo: [gstatic thumbnail URL]"
  + attachments: Empire_FGA_Scouting_Report (PDF, ref ESN-ALM-2026-001),
    a genealogical-tree txt, and the same report as markdown text.

Lenny already existed on the platform (added 2026-09-14, Tier-3 graded
2026-09-17 -- NOT part of this session, pre-existing work). This is a
refresh against a new, more polished pass of the same assessment
(methodology upgraded to the Quality/Reliability two-number read, same
pattern as Daroma's and every other file this cycle).

WHAT CHANGED vs. what's already on the platform (checked field by field
before writing anything):
  - tier3.spi: 6 -> 6.42 (the only actual numeric change among the
    legacy 7-key tier3 set: crk/dma/soa/crs/clm/mcs all match exactly)
  - obi composite: 7.24 -> 7.34 (report states 7.34 explicitly)
  - sii composite: 8.65 -> 8.61 (report states 8.61 explicitly)
  - rmv: recomputed from the same avg(crk,dma,soa,crs,clm,mcs,spi)
    convention used elsewhere on this platform, with only spi changed:
    5.78 -> 5.84
  - photo: net-new, per Jim's message
  - reportPdf: net-new, same reports/ mechanism as Dimarco/Luna/Daroma
  - pairingPlayer/pairingNote/pairingList: replaced. Old value was
    Jim's own manual proxy pairing (Vurnon Anita, flagged
    PROXY_ESTIMATE, not validated). New report computes a ranked
    3-player pairing set (Wan-Bissaka 76% / Semedo 74% / Aurier 71%)
    from explicit per-FGA-component alignment tables -- a materially
    different, metric-derived methodology, not a swap of one guess for
    another. Set pairingVerified=True on that basis (my call, flagged
    to Jim, not silently assumed -- the report itself never uses the
    word "verified").

WHAT WAS DELIBERATELY NOT TOUCHED, because I don't have a confident
basis to touch it:
  - crs (9, off a single event) -- the new report does not re-score
    CRS at all (absent from both the radar chart and the full
    scorecard table in the PDF). Nothing contradicts the old value, so
    it's carried forward unchanged rather than guessed at.
  - ultProxy (72.23) -- I don't have a verified formula linking it to
    rmv (checked: it is NOT a constant multiple of rmv, ruled out by
    comparing against Daroma's rmv/ultProxy pair). Recomputing it
    without that formula would be fabricating a number, so it's left
    as-is and flagged to Jim instead.

A REAL DISCREPANCY, flagged rather than resolved: the platform's
existing sch note (from the 2026-09-17 grading pass) says "157 logged
events across 4 matches." Today's report says "~110 logged events"
across the same 4 matches. Not reconciled here -- noted in the sch
append and surfaced to Jim directly.

Mechanical additions bundled in because they're the same class of bug
already found and fixed for Daroma this cycle: Lenny_Almada_Correia.html
already exists on disk (built same day, already reflects the new
report's numbers and pairing) but was not in EXISTING_PROFILES in
either platform file, so "View Full Profile" would have shown "Coming
Soon" despite the page existing. Also missing from players.html
entirely. Both fixed here.

Sources: Jim, chat, 2026-09-27 + PDF attachment (Empire FGA Scouting
Report, ref ESN-ALM-2026-001, 10pp) + genealogical tree txt + report
markdown txt.
"""
import json
import sys
import os

DATA_DIR = sys.argv[1] if len(sys.argv) > 1 else '.'
OUT_DIR = sys.argv[2] if len(sys.argv) > 2 else './out'

PID = 'lenny-almada-correia-lux-2002'

PHOTO = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD_MZqQ-M_8QHM2cADw_-OrGYANIjUIve00dst9gI-1A&s=10"
REPORT_PDF = 'reports/Lenny_Almada_Correia_Empire_FGA_Scouting_Report.pdf'

NEW_OBI = 7.34
NEW_SII = 8.61
NEW_SPI = 6.42

PAIRING_PLAYER_SHORT = "Aaron Wan-Bissaka — 76% (Primary)"
PAIRING_NOTE = (
    "Tactical DNA pairing set, Empire FGA Scouting Report ref "
    "ESN-ALM-2026-001 (2026-09-27): three-way ranked comparison "
    "(Wan-Bissaka / Semedo / Aurier), each scored component-by-component "
    "against Lenny's own FGA metrics (SII composite, OMS, DMA, OBI_T, "
    "SOA, discipline) rather than a single subjective match. Replaces "
    "the prior manual PROXY_ESTIMATE pairing (Vurnon Anita, unvalidated)."
)
PAIRING_LIST = [
    {"name": "Aaron Wan-Bissaka", "pct": "76%", "primary": True},
    {"name": "Nélson Semedo", "pct": "74%"},
    {"name": "Serge Aurier", "pct": "71%"},
]

SCH_ADD = (
    "Refresh 2026-09-27 (analyst: Jim Totime) -- new pass of the same "
    "Empire FGA Scouting Report (ref ESN-ALM-2026-001), methodology "
    "upgraded to the Quality/Reliability two-number read (same upgrade "
    "applied platform-wide this cycle). Field-by-field vs. the "
    "2026-09-17 grading: spi 6.00->6.42 (only tier3 legacy-key change), "
    "obi 7.24->7.34, sii 8.65->8.61, rmv recomputed 5.78->5.84 "
    "(avg of crk/dma/soa/crs/clm/mcs/spi, only spi moved). crk/dma/soa/"
    "clm/mcs/crs all unchanged -- crs specifically NOT re-scored in "
    "this report (absent from both the radar and the full scorecard), "
    "so carried forward unflagged-but-stale rather than guessed. "
    "ultProxy (72.23) NOT recomputed -- no verified formula linking it "
    "to rmv (ruled out a constant multiplier against other graded "
    "players' rmv/ultProxy pairs). UNRESOLVED DISCREPANCY, flagged not "
    "fixed: prior sch says 157 logged events across 4 matches; this "
    "report says ~110 logged events across the same 4 matches -- the "
    "two files disagree on evidence volume and this has not been "
    "reconciled. Added photo (Jim, chat) and reportPdf (same reports/ "
    "mechanism as Dimarco/Luna/Daroma; source PDF is DRAFT / TIER 1 "
    "EMPTY / NOT CLIENT-READY per its own cover page, published anyway "
    "consistent with Jim's standing call on this class of document). "
    "Replaced pairingPlayer/pairingNote with pairingList (3-entry ranked "
    "set, metric-derived -- see pairingNote) and set pairingVerified=True "
    "on that basis. Also added to EXISTING_PROFILES (Lenny_Almada_"
    "Correia.html already existed on disk, already reflected this "
    "report's numbers, but was not linked -- same bug class as Daroma's "
    "card) and to players.html (was entirely absent from the directory)."
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


EP_OLD = '"Lennart_Karl.html", '
EP_NEW = '"Lennart_Karl.html", "Lenny_Almada_Correia.html", '

PLAYERS_OLD = (
    '<a class="p-row" href="Lennart_Karl.html" data-name="lennart karl">'
    '<span class="p-name">Lennart Karl</span><span class="p-arrow">&rsaquo;</span></a>\n      '
)
PLAYERS_NEW = (
    PLAYERS_OLD +
    '<a class="p-row" href="Lenny_Almada_Correia.html" data-name="lenny almada correia">'
    '<span class="p-name">Lenny Almada Correia</span><span class="p-arrow">&rsaquo;</span></a>\n      '
)


def apply_to_platform(fname):
    path = os.path.join(DATA_DIR, fname)
    with open(path, encoding='utf-8') as f:
        content = f.read()

    assert content.count(EP_OLD) == 1, f'{fname}: EP anchor count {content.count(EP_OLD)}'
    assert '"Lenny_Almada_Correia.html"' not in content, f'{fname}: already present -- unexpected'
    content = content.replace(EP_OLD, EP_NEW, 1)

    start, end = find_array_bounds(content)
    array_text = content[start:end]
    data = json.JSONDecoder().raw_decode(array_text)[0]

    rows = [r for r in data if r.get('pid') == PID]
    assert len(rows) == 1, f'{fname}: expected exactly 1 Lenny row, found {len(rows)}'
    row = rows[0]

    assert row.get('photo') is None, f'{fname}: photo already set -- unexpected'
    assert row.get('reportPdf') is None, f'{fname}: reportPdf already set -- unexpected'
    assert row['tier3']['spi'] == 6, f'{fname}: unexpected baseline spi {row["tier3"]["spi"]}'
    assert row['obi'] == 7.24 and row['sii'] == 8.65, f'{fname}: unexpected baseline obi/sii'

    row['photo'] = PHOTO
    row['reportPdf'] = REPORT_PDF
    row['obi'] = NEW_OBI
    row['sii'] = NEW_SII
    row['tier3']['spi'] = NEW_SPI

    legacy_keys = ['crk', 'dma', 'soa', 'crs', 'clm', 'mcs', 'spi']
    new_rmv = round(sum(row['tier3'][k] for k in legacy_keys) / len(legacy_keys), 2)
    row['rmv'] = new_rmv

    row.pop('pairingPlayer', None)
    row['pairingPlayer'] = PAIRING_PLAYER_SHORT
    row['pairingNote'] = PAIRING_NOTE
    row['pairingList'] = [dict(p) for p in PAIRING_LIST]
    row['pairingVerified'] = True

    row['sch'] = append_note(row.get('sch'), SCH_ADD)

    new_array_text = json.dumps(data, ensure_ascii=False, allow_nan=True)
    new_content = content[:start] + new_array_text + content[end:]

    os.makedirs(OUT_DIR, exist_ok=True)
    out_path = os.path.join(OUT_DIR, fname)
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f'{fname}: total_count {len(data)}, patched Lenny row (new rmv={new_rmv}), added to EXISTING_PROFILES, wrote {out_path}')


def apply_to_players_html():
    path = os.path.join(DATA_DIR, 'players.html')
    with open(path, encoding='utf-8') as f:
        content = f.read()

    assert content.count(PLAYERS_OLD) == 1, f'players.html: anchor count {content.count(PLAYERS_OLD)}'
    assert 'Lenny_Almada_Correia.html' not in content, 'players.html: already present -- unexpected'
    new_content = content.replace(PLAYERS_OLD, PLAYERS_NEW, 1)

    os.makedirs(OUT_DIR, exist_ok=True)
    out_path = os.path.join(OUT_DIR, 'players.html')
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f'players.html: added Lenny Almada Correia entry, wrote {out_path}')


if __name__ == '__main__':
    for fname in ('platform.html', 'platform_es.html'):
        apply_to_platform(fname)
    apply_to_players_html()
