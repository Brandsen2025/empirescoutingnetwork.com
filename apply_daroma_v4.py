# -*- coding: utf-8 -*-
"""
Fourth pass, per Jim's reply: "In his profile FGA rating: between 7.3
and 7.9 so everything is ok. Please edit."

Read as: the headline FGA range shown on Frank_Daroma.html (7.3-7.9,
provisional) is acceptable as-is -- no change needed there, and no need
to force it to match platform.html's point-figure ultProxy (77.33). That
resolves the one open question about the HEADLINE number.

What this script does NOT resolve, because Jim didn't address it: the
rmv/T3-average sub-composite still disagrees between the two pages
(platform.html rmv=7.99 via the legacy 7-metric formula vs this page's
flat 12-metric average of 7.79), the El Paso 2025 apps three-way
conflict (29/32/30), the Tacoma Defiance 2023-24 season figures (no
independent source), and the contract-to-2027/EUR200k market value
(no traceable source). Left untouched, unresolved, flagged again in the
chat reply rather than guessed at here.

Two concrete, unambiguous actions taken:

  1. Fixed a genuine bug found while reading Frank_Daroma.html: line 596
     (career timeline prose) said "SII Composite 7.33" while the page's
     own videoMetrics data array (used everywhere else on the page,
     including the Attributes tab) says SII quality is 7.57. This is
     not a methodology disagreement between two documents -- it's the
     same document contradicting itself. Corrected the prose to match
     the page's own data.

  2. Added "Frank_Daroma.html" to the EXISTING_PROFILES Set literal in
     both platform.html and platform_es.html, which is what actually
     turns on the "View Full Profile" link on the platform.html card
     (openModal() already checks EXISTING_PROFILES.has(profileFile) --
     confirmed in an earlier pass; this was the only missing piece).
     Verified before editing that "Frank_Daroma.html" was not already
     present in either Set (it wasn't), so this is a pure addition, not
     a dedup risk.

Sources: Jim, chat, 2026-09-25 (fourth message on this player).
"""
import sys
import os

DATA_DIR = sys.argv[1] if len(sys.argv) > 1 else '.'
OUT_DIR = sys.argv[2] if len(sys.argv) > 2 else './out'

OLD_SII_TEXT = "OBI Composite 7.64, SII Composite 7.33."
NEW_SII_TEXT = "OBI Composite 7.64, SII Composite 7.57."

# Insert right after an existing "Frank_" entry for readability; a Set
# doesn't care about order, this is purely for anyone reading the source.
OLD_SET_ANCHOR = '"Frank_Burnier.html", '
NEW_SET_ANCHOR = '"Frank_Burnier.html", "Frank_Daroma.html", '


def patch_profile_page():
    path = os.path.join(DATA_DIR, 'Frank_Daroma.html')
    with open(path, encoding='utf-8') as f:
        content = f.read()

    assert content.count(OLD_SII_TEXT) == 1, (
        f'expected exactly 1 occurrence of the SII typo, found {content.count(OLD_SII_TEXT)}'
    )
    content = content.replace(OLD_SII_TEXT, NEW_SII_TEXT, 1)

    os.makedirs(OUT_DIR, exist_ok=True)
    out_path = os.path.join(OUT_DIR, 'Frank_Daroma.html')
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'Frank_Daroma.html: fixed SII typo, wrote {out_path}')


def patch_platform_file(fname):
    path = os.path.join(DATA_DIR, fname)
    with open(path, encoding='utf-8') as f:
        content = f.read()

    assert 'EXISTING_PROFILES' in content, f'{fname}: EXISTING_PROFILES not found'
    assert '"Frank_Daroma.html"' not in content, f'{fname}: Frank_Daroma.html already present -- unexpected'
    assert content.count(OLD_SET_ANCHOR) == 1, (
        f'{fname}: expected exactly 1 occurrence of the insertion anchor, found {content.count(OLD_SET_ANCHOR)}'
    )
    new_content = content.replace(OLD_SET_ANCHOR, NEW_SET_ANCHOR, 1)

    os.makedirs(OUT_DIR, exist_ok=True)
    out_path = os.path.join(OUT_DIR, fname)
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f'{fname}: added Frank_Daroma.html to EXISTING_PROFILES, wrote {out_path}')


if __name__ == '__main__':
    patch_profile_page()
    patch_platform_file('platform.html')
    patch_platform_file('platform_es.html')
