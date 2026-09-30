import json, os, hashlib

BASE = os.path.expanduser("~/mnt/ESN - Git")
MARKER = 'const P    = '

def find_array_text(content, marker):
    start = content.index(marker) + len(marker)
    depth = 0; in_str = False; esc = False; i = start
    while i < len(content):
        ch = content[i]
        if in_str:
            if esc: esc = False
            elif ch == '\\': esc = True
            elif ch == '"': in_str = False
        else:
            if ch == '"': in_str = True
            elif ch == '[': depth += 1
            elif ch == ']':
                depth -= 1
                if depth == 0:
                    i += 1
                    break
        i += 1
    return content[start:i], start, i

# pull the exact two rows already written into platform.html (source of truth)
with open(os.path.join(BASE, 'platform.html'), encoding='utf-8') as fh:
    src_content = fh.read()
src_arr_text, _, _ = find_array_text(src_content, MARKER)
src_arr = json.loads(src_arr_text)
muteba_rows = [p for p in src_arr if p.get('pid') == 'elior-muteba-fra-2010']
assert len(muteba_rows) == 2, f"expected 2 muteba rows in platform.html, found {len(muteba_rows)}"

path = os.path.join(BASE, 'platform_fr.html')
with open(path, encoding='utf-8') as fh:
    content = fh.read()
arr_text, astart, aend = find_array_text(content, MARKER)
arr = json.loads(arr_text)
assert not any(p.get('pid') == 'elior-muteba-fra-2010' for p in arr), "platform_fr.html: pid already exists!"
before = len(arr)
arr.extend(muteba_rows)
new_arr_text = json.dumps(arr, ensure_ascii=False, allow_nan=True)
new_content = content[:astart] + new_arr_text + content[aend:]

clubs_marker = 'const CLUBS={'
cidx = new_content.index(clubs_marker)
insert_at = cidx + len(clubs_marker)
assert '"U16 R1"' not in new_content[cidx:new_content.index('};', cidx)+2], "platform_fr.html: U16 R1 already in CLUBS"
new_content = new_content[:insert_at] + '"U16 R1":["US Torcy U16"],' + new_content[insert_at:]

with open(path, 'w', encoding='utf-8', newline='') as fh:
    fh.write(new_content)

print('platform_fr.html', 'before_rows', before, 'after_rows', before+2,
      'sha256', hashlib.sha256(new_content.encode('utf-8')).hexdigest(),
      'bytes', len(new_content.encode('utf-8')))
