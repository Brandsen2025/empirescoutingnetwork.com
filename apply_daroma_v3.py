# -*- coding: utf-8 -*-
"""
Third pass on Frank Daroma's card, per Jim's feedback on the live v2 card
(screenshot + message, 2026-09-25):

  "Historical pairing unreadable! You can't do like season stats and put
  every pairing in a one single case to complete the line? Where is
  birthplace (Freetown, Sierra Leone) and Nationality in Player Info?"

Two separate problems, two separate fixes:

  1. BIO FIELDS (pure data, no code change): the renderer already
     supports p.pob ("Birthplace") and p.nat2 ("Other Nationality") --
     they were simply never populated on this record. Added to all 4
     rows (photo/dob/ht/wt/foot are already duplicated across every row
     for this pid; pob/nat2 follow the same precedent -- birthplace and
     nationality don't change by season).
       pob = "Freetown, Sierra Leone"
       nat2 = "Sierra Leone"
     (Format matches the existing convention on this platform -- checked
     against already-populated pob/nat2 values elsewhere in the file
     before using this format.)

  2. HISTORICAL PAIRING RENDERING (a real front-end bug, not a data
     problem): the openModal() renderer puts p.pairingPlayer into a
     SINGLE '.sbox' element sized for a short number/name (same CSS
     class the season-stat tiles use, '.sbox' / '.sbox-n' / '.sbox-l').
     v2 crammed the entire 5-entry ranked list into that one field as
     one long string, which is exactly what broke: it wrapped across
     ~10 lines of tiny text in that narrow box. Jim's fix suggestion --
     "do it like season stats" -- is correct and is what got implemented:
     the code now renders ONE '.sbox' PER pairing entry when a new
     p.pairingList array is present (percentage as the big number,
     player name as the label -- the exact same visual pattern already
     used for the season-stat tiles Jim was pointing at). This is an
     ADDITIVE change to the shared openModal() function in BOTH
     platform.html and platform_es.html (verified byte-identical at this
     code location in both files before patching): when p.pairingList is
     absent -- true for every other player on the platform, this field
     name was previously unused anywhere in the codebase, confirmed
     before writing this patch -- the code falls through to the exact
     same single-box rendering as before, so no other player's card
     is touched. p.pairingPlayer is kept (reverted to the short
     pre-v2 form) purely as the section's trigger condition and as a
     fallback for any other code path that reads it directly.

Sources:
  - Jim, chat, 2026-09-25 (third message on this player) + screenshot of
    the live v2 card showing the wrapped/unreadable pairing box.
"""
import json
import sys
import os

DATA_DIR = sys.argv[1] if len(sys.argv) > 1 else '.'
OUT_DIR = sys.argv[2] if len(sys.argv) > 2 else './out'

PID = 'frank-daroma-usa-2000'

POB = "Freetown, Sierra Leone"
NAT2 = "Sierra Leone"

PAIRING_PLAYER_SHORT = "Marco Verratti — 79% (Primary, preliminary)"

PAIRING_LIST = [
    {"name": "Marco Verratti", "pct": "79%", "primary": True},
    {"name": "Santi Cazorla", "pct": "76%"},
    {"name": "N'Golo Kanté", "pct": "72%"},
    {"name": "Jody Morris", "pct": "71%"},
    {"name": "Claude Makélélé", "pct": "68%"},
]

SCH_ADD = (
    "Card updated 2026-09-25 (third pass, same day): added pob/nat2 "
    "(Freetown, Sierra Leone) to Player Info; replaced the single-line "
    "pairingPlayer wall-of-text (unreadable in the UI, per Jim) with a "
    "new pairingList field rendering one stat-box per pairing entry, "
    "matching the season-stats box pattern -- required a small additive "
    "change to openModal() in both platform.html and platform_es.html "
    "(falls back to the old single-field rendering for every other "
    "player; pairingList did not exist as a field before this patch)."
)

