# Graph Report - ESN - Git  (2026-09-08)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 84 nodes · 125 edges · 15 communities (8 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4ac13b29`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- build_1988_89_ptfr_batch.py
- build_directory.py
- FBrefScraper
- build_9091_9596_batch.py
- p_entry
- _middleware.js
- record_for
- standardize_philosophies.py
- slug

## God Nodes (most connected - your core abstractions)
1. `p_entry()` - 9 edges
2. `build_page()` - 8 edges
3. `p_entry()` - 8 edges
4. `record_for()` - 7 edges
5. `FBrefScraper` - 6 edges
6. `main()` - 5 edges
7. `PlatformFileUnsafe` - 4 edges
8. `season_table_html()` - 4 edges
9. `check_platform_html_is_safe()` - 4 edges
10. `season_table_html_9091()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `build_page()` --calls--> `record_for()`  [EXTRACTED]
  scripts/build_9091_9596_batch.py → scripts/build_9091_9596_batch.py  _Bridges community 3 → community 6_
- `p_entry()` --calls--> `nat3()`  [EXTRACTED]
  scripts/build_9091_9596_batch.py → scripts/build_9091_9596_batch.py  _Bridges community 4 → community 6_
- `p_entry()` --calls--> `slug()`  [EXTRACTED]
  scripts/build_9091_9596_batch.py → scripts/build_9091_9596_batch.py  _Bridges community 4 → community 8_

## Import Cycles
- None detected.

## Communities (15 total, 1 thin omitted)

### Community 0 - "build_1988_89_ptfr_batch.py"
Cohesion: 0.20
Nodes (17): base_name(), build_page(), country_name(), dob_ddmmyy(), filename_for(), flag_for(), js_str(), league_for() (+9 more)

### Community 1 - "build_directory.py"
Cohesion: 0.24
Nodes (12): Exception, all_html_files(), build_players_html(), build_sitemap(), check_platform_html_is_safe(), display_name(), main(), PlatformFileUnsafe (+4 more)

### Community 2 - "FBrefScraper"
Cohesion: 0.24
Nodes (6): FBrefScraper, main(), Empire FGA - FBref Scraper Scrapes player statistics from FBref.com for FGA…, Scrape all players from a specific league, Calculate FGA rating from scraped stats, Scrape top European leagues

### Community 3 - "build_9091_9596_batch.py"
Cohesion: 0.28
Nodes (4): build_page(), js_record(), js_str(), Builds and splices France Division 1 1990-91 (421 players, Onze Mondial Hors-…

### Community 4 - "p_entry"
Cohesion: 0.29
Nodes (7): base_name(), country_name(), flag_for(), league_for(), p_entry(), pos_gkdfmffw(), source_label()

### Community 5 - "_middleware.js"
Cohesion: 0.47
Nodes (5): isPublic(), onRequest(), PUBLIC_EXTENSIONS, PUBLIC_PATHS, unauthorized()

### Community 6 - "record_for"
Cohesion: 0.53
Nodes (6): dob_ddmmyy(), nat3(), record_for(), season_table_html_9091(), season_table_html_9596(), source_table_label()

### Community 8 - "slug"
Cohesion: 0.67
Nodes (3): norm(), slug(), strip_accents()

## Knowledge Gaps
- **2 isolated node(s):** `PUBLIC_EXTENSIONS`, `PUBLIC_PATHS`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 25 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `p_entry()` connect `p_entry` to `slug`, `build_9091_9596_batch.py`, `record_for`?**
  _High betweenness centrality (0.004) - this node is a cross-community bridge._
- **What connects `PUBLIC_EXTENSIONS`, `PUBLIC_PATHS` to the rest of the system?**
  _2 weakly-connected nodes found - possible documentation gaps or missing edges._