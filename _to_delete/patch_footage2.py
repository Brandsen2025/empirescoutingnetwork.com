# -*- coding: utf-8 -*-
import json

def find_array_end(content, start_idx):
    depth = 0; i = start_idx
    while True:
        if content[i] == '[':
            depth += 1
        elif content[i] == ']':
            depth -= 1
            if depth == 0:
                return i + 1
        i += 1

FOOTAGE = {
    "adolfo-gaich-arg-1998": [
        {"file": "Adolfo Gaich.mp4", "type": "reel",
         "dbLink": "https://www.dropbox.com/scl/fi/jvpe4pyv8hdc3xoiat3r3/Adolfo-Gaich.mp4?rlkey=ptny24lcb9bv6fijysd1oazha&raw=1"},
    ],
    "unknown-unk-unk2054": [
        {"file": "Adrien Julloux.mp4", "type": "reel",
         "dbLink": "https://www.dropbox.com/scl/fi/abyo6enavuiiwu601ia6h/Adrien-Julloux.mp4?rlkey=rtiztwohngwqpt4g4evfifd4x&raw=1"},
    ],
}

def patch(path):
    with open(path, encoding='utf-8') as f:
        content = f.read()
    idx = content.find('const P')
    b = content.find('[', idx)
    e = find_array_end(content, b)
    rows = json.loads(content[b:e])

    patched = []
    for r in rows:
        if r.get('pid') in FOOTAGE:
            if r.get('footageClips'):
                print(f"  WARNING: {r['n']} ({r['pid']}) already has footageClips -- overwriting")
            r['footageClips'] = FOOTAGE[r['pid']]
            patched.append(r['n'])

    new_arr_text = json.dumps(rows, ensure_ascii=False, separators=(",", ":"))
    new_content = content[:b] + new_arr_text + content[e:]
    with open(path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"{path}: patched footageClips for {patched}")

patch('platform.html')
patch('platform_es.html')
