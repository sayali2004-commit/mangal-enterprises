export const C = {
  navy: '#0A1B3D',
  navy2: '#13315F',
  navy3: '#1E417E',
  line: '#C4D2E9',
  white: '#FFFFFF',
  shade: '#EAF1FB',
  shade2: '#D8E3F4',
  shade3: '#C2D1E8',
  cyan: '#22D3EE',
  blue: '#2563EB',
  sky: '#60A5FA',
  violet: '#7C5CFC',
  purple: '#6D28D9',
  green: '#10B981',
  amber: '#F59E0B',
  rose: '#F472B6'
};

export const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const grad = (a) =>
  ({ cyan: 'url(#cyanG)', blue: 'url(#blueG)', violet: 'url(#violetG)', green: 'url(#greenG)' }[a] || 'url(#blueG)');

export const rr = (x, y, w, h, r, fill, extra = '') =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" ${extra}/>`;

export const circ = (cx, cy, r, fill, extra = '') =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" ${extra}/>`;

export const line = (x1, y1, x2, y2, stroke, w = 3, extra = '') =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" ${extra}/>`;

export const txt = (s, o = {}) =>
  `<text x="${o.x ?? 0}" y="${o.y ?? 0}" font-family="Inter, 'Segoe UI', Arial, sans-serif" font-size="${o.size ?? 16}" font-weight="${o.weight ?? 700}" fill="${o.fill ?? C.navy}" text-anchor="${o.anchor ?? 'middle'}" letter-spacing="${o.ls ?? 0}" opacity="${o.opacity ?? 1}">${esc(s)}</text>`;

export const ground = (cx, cy, rx) =>
  `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${Math.round(rx * 0.17)}" fill="url(#gshadow)"/>`;

export const slats = (x, y, w, count, gap, h = 5, fill = C.shade3, r = 2.5) =>
  Array.from({ length: count }, (_, i) => rr(x, y + i * gap, w, h, r, fill)).join('');

export const waves = (x, y, w, n = 3, color = C.cyan) =>
  Array.from({ length: n }, (_, i) =>
    `<path d="M${x} ${y + i * 15} q ${w / 2} ${i % 2 ? 9 : -9} ${w} 0" stroke="${color}" stroke-width="5" fill="none" stroke-linecap="round" opacity="${(0.7 - i * 0.18).toFixed(2)}"/>`
  ).join('');

export const snow = (cx, cy, r, color = C.cyan, sw = 5, op = 1) => {
  const arms = [0, 60, 120]
    .map((a) => `<line x1="${cx - r}" y1="${cy}" x2="${cx + r}" y2="${cy}" transform="rotate(${a} ${cx} ${cy})"/>`)
    .join('');
  const ticks = [0, 60, 120]
    .map((a) =>
      [0.55, -0.55]
        .map((f) => {
          const px = cx + r * f;
          return `<line x1="${px}" y1="${cy}" x2="${px + Math.sign(f) * r * 0.3}" y2="${cy - r * 0.32}" transform="rotate(${a} ${cx} ${cy})"/>` +
                 `<line x1="${px}" y1="${cy}" x2="${px + Math.sign(f) * r * 0.3}" y2="${cy + r * 0.32}" transform="rotate(${a} ${cx} ${cy})"/>`;
        })
        .join('')
    )
    .join('');
  return `<g stroke="${color}" stroke-width="${sw}" stroke-linecap="round" opacity="${op}">${arms}${ticks}</g>`;
};

export const pill = (x, y, w, h, label, fill = 'url(#navyG)', color = C.white, size = 15) =>
  rr(x, y, w, h, h / 2, fill) + txt(label, { x: x + w / 2, y: y + h / 2 + size * 0.36, size, fill: color, weight: 800, ls: 1.2 });

export const gear = (cx, cy, r, fill, teeth = 9) => {
  const t = Array.from({ length: teeth }, (_, i) => {
    const a = (360 / teeth) * i;
    return `<rect x="${cx - r * 0.14}" y="${cy - r * 1.32}" width="${r * 0.28}" height="${r * 0.42}" rx="${r * 0.08}" fill="${fill}" transform="rotate(${a} ${cx} ${cy})"/>`;
  }).join('');
  return `${t}${circ(cx, cy, r, fill)}${circ(cx, cy, r * 0.42, C.white)}`;
};

export const DEF_SVG = (w = 640, h = 480) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img">`;

export const DEFS = `
<defs>
  <linearGradient id="bodyG" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#DDE7F7"/>
  </linearGradient>
  <linearGradient id="bodyG2" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#E7EEFA"/>
  </linearGradient>
  <linearGradient id="topG" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#FBFDFF"/><stop offset="1" stop-color="#E4ECF9"/>
  </linearGradient>
  <linearGradient id="navyG" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#1E417E"/><stop offset="1" stop-color="#0A1B3D"/>
  </linearGradient>
  <linearGradient id="cyanG" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#67E8F9"/><stop offset="1" stop-color="#0891B2"/>
  </linearGradient>
  <linearGradient id="blueG" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#60A5FA"/><stop offset="1" stop-color="#1D4ED8"/>
  </linearGradient>
  <linearGradient id="violetG" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#A78BFA"/><stop offset="1" stop-color="#6D28D9"/>
  </linearGradient>
  <linearGradient id="greenG" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#6EE7B7"/><stop offset="1" stop-color="#059669"/>
  </linearGradient>
  <linearGradient id="glassG" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#DBEAFE" stop-opacity="0.95"/><stop offset="1" stop-color="#93C5FD" stop-opacity="0.7"/>
  </linearGradient>
  <linearGradient id="waterG" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#7DD3FC"/><stop offset="1" stop-color="#0EA5E9"/>
  </linearGradient>
  <radialGradient id="gshadow">
    <stop offset="0" stop-color="#0A1B3D" stop-opacity="0.30"/>
    <stop offset="0.65" stop-color="#0A1B3D" stop-opacity="0.10"/>
    <stop offset="1" stop-color="#0A1B3D" stop-opacity="0"/>
  </radialGradient>
  <pattern id="mesh" width="15" height="15" patternUnits="userSpaceOnUse">
    <circle cx="7.5" cy="7.5" r="2.2" fill="#C4D2E9"/>
  </pattern>
</defs>`;
