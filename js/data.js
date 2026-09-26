/* =========================================================================
   Mangal Enterprises — Catalog Data
   Single source of truth for the website, PDF catalog and asset generator.

   TO ADD A PRODUCT:
   1. Copy any product object below and edit the fields.
   2. Give it a unique "slug" (used for the image + PDF file names).
   3. Run `npm run build` — this creates:
        assets/img/products/<slug>.svg   (placeholder illustration)
        downloads/products/<slug>.pdf    (downloadable product sheet)
      Or drop your own photo at assets/img/products/<slug>.png and set
      image: "assets/img/products/<slug>.png"
   ========================================================================= */

const SITE = {
  name: 'Mangal Enterprises',
  tagline: 'Complete Cooling & Refrigeration Solutions',
  supportLine: 'Air Conditioning • Refrigeration • HVAC • Maintenance • Turnkey Projects',
  since: '2005',

  phoneDisplay: '+91 88308 79712',
  phoneDial: '+918830879712',
  whatsapp: '918830879712', // country code + number, no + sign, spaces or special characters
  email: 'sales@mangalenterprises.in',

  address: 'Shop No. 12, Industrial Area Phase-II, New Delhi - 110020',
  hours: 'Mon - Sat: 9:00 AM - 7:00 PM',
  gst: '07ABCDE1234F1Z5',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Industrial+Area+Phase+II+New+Delhi',

  // Optional: paste a form endpoint (Google Form / your API) to also POST
  // every enquiry. Leave '' to use the WhatsApp + email flow only.
  endpoint: '',

  catalogPdf: 'downloads/mangal-enterprises-product-catalog.pdf',

  stats: [
    { value: 15, suffix: '+', label: 'Years of Experience' },
    { value: 1200, suffix: '+', label: 'Installations Delivered' },
    { value: 10, suffix: '', label: 'Product Categories' },
    { value: 24, suffix: '/7', label: 'Service Support' }
  ]
};

const CATEGORIES = [
  { id: 'air-conditioners', name: 'Air Conditioners', blurb: 'Split, window, inverter & floor standing ACs' },
  { id: 'central-ac-vrf', name: 'Central AC & VRF', blurb: 'VRF systems, ductable ACs & central cooling' },
  { id: 'water-coolers', name: 'Water Coolers', blurb: 'Wall mounted & bottle water coolers' },
  { id: 'deep-freezers', name: 'Deep Freezers', blurb: 'Glass top, display & chest freezers' },
  { id: 'air-purifiers', name: 'Air Purifiers', blurb: 'HEPA air purifiers for home & office' },
  { id: 'water-purifiers', name: 'Water Purifiers', blurb: 'RO, UV & commercial purification systems' },
  { id: 'cold-rooms', name: 'Cold Rooms', blurb: 'Walk-in cold rooms, freezer rooms & ice plants' },
  { id: 'ac-amc', name: 'Air Conditioning AMC', blurb: 'Annual maintenance contracts for AC & refrigeration' },
  { id: 'ac-rent', name: 'AC on Rent', blurb: 'Air conditioners on short & long term rent' },
  { id: 'turnkey-projects', name: 'Turnkey Projects', blurb: 'Refrigeration & air conditioning turnkey projects' }
];

