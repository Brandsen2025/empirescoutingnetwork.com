# -*- coding: utf-8 -*-
# Removes the old, wrongly-modeled 27-row "1997-98" Porto batch (season stats
# were career aggregates mislabeled as one season; sq mixed 1996/97 club with
# current squad; full legal names used instead of football names) and
# replaces it with the corrected 25-row "1996-97" batch.
import json, re

def find_array_end(s, start_idx):
    depth = 0
    i = start_idx
    started = False
    while i < len(s):
        ch = s[i]
        if ch == '[':
            depth += 1
            started = True
        elif ch == ']':
            depth -= 1
            if started and depth == 0:
                return i
        elif ch == '"':
            i += 1
            while i < len(s):
                if s[i] == '\\':
                    i += 2
                    continue
                if s[i] == '"':
                    break
                i += 1
        i += 1
    raise ValueError('array end not found')

with open('porto_rows.json', encoding='utf-8') as f:
    new_rows = json.load(f)
print('corrected rows:', len(new_rows))
new_pids = {r['pid'] for r in new_rows}
assert len(new_pids) == len(new_rows)

for fname in ('platform.html', 'platform_es.html'):
    with open(fname, encoding='utf-8') as f:
        content = f.read()

    m = re.search(r'const\s+P\s*=\s*\[', content)
    arr_start = m.end() - 1
    arr_end = find_array_end(content, arr_start)
    arr = json.loads(content[arr_start:arr_end + 1])

    before = len(arr)
    # old rows: identified by the old (pre-9697) pid scheme + season 1997-98,
    # for the specific 27 Porto players -- match by season=='1997-98' and
    # sq/club in FC Porto family OR pid ending pattern from the old batch.
    OLD_NAMES = {"Lars Richard Eriksson","Rui Manuel da Silva Correia","Henrique Hilario Meireles Alves Sampaio",
        "Aloisio Pires Alves","Luiz Birmar Marcos Lula","Fernando Manuel Antunes Mendes","Darko Butorovic",
        "Joaquim da Silva Neves","Jorge Paulo Costa Almeida","Rui Jorge de Sousa Dias Macedo de Oliveira",
        "Joao Manuel Pinto Tome dos Santos","Jose Gaspar Silva Azevedo","Rui Gil Soares de Barros",
        "Jose Alberto da Mota Barroso","Joao Paulo Maio dos Santos Paulinho Santos","Zlatko Zahovic",
        "Nuno Fernando Goncalves da Rocha Capucho","Sergio Paulo Marceneiro Conceicao","Arnold Wetl",
        "Joao Carlos Rodrigues da Costa","Daniel Kenedy Pimentel Mateus dos Santos","Youssef Chippo",
        "Ljubinko Drulovic","Artur Duarte de Oliveira","Antonio Jose dos Santos Folha","Grzegorz Mielcarski",
        "Mario Jardel Almeida Ribeiro"}
    kept = [r for r in arr if not (r.get('season') == '1997-98' and r.get('n') in OLD_NAMES)]
    removed = before - len(kept)
    print(fname, 'removed old rows:', removed)
    assert removed == 27, f'{fname}: expected to remove 27 old Porto rows, removed {removed}'

    kept.extend(new_rows)
    new_arr_text = json.dumps(kept, ensure_ascii=False)
    content = content[:arr_start] + new_arr_text + content[arr_end + 1:]

    with open(fname, 'w', encoding='utf-8') as f:
        f.write(content)
    print(fname, 'new total rows:', len(kept))

print('DONE')
