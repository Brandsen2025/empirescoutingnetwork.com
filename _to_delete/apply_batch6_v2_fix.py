#!/usr/bin/env python3
"""
Fix for the batch6 deploy: the card/modal's Historical Pairing section is gated
entirely on p.pairingPlayer (a summary STRING) -- p.pairingList only controls
what renders *inside* that section once it's open. I set pairingList+pairingVerified
on all 6 batch6 players but never set pairingPlayer, so the whole pairing block
silently never rendered for any of them. Also: pl.pct in the live convention
(see Gabriel Mec's row) is a string like "84%", not a bare number -- mine were
bare numbers, which would've displayed as "84" with no percent sign once the
section did render. Also adding pob (Kpardeh, from report) and contractEnd
(Meerdink, Lee Seung-Woo, from report) which the card also displays and which
I skipped entirely in the first pass.

Run from the directory containing platform.html and platform_es.html.
Writes platform_fix.html / platform_es_fix.html (does not overwrite inputs).
"""
import json

P_MARKER = 'const P    = '
_DECODER = json.JSONDecoder()


def find_array_bounds(content, marker):
    start = content.index(marker) + len(marker)
    obj, end = _DECODER.raw_decode(content, start)
    return start, end


PAIRING_PLAYER = {
    "jonathan-jimenez-usa-2000": "Hwang Hee-chan — 77% (Primary, preliminary)",
    "lee-seung-woo-kor-1997": "Takashi Inui — 78% (Primary, preliminary)",
    "mexx-meerdink-ned-2003": "Davor Šuker — 81% (Primary, preliminary)",
    "enner-valencia-ecu-1989": "Christian \"Chucho\" Benítez — 86% (Primary, preliminary)",
    "samson-kpardeh-usa-unk": "Sadio Mané — 84% (Primary, preliminary)",
}


def fix_pct_strings(pairing_list):
    for entry in pairing_list:
        if isinstance(entry.get("pct"), (int, float)):
            entry["pct"] = str(entry["pct"]) + "%"
    return pairing_list


def patch_platform(content):
    s, e = find_array_bounds(content, P_MARKER)
    data = json.loads(content[s:e])

    touched = 0
    for r in data:
        pid = r.get("pid")
        if pid in PAIRING_PLAYER and r.get("pairingList"):
            r["pairingPlayer"] = PAIRING_PLAYER[pid]
            r["pairingList"] = fix_pct_strings(r["pairingList"])
            touched += 1

    # pob: only Kpardeh's report gives a birthplace/hometown
    for r in data:
        if r.get("pid") == "samson-kpardeh-usa-unk":
            r["pob"] = "Worcester, Massachusetts, USA"

    # contractEnd: only Meerdink and Lee Seung-Woo's reports state one
    for r in data:
        if r.get("pid") == "mexx-meerdink-ned-2003":
            r["contractEnd"] = "2030"
        if r.get("pid") == "lee-seung-woo-kor-1997":
            r["contractEnd"] = "2028"

    print("rows with pairingPlayer fixed:", touched)

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

    with open("platform_fix.html", "w", encoding="utf-8") as f:
        f.write(en_new)
    with open("platform_es_fix.html", "w", encoding="utf-8") as f:
        f.write(es_new)

    print("OK: wrote platform_fix.html, platform_es_fix.html")


if __name__ == "__main__":
    main()
