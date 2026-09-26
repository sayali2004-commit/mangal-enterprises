import { C, esc, grad, rr, circ, line, txt, ground, slats, waves, snow, pill, gear, DEF_SVG, DEFS } from './svg-parts.mjs';

const FONT = "Inter, 'Segoe UI', Arial, sans-serif";

const wrap = (inner) => `${DEF_SVG()}${DEFS}${inner}</svg>`;

const grille = (cx, cy, r, hubFill = C.navy2) => {
  const rings = [1, 0.78, 0.56, 0.34].map((f) =>
    circ(cx, cy, r * f, 'none', `stroke="${C.line}" stroke-width="${Math.max(2.5, r * 0.06)}"`)
  ).join('');
  const spokes = Array.from({ length: 8 }, (_, i) => {
    const a = ((Math.PI * 2) / 8) * i;
    const x2 = cx + Math.cos(a) * r;
    const y2 = cy + Math.sin(a) * r;
    return line(cx, cy, x2, y2, C.line, Math.max(2, r * 0.05));
  }).join('');
  return `${circ(cx, cy, r, C.shade)}${rings}${spokes}${circ(cx, cy, r * 0.16, hubFill)}`;
};

const airArrow = (x, y, len, dir = 'right', color = C.cyan) => {
  const w = 6;
  if (dir === 'right')
    return `<g stroke="${color}" stroke-width="${w}" stroke-linecap="round" fill="none">
      <path d="M${x} ${y} h${len - 16}"/><path d="M${x + len - 22} ${y - 11} l11 11 l-11 11" stroke-linejoin="round"/></g>`;
  if (dir === 'down')
    return `<g stroke="${color}" stroke-width="${w}" stroke-linecap="round" fill="none">
      <path d="M${x} ${y} v${len - 16}"/><path d="M${x - 11} ${y + len - 22} l11 11 l11 -11" stroke-linejoin="round"/></g>`;
  return `<g stroke="${color}" stroke-width="${w}" stroke-linecap="round" fill="none">
      <path d="M${x} ${y} v${len - 16}"/><path d="M${x - 11} ${y + 6} l11 -11 l11 11" stroke-linejoin="round"/></g>`;
};

/* ---------------- Air Conditioners ---------------- */

export function splitAc({ accent = 'cyan', label = '', outdoor = true } = {}) {
  const pipe = outdoor
    ? `<path d="M372 206 C 404 214 408 234 430 246" stroke="${C.shade3}" stroke-width="13" fill="none" stroke-linecap="round"/>
       <path d="M374 216 C 402 224 408 242 428 254" stroke="${C.sky}" stroke-width="6" fill="none" stroke-linecap="round"/>`
    : '';
  const unit = outdoor
    ? `${rr(404, 240, 178, 164, 18, 'url(#bodyG)', `stroke="${C.line}" stroke-width="2"`)}
       ${slats(418, 256, 150, 4, 11, 5)}
       ${grille(493, 328, 56)}
       ${rr(420, 404, 44, 14, 7, C.shade2)}${rr(522, 404, 44, 14, 7, C.shade2)}
       ${rr(404, 286, 10, 68, 5, grad(accent))}`
    : '';
  return wrap(`
    ${ground(240, 414, 180)}${outdoor ? ground(493, 424, 104) : ''}
    ${pipe}
    ${rr(88, 104, 300, 110, 26, 'url(#bodyG)', `stroke="${C.line}" stroke-width="2"`)}
    ${rr(106, 120, 264, 10, 5, C.shade2)}
    ${rr(106, 142, 86, 13, 6.5, grad(accent))}
    ${rr(330, 138, 44, 22, 8, C.navyG ? 'url(#navyG)' : C.navy)}
    ${rr(338, 145, 28, 5, 2.5, C.cyan)}${rr(338, 153, 18, 5, 2.5, C.sky)}
    ${rr(98, 184, 282, 16, 8, C.shade2)}
    ${rr(98, 197, 282, 9, 4.5, grad(accent))}
    ${waves(146, 240, 190, 3)}
    ${unit}
    ${label ? pill(88, 56, Math.round(label.length * 10.4) + 44, 36, label) : ''}
  `);
}

