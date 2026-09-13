# -*- coding: utf-8 -*-
import re, subprocess, sys

for fname in ('platform.html', 'platform_es.html'):
    with open(fname, encoding='utf-8') as f:
        content = f.read()
    blocks = re.findall(r'<script[^>]*>(.*?)</script>', content, re.DOTALL)
    print(f'{fname}: {len(blocks)} script blocks')
    for i, b in enumerate(blocks):
        if not b.strip():
            continue
        tmp = f'_verify_{i}.js'
        with open(tmp, 'w', encoding='utf-8') as f:
            f.write(b)
        r = subprocess.run(['node', '--check', tmp], capture_output=True, text=True)
        if r.returncode != 0:
            print(f'  BLOCK {i}: SYNTAX ERROR')
            print(r.stderr)
            sys.exit(1)
    print(f'  all {len(blocks)} blocks OK')
print('ALL FILES VERIFIED OK')
