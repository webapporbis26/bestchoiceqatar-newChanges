const http = require('http');
const fs = require('fs');
const path = require('path');

const BASE_DIR = path.join(__dirname, 'BestChoiceQatar');
const VIEWS_DIR = path.join(BASE_DIR, 'Views');
const PORT = 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject'
};

const PORTFOLIO_MOBILE_ITEMS = [
  { Src: "/Uploads/portfolio-mobile/portfolio-mobile-1.webp", Title: "Security Guard Cabin", Alt: "Premium security guard cabin Qatar" },
  { Src: "/Uploads/portfolio-mobile/portfolio-mobile-2.webp", Title: "Container Office", Alt: "Modular container office waterfront Qatar" },
  { Src: "/Uploads/portfolio-mobile/portfolio-mobile-3.webp", Title: "Crane Installation", Alt: "Modular unit crane installation Qatar" },
  { Src: "/Uploads/portfolio-mobile/portfolio-mobile-4.webp", Title: "Site Cabin Project", Alt: "Portable site cabin construction Qatar" },
  { Src: "/Uploads/portfolio-mobile/portfolio-mobile-5.webp", Title: "Fleet Delivery", Alt: "Modular cabin fleet logistics Qatar" }
];

const PORTFOLIO_DESKTOP_ITEMS = [
  { Src: "/Uploads/WhatsApp Image 2026-04-22 at 3.41.42 PM (1).webp", Title: "Site Installation", Alt: "Site Project 1" },
  { Src: "/Uploads/WhatsApp Image 2026-04-22 at 3.41.42 PM.webp", Title: "Modular Unit", Alt: "Site Project 2" },
  { Src: "/Uploads/WhatsApp Image 2026-04-22 at 3.41.43 PM (1).webp", Title: "Custom Fabrication", Alt: "Site Project 3" },
  { Src: "/Uploads/WhatsApp Image 2026-04-22 at 3.41.43 PM (2).webp", Title: "Office Complex", Alt: "Site Project 4" },
  { Src: "/Uploads/WhatsApp Image 2026-04-22 at 3.41.43 PM (3).webp", Title: "Project Site", Alt: "Site Project 5" },
  { Src: "/Uploads/WhatsApp Image 2026-04-22 at 3.41.43 PM.webp", Title: "Cabin Interior", Alt: "Site Project 6" },
  { Src: "/Uploads/WhatsApp Image 2026-04-22 at 3.41.44 PM (1).webp", Title: "Industrial Unit", Alt: "Site Project 7" },
  { Src: "/Uploads/WhatsApp Image 2026-04-22 at 3.41.44 PM (2).webp", Title: "Doha Site Setup", Alt: "Site Project 8" },
  { Src: "/Uploads/WhatsApp Image 2026-04-22 at 3.41.45 PM.webp", Title: "Custom Complex", Alt: "Site Project 9" },
  { Src: "/Uploads/WhatsApp Image 2026-04-22 at 3.41.46 PM.webp", Title: "Mobile Unit", Alt: "Site Project 10" },
  { Src: "/Uploads/WhatsApp Image 2026-04-22 at 3.41.47 PM.webp", Title: "Industrial Office", Alt: "Site Project 11" },
  { Src: "/Uploads/WhatsApp Image 2026-04-22 at 3.41.48 PM.webp", Title: "Site Accommodation", Alt: "Site Project 12" }
];

const GALLERY_PAGE_IMAGES = [
  "WhatsApp Image 2026-04-22 at 3.41.42 PM (1).webp",
  "WhatsApp Image 2026-04-22 at 3.41.42 PM.webp",
  "WhatsApp Image 2026-04-22 at 3.41.43 PM (1).webp",
  "WhatsApp Image 2026-04-22 at 3.41.43 PM (2).webp",
  "WhatsApp Image 2026-04-22 at 3.41.43 PM (3).webp",
  "WhatsApp Image 2026-04-22 at 3.41.43 PM.webp",
  "WhatsApp Image 2026-04-22 at 3.41.44 PM (1).webp",
  "WhatsApp Image 2026-04-22 at 3.41.44 PM (2).webp",
  "WhatsApp Image 2026-04-22 at 3.41.44 PM.webp",
  "WhatsApp Image 2026-04-22 at 3.41.45 PM (1).webp",
  "WhatsApp Image 2026-04-22 at 3.41.45 PM (2).webp",
  "WhatsApp Image 2026-04-22 at 3.41.45 PM (3).webp",
  "WhatsApp Image 2026-04-22 at 3.41.45 PM.webp",
  "WhatsApp Image 2026-04-22 at 3.41.46 PM.webp",
  "WhatsApp Image 2026-04-22 at 3.41.47 PM (1).webp",
  "WhatsApp Image 2026-04-22 at 3.41.47 PM (2).webp",
  "WhatsApp Image 2026-04-22 at 3.41.47 PM (3).webp",
  "WhatsApp Image 2026-04-22 at 3.41.47 PM.webp",
  "WhatsApp Image 2026-04-22 at 3.41.48 PM (1).webp",
  "WhatsApp Image 2026-04-22 at 3.41.48 PM (2).webp",
  "WhatsApp Image 2026-04-22 at 3.41.48 PM.webp",
  "WhatsApp Image 2026-04-22 at 3.41.49 PM (1).webp",
  "WhatsApp Image 2026-04-22 at 3.41.49 PM (2).webp",
  "WhatsApp Image 2026-04-22 at 3.41.49 PM (3).webp",
  "WhatsApp Image 2026-04-22 at 3.41.49 PM.webp",
  "WhatsApp Image 2026-04-22 at 3.41.50 PM (1).webp",
  "WhatsApp Image 2026-04-22 at 3.41.50 PM.webp"
];

