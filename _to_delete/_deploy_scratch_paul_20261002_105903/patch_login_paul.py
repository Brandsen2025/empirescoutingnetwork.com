import hashlib, os

BASE = os.path.expanduser("~/mnt/ESN - Git")
path = os.path.join(BASE, "login.html")

with open(path, encoding='utf-8') as f:
    content = f.read()

OLD = """    {
      // Pitshou Muteba — new client
      // username: pitshou.muteba / password set by Jim on 2026-09-30
      // General session: French-language platform (platform_fr.html), not personalized
      uh: 'c409138a000b2c839c2b11326bfb4d2a095df58ae5d0f346515726f2aeed6762',
      ph: '55d98d47988e6b159a1b66bb5cbf05ca8e522fbd3b376bef547b48d62c38a7e7',
      redirect: 'platform_fr.html'
    }
  ];"""

NEW = """    {
      // Pitshou Muteba — new client
      // username: pitshou.muteba / password set by Jim on 2026-09-30
      // General session: French-language platform (platform_fr.html), not personalized
      uh: 'c409138a000b2c839c2b11326bfb4d2a095df58ae5d0f346515726f2aeed6762',
      ph: '55d98d47988e6b159a1b66bb5cbf05ca8e522fbd3b376bef547b48d62c38a7e7',
      redirect: 'platform_fr.html'
    },
    {
      // Paul Albert — new collaborator (B2B/sales, Erasmus for Young Entrepreneurs exchange)
      // username: paul.albert / password set by Jim on 2026-10-02
      // General session: default platform.html, not personalized -- separate from his
      // existing Firebase-based login (see FIREBASE_REDIRECTS below), this is an
      // additional hardcoded account at Jim's explicit request.
      uh: 'a45a5f4eeae225fbf83f4decc0636df8fe45e5581f1cc8a47d1cf63fb72c3033',
      ph: '1a1c9cf92d7642b41f4e41a8b7110dce785bd1f86577357acac9bd36c0025439'
    }
  ];"""

assert content.count(OLD) == 1, f"OLD block match count: {content.count(OLD)}"
new_content = content.replace(OLD, NEW)
assert new_content != content

with open(path, 'w', encoding='utf-8', newline='') as f:
    f.write(new_content)

print("patched OK")
print("new sha256:", hashlib.sha256(new_content.encode('utf-8')).hexdigest())
print("new length:", len(new_content), "old length:", len(content))
