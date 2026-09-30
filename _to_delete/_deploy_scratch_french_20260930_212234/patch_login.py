import hashlib, os

BASE = os.path.expanduser("~/mnt/ESN - Git")
path = os.path.join(BASE, "login.html")

with open(path, encoding='utf-8') as f:
    content = f.read()

OLD = """    {
      // Kevin Weinress — Prosport Management (USA)
      // username: kweinress@gmail.com / password set by Jim on 2026-09-08
      // Comped 1-year platform access (overpayment credit) -- revoke this
      // entry on or after 2027-09-08 unless renewed.
      // Personal session: own name/role in header (platform_kevin.html)
      uh: '0a9b3c0ebcba699748fefb2f157ec93124da3683a017e67e25b82cda72d29e01',
      ph: '6a9794e015a1467d5a3679e1d4e1aec2a9de697b61e1d80d81e0e10cd6d3ede7',
      redirect: 'platform_kevin.html'
    }
  ];"""

NEW = """    {
      // Kevin Weinress — Prosport Management (USA)
      // username: kweinress@gmail.com / password set by Jim on 2026-09-08
      // Comped 1-year platform access (overpayment credit) -- revoke this
      // entry on or after 2027-09-08 unless renewed.
      // Personal session: own name/role in header (platform_kevin.html)
      uh: '0a9b3c0ebcba699748fefb2f157ec93124da3683a017e67e25b82cda72d29e01',
      ph: '6a9794e015a1467d5a3679e1d4e1aec2a9de697b61e1d80d81e0e10cd6d3ede7',
      redirect: 'platform_kevin.html'
    },
    {
      // Pitshou Muteba — new client
      // username: pitshou.muteba / password set by Jim on 2026-09-30
      // General session: French-language platform (platform_fr.html), not personalized
      uh: 'c409138a000b2c839c2b11326bfb4d2a095df58ae5d0f346515726f2aeed6762',
      ph: '55d98d47988e6b159a1b66bb5cbf05ca8e522fbd3b376bef547b48d62c38a7e7',
      redirect: 'platform_fr.html'
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
