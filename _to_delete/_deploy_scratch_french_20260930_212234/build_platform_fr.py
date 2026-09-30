import hashlib, os

BASE = os.path.expanduser("~/mnt/ESN - Git")
SCRATCH = os.path.join(BASE, "_deploy_scratch")
MARKER = 'const P    = '

def find_array_text(content, marker):
    start = content.index(marker) + len(marker)
    depth = 0; in_str = False; esc = False; i = start
    while i < len(content):
        c = content[i]
        if in_str:
            if esc: esc = False
            elif c == '\\': esc = True
            elif c == '"': in_str = False
        else:
            if c == '"': in_str = True
            elif c == '[': depth += 1
            elif c == ']':
                depth -= 1
                if depth == 0:
                    i += 1
                    break
        i += 1
    return content[start:i], start, i

with open(os.path.join(BASE, "platform.html"), encoding='utf-8') as f:
    platform = f.read()

arraytext, astart, aend = find_array_text(platform, MARKER)
pre_full_idx = platform.index(MARKER)

print("platform.html total chars:", len(platform))
print("array text chars:", len(arraytext))
print("array starts with:", arraytext[:20])
print("array ends with:", arraytext[-20:])

with open(os.path.join(SCRATCH, "chrome_pre_fr.html"), encoding='utf-8') as f:
    pre_fr = f.read()
with open(os.path.join(SCRATCH, "chrome_post_fr.html"), encoding='utf-8') as f:
    post_fr = f.read()

assembled = pre_fr + MARKER + arraytext + post_fr

with open(os.path.join(SCRATCH, "platform_fr.html"), 'w', encoding='utf-8', newline='') as f:
    f.write(assembled)

h = hashlib.sha256(assembled.encode('utf-8')).hexdigest()
print("platform_fr.html chars:", len(assembled))
print("platform_fr.html sha256:", h)

orig_prefix = platform[:pre_full_idx]
orig_suffix = platform[aend:]
print("orig prefix chars:", len(orig_prefix), "orig suffix chars:", len(orig_suffix))
with open(os.path.join(SCRATCH, "orig_prefix_hash.txt"), 'w') as f:
    f.write(hashlib.sha256(orig_prefix.encode('utf-8')).hexdigest())
with open(os.path.join(SCRATCH, "orig_suffix_hash.txt"), 'w') as f:
    f.write(hashlib.sha256(orig_suffix.encode('utf-8')).hexdigest())
print("done")
