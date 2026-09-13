const fs = require('fs');
const js = fs.readFileSync('zareqia_bundle.js', 'utf8');

const regex = /([a-zA-Z0-9_$]+)=function\s*\([^\)]*\)\s*\{[^}]*rose-gold-blush/g;
// or find all occurrences of "cre=" or similar
const idx = js.indexOf('cre={') > -1 ? js.indexOf('cre={') : js.indexOf('cre=');
console.log('Index of cre=:', idx);
if (idx !== -1) {
  console.log(js.substring(idx - 50, idx + 1500));
} else {
  // Let's search near the switch statement
  const switchIdx = js.indexOf('rose-gold-blush-royal":return s.jsx(cre');
  console.log('Context around switch:');
  console.log(js.substring(switchIdx - 2000, switchIdx + 200));
}