export function windowAc({ accent = 'blue' } = {}) {
  return wrap(`
    ${ground(320, 402, 214)}
    <path d="M150 152 L206 104 L536 104 L480 152 Z" fill="url(#topG)" stroke="${C.line}" stroke-width="2"/>
    <path d="M480 152 L536 104 L536 292 L480 340 Z" fill="${C.shade2}" stroke="${C.line}" stroke-width="2"/>
    ${rr(150, 152, 330, 188, 16, 'url(#bodyG)', `stroke="${C.line}" stroke-width="2"`)}
    ${slats(174, 176, 196, 8, 16, 7)}
    ${rr(392, 176, 70, 64, 12, 'url(#navyG)')}
    ${circ(412, 198, 9, C.shade)}${circ(442, 198, 9, C.shade)}
    ${rr(400, 216, 54, 16, 6, '#0F2A55')}${rr(406, 221, 26, 6, 3, C.cyan)}
    ${rr(150, 316, 330, 12, 6, grad(accent))}
    ${rr(174, 296, 130, 10, 5, C.shade3)}
    ${waves(182, 366, 170, 2)}
  `);
}

export function towerAc({ accent = 'cyan', label = '' } = {}) {
  const louvres = [0, 1, 2, 3, 4, 5].map((i) => line(286 + i * 18, 152, 286 + i * 18, 348, C.line, 3)).join('');
  return wrap(`
    ${ground(320, 432, 156)}
    ${rr(238, 74, 156, 336, 36, 'url(#bodyG)', `stroke="${C.line}" stroke-width="2"`)}
    ${rr(262, 92, 108, 28, 14, C.shade2)}${rr(272, 100, 88, 10, 5, grad(accent))}
    ${rr(246, 142, 10, 214, 5, grad(accent))}
    ${rr(274, 138, 106, 226, 18, C.shade)}
    ${louvres}
    ${rr(292, 376, 50, 20, 8, 'url(#navyG)')}${rr(299, 382, 36, 8, 4, C.cyan)}
    ${rr(252, 406, 128, 18, 9, C.shade2)}
    ${waves(414, 180, 104, 3)}
    ${label ? pill(238, 34, Math.round(label.length * 10.4) + 44, 36, label) : ''}
  `);
}

export function vrfOutdoor({ accent = 'blue', label = 'VRF' } = {}) {
  return wrap(`
    ${ground(320, 420, 208)}
    ${rr(140, 96, 344, 296, 22, 'url(#bodyG)', `stroke="${C.line}" stroke-width="2"`)}
    ${rr(154, 108, 316, 12, 6, grad(accent))}
    ${slats(158, 134, 308, 4, 12, 5)}
    ${grille(238, 262, 62)}
    ${grille(400, 262, 62)}
    ${rr(160, 392, 56, 16, 8, C.shade2)}${rr(408, 392, 56, 16, 8, C.shade2)}
    ${rr(492, 152, 36, 168, 12, C.shade2)}
    ${circ(510, 194, 9, 'url(#navyG)')}${circ(510, 232, 9, 'url(#cyanG)')}
    ${line(528, 194, 546, 194, C.shade3, 9)}${line(528, 232, 546, 232, C.shade3, 9)}
    ${label ? pill(140, 46, Math.round(label.length * 11) + 44, 36, label) : ''}
  `);
}

export function ductAc({ accent = 'violet', label = 'DUCTABLE' } = {}) {
  const ridges = (x) =>
    Array.from({ length: 8 }, (_, i) => line(x + 10 + i * 14, 206, x + 10 + i * 14, 296, C.shade3, 3)).join('');
  return wrap(`
    ${ground(320, 412, 232)}
    ${rr(180, 112, 280, 12, 6, C.shade2)}
    ${line(232, 124, 232, 176, C.shade3, 7)}${line(408, 124, 408, 176, C.shade3, 7)}
    ${rr(74, 194, 122, 114, 16, C.shade)}${ridges(74)}
    ${rr(444, 194, 122, 114, 16, C.shade)}${ridges(444)}
    ${rr(192, 162, 256, 180, 22, 'url(#bodyG)', `stroke="${C.line}" stroke-width="2"`)}
    ${rr(206, 176, 228, 16, 8, grad(accent))}
    ${grille(320, 254, 52)}
    ${pill(272, 308, 96, 30, label, 'url(#navyG)', C.white, 13)}
    ${airArrow(578, 250, 44, 'right')}
    ${airArrow(62, 250, 44, 'right')}
  `);
}

