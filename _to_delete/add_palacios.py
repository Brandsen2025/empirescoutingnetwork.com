import re, json

def find_array_end(content, start_idx):
    depth = 0; i = start_idx
    while True:
        if content[i] == '[': depth += 1
        elif content[i] == ']':
            depth -= 1
            if depth == 0: return i + 1
        i += 1

PALACIOS_CLIP = {
    "file": "Exequiel Palacios.mp4",
    "type": "reel",
    "dbLink": "https://www.dropbox.com/scl/fi/dzuyzh1nugs7lngf9x7uu/Exequiel-Palacios.mp4?rlkey=z42td152x7nfn7o3nlaqffw5g&raw=1",
}

for fname in ['platform.html', 'platform_es.html']:
    with open(fname, encoding='utf-8') as f:
        content = f.read()
    m = re.search(r'const P\s*=\s*\[', content)
    arr_start = m.end() - 1
    arr_end = find_array_end(content, arr_start)
    P = json.loads(content[arr_start:arr_end])
    rows = [p for p in P if p.get('pid') == 'exequiel-palacios-arg-1998' and p.get('sq') == 'River Plate' and p.get('season') == '2016']
    assert len(rows) == 1, f'{fname}: expected 1 River Plate 2016 Palacios row, found {len(rows)}'
    rows[0]['footageClips'] = [PALACIOS_CLIP]
    new_arr_text = json.dumps(P, ensure_ascii=False)
    content = content[:arr_start] + new_arr_text + content[arr_end:]
    with open(fname, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'{fname}: Exequiel Palacios (River Plate 2016) footage added OK')
