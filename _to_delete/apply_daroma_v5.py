# -*- coding: utf-8 -*-
"""
Fifth pass on Frank Daroma's card, per Jim's message with the new PDF
attachment: "Last thing I forgot, put his scouting report close to his
player profile lik Federico Dimarco or Alex Luna."

Mechanism confirmed by querying live platform.html for both reference
players: p.reportPdf is a relative path under reports/, rendered by
openModal()'s existing "View Scouting Report" link -- no JS change
needed here, purely a data addition (same pattern as pob/nat2 in v3).

reportPdf is treated as a player-level field (like photo/dob/pob/nat2),
not season-specific -- a scouting report covers the player, not one
season -- so it's set on all 4 Daroma rows, matching the precedent
already established for other player-level fields on this pid.

IMPORTANT CONTEXT (flagged to Jim before this patch, he confirmed
"attach it as-is anyway"): the source PDF
(Empire_FGA___Scouting_Report___Frank_Daroma.pdf, uploaded 2026-09-25)
is explicitly marked DRAFT / TIER 1 UNVERIFIED throughout, and its own
closing line says the FGA number and similarity percentage in it
"should [not] be quoted to a client, used in a demo, or entered into a
client-facing card until the validation gates in Section 9 are
cleared." Unlike Dimarco's ("FULLY VALIDATED") and (presumably) Luna's
linked reports, this file carries those warnings directly to anyone who
opens the link from the client-facing card. Jim was shown this
distinction explicitly and chose to proceed anyway -- consistent with
his earlier "publish anyway, flagged as draft" ruling on this player's
data generally. Not silently assumed.

File placement: the PDF was transferred to
C:\\ESN - Git\\reports\\Frank_Daroma_Empire_FGA_Scouting_Report.pdf
(named to match the Dimarco/Luna/Masereka convention: <Name>_<descriptor>.pdf
inside reports/) via SendUserFile + device_commit_files, separately from
this script.

Sources: Jim, chat, 2026-09-25 (fifth message on this player) + PDF
attachment (Empire_FGA___Scouting_Report___Frank_Daroma.pdf, 13pp).
"""
import json
import sys
import os

DATA_DIR = sys.argv[1] if len(sys.argv) > 1 else '.'
OUT_DIR = sys.argv[2] if len(sys.argv) > 2 else './out'

PID = 'frank-daroma-usa-2000'
REPORT_PDF = 'reports/Frank_Daroma_Empire_FGA_Scouting_Report.pdf'

SCH_ADD = (
    "Card updated 2026-09-25 (fifth pass, same day): added reportPdf "
    "link (Empire FGA Scouting Report, DRAFT/Tier 1 unverified per the "
    "source document -- Jim confirmed publishing it anyway, same as the "
    "provisional FGA range) -- View Scouting Report now live on the "
    "platform card, same mechanism as Dimarco/Luna."
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

    rows = [r for r in data if r.get('pid') == PID]
    assert len(rows) == 4, f'{fname}: expected exactly 4 Daroma rows (v4 baseline), found {len(rows)}'

    for row in rows:
        assert row.get('reportPdf') is None, f'{fname}: reportPdf already set on a Daroma row -- unexpected'
        row['reportPdf'] = REPORT_PDF
        if row.get('season') == '2025-2026':
            row['sch'] = append_note(row.get('sch'), SCH_ADD)

    new_array_text = json.dumps(data, ensure_ascii=False, allow_nan=True)
    new_content = content[:start] + new_array_text + content[end:]

    os.makedirs(OUT_DIR, exist_ok=True)
    out_path = os.path.join(OUT_DIR, fname)
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f'{fname}: total_count {len(data)}, set reportPdf on {len(rows)} Daroma rows, wrote {out_path}')


if __name__ == '__main__':
    for fname in ('platform.html', 'platform_es.html'):
        apply_to_file(fname)