/* ---------------- Water Coolers ---------------- */

const tap = (x, y) => `
  ${rr(x - 15, y, 30, 36, 10, 'url(#bodyG)', `stroke="${C.line}" stroke-width="2"`)}
  ${rr(x - 9, y - 10, 18, 14, 6, C.shade2)}
  <path d="M${x} ${y + 34} v14 h-10" stroke="${C.shade2}" stroke-width="8" fill="none" stroke-linecap="round"/>
  ${circ(x - 10, y + 56, 6, 'url(#waterG)')}`;

export function wallCooler({ accent = 'blue' } = {}) {
  return wrap(`
    ${ground(320, 424, 152)}
    ${rr(196, 92, 248, 48, 18, C.shade)}
    ${rr(204, 118, 232, 272, 28, 'url(#bodyG)', `stroke="${C.line}" stroke-width="2"`)}
    ${rr(216, 134, 208, 15, 7.5, grad(accent))}
    ${rr(230, 176, 180, 124, 20, 'url(#navyG)')}
    ${rr(240, 186, 160, 104, 15, '#0F2A55')}
    ${tap(282, 212)}${tap(358, 212)}
    ${rr(244, 306, 152, 18, 9, C.shade2)}
    ${[0, 1, 2, 3, 4, 5, 6].map((i) => line(256 + i * 20, 311, 256 + i * 20, 321, C.shade3, 3)).join('')}
    ${circ(234, 344, 6, 'url(#blueG)')}${circ(254, 344, 6, 'url(#greenG)')}${circ(274, 344, 6, C.shade3)}
    ${rr(300, 338, 106, 12, 6, C.shade2)}
    ${rr(240, 366, 160, 10, 5, C.shade3)}
  `);
}

export function bottleCooler({ accent = 'cyan' } = {}) {
  return wrap(`
    ${ground(320, 430, 154)}
    ${rr(212, 158, 216, 252, 26, 'url(#bodyG)', `stroke="${C.line}" stroke-width="2"`)}
    ${rr(248, 148, 144, 44, 16, C.shade2)}
    ${rr(224, 176, 192, 15, 7.5, grad(accent))}
    ${rr(238, 214, 164, 108, 18, 'url(#navyG)')}
    ${rr(248, 224, 144, 88, 14, '#0F2A55')}
    ${tap(286, 244)}${tap(354, 244)}
    ${rr(252, 330, 136, 16, 8, C.shade2)}
    ${circ(240, 366, 6, 'url(#blueG)')}${circ(260, 366, 6, 'url(#greenG)')}
    ${rr(300, 360, 106, 10, 5, C.shade3)}
    ${rr(224, 400, 192, 18, 9, C.shade2)}
    ${rr(302, 60, 36, 34, 9, 'url(#glassG)', `stroke="#93C5FD" stroke-width="2"`)}
    ${rr(278, 92, 84, 76, 20, 'url(#glassG)', `stroke="#93C5FD" stroke-width="2"`)}
    ${rr(283, 124, 74, 40, 16, 'url(#waterG)')}
    ${rr(296, 46, 48, 18, 8, 'url(#blueG)')}
    <path d="M300 66 h40" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" opacity="0.7"/>
  `);
}

/* ---------------- Deep Freezers ---------------- */

export function glassTopFreezer({ accent = 'cyan', label = '-18°C' } = {}) {
  const packs = [
    [144, 'url(#blueG)'], [214, 'url(#violetG)'], [284, C.amber], [354, 'url(#greenG)'], [424, C.rose]
  ].map(([x, f]) => rr(x, 216, 56, 30, 7, f, 'opacity="0.9"')).join('');
  return wrap(`
    ${ground(320, 414, 234)}
    ${rr(104, 236, 432, 152, 22, 'url(#bodyG)', `stroke="${C.line}" stroke-width="2"`)}
    ${rr(116, 196, 408, 58, 18, 'url(#glassG)', `stroke="#93C5FD" stroke-width="3"`)}
    ${packs}
    ${rr(274, 190, 92, 14, 7, C.shade2)}
    ${rr(116, 274, 408, 14, 7, grad(accent))}
    ${circ(496, 336, 32, 'url(#navyG)')}${snow(496, 336, 16, C.cyan, 3.5)}
    ${pill(140, 312, Math.round(label.length * 11.5) + 44, 36, label)}
    ${rr(140, 362, 176, 10, 5, C.shade3)}
    ${circ(164, 398, 15, C.shade2, `stroke="${C.line}" stroke-width="2"`)}${circ(164, 398, 5, C.shade3)}
    ${circ(476, 398, 15, C.shade2, `stroke="${C.line}" stroke-width="2"`)}${circ(476, 398, 5, C.shade3)}
  `);
}

