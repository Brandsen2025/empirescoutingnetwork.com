# -*- coding: utf-8 -*-
"""
Gabriel Mec photo, per Jim 2026-09-28:
  "Add his photo : https://sortitoutsi.b-cdn.net/uploads/face/face_2000385385.png"

Sets p.photo on BOTH of his rows (2025-2026 Grêmio, 2026-2027 Porto) --
photo is a player-level field per the established convention (same
treatment as pob/nat2/pairing fields this session), not season-specific.

Sources: Jim, chat, 2026-09-28.
"""
import json
import sys
import os

DATA_DIR = sys.argv[1] if len(sys.argv) > 1 else '.'
OUT_DIR = sys.argv[2] if len(sys.argv) > 2 else './out'

PID = 'gabriel-mec-bra-2007'
PHOTO = 'https://sortitoutsi.b-cdn.net/uploads/face/face_2000385385.png'


def find_array_bounds(content):
    idx = content.index('const P')
    start = content.index('[', idx)
    depth = 0
    in_str = False
    str_ch = ''
    esc = False
    for i in range(start, len(content)):
        ch = content[i]
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
                    return start, i + 1
    raise ValueError('no matching bracket found')


def apply_to_file(fname):
    path = os.path.join(DATA_DIR, fname)
    with open(path, encoding='utf-8') as f:
        content = f.read()

    start, end = find_array_bounds(content)
    array_text = content[start:end]
    data = json.JSONDecoder().raw_decode(array_text)[0]

    rows = [r for r in data if r.get('pid') == PID]
    assert len(rows) == 2, f'{fname}: expected exactly 2 Gabriel Mec rows, found {len(rows)}'

    for row in rows:
        assert row.get('photo') is None, f'{fname}: photo already set on {row.get("season")} row -- unexpected'
        row['photo'] = PHOTO

    new_array_text = json.dumps(data, ensure_ascii=False, allow_nan=True)
    new_content = content[:start] + new_array_text + content[end:]

    os.makedirs(OUT_DIR, exist_ok=True)
    out_path = os.path.join(OUT_DIR, fname)
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f'{fname}: total_count {len(data)}, set photo on {len(rows)} Gabriel Mec rows, wrote {out_path}')


if __name__ == '__main__':
    for fname in ('platform.html', 'platform_es.html'):
        apply_to_file(fname)
