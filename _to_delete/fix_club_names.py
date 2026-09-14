# -*- coding: utf-8 -*-
# Fixes club-name strings on the 27 already-spliced FC Porto rows so they
# match the platform's established canonical spelling (used by CLUBS[] and
# thousands of existing rows) instead of the source guide's own abbreviated
# printing. Also adds the 5 Primeira Liga 1997-98 clubs that are entirely
# missing from the CLUBS["Primeira Liga"] dropdown list.
import json, re

NORMALIZE = {
    'F.C.Porto': 'FC Porto',
    'Sp.Braga': 'Sp. Braga',
    'Maritimo': 'Marítimo',
    'V.Guimaraes': 'V. Guimarães',
    'V.Setubal': 'V. Setúbal',
}

PORTO_PIDS = None  # filled from porto_rows.json below

def normalize_club_fields(row):
    for f in ('sq', 'club9697', 'firstClubPT'):
        if row.get(f) in NORMALIZE:
            row[f] = NORMALIZE[row[f]]
    for pc in row.get('previousClubs') or []:
        if pc.get('club') in NORMALIZE:
            pc['club'] = NORMALIZE[pc['club']]

with open('porto_rows.json' if False else '_to_delete/porto_rows.json', encoding='utf-8') as f:
    porto_rows = json.load(f)
PORTO_PIDS = {r['pid'] for r in porto_rows}
print('porto pids:', len(PORTO_PIDS))

MISSING_CLUBS = ['Académica', 'Campomaiorense', 'Leça', 'Salgueiros', 'Varzim']

def find_array_end(s, start_idx):
    depth = 0
    i = start_idx
    started = False
    while i < len(s):
        ch = s[i]
        if ch == '[':
            depth += 1
            started = True
        elif ch == ']':
            depth -= 1
            if started and depth == 0:
                return i
        elif ch == '"':
            i += 1
            while i < len(s):
                if s[i] == '\\':
                    i += 2
                    continue
                if s[i] == '"':
                    break
                i += 1
        i += 1
    raise ValueError('array end not found')

for fname in ('platform.html', 'platform_es.html'):
    with open(fname, encoding='utf-8') as f:
        content = f.read()

    # --- 1. fix club-name strings on the 27 Porto rows ---
    m = re.search(r'const\s+P\s*=\s*\[', content)
    arr_start = m.end() - 1
    arr_end = find_array_end(content, arr_start)
    arr_text = content[arr_start:arr_end + 1]
    arr = json.loads(arr_text)

    fixed = 0
    for row in arr:
        if row.get('pid') in PORTO_PIDS and row.get('season') == '1997-98':
            before = json.dumps(row, ensure_ascii=False)
            normalize_club_fields(row)
            after = json.dumps(row, ensure_ascii=False)
            if before != after:
                fixed += 1
    print(fname, 'rows with club-name fixes:', fixed)

    new_arr_text = json.dumps(arr, ensure_ascii=False)
    content = content[:arr_start] + new_arr_text + content[arr_end + 1:]

    # --- 2. add the 5 missing clubs to CLUBS["Primeira Liga"] ---
    cm = re.search(r'"Primeira Liga":\s*\[', content)
    assert cm, f'{fname}: CLUBS Primeira Liga key not found'
    c_start = cm.end() - 1
    c_end = find_array_end(content, c_start)
    club_arr = json.loads(content[c_start:c_end + 1])
    added = [c for c in MISSING_CLUBS if c not in club_arr]
    club_arr = sorted(set(club_arr) | set(MISSING_CLUBS), key=lambda s: s.lower())
    new_club_text = json.dumps(club_arr, ensure_ascii=False)
    content = content[:c_start] + new_club_text + content[c_end + 1:]
    print(fname, 'clubs added to dropdown:', added)

    with open(fname, 'w', encoding='utf-8') as f:
        f.write(content)

print('DONE')