const PRODUCTS = [
  /* ---------------- Air Conditioners ---------------- */
  {
    slug: 'breeze-inverter-split-ac',
    name: 'Breeze 1.5T Inverter Split AC',
    category: 'air-conditioners',
    tag: 'Buy',
    badge: 'Best Seller',
    featured: true,
    short: '5-star inverter split AC with 100% copper coil, rapid cooling and low noise operation.',
    description:
      'The Breeze 1.5 Ton Inverter Split Air Conditioner is engineered for Indian summers, delivering fast, uniform cooling while consuming significantly less power. Its 100% copper condenser with anti-corrosive coating stays durable for years, while the auto-clean evaporator keeps the air fresh and hygienic.',
    price: '₹ 34,500 onwards*',
    features: [
      '5-star inverter compressor with stabilizer-free operation',
      '100% copper condenser with blue fin anti-corrosion coating',
      'Cools the room in under 10 minutes with turbo mode',
      'PM 2.5 & active carbon filter for clean air',
      'Sleep mode, 24-hour timer and auto restart',
      'Low noise operation - as quiet as 19 dB'
    ],
    specs: [
      { k: 'Cooling Capacity', v: '1.5 Ton (5275 W)' },
      { k: 'Energy Rating', v: '5 Star (BEE Inverter)' },
      { k: 'Refrigerant', v: 'R-410A / R-32 Eco Friendly' },
      { k: 'Condenser', v: '100% Copper, Blue Fin Coated' },
      { k: 'Operating Range', v: '18°C - 32°C' },
      { k: 'Air Flow', v: 'High / Medium / Low' },
      { k: 'Noise Level', v: '19 - 40 dB' },
      { k: 'Warranty', v: '1 Year Product, 10 Years Compressor' }
    ],
    applications: ['Bedrooms & living rooms', 'Home offices', 'Shops & showrooms', 'Guest rooms'],
    image: 'assets/img/products/breeze-inverter-split-ac.svg',
    pdf: 'downloads/products/breeze-inverter-split-ac.pdf',
    art: 'splitAc',
    artOpts: { accent: 'cyan', label: 'INVERTER' }
  },
  {
    slug: 'chillpro-window-ac',
    name: 'ChillPro 1.5T Window AC',
    category: 'air-conditioners',
    tag: 'Buy',
    short: 'Single-piece window AC with copper coil, quick cooling and easy installation.',
    description:
      'The ChillPro Window Air Conditioner is a dependable, space-saving cooling unit ideal for single rooms, hostels and compact offices. Its rotary compressor and copper coil provide consistent cooling with low maintenance, and the dust filter keeps the indoor air clean through the season.',
    price: '₹ 27,900 onwards*',
    features: [
      'Powerful rotary compressor for quick pull-down',
      '100% copper coil with anti-corrosive treatment',
      'Removable, washable dust filter',
      'Auto restart on power restore',
      '2-way swing for wider air distribution',
      'Ideal for single rooms up to 150 sq. ft.'
    ],
    specs: [
      { k: 'Cooling Capacity', v: '1.5 Ton (5100 W)' },
      { k: 'Energy Rating', v: '3 Star (BEE)' },
      { k: 'Refrigerant', v: 'R-22 / R-410A' },
      { k: 'Coil Material', v: 'Copper' },
      { k: 'Air Flow', v: 'High / Medium / Low' },
      { k: 'Noise Level', v: '48 dB' },
      { k: 'Power Input', v: '1450 W' },
      { k: 'Warranty', v: '1 Year Product, 5 Years Compressor' }
    ],
    applications: ['Single rooms', 'Hostels & PGs', 'Small offices', 'Rental accommodation'],
    image: 'assets/img/products/chillpro-window-ac.svg',
    pdf: 'downloads/products/chillpro-window-ac.pdf',
    art: 'windowAc',
    artOpts: { accent: 'blue' }
  },
  {
    slug: 'arcticfloor-standing-ac',
    name: 'ArcticFloor 3.0T Standing AC',
    category: 'air-conditioners',
    tag: 'Buy',
    featured: true,
    short: 'Floor standing tower AC for large rooms, halls and commercial spaces.',
    description:
      'The ArcticFloor Floor Standing Air Conditioner is built for large open areas where wall units are not practical. With a 3-ton capacity, wide-angle air throw and a sleek tower design, it cools halls, offices and retail floors evenly without occupying wall space.',
    price: '₹ 78,000 onwards*',
    features: [
      'High air throw covering large open areas',
      'Slim tower footprint - fits any corner',
      'Auto swing louvres for 360° air distribution',
      'Auto restart, timer and multiple fan speeds',
      'Copper condenser with anti-corrosion coating',
      'Ideal for commercial and retail environments'
    ],
    specs: [
      { k: 'Cooling Capacity', v: '3.0 Ton (10500 W)' },
      { k: 'Energy Rating', v: '3 Star (BEE)' },
      { k: 'Refrigerant', v: 'R-410A' },
      { k: 'Air Throw', v: 'Up to 12 metres' },
      { k: 'Operating Mode', v: 'Cool / Fan / Dry' },
      { k: 'Noise Level', v: '36 - 52 dB' },
      { k: 'Power Input', v: '3350 W' },
      { k: 'Warranty', v: '1 Year Product, 5 Years Compressor' }
    ],
    applications: ['Banquet halls', 'Retail floors', 'Large offices', 'Clinics & showrooms'],
    image: 'assets/img/products/arcticfloor-standing-ac.svg',
    pdf: 'downloads/products/arcticfloor-standing-ac.pdf',
    art: 'towerAc',
    artOpts: { accent: 'violet', label: 'FLOOR STANDING' }
  },

  /* ---------------- Central AC & VRF ---------------- */
  {
    slug: 'vrf-heat-recovery-outdoor-unit',
    name: 'VRF Heat Recovery Outdoor Unit',
    category: 'central-ac-vrf',
    tag: 'Project',
    badge: 'Commercial',
    featured: true,
    short: 'Modular VRF heat recovery system for multi-zone precise climate control.',
    description:
      'Our VRF Heat Recovery Outdoor Units are designed for offices, hotels, hospitals and large residences that need independent temperature control in every zone. The system recovers heat between zones, cooling one room while warming another, which makes it extremely energy efficient for year-round comfort.',
    price: 'Price on request',
    features: [
      'Simultaneous heating and cooling across zones',
      'Up to 60 indoor units per outdoor unit',
      'Inverter compressor with part-load efficiency',
      'Individual zone control with smart panels',
      'Low ambient operation for extreme climates',
      'BMS compatible for building management'
    ],
    specs: [
      { k: 'Capacity Range', v: '8 HP - 48 HP (Modular)' },
      { k: 'Refrigerant', v: 'R-410A' },
      { k: 'Zones Supported', v: 'Up to 60 indoor units' },
      { k: 'Control', v: 'Individual zone / Centralised' },
      { k: 'Piping Length', v: 'Up to 1000 m equivalent' },
      { k: 'Sound Pressure', v: '54 - 62 dB(A)' },
      { k: 'Power Supply', v: '380V / 3 Phase / 50Hz' },
      { k: 'Warranty', v: '1 Year Comprehensive' }
    ],
    applications: ['Corporate offices', 'Hotels & resorts', 'Hospitals', 'Large residences'],
    image: 'assets/img/products/vrf-heat-recovery-outdoor-unit.svg',
    pdf: 'downloads/products/vrf-heat-recovery-outdoor-unit.pdf',
    art: 'vrfOutdoor',
    artOpts: { accent: 'blue', label: 'VRF' }
  },
  {
    slug: 'concealed-duct-ac-4t',
    name: 'Concealed Duct AC (4.0T)',
    category: 'central-ac-vrf',
    tag: 'Project',
    short: 'Ductable AC hidden in the ceiling with uniform air distribution through grilles.',
    description:
      'The Concealed Duct Air Conditioner is installed above the false ceiling and distributes cooled air through a network of ducts and grilles. It keeps the indoor space clean and clutter-free, making it the preferred choice for offices, retail stores, restaurants and premium homes.',
    price: 'Price on request',
    features: [
      'Concealed ceiling installation - only grilles visible',
      'Uniform cooling across multiple rooms',
      'Fresh air intake option available',
      'Static pressure options for long duct runs',
      'Quiet operation for work environments',
      'Compatible with centralised controllers'
    ],
    specs: [
      { k: 'Capacity', v: '4.0 Ton (14000 W)' },
      { k: 'Type', v: 'Ductable Split / Package' },
      { k: 'External Static Pressure', v: '50 - 150 Pa' },
      { k: 'Air Flow', v: '2200 CMH' },
      { k: 'Refrigerant', v: 'R-410A' },
      { k: 'Ducting', v: 'Insulated GI / FRP' },
      { k: 'Power Supply', v: '380V / 3 Phase' },
      { k: 'Warranty', v: '1 Year Comprehensive' }
    ],
    applications: ['Office floors', 'Restaurants & cafés', 'Retail stores', 'Premium residences'],
    image: 'assets/img/products/concealed-duct-ac-4t.svg',
    pdf: 'downloads/products/concealed-duct-ac-4t.pdf',
    art: 'ductAc',
    artOpts: { accent: 'violet', label: 'DUCTABLE' }
  },

  /* ---------------- Water Coolers ---------------- */
  {
    slug: 'aquaserve-wall-water-cooler',
    name: 'AquaServe Wall Mounted Water Cooler',
    category: 'water-coolers',
    tag: 'Buy',
    short: 'Space-saving wall mounted water cooler with stainless steel tank and 30 LPH cooling.',
    description:
      'The AquaServe Wall Mounted Water Cooler is perfect for offices, schools, factories and public spaces where floor space is limited. Its food-grade stainless steel tank cools water quickly and keeps it hygienic, while the push taps make dispensing effortless.',
    price: '₹ 18,500 onwards*',
    features: [
      'Food-grade stainless steel storage tank',
      'High-efficiency cooling - 30 litres per hour',
      'Push-button stainless steel dispensing taps',
      'Anti-spill drip tray with easy-clean design',
      'Automatic cut-off with overload protection',
      'Wall mounted - saves floor space'
    ],
    specs: [
      { k: 'Cooling Capacity', v: '30 LPH' },
      { k: 'Storage Tank', v: '20 Litres (SS-304)' },
      { k: 'Compressor', v: 'Hermetically Sealed' },
      { k: 'Refrigerant', v: 'R-134a' },
      { k: 'Taps', v: '2 Push Taps' },
      { k: 'Power Input', v: '220 W' },
      { k: 'Body', v: 'Powder Coated MS' },
      { k: 'Warranty', v: '1 Year On-Site' }
    ],
    applications: ['Offices & factories', 'Schools & colleges', 'Hospitals & clinics', 'Canteens'],
    image: 'assets/img/products/aquaserve-wall-water-cooler.svg',
    pdf: 'downloads/products/aquaserve-wall-water-cooler.pdf',
    art: 'wallCooler',
    artOpts: { accent: 'blue' }
  },
  {
    slug: 'aquaserve-bottle-water-cooler',
    name: 'AquaServe Bottle Water Cooler',
    category: 'water-coolers',
    tag: 'Buy',
    short: 'Floor standing bottled water cooler with dual taps for offices and events.',
    description:
      'The AquaServe Bottle Water Cooler is a portable, floor standing cooler that works with standard 20-litre bottles - no plumbing required. It is a favourite for events, temporary offices, waiting areas and sites where a continuous clean water supply is needed.',
    price: '₹ 15,900 onwards*',
    features: [
      'Works with standard 10 / 20 litre bottles',
      'Dual taps for faster dispensing',
      'No plumbing required - just plug and use',
      'Quick cooling compressor technology',
      'Anti-skid base and rugged body',
      'Ideal for events, sites and offices'
    ],
    specs: [
      { k: 'Cooling Capacity', v: '25 LPH' },
      { k: 'Bottle Support', v: '10 / 20 Litre' },
      { k: 'Compressor', v: 'Hermetically Sealed' },
      { k: 'Refrigerant', v: 'R-134a' },
      { k: 'Taps', v: '2 Push Taps' },
      { k: 'Power Input', v: '180 W' },
      { k: 'Body', v: 'Powder Coated MS' },
      { k: 'Warranty', v: '1 Year On-Site' }
    ],
    applications: ['Events & exhibitions', 'Construction sites', 'Temporary offices', 'Waiting areas'],
    image: 'assets/img/products/aquaserve-bottle-water-cooler.svg',
    pdf: 'downloads/products/aquaserve-bottle-water-cooler.pdf',
    art: 'bottleCooler',
    artOpts: { accent: 'cyan' }
  },

  /* ---------------- Deep Freezers ---------------- */
  {
    slug: 'frostline-glass-top-deep-freezer',
    name: 'FrostLine Glass Top Deep Freezer',
    category: 'deep-freezers',
    tag: 'Buy',
    badge: 'Popular',
    featured: true,
    short: 'Glass top deep freezer with tempered sliding lids, lock and heavy duty compressor.',
    description:
      'The FrostLine Glass Top Deep Freezer is built for retail - kirana stores, sweet shops and supermarkets. Its tempered glass sliding lids let customers see the stock without opening the freezer, keeping temperature stable and saving energy, while the lockable body keeps products secure.',
    price: '₹ 26,500 onwards*',
    features: [
      'Tempered glass sliding lids for easy display',
      'Heavy duty compressor for -18°C freezing',
      'Lock and key security with foam insulation',
      'Roller castors for easy movement',
      'Anti-rust powder coated body',
      'Energy efficient - low running cost'
    ],
    specs: [
      { k: 'Capacity', v: '200 / 300 / 400 Litres' },
      { k: 'Temperature Range', v: '-16°C to -22°C' },
      { k: 'Refrigerant', v: 'R-134a / R-600a' },
      { k: 'Insulation', v: 'CFC-Free PUF Injection' },
      { k: 'Lids', v: 'Tempered Glass, Sliding' },
      { k: 'Compressor', v: 'High Efficiency Hermetic' },
      { k: 'Power Input', v: '210 W' },
      { k: 'Warranty', v: '1 Year Product, 3 Years Compressor' }
    ],
    applications: ['Kirana & grocery stores', 'Sweet shops', 'Supermarkets', 'Ice cream parlours'],
    image: 'assets/img/products/frostline-glass-top-deep-freezer.svg',
    pdf: 'downloads/products/frostline-glass-top-deep-freezer.pdf',
    art: 'glassTopFreezer',
    artOpts: { accent: 'cyan', label: '-18°C' }
  },
  {
    slug: 'frostline-upright-display-freezer',
    name: 'FrostLine Upright Display Freezer',
    category: 'deep-freezers',
    tag: 'Buy',
    short: 'Glass door upright freezer with LED lighting for beverages, frozen food and ice cream.',
    description:
      'The FrostLine Upright Display Freezer maximises retail visibility with a full-length glass door, bright LED shelves and consistent -18°C freezing. It is the go-to merchandiser for beverages, frozen foods, dairy and ice cream brands that need products on display, always ready to sell.',
    price: '₹ 48,000 onwards*',
    features: [
      'Full length double glazed glass door',
      'Bright LED shelf lighting for merchandising',
      'Auto defrost with digital temperature control',
      'Adjustable wire shelves for flexible layout',
      'Lockable castors and self-closing door',
      'Low noise, high efficiency compressor'
    ],
    specs: [
      { k: 'Capacity', v: '340 / 480 / 620 Litres' },
      { k: 'Temperature Range', v: '-18°C to -22°C' },
      { k: 'Door', v: 'Single / Double Glass' },
      { k: 'Lighting', v: 'Vertical LED' },
      { k: 'Refrigerant', v: 'R-290 Eco Friendly' },
      { k: 'Shelves', v: '4 - 6 Adjustable' },
      { k: 'Power Input', v: '320 W' },
      { k: 'Warranty', v: '1 Year Product, 3 Years Compressor' }
    ],
    applications: ['Supermarkets', 'Quick service restaurants', 'Cafés & juice bars', 'Pharmacies'],
    image: 'assets/img/products/frostline-upright-display-freezer.svg',
    pdf: 'downloads/products/frostline-upright-display-freezer.pdf',
    art: 'uprightFreezer',
    artOpts: { accent: 'blue', label: 'DISPLAY FREEZER' }
  },

  /* ---------------- Air Purifiers ---------------- */
  {
    slug: 'pureair-hepa-tower-purifier',
    name: 'PureAir HEPA Tower Purifier',
    category: 'air-purifiers',
    tag: 'Buy',
    short: 'Slim tower air purifier with True HEPA, carbon filter and real-time AQI display.',
    description:
      'The PureAir HEPA Tower Purifier removes 99.97% of dust, pollen, smoke and pollutants down to 0.3 microns. With a real-time AQI display, automatic mode and a whisper-quiet motor, it keeps bedrooms and workspaces healthy through every season - especially during Delhi winters and monsoon humidity.',
    price: '₹ 12,900 onwards*',
    features: [
      'True HEPA H13 filter - removes 99.97% pollutants',
      'Activated carbon layer for odour and smoke',
      'Real-time AQI display with air quality sensor',
      'Auto mode adjusts fan speed automatically',
      'Sleep mode with display dimming - 22 dB',
      'Covers rooms up to 450 sq. ft.'
    ],
    specs: [
      { k: 'Coverage Area', v: 'Up to 450 sq. ft.' },
      { k: 'Filtration', v: 'Pre + True HEPA H13 + Carbon' },
      { k: 'CADR', v: '320 m³/h' },
      { k: 'Particle Capture', v: '0.3 micron @ 99.97%' },
      { k: 'Sensor', v: 'Laser PM2.5 Sensor' },
      { k: 'Modes', v: 'Auto / Sleep / Turbo' },
      { k: 'Power Input', v: '45 W' },
      { k: 'Warranty', v: '1 Year On-Site' }
    ],
    applications: ['Bedrooms', 'Living rooms', 'Cabins & offices', 'Nurseries'],
    image: 'assets/img/products/pureair-hepa-tower-purifier.svg',
    pdf: 'downloads/products/pureair-hepa-tower-purifier.pdf',
    art: 'towerPurifier',
    artOpts: { accent: 'violet', label: 'HEPA' }
  },
  {
    slug: 'pureair-room-air-purifier',
    name: 'PureAir Room Air Purifier (True HEPA)',
    category: 'air-purifiers',
    tag: 'Buy',
    short: 'Compact room air purifier with 3-layer filtration, AQI display and app control.',
    description:
      'The PureAir Room Air Purifier packs 3-stage filtration into a compact body that fits easily on a desk or bedside table. Designed for city apartments and cabins, it quietly clears dust, smoke and allergens while the AQI display keeps you informed of the air you breathe.',
    price: '₹ 9,400 onwards*',
    features: [
      '3-stage filtration: pre-filter, HEPA, carbon',
      'Digital AQI display with colour indicator',
      'Timer and child lock functions',
      'Works with remote and mobile app',
      'Quiet 24 dB sleep mode',
      'Filter change indicator'
    ],
    specs: [
      { k: 'Coverage Area', v: 'Up to 320 sq. ft.' },
      { k: 'Filtration', v: 'Pre + HEPA + Carbon' },
      { k: 'CADR', v: '240 m³/h' },
      { k: 'Noise Level', v: '24 - 52 dB' },
      { k: 'Controls', v: 'Touch Panel + App' },
      { k: 'Timer', v: '1 - 8 Hours' },
      { k: 'Power Input', v: '38 W' },
      { k: 'Warranty', v: '1 Year On-Site' }
    ],
    applications: ['Study rooms', 'Compact bedrooms', 'Office cabins', 'Waiting rooms'],
    image: 'assets/img/products/pureair-room-air-purifier.svg',
    pdf: 'downloads/products/pureair-room-air-purifier.pdf',
    art: 'boxPurifier',
    artOpts: { accent: 'cyan', label: 'TRUE HEPA' }
  },

  /* ---------------- Water Purifiers ---------------- */
  {
    slug: 'aquapure-ro-uv-water-purifier',
    name: 'AquaPure RO + UV Water Purifier',
    category: 'water-purifiers',
    tag: 'Buy',
    badge: 'Best Seller',
    short: '7-stage RO + UV + UF purifier with mineraliser and smart filter indicators.',
    description:
      'The AquaPure RO + UV Water Purifier removes dissolved impurities, heavy metals, bacteria and viruses, then adds back essential minerals for sweet-tasting water. The transparent tank lets you see clean water at all times, and the smart indicators tell you exactly when each filter needs replacement.',
    price: '₹ 11,500 onwards*',
    features: [
      '7-stage purification: RO + UV + UF + TDS control',
      'Revitalises water with essential minerals',
      'Smart filter change indicators',
      'Transparent storage tank with 100% food-grade material',
      'Works on low water pressure without a pump',
      'Compact wall mount design'
    ],
    specs: [
      { k: 'Purification', v: 'RO + UV + UF + Mineraliser' },
      { k: 'Stages', v: '7 Stage' },
      { k: 'Storage Tank', v: '8 Litres (Food Grade)' },
      { k: 'Purification Rate', v: '15 Litres / Hour' },
      { k: 'TDS Handling', v: 'Up to 2000 ppm' },
      { k: 'Input Water', v: 'Municipal / Borewell' },
      { k: 'Power Input', v: '60 W' },
      { k: 'Warranty', v: '1 Year On-Site' }
    ],
    applications: ['Homes & apartments', 'Offices', 'Tea stalls & cafés', 'Clinics'],
    image: 'assets/img/products/aquapure-ro-uv-water-purifier.svg',
    pdf: 'downloads/products/aquapure-ro-uv-water-purifier.pdf',
    art: 'wallRO',
    artOpts: { accent: 'blue' }
  },
  {
    slug: 'aquapure-commercial-ro-system',
    name: 'AquaPure Commercial RO System',
    category: 'water-purifiers',
    tag: 'Project',
    short: 'Commercial RO plant with sediment, carbon and membrane stages for bulk purification.',
    description:
      'The AquaPure Commercial RO System is designed for cafeterias, factories, hostels and institutions that need large volumes of pure water every day. Its multi-stage membrane process handles high TDS input water and delivers consistent quality with minimal operator effort.',
    price: 'Price on request',
    features: [
      'High output capacity for commercial use',
      'Sediment + carbon + membrane multi-stage process',
      'SS / FRP pressure vessels with anti-corrosion coating',
      'Auto flush and low pressure cut-off',
      'TDS monitor for output water quality',
      'Turnkey installation and annual service support'
    ],
    specs: [
      { k: 'Output Capacity', v: '50 - 500 LPH (Custom)' },
      { k: 'Stages', v: 'Sediment + Carbon + RO + UV' },
      { k: 'Membrane', v: 'Thin Film Composite' },
      { k: 'TDS Handling', v: 'Up to 3000 ppm' },
      { k: 'Storage', v: 'Up to 500 Litres' },
      { k: 'Frame', v: 'Powder Coated MS / SS' },
      { k: 'Power Input', v: '0.5 - 3 HP' },
      { k: 'Warranty', v: '1 Year Comprehensive' }
    ],
    applications: ['Cafeterias & canteens', 'Factories & plants', 'Hostels & institutions', 'Hospitals'],
    image: 'assets/img/products/aquapure-commercial-ro-system.svg',
    pdf: 'downloads/products/aquapure-commercial-ro-system.pdf',
    art: 'roSystem',
    artOpts: { accent: 'cyan', label: 'RO SYSTEM' }
  },

  /* ---------------- Cold Rooms ---------------- */
  {
    slug: 'walk-in-cold-room',
    name: 'Walk-In Cold Room (Fruits & Vegetable)',
    category: 'cold-rooms',
    tag: 'Project',
    badge: 'Turnkey',
    featured: true,
    short: 'Modular walk-in cold room with PUF panels, digital controller and precise 0°C to 10°C storage.',
    description:
      'Our Walk-In Cold Rooms preserve fruits, vegetables, dairy and flowers by holding exact temperatures and humidity. Built with high-density PUF insulated panels and a digital controller, they reduce wastage dramatically for restaurants, mandis, florists and food processors.',
    price: 'Price on request',
    features: [
      'High density PUF insulated modular panels',
      'Precise digital temperature controller',
      'Heavy duty door with heated frame option',
      'Energy efficient refrigeration with low noise',
      'Custom sizes from 4 to 100 CBM',
      'Complete turnkey supply, installation & commissioning'
    ],
    specs: [
      { k: 'Temperature Range', v: '0°C to +10°C (Adjustable)' },
      { k: 'Panel Thickness', v: '100 mm PUF, 40 kg/m³' },
      { k: 'Sizes', v: '4 CBM - 100 CBM (Custom)' },
      { k: 'Refrigerant', v: 'R-404A / R-134a' },
      { k: 'Controller', v: 'Digital Auto Defrost' },
      { k: 'Door', v: 'Hinged / Sliding, Lockable' },
      { k: 'Floor', v: 'Anti-Skid Aluminium / SS' },
      { k: 'Warranty', v: '1 Year Comprehensive' }
    ],
    applications: ['Restaurants & hotels', 'Fruit & vegetable mandis', 'Florists', 'Food processing units'],
    image: 'assets/img/products/walk-in-cold-room.svg',
    pdf: 'downloads/products/walk-in-cold-room.pdf',
    art: 'coldRoom',
    artOpts: { accent: 'blue', label: 'COLD ROOM' }
  },
  {
    slug: 'freezer-room-ice-plant',
    name: 'Freezer Room / Ice Plant Room',
    category: 'cold-rooms',
    tag: 'Project',
    short: 'Sub-zero freezer room for ice cream, meat and frozen storage with -18°C to -25°C control.',
    description:
      'The Freezer Room keeps products rock solid at -18°C to -25°C for ice cream, meat, seafood and frozen foods. Supplied with a high-capacity condensing unit, heated door frames and smart defrost cycles, it is the backbone of every cold chain operation.',
    price: 'Price on request',
    features: [
      'Sub-zero holding from -18°C to -25°C',
      'Heavy duty compressor with high cooling load',
      'Anti-condensation heated door frame',
      'Digital controller with auto defrost',
      'Floor reinforcement and anti-skid finish',
      'Complete project execution with AMC options'
    ],
    specs: [
      { k: 'Temperature Range', v: '-18°C to -25°C' },
      { k: 'Panel Thickness', v: '120 mm PUF, 45 kg/m³' },
      { k: 'Sizes', v: '6 CBM - 120 CBM (Custom)' },
      { k: 'Refrigerant', v: 'R-404A' },
      { k: 'Defrost', v: 'Hot Gas / Electric Auto' },
      { k: 'Door', v: 'Heated Frame, Lockable' },
      { k: 'Power Supply', v: '415V / 3 Phase' },
      { k: 'Warranty', v: '1 Year Comprehensive' }
    ],
    applications: ['Ice cream factories', 'Meat & seafood processing', 'Cold storage warehouses', 'QSR kitchens'],
    image: 'assets/img/products/freezer-room-ice-plant.svg',
    pdf: 'downloads/products/freezer-room-ice-plant.pdf',
    art: 'freezerRoom',
    artOpts: { accent: 'cyan', label: 'FREEZER ROOM' }
  },

  /* ---------------- Air Conditioning AMC ---------------- */
  {
    slug: 'standard-ac-amc-plan',
    name: 'Standard AC AMC Plan',
    category: 'ac-amc',
    tag: 'AMC',
    featured: true,
    short: '4 visits a year with cleaning, gas top-up and performance checks for split & window ACs.',
    description:
      'The Standard AC AMC keeps your air conditioners running at peak efficiency through scheduled preventive visits. Our technicians clean the filters and coils, check gas pressure, inspect electricals and top up gas when required - so you never face a breakdown in peak summer.',
    price: '₹ 1,499 / AC / year*',
    features: [
      '4 scheduled preventive visits per year',
      'Deep cleaning of indoor & outdoor units',
      'Gas pressure check and top-up (up to 30% charge)',
      'Electrical and PCB inspection',
      'Condenser chemical wash once a year',
      'Priority booking during peak summer'
    ],
    specs: [
      { k: 'Visits', v: '4 per year (Quarterly)' },
      { k: 'Covered Types', v: 'Split & Window AC' },
      { k: 'Gas Top-Up', v: 'Up to 30% of charge' },
      { k: 'Chemical Wash', v: '1 time per year' },
      { k: 'Response Time', v: '48 hours' },
      { k: 'Spare Parts', v: 'At actual cost' },
      { k: 'Labour Charges', v: 'Fully covered' },
      { k: 'Contract Period', v: '12 months' }
    ],
    applications: ['Homes', 'Apartments', 'Small offices', 'Shops'],
    image: 'assets/img/products/standard-ac-amc-plan.svg',
    pdf: 'downloads/products/standard-ac-amc-plan.pdf',
    art: 'amcService',
    artOpts: { accent: 'blue', mode: 'checklist', label: 'STANDARD AMC' }
  },
  {
    slug: 'comprehensive-ac-amc-plan',
    name: 'Comprehensive AMC Plan',
    category: 'ac-amc',
    tag: 'AMC',
    badge: 'Complete Cover',
    short: 'All-inclusive AMC covering labour, gas, parts and emergency support for all equipment.',
    description:
      'The Comprehensive AMC is a true zero-worry plan - labour, refrigerant gas, worn-out parts and emergency breakdown visits are all included. It covers split, window, tower, VRF and refrigeration equipment, making it the smartest way to protect your comfort and your budget.',
    price: '₹ 3,499 / unit / year*',
    features: [
      'Unlimited breakdown visits within contract',
      'All labour and electrical parts included',
      'Complete gas charging included',
      'Quarterly preventive service visits',
      'PCB, compressor and remote covered*',
      '24-hour emergency response guarantee'
    ],
    specs: [
      { k: 'Visits', v: 'Unlimited breakdown + 4 PM visits' },
      { k: 'Covered Types', v: 'All AC & Refrigeration equipment' },
      { k: 'Gas', v: 'Full charging included' },
      { k: 'Parts', v: 'All electrical parts included' },
      { k: 'Response Time', v: '24 hours (Emergency)' },
      { k: 'Chemical Wash', v: '2 times per year' },
      { k: 'Compressor', v: 'Covered up to 5 years' },
      { k: 'Contract Period', v: '12 months' }
    ],
    applications: ['Corporate offices', 'Retail chains', 'Hotels & restaurants', 'Institutions'],
    image: 'assets/img/products/comprehensive-ac-amc-plan.svg',
    pdf: 'downloads/products/comprehensive-ac-amc-plan.pdf',
    art: 'amcService',
    artOpts: { accent: 'violet', mode: 'shield', label: 'COMPREHENSIVE AMC' }
  },

  /* ---------------- AC on Rent ---------------- */
  {
    slug: 'split-ac-on-rent',
    name: 'Split AC on Rent (1.0T / 1.5T)',
    category: 'ac-rent',
    tag: 'Rent',
    featured: true,
    short: 'Well maintained split ACs on monthly rent with free installation, removal and service.',
    description:
      'Renting an air conditioner has never been this simple. We deliver, install and maintain the AC at your premises, and take it back when you no longer need it. Ideal for tenants, temporary offices, weddings and seasonal needs - no big investment, no maintenance headache.',
    price: '₹ 1,200 / month onwards*',
    features: [
      'Free delivery, installation and uninstallation',
      'Well serviced and gas-charged units only',
      'Free repair and service during rental period',
      'Flexible 1 month to 12 month contracts',
      'Deposit adjustable against dues',
      'Quick replacement in case of breakdown'
    ],
    specs: [
      { k: 'Capacity', v: '1.0 Ton / 1.5 Ton' },
      { k: 'Type', v: 'Split (Copper)' },
      { k: 'Rental Term', v: '1 - 12 Months' },
      { k: 'Installation', v: 'Free (up to 10 ft piping)' },
      { k: 'Service', v: 'Included in rent' },
      { k: 'Minimum Order', v: '1 Unit' },
      { k: 'Delivery', v: 'Within 24 hours' },
      { k: 'Availability', v: 'Delhi NCR' }
    ],
    applications: ['Tenants & PGs', 'Temporary offices', 'Weddings & events', 'Seasonal cooling'],
    image: 'assets/img/products/split-ac-on-rent.svg',
    pdf: 'downloads/products/split-ac-on-rent.pdf',
    art: 'rentalUnit',
    artOpts: { accent: 'violet', base: 'split', label: 'ON RENT' }
  },
  {
    slug: 'office-event-ac-rental',
    name: 'Office & Event AC Rental (Floor Standing)',
    category: 'ac-rent',
    tag: 'Rent',
    short: 'Floor standing ACs on rent for offices, exhibitions, pandals and large events.',
    description:
      'Our Floor Standing AC Rental service cools large temporary spaces fast - exhibition halls, event venues, site offices and emergency wards. Units are delivered on ready-to-run basis with ducting accessories, so your event is comfortable from the first guest to the last.',
    price: '₹ 4,500 / month onwards*',
    features: [
      'High capacity 2.0T - 5.0T tower units',
      'Same day delivery for events and emergencies',
      'Ducting and exhaust accessories available',
      'On-site service within 4 hours',
      'Weekly, monthly and seasonal plans',
      'Bulk units available for large events'
    ],
    specs: [
      { k: 'Capacity', v: '2.0T - 5.0T' },
      { k: 'Type', v: 'Floor Standing / Ductable' },
      { k: 'Rental Term', v: '1 - 12 Months' },
      { k: 'Delivery', v: 'Same day (Delhi NCR)' },
      { k: 'Service', v: 'Free during rental' },
      { k: 'Power', v: 'Single / 3 Phase' },
      { k: 'Minimum Order', v: '1 Unit' },
      { k: 'Bulk Orders', v: 'Up to 100 units' }
    ],
    applications: ['Exhibitions & trade fairs', 'Weddings & events', 'Site offices', 'Emergency wards'],
    image: 'assets/img/products/office-event-ac-rental.svg',
    pdf: 'downloads/products/office-event-ac-rental.pdf',
    art: 'rentalUnit',
    artOpts: { accent: 'violet', base: 'tower', label: 'ON RENT' }
  },

  /* ---------------- Turnkey Projects ---------------- */
  {
    slug: 'turnkey-hvac-project',
    name: 'Turnkey HVAC Project (Commercial)',
    category: 'turnkey-projects',
    tag: 'Project',
    badge: 'Turnkey',
    featured: true,
    short: 'Design, supply, installation and commissioning of complete HVAC systems for buildings.',
    description:
      'From load calculation and duct design to procurement, installation, testing and handover - we execute complete HVAC projects end to end. Our in-house team coordinates civil, electrical and HVAC works so you deal with one accountable partner instead of ten contractors.',
    price: 'Price on request',
    features: [
      'Load calculation and HVAC design drawings',
      'Supply of all equipment and BOP materials',
      'Ducting, piping, insulation and electrical works',
      'Testing, balancing and commissioning (T&B)',
      'Single point responsibility and periodic reports',
      'Post-commissioning AMC and operator training'
    ],
    specs: [
      { k: 'Scope', v: 'Design → Supply → Install → Commission' },
      { k: 'Systems', v: 'VRF, Ductable, Chiller, AHU, FCU' },
      { k: 'Ducting', v: 'GI / FRP with insulation' },
      { k: 'Piping', v: 'Insulated copper / MS schedule' },
      { k: 'Controls', v: 'BMS / Centralised controllers' },
      { k: 'Documentation', v: 'As-built drawings & O&M manuals' },
      { k: 'Project Size', v: '500 - 100,000 sq. ft.' },
      { k: 'Warranty', v: '1 Year Comprehensive' }
    ],
    applications: ['Corporate buildings', 'Malls & retail', 'Hotels & hospitals', 'IT parks'],
    image: 'assets/img/products/turnkey-hvac-project.svg',
    pdf: 'downloads/products/turnkey-hvac-project.pdf',
    art: 'hvacProject',
    artOpts: { accent: 'blue', label: 'TURNKEY HVAC' }
  },
  {
    slug: 'industrial-refrigeration-project',
    name: 'Industrial Refrigeration Turnkey Project',
    category: 'turnkey-projects',
    tag: 'Project',
    short: 'Complete industrial refrigeration projects: cold storage, chilling and ice plants.',
    description:
      'We design and execute industrial refrigeration plants for cold storage, food processing, dairy, poultry and ice manufacturing. Every project is engineered for the lowest running cost, maximum reliability and compliance with food safety norms.',
    price: 'Price on request',
    features: [
      'Plant design and equipment selection',
      'Compressors, condensers, evaporators & controls',
      'Cold storage, chilling and ice plant execution',
      'Automated controls with remote monitoring',
      'Energy optimised for lowest running cost',
      'Installation, commissioning and operator training'
    ],
    specs: [
      { k: 'Scope', v: 'Design → Supply → Install → Commission' },
      { k: 'Systems', v: 'Cold Storage, Ice Plant, Chilling' },
      { k: 'Temperature', v: '-30°C to +10°C' },
      { k: 'Refrigerants', v: 'R-404A / R-717 / R-744' },
      { k: 'Plant Capacity', v: '1 Ton - 100 Ton' },
      { k: 'Controls', v: 'PLC / SCADA based' },
      { k: 'Compliance', v: 'FSSAI aligned layouts' },
      { k: 'Warranty', v: '1 Year Comprehensive' }
    ],
    applications: ['Cold storage warehouses', 'Dairy & poultry', 'Food processing units', 'Ice plants'],
    image: 'assets/img/products/industrial-refrigeration-project.svg',
    pdf: 'downloads/products/industrial-refrigeration-project.pdf',
    art: 'industrialProject',
    artOpts: { accent: 'cyan', label: 'TURNKEY PROJECTS' }
  }
];