export function uprightFreezer({ accent = 'blue', label = 'DISPLAY FREEZER' } = {}) {
  const colors = [C.rose, C.amber, 'url(#greenG)', 'url(#blueG)', 'url(#violetG)', C.cyan, C.amber, C.rose, 'url(#greenG)'];
  let idx = 0;
  const shelves = [0, 1, 2].map((r) => {
    const y = 148 + r * 78;
    const items = [0, 1, 2, 3].map((c) => rr(232 + c * 46, y, 36, 44, 6, colors[idx++ % colors.length], 'opacity="0.92"')).join('');
    return `${line(224, y + 54, 416, y + 54, '#FFFFFF', 5, 'opacity="0.9"')}${items}`;
  }).join('');
  return wrap(`
    ${ground(320, 440, 162)}
    ${rr(198, 60, 244, 356, 24, 'url(#bodyG)', `stroke="${C.line}" stroke-width="2"`)}
    ${pill(212, 74, 216, 34, label, grad(accent), C.white, 14)}
    ${rr(214, 120, 212, 244, 16, 'url(#glassG)', `stroke="#93C5FD" stroke-width="3"`)}
    ${shelves}
    ${rr(220, 128, 9, 228, 4.5, '#EFF6FF', 'opacity="0.95"')}
    ${rr(408, 154, 10, 152, 5, C.shade2)}
    ${slats(222, 378, 196, 4, 10, 5)}
    ${rr(214, 410, 44, 16, 8, C.shade2)}${rr(382, 410, 44, 16, 8, C.shade2)}
  `);
}

/* ---------------- Air Purifiers ---------------- */

export function towerPurifier({ accent = 'violet', label = 'HEPA' } = {}) {
  const rings = [74, 58, 42, 26].map((r) => circ(320, 300, r, 'none', `stroke="${C.line}" stroke-width="3"`)).join('');
  const spokes = Array.from({ length: 12 }, (_, i) => {
    const a = (Math.PI / 6) * i;
    return line(320 + Math.cos(a) * 20, 300 + Math.sin(a) * 20, 320 + Math.cos(a) * 74, 300 + Math.sin(a) * 74, C.line, 2.5);
  }).join('');
  return wrap(`
    ${ground(320, 436, 154)}
    ${waves(268, 40, 104, 2)}
    ${rr(236, 78, 168, 330, 56, 'url(#bodyG)', `stroke="${C.line}" stroke-width="2"`)}
    ${rr(268, 104, 104, 56, 18, 'url(#navyG)')}
    ${circ(292, 132, 11, 'url(#cyanG)')}${txt('AQI', { x: 336, y: 138, size: 15, fill: C.cyan, weight: 800 })}
    ${rr(276, 178, 88, 12, 6, grad(accent))}
    ${pill(282, 206, 76, 30, label, 'url(#navyG)', C.cyan, 13)}
    ${circ(320, 302, 76, C.shade)}${rings}${spokes}${circ(320, 302, 14, 'url(#navyG)')}
    ${rr(266, 404, 108, 18, 9, C.shade2)}
  `);
}

