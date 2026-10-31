#!/usr/bin/env python3
"""Build platform.html / platform_es.html / platform_fr.html from one source.
src/head.html + src/tail.html = English master. src/i18n/<lang>.json = exact-text overlays.
Players live once in esn_players.js (shared by all languages).
Usage: python3 build.py [--inline] [--out DIR]
A stale overlay key (English text changed) stops the build and names the key to retranslate."""
import json,re,sys,os
ROOT=os.path.dirname(os.path.abspath(__file__))
inline='--inline' in sys.argv
out=ROOT
if '--out' in sys.argv: out=sys.argv[sys.argv.index('--out')+1]; os.makedirs(out,exist_ok=True)
rd=lambda p:open(os.path.join(ROOT,p),encoding='utf-8',newline='').read()
def apply(text,pairs,lang,part):
    d={}
    for k,v in pairs:
        if k not in text: sys.exit(f'STALE [{lang}/{part}] English text not found, retranslate: {k[:110]!r}')
        d[k]=v
    pat=re.compile('|'.join(re.escape(k) for k in sorted(d,key=len,reverse=True)))
    return pat.sub(lambda m:d[m.group(0)],text)
head,tail=rd('src/head.html'),rd('src/tail.html')
players=rd('esn_players.js')
if inline: pblock='<script>\n'+players.replace('const P = ','const P    = ',1)[:-0 or None]+'</script>'
else: pblock='<script src="esn_players.js"></script>'
for lang,fn in (('en','platform.html'),('es','platform_es.html'),('fr','platform_fr.html')):
    h,t=head,tail
    if lang!='en':
        ov=json.load(open(os.path.join(ROOT,f'src/i18n/{lang}.json'),encoding='utf-8'))
        h=apply(h,ov['head'],lang,'head'); t=apply(t,ov['tail'],lang,'tail')
    if inline: page=h+'<script>\n'+players.replace('const P = ','const P    = ',1)[:-1]+';</script>'+t
    else: page=h+pblock+t
    open(os.path.join(out,fn),'w',encoding='utf-8',newline='').write(page)
    print('built',fn,len(page))
