const fs = require('fs');
const js = fs.readFileSync('zareqia_bundle.js', 'utf8');

// Find all royal theme configurations
const themes = [
  'rose-gold-blush-royal',
  'royal-prestige',
  'modern-minimal-royal',
  'royal-majesty',
  'royal-heritage',
  'royal-legacy',
  'royal-crest',
  'royal-grace',
  'emerald-noir-royal',
  'ivory-elegance-royal'
];

themes.forEach(t => {
  const videoName = t === 'modern-minimal-royal' ? 'royal-elegance-royal.mp4' : `${t.replace('-royal','')}.mp4`;
  console.log(`\n=================== THEME: ${t} ===================`);
  const idx = js.indexOf(t);
  if (idx !== -1) {
    console.log(js.substring(idx - 100, idx + 400));
  }
});
