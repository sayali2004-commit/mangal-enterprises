/* Generates real, downloadable PDFs:
     downloads/mangal-enterprises-product-catalog.pdf
     downloads/products/<product-slug>.pdf
   Pure Node.js — no dependencies. */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = readFileSync(path.join(root, 'js', 'data.js'), 'utf8');
const { SITE, CATEGORIES, PRODUCTS, SERVICES } = new Function(
  `${src}\nreturn { SITE, CATEGORIES, PRODUCTS, SERVICES };`
)();

/* ---------------- text encoding (WinAnsi) ---------------- */
const EXTRA = { 0x2013: 0x96, 0x2014: 0x97, 0x2018: 0x92, 0x2019: 0x92, 0x201c: 0x93, 0x201d: 0x94, 0x2022: 0x95, 0x2026: 0x85, 0x2122: 0x99, 0x00b0: 0xb0, 0x00d7: 0xd7 };
function pdfText(s) {
  s = String(s).replace(/₹/g, 'Rs. ');
  let out = '';
  for (const ch of s) {
    if (ch === '(' || ch === ')' || ch === '\\') { out += '\\' + ch; continue; }
    const code = ch.codePointAt(0);
    if (code >= 32 && code < 127) { out += ch; continue; }
    const b = EXTRA[code] !== undefined ? EXTRA[code] : (code < 256 ? code : 0x3f);
    out += '\\' + b.toString(8).padStart(3, '0');
  }
  return out;
}
const est = (t, size, bold) => String(t).length * size * (bold ? 0.52 : 0.5);
function wrap(text, maxW, size, bold) {
  const words = String(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let line = '';
  for (const w of words) {
    const t = line ? line + ' ' + w : w;
    if (est(t, size, bold) > maxW && line) { lines.push(line); line = w; }
    else line = t;
  }
  if (line) lines.push(line);
  return lines;
}

/* ---------------- colors ---------------- */
const NAVY = [0.043, 0.106, 0.239];
const BLUE = [0.149, 0.388, 0.922];
const CYAN = [0.133, 0.827, 0.933];
const INK = [0.09, 0.12, 0.22];
const MUT = [0.42, 0.48, 0.6];
const LIGHT = [0.945, 0.965, 0.995];
const LINE = [0.86, 0.9, 0.96];
const rgb = (c) => `${c[0].toFixed(3)} ${c[1].toFixed(3)} ${c[2].toFixed(3)}`;

/* ---------------- page builder (top-based coords) ---------------- */
const W = 595, H = 842, M = 48;
function newPage() { return { ops: [], y: H - M, plain: false }; }

function rect(pg, x, yTop, w, h, color) {
  pg.ops.push(`${rgb(color)} rg ${x.toFixed(1)} ${(H - yTop - h).toFixed(1)} ${w.toFixed(1)} ${h.toFixed(1)} re f`);
}
function text(pg, x, yTop, str, size, font, color, align) {
  const f = font === 'bold' ? 'F2' : font === 'oblique' ? 'F3' : 'F1';
  let sx = x;
  if (align === 'center') sx = x - est(str, size, font === 'bold') / 2;
  if (align === 'right') sx = x - est(str, size, font === 'bold');
  pg.ops.push(`${rgb(color)} rg BT /${f} ${size} Tf ${sx.toFixed(1)} ${(H - yTop).toFixed(1)} Td (${pdfText(str)}) Tj ET`);
}
function hline(pg, x1, x2, yTop, color, w) {
  pg.ops.push(`${rgb(color)} RG ${(w || 1).toFixed(1)} w ${x1.toFixed(1)} ${(H - yTop).toFixed(1)} m ${x2.toFixed(1)} ${(H - yTop).toFixed(1)} l S`);
}
function para(pg, str, x, maxW, size, leading, color, font) {
  const lines = wrap(str, maxW, size, font === 'bold');
  for (const ln of lines) { text(pg, x, pg.y, ln, size, font || 'regular', color || INK); pg.y += leading; }
  return lines.length;
}
function need(pg, h, doc) {
  if (pg.y + h > H - M) { finishPageHeader(doc, pg); const n = newPage(); doc.push(n); return n; }
  return pg;
}
function finishPageHeader() { /* headers drawn inline per page */ }
function pageHeader(pg) {
  rect(pg, 0, 0, W, 46, NAVY);
  rect(pg, 0, 46, W, 3, CYAN);
  text(pg, M, 31, SITE.name + '  —  Product Catalog', 11, 'bold', [1, 1, 1]);
}
function pageFooter(pg, i, n) {
  hline(pg, M, W - M, H - 44, LINE, 1);
  text(pg, W / 2, H - 30, `Page ${i + 1} of ${n}  •  ${SITE.phoneDisplay}  •  ${SITE.email}`, 8, 'regular', MUT, 'center');
}

/* ---------------- catalog cover ---------------- */
function buildCatalog() {
  const doc = [];
  const cover = newPage(); cover.plain = true; doc.push(cover);
  rect(cover, 0, 0, W, H, NAVY);
  rect(cover, -140, 560, 420, 420, [0.07, 0.16, 0.38]);
  rect(cover, W - 200, -120, 380, 380, [0.05, 0.2, 0.35]);
  text(cover, W / 2, 300, SITE.name, 36, 'bold', [1, 1, 1], 'center');
  text(cover, W / 2, 336, SITE.tagline, 14, 'regular', [0.62, 0.9, 0.96], 'center');
  hline(cover, W / 2 - 130, W / 2 + 130, 366, CYAN, 3);
  text(cover, W / 2, 402, 'PRODUCT CATALOG', 22, 'bold', [1, 1, 1], 'center');
  text(cover, W / 2, 432, '2026 Edition', 12, 'oblique', [0.75, 0.82, 0.92], 'center');
  cover.y = 470;
  const sup = wrap(SITE.supportLine, W - 2 * M - 60, 11, false);
  for (const ln of sup) text(cover, W / 2, cover.y, ln, 11, 'regular', [0.82, 0.88, 0.97], 'center'), cover.y += 18;
  cover.y += 40;
  const contact = [SITE.address, `Phone: ${SITE.phoneDisplay}   •   Email: ${SITE.email}`, `Hours: ${SITE.hours}   •   GSTIN: ${SITE.gst}`, `WhatsApp: +${SITE.whatsapp}`];
  for (const ln of contact) text(cover, W / 2, cover.y, ln, 10.5, 'regular', [0.75, 0.82, 0.92], 'center'), cover.y += 20;
  cover.y += 30;
  text(cover, W / 2, cover.y, 'Scan, call or WhatsApp us to enquire about any product.', 10.5, 'oblique', CYAN, 'center');

  /* category sections */
  for (const cat of CATEGORIES) {
    const list = PRODUCTS.filter((p) => p.category === cat.id);
    if (!list.length) continue;
    let pg = doc[doc.length - 1];
    if (pg.y > 200 && pg !== cover) { /* continue on same page */ }
    else { pg = newPage(); doc.push(pg); }
    pg = newPage(); doc.push(pg); pageHeader(pg);
    pg.y += 18;
    rect(pg, 0, pg.y, W, 46, NAVY);
    rect(pg, 0, pg.y, 6, 46, CYAN);
    text(pg, M, pg.y + 30, cat.name, 16, 'bold', [1, 1, 1]);
    pg.y += 58;

    for (const p of list) {
      // estimate block height
      const descLines = wrap(p.short, W - 2 * M, 10, false).length;
      const featLines = p.features.reduce((a, f) => a + wrap('\u2022  ' + f, W - 2 * M - 14, 10, false).length, 0);
      const specLines = p.specs.reduce((a, s) => a + wrap(`${s.k}: ${s.v}`, W - 2 * M - 14, 9.5, false).length, 0);
      const appLines = wrap('Best for: ' + p.applications.join(', '), W - 2 * M, 10, false).length;
      const blockH = 20 + 14 + descLines * 14 + 8 + 18 + featLines * 14 + 6 + 18 + specLines * 13 + 6 + appLines * 14 + 26;
      if (pg.y + blockH > H - M) { pg = newPage(); doc.push(pg); pageHeader(pg); pg.y += 14; }

      text(pg, M, pg.y, p.name, 13, 'bold', NAVY); pg.y += 20;
      text(pg, M, pg.y, `${p.tag}   •   ${p.price || 'Price on request'}`, 9.5, 'regular', BLUE); pg.y += 15;
      para(pg, p.short, M, W - 2 * M, 10, 14, INK); pg.y += 6;
      text(pg, M, pg.y, 'Key Features', 10.5, 'bold', NAVY); pg.y += 17;
      for (const f of p.features) {
        const ls = wrap('\u2022  ' + f, W - 2 * M - 14, 10, false);
        for (const ln of ls) { text(pg, M + 14, pg.y, ln, 10, 'regular', INK); pg.y += 14; }
      }
      pg.y += 5;
      text(pg, M, pg.y, 'Specifications', 10.5, 'bold', NAVY); pg.y += 17;
      for (const s of p.specs) {
        const ls = wrap(`${s.k}: ${s.v}`, W - 2 * M - 14, 9.5, false);
        for (const ln of ls) { text(pg, M + 14, pg.y, ln, 9.5, 'regular', MUT); pg.y += 13; }
      }
      pg.y += 5;
      para(pg, 'Best for: ' + p.applications.join(', '), M, W - 2 * M, 10, 14, INK);
      pg.y += 6;
      hline(pg, M, W - M, pg.y, LINE, 1);
      pg.y += 16;
    }
  }

  /* services page */
  let pg = newPage(); doc.push(pg); pageHeader(pg); pg.y += 18;
  rect(pg, 0, pg.y, W, 46, NAVY);
  rect(pg, 0, pg.y, 6, 46, CYAN);
  text(pg, M, pg.y + 30, 'Our Services', 16, 'bold', [1, 1, 1]);
  pg.y += 60;
  for (const s of SERVICES) {
    if (pg.y + 44 > H - M) { pg = newPage(); doc.push(pg); pageHeader(pg); pg.y += 14; }
    text(pg, M, pg.y, '\u2022  ' + s.name, 11, 'bold', NAVY); pg.y += 16;
    para(pg, s.desc, M + 14, W - 2 * M - 14, 10, 14, INK); pg.y += 6;
  }

  /* enquiry page */
  pg = newPage(); doc.push(pg); pageHeader(pg); pg.y += 18;
  rect(pg, 0, pg.y, W, 46, NAVY);
  rect(pg, 0, pg.y, 6, 46, CYAN);
  text(pg, M, pg.y + 30, 'How to Enquire', 16, 'bold', [1, 1, 1]);
  pg.y += 62;
  const steps = [
    '1.  Note the product name (and quantity) you are interested in.',
    '2.  Call us on ' + SITE.phoneDisplay + ' or WhatsApp us on +' + SITE.whatsapp + '.',
    '3.  Email your requirement to ' + SITE.email + '.',
    '4.  Visit our showroom: ' + SITE.address,
    'Our team responds within 2 working hours (' + SITE.hours + ').'
  ];
  for (const st of steps) {
    const ls = wrap(st, W - 2 * M, 11, false);
    for (const ln of ls) { text(pg, M, pg.y, ln, 11, 'regular', INK); pg.y += 17; }
    pg.y += 6;
  }
  pg.y += 10;
  hline(pg, M, W - M, pg.y, LINE, 1); pg.y += 20;
  text(pg, M, pg.y, 'Thank you for choosing ' + SITE.name + '.', 12, 'bold', NAVY);

  return doc;
}

/* ---------------- single product sheet ---------------- */
function buildProduct(p) {
  const cat = (CATEGORIES.find((c) => c.id === p.category) || {}).name || '';
  const doc = [];
  let pg = newPage(); pg.plain = true; doc.push(pg);
  rect(pg, 0, 0, W, 150, NAVY);
  rect(pg, 0, 150, W, 4, CYAN);
  text(pg, M, 46, SITE.name, 13, 'bold', [0.62, 0.9, 0.96]);
  text(pg, M, 84, p.name, 21, 'bold', [1, 1, 1]);
  text(pg, M, 116, `${cat}   •   ${p.tag}   •   ${p.price || 'Price on request'}`, 11, 'regular', [0.82, 0.88, 0.97]);
  pg.y = 190;
  para(pg, p.description, M, W - 2 * M, 11, 16, INK); pg.y += 10;

  const sections = [
    ['Key Features', p.features, 10.5],
    ['Specifications', p.specs.map((s) => `${s.k}: ${s.v}`), 10],
    ['Applications', p.applications, 10.5]
  ];
  for (const [title, items, size] of sections) {
    const blockH = 24 + items.reduce((a, it) => a + wrap('\u2022  ' + it, W - 2 * M - 14, size, false).length * (size + 4), 0) + 10;
    if (pg.y + blockH > H - M) { pg = newPage(); doc.push(pg); pageHeader(pg); pg.y += 14; }
    rect(pg, M, pg.y - 4, W - 2 * M, 26, LIGHT);
    rect(pg, M, pg.y - 4, 4, 26, CYAN);
    text(pg, M + 14, pg.y + 15, title, 12, 'bold', NAVY);
    pg.y += 32;
    for (const it of items) {
      const ls = wrap('\u2022  ' + it, W - 2 * M - 14, size, false);
      for (const ln of ls) { text(pg, M + 14, pg.y, ln, size, 'regular', INK); pg.y += size + 4.5; }
    }
    pg.y += 10;
  }
  pg.y += 6;
  hline(pg, M, W - M, pg.y, LINE, 1); pg.y += 22;
  text(pg, M, pg.y, 'To buy, rent or know the latest price:', 11, 'bold', NAVY); pg.y += 20;
  const lines = [`Call: ${SITE.phoneDisplay}`, `WhatsApp: +${SITE.whatsapp}`, `Email: ${SITE.email}`, SITE.address];
  for (const ln of lines) { text(pg, M, pg.y, '\u2022  ' + ln, 10.5, 'regular', INK); pg.y += 17; }
  return doc;
}

/* ---------------- serialize ---------------- */
function serialize(doc, title) {
  const objects = [];
  const fonts = [
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>'
  ];
  // page numbers
  const n = doc.length;
  doc.forEach((pg, i) => { if (!pg.plain) pageFooter(pg, i, n); });

  const kids = [];
  doc.forEach((pg) => {
    const stream = pg.ops.join('\n') + '\n';
    const len = Buffer.byteLength(stream, 'latin1');
    const cIdx = objects.length + 6; // objects 1..5 are catalog/pages/fonts → content starts at 6
    const pIdx = cIdx + 1;
    objects.push(`${cIdx} 0 obj\n<< /Length ${len} >>\nstream\n${stream}endstream\nendobj`);
    objects.push(`${pIdx} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} ${H}] /Resources << /Font << /F1 3 0 R /F2 4 0 R /F3 5 0 R >> >> /Contents ${cIdx} 0 R >>\nendobj`);
    kids.push(`${pIdx} 0 R`);
  });

  // NOTE: object numbers above assume content starts at 6; fix by renumbering:
  const header = [
    '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj',
    `2 0 obj\n<< /Type /Pages /Kids [${kids.join(' ')}] /Count ${n} >>\nendobj`,
    '3 0 obj\n' + fonts[0] + '\nendobj',
    '4 0 obj\n' + fonts[1] + '\nendobj',
    '5 0 obj\n' + fonts[2] + '\nendobj'
  ];
  const info = `<< /Title (${pdfText(title)}) /Producer (${pdfText('Mangal Enterprises Catalog Generator')}) /Creator (${pdfText('Mangal Enterprises')}) >>`;

  let out = '%PDF-1.4\n%\xe2\xe3\xcf\xd3\n';
  const offsets = [0];
  const all = header.concat(objects);
  for (const obj of all) {
    offsets.push(Buffer.byteLength(out, 'latin1'));
    out += obj + '\n';
  }
  const xrefAt = Buffer.byteLength(out, 'latin1');
  out += `xref\n0 ${all.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i <= all.length; i++) out += String(offsets[i]).padStart(10, '0') + ' 00000 n \n';
  out += `trailer\n<< /Size ${all.length + 1} /Root 1 0 R /Info ${info} >>\nstartxref\n${xrefAt}\n%%EOF`;
  return out;
}

/* object-number self-check: content objs must be numbered from 6 upward */
function build(outDir, doc, title, filename) {
  let pdf = serialize(doc, title);
  // verify numbering assumption used in serialize()
  const expect = doc.length * 2;
  const re = /(\d+) 0 obj/g;
  const nums = [];
  let m;
  while ((m = re.exec(pdf)) !== null) nums.push(parseInt(m[1], 10));
  const maxDeclared = Math.max(...nums);
  if (maxDeclared !== 5 + expect) {
    throw new Error(`object numbering mismatch (${maxDeclared} vs ${5 + expect})`);
  }
  writeFileSync(path.join(outDir, filename), pdf, 'latin1');
}

/* ---------------- run ---------------- */
const dlDir = path.join(root, 'downloads');
const prodDl = path.join(dlDir, 'products');
mkdirSync(prodDl, { recursive: true });

build(dlDir, buildCatalog(), `${SITE.name} — Product Catalog 2026`, 'mangal-enterprises-product-catalog.pdf');
let count = 0;
for (const p of PRODUCTS) {
  build(prodDl, buildProduct(p), `${p.name} — ${SITE.name}`, `${p.slug}.pdf`);
  count++;
}
console.log(`[pdfs] catalog + ${count} product sheets generated`);
