#!/usr/bin/env python3
"""
Adds directory entries for the 4 newly-built standalone dashboard pages to
players.html, alphabetically placed (case-insensitive, matching the file's
own existing sort order):
  Enner Valencia    -> after "Endrick", before "Enric Llansana"
  Mateo Chávez      -> after "Matej Kovar", before "Mateo Karamatic"
  Mexx Meerdink     -> after "Metrics Glossary", before "Michael Essien"
  Samson Kpardeh    -> after "Samson Iyede", before "Samuel António Silva Torres Goinar"

Run from the directory containing players.html.
Writes players_ep.html (does not overwrite input).
"""
TEMPLATE = '<a class="p-row" href="{href}" data-name="{dn}"><span class="p-name">{name}</span><span class="p-arrow">&rsaquo;</span></a>'

INSERTIONS = [
    # (text marking the row to insert BEFORE, new row html)
    ('<a class="p-row" href="Enric_Llansana.html" data-name="enric llansana"><span class="p-name">Enric Llansana</span>',
     TEMPLATE.format(href="Enner_Valencia.html", dn="enner valencia", name="Enner Valencia")),
    ('<a class="p-row" href="Mateo_Karamatic.html" data-name="mateo karamatic"><span class="p-name">Mateo Karamatic</span>',
     TEMPLATE.format(href="Mateo_Chávez.html", dn="mateo chávez", name="Mateo Chávez")),
    ('<a class="p-row" href="Michael_Essien.html" data-name="michael essien"><span class="p-name">Michael Essien</span>',
     TEMPLATE.format(href="Mexx_Meerdink.html", dn="mexx meerdink", name="Mexx Meerdink")),
    ('<a class="p-row" href="Samuel_António_Silva_Torres_Goinar.html" data-name="samuel antónio silva torres goinar"><span class="p-name">Samuel António Silva Torres Goinar</span>',
     TEMPLATE.format(href="Samson_Kpardeh.html", dn="samson kpardeh", name="Samson Kpardeh")),
]

def main():
    with open("players.html", encoding="utf-8") as f:
        c = f.read()

    orig_len = len(c)
    for marker, new_row in INSERTIONS:
        count = c.count(marker)
        if count != 1:
            raise AssertionError(f"marker not found exactly once (found {count}): {marker[:80]}...")
        # whitespace-prefix match: the marker text appears right after leading
        # whitespace + <a class="p-row" ...> -- insert the new row + same
        # leading whitespace immediately before it.
        idx = c.index(marker)
        # find start of line (leading whitespace) before this marker's <a
        line_start = c.rfind('\n', 0, idx) + 1
        leading_ws = c[line_start:idx]
        insertion = new_row + '\n' + leading_ws
        c = c[:idx] + insertion + c[idx:]
        print("inserted before:", marker[:70], "...")

    with open("players_ep.html", "w", encoding="utf-8") as f:
        f.write(c)
    print("OK: wrote players_ep.html")
    print("length delta:", len(c) - orig_len)

if __name__ == "__main__":
    main()
