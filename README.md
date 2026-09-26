# Mangal Enterprises — Digital Product Catalog

Premium, mobile-friendly digital showroom for AC, refrigeration and cooling
solutions. Static website — no build step, no backend required. Open
`index.html` directly or serve it with `npm run serve`.

## Quick start

```bash
npm run build    # regenerate placeholder art + all PDF downloads
npm run serve    # http://localhost:8080
```

## Business details (phone, WhatsApp, address)

Edit `js/data.js` → `SITE`:

| Field        | Used for                                              |
| ------------ | ----------------------------------------------------- |
| `whatsapp`   | Floating button + all "Send on WhatsApp" links        |
| `phoneDial` / `phoneDisplay` | All call buttons                       |
| `email`      | Contact links + "Send via Email"                      |
| `address`, `mapsUrl` | Contact section, footer, Get Directions        |
| `endpoint`   | Optional: POST every enquiry somewhere (see below)    |

## Add / edit a product

1. Open `js/data.js` → `PRODUCTS` and copy any product block.
2. Give it a unique `slug` (lowercase, dashes only).
3. Set `image` to your photo, e.g. `assets/img/products/my-ac.png`
   (PNG/JPG/WebP all work — images are shown fully with `object-fit: contain`,
   so they are never cropped). The existing `.svg` files are placeholders.
4. Set `pdf` to `downloads/products/<slug>.pdf`.
5. Run `npm run build` — this regenerates all product-sheet PDFs
   (including your new one) from the data file.

Products in the same category share a category id from `CATEGORIES`.
Tags (`Buy` / `Rent` / `AMC` / `Project`) drive the card badge colours.

Art for placeholders is defined per template in `tools/svg-templates.mjs`
and mapped from `art` / `artOpts` on each product.

## Add a client logo

1. Drop the logo file (SVG/PNG, transparent background ideal) into
   `assets/img/clients/`, e.g. `acme.svg`.
2. Add an entry to `CLIENTS` in `js/data.js`:

   ```js
   { id: 'acme', name: 'Acme Industries Ltd.', line1: 'Acme',
     line2: 'Industries', tagline: 'Manufacturing', initials: 'AI',
     shape: 'squircle', colors: ['#1D4ED8', '#22D3EE'],
     logo: 'assets/img/clients/acme.svg' }
   ```

   (`line1/line2/tagline/initials/shape/colors` are only used by the
   placeholder-logo generator — real image files ignore them.)

Logos are rendered fully with `object-fit: contain` — never cropped.

## Add a service

Add an entry to `SERVICES` in `js/data.js` with one of the built-in icon
keys: `install, repair, maintenance, amc, vrf, refrigeration, coldroom,
rental, preventive, turnkey`.

## How the enquiry flow works

There is no server, so forms work like this (exactly as requested):

1. Customer fills the form → client-side validation (10-digit mobile etc.).
2. A success panel appears with a reference id (`ME-ENQ-XXXX` / `ME-MT-XXXX`).
3. "Send on WhatsApp" opens `wa.me/<number>` with the whole enquiry
   pre-filled — one tap to reach your sales desk. "Send via Email" opens a
   pre-filled email instead.
4. Every submission is also saved in the browser (`localStorage → me_leads`).

To also POST submissions to your own server / Google Sheet / CRM, set
`SITE.endpoint = 'https://your-api.example.com/leads'` in `js/data.js`
(`postToEndpoint()` in `js/app.js` handles the rest, fire-and-forget).

## Downloads

- Full catalog: `downloads/mangal-enterprises-product-catalog.pdf`
- Per product: `downloads/products/<slug>.pdf`

Buttons link to these files with the `download` attribute — real files,
not dummy buttons. Re-run `npm run pdfs` after editing product data.

## Project layout

```
index.html                  all sections + enquiry/product modals
css/styles.css              design system (navy/cyan palette, responsive)
js/data.js                  ★ edit business, products, services, clients here
js/app.js                   rendering, filters, modal, forms, carousel
assets/img/products/        product images (SVG placeholders → replace with photos)
assets/img/clients/         client logos (SVG placeholders → replace)
downloads/                  real PDF files for every download button
tools/generate-assets.mjs   placeholder art + logo generator
tools/generate-pdfs.mjs     catalog + product-sheet PDF generator
tools/serve.mjs             tiny static server for local testing
```
