#!/usr/bin/env python3
"""SEO fixes from the 29 Oct 2026 audit. Dry run by default; pass --apply to write.

1. sitemap.xml rebuilt (profiles only + real lastmod, no backups/dashboards/dossiers)
2. players.html: rows pointing at non-profile pages removed
3. Profile pages: title template, meta description, canonical, OG, favicon
4. Small non-profile pages get noindex
5. Homepages: canonical, hreflang, OG, JSON-LD, favicon, local logo
Idempotent: a tag already present is never added twice.
"""
import re, sys, html, os, time
from pathlib import Path
from urllib.parse import quote
sys.path.insert(0, str(Path(__file__).resolve().parent))
import build_directory as bd

APPLY = "--apply" in sys.argv
T0 = time.time()
BUDGET = 150  # seconds; never start a new file after this, so no write is interrupted
INCOMPLETE = False
ROOT = bd.ROOT
BASE = bd.BASE_URL
MAX_BYTES = 3_000_000
HOMES = {"index.html", "index_en.html", "index_es.html", "index_fr.html"}
NOINDEX_SKIP = HOMES | {"players.html"}
stats = {}

def bump(k, n=1): stats[k] = stats.get(k, 0) + n

def read(p):
    with open(p, encoding="utf-8", errors="surrogateescape", newline="") as fh:
        return fh.read()

def write(p, s):
    with open(p, "w", encoding="utf-8", errors="surrogateescape", newline="") as fh:
        fh.write(s)

def esc(s): return html.escape(s, quote=True)

def insert_head(s, block):
    m = re.search(r"</head>", s, re.I)
    if not m: return None
    return s[:m.start()] + block + s[m.start():]

def has(s, pat): return re.search(pat, s, re.I) is not None

def get_title(s):
    m = re.search(r"<title>(.*?)</title>", s, re.I | re.S)
    return m.group(1).strip() if m else ""

files = bd.all_html_files()

# 1. sitemap
new_sitemap = bd.build_sitemap(files)
bump("sitemap_urls", new_sitemap.count("<loc>"))
if APPLY: write(ROOT / "sitemap.xml", new_sitemap)

# 2. players.html rows
pj = ROOT / "players.html"
lines = read(pj).split("\n")
keep, dropped = [], []
for ln in lines:
    m = re.search(r'<a class="p-row" href="([^"]+)"', ln)
    if m and bd.is_non_profile(html.unescape(m.group(1))):
        dropped.append(m.group(1)); continue
    keep.append(ln)
bump("players_rows_removed", len(dropped))
rows_left = sum(1 for ln in keep if '<a class="p-row"' in ln)
txt = "\n".join(keep)
txt = re.sub(r"Browse all \d+ player scouting profiles", f"Browse all {rows_left} player scouting profiles", txt)
if APPLY: write(pj, txt)

# 3 + 4. per-file head work
FAV = '<link rel="icon" href="/favicon.ico" sizes="any">\n<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">\n'
for f in files:
    if time.time() - T0 > BUDGET:
        INCOMPLETE = True; break
    p = ROOT / f
    if p.stat().st_size > MAX_BYTES: bump("skipped_large"); continue
    s = read(p); o = s
    if f in HOMES:
        continue
    if bd.is_non_profile(f):
        if f in NOINDEX_SKIP: continue
        if not has(s, r'<meta[^>]+name=["\']robots["\']'):
            n = insert_head(s, '<meta name="robots" content="noindex,nofollow">\n')
            if n: s = n; bump("noindex_added")
    else:
        t = get_title(s)
        new_t = re.sub(r"\s*(?:—|&mdash;)\s*Empire FGA Bio Stub", " | Football Scouting Profile | ESN", t)
        if new_t != t:
            s = s.replace(t, new_t, 1); bump("title_fixed")
            t = new_t
        name = re.split(r"\s*(?:—|&mdash;|\|)\s*", html.unescape(t))[0].strip() or bd.display_name(f)
        url = f"{BASE}/{quote(f)}"
        add = ""
        if not has(s, r'rel=["\']canonical["\']'): add += f'<link rel="canonical" href="{url}">\n'; bump("canonical_added")
        if not has(s, r'name=["\']description["\']'):
            add += f'<meta name="description" content="{esc("Empire FGA scouting profile for " + name + ", graded by Empire Scouting Network from full match footage.")}">\n'; bump("description_added")
        if not has(s, r'property=["\']og:title["\']'):
            add += (f'<meta property="og:type" content="profile">\n<meta property="og:site_name" content="Empire Scouting Network">\n'
                    f'<meta property="og:title" content="{esc(html.unescape(t))}">\n'
                    f'<meta property="og:url" content="{url}">\n<meta property="og:image" content="{BASE}/esn-logo.png">\n'
                    f'<meta name="twitter:card" content="summary">\n'); bump("og_added")
        if not has(s, r'rel=["\'](?:shortcut )?icon["\']'): add += FAV; bump("favicon_added")
        if add:
            n = insert_head(s, add)
            if n: s = n
            else: bump("no_head_tag")
    if s != o:
        bump("files_changed")
        if APPLY: write(p, s)

