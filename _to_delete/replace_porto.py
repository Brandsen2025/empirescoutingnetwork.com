# -*- coding: utf-8 -*-
# Replaces the 27 already-spliced (and incorrectly built) Porto 1997-98 rows
# with the corrected version: sq is now hardcoded to the profiled team
# ('FC Porto') instead of following club9697 (last season's club), which had
# wrongly shown transferred-in players as if they were still playing for
# their old 1996/97 club during the profiled 1997-98 season.
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
print('corrected rows:', len(new_rows))
new_pids = {r['pid'] for r in new_rows}
assert len(new_pids) == len(new_rows)

for fname in ('platform.html', 'platform_es.html'):
    with open(fname, encoding='utf-8') as f:
        content = f.read()

    m = re.search(r'const\s+P\s*=\s*\[', content)
    arr_start = m.end() - 1
    arr_end = find_array_end(content, arr_start)
    arr_text = content[arr_start:arr_end + 1]
    arr = json.loads(arr_text)

    before = len(arr)
    kept = [r for r in arr if not (r.get('pid') in new_pids and r.get('season') == '1997-98')]
    removed = before - len(kept)
    print(fname, 'removed old rows:', removed)
    assert removed == 27, f'{fname}: expected to remove 27 old Porto rows, removed {removed}'

    kept.extend(new_rows)
    new_arr_text = json.dumps(kept, ensure_ascii=False)
    content = content[:arr_start] + new_arr_text + content[arr_end + 1:]

    with open(fname, 'w', encoding='utf-8') as f:
        f.write(content)
    print(fname, 'new total rows:', len(kept))

print('DONE')
