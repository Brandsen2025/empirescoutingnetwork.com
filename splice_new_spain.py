# -*- coding: utf-8 -*-
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

with open('all_rows_spain.json', encoding='utf-8') as f:
    all_rows = json.load(f)
print('all_rows_spain.json total:', len(all_rows))
all_pids = [r['pid'] for r in all_rows]
assert len(all_pids) == len(set(all_pids)), 'duplicate pid within all_rows_spain.json itself'

for fname in ('platform.html', 'platform_es.html'):
    with open(fname, encoding='utf-8') as f:
        content = f.read()

    m = re.search(r'const\s+P\s*=\s*\[', content)
    arr_start = m.end() - 1
    arr_end = find_array_end(content, arr_start)
    arr = json.loads(content[arr_start:arr_end + 1])

    existing_pids = {r.get('pid') for r in arr if r.get('pid')}
    new_rows = [r for r in all_rows if r['pid'] not in existing_pids]
    print(fname, 'new rows to add:', len(new_rows), '| already present:', len(all_rows) - len(new_rows))

    arr.extend(new_rows)
    new_arr_text = json.dumps(arr, ensure_ascii=False)
    content = content[:arr_start] + new_arr_text + content[arr_end + 1:]

    with open(fname, 'w', encoding='utf-8') as f:
        f.write(content)
    print(fname, 'new total rows:', len(arr))

print('DONE')
