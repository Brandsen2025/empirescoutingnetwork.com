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

const enC = fs.readFileSync(path.join(BASE, 'platform.html'), 'utf8');
const frC = fs.readFileSync(path.join(BASE, '_deploy_scratch', 'platform_fr.html'), 'utf8');

const enArr = extractArray(enC, marker);
const frArr = extractArray(frC, marker);
console.log('EN rows:', enArr.length, 'FR rows:', frArr.length);

const enMap = new Map(enArr.map(p => [keyOf(p), p]));
const frMap = new Map(frArr.map(p => [keyOf(p), p]));
let added = 0, removed = 0, changed = 0;
for (const [k, v] of frMap) if (!enMap.has(k)) added++;
for (const [k, v] of enMap) if (!frMap.has(k)) removed++;
for (const [k, v] of enMap) {
  if (frMap.has(k)) {
    const nv = frMap.get(k);
    if (JSON.stringify(v) !== JSON.stringify(nv)) changed++;
  }
}
console.log('P-array diff vs platform.html -> added:', added, 'removed:', removed, 'changed:', changed, '(expect all 0 - P array must be untouched)');

// script syntax check
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
checkScripts(path.join(BASE, '_deploy_scratch', 'platform_fr.html'), 'platform_fr.html');
checkScripts(path.join(BASE, 'platform.html'), 'platform.html (control)');

// CLUBS sanity (should be identical to platform.html - no club changes in a pure translation)
function getClubsCount(content) {
  const idx = content.indexOf('const CLUBS={');
  const end = content.indexOf('};', idx) + 2;
  const snippet = content.slice(idx, end).replace('const CLUBS=', '');
  const obj = vm.runInNewContext('(' + snippet.slice(0, -1) + ')');
  return Object.keys(obj).length;
}
console.log('CLUBS keys EN:', getClubsCount(enC), 'CLUBS keys FR:', getClubsCount(frC));

// quick spot-check of French text presence
const frText = frC;
const checks = [
  'Tableau de bord', 'Joueurs', 'Outil de Scouting', 'Cibles', 'Métriques',
  'Base de Données des Joueurs', 'ÉLITE', 'EXCELLENT', 'TRÈS BON', 'Non Évalué',
  'Voir le profil du joueur', 'Maximum 20 cibles', 'Note Composite', 'Analyse Vidéo'
];
for (const s of checks) {
  console.log(`contains "${s}":`, frText.includes(s));
}
