/* ==========================================================================
   Mangal Enterprises — App (part 1: helpers, site bindings, catalog)
   ========================================================================== */
(function () {
  'use strict';

  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));

  const esc = (s) =>
    String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const waLink = (msg) => 'https://wa.me/' + SITE.whatsapp + '?text=' + encodeURIComponent(msg);

  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const ICONS = {
    install: '<path d="M12 3v10m0 0l-4-4m4 4l4-4M4 15v3.5A2.5 2.5 0 0 0 6.5 21h11a2.5 2.5 0 0 0 2.5-2.5V15" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
    repair: '<path d="M14.7 6.3a4.5 4.5 0 0 0-6 6L3 18l3 3 5.7-5.7a4.5 4.5 0 0 0 6-6L14 13l-3-3 3.7-3.7z" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
    maintenance: '<circle cx="12" cy="12" r="3.4" fill="none" stroke="#fff" stroke-width="1.8"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.2 5.2l2.1 2.1M16.7 16.7l2.1 2.1M18.8 5.2l-2.1 2.1M7.3 16.7l-2.1 2.1" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>',
    amc: '<path d="M12 3l7 3v5c0 4.4-3 8.3-7 10-4-1.7-7-5.6-7-10V6z" fill="none" stroke="#fff" stroke-width="1.8" stroke-linejoin="round"/><path d="M9 12l2 2 4-4" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
    vrf: '<path d="M4 21V8l8-4.5L20 8v13M4 21h16M9.5 21v-4.5h5V21" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.5 11h1M13.5 11h1" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>',
    refrigeration: '<path d="M12 3v18M5.6 7.5l12.8 9M18.4 7.5l-12.8 9" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>',
    coldroom: '<path d="M3.5 8L12 3.5 20.5 8v8L12 20.5 3.5 16z" fill="none" stroke="#fff" stroke-width="1.8" stroke-linejoin="round"/><path d="M3.5 8L12 12.5 20.5 8M12 12.5V20" fill="none" stroke="#fff" stroke-width="1.8" stroke-linejoin="round"/>',
    rental: '<path d="M3.5 12.5V5.5a1.5 1.5 0 0 1 1.5-1.5h7l8.5 8.5-9 9z" fill="none" stroke="#fff" stroke-width="1.8" stroke-linejoin="round"/><circle cx="9" cy="9" r="1.7" fill="#fff"/>',
    preventive: '<rect x="4" y="5.5" width="16" height="14.5" rx="2.5" fill="none" stroke="#fff" stroke-width="1.8"/><path d="M4 10.5h16M8.5 3v4M15.5 3v4M9.5 15l1.8 1.8 3.4-3.4" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
    turnkey: '<circle cx="8" cy="14.5" r="4" fill="none" stroke="#fff" stroke-width="1.8"/><path d="M11.5 14.5H21M17.5 14.5V19M21 14.5v3" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>',
    check: '<path d="M4 12.5l5 5L20 6.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>'
  };
  const icon = (name) =>
    '<svg viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[name] || ICONS.install) + '</svg>';

  const catName = (id) => ((CATEGORIES.find((c) => c.id === id)) || {}).name || id;
  const productBySlug = (slug) => PRODUCTS.find((p) => p.slug === slug);

  /* ---------- SITE bindings ---------- */
  function bindSite() {
    const tel = 'tel:' + SITE.phoneDial;
    $('#headerPhone').href = tel;
    $('#servicesCall').href = tel;
    $('#emergencyCall').href = tel;
    $('#emergencyPhone').textContent = SITE.phoneDisplay;
    $('#contactCall').href = tel;
    $('#footerPhone').href = tel;
    $('#footerPhoneText').textContent = SITE.phoneDisplay;
    $('#footerMail').href = 'mailto:' + SITE.email;
    $('#footerMailText').textContent = SITE.email;
    $('#footerAddr').href = SITE.mapsUrl;
    $('#footerAddrText').textContent = SITE.address;
    $('#contactMap').href = SITE.mapsUrl;
    $('#footerGst').textContent = SITE.gst;
    $('#footerHours').querySelector('span:last-child').textContent = SITE.hours;
    $('#year').textContent = new Date().getFullYear();

    const hello = 'Hello Mangal Enterprises! I want to enquire about your products and services.';
    $('#waFloat').href = waLink(hello);
    $('#contactWa').href = waLink(hello);

    const stats = $('.hero-stats');
    if (stats) {
      stats.innerHTML = SITE.stats.map((s) =>
        '<div class="stat"><dt data-count="' + s.value + '" data-suffix="' + esc(s.suffix) + '">0</dt><dd>' + esc(s.label) + '</dd></div>'
      ).join('');
    }

    const list = $('#contactList');
    if (list) {
      const items = [
        { t: 'Visit Showroom', v: SITE.address, href: SITE.mapsUrl },
        { t: 'Call Service Desk', v: SITE.phoneDisplay, href: tel },
        { t: 'Email Us', v: SITE.email, href: 'mailto:' + SITE.email },
        { t: 'Working Hours', v: SITE.hours, href: null },
        { t: 'GSTIN', v: SITE.gst, href: null }
      ];
      list.innerHTML = items.map((it) =>
        '<li><span class="benefit-ico"></span><div style="flex:1;min-width:0"><strong>' + esc(it.t) + '</strong>' +
        (it.href
          ? '<a href="' + esc(it.href) + '"' + (/^http/.test(it.href) ? ' target="_blank" rel="noopener"' : '') + '>' + esc(it.v) + '</a>'
          : '<span class="val">' + esc(it.v) + '</span>') +
        '</div></li>').join('');
      const svgs = [
        '<svg viewBox="0 0 24 24"><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="10" r="2.5" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>',
        '<svg viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C11.3 21 3 12.7 3 2.5c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1L6.6 10.8z" fill="currentColor"/></svg>',
        '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="3" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M4 7l8 6 8-6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
        '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M12 7v5l3.5 2" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
        '<svg viewBox="0 0 24 24"><path d="M12 3l7 3v5c0 4.4-3 8.3-7 10-4-1.7-7-5.6-7-10V6z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M9 12l2 2 4-4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>'
      ];
      $$('.benefit-ico', list).forEach((el, i) => { el.innerHTML = svgs[i] || ''; });
    }

    const fc = $('#footerCats');
    if (fc) {
      fc.innerHTML = CATEGORIES.map((c) =>
        '<a href="#catalog" data-cat-link="' + c.id + '">' + esc(c.name) + '</a>').join('');
    }
  }

  /* ---------- categories ---------- */
  let activeCat = 'all';

  function renderChips() {
    const wrap = $('#categoryChips');
    const all = [{ id: 'all', name: 'All Products' }].concat(CATEGORIES);
    wrap.innerHTML = all.map((c) => {
      const n = c.id === 'all' ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === c.id).length;
      return '<button class="chip' + (activeCat === c.id ? ' is-active' : '') + '" role="tab"' +
        ' aria-selected="' + (activeCat === c.id) + '" data-cat="' + c.id + '">' +
        esc(c.name) + ' <span class="count">' + n + '</span></button>';
    }).join('');

    const ribbon = $('#ribbonTrack');
    ribbon.innerHTML = [{ id: 'all', name: 'All' }].concat(CATEGORIES).map((c) =>
      '<button class="ribbon-chip" data-cat-link="' + c.id + '"><span class="dot"></span>' + esc(c.name) + '</button>').join('');
  }

  function setCategory(id, scroll) {
    activeCat = CATEGORIES.some((c) => c.id === id) ? id : 'all';
    renderChips();
    renderGrid();
    if (scroll) $('#catalog').scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth' });
  }

  /* ---------- product grid ---------- */
  let currentResults = PRODUCTS.slice();

  function productCard(p, i) {
    return '<article class="product-card" style="--d:' + Math.min(i * 0.05, 0.4).toFixed(2) + 's" data-slug="' + p.slug + '">' +
      '<div class="card-media">' +
      '<img src="' + esc(p.image) + '" alt="' + esc(p.name) + '" loading="lazy" width="640" height="480" />' +
      '<span class="card-tag tag-' + esc(p.tag) + '">' + esc(p.tag) + '</span>' +
      (p.badge ? '<span class="card-badge">' + esc(p.badge) + '</span>' : '') +
      '</div>' +
      '<div class="card-body">' +
      '<span class="card-cat">' + esc(catName(p.category)) + '</span>' +
      '<h3 class="card-name">' + esc(p.name) + '</h3>' +
      '<p class="card-short">' + esc(p.short) + '</p>' +
      '<div class="card-foot">' +
      (p.price ? '<span class="card-price">' + esc(p.price) + '</span>' : '<span></span>') +
      '<button class="card-more" data-view="' + p.slug + '">View More' +
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
      '</button></div></div></article>';
  }

  function renderGrid() {
    const q = ($('#productSearch').value || '').trim().toLowerCase();
    currentResults = PRODUCTS.filter((p) => {
      const inCat = activeCat === 'all' || p.category === activeCat;
      if (!inCat) return false;
      if (!q) return true;
      return [p.name, catName(p.category), p.short, p.description, p.tag].join(' ').toLowerCase().indexOf(q) >= 0;
    });

    const grid = $('#productGrid');
    grid.innerHTML = currentResults.map(productCard).join('');
    $('#emptyState').hidden = currentResults.length > 0;
    grid.hidden = currentResults.length === 0;

    const label = (currentResults.length === PRODUCTS.length && !q)
      ? 'Showing all products'
      : 'Showing ' + currentResults.length + ' of ' + PRODUCTS.length + ' products' +
        (activeCat !== 'all' ? ' in \u201C' + catName(activeCat) + '\u201D' : '') +
        (q ? ' for \u201C' + $('#productSearch').value.trim() + '\u201D' : '');
    $('#resultCount').textContent = label;
    $('#clearFilters').hidden = activeCat === 'all' && !q;
  }

  /* ---------- modals ---------- */
  let lastFocus = null;
  let lastSectionHash = '#catalog';

  function lockScroll(on) { document.body.style.overflow = on ? 'hidden' : ''; }

  function openModal(modal) {
    lastFocus = document.activeElement;
    modal.hidden = false;
    lockScroll(true);
    const close = modal.querySelector('.modal-close');
    if (close) close.focus({ preventScroll: true });
  }
  function closeModal(modal) {
    modal.hidden = true;
    if ($('#productModal').hidden && $('#enquiryModal').hidden) {
      lockScroll(false);
      if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    }
  }

  function setHash(h) {
    if (location.hash !== h) {
      try { history.pushState(null, '', h); } catch (e) { /* file:// guard */ }
    }
  }

  function chipClass(tag) {
    return tag === 'Buy' ? 'cyan' : tag === 'Rent' ? 'violet' : tag === 'AMC' ? 'green' : 'blue';
  }

  function openProduct(slug, push) {
    const p = productBySlug(slug);
    if (!p) return;
    const idx = currentResults.findIndex((x) => x.slug === slug);
    const list = idx >= 0 ? currentResults : PRODUCTS;
    const at = idx >= 0 ? idx : Math.max(0, PRODUCTS.findIndex((x) => x.slug === slug));
    const prev = list[(at - 1 + list.length) % list.length];
    const next = list[(at + 1) % list.length];

    $('#productModalBody').innerHTML =
      '<div class="pd-grid">' +
      '<div class="pd-media">' +
      '<img src="' + esc(p.image) + '" alt="' + esc(p.name) + '" width="640" height="480" />' +
      '<div class="pd-media-meta">' +
      '<span class="chip-mini chip-' + chipClass(p.tag) + '">' + esc(p.tag) + '</span>' +
      (p.badge ? '<span class="card-badge" style="position:static">' + esc(p.badge) + '</span>' : '') +
      '</div></div>' +
      '<div class="pd-body">' +
      '<span class="pd-cat">' + esc(catName(p.category)) + '</span>' +
      '<h3 class="pd-name" id="pmTitle">' + esc(p.name) + '</h3>' +
      (p.price ? '<p class="pd-price">' + esc(p.price) + '</p>' : '') +
      '<p class="pd-desc">' + esc(p.description) + '</p>' +
      '<div class="pd-sec"><h4>Key Features</h4><ul class="pd-feats">' +
      p.features.map((f) => '<li>' + icon('check') + '<span>' + esc(f) + '</span></li>').join('') +
      '</ul></div>' +
      '<div class="pd-sec"><h4>Specifications</h4><div class="pd-specs">' +
      p.specs.map((s) => '<dl><dt>' + esc(s.k) + '</dt><dd>' + esc(s.v) + '</dd></dl>').join('') +
      '</div></div>' +
      '<div class="pd-sec"><h4>Applications</h4><div class="pd-apps">' +
      p.applications.map((a) => '<span class="pd-app">' + esc(a) + '</span>').join('') +
      '</div></div>' +
      '<div class="pd-actions">' +
      '<button class="btn btn-primary" data-enquire="' + p.slug + '">Enquire Now</button>' +
      '<a class="btn btn-dark" href="' + esc(p.pdf) + '" download>' +
      '<svg class="btn-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v11m0 0l-4-4m4 4l4-4M5 21h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
      'Download Product Details</a>' +
      '</div>' +
      '<div class="pd-nav">' +
      '<button class="btn btn-soft btn-sm" data-goto="' + prev.slug + '">\u2190 ' + esc(prev.name) + '</button>' +
      '<button class="btn btn-soft btn-sm" data-goto="' + next.slug + '">' + esc(next.name) + ' \u2192</button>' +
      '</div></div></div>';

    if ($('#productModal').hidden) openModal($('#productModal'));
    $('#productModalBody').scrollTop = 0;
    if (push !== false) setHash('#product/' + slug);
  }

  function closeProduct(restore) {
    if ($('#productModal').hidden) return;
    closeModal($('#productModal'));
    if (restore && location.hash.indexOf('#product/') === 0) {
      try { history.replaceState(null, '', lastSectionHash); } catch (e) { /* file:// */ }
    }
  }

  /* ---------- enquiry ---------- */
  function openEnquiry(slug) {
    const p = slug ? productBySlug(slug) : null;
    $('#enquiryForm').hidden = false;
    $('#enquirySuccess').hidden = true;
    if (p) {
      $('#enqProduct').value = p.name;
      $('#enqSubtitle').textContent = 'You are enquiring about \u201C' + p.name + '\u201D.';
    } else {
      $('#enqProduct').value = '';
      $('#enqSubtitle').textContent = "Share your details \u2014 we'll send pricing and availability.";
    }
    openModal($('#enquiryModal'));
  }

  /* ---------- validation ---------- */
  function validPhone(v) {
    let d = String(v || '').replace(/\D/g, '');
    if (d.length === 12 && d.indexOf('91') === 0) d = d.slice(2);
    if (d.length === 11 && d.charAt(0) === '0') d = d.slice(1);
    return d.length === 10;
  }
  function validEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v || '').trim());
  }

  function validate(form) {
    let ok = true;
    $$('.field', form).forEach((label) => {
      const input = $('input, select, textarea', label);
      if (!input) return;
      const err = $('.err', label);
      const val = input.value.trim();
      let msg = '';
      if (input.hasAttribute('required') && !val) msg = 'This field is required.';
      else if (val && input.name === 'mobile' && !validPhone(val)) msg = 'Enter a valid 10-digit mobile number.';
      else if (val && input.type === 'email' && !validEmail(val)) msg = 'Enter a valid email address.';
      if (msg) {
        ok = false;
        label.classList.add('invalid');
        if (err) err.textContent = msg;
      } else {
        label.classList.remove('invalid');
        if (err) err.textContent = '';
      }
    });
    return ok;
  }

  function fieldData(form) {
    const data = {};
    $$('[name]', form).forEach((el) => { data[el.name] = el.value.trim(); });
    return data;
  }
  function makeRef(prefix) {
    return prefix + '-' + String(Math.floor(1000 + Math.random() * 9000));
  }

  function saveLead(record) {
    try {
      const key = 'me_leads';
      const arr = JSON.parse(localStorage.getItem(key) || '[]');
      arr.push(record);
      localStorage.setItem(key, JSON.stringify(arr.slice(-200)));
    } catch (e) { /* storage unavailable — ignore */ }
  }

  function postToEndpoint(payload) {
    if (!SITE.endpoint) return;
    try {
      fetch(SITE.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.assign({ business: SITE.name }, payload))
      }).catch(() => {});
    } catch (e) { /* never block the user flow */ }
  }

  function waEnquiryMsg(d) {
    const L = ['*New Enquiry \u2014 ' + SITE.name + '* (' + d.ref + ')', ''];
    L.push('Product: ' + (d.product || d.message || 'General enquiry'));
    L.push('Name: ' + d.name);
    L.push('Mobile: ' + d.mobile);
    if (d.email) L.push('Email: ' + d.email);
    if (d.quantity) L.push('Quantity: ' + d.quantity);
    if (d.location) L.push('Location: ' + d.location);
    if (d.message && d.product) L.push('Message: ' + d.message);
    return L.join('\n');
  }

  function formatDateLong(iso) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
    if (!m) return iso || '';
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    const mi = parseInt(m[2], 10);
    if (mi < 1 || mi > 12) return iso;
    return parseInt(m[3], 10) + ' ' + months[mi - 1] + ' ' + m[1];
  }

  // Natural-paragraph WhatsApp message for maintenance requests.
  // Rules: name first, no mobile/email, no bullets, no headings,
  // no emojis, no decorative lines; notes sentence omitted when empty.
  function waMaintMsg(d) {
    const paras = [
      'Hello Mangal Enterprises,',
      'My name is ' + d.name + '. I would like to request a maintenance service for my ' + d.equipment + '.',
      'I require a ' + d.type + ' service on ' + formatDateLong(d.date) +
        ', preferably in the ' + d.time + '. The service location is ' + d.location + '.'
    ];
    if (d.notes) paras.push('Additional information: ' + d.notes);
    paras.push(
      'Please contact me to confirm the service appointment and further details.',
      'Thank you.'
    );
    return paras.join('\n\n');
  }

  /* ---------- services + clients ---------- */
  function renderServices() {
    $('#serviceGrid').innerHTML = SERVICES.map((s, i) =>
      '<article class="service-card" data-reveal style="--d:' + (i % 4 * 0.06).toFixed(2) + 's">' +
      '<span class="service-ico">' + icon(s.icon) + '</span>' +
      '<h3>' + esc(s.name) + '</h3><p>' + esc(s.desc) + '</p>' +
      '<ul class="service-points">' +
      s.points.map((pt) => '<li>' + icon('check') + '<span>' + esc(pt) + '</span></li>').join('') +
      '</ul></article>').join('');
  }

  function renderClients() {
    const card = (c, hidden) =>
      '<article class="client-card"' + (hidden ? ' aria-hidden="true"' : '') + '>' +
      '<div class="client-logo"><img src="' + esc(c.logo) + '" alt="' + esc(c.name) + ' logo" loading="lazy" width="560" height="200" /></div>' +
      '<div class="client-name">' + esc(c.name) + '</div></article>';
    const set = (hidden) =>
      '<div class="marquee-set">' + CLIENTS.map((c) => card(c, hidden)).join('') + '</div>';
    $('#clientTrack').innerHTML = set(false) + set(true);
  }

  /* ---------- form submissions ---------- */
  function bindForms() {
    const enqForm = $('#enquiryForm');
    enqForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validate(enqForm)) return;
      const d = fieldData(enqForm);
      d.ref = makeRef('ME-ENQ');
      saveLead(Object.assign({ kind: 'enquiry', at: new Date().toISOString() }, d));
      postToEndpoint(Object.assign({ kind: 'enquiry' }, d));
      $('#enquirySuccessMsg').textContent =
        'Thank you, ' + d.name + '! Your enquiry for \u201C' + (d.product || 'our products') + '\u201D has been recorded. Our team will contact you shortly.';
      $('#enquiryRef').textContent = 'Ref: ' + d.ref;
      $('#enquiryWa').href = waLink(waEnquiryMsg(d));
      $('#enquiryMail').href = 'mailto:' + SITE.email +
        '?subject=' + encodeURIComponent('Product Enquiry ' + d.ref + ' \u2014 ' + d.name) +
        '&body=' + encodeURIComponent(waEnquiryMsg(d).replace(/\*/g, ''));
      enqForm.hidden = true;
      $('#enquirySuccess').hidden = false;
    });
    $('#enquiryAgain').addEventListener('click', () => {
      enqForm.reset();
      $$('.field.invalid', enqForm).forEach((l) => l.classList.remove('invalid'));
      $('#enquirySuccess').hidden = true;
      enqForm.hidden = false;
    });

    const mForm = $('#maintenanceForm');
    const mDate = mForm.querySelector('[name="date"]');
    if (mDate) {
      const t = new Date();
      mDate.min = t.toISOString().slice(0, 10);
    }
    mForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validate(mForm)) return;
      const d = fieldData(mForm);
      d.ref = makeRef('ME-MT');
      saveLead(Object.assign({ kind: 'maintenance', at: new Date().toISOString() }, d));
      postToEndpoint(Object.assign({ kind: 'maintenance' }, d));
      const url = waLink(waMaintMsg(d));
      // Open WhatsApp (app on mobile, WhatsApp Web on desktop) with the
      // request pre-filled, so the customer reviews it and presses Send.
      // Nothing is sent automatically.
      let opened = false;
      try {
        const win = window.open(url, '_blank', 'noopener');
        opened = !!win;
      } catch (err) { opened = false; }
      // Honest confirmation: the request only reaches us once the
      // customer presses Send inside WhatsApp.
      const panel = $('#maintenanceSuccess');
      panel.querySelector('h3').textContent = 'Check WhatsApp to send your request';
      $('#maintenanceSuccessMsg').textContent =
        'Thanks ' + d.name + '! WhatsApp has been opened with your maintenance request pre-filled. ' +
        'Press Send in WhatsApp to deliver it to Mangal Enterprises, and our service desk will confirm your slot.';
      $('#maintenanceRef').textContent = 'Ref: ' + d.ref;
      const waBtn = $('#maintenanceWa');
      waBtn.href = url;
      waBtn.textContent = 'Open WhatsApp';
      let blocked = $('#maintenanceBlocked');
      if (!blocked) {
        blocked = document.createElement('p');
        blocked.id = 'maintenanceBlocked';
        blocked.className = 'wa-blocked';
        panel.insertBefore(blocked, panel.querySelector('.success-actions'));
      }
      if (opened) {
        blocked.hidden = true;
      } else {
        blocked.hidden = false;
        blocked.textContent = 'Your browser blocked the automatic WhatsApp pop-up. Please tap \u201COpen WhatsApp\u201D below to continue \u2014 your details are already filled in.';
      }
      mForm.hidden = true;
      panel.hidden = false;
    });
    $('#maintenanceAgain').addEventListener('click', () => {
      mForm.reset();
      $$('.field.invalid', mForm).forEach((l) => l.classList.remove('invalid'));
      $('#maintenanceSuccess').hidden = true;
      mForm.hidden = false;
    });

    const cForm = $('#contactForm');
    cForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validate(cForm)) return;
      const d = fieldData(cForm);
      d.ref = makeRef('ME-ENQ');
      saveLead(Object.assign({ kind: 'contact', at: new Date().toISOString() }, d));
      postToEndpoint(Object.assign({ kind: 'contact' }, d));
      $('#contactSuccessMsg').textContent =
        'Thank you, ' + d.name + '! Your enquiry has been recorded. Our team will get back to you shortly on ' + d.mobile + '.';
      $('#contactRef').textContent = 'Ref: ' + d.ref;
      $('#contactWa2').href = waLink(waEnquiryMsg(d));
      cForm.hidden = true;
      $('#contactSuccess').hidden = false;
    });
    $('#contactAgain').addEventListener('click', () => {
      cForm.reset();
      $$('.field.invalid', cForm).forEach((l) => l.classList.remove('invalid'));
      $('#contactSuccess').hidden = true;
      cForm.hidden = false;
    });

    // live-clear errors while typing
    $$('form.lead-form').forEach((f) => {
      f.addEventListener('input', (e) => {
        const label = e.target.closest('.field');
        if (label) label.classList.remove('invalid');
      });
    });
  }

  /* ---------- header, nav, scroll ---------- */
  function bindChrome() {
    const header = $('#siteHeader');
    const toTop = $('#toTop');
    const onScroll = () => {
      const y = window.scrollY;
      header.classList.toggle('scrolled', y > 24);
      toTop.classList.toggle('visible', y > 640);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: REDUCED ? 'auto' : 'smooth' }));

    const toggle = $('#navToggle');
    const nav = $('#mobileNav');
    const setNav = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      nav.hidden = !open;
      header.classList.toggle('nav-open', open);
      if (!open && window.scrollY <= 24) header.classList.remove('scrolled');
    };
    toggle.addEventListener('click', () => setNav(nav.hidden));
    $$('#mobileNav a').forEach((a) => a.addEventListener('click', () => setNav(false)));
    window.addEventListener('resize', () => { if (window.innerWidth > 860) setNav(false); });

    // scroll spy
    const links = $$('.nav-desktop .nav-link');
    const map = {};
    links.forEach((a) => { map[a.getAttribute('href')] = a; });
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          links.forEach((a) => a.classList.remove('is-active'));
          const a = map['#' + en.target.id];
          if (a) a.classList.add('is-active');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    ['home', 'catalog', 'services', 'clients', 'maintenance', 'contact'].forEach((id) => {
      const s = document.getElementById(id);
      if (s) spy.observe(s);
    });

    $$('a[href^="#"]:not([href="#"])').forEach((a) => {
      a.addEventListener('click', () => {
        if (a.hash.indexOf('#product/') !== 0) lastSectionHash = a.hash;
      });
    });
  }

  /* ---------- reveal + counters ---------- */
  function bindReveal() {
    const els = $$('[data-reveal]');
    if (!('IntersectionObserver' in window) || REDUCED) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add('is-visible');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach((el) => io.observe(el));
  }

  function bindCounters() {
    const dts = $$('.hero-stats dt[data-count]');
    if (!dts.length) return;
    const run = (dt) => {
      const target = parseInt(dt.getAttribute('data-count'), 10);
      const suffix = dt.getAttribute('data-suffix') || '';
      if (REDUCED) { dt.textContent = target.toLocaleString('en-IN') + suffix; return; }
      const t0 = performance.now();
      const dur = 1500;
      const step = (now) => {
        const k = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - k, 3);
        dt.textContent = Math.round(target * eased).toLocaleString('en-IN') + suffix;
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if (!('IntersectionObserver' in window)) { dts.forEach(run); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { run(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.4 });
    dts.forEach((dt) => io.observe(dt));
  }

  /* ---------- client carousel ---------- */
  function bindCarousel() {
    const marquee = $('#clientMarquee');
    const track = $('#clientTrack');
    if (REDUCED) { marquee.classList.add('is-static'); return; }
    const set = track.children[0];
    if (!set) return;
    let x = 0, last = performance.now(), paused = false;
    const SPEED = 0.055; // px per ms (~3.3px per frame)
    const half = () => set.offsetWidth;
    const frame = (now) => {
      const dt = Math.min(100, now - last);
      last = now;
      if (!paused && !document.hidden && half() > 0) {
        x -= dt * SPEED;
        if (-x >= half()) x += half();
        track.style.transform = 'translate3d(' + x.toFixed(2) + 'px,0,0)';
      }
      requestAnimationFrame(frame);
    };
    marquee.addEventListener('pointerenter', () => { paused = true; });
    marquee.addEventListener('pointerleave', () => { paused = false; });
    marquee.addEventListener('focusin', () => { paused = true; });
    marquee.addEventListener('focusout', () => { paused = false; });
    marquee.addEventListener('touchstart', () => { paused = true; }, { passive: true });
    marquee.addEventListener('touchend', () => { paused = false; }, { passive: true });
    requestAnimationFrame(frame);
  }

  /* ---------- hero slider ---------- */
  function bindHeroSlider() {
    const track = $('#heroSliderTrack');
    const dotsWrap = $('#heroSliderDots');
    const prevBtn = $('#heroSliderPrev');
    const nextBtn = $('#heroSliderNext');
    if (!track || !dotsWrap) return;

    const slides = PRODUCTS.filter((p) => p.featured).slice(0, 6);
    if (!slides.length) return;

    let current = 0;
    let autoplayTimer = null;

    const chipClassMap = { Buy: 'cyan', Rent: 'violet', AMC: 'green', Project: 'blue' };

    track.innerHTML = slides.map((p, i) =>
      '<div class="hero-slider-slide' + (i === 0 ? ' is-active' : '') + '" data-index="' + i + '">' +
      '<img src="' + esc(p.image) + '" alt="' + esc(p.name) + '" loading="' + (i === 0 ? 'eager' : 'lazy') + '" width="640" height="480" />' +
      '<div class="hero-slider-meta">' +
      '<span class="chip-mini chip-' + (chipClassMap[p.tag] || 'cyan') + '">' + esc(p.tag) + '</span>' +
      '<strong>' + esc(p.name) + '</strong>' +
      '</div></div>'
    ).join('');

    dotsWrap.innerHTML = slides.map((_, i) =>
      '<button class="hero-slider-dot' + (i === 0 ? ' is-active' : '') + '" data-index="' + i + '" aria-label="Go to slide ' + (i + 1) + '"></button>'
    ).join('');

    function goTo(idx) {
      current = ((idx % slides.length) + slides.length) % slides.length;
      track.querySelectorAll('.hero-slider-slide').forEach((el, i) => {
        el.classList.toggle('is-active', i === current);
      });
      dotsWrap.querySelectorAll('.hero-slider-dot').forEach((el, i) => {
        el.classList.toggle('is-active', i === current);
      });
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function startAutoplay() {
      stopAutoplay();
      autoplayTimer = setInterval(next, 4000);
    }

    function stopAutoplay() {
      if (autoplayTimer) { clearInterval(autoplayTimer); autoplayTimer = null; }
    }

    prevBtn.addEventListener('click', () => { prev(); startAutoplay(); });
    nextBtn.addEventListener('click', () => { next(); startAutoplay(); });

    dotsWrap.addEventListener('click', (e) => {
      const dot = e.target.closest('.hero-slider-dot');
      if (dot) { goTo(parseInt(dot.getAttribute('data-index'), 10)); startAutoplay(); }
    });

    const slider = $('#heroSlider');
    slider.addEventListener('pointerenter', stopAutoplay);
    slider.addEventListener('pointerleave', startAutoplay);

    let touchStartX = 0;
    slider.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; stopAutoplay(); }, { passive: true });
    slider.addEventListener('touchend', (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); }
      startAutoplay();
    }, { passive: true });

    startAutoplay();
  }

  /* ---------- global clicks ---------- */
  function bindGlobal() {
    document.addEventListener('click', (e) => {
      const view = e.target.closest('[data-view]');
      if (view) { openProduct(view.getAttribute('data-view')); return; }
      const go = e.target.closest('[data-goto]');
      if (go) { openProduct(go.getAttribute('data-goto')); return; }
      const enq = e.target.closest('[data-enquire]');
      if (enq) { openEnquiry(enq.getAttribute('data-enquire') || null); return; }
      const catLink = e.target.closest('[data-cat-link]');
      if (catLink) { setCategory(catLink.getAttribute('data-cat-link'), true); return; }
      const cat = e.target.closest('[data-cat]');
      if (cat) { setCategory(cat.getAttribute('data-cat'), false); return; }
      if (e.target.closest('[data-close-modal]')) {
        if (!$('#enquiryModal').hidden && e.target.closest('#enquiryModal')) closeModal($('#enquiryModal'));
        else if (!$('#productModal').hidden) closeProduct(true);
        return;
      }
    });

    $('#clearFilters').addEventListener('click', () => {
      $('#productSearch').value = '';
      setCategory('all', false);
    });
    $('#emptyReset').addEventListener('click', () => {
      $('#productSearch').value = '';
      setCategory('all', false);
    });

    let searchTimer = null;
    $('#productSearch').addEventListener('input', () => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(renderGrid, 160);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) {
        e.preventDefault();
        $('#productSearch').focus();
        $('#catalog').scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth' });
      }
      if (e.key === 'Escape') {
        if (!$('#enquiryModal').hidden) closeModal($('#enquiryModal'));
        else if (!$('#productModal').hidden) closeProduct(true);
      }
      if (!$('#productModal').hidden && $('#enquiryModal').hidden) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          const cur = location.hash.replace('#product/', '');
          const list = currentResults.length ? currentResults : PRODUCTS;
          const at = Math.max(0, list.findIndex((p) => p.slug === cur));
          const n = e.key === 'ArrowRight'
            ? list[(at + 1) % list.length]
            : list[(at - 1 + list.length) % list.length];
          if (n) openProduct(n.slug);
        }
      }
    });

    window.addEventListener('hashchange', () => {
      const h = location.hash;
      if (h.indexOf('#product/') === 0) {
        const slug = h.replace('#product/', '');
        if ($('#productModal').hidden || !$('#productModalBody').innerHTML.includes('data-goto')) openProduct(slug, false);
        else {
          // modal open with different product → navigate
          const cur = $('#pmTitle') ? $('#pmTitle').textContent : '';
          const p = productBySlug(slug);
          if (p && cur !== p.name) openProduct(slug, false);
        }
      } else if (!$('#productModal').hidden) {
        closeProduct(false);
      }
    });
  }

  /* ---------- init ---------- */
  function init() {
    bindSite();
    renderChips();
    renderGrid();
    renderServices();
    renderClients();
    bindForms();
    bindChrome();
    bindReveal();
    bindCounters();
    bindCarousel();
    bindHeroSlider();
    bindGlobal();

    // deep link: #product/<slug>
    if (location.hash.indexOf('#product/') === 0) {
      const slug = location.hash.replace('#product/', '');
      // wait a tick so reveal/carousel settle first
      setTimeout(() => openProduct(slug, false), 60);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
