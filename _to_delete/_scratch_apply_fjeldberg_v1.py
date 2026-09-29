#!/usr/bin/env python3
"""
Reconciles Jonas (Stensrud) Fjeldberg's existing platform stub row against
Empire FGA Scouting Report ESN-FJE-2026-001 (v1.5, analyst Jim Totime) and
its companion video-scoring workbook
(Empire_FGA_Video_Scoring_Jonas_Stensrud_Fjeldberg_2025_2026.xlsx).

Existing row (pid jonas-fjeldberg-nor-1998, season 2025-2026) was a bare
stub: n/l/c/f/sq/nat/pos/age/mp/min/g/a/crdY/xps/stk/int/fgaProxy only, no
photo/dob/pob/ht/wt/foot/contract/pairing/reportPdf/footageClips.

This adds all of that, using ONLY what the report actually states -- no
invented numbers. Two real data-integrity conflicts between the PDF and its
own companion xlsx are flagged in `sch`, not silently resolved. mp/min/g/a
are NOT touched: the report explicitly says Tier 1 stats were "NOT
PROVIDED" and gives only a career total and a partial all-comps total that
don't map cleanly onto this row's single-season shape.

Run from the directory containing platform.html and platform_es.html.
Writes platform_fje.html / platform_es_fje.html (does not overwrite inputs).
"""
import json

P_MARKER = 'const P    = '
_DECODER = json.JSONDecoder()


def find_array_bounds(content, marker):
    start = content.index(marker) + len(marker)
    obj, end = _DECODER.raw_decode(content, start)
    return start, end


PID = "jonas-fjeldberg-nor-1998"

SCH_NOTE = (
    "2026-09-29: Full name corrected 'Jonas Fjeldberg' -> 'Jonas Stensrud Fjeldberg' "
    "(per Empire FGA Scouting Report ESN-FJE-2026-001 v1.5, analyst Jim Totime). "
    "Position corrected MF -> FWMF (report: \"Winger -- right flank per Transfermarkt; "
    "left wing as secondary role per BeSoccer\"). Photo, dob (1998-09-30), pob (Jessheim, "
    "Norway), ht/wt/foot, contractEnd (2027, club option 2028), bioNote, pairing set and "
    "reportPdf added from the same report plus its companion video-scoring workbook "
    "(Empire_FGA_Video_Scoring_Jonas_Stensrud_Fjeldberg_2025_2026.xlsx, ~158 logged events "
    "across 8 registered matches). Video reel link (Dropbox, supplied by Jim) added to "
    "footageClips. || DATA INTEGRITY FLAGS, carried from the source files, NOT resolved: "
    "(1) the companion xlsx's own PLAYER_PROFILE tab states club 'Brighton And Hove Albion' "
    "and position 'Attacking Midfielder' -- both contradict the PDF report's 'Colorado "
    "Springs Switchbacks FC' / 'Winger' and look like uncleared template leftovers from a "
    "different player's workbook; the PDF was treated as authoritative for club/position. "
    "(2) the xlsx's own SCORES tab auto-calc reports 'Video completeness 7/12 -- threshold "
    "met, FGA_v3_Final will activate', directly contradicting the PDF's own explicit "
    "'6/12 -- BELOW THRESHOLD, FGA_v3_Final: BLOCKED' -- the PDF's stated DRAFT/BLOCKED "
    "status was treated as authoritative, since it's the narrative document that explicitly "
    "discusses this exact shortfall: Match 3 vs Tulsa has zero logged events despite being "
    "registered, and every one of the 158 logged events -- including clearly negative ones "
    "like a whiffed clearance scored 2/10 -- is tagged 'Positive indicator', meaning "
    "anti-indicator re-tagging has never been done and every metric average is inflated. "
    "Neither discrepancy is resolved by this update; both need a follow-up pass on the "
    "source files themselves. (3) this row's own mp/min/g/a (16/635/3/0, season 2025-2026) "
    "were NOT updated -- the report explicitly lists Tier 1 statistics as 'NOT PROVIDED' and "
    "gives only a Switchbacks career total (100 apps/15g/11a/4207 min) and a partial '2026 "
    "all-competitions' total (8g+1a) that don't map cleanly onto this row's single-season "
    "shape; left as-is rather than guessed. (4) existing fgaProxy:53.8/xps:21.4/stk:5.54/"
    "int:0.67 are of unconfirmed origin and not addressed by this report -- untouched, "
    "flagged. No obi/sii/tier3 composite or fga fields added: FGA_v3_Final is BLOCKED per "
    "the report (indicative Tier 3 average 6.71, not final; Tier 1 not provided; Tier 2 not "
    "computable). No standalone dashboard page exists for this player -- NOT registered in "
    "EXISTING_PROFILES or players.html, since that link would 404. Status: DRAFT v1.5 -- "
    "not client-ready."
)

