const fs = require('fs');
const vm = require('vm');
const path = require('path');
const crypto = require('crypto');

const BASE = path.join(process.env.HOME, 'mnt', 'ESN - Git');
const content = fs.readFileSync(path.join(BASE, 'login.html'), 'utf8');

// syntax check all script blocks (module scripts included, strip type=module attr handling not needed for vm.Script since it's just JS syntax)
const re = /<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g;
let m, n = 0, ok = 0;
while ((m = re.exec(content))) {
  n++;
  const body = m[1];
  if (!body.trim()) { ok++; continue; }
  try { new vm.Script(body, { filename: `login.html#s${n}` }); ok++; }
  catch (e) { console.log(`SYNTAX ERROR script #${n}:`, e.message); }
}
console.log(`${ok}/${n} script blocks OK`);

// extract ACCOUNTS array text and vm-eval it
const idx = content.indexOf('var ACCOUNTS = [');
const endIdx = content.indexOf('];', idx) + 1;
const snippet = content.slice(idx, endIdx).replace('var ACCOUNTS = ', '');
const accounts = vm.runInNewContext(snippet);
console.log('ACCOUNTS length:', accounts.length, '(expect 4)');
accounts.forEach((a, i) => console.log(i, 'redirect:', a.redirect || '(default)', 'uh:', a.uh.slice(0,12)+'...'));

// verify hash recipe for the new entry
const SALT = 'ESN-FGA-2026';
function sha256hex(s) { return crypto.createHash('sha256').update(s, 'utf8').digest('hex'); }
const uh = sha256hex(SALT + 'pitshou.muteba');
const ph = sha256hex(SALT + 'qWgaPUQcuH3eG2');
const pitshou = accounts[accounts.length - 1];
console.log('computed uh matches:', uh === pitshou.uh, uh);
console.log('computed ph matches:', ph === pitshou.ph, ph);
console.log('redirect correct:', pitshou.redirect === 'platform_fr.html');
