import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import * as T from './svg-templates.mjs';
import { C, esc } from './svg-parts.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dataPath = path.join(root, 'js', 'data.js');
const src = readFileSync(dataPath, 'utf8');
const { PRODUCTS, CLIENTS } = new Function(
  `${src}\nreturn { PRODUCTS, CLIENTS };`
)();

const prodDir = path.join(root, 'assets', 'img', 'products');
const cliDir = path.join(root, 'assets', 'img', 'clients');
mkdirSync(prodDir, { recursive: true });
mkdirSync(cliDir, { recursive: true });

/* ---------- product illustrations ---------- */
let made = 0;
for (const p of PRODUCTS) {
  const tpl = T[p.art];
  if (!tpl) {
    console.error(`[assets] no template "${p.art}" for ${p.slug}`);
    continue;
  }
  const svg = tpl(p.artOpts || {});
  const file = path.join(prodDir, `${p.slug}.svg`);
  writeFileSync(file, svg);
  made++;
}

/* ---------- client logos ---------- */
const shapes = {
  circle: (cx, cy, r, f, extra = '') => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${f}" ${extra}/>`,
  squircle: (x, y, s, f, extra = '') => `<rect x="${x}" y="${y}" width="${s}" height="${s}" rx="${s * 0.28}" fill="${f}" ${extra}/>`,
  hexagon: (cx, cy, r, f, extra = '') => `<polygon points="${hexPoints(cx, cy, r)}" fill="${f}" ${extra}/>`,
  shield: (cx, cy, r, f, extra = '') => `<path d="M${cx} ${cy - r} L${cx + r} ${cy - r * 0.62} V${cy + r * 0.22} C${cx + r} ${cy + r * 0.78} ${cx + r * 0.5} ${cy + r * 1.05} ${cx} ${cy + r * 1.2} C${cx - r * 0.5} ${cy + r * 1.05} ${cx - r} ${cy + r * 0.78} ${cx - r} ${cy + r * 0.22} V${cy - r * 0.62} Z" fill="${f}" ${extra}/>`
};

function hexPoints(cx, cy, r) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    return `${(cx + Math.cos(a) * r).toFixed(1)},${(cy + Math.sin(a) * r).toFixed(1)}`;
  }).join(' ');
}

function clientLogo(c) {
  const W = 560;
  const H = 200;
  const cy = 100;
  const r = 62;
  const cx = 92;
  const g1 = `lg1_${c.id}`;
  const g2 = `lg2_${c.id}`;
  const shapeFn = shapes[c.shape] || shapes.squircle;
  const shapeArgs = c.shape === 'squircle' ? [cx - r, cy - r, r * 2] : [cx, cy, r];
  const mark = `
    <g>
      ${shapeFn(...shapeArgs, `url(#${g1})`)}
      <text x="${cx}" y="${cy + 12}" font-family="Inter, 'Segoe UI', Arial, sans-serif" font-size="52" font-weight="800" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">${esc(c.initials)}</text>
      <path d="M${cx - 30} ${cy + 40} H${cx + 30}" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" opacity="0.5"/>
    </g>`;
  const nameY = c.line2 ? 88 : 106;
  const name = `
    <text x="190" y="${nameY}" font-family="Inter, 'Segoe UI', Arial, sans-serif" font-size="34" font-weight="800" fill="#0A1B3D" letter-spacing="0.4">${esc(c.line1)}</text>
    ${c.line2 ? `<text x="190" y="${nameY + 40}" font-family="Inter, 'Segoe UI', Arial, sans-serif" font-size="34" font-weight="800" fill="#0A1B3D" letter-spacing="0.4">${esc(c.line2)}</text>` : ''}
    <path d="M190 ${c.line2 ? nameY + 60 : nameY + 20} H${190 + Math.min(300, c.line1.length * 17)}" stroke="url(#${g2})" stroke-width="6" stroke-linecap="round"/>
    <text x="190" y="${c.line2 ? nameY + 90 : nameY + 50}" font-family="Inter, 'Segoe UI', Arial, sans-serif" font-size="19" font-weight="600" fill="#5B6B8C" letter-spacing="2.4">${esc(c.tagline.toUpperCase())}</text>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(c.name)} logo">
  <defs>
    <linearGradient id="${g1}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c.colors[0]}"/><stop offset="1" stop-color="${c.colors[1]}"/>
    </linearGradient>
    <linearGradient id="${g2}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${c.colors[0]}"/><stop offset="1" stop-color="${c.colors[1]}"/>
    </linearGradient>
  </defs>
  ${mark}
  ${name}
</svg>`;
}

let logos = 0;
for (const c of CLIENTS) {
  writeFileSync(path.join(cliDir, `${c.id}.svg`), clientLogo(c));
  logos++;
}

console.log(`[assets] ${made} product illustrations, ${logos} client logos generated`);
if (!existsSync(path.join(root, 'assets', 'img', 'logo.svg'))) console.log('[assets] site logo: generated separately');
