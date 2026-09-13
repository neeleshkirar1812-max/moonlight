const fs = require('fs');
const js = fs.readFileSync('zareqia_bundle.js', 'utf8');

// Find theme definitions for royal templates
const idx = js.indexOf('ore="/videos/rose-gold-blush.mp4"');
console.log('Context before ore (theme definitions):');
console.log(js.substring(idx - 3000, idx));