/* ---------------- Services ---------------- */
const SERVICES = [
  { id: 'ac-installation', name: 'AC Installation', icon: 'install', desc: 'Expert split, window, ductable and VRF installation with clean piping, proper vacuum and commissioning.', points: ['Same day slots', 'All brands supported', 'Piping & wiring included'] },
  { id: 'ac-repair', name: 'AC Repair', icon: 'repair', desc: 'Fault diagnosis and repair for gas leakage, PCB, compressor, thermostat and cooling issues.', points: ['Doorstep diagnosis', 'Genuine spare parts', 'Warranty on work'] },
  { id: 'ac-maintenance', name: 'AC Maintenance', icon: 'maintenance', desc: 'Chemical jet wash, coil cleaning, drain clearing and performance tuning before every season.', points: ['Pre-summer service', 'Chemical deep clean', 'Performance report'] },
  { id: 'ac-amc', name: 'AC AMC', icon: 'amc', desc: 'Annual maintenance contracts with scheduled visits, gas top-up and priority breakdown support.', points: ['4 visits / year', 'Gas & labour covered', 'Priority booking'] },
  { id: 'vrf-central-services', name: 'VRF / Central AC Services', icon: 'vrf', desc: 'Specialised service for VRF, chillers, AHUs, FCUs and ductable systems with brand-trained engineers.', points: ['Load & balance checks', 'Controller programming', 'Annual contracts'] },
  { id: 'refrigeration-maintenance', name: 'Refrigeration Maintenance', icon: 'refrigeration', desc: 'Service for deep freezers, display coolers, water coolers and refrigeration counters.', points: ['Gas charging', 'Compressor overhaul', 'Door & gasket care'] },
  { id: 'cold-room-solutions', name: 'Cold Room Solutions', icon: 'coldroom', desc: 'Cold room installation, panel repair, controller calibration and refrigeration overhauls.', points: ['Panel & door repair', 'Controller calibration', 'Retrofit upgrades'] },
  { id: 'ac-rental', name: 'AC Rental', icon: 'rental', desc: 'Short and long term AC rentals for homes, offices, events and sites with free installation.', points: ['24 hour delivery', 'Free service', 'Flexible terms'] },
  { id: 'preventive-maintenance', name: 'Preventive Maintenance', icon: 'preventive', desc: 'Scheduled inspection programs that catch faults early and extend equipment life by years.', points: ['Checklist driven', 'Health reports', 'Reduced breakdowns'] },
  { id: 'turnkey-hvac', name: 'Turnkey HVAC Projects', icon: 'turnkey', desc: 'End-to-end HVAC project execution - design, supply, installation, testing and commissioning.', points: ['Single point contact', 'Drawings & approvals', 'Post-commission AMC'] }
];

