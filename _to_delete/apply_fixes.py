import re, json

def find_array_end(content, start_idx):
    depth = 0; i = start_idx
    while True:
        if content[i] == '[': depth += 1
        elif content[i] == ']':
            depth -= 1
            if depth == 0: return i + 1
        i += 1

KEVON_CLIP = {
    "file": "Kevon Lambert.mp4",
    "type": "reel",
    "dbLink": "https://www.dropbox.com/scl/fi/3lfipg5m7wiw9bu0x28ou/Kevon-Lambert.mp4?rlkey=6f6n1c1zroznc0hg3gta4krr3&raw=1",
}

for fname in ['platform.html', 'platform_es.html']:
    with open(fname, encoding='utf-8') as f:
        content = f.read()

    # 1. Fix HD_MAP: add Slovenia -> Europe (fixes bogus 7th "Other" continent bucket)
    before_map = '"Saudi Arabia": "Asia", "Scotland": "Europe"'
    after_map = '"Saudi Arabia": "Asia", "Scotland": "Europe", "Slovenia": "Europe"'
    assert content.count(before_map) == 1, f'{fname}: HD_MAP anchor not found once'
    content = content.replace(before_map, after_map)

    # 2. Fix unreadable season-pill text color (--t3 too dark against its background)
    before_pill = '.hd-season-pill{font-family:var(--M);font-size:.57rem;color:var(--t3);'
    after_pill = '.hd-season-pill{font-family:var(--M);font-size:.57rem;color:var(--t2);'
    assert content.count(before_pill) == 1, f'{fname}: hd-season-pill rule not found once'
    content = content.replace(before_pill, after_pill)

    # 3. Fix Metrics Hierarchy Explained: formula line color
    before_formula = '.mleg-formula{font-family:var(--M);font-size:.58rem;color:var(--t3);'
    after_formula = '.mleg-formula{font-family:var(--M);font-size:.58rem;color:var(--t2);'
    assert content.count(before_formula) == 1, f'{fname}: mleg-formula rule not found once'
    content = content.replace(before_formula, after_formula)

    # 4. Fix Metrics Hierarchy Explained: "Scale: ..." weight-line inline color (9 occurrences)
    before_weight = 'mleg-weight" style="color:var(--t3)"'
    after_weight = 'mleg-weight" style="color:var(--t2)"'
    n = content.count(before_weight)
    assert n == 9, f'{fname}: expected 9 mleg-weight t3 occurrences, found {n}'
    content = content.replace(before_weight, after_weight)

    # 5. Add Kevon Lambert's footage clip
    m = re.search(r'const P\s*=\s*\[', content)
    arr_start = m.end() - 1
    arr_end = find_array_end(content, arr_start)
    P = json.loads(content[arr_start:arr_end])
    kl = [p for p in P if p.get('pid') == 'kevon-lambert-jam-1996']
    assert len(kl) == 1, f'{fname}: expected exactly 1 Kevon Lambert row, found {len(kl)}'
    kl[0]['footageClips'] = [KEVON_CLIP]
    new_arr_text = json.dumps(P, ensure_ascii=False)
    content = content[:arr_start] + new_arr_text + content[arr_end:]

    with open(fname, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'{fname}: all 5 fixes applied OK')