export function boxPurifier({ accent = 'cyan', label = 'TRUE HEPA' } = {}) {
  return wrap(`
    ${ground(320, 412, 196)}
    ${waves(262, 84, 116, 2)}
    ${rr(176, 128, 288, 250, 32, 'url(#bodyG)', `stroke="${C.line}" stroke-width="2"`)}
    ${rr(294, 152, 76, 48, 14, 'url(#navyG)')}
    ${txt('AQI', { x: 332, y: 174, size: 13, fill: C.sky, weight: 700 })}
    ${txt('32', { x: 332, y: 194, size: 19, fill: C.cyan, weight: 800 })}
    ${rr(198, 214, 244, 13, 6.5, grad(accent))}
    ${rr(198, 240, 244, 112, 20, C.shade)}${rr(198, 240, 244, 112, 20, 'url(#mesh)')}
    ${pill(240, 346, 160, 30, label, 'url(#navyG)', C.white, 13)}
    ${rr(206, 378, 54, 18, 9, C.shade2)}${rr(380, 378, 54, 18, 9, C.shade2)}
    ${airArrow(104, 200, 52, 'right')}${airArrow(104, 260, 52, 'right')}
    ${airArrow(486, 200, 52, 'right')}${airArrow(486, 260, 52, 'right')}
  `);
}

/* ---------------- Water Purifiers ---------------- */

export function wallRO({ accent = 'blue' } = {}) {
  return wrap(`
    ${ground(320, 418, 148)}
    ${rr(214, 96, 212, 248, 30, 'url(#bodyG)', `stroke="${C.line}" stroke-width="2"`)}
    ${rr(238, 118, 164, 98, 18, 'url(#glassG)', `stroke="#93C5FD" stroke-width="3"`)}
    ${rr(246, 168, 148, 40, 12, 'url(#waterG)')}
    ${circ(320, 168, 74, '#7DD3FC', 'opacity="0.0"')}
    ${rr(246, 164, 148, 9, 4.5, '#BAE6FD')}
    ${pill(240, 234, 74, 32, 'RO', 'url(#blueG)', C.white, 15)}
    ${pill(326, 234, 74, 32, 'UV', 'url(#violetG)', C.white, 15)}
    ${circ(248, 290, 6, 'url(#greenG)')}${circ(268, 290, 6, 'url(#cyanG)')}
    ${rr(296, 284, 96, 12, 6, C.shade2)}
    ${rr(240, 316, 160, 10, 5, grad(accent))}
    ${rr(296, 336, 48, 42, 13, C.shade2, `stroke="${C.line}" stroke-width="2"`)}
    ${rr(310, 378, 20, 16, 6, C.shade3)}
    ${circ(320, 404, 9, 'url(#waterG)')}
  `);
}

export function roSystem({ accent = 'cyan' } = {}) {
  const housing = (x, band, capLabel) => `
    ${rr(x - 8, 150, 80, 26, 11, C.shade2, `stroke="${C.line}" stroke-width="2"`)}
    ${rr(x, 172, 64, 214, 30, 'url(#bodyG)', `stroke="${C.line}" stroke-width="2"`)}
    ${rr(x + 8, 212, 48, 12, 6, band)}
    ${txt(capLabel, { x: x + 32, y: 366, size: 11, fill: C.navy2, weight: 800, ls: 0.6 })}`;
  return wrap(`
    ${ground(330, 434, 246)}
    <path d="M86 300 V386 a64 18 0 0 0 128 0 V300 Z" fill="url(#bodyG)" stroke="${C.line}" stroke-width="2"/>
    ${circ(150, 300, 64, 'url(#topG)', `stroke="${C.line}" stroke-width="2"`)}
    ${rr(126, 284, 48, 18, 9, C.shade2)}
    ${pill(104, 330, 92, 32, '12 L', 'url(#navyG)', C.white, 14)}
    <path d="M152 288 C 214 280 262 150 322 150" stroke="${C.sky}" stroke-width="8" fill="none" stroke-linecap="round"/>
    <path d="M322 146 C 352 106 382 106 410 146" stroke="${C.shade3}" stroke-width="8" fill="none" stroke-linecap="round"/>
    <path d="M410 146 C 440 106 470 106 498 146" stroke="${C.shade3}" stroke-width="8" fill="none" stroke-linecap="round"/>
    ${housing(290, grad(accent), 'SEDIMENT')}
    ${housing(378, 'url(#blueG)', 'CARBON')}
    ${housing(466, 'url(#violetG)', 'MEMBRANE')}
    ${rr(276, 392, 284, 16, 8, C.shade2)}
    ${rr(288, 406, 34, 14, 7, C.shade3)}${rr(514, 406, 34, 14, 7, C.shade3)}
    ${pill(86, 62, Math.round('RO SYSTEM'.length * 11) + 44, 36, 'RO SYSTEM')}
  `);
}

