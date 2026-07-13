#!/usr/bin/env python3
"""
Regenerates players.html, sitemap.xml, and platform.html's EXISTING_PROFILES
set from whatever .html files currently exist in the repo root.

Run manually with:  python3 scripts/build_directory.py
Runs automatically via .github/workflows/update-directory.yml on every push
to main that touches a .html file.
"""
import re
import json
import html
import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# Pages that are NOT individual player/profile pages and should not appear
# in the player directory or be treated as "profiles" by the platform link check.
EXCLUDED = {
    "index.html",
    "platform.html",
    "platform_UPDATED.html",
    "empire_fga_hybrid_platform.html",
    "login.html",
    "client_login.html",
    "60philosophies.html",
    "Tactical_Philosophies.html",
    "players.html",
}

# Pages excluded from the public sitemap (private/utility pages).
SITEMAP_EXCLUDED = {"login.html", "client_login.html"}

BASE_URL = "https://www.empirescoutingnetwork.com"


def all_html_files():
    return sorted(p.name for p in ROOT.glob("*.html"))


def display_name(filename: str) -> str:
    n = filename[:-5]
    n = n.replace("_", " ").replace("-", " ")
    n = re.sub(r"\s+", " ", n).strip()
    if n == n.lower():
        n = n.title()
    return n


def build_players_html(files):
    entries = [
        {"file": f, "name": display_name(f)} for f in files if f not in EXCLUDED
    ]
    entries.sort(key=lambda e: e["name"].lower())

    rows = []
    for e in entries:
        name = html.escape(e["name"])
        file = html.escape(e["file"], quote=True)
        rows.append(
            f'<a class="p-row" href="{file}" data-name="{name.lower()}">'
            f'<span class="p-name">{name}</span><span class="p-arrow">&rsaquo;</span></a>'
        )
    rows_html = "\n      ".join(rows)
    n = len(entries)

    page = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Player Directory — Empire Scouting Network</title>
<meta name="description" content="Browse all {n} player scouting profiles on Empire Scouting Network.">
<link rel="icon" href="favicon.ico">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;600;700;900&family=Crimson+Pro:ital,wght@0,300;0,400;1,300;1,400&display=swap" rel="stylesheet">
<style>
  :root {{
    --gold: #C9A84C;
    --gold-dim: rgba(201,168,76,0.12);
    --gold-border: rgba(201,168,76,0.25);
    --bg: #080808;
    --card: #141414;
    --text: #F2F0EB;
    --muted: #8a8a8a;
    --subtle: #232323;
  }}
  *,*::before,*::after {{ box-sizing:border-box; margin:0; padding:0; }}
  body {{
    background: var(--bg);
    color: var(--text);
    font-family: 'Barlow Condensed', sans-serif;
    min-height: 100vh;
  }}
  nav {{
    position: sticky; top: 0; z-index: 20;
    padding: 18px 32px;
    display: flex; justify-content: space-between; align-items: center;
    border-bottom: 1px solid var(--subtle);
    background: rgba(8,8,8,0.95);
    backdrop-filter: blur(10px);
  }}
  .nav-wordmark {{ font-size: 16px; font-weight: 900; letter-spacing: 3px; color: var(--gold); text-transform: uppercase; text-decoration: none; }}
  .nav-links {{ display:flex; gap: 24px; }}
  .nav-links a {{ font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--muted); text-decoration: none; }}
  .nav-links a:hover {{ color: var(--gold); }}
  header {{ max-width: 1000px; margin: 0 auto; padding: 48px 24px 24px; text-align: center; }}
  h1 {{ font-size: 42px; font-weight: 900; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px; }}
  .sub {{ font-family: 'Crimson Pro', serif; color: var(--muted); font-size: 17px; }}
  .search-wrap {{ max-width: 600px; margin: 28px auto 8px; padding: 0 24px; }}
  #search {{
    width: 100%; padding: 14px 18px; font-size: 16px;
    background: var(--card); border: 1px solid var(--subtle); border-radius: 8px;
    color: var(--text); font-family: 'Barlow Condensed', sans-serif;
  }}
  #search:focus {{ outline: none; border-color: var(--gold-border); }}
  #count {{ text-align:center; color: var(--muted); font-size: 13px; letter-spacing: 1px; text-transform: uppercase; margin: 10px 0 30px; }}
  .grid {{
    max-width: 1100px; margin: 0 auto; padding: 0 24px 80px;
    display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    gap: 1px; background: var(--subtle); border: 1px solid var(--subtle); border-radius: 8px; overflow: hidden;
  }}
  .p-row {{
    background: var(--bg); color: var(--text); text-decoration: none;
    padding: 14px 16px; display:flex; justify-content: space-between; align-items:center;
    font-size: 15px; transition: background 0.15s, color 0.15s;
  }}
  .p-row:hover {{ background: var(--gold-dim); color: var(--gold); }}
  .p-arrow {{ opacity: 0.4; }}
  .p-row.hidden {{ display:none; }}
  footer {{ text-align:center; padding: 32px; color: var(--muted); font-size: 11px; letter-spacing: 2px; text-transform: uppercase; border-top: 1px solid var(--subtle); }}
