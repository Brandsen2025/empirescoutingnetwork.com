const fs = require('fs');
const vm = require('vm');
const path = require('path');
const crypto = require('crypto');

const BASE = path.join(process.env.HOME, 'mnt', 'ESN - Git');
const content = fs.readFileSync(path.join(BASE, 'login.html'), 'utf8');
const old = fs.readFileSync(path.join(BASE, 'login.html.bak_20261002a_pre_paul'), 'utf8');

const idx = content.indexOf('var ACCOUNTS = [');
const endIdx = content.indexOf('];', idx) + 1;
const snippet = content.slice(idx, endIdx).replace('var ACCOUNTS = ', '');
const accounts = vm.runInNewContext(snippet);
console.log('ACCOUNTS length:', accounts.length, '(expect 5)');
accounts.forEach((a, i) => console.log(i, 'redirect:', a.redirect || '(default)', 'uh:', a.uh.slice(0,12)+'...'));

const SALT = 'ESN-FGA-2026';
function sha256hex(s) { return crypto.createHash('sha256').update(s, 'utf8').digest('hex'); }
const uh = sha256hex(SALT + 'paul.albert');
const ph = sha256hex(SALT + 'OPUY5Y7HFL7Pnv');
const paul = accounts[accounts.length - 1];
console.log('computed uh matches:', uh === paul.uh);
console.log('computed ph matches:', ph === paul.ph);
console.log('redirect (should be undefined/default):', paul.redirect);

// isolation check: divergence should be scoped, same suffix after insertion
let i = 0;
while (i < Math.min(old.length, content.length) && old[i] === content[i]) i++;
let j = 0;
while (j < Math.min(old.length, content.length) && old[old.length-1-j] === content[content.length-1-j]) j++;
console.log('diverge at char', i, 'common suffix length', j);
console.log('old lines', old.split('\n').length, 'new lines', content.split('\n').length);