const PAGE_PRODUCT_MAP = {
  'modular-cabins': {
    Title: "Modular Cabins & Prefab Structures",
    SectionLabel: "Modular Engineering",
    Subtitle: "High-performance modular cabins and prefabricated structures in Qatar.",
    Description: "BestChoice Qatar delivers premier modular cabins engineered for commercial, industrial, and site accommodation needs across Qatar.",
    DetailedContent: "Our modular cabins offer rapid site deployment, heavy steel chassis, thermal insulation, and customizable layouts suitable for executive offices, site labs, and worker housing.",
    Image: "cabin-1.webp",
    ChildImages: ["cabin-1.webp", "cabin-2.webp", "cabin fabrication.webp"],
    Features: [
      "Heavy-duty structural steel frame for easy relocation",
      "Superior thermal and acoustic insulation",
      "T3 tropical climate-rated AC integration",
      "Concealed electrical wiring and network provisions"
    ],
    Specifications: [
      { Key: "Wall Panels", Value: "50mm / 100mm Fire-rated Sandwich Panels" },
      { Key: "Floor Structure", Value: "18mm Cement Board + Industrial Vinyl" },
      { Key: "Windows", Value: "Double-glazed Aluminum Sliding Windows" }
    ]
  },
  'steel-aluminum-fabrication': {
    Title: "Steel & Aluminum Fabrication",
    SectionLabel: "Precision Engineering",
    Subtitle: "Custom structural steel and aluminum products engineered for Qatar commercial projects.",
    Description: "Excellence in steel and aluminum fabrication. We specialize in custom doors, windows, structural steel frames, racks, and handrails engineered for commercial and industrial projects across Qatar.",
    DetailedContent: "Our state-of-the-art fabrication facility in Doha handles custom structural steel, aluminum cladding, architectural handrails, and industrial shelving. We use high-precision CNC machinery and certified welding processes to guarantee structural integrity and long-term durability in Gulf weather conditions.",
    Image: "Steel & Aluminum Fabrication.webp",
    ChildImages: ["Fabrication-1.webp", "Fabrication-2.webp", "General Contracting-1.webp", "General Contracting-2.webp"],
    Features: [
      "Heavy structural steel frame welding and assembly",
      "High-grade anodized aluminum profiles",
      "Custom industrial racks and heavy-duty shelving",
      "Anti-corrosion protective coatings and galvanizing"
    ],
    Specifications: [
      { Key: "Material Standard", Value: "ASTM A36 / ISO 9001 Structural Steel" },
      { Key: "Surface Finish", Value: "Hot-dip Galvanized / Epoxy Powder Coating" },
      { Key: "Application", Value: "Industrial Warehouses, Commercial Facades" }
    ]
  },
  'building-painting-contractor': {
    Title: "Building Painting Contractor",
    SectionLabel: "Protective Coatings",
    Subtitle: "Professional interior, exterior, and protective coating services for Qatar structures.",
    Description: "Professional interior and exterior painting contracting services in Qatar. Our technical team delivers surface preparation, protective coatings, industrial epoxy, and aesthetic finishes designed to withstand Gulf climate conditions.",
    DetailedContent: "We specialize in commercial, residential, and industrial painting solutions. From epoxy floor coatings in factories to UV-resistant thermal exterior coatings for high-rise buildings, our experienced painters enforce strict safety and surface-preparation protocols.",
    Image: "painting.webp",
    ChildImages: ["painting.webp", "General Contracting-1.webp", "General Contracting-2.webp", "General Contracting-3.webp"],
    Features: [
      "High-durability exterior weather-resistant paint systems",
      "Industrial epoxy flooring and anti-static coatings",
      "Fireproof and thermal reflective roof coatings",
      "Professional surface blasting and chemical cleaning"
    ],
    Specifications: [
      { Key: "Paint Type", Value: "High-grade Acrylic / Polyurethane / Epoxy" },
      { Key: "UV Resistance", Value: "T3 Climate Tested for 50°C+ Sun Exposure" },
      { Key: "Warranty", Value: "Multi-year Performance Guarantee" }
    ]
  },
  'general-contracting': {
    Title: "General Contracting Services",
    SectionLabel: "Turnkey Construction",
    Subtitle: "Full-spectrum civil, structural, and infrastructure contracting in Qatar.",
    Description: "Experienced general contracting services in Qatar. We manage turnkey building construction, site preparation, civil works, modifications, and facility upgrades with high engineering standards.",
    DetailedContent: "BestChoice Qatar provides end-to-end general contracting capabilities. Our engineering management team handles site excavation, foundation laying, structural steel erection, MEP integration, and final interior fit-out for commercial and government clients.",
    Image: "General Contracting.webp",
    ChildImages: ["General Contracting-1.webp", "General Contracting-2.webp", "General Contracting-3.webp", "General Contracting-4.webp", "General Contracting-5.webp", "General Contracting-6.webp"],
    Features: [
      "Turnkey site infrastructure and compound installation",
      "Civil foundation works and structural concrete",
      "MEP electrical, plumbing, and HVAC integration",
      "Comprehensive site safety and QA/QC management"
    ],
    Specifications: [
      { Key: "Service Scope", Value: "Civil, Structural, MEP, and Fit-out" },
      { Key: "Compliance", Value: "QCS 2014 & MME Regulations" },
      { Key: "Execution", Value: "Full Turnkey Project Delivery" }
    ]
  },
  'site-cabins-offices-welfare-accommodation': {
    Title: "Site Cabins, Offices & Welfare Accommodation",
    SectionLabel: "Compound Solutions",
    Subtitle: "Integrated modular complexes for site management and worker welfare in Qatar.",
    Description: "Comprehensive site cabin solutions in Qatar including administrative offices, meeting halls, mess blocks, and welfare facilities customized to contractor specifications.",
    DetailedContent: "Our welfare accommodation complexes provide full workforce facilities including dining halls, kitchen units, ablution blocks, and office quarters designed for maximum comfort and hygiene on site.",
    Image: "cabin-1.webp",
    ChildImages: ["cabin-1.webp", "cabin-2.webp", "cabin fabrication.webp", "container-office-flyer.webp"],
    Features: [
      "Modular inter-connectable office and welfare layouts",
      "Integrated HVAC climate control and ventilation",
      "Sanitary and plumbing ready for site connections",
      "Durable washable interiors for high occupancy"
    ],
    Specifications: [
      { Key: "Insulation", Value: "50mm / 100mm Fire-rated Sandwich Panels" },
      { Key: "Chassis", Value: "Heavy Duty ISMC Steel Frame" },
      { Key: "Relocation", Value: "100% Fully Portable" }
    ]
  },
  'portable-site-cabins': {
    Title: "Portable Site Cabins",
    SectionLabel: "Industrial Grade",
    Subtitle: "Rugged site units engineered for tough construction environments in Qatar.",
    Description: "High-durability portable site cabins engineered for harsh desert climates in Qatar. Turnkey delivery, AC integration, and heavy steel chassis for frequent site relocations.",
    DetailedContent: "Designed specifically for harsh desert environments, these units feature heavy steel chassis, sealed doors/windows, and tropical T3 air conditioning.",
    Image: "cabin-2.webp",
    ChildImages: ["cabin-1.webp", "cabin-2.webp", "cabin fabrication.webp"],
    Features: [
      "Heavy steel chassis for crane lifting",
      "T3 tropical AC provisions",
      "Fire-rated thermal insulation"
    ],
    Specifications: [
      { Key: "Frame", Value: "Structural C-Channel Steel" },
      { Key: "Wall Panel", Value: "Insulated Sandwich Panel" }
    ]
  },
  'portable-office-cabins': {
    Title: "Portable Office Cabins",
    SectionLabel: "Executive Workspace",
    Subtitle: "Professional, climate-controlled office units for site management.",
    Description: "Modern, insulated portable office cabins for project managers, engineers, and site staff in Qatar. Fully wired with electrical, networking, and T3 tropical AC units.",
    DetailedContent: "Provide your site engineers and project managers with quiet, comfortable workspaces featuring luxury vinyl floors, LED lighting, and concealed data wiring.",
    Image: "cabin-1.webp",
    ChildImages: ["cabin-1.webp", "cabin-2.webp"],
    Features: [
      "Concealed electrical and network cabling",
      "Executive interior wall and ceiling finishes",
      "Double-glazed sliding aluminum windows"
    ],
    Specifications: [
      { Key: "Electrical", Value: "Distribution Board with RCBO" },
      { Key: "Flooring", Value: "18mm Cement Board + Industrial Vinyl" }
    ]
  },
  'container-office-cabins': {
    Title: "Container Office Cabins",
    SectionLabel: "ISO Conversions",
    Subtitle: "Heavy-duty shipping container office conversions for project sites.",
    Description: "ISO shipping container office conversions tailored for executive site headquarters, site labs, and security posts across Qatar.",
    DetailedContent: "Customized 20ft and 40ft container offices featuring thermal insulation, steel doors, glass windows, and heavy security locks.",
    Image: "container-office-flyer.webp",
    ChildImages: ["container-office-flyer.webp", "cabin-1.webp"],
    Features: [
      "ISO Cor-Ten steel container shell",
      "Custom windows and personnel doors",
      "Heavy security shutters and locks"
    ],
    Specifications: [
      { Key: "Container Size", Value: "20ft (6m) / 40ft (12m)" },
      { Key: "Structure", Value: "Corten Steel ISO Frame" }
    ]
  },
  'security-guard-cabins': {
    Title: "Security Guard Cabins",
    SectionLabel: "Vigilance & Protection",
    Subtitle: "Compact guard posts with 360-degree visibility for gate checkpoints.",
    Description: "Compact, weather-proof security cabins for checkpoints, gate houses, and site entrances throughout Qatar.",
    DetailedContent: "Engineered for 24/7 guard shifts with 360-degree sliding windows, AC provisions, internal desk, and overhead lighting.",
    Image: "Fabrication-1.webp",
    ChildImages: ["Fabrication-1.webp", "Fabrication-2.webp"],
    Features: [
      "360-degree sliding window visibility",
      "Built-in guard counter and power points",
      "Compact footprint for gate checkpoints"
    ],
    Specifications: [
      { Key: "Dimensions", Value: "1.5m x 1.5m / 2m x 2m" },
      { Key: "Windows", Value: "4-Side Aluminum Sliding Glass" }
    ]
  },
  'toilet-sanitary-cabins': {
    Title: "Toilet & Sanitary Cabins",
    SectionLabel: "Hygiene & Sanitation",
    Subtitle: "Hygienic, washable portable toilet blocks for workers and staff.",
    Description: "Hygienic portable toilet blocks and sanitary units equipped with water tanks, waste connections, and durable washable interiors.",
    DetailedContent: "Equipped with ceramic or stainless steel toilets, wash basins, mirrors, exhaust fans, and slip-resistant fiberglass flooring.",
    Image: "Fabrication-2.webp",
    ChildImages: ["Fabrication-2.webp", "cabin-2.webp"],
    Features: [
      "Washable non-porous internal walls",
      "Integrated water tanks and waste plumbing",
      "High-flow ventilation and exhaust fans"
    ],
    Specifications: [
      { Key: "Fixtures", Value: "Ceramic Western / Arabic WC & Basins" },
      { Key: "Floor", Value: "Anti-slip Heavy Fiber Sheet" }
    ]
  },
  'single-double-story-cabins': {
    Title: "Single & Double Story Cabins",
    SectionLabel: "Modular Expansion",
    Subtitle: "Stacked two-story cabin complexes for compact site footprints.",
    Description: "Modular double story cabin structures for space-constrained sites in Qatar, offering maximum floor area with steel staircase access.",
    DetailedContent: "Stackable cabin designs featuring reinforced lower roof beams, external steel staircases, and handrails for 2-story site offices.",
    Image: "cabin-2.webp",
    ChildImages: ["cabin-1.webp", "cabin-2.webp"],
    Features: [
      "Heavy load-bearing structural columns",
      "External galvanized steel staircase",
      "Double floor area on single footprint"
    ],
    Specifications: [
      { Key: "Structure", Value: "Engineered 2-Story Stackable Chassis" },
      { Key: "Access", Value: "Heavy Duty External Steel Staircase" }
    ]
  },
  'labor-camps-accommodation': {
    Title: "Labor Camps Accommodation",
    SectionLabel: "Workforce Housing",
    Subtitle: "Compliant workforce accommodation blocks for Qatar project sites.",
    Description: "Workforce accommodation blocks built to Qatar Ministry of Labor standards with fire-rated insulation and comfortable living spaces.",
    DetailedContent: "Mass accommodation quarters designed according to QCS and Ministry of Labor guidelines with fire doors and climate control.",
    Image: "cabin fabrication.webp",
    ChildImages: ["cabin fabrication.webp", "cabin-2.webp"],
    Features: [
      "Compliant with Qatar MOL housing regulations",
      "Fire-rated sandwich panel construction",
      "High-capacity electrical distribution"
    ],
    Specifications: [
      { Key: "Compliance", Value: "Ministry of Labor Standard" },
      { Key: "Capacity", Value: "Multi-bed Workforce Layouts" }
    ]
  },
  'portable-toilets': {
    Title: "Portable Toilets",
    SectionLabel: "Sanitation Solutions",
    Subtitle: "Standalone portable toilets for temporary sites and events.",
    Description: "Durable portable toilet units for site personnel, outdoor events, and temporary facilities in Qatar.",
    DetailedContent: "Lightweight and easy-to-clean standalone sanitary units equipped with waste holding tank, ventilation, and soap dispenser.",
    Image: "Fabrication-2.webp",
    ChildImages: ["Fabrication-2.webp"],
    Features: [
      "Self-contained waste holding tank",
      "UV-stabilized durable exterior",
      "Foot-pump operated wash basin"
    ],
    Specifications: [
      { Key: "Tank Capacity", Value: "250L Integrated Waste Tank" },
      { Key: "Material", Value: "High-density Polyethylene" }
    ]
  },
  'elvsolutions': {
    Title: "ELV & Security Systems",
    SectionLabel: "Network & Security",
    Subtitle: "Extra Low Voltage cabling, CCTV, and access control infrastructure.",
    Description: "Extra Low Voltage (ELV) solutions including CCTV security systems, access control, structured cabling, and fiber networks for Qatar infrastructure.",
    DetailedContent: "End-to-end ELV system installation for site offices, commercial buildings, and industrial facilities in Qatar.",
    Image: "ELV-security-systems-in-qatar.webp",
    ChildImages: ["ELV-security-systems-in-qatar.webp", "opticalfibre.webp"],
    Features: [
      "IP CCTV surveillance and NVR installation",
      "Biometric access control and gate barriers",
      "Structured Cat6a copper network cabling"
    ],
    Specifications: [
      { Key: "Systems", Value: "CCTV, Access Control, PABX, Intercom" },
      { Key: "Cabling", Value: "Cat6 / Cat6A & Fiber Backbones" }
    ]
  },
  'optical-fibre-networks': {
    Title: "Optical Fibre Networks",
    SectionLabel: "Fiber Connectivity",
    Subtitle: "High-speed optical fiber cabling and OSP infrastructure in Qatar.",
    Description: "High-speed optical fiber installation, OSP cabling, copper networks, and telecom infrastructure across Qatar.",
    DetailedContent: "Certified optical fiber splicing, OTDR testing, underground ducting, and OSP cabling for telecom and industrial networks.",
    Image: "opticalfibre.webp",
    ChildImages: ["opticalfibre.webp", "fiber-optic-cable.webp", "copper-networks1.webp"],
    Features: [
      "Singlemode & Multimode fiber splicing",
      "OTDR testing and link commissioning",
      "OSP outdoor armor cable trenching"
    ],
    Specifications: [
      { Key: "Fiber Type", Value: "OS2 Singlemode / OM3-OM4 Multimode" },
      { Key: "Testing", Value: "Fluke Networks OTDR Certified" }
    ]
  }
};