</style>
</head>
<body>
  <nav>
    <a href="index.html" class="nav-wordmark">ESN</a>
    <div class="nav-links">
      <a href="index.html">Home</a>
      <a href="platform.html">Platform</a>
      <a href="players.html">Player Directory</a>
      <a href="login.html">Login</a>
    </div>
  </nav>

  <header>
    <h1>Player Directory</h1>
    <p class="sub">{n} scouting profiles &mdash; search or browse alphabetically.</p>
  </header>

  <div class="search-wrap">
    <input type="text" id="search" placeholder="Search by player name…" autocomplete="off">
  </div>
  <div id="count"></div>

  <div class="grid" id="grid">
      {rows_html}
  </div>

  <footer>Empire Scouting Network &middot; Football Recruitment Intelligence</footer>

<script>
  var search = document.getElementById('search');
  var rows = Array.prototype.slice.call(document.querySelectorAll('.p-row'));
  var count = document.getElementById('count');

  function updateCount() {{
    var visible = rows.filter(function(r){{ return !r.classList.contains('hidden'); }}).length;
    count.textContent = visible + ' of {n} profiles';
  }}

  search.addEventListener('input', function() {{
    var q = search.value.trim().toLowerCase();
    rows.forEach(function(r) {{
      var match = r.getAttribute('data-name').indexOf(q) !== -1;
      r.classList.toggle('hidden', !match);
    }});
    updateCount();
  }});

  updateCount();
</script>
</body>
</html>
"""
    return page


def build_sitemap(files):
    today = datetime.date.today().isoformat()
    urls = [(f"{BASE_URL}/", 1.0, "weekly")]
    priority_map = {"platform.html": (0.9, "daily"), "players.html": (0.9, "weekly")}
    for f in files:
        if f == "index.html" or f in SITEMAP_EXCLUDED:
            continue
        prio, freq = priority_map.get(f, (0.5, "monthly"))
        url = BASE_URL + "/" + f.replace(" ", "%20")
        urls.append((url, prio, freq))

    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ]
    for url, prio, freq in urls:
        lines.append("  <url>")
        lines.append(f"    <loc>{html.escape(url)}</loc>")
        lines.append(f"    <lastmod>{today}</lastmod>")
        lines.append(f"    <changefreq>{freq}</changefreq>")
        lines.append(f"    <priority>{prio}</priority>")
        lines.append("  </url>")
    lines.append("</urlset>")
    return "\n".join(lines) + "\n"


def update_platform_existing_profiles(files):
    platform_path = ROOT / "platform.html"
    if not platform_path.exists():
        return
    content = platform_path.read_text(encoding="utf-8")
    new_line = "const EXISTING_PROFILES=new Set(" + json.dumps(files, ensure_ascii=False) + ");"
    pattern = re.compile(r"const EXISTING_PROFILES=new Set\(.*?\);")
    if pattern.search(content):
        content = pattern.sub(new_line, content, count=1)
        platform_path.write_text(content, encoding="utf-8")
    else:
        print("WARNING: EXISTING_PROFILES line not found in platform.html — skipped.")


def main():
    files = all_html_files()
    # players.html itself is about to be regenerated, so include it once
    # written for the sitemap / existing-profiles pass on next run; for this
    # run just make sure it's not double counted as a "player".
    (ROOT / "players.html").write_text(build_players_html(files), encoding="utf-8")
    (ROOT / "sitemap.xml").write_text(build_sitemap(files), encoding="utf-8")
    update_platform_existing_profiles(files)
    print(f"Done. {len(files)} html files scanned, "
          f"{len([f for f in files if f not in EXCLUDED])} treated as player profiles.")


if __name__ == "__main__":
    main()
