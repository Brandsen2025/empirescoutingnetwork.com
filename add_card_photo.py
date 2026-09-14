# -*- coding: utf-8 -*-
# Adds player-photo-instead-of-position-badge support to the scout card's
# top-left corner. Falls back to the existing pos-chip badge whenever a
# player has no photo field, or the photo fails to load -- so this is a
# strict superset of current behaviour for the ~38,000 players who have no
# photo.
import re

OLD = '''      '<div class="scout-card-top"><span class="pos-chip" style="background:'+posCol+'22;color:'+posCol+'">'+p.pos+'</span><span class="scout-card-age">'+p.age+'</span></div>'+'''

NEW = '''      '<div class="scout-card-top">'+(p.photo?('<img class="scout-card-photo" src="'+p.photo+'" alt="" onerror="esnPhotoFallback(this,\\''+p.pos+'\\',\\''+posCol+'\\')">'):('<span class="pos-chip" style="background:'+posCol+'22;color:'+posCol+'">'+p.pos+'</span>'))+'<span class="scout-card-age">'+p.age+'</span></div>'+'''

FALLBACK_FN = '''function esnPhotoFallback(img,pos,posCol){
  var span=document.createElement('span');
  span.className='pos-chip';
  span.style.background=posCol+'22';
  span.style.color=posCol;
  span.textContent=pos;
  img.replaceWith(span);
}
'''

CSS = '.scout-card-photo{width:28px;height:28px;border-radius:6px;object-fit:cover;object-position:top center;flex-shrink:0;border:1px solid var(--ln2)}\n'

for fname in ('platform.html', 'platform_es.html'):
    with open(fname, encoding='utf-8') as f:
        content = f.read()

    assert content.count(OLD) == 1, f'{fname}: renderScoutCards top-line not found once ({content.count(OLD)})'
    content = content.replace(OLD, NEW, 1)

    marker = 'function renderScoutCards(){'
    assert content.count(marker) == 1, f'{fname}: renderScoutCards() def not found once'
    content = content.replace(marker, FALLBACK_FN + marker, 1)

    style_marker = '.scout-card-stats .scl{display:block;font-size:.58rem;color:var(--t3);text-transform:uppercase;letter-spacing:.5px;margin-top:2px}\n'
    assert content.count(style_marker) == 1, f'{fname}: scout-card-stats .scl CSS anchor not found once'
    content = content.replace(style_marker, style_marker + CSS, 1)

    with open(fname, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'{fname}: card-photo toggle installed OK')

print('DONE')