# --- Exact JS block being replaced (verified present, identical, exactly
# once in each file before patching) ---
OLD_JS = (
    "      (p.pairingPlayer?(\n"
    "        '<div class=\"m-sec\"><i class=\"fas fa-people-arrows\" style=\"margin-right:5px;opacity:.6\"></i>Historical Pairing</div>'+\n"
    "        '<div class=\"stats-row\">'+\n"
    "          '<div class=\"sbox\"><div class=\"sbox-n\" style=\"font-size:.95em\">'+p.pairingPlayer+'</div><div class=\"sbox-l\">Benchmark Player'+(p.pairingVerified?' <span style=\"color:var(--cyan)\" title=\"Verified by FGA metrics (OBI/SII/RMV/ultProxy)\"><i class=\"fas fa-check-circle\"></i></span>':'')+'</div></div>'+\n"
    "        '</div>'+\n"
    "        '<div class=\"t3-real-note\" style=\"margin-top:6px;margin-bottom:4px;opacity:.85\">'+(p.pairingNote?p.pairingNote.replace(/</g,'&lt;'):'Analyst-assigned developmental benchmark (Jim Totime), not a computed metric.')+'</div>'\n"
    "      ):'')+"
)

NEW_JS = (
    "      (p.pairingPlayer?(\n"
    "        '<div class=\"m-sec\"><i class=\"fas fa-people-arrows\" style=\"margin-right:5px;opacity:.6\"></i>Historical Pairing</div>'+\n"
    "        '<div class=\"stats-row\">'+\n"
    "          (p.pairingList&&p.pairingList.length?p.pairingList.map(function(pl){\n"
    "            return '<div class=\"sbox\"><div class=\"sbox-n\" style=\"font-size:.95em\">'+(pl.pct||'')+'</div><div class=\"sbox-l\">'+pl.name+(pl.primary&&p.pairingVerified?' <span style=\"color:var(--cyan)\" title=\"Verified by FGA metrics (OBI/SII/RMV/ultProxy)\"><i class=\"fas fa-check-circle\"></i></span>':'')+'</div></div>';\n"
    "          }).join(''):'<div class=\"sbox\"><div class=\"sbox-n\" style=\"font-size:.95em\">'+p.pairingPlayer+'</div><div class=\"sbox-l\">Benchmark Player'+(p.pairingVerified?' <span style=\"color:var(--cyan)\" title=\"Verified by FGA metrics (OBI/SII/RMV/ultProxy)\"><i class=\"fas fa-check-circle\"></i></span>':'')+'</div></div>')+\n"
    "        '</div>'+\n"
    "        '<div class=\"t3-real-note\" style=\"margin-top:6px;margin-bottom:4px;opacity:.85\">'+(p.pairingNote?p.pairingNote.replace(/</g,'&lt;'):'Analyst-assigned developmental benchmark (Jim Totime), not a computed metric.')+'</div>'\n"
    "      ):'')+"
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

    # --- sanity: the JS patch target exists exactly once, and pairingList
    # is not already used anywhere in this file ---
    assert content.count(OLD_JS) == 1, (
        f'{fname}: expected exactly 1 occurrence of the pairing JS block, found {content.count(OLD_JS)}'
    )
    assert 'pairingList' not in content, f'{fname}: pairingList already present -- unexpected'

    start, end = find_array_bounds(content)
    array_text = content[start:end]
    decoder = json.JSONDecoder()
    data, idx = decoder.raw_decode(array_text)
    assert idx == len(array_text), f'{fname}: trailing content after array'

    rows = [r for r in data if r.get('pid') == PID]
    assert len(rows) == 4, f'{fname}: expected exactly 4 Daroma rows (v2 baseline), found {len(rows)}'

    current_row = next(r for r in rows if r.get('season') == '2025-2026')
    assert len(current_row.get('footageClips', [])) == 4, (
        f"{fname}: unexpected v2 baseline footageClips count={len(current_row.get('footageClips', []))}"
    )

    for row in rows:
        row['pob'] = POB
        row['nat2'] = NAT2
        row['pairingPlayer'] = PAIRING_PLAYER_SHORT
        row['pairingList'] = [dict(p) for p in PAIRING_LIST]
        if row is current_row:
            row['sch'] = append_note(row.get('sch'), SCH_ADD)

    new_array_text = json.dumps(data, ensure_ascii=False, allow_nan=True)
    new_content = content[:start] + new_array_text + content[end:]

    # --- apply the JS rendering patch (outside the array, so string
    # replace works regardless of how the array text shifted char offsets) ---
    assert new_content.count(OLD_JS) == 1, f'{fname}: JS target not found after data patch (unexpected)'
    new_content = new_content.replace(OLD_JS, NEW_JS, 1)

    os.makedirs(OUT_DIR, exist_ok=True)
    out_path = os.path.join(OUT_DIR, fname)
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f'{fname}: total_count {len(data)}, patched {len(rows)} Daroma rows + JS renderer, wrote {out_path}')


if __name__ == '__main__':
    for fname in ('platform.html', 'platform_es.html'):
        apply_to_file(fname)
