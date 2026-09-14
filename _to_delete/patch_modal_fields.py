# -*- coding: utf-8 -*-
# Two fixes to the player modal (openModal's HTML template):
#  1) Height/Weight weren't rendering for the Portugal rows because the modal
#     reads p.ht/p.wt, but the Portugal data used p.height/p.weight -- a
#     field-name mismatch, not a missing-feature. Renamed the 25 already-
#     spliced Porto rows' height/weight -> ht/wt to match the platform's own
#     convention (used by every other league already).
#  2) Added Contract End and First Club (PT) to the Player Info row, and a
#     new "Career Totals (Portugal top flight)" section showing
#     careerSeasonsPT/careerMP/careerG -- Jim's "additional stats", clearly
#     separate from the Season Statistics section so it's never confused with
#     this season's numbers again.
import json, re

OLD_INFO = '''        '<div class="m-sec"><i class="fas fa-id-card" style="margin-right:5px;opacity:.6"></i>Player Info</div>'+
        '<div class="stats-row">'+
          (p.dob?'<div class="sbox"><div class="sbox-n" style="font-size:.8em">'+p.dob+'</div><div class="sbox-l">Born</div></div>':'')+
          (p.pob?'<div class="sbox"><div class="sbox-n" style="font-size:.7em">'+p.pob+'</div><div class="sbox-l">Birthplace</div></div>':'')+
          (p.ht?'<div class="sbox"><div class="sbox-n">'+p.ht.toFixed(2)+'m</div><div class="sbox-l">Height</div></div>':'')+
          (p.wt?'<div class="sbox"><div class="sbox-n">'+p.wt+'kg</div><div class="sbox-l">Weight</div></div>':'')+
          (p.foot?'<div class="sbox"><div class="sbox-n" style="font-size:.85em">'+p.foot+'</div><div class="sbox-l">Dominant Foot</div></div>':'')+
        '</div>'
      ):'')+'''

NEW_INFO = '''        '<div class="m-sec"><i class="fas fa-id-card" style="margin-right:5px;opacity:.6"></i>Player Info</div>'+
        '<div class="stats-row">'+
          (p.dob?'<div class="sbox"><div class="sbox-n" style="font-size:.8em">'+p.dob+'</div><div class="sbox-l">Born</div></div>':'')+
          (p.pob?'<div class="sbox"><div class="sbox-n" style="font-size:.7em">'+p.pob+'</div><div class="sbox-l">Birthplace</div></div>':'')+
          (p.ht?'<div class="sbox"><div class="sbox-n">'+p.ht.toFixed(2)+'m</div><div class="sbox-l">Height</div></div>':'')+
          (p.wt?'<div class="sbox"><div class="sbox-n">'+p.wt+'kg</div><div class="sbox-l">Weight</div></div>':'')+
          (p.foot?'<div class="sbox"><div class="sbox-n" style="font-size:.85em">'+p.foot+'</div><div class="sbox-l">Dominant Foot</div></div>':'')+
          (p.firstClubPT?'<div class="sbox"><div class="sbox-n" style="font-size:.75em">'+p.firstClubPT+'</div><div class="sbox-l">First Club (PT)</div></div>':'')+
          (p.contractEnd?'<div class="sbox"><div class="sbox-n">'+p.contractEnd+'</div><div class="sbox-l">Contract End</div></div>':'')+
        '</div>'
      ):'')+'''

# also widen the outer guard so the section still renders when only the new
# fields are present (rare, but keeps this robust)
OLD_GUARD = "(p.dob||p.pob||p.foot||p.ht||p.wt?("
NEW_GUARD = "(p.dob||p.pob||p.foot||p.ht||p.wt||p.firstClubPT||p.contractEnd?("

OLD_SEASON_TAIL = '''        '<div class="sbox"><div class="sbox-n">'+(p.pos==='GK'&&p.ga90GK!=null?p.ga90GK.toFixed(2):(p.g+p.a))+'</div><div class="sbox-l">'+(p.pos==='GK'&&p.ga90GK!=null?'GA per 90':'G + A')+'</div></div>'+
      '</div>'+
'''

NEW_SEASON_TAIL = '''        '<div class="sbox"><div class="sbox-n">'+(p.pos==='GK'&&p.ga90GK!=null?p.ga90GK.toFixed(2):(p.g+p.a))+'</div><div class="sbox-l">'+(p.pos==='GK'&&p.ga90GK!=null?'GA per 90':'G + A')+'</div></div>'+
      '</div>'+

      (p.careerSeasonsPT!=null?(
        '<div class="m-sec"><i class="fas fa-layer-group" style="margin-right:5px;opacity:.6"></i>Career Totals (Portugal top flight, to date)</div>'+
        '<div class="stats-row">'+
          '<div class="sbox"><div class="sbox-n">'+p.careerSeasonsPT+'</div><div class="sbox-l">Seasons</div></div>'+
          '<div class="sbox"><div class="sbox-n">'+p.careerMP+'</div><div class="sbox-l">Matches</div></div>'+
          '<div class="sbox"><div class="sbox-n">'+p.careerG+'</div><div class="sbox-l">Goals</div></div>'+
        '</div>'
      ):'')+
'''

for fname in ('platform.html', 'platform_es.html'):
    with open(fname, encoding='utf-8') as f:
        content = f.read()

    assert content.count(OLD_GUARD) == 1, f'{fname}: guard not found once ({content.count(OLD_GUARD)})'
    content = content.replace(OLD_GUARD, NEW_GUARD, 1)

    assert content.count(OLD_INFO) == 1, f'{fname}: Player Info block not found once ({content.count(OLD_INFO)})'
    content = content.replace(OLD_INFO, NEW_INFO, 1)

    assert content.count(OLD_SEASON_TAIL) == 1, f'{fname}: season tail not found once ({content.count(OLD_SEASON_TAIL)})'
    content = content.replace(OLD_SEASON_TAIL, NEW_SEASON_TAIL, 1)

    with open(fname, 'w', encoding='utf-8') as f:
        f.write(content)
    print(fname, 'modal patched OK')

# --- rename height/weight -> ht/wt on the 25 already-spliced Porto rows ---
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

for fname in ('platform.html', 'platform_es.html'):
    with open(fname, encoding='utf-8') as f:
        content = f.read()
    m = re.search(r'const\s+P\s*=\s*\[', content)
    arr_start = m.end() - 1
    arr_end = find_array_end(content, arr_start)
    arr = json.loads(content[arr_start:arr_end + 1])
    fixed = 0
    for row in arr:
        if row.get('pid', '').endswith('-9697') and 'height' in row:
            row['ht'] = row.pop('height')
            row['wt'] = row.pop('weight')
            fixed += 1
    print(fname, 'rows with ht/wt renamed:', fixed)
    new_arr_text = json.dumps(arr, ensure_ascii=False)
    content = content[:arr_start] + new_arr_text + content[arr_end + 1:]
    with open(fname, 'w', encoding='utf-8') as f:
        f.write(content)

print('DONE')
