/**
 * Escanea fotos/productos/ y genera photos-manifest.js
 * Ejecutar: node scripts/generate-manifest.js
 */

const fs   = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'fotos', 'productos');
const out = path.join(__dirname, '..', 'photos-manifest.js');

const files = fs.readdirSync(dir)
  .filter(f => /\.(jpe?g|png|webp|avif)$/i.test(f))
  .sort();

function toCaption(filename) {
  return filename
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

const photos = files.map(f => ({
  archivo: `fotos/productos/${f}`,
  caption: toCaption(f),
}));

const content =
  '// Auto-generado — ejecutar: node scripts/generate-manifest.js\n' +
  `const PHOTOS = ${JSON.stringify(photos, null, 2)};\n`;

fs.writeFileSync(out, content);
console.log(`✓ ${photos.length} foto(s) encontrada(s) → photos-manifest.js`);
photos.forEach(p => console.log(`  · ${p.archivo}  →  "${p.caption}"`));