/* ---------------- Cold Rooms ---------------- */

export function coldRoom({ accent = 'blue', label = 'COLD ROOM' } = {}) {
  const seams = [0, 1, 2, 3, 4].map((i) => line(204 + i * 48, 142, 204 + i * 48, 386, C.line, 2, 'opacity="0.7"')).join('');
  return wrap(`
    ${ground(320, 434, 236)}
    <path d="M156 140 L214 88 L510 88 L452 140 Z" fill="url(#topG)" stroke="${C.line}" stroke-width="2.5"/>
    <path d="M452 140 L510 88 L510 336 L452 388 Z" fill="${C.shade2}" stroke="${C.line}" stroke-width="2.5"/>
    ${rr(156, 140, 296, 248, 8, 'url(#bodyG)', `stroke="${C.line}" stroke-width="2.5"`)}
    ${seams}
    ${rr(236, 188, 160, 176, 12, C.shade, `stroke="${C.line}" stroke-width="2.5"`)}
    ${rr(376, 232, 12, 88, 6, C.shade2)}
    ${rr(240, 214, 12, 28, 5, C.shade3)}${rr(240, 320, 12, 28, 5, C.shade3)}
    ${rr(398, 162, 48, 44, 11, 'url(#navyG)')}
    ${txt('4°C', { x: 422, y: 190, size: 15, fill: C.cyan, weight: 800 })}
    ${snow(332, 114, 21, C.cyan, 4)}
    ${rr(156, 374, 296, 14, 7, grad(accent))}
    ${[0, 1, 2].map((i) => line(462, 200 + i * 26, 500, 176 + i * 26, C.shade3, 4)).join('')}
    ${label ? pill(148, 44, Math.round(label.length * 11) + 44, 36, label) : ''}
  `);
}

export function freezerRoom({ accent = 'cyan', label = 'FREEZER ROOM' } = {}) {
  const icicles = Array.from({ length: 7 }, (_, i) => {
    const x = 244 + i * 24;
    return `<path d="M${x} 186 l7 ${14 + (i % 3) * 7} l7 -${14 + (i % 2) * 6} Z" fill="#DBEAFE"/>`;
  }).join('');
  return wrap(`
    ${ground(320, 438, 240)}
    <path d="M156 140 L214 88 L510 88 L452 140 Z" fill="url(#topG)" stroke="${C.line}" stroke-width="2.5"/>
    <path d="M452 140 L510 88 L510 336 L452 388 Z" fill="${C.shade2}" stroke="${C.line}" stroke-width="2.5"/>
    ${rr(156, 140, 296, 248, 8, 'url(#bodyG)', `stroke="${C.line}" stroke-width="2.5"`)}
    ${rr(300, 54, 124, 42, 11, C.shade2, `stroke="${C.line}" stroke-width="2"`)}
    ${grille(334, 75, 14, C.navy2)}${slats(364, 64, 50, 3, 9, 5)}
    <path d="M424 74 C 452 74 464 96 470 116" stroke="${C.sky}" stroke-width="9" fill="none" stroke-linecap="round"/>
    ${rr(176, 186, 132, 178, 12, C.shade, `stroke="${C.line}" stroke-width="2.5"`)}
    ${rr(316, 186, 132, 178, 12, C.shade, `stroke="${C.line}" stroke-width="2.5"`)}
    ${rr(292, 232, 11, 86, 5.5, C.shade2)}${rr(321, 232, 11, 86, 5.5, C.shade2)}
    ${icicles}
    ${rr(176, 150, 68, 32, 9, 'url(#navyG)')}
    ${txt('-18°C', { x: 210, y: 172, size: 14, fill: C.cyan, weight: 800 })}
    ${circ(382, 276, 30, '#FFFFFF', 'opacity="0.9"')}${snow(382, 276, 17, C.cyan, 3.5)}
    <path d="M156 388 C 214 366 262 394 322 382 C 382 370 430 392 452 384 L452 400 L156 400 Z" fill="#EFF6FF"/>
    ${label ? pill(156, 44, Math.round(label.length * 11) + 44, 36, label) : ''}
  `);
}

/* ---------------- AMC / Rental / Projects ---------------- */

