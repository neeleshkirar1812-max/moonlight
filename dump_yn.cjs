const fs = require('fs');
const js = fs.readFileSync('zareqia_bundle.js', 'utf8');

const idx = js.indexOf('yn=');
console.log('=== yn (Main Invitation Body) COMPONENT ===');
console.log(js.substring(idx, idx + 8000));
