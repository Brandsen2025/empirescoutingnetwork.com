# SEO fixes from the 29 Oct 2026 audit

Nothing is committed or pushed. Review with `git diff -- index.html sitemap.xml players.html scripts/` first (a whole-tree `git diff` is slow on this repo).

## Done in files
| Change | Count |
|---|---|
| Profile titles: "... Empire FGA Bio Stub" became "... | Football Scouting Profile | ESN" | 3,711 |
| Profile pages: canonical, meta description, OG tags, favicon added | 5,388 |
| noindex added to small non-profile pages (dossiers, dashboards, forms, test, standings) | 33 |
| sitemap.xml rebuilt: 5,393 URLs, no backups, forks, dashboards, dossiers or platform pages, real lastmod from git | 1 |
| players.html: rows pointing at non-profile pages removed | 47 |
| Homepages (4): canonical, hreflang (EN/ES/FR), OG, favicon, Organization JSON-LD on index.html, LinkedIn-hosted logo replaced by esn-logo.png | 4 |
| Homepage title and meta description (EN) rewritten, ES and FR descriptions rewritten without the philosophy count | 4 |
| scripts/build_directory.py: non-profile rule, real lastmod, quoted URLs, so the workflow stops re-adding junk | 1 |

index_en.html canonicalises to `/` (it is a near copy of index.html).

## Not done, needs your decision
1. Anibal_Chala.html (done, LOG 2.7): all league-tier mentions now say 2.7, the "read before quoting", scout-instruction and "corrected" banners are removed. Still open: 8 Dropbox rlkey video links (need hosting), and the page still says "peak professional phase" and "immediate competitive contribution guaranteed" next to a playing-time caveat and a gap list that says he had a rocky start. Soften or keep, your call.
2. platform.html: "Log out" and dev notes are public. test.html and the gate pages use a localStorage flag, which is not access control.
3. The repo root is the public site. About 100 tracked backups (platform_PRE_*, *.bak_*), 34 MB data files, scripts, .xlsx/.docx, dropbox_urls_tmp.txt and internal-files/ (txt, csv, rar) are all downloadable. Move them to a private repo. robots.txt Disallow on /internal-files/ advertises the folder.
4. README_CHANGES.md (22 Oct) says 60/80 philosophies and 779 metrics were removed, and platform pages shrank to 0.34 MB via esn_core_data.js. This tree does not show that: all four homepages still say "60 playing philosophies" in 5 places and platform.html is 34.8 MB. Those edits may be in your zip and never committed.
5. 33 duplicate-name groups need 301s. GitHub Pages cannot do server redirects, so pick a canonical page per group and point the others at it with a canonical tag, or move hosting.
6. Hallengren testimonial and the "20%" claim.
7. Homepage has 6 H1s and one URL for three audiences. Needs a layout decision (/clubs, /academies, /agents).

## Undo
For any file: `git show HEAD:"<file>" > "<file>"`. The script is idempotent: `python3 scripts/seo_fix.py` is a dry run, `--apply` writes, rerun until it stops printing INCOMPLETE.