export function amcService({ accent = 'blue', mode = 'checklist', label = 'AMC' } = {}) {
  const ac = `
    ${rr(92, 96, 274, 98, 24, 'url(#bodyG)', `stroke="${C.line}" stroke-width="2"`)}
    ${rr(108, 112, 84, 12, 6, grad(accent))}
    ${rr(318, 116, 38, 20, 7, 'url(#navyG)')}${rr(325, 122, 24, 5, 2.5, C.cyan)}
    ${rr(102, 158, 254, 16, 8, C.shade2)}
    ${rr(102, 170, 254, 9, 4.5, grad(accent))}
    ${waves(140, 234, 180, 3)}`;
  const board = `
    ${rr(396, 118, 154, 196, 18, 'url(#bodyG)', `stroke="${C.line}" stroke-width="2"`)}
    ${rr(440, 104, 66, 28, 11, C.shade2, `stroke="${C.line}" stroke-width="2"`)}
    ${[0, 1, 2, 3].map((i) => {
      const y = 156 + i * 40;
      const done = i < 3;
      return `${rr(414, y, 26, 26, 7, done ? 'url(#greenG)' : C.shade3)}
        ${done ? `<path d="M${420} ${y + 13} l6 7 l12 -14" stroke="#FFFFFF" stroke-width="4.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` : ''}
        ${rr(452, y + 8, 82, 10, 5, C.shade3)}`;
    }).join('')}`;
  const shield = `
    <path d="M474 108 L562 146 V234 C562 288 516 324 474 342 C432 324 386 288 386 234 V146 Z" fill="url(#navyG)" stroke="${C.navy3}" stroke-width="3"/>
    <path d="M430 232 L462 264 L522 196" stroke="${C.cyan}" stroke-width="15" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    ${gear(416, 322, 44, 'url(#cyanG)')}`;
  const right = mode === 'shield' ? shield : board;
  const extra = mode === 'shield' ? '' : gear(150, 330, 46, 'url(#blueG)');
  return wrap(`
    ${ground(330, 434, 232)}
    ${ac}
    ${right}
    ${extra}
    ${pill(92, 44, Math.round(label.length * 11) + 44, 36, label)}
  `);
}

export function rentalUnit({ accent = 'violet', base = 'split', label = 'ON RENT' } = {}) {
  const product =
    base === 'split'
      ? `${rr(96, 158, 336, 124, 30, 'url(#bodyG)', `stroke="${C.line}" stroke-width="2"`)}
         ${rr(116, 176, 96, 14, 7, grad(accent))}
         ${rr(356, 182, 50, 24, 9, 'url(#navyG)')}${rr(364, 189, 34, 6, 3, C.cyan)}
         ${rr(110, 236, 308, 18, 9, C.shade2)}
         ${rr(110, 250, 308, 10, 5, grad(accent))}
         ${waves(150, 308, 210, 3)}
         ${ground(264, 402, 196)}`
      : `${rr(226, 78, 168, 332, 38, 'url(#bodyG)', `stroke="${C.line}" stroke-width="2"`)}
         ${rr(252, 96, 116, 30, 15, C.shade2)}${rr(262, 104, 96, 12, 6, grad(accent))}
         ${rr(240, 150, 140, 218, 20, C.shade)}
         ${[0, 1, 2, 3, 4].map((i) => line(258 + i * 26, 168, 258 + i * 26, 352, C.line, 3)).join('')}
         ${rr(258, 380, 104, 18, 9, C.shade2)}
         ${waves(416, 190, 96, 3)}
         ${ground(310, 430, 156)}`;
  const tag = `
    <g transform="rotate(-13 566 124)">
      <path d="M520 74 H606 a16 16 0 0 1 16 16 V158 a16 16 0 0 1 -16 16 H520 L462 117 Z" fill="${'url(#violetG)'}" stroke="${C.purple}" stroke-width="3"/>
      ${circ(512, 117, 12, '#FFFFFF')}
      ${txt('RENT', { x: 566, y: 112, size: 26, fill: C.white, weight: 800, ls: 1.5 })}
      ${txt('per month', { x: 566, y: 140, size: 14, fill: '#EDE9FE', weight: 600 })}
    </g>
    <path d="M476 128 C 440 150 430 168 424 182" stroke="${C.shade3}" stroke-width="5" fill="none" stroke-dasharray="10 8" stroke-linecap="round"/>`;
  return wrap(`
    ${product}
    ${tag}
    ${label ? pill(96, 44, Math.round(label.length * 11) + 44, 36, label) : ''}
  `);
}