BIO_NOTE = (
    "Norwegian winger, born in Jessheim. Joined Colorado Springs Switchbacks FC (USL "
    "Championship) 12 May 2023; part of the squad that won the 2024 USL Championship Final, "
    "the club's first trophy. Contract runs through the 2027 season with a club option for "
    "2028 (signed Sep 2026), represented by CAA Stellar. Career at the Switchbacks: 100 apps, "
    "15 goals, 11 assists, 4,207 minutes. 2026 is a career-best season (8 goals + 1 assist "
    "across all competitions; 6 regular-season goals ties his previous best, set at Rio "
    "Grande Valley in 2022)."
)

PAIRING_LIST = [
    {"name": "Jesper Karlsson", "pct": "87%", "primary": True},
    {"name": "Mohamed Elyounoussi", "pct": "86%", "primary": False},
    {"name": "Viktor Fischer", "pct": "80%", "primary": False},
    {"name": "Andreas Schjelderup", "pct": "78%", "primary": False},
    {"name": "Jesper Grønkjær", "pct": "74%", "primary": False},
]

FOOTAGE_CLIPS = [
    {
        "file": "Jonas Fjeldberg.mp4",
        "type": "reel",
        "dbLink": "https://www.dropbox.com/scl/fi/bein2ezskdvq5zvn7b0fx/Jonas-Fjeldberg.mp4?rlkey=sj25161212zx4xc1r1uokbq0r&raw=1",
    }
]


def patch_platform(content):
    s, e = find_array_bounds(content, P_MARKER)
    data = json.loads(content[s:e])

    touched = 0
    for r in data:
        if r.get("pid") != PID:
            continue
        assert r.get("n") == "Jonas Fjeldberg", f"unexpected existing name: {r.get('n')!r}"
        assert r.get("pos") == "MF", f"unexpected existing pos: {r.get('pos')!r}"

        r["n"] = "Jonas Stensrud Fjeldberg"
        r["pos"] = "FWMF"
        r["sch"] = SCH_NOTE
        r["photo"] = "https://images.fotmob.com/image_resources/playerimages/538520.png"
        r["dob"] = "1998-09-30"
        r["pob"] = "Jessheim, Norway"
        r["ht"] = 1.78
        r["wt"] = 75
        r["foot"] = "Right"
        r["contractEnd"] = "2027"
        r["bioNote"] = BIO_NOTE
        r["pairingPlayer"] = "Jesper Karlsson — 87% (Primary, preliminary)"
        r["pairingList"] = PAIRING_LIST
        r["pairingVerified"] = False
        r["reportPdf"] = "reports/Jonas_Stensrud_Fjeldberg_Empire_FGA_Scouting_Report.pdf"
        r["footageClips"] = FOOTAGE_CLIPS
        touched += 1

    assert touched == 1, f"expected exactly 1 row touched, got {touched}"
    print("rows touched:", touched)

    new_array_text = json.dumps(data, ensure_ascii=False, allow_nan=True)
    content = content[:s] + new_array_text + content[e:]
    return content


def main():
    with open("platform.html", encoding="utf-8") as f:
        en = f.read()
    with open("platform_es.html", encoding="utf-8") as f:
        es = f.read()

    en_new = patch_platform(en)
    es_new = patch_platform(es)

    with open("platform_fje.html", "w", encoding="utf-8") as f:
        f.write(en_new)
    with open("platform_es_fje.html", "w", encoding="utf-8") as f:
        f.write(es_new)

    print("OK: wrote platform_fje.html, platform_es_fje.html")


if __name__ == "__main__":
    main()