/* ---------------- Clients ---------------- */
const CLIENTS = [
  { id: 'skyline-infracon', name: 'Skyline Infracon Pvt. Ltd.', line1: 'Skyline', line2: 'Infracon', tagline: 'Builders & Developers', initials: 'SI', shape: 'squircle', colors: ['#1D4ED8', '#22D3EE'], logo: 'assets/img/clients/skyline-infracon.svg' },
  { id: 'grand-meridian', name: 'Hotel Grand Meridian', line1: 'Grand', line2: 'Meridian', tagline: 'Hospitality Group', initials: 'GM', shape: 'shield', colors: ['#7C3AED', '#C4B5FD'], logo: 'assets/img/clients/grand-meridian.svg' },
  { id: 'frostfoods', name: 'FrostFoods India Ltd.', line1: 'Frost', line2: 'Foods', tagline: 'Frozen Foods', initials: 'FF', shape: 'circle', colors: ['#0891B2', '#67E8F9'], logo: 'assets/img/clients/frostfoods.svg' },
  { id: 'apex-hospital', name: 'Apex Multispeciality Hospital', line1: 'Apex', line2: 'Hospital', tagline: 'Multispeciality Care', initials: 'AH', shape: 'squircle', colors: ['#0F766E', '#34D399'], logo: 'assets/img/clients/apex-hospital.svg' },
  { id: 'quantum-techpark', name: 'Quantum Tech Park', line1: 'Quantum', line2: 'Tech Park', tagline: 'IT Campus', initials: 'QT', shape: 'hexagon', colors: ['#4338CA', '#818CF8'], logo: 'assets/img/clients/quantum-techpark.svg' },
  { id: 'nirman-mall', name: 'Nirman Mall & Retail', line1: 'Nirman', line2: 'Mall', tagline: 'Retail Complex', initials: 'NM', shape: 'circle', colors: ['#B45309', '#FBBF24'], logo: 'assets/img/clients/nirman-mall.svg' },
  { id: 'sunrise-schools', name: 'Sunrise Schools Trust', line1: 'Sunrise', line2: 'Schools', tagline: 'Education Trust', initials: 'SS', shape: 'shield', colors: ['#BE123C', '#FB7185'], logo: 'assets/img/clients/sunrise-schools.svg' },
  { id: 'bluewave-datacenter', name: 'BlueWave Data Centers', line1: 'BlueWave', line2: 'Data Centers', tagline: 'Precision Cooling', initials: 'BD', shape: 'hexagon', colors: ['#1E3A8A', '#38BDF8'], logo: 'assets/img/clients/bluewave-datacenter.svg' },
  { id: 'orion-coldchain', name: 'Orion Cold Chain Logistics', line1: 'Orion', line2: 'Cold Chain', tagline: 'Logistics & Storage', initials: 'OC', shape: 'squircle', colors: ['#0E7490', '#A5F3FC'], logo: 'assets/img/clients/orion-coldchain.svg' },
  { id: 'royal-bakehouse', name: 'Royal Bake & Confectionery', line1: 'Royal', line2: 'Bakehouse', tagline: 'Bakery Chain', initials: 'RB', shape: 'circle', colors: ['#9333EA', '#E9D5FF'], logo: 'assets/img/clients/royal-bakehouse.svg' }
];