function stripFunctionsBlocks(html) {
  let res = [];
  let i = 0;
  while (i < html.length) {
    if (html.slice(i).match(/^@functions\s*\{/)) {
      let depth = 1;
      i = html.indexOf('{', i) + 1;
      while (i < html.length && depth > 0) {
        if (html[i] === '{') depth++;
        else if (html[i] === '}') depth--;
        i++;
      }
    } else {
      res.push(html[i]);
      i++;
    }
  }
  return res.join('');
}

function stripRazorBlocks(html) {
  let res = [];
  let i = 0;
  while (i < html.length) {
    if (i + 1 < html.length && html[i] === '@' && html[i + 1] === '{') {
      let depth = 1;
      i += 2;
      while (i < html.length && depth > 0) {
        if (html[i] === '{') depth++;
        else if (html[i] === '}') depth--;
        i++;
      }
    } else {
      res.push(html[i]);
      i++;
    }
  }
  return res.join('');
}

function cleanRazor(code, viewName) {
  if (!code) return '';

  let html = code;

  // 0. Strip @functions { ... } blocks FIRST!
  html = stripFunctionsBlocks(html);

  // 1. Strip Razor comments @* ... *@ FIRST!
  html = html.replace(/@\*[\s\S]*?\*@/g, '');

  // 2. Unwrap Razor string expressions @("URL") -> URL
  html = html
    .replace(/@\("([^"]+)"\)/g, '$1')
    .replace(/@\('([^']+)'\)/g, '$1');

  // Render Gallery page grid loop BEFORE stripRazorBlocks!
  const galleryGridHtml = GALLERY_PAGE_IMAGES.map(img => `
    <div class="col-lg-3 col-md-4 col-sm-6" data-aos="fade-up">
      <a href="/Uploads/${img}" class="glightbox gallery-item position-relative overflow-hidden shadow-sm d-block" style="border-radius: 15px; cursor: pointer; border: 1px solid #eee;">
        <img src="/Uploads/${img}" class="img-fluid w-100" style="height: 250px; object-fit: cover;" alt="BestChoice Qatar Modular Cabin Project">
        <div class="gallery-overlay position-absolute inset-0 d-flex align-items-center justify-content-center" style="background: rgba(0,0,0,0.4); opacity: 0; transition: all 0.3s ease; top:0; left:0; right:0; bottom:0;">
          <span class="material-symbols-outlined text-white" style="font-size: 3rem; color: #ffcc00 !important;">zoom_in</span>
        </div>
      </a>
    </div>
  `).join('\n');
  html = html.replace(/@foreach\s*\(\s*var\s+img\s+in\s+images\s*\)[\s\S]*?^\s*\}/m, galleryGridHtml);

  // 3. Resolve Product / Service Data for viewName
  const normalizedKey = (viewName || '').toLowerCase().replace(/^\//, '').replace(/^product\//, '');
  const product = PAGE_PRODUCT_MAP[normalizedKey] || PAGE_PRODUCT_MAP['modular-cabins'];

  // Replace entire ProductDetails Gallery Section conditional block (@if (product.GalleryImagesMobile...)) BEFORE loop parsing!
  const gallerySectionHtml = `
    <div class="swiper gallery-swiper" data-aos="fade-up">
      <div class="swiper-wrapper">
        ${(product.ChildImages || []).map(img => `
          <div class="swiper-slide">
            <a href="/Uploads/Products/${img}" class="glightbox" data-gallery="product-gallery">
              <img src="/Uploads/Products/${img}" class="img-fluid rounded-3 shadow-sm w-100" alt="${product.Title}">
            </a>
          </div>
        `).join('\n')}
      </div>
      <div class="swiper-pagination mt-4"></div>
    </div>
  `;
  html = html.replace(/@if\s*\(\s*product\.GalleryImagesMobile[\s\S]*?<\/section>/m, gallerySectionHtml + '\n    </section>');

  // Replace ProductDetails.cshtml properties
  html = html.replace(/@Url\.Content\(product\.MainImage\)/g, `/Uploads/Products/${product.Image}`);
  html = html.replace(/@product\.MainImage/g, `/Uploads/Products/${product.Image}`);
  html = html.replace(/@product\.Title/g, product.Title);
  html = html.replace(/@product\.Subtitle/g, product.Subtitle);
  html = html.replace(/@Html\.Raw\(product\.Description\)/g, product.Description);
  html = html.replace(/@product\.Description/g, product.Description);
  html = html.replace(/@product\.DetailedContent/g, product.DetailedContent);
  html = html.replace(/@product\.SectionLabel/g, product.SectionLabel);
  html = html.replace(/@product\.MetaDescription/g, product.Description.replace(/<[^>]+>/g, ''));
  html = html.replace(/@product\.MetaKeywords/g, product.Title + ', porta cabin qatar, bestchoice qatar');

  // Replace @_product.Title, @_product.Description, @_product.Image for service views
  html = html.replace(/@_?product\.Title/g, product.Title);
  html = html.replace(/@Html\.Raw\(_?product\.Description\)/g, product.Description);
  html = html.replace(/@_?product\.Description/g, product.Description);
  html = html.replace(/@_?product\.Image/g, product.Image);

  // Render sidebar category list in ProductDetails
  const sidebarNavHtml = Object.keys(PAGE_PRODUCT_MAP).map(key => {
    const item = PAGE_PRODUCT_MAP[key];
    const isActive = key === normalizedKey ? 'active' : '';
    return `<li><a href="/product/${key}" class="${isActive}">${item.Title} <i class="bi bi-chevron-right"></i></a></li>`;
  }).join('\n');
  html = html.replace(/@foreach\s*\(\s*var\s+item\s+in\s+allProducts\s*\)[\s\S]*?^\s*\}/m, sidebarNavHtml);

  // Render product.Features loop in ProductDetails
  const featuresHtml = (product.Features || []).map(feat => `
    <div class="d-flex align-items-start mb-3">
      <span class="material-symbols-outlined text-bc-yellow me-3 mt-1">check_circle</span>
      <span class="fs-6 fw-medium text-dark">${feat}</span>
    </div>
  `).join('\n');
  html = html.replace(/@foreach\s*\(\s*var\s+feature\s+in\s+product\.Features\s*\)[\s\S]*?^\s*\}/m, featuresHtml);

  // Render product.Specifications loop in ProductDetails
  const specsHtml = (product.Specifications || []).map(spec => `
    <div class="row py-3 border-bottom align-items-center">
      <div class="col-sm-4 fw-bold text-muted text-uppercase fs-6">${spec.Key}</div>
      <div class="col-sm-8 text-dark fw-semibold fs-6">${spec.Value}</div>
    </div>
  `).join('\n');
  html = html.replace(/@foreach\s*\(\s*var\s+spec\s+in\s+product\.Specifications\s*\)[\s\S]*?^\s*\}/m, specsHtml);

  // Replace ChildImages loops in service views
  const childSlidesHtml = (product.ChildImages || []).map(img => `
    <div class="swiper-slide"><a href="/Uploads/Products/${img}" class="glightbox"><img src="/Uploads/Products/${img}" class="img-fluid" alt="${product.Title}"></a></div>
  `).join('\n');

  html = html.replace(/@if\s*\(!string\.IsNullOrEmpty\(_?product\.ChildImages\)\)[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g, childSlidesHtml + '</div></div></div>');
  html = html.replace(/@if\s*\(!string\.IsNullOrEmpty\(_?product\.ChildImages\)\)[\s\S]*?^\s*\}/m, childSlidesHtml);

  // Replace for (int j = 1; j <= 6; j++) loops in site-cabins-offices page
  const siteCabinSlides = [2,3,4,5,6,7].map(j => `
    <div class="swiper-slide"><a href="/Uploads/WhatsApp Image 2026-04-22 at 3.41.4${j} PM.webp" class="glightbox"><img src="/Uploads/WhatsApp Image 2026-04-22 at 3.41.4${j} PM.webp" class="img-fluid" alt="Modular Installation"></a></div>
  `).join('\n');

  html = html.replace(/@?for\s*\(int\s+j\s*=\s*1;\s*j\s*<=\s*6;\s*j\+\+\)[\s\S]*?^\s*\}/m, siteCabinSlides);

  // 4. Render Home Page Portfolio Loops & Clients
  const mobileSlidesHtml = PORTFOLIO_MOBILE_ITEMS.map(item => `
    <div class="swiper-slide">
      <div class="work-card position-relative overflow-hidden shadow">
        <img src="${item.Src}" class="img-fluid w-100" alt="${item.Alt}" loading="lazy">
        <div class="work-overlay position-absolute d-flex flex-column justify-content-end p-3">
          <h6 class="text-white fw-bold mb-0">${item.Title}</h6>
        </div>
      </div>
    </div>
  `).join('\n');

  html = html.replace(/@foreach\s*\(\s*var\s+item\s+in\s+portfolioMobileItems\s*\)[\s\S]*?^\s*\}/m, mobileSlidesHtml);

  const desktopSlidesHtml = PORTFOLIO_DESKTOP_ITEMS.map(item => `
    <div class="swiper-slide">
      <div class="work-card position-relative overflow-hidden shadow-sm">
        <img src="${item.Src}" class="img-fluid w-100" alt="${item.Alt}">
        <div class="work-overlay position-absolute d-flex flex-column justify-content-end p-3">
          <h6 class="text-white fw-bold mb-0">${item.Title}</h6>
        </div>
      </div>
    </div>
  `).join('\n');

  html = html.replace(/@foreach\s*\(\s*var\s+item\s+in\s+portfolioItems\s*\)[\s\S]*?^\s*\}/m, desktopSlidesHtml);

  const clientsSlidesHtml = Array.from({ length: 12 }, (_, i) => `
    <div class="swiper-slide">
      <div class="client-logo-wrap">
        <img src="/Uploads/client-${i + 1}.webp" alt="Client ${i + 1}" class="client-logo" loading="lazy">
      </div>
    </div>
  `).join('\n');

  html = html.replace(/@if\s*\(_clients[\s\S]*?\}\s*\}\s*else\s*\{[\s\S]*?\}\s*\}/g, clientsSlidesHtml);

  // 5. Strip ALL C# @{ ... } blocks cleanly using depth matching
  html = stripRazorBlocks(html);

  return html
    // Replace Url.Content("~/...") -> "/..."
    .replace(/@Url\.Content\("~\/([^"]+)"\)/g, '/$1')
    .replace(/@Url\.Content\('~\/([^']+)'\)/g, '/$1')
    // Replace ~/... -> /...
    .replace(/~\/(Content|Scripts|Uploads|fonts|assets)\//g, '/$1/')
    // Normalize case for asset paths (/content -> /Content)
    .replace(/\/content\//gi, '/Content/')
    // Replace settings variables
    .replace(/@settings\.Mobile1/g, '+974 5555 1234')
    .replace(/@settings\.Email/g, 'info@bestchoiceqatar.net')
    .replace(/@settings\.Location/g, 'Industrial Area, Doha, Qatar')
    .replace(/@settings\.WhatsappNumber/g, '97455551234')
    .replace(/@settings\.Whatsup/g, 'https://wa.me/97455551234')
    .replace(/@settings\.Instagram/g, '#')
    .replace(/@settings\.Facebook/g, '#')
    .replace(/@settings\.Twitter/g, '#')
    // Replace ViewBag variables
    .replace(/@ViewBag\.Title/g, 'BestChoice Qatar - Porta Cabin & Steel Fabrication')
    .replace(/@ViewBag\.description/g, 'Leading porta cabin suppliers in Qatar')
    .replace(/@ViewBag\.keywords/g, 'porta cabin Qatar, steel fabrication Qatar')
    // Clean Razor directives & remaining C# statements
    .replace(/@using\s+[\w\.]+/g, '')
    .replace(/@model\s+[\w\.\<\>]+/g, '')
    .replace(/@foreach\s*\([\s\S]*?\)\s*\{([\s\S]*?)\}/g, '$1')
    .replace(/@if\s*\([\s\S]*?\)\s*\{([\s\S]*?)\}/g, '$1')
    .replace(/@else\s*\{([\s\S]*?)\}/g, '$1')
    // Clean leftover inline variables
    .replace(/@([a-zA-Z0-9_\.]+)/g, '$1');
}

function renderView(viewName) {
  const layoutPath = path.join(VIEWS_DIR, 'Shared', '_Layout.cshtml');
  let layout = fs.existsSync(layoutPath) ? fs.readFileSync(layoutPath, 'utf8') : '@RenderBody()';

  // Handle partials in layout
  layout = layout.replace(/@Html\.Partial\("([^"]+)"\)/g, (match, partialName) => {
    let pPath = path.join(VIEWS_DIR, 'Shared', partialName + '.cshtml');
    if (!fs.existsSync(pPath)) {
      pPath = path.join(VIEWS_DIR, 'Home', partialName + '.cshtml');
    }
    if (fs.existsSync(pPath)) {
      return fs.readFileSync(pPath, 'utf8');
    }
    return '';
  });

  // Resolve target view
  let viewPath = path.join(VIEWS_DIR, 'Home', viewName + '.cshtml');
  if (!fs.existsSync(viewPath)) {
    viewPath = path.join(VIEWS_DIR, 'Home', viewName + '.html');
  }

  let body = '';
  if (fs.existsSync(viewPath)) {
    body = fs.readFileSync(viewPath, 'utf8');
  } else {
    body = `<div class="container py-5"><h1>Page Not Found: ${viewName}</h1></div>`;
  }

  // Combine Layout + View Body
  let pageHtml = layout.replace('@RenderBody()', body);
  return cleanRazor(pageHtml, viewName);
}

