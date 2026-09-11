import json, re

def find_array_end(content, start_idx):
    depth = 0; i = start_idx
    while True:
        if content[i] == '[': depth += 1
        elif content[i] == ']':
            depth -= 1
            if depth == 0: return i + 1
        i += 1

with open('jpl_0809_0910.json', encoding='utf-8') as f:
    new_rows = json.load(f)

for fname in ['platform.html', 'platform_es.html']:
    with open(fname, encoding='utf-8') as f:
        content = f.read()
    m = re.search(r'const P\s*=\s*\[', content)
    assert m, f'const P not found in {fname}'
    arr_start = m.end() - 1
    arr_end = find_array_end(content, arr_start)
    P = json.loads(content[arr_start:arr_end])
    before = len(P)

    existing_pids = set(p.get('pid') for p in P)
    new_pids = set(r['pid'] for r in new_rows)
    collisions = new_pids & existing_pids
    assert not collisions, f'collision in {fname}: {collisions}'
    assert len(new_pids) == len(new_rows), 'internal dupe pids in new batch'

    # sanity: no Lukaku
    assert not any('lukaku' in r['n'].lower() for r in new_rows), 'Lukaku found in batch!'

    P.extend(new_rows)
    after = len(P)
    new_arr_text = json.dumps(P, ensure_ascii=False)
    new_content = content[:arr_start] + new_arr_text + content[arr_end:]
    with open(fname, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f'{fname}: rows {before} -> {after} (+{after-before})')
