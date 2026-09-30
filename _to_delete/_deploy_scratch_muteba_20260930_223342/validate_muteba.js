const fs = require('fs');
const vm = require('vm');
const path = require('path');

const BASE = path.join(process.env.HOME, 'mnt', 'ESN - Git');
const marker = 'const P    = ';

function extractArray(content, marker) {
  const start = content.indexOf(marker) + marker.length;
  let depth = 0, inStr = false, esc = false, i = start;
  for (; i < content.length; i++) {
    const c = content[i];
    if (inStr) { if (esc) esc = false; else if (c === '\\') esc = true; else if (c === '"') inStr = false; }
    else { if (c === '"') inStr = true; else if (c === '[') depth++; else if (c === ']') { depth--; if (depth === 0) { i++; break; } } }
  }
  const text = content.slice(start, i);
  return vm.runInNewContext(text);
}
function keyOf(p) { return JSON.stringify([p.pid, p.season, p.sq]); }

function checkScripts(filepath, label) {
  const c = fs.readFileSync(filepath, 'utf8');
  const re = /<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g;
  let m, n = 0, ok = 0;
  while ((m = re.exec(c))) {
    n++;
    const body = m[1];
    if (!body.trim()) { ok++; continue; }
    try { new vm.Script(body, { filename: `${label}#s${n}` }); ok++; }
    catch (e) { console.log(`SYNTAX ERROR in ${label} script #${n}:`, e.message); }
  }
  console.log(`${label}: ${ok}/${n} script blocks OK`);
}

const files = ['platform.html', 'platform_es.html', 'platform_fr.html'];
const arrs = {};
for (const f of files) {
  const c = fs.readFileSync(path.join(BASE, f), 'utf8');
  arrs[f] = extractArray(c, marker);
  console.log(f, 'rows:', arrs[f].length);
  checkScripts(path.join(BASE, f), f);
}

// cross-file row-count consistency
const counts = files.map(f => arrs[f].length);
console.log('row counts equal across all 3:', counts.every(x => x === counts[0]), counts);

// muteba rows identical across all 3 files (deep compare)
const mutebaSets = files.map(f => arrs[f].filter(p => p.pid === 'elior-muteba-fra-2010'));
mutebaSets.forEach((rows, i) => console.log(files[i], 'muteba rows:', rows.length));
const ref = JSON.stringify(mutebaSets[0]);
console.log('muteba rows byte-identical across all 3 files:', mutebaSets.every(rows => JSON.stringify(rows) === ref));

mutebaSets[0].forEach(r => {
  console.log('---', r.season, r.sq, '---');
  console.log('l:', r.l, 'mp:', r.mp, 'ht:', r.ht, 'foot:', r.foot, 'obi:', r.obi, 'sii:', r.sii, 'gradingProgress:', r.gradingProgress);
  console.log('tier3:', JSON.stringify(r.tier3));
  console.log('pairingList primary:', r.pairingList[0].name, r.pairingList[0].pct);
});

// diff vs a known-good pre-muteba baseline is not available here (we only have current state);
// instead confirm no OTHER pid changed by spot-checking total non-muteba row count equality
for (const f of files) {
  const nonMuteba = arrs[f].filter(p => p.pid !== 'elior-muteba-fra-2010').length;
  console.log(f, 'non-muteba rows:', nonMuteba, '(expect 42773)');
}

// CLUBS check
for (const f of files) {
  const c = fs.readFileSync(path.join(BASE, f), 'utf8');
  const idx = c.indexOf('const CLUBS={');
  const end = c.indexOf('};', idx) + 2;
  const snippet = c.slice(idx, end).replace('const CLUBS=', '');
  const obj = vm.runInNewContext('(' + snippet.slice(0, -1) + ')');
  console.log(f, 'CLUBS keys:', Object.keys(obj).length, '"U16 R1" ->', obj['U16 R1']);
}
