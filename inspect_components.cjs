const fs = require('fs');
const js = fs.readFileSync('zareqia_bundle.js', 'utf8');

function inspectComponent(name, len = 2500) {
  // Find "function cre(" or "const cre=" or "var cre=" or "cre=("
  const patterns = [
    `function ${name}(`,
    `const ${name}=`,
    `var ${name}=`,
    `${name}=({`
  ];
  for (const p of patterns) {
    const idx = js.indexOf(p);
    if (idx !== -1) {
      console.log(`\n=================== COMPONENT ${name} (Pattern: ${p}) ===================`);
      console.log(js.substring(idx, idx + len));
      return;
    }
  }
  console.log(`Component ${name} not found with standard patterns`);
}

inspectComponent('cre'); // rose-gold-blush-royal
inspectComponent('hre'); // royal-prestige
inspectComponent('are'); // modern-minimal-royal
