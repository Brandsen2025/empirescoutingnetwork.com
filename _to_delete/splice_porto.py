# -*- coding: utf-8 -*-
# Splices Porto's 27 Portugal Primeira Liga 1997-98 rows into the
# `const P = [...]` array in platform.html and platform_es.html.
# Run on the device (cwd = the "ESN - Git" folder).
import json, re

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

with open('porto_rows.json', encoding='utf-8') as f:
    new_rows = json.load(f)

print('new rows:', len(new_rows))
new_pids = {r['pid'] for r in new_rows}
assert len(new_pids) == len(new_rows), 'dup pid within new rows'

for fname in ('platform.html', 'platform_es.html'):
    with open(fname, encoding='utf-8') as f:
        content = f.read()

    m = re.search(r'const\s+P\s*=\s*\[', content)
    assert m, f'{fname}: const P = [ marker not found'
    arr_start = m.end() - 1  # index of '['
    arr_end = find_array_end(content, arr_start)

    arr_text = content[arr_start:arr_end + 1]
    existing = json.loads(arr_text)
    print(fname, 'existing rows:', len(existing))

    existing_pids = {r.get('pid') for r in existing if r.get('pid')}
    collisions = new_pids & existing_pids
    assert not collisions, f'{fname}: pid collisions: {collisions}'

    existing.extend(new_rows)
    new_arr_text = json.dumps(existing, ensure_ascii=False)

    content = content[:arr_start] + new_arr_text + content[arr_end + 1:]

    with open(fname, 'w', encoding='utf-8') as f:
        f.write(content)

    print(fname, 'new total rows:', len(existing))

print('DONE')
