# Public site claims fix (22 Oct 2026)

Your rulings: Tier 3 means at least **five** full matches; **no philosophy count** on the site.
Your standing rules (CLAUDE.md): no "779 metrics", no "€15M savings".

## What changed (1,026 files)

| Change | Count |
|---|---|
| "60-/80-Philosophy …" became "Philosophy …" (headings, footers, report text) | 2,112 |
| "779/794 Proprietary Metrics •" removed from report footers | 443 |
| Leftover "[cite: …]" markers removed from generated reports | 136 |
| Other "779"/"794" mentions removed (metric labels, "Metrics Used" lines, comments) | about 110 |
| "All 60 philosophies and 779 metrics considered" became "All documented philosophies considered." | 28 |
| "€15M Savings Average" removed | 4 |
| Homepages (index, index_en, index_es, index_fr): "60 playing philosophies" became "Playing philosophies"; "three complete matches" became "five complete matches" | 4 files |
| login.html, signup.html footer: "779 METRICS · 60 PHILOSOPHIES" became "NO PROOF, NO SCORE" | 2 files |
| esn_product_brief.html: 779 / 60 / "50% cheaper than Opta" replaced by 12 graded dimensions / 5+ full matches / 1 video proof per score; the "~200 stats" paragraph rewritten; LOG described as context, not an adjustment | 1 file |
| Platform pages (7 copies): "779" and "80/60" nav badges removed; "779 Proprietary Metrics" heading became "Metrics"; "13 Leagues · 5,278 Players" removed from the header | 7 files |

Player data inside the platform pages was not touched. Links, ids and classes are unchanged, except the two removed nav badges.

The files in this zip already include this week's earlier fixes: the MLS re-import, the removed AI bar, the name in the top-right corner, and the self-building filter lists.

## Added 22 Oct 2026 (decision sheet)

- **Player data now lives in one file: `esn_core_data.js`** (34.5 MB, 43,071 rows). platform.html, platform_es.html and platform_fr.html load it instead of each carrying their own copy, so the three pages drop from about 35 MB to 0.34 MB each. The big5 files (`esn_big5_data_part1-6.js`) still add the other 92k rows. **Commit `esn_core_data.js` together with the three pages**, or they open with an empty database.
- 18 impossible ages (below 0 or above 60) are blank. The birth dates behind them are still wrong at source.
- platform_kevin.html: the same MLS 2025 fix as the main platform. It is still a separate older fork (457 rows not in the main data).
- players.html: the "Esn Product Brief" row is removed (that page leaves the site).

## Install

1. Fetch and Pull in GitHub Desktop.
2. Unzip this over the repo folder (same relative paths).
3. Put `move_offsite.ps1` and `REMOVE_FROM_PUBLIC_REPO.txt` (docs zip) in one folder OUTSIDE the repo, e.g. your Desktop, so they don't get committed. In PowerShell, `cd` into the repo folder, then run `powershell -ExecutionPolicy Bypass -File "$HOME\Desktop\move_offsite.ps1"`. It moves the files below to `..\ESN_offsite_archive` and deletes nothing.
4. Check GitHub Desktop: modified pages, the new `esn_core_data.js`, and the moved files showing as deleted. Commit, push.
5. Open platform.html once from the live site and check the total player count before telling anyone.

## Taken OFF the public site by move_offsite.ps1 (your decision #22)

1. `69_Philosophy_Tactical_DNA_Framework_v_2_2.html` and `Tactical_Philosophies.html`: they publish the philosophy decimal weights, which your framework file says are banned from client-facing material.
2. `esn_product_brief.html`: your internal sales brief ("Confidential · Internal Use Only") with pricing, objection handling and a **named pipeline** (Husillos Jr., Hallengren, Fredsted, Turi, Pérez). The claims are fixed, but it should not be public.
3. 98 backup files (`*_BACKUP*`, `*.bak*`, `*_old*`, `*CORRUPTED*`), 2.2 GB, all publicly downloadable, mostly old full copies of the database.
4. `_to_delete/` (contains plaintext passwords in `creds.json`) and `internal-files/`.

## Second pass, 22 Oct 2026 evening: no static counts (52 files)

Rule: no hard-coded count anywhere public. A count on the platform comes from the data when the page loads.

| Change | Where |
|---|---|
| FR header "5,278 Joueurs · 13 Ligues" and ES header "15.600 Jugadores · 36 Ligas" removed, titles too | platform_fr, platform_es |
| Players badge and filter count: "—" until the data loads, then the number of **distinct players** (57,543), not player-season rows (135,241). They now also show on first load; before, the stale "5881" stayed until you touched a filter | all 7 platform pages |
| Dashboard "Total players": distinct players | platform, es, fr, kevin |
| Stale totals removed (25,573 / 2,796 / 8,495 / 21.713) | all platform pages |
| Philosophy decimal weights no longer printed on the Philosophies cards (e.g. Cruyff 1.45) | all 7 platform pages |
| "Trophy Magnet Factor = weighted average…" subtitle replaced by "Coaching philosophies grouped by tactical school" (FR/ES translated). The data does not compute TMF that way: 458 of the graded rows are FGA × 0.92, 36 are FGA × 0.85 | all platform pages |
| Metrics subtitle: the 20% / 30% / 50% tier split removed | all platform pages |
| "60 legendary coaching philosophies", "60‑Philosophy" (non-breaking hyphen), "794‑metric", "779 métriques", "60 Filosofías", "15 schools" | 40 profile and report pages |
| Player notes in the data: "80-Philosophy Framework" (266), "779-metric glossary" (8), "60-Philosophy system" (1). Text only, no values changed; row count unchanged (43,071) | esn_core_data.js, platform_kevin.html |

Checked in a browser on all 7 platform pages: no JS errors, counts correct on cold load, filter count updates, no banned count in the rendered text, player modal clean.

## Added 22 Oct 2026, late: Swiss Promotion League 2026-27

- esn_core_data.js: 540 players from 18 clubs (season 2026-2027, data to Oct 2026), from Jim's workbook. Rows: 43,071 -> 43,611.
- Imported: matches, starts, goals (goals conceded for keepers), assists, yellow cards, age, height, position.
- Not imported: market value and the workbook's "Rating" (no proof, no score). Minutes and nationality are not in the source.
- 6 players already in the data from the Super League keep their player id and nationality.
- 218 names are abbreviated ("A. Morosoli") or a single word ("Manière") in the source.

## Still your job

- Moving `_to_delete/creds.json` out does not erase it from git history. The 4 passwords stay readable until you change them. Change them, and make the repo private.