// Case-insensitive file existence resolution helper
function resolveFilePath(baseDir, relativeUrlPath) {
  let decodedPath = '';
  try {
    decodedPath = decodeURIComponent(relativeUrlPath);
  } catch (e) {
    decodedPath = relativeUrlPath;
  }

  let normalized = path.normalize(decodedPath).replace(/^(\.\.[\/\\])+/, '');
  let fullPath = path.join(baseDir, normalized);

  if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
    return fullPath;
  }

  // Case-insensitive lookup fallback
  const parts = normalized.split(/[\/\\]/).filter(Boolean);
  let currentDir = baseDir;

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (!fs.existsSync(currentDir) || !fs.statSync(currentDir).isDirectory()) {
      return null;
    }
    const children = fs.readdirSync(currentDir);
    const match = children.find(c => c.toLowerCase() === part.toLowerCase());
    if (match) {
      currentDir = path.join(currentDir, match);
    } else {
      return null;
    }
  }

  if (fs.existsSync(currentDir) && fs.statSync(currentDir).isFile()) {
    return currentDir;
  }
  return null;
}

const server = http.createServer((req, res) => {
  let reqUrl = req.url.split('?')[0];

  // Resolve file path with case-insensitivity & URL decoding
  let filePath = resolveFilePath(BASE_DIR, reqUrl);

  // If jpeg/jpg/png image in Uploads is requested, check if webp version exists
  if (filePath) {
    const ext = path.extname(filePath).toLowerCase();
    if (['.jpg', '.jpeg', '.png'].includes(ext) && filePath.includes(path.join('BestChoiceQatar', 'Uploads'))) {
      const webpCandidate = filePath.substring(0, filePath.lastIndexOf('.')) + '.webp';
      if (fs.existsSync(webpCandidate) && fs.statSync(webpCandidate).isFile()) {
        filePath = webpCandidate;
      }
    }
  }

  if (filePath && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const fileExt = path.extname(filePath).toLowerCase();
    const mime = MIME_TYPES[fileExt] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': mime });
    return fs.createReadStream(filePath).pipe(res);
  }

  // Routing for Razor Views (including ASP.NET MVC product/{slug} routing)
  let cleanUrl = reqUrl.replace(/^\//, '');
  let viewName = 'Index';

  if (reqUrl === '/' || reqUrl === '/index' || reqUrl === '/index.html') {
    viewName = 'Index';
  } else if (cleanUrl.startsWith('product/')) {
    const slug = cleanUrl.replace(/^product\//, '');
    let slugPath = path.join(VIEWS_DIR, 'Home', slug + '.cshtml');
    if (fs.existsSync(slugPath)) {
      viewName = slug;
    } else {
      viewName = 'ProductDetails';
    }
  } else {
    viewName = cleanUrl;
  }

  try {
    const html = renderView(viewName);
    res.writeHead(200, { 'Content-Type': MIME_TYPES['.html'] });
    res.end(html);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Error rendering view: ' + err.message);
  }
});

server.listen(PORT, () => {
  console.log(`[BestChoiceQatar Preview Server] Running at http://localhost:${PORT}`);
});
