const fs = require('fs');
const js = fs.readFileSync('zareqia_bundle.js', 'utf8');

const target = 'rose-gold-blush-royal":return';
const idx = js.indexOf(target);
console.log('=== TEMPLATE RENDERER SWITCH ===');
console.log(js.substring(idx - 100, idx + 1000));
