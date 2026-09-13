# -*- coding: utf-8 -*-
import json, re, io

def find_array_end(text, start_idx):
    # start_idx points at the '[' character
    depth = 0
    i = start_idx
    in_str = False
    str_ch = ''
    esc = False
    while i < len(text):
        ch = text[i]
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
                    return i
        i += 1
    raise ValueError('array end not found')

with open('rfef_rows.json', encoding='utf-8') as f:
    new_rows = json.load(f)

print('new rows to add:', len(new_rows))
new_pids = [r['pid'] for r in new_rows]
assert len(new_pids) == len(set(new_pids)), 'internal dupe pids in new batch'

for fname in ('platform.html', 'platform_es.html'):
    with open(fname, encoding='utf-8') as f:
        content = f.read()

    m = re.search(r'const\s+P\s*=\s*\[', content)
    if not m:
        raise ValueError(f'{fname}: const P = [ not found')
    arr_start = m.end() - 1  # index of '['
    arr_end = find_array_end(content, arr_start)

    array_text = content[arr_start:arr_end + 1]
    existing = json.loads(array_text)
    print(f'{fname}: existing rows = {len(existing)}')

    existing_pids = set(r.get('pid') for r in existing if r.get('pid'))
    collisions = set(new_pids) & existing_pids
    assert not collisions, f'{fname}: pid collisions found: {collisions}'

    merged = existing + new_rows
    merged_json = json.dumps(merged, ensure_ascii=False)

    new_content = content[:arr_start] + merged_json + content[arr_end + 1:]

    with open(fname, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f'{fname}: rows {len(existing)} -> {len(merged)} (+{len(new_rows)})')

print('DONE')