# 5. homepages
LANG = {"index.html": "en", "index_en.html": "en", "index_es.html": "es", "index_fr.html": "fr"}
CANON = {"index.html": f"{BASE}/", "index_en.html": f"{BASE}/", "index_es.html": f"{BASE}/index_es.html", "index_fr.html": f"{BASE}/index_fr.html"}
NEW_TITLE = "Football Scouting Reports with Video Proof | ESN"
NEW_DESC = "Independent football player evaluations graded on full matches, with a video proof clip behind every score. Request a file for clubs, agents and academies."
JSONLD = ('<script type="application/ld+json">{"@context":"https://schema.org","@type":"Organization",'
          f'"name":"Empire Scouting Network","url":"{BASE}/","logo":"{BASE}/esn-logo.png",'
          '"sameAs":["https://www.youtube.com/@esntv2017"]}</script>\n')
for f in sorted(HOMES):
    p = ROOT / f
    if not p.exists(): continue
    s = read(p); o = s
    if LANG[f] == "en":
        s = re.sub(r"<title>.*?</title>", f"<title>{NEW_TITLE}</title>", s, count=1, flags=re.S)
        s = re.sub(r'(<meta\s+name="description"\s+content=")[^"]*(")', lambda m: m.group(1) + esc(NEW_DESC) + m.group(2), s, count=1)
    t = get_title(s)
    dm = re.search(r'<meta\s+name="description"\s+content="([^"]*)"', s)
    d = dm.group(1) if dm else NEW_DESC
    s = re.sub(r"https://media\.licdn\.com/[^\"')\s]+", "esn-logo.png", s)
    add = ""
    if not has(s, r'rel=["\']canonical["\']'): add += f'<link rel="canonical" href="{CANON[f]}">\n'
    if f != "index_en.html" and not has(s, r'hreflang'):
        add += (f'<link rel="alternate" hreflang="en" href="{BASE}/">\n<link rel="alternate" hreflang="es" href="{BASE}/index_es.html">\n'
                f'<link rel="alternate" hreflang="fr" href="{BASE}/index_fr.html">\n<link rel="alternate" hreflang="x-default" href="{BASE}/">\n')
    if not has(s, r'property=["\']og:title["\']'):
        add += (f'<meta property="og:type" content="website">\n<meta property="og:site_name" content="Empire Scouting Network">\n'
                f'<meta property="og:title" content="{t}">\n<meta property="og:description" content="{d}">\n'
                f'<meta property="og:url" content="{CANON[f]}">\n<meta property="og:image" content="{BASE}/esn-logo.png">\n'
                f'<meta name="twitter:card" content="summary">\n')
    if not has(s, r'rel=["\'](?:shortcut )?icon["\']'): add += FAV
    if f == "index.html" and not has(s, r"application/ld\+json"): add += JSONLD
    if add:
        n = insert_head(s, add)
        if n: s = n
    if f == "index_en.html" and not has(s, r'name=["\']robots["\']'):
        pass
    if s != o:
        bump("homepages_changed")
        if APPLY: write(p, s)

print("APPLIED" if APPLY else "DRY RUN (nothing written)")
if INCOMPLETE: print("INCOMPLETE: time budget hit, run again to continue")
for k in sorted(stats): print(f"  {k}: {stats[k]}")