export function hvacProject({ accent = 'blue', label = 'TURNKEY HVAC' } = {}) {
  let wins = '';
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      const x = 250 + c * 42;
      const y = 172 + r * 44;
      const f = (r * 5 + c) % 7 === 0 ? 'url(#cyanG)' : 'url(#navyG)';
      wins += rr(x, y, 30, 26, 5, f, 'opacity="0.9"');
    }
  }
  let side = '';
  for (let r = 0; r < 3; r++) for (let c = 0; c < 2; c++) side += rr(158 + c * 40, 292 + r * 42, 28, 24, 5, 'url(#navyG)', 'opacity="0.85"');
  return wrap(`
    ${ground(330, 430, 250)}
    ${rr(140, 270, 92, 150, 8, C.shade, `stroke="${C.line}" stroke-width="2"`)}
    ${side}
    ${rr(230, 142, 230, 278, 10, 'url(#bodyG)', `stroke="${C.line}" stroke-width="2"`)}
    ${wins}
    ${rr(222, 128, 246, 18, 9, C.shade2, `stroke="${C.line}" stroke-width="2"`)}
    ${rr(256, 84, 128, 46, 11, C.shade2, `stroke="${C.line}" stroke-width="2"`)}
    ${grille(294, 107, 16, C.navy2)}${slats(326, 92, 48, 3, 10, 6)}
    ${rr(372, 62, 26, 26, 7, C.shade3)}
    <path d="M256 104 H206 V166" stroke="${C.shade3}" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    ${airArrow(206, 176, 40, 'down')}
    ${airArrow(482, 208, 56, 'right')}${airArrow(482, 268, 56, 'right')}
    ${rr(316, 336, 60, 84, 6, C.shade2, `stroke="${C.line}" stroke-width="2"`)}
    ${line(346, 336, 346, 420, C.line, 3)}
    ${label ? pill(140, 50, Math.round(label.length * 11) + 44, 36, label) : ''}
  `);
}

export function industrialProject({ accent = 'cyan', label = 'TURNKEY PROJECTS' } = {}) {
  const teeth = [120, 206, 292, 378]
    .map((x) => `<path d="M${x} 238 L${x + 64} 190 L${x + 64} 238 Z" fill="url(#topG)" stroke="${C.line}" stroke-width="2.5"/>`)
    .join('');
  const wins = [0, 1, 2, 3, 4]
    .map((i) => rr(146 + i * 62, 268, 44, 34, 6, i % 4 === 1 ? 'url(#cyanG)' : 'url(#navyG)', 'opacity="0.9"'))
    .join('');
  return wrap(`
    ${ground(320, 430, 250)}
    ${teeth}
    ${rr(120, 236, 340, 168, 10, 'url(#bodyG)', `stroke="${C.line}" stroke-width="2.5"`)}
    ${wins}
    ${rr(300, 322, 92, 82, 6, C.shade2, `stroke="${C.line}" stroke-width="2"`)}
    ${line(346, 322, 346, 404, C.line, 3)}
    ${rr(424, 148, 28, 58, 7, C.shade2, `stroke="${C.line}" stroke-width="2"`)}
    ${rr(120, 394, 340, 12, 6, grad(accent))}
    ${rr(486, 300, 114, 96, 16, C.shade2, `stroke="${C.line}" stroke-width="2"`)}
    ${grille(516, 348, 24, C.navy2)}${grille(572, 348, 24, C.navy2)}
    ${rr(496, 310, 94, 8, 4, grad(accent))}
    <path d="M460 330 H486" stroke="${C.sky}" stroke-width="11" fill="none" stroke-linecap="round"/>
    <path d="M460 366 H486" stroke="${C.shade3}" stroke-width="11" fill="none" stroke-linecap="round"/>
    ${line(543, 296, 543, 276, C.sky, 9)}
    ${circ(543, 246, 34, 'url(#navyG)')}${snow(543, 246, 17, C.cyan, 3.5)}
    ${label ? pill(120, 52, Math.round(label.length * 11) + 44, 36, label) : ''}
  `);
}
