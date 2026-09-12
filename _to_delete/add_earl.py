import re, json

def find_array_end(content, start_idx):
    depth = 0; i = start_idx
    while True:
        if content[i] == '[': depth += 1
        elif content[i] == ']':
            depth -= 1
            if depth == 0: return i + 1
        i += 1

EARL_CLIP = {
    "file": "Earl Edwards.mp4",
    "type": "reel",
    "dbLink": "https://www.dropbox.com/scl/fi/igkpmo92c657an7btozlv/Earl-Edwards.mp4?rlkey=vl67tgeoauoq0r1kro6654113&raw=1",
}

for fname in ['platform.html', 'platform_es.html']:
    with open(fname, encoding='utf-8') as f:
        content = f.read()
    m = re.search(r'const P\s*=\s*\[', content)
    arr_start = m.end() - 1
    arr_end = find_array_end(content, arr_start)
    P = json.loads(content[arr_start:arr_end])
    rows = [p for p in P if p.get('pid') == 'earl-edwards-jr-usa-1992']
    assert len(rows) == 1, f'{fname}: expected 1 Earl Edwards Jr. row, found {len(rows)}'
    rows[0]['footageClips'] = [EARL_CLIP]
    new_arr_text = json.dumps(P, ensure_ascii=False)
    content = content[:arr_start] + new_arr_text + content[arr_end:]
    with open(fname, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'{fname}: Earl Edwards Jr. footage added OK')
