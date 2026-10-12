# Report generator (draft)
Builds an Empire FGA scouting report PDF from a video scoring workbook.

    python3 make_report.py --workbook <Empire_FGA_Video_Scoring_X.xlsx> \
        --bio data/bio_<player>.json --pairing data/pairing_<player>.json \
        --out <folder> [--rule all|positive] [--final]

- Scores are recomputed from the EVENT_LOG sheet; the SCORES tab is only a cross-check.
- Output is stamped DRAFT unless --final is passed AND the QA file has no blocking items.
- --rule all (default): mean of every logged event. --rule positive: mean of events tagged "Positive indicator" only (what the SCORES tab does today). Jim must rule on which is official.
- Needs: python3, openpyxl, playwright + chromium.
