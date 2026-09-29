#!/usr/bin/env python3
"""
Adds the 4 newly-built standalone dashboard pages to EXISTING_PROFILES in
platform.html and platform_es.html, so openModal()'s "View Full Profile"
link works instead of 404ing:
  Enner_Valencia.html, Samson_Kpardeh.html, Mateo_Chávez.html, Mexx_Meerdink.html
(Jonathan_Jimenez.html and Lee_Seung_Woo.html were already added in the
batch6 deploy earlier this window.)

Run from the directory containing platform.html and platform_es.html.
Writes platform_ep.html / platform_es_ep.html (does not overwrite inputs).
"""
import re

MARKER = 'const EXISTING_PROFILES=new Set(['
NEW_ENTRIES = ["Enner_Valencia.html", "Samson_Kpardeh.html", "Mateo_Chávez.html", "Mexx_Meerdink.html"]

def patch(content, label):
    idx = content.index(MARKER)
    insert_at = idx + len(MARKER)
    # sanity: make sure we're not duplicating an entry already present
    close_idx = content.index('])', insert_at)
    existing_set_text = content[insert_at:close_idx]
    added = []
    for name in NEW_ENTRIES:
        token = '"' + name + '"'
        if token in existing_set_text:
            raise AssertionError(f"{label}: {name} already present in EXISTING_PROFILES -- aborting to avoid duplicate")
        added.append(token)
    insertion = ", ".join(added) + ", "
    new_content = content[:insert_at] + insertion + content[insert_at:]
    print(f"{label}: inserted {len(added)} entries into EXISTING_PROFILES")
    return new_content

def main():
    with open("platform.html", encoding="utf-8") as f:
        en = f.read()
    with open("platform_es.html", encoding="utf-8") as f:
        es = f.read()

    en_new = patch(en, "platform.html")
    es_new = patch(es, "platform_es.html")

    with open("platform_ep.html", "w", encoding="utf-8") as f:
        f.write(en_new)
    with open("platform_es_ep.html", "w", encoding="utf-8") as f:
        f.write(es_new)

    print("OK: wrote platform_ep.html, platform_es_ep.html")
    print("length delta en:", len(en_new) - len(en))
    print("length delta es:", len(es_new) - len(es))

if __name__ == "__main__":
    main()
