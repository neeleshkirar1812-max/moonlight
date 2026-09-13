const fs = require('fs');
const js = fs.readFileSync('zareqia_bundle.js', 'utf8');

const idx = js.indexOf('ore="/videos/rose-gold-blush.mp4"');
console.log('=== FULL cre (rose-gold-blush-royal) COMPONENT ===');
console.log(js.substring(idx, idx + 8000));
