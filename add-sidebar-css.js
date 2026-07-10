const fs = require('fs');
const path = require('path');

const CSS_TO_ADD = `
    /* ===== Sidebar ===== */
    .sidebar-toggle {
      background: rgba(255,255,255,0.2);
      border: none;
      color: #fff;
      font-size: 20px;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all .2s;
    }
    .sidebar-toggle:hover { background: rgba(255,255,255,0.35); }
    .sidebar-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.3);
      z-index: 200;
      display: none;
      opacity: 0;
      transition: opacity .3s;
    }
    .sidebar-overlay.open { display: block; opacity: 1; }
    .sidebar {
      position: fixed;
      top: 0; left: -280px;
      width: 260px;
      height: 100vh;
      background: #fff;
      z-index: 201;
      box-shadow: 4px 0 24px rgba(0,0,0,0.1);
      transition: left .3s cubic-bezier(.34,1.56,.64,1);
      padding: 24px 16px;
      overflow-y: auto;
    }
    .sidebar.open { left: 0; }
    .sidebar .close-btn {
      position: absolute;
      top: 12px;
      right: 12px;
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: var(--text-dim);
    }
    .sidebar .close-btn:hover { color: var(--text); }
    .sidebar h4 {
      font-size: 14px;
      color: var(--pink);
      margin: 20px 0 8px;
      padding-bottom: 4px;
      border-bottom: 2px solid var(--border);
    }
    .sidebar a {
      display: block;
      padding: 10px 12px;
      border-radius: 12px;
      color: var(--text);
      font-size: 14px;
      font-weight: 600;
      transition: all .2s;
    }
    .sidebar a:hover {
      background: var(--bg);
      color: var(--pink);
    }
    .sidebar a .emoji { margin-right: 8px; }
    .page-layout {
      display: flex;
      gap: 24px;
      max-width: 1100px;
      margin: 0 auto;
      padding: 0 24px;
    }
    .page-main { flex: 1; min-width: 0; }
    .side-nav {
      width: 200px;
      flex-shrink: 0;
      display: none;
      position: sticky;
      top: 80px;
      align-self: flex-start;
    }
    .side-nav-inner {
      background: var(--bg-card);
      border-radius: 20px;
      padding: 16px;
      box-shadow: var(--shadow);
    }
    .side-nav h4 {
      font-size: 13px;
      color: var(--pink);
      margin-bottom: 8px;
      padding-bottom: 4px;
      border-bottom: 2px solid var(--border);
    }
    .side-nav a {
      display: block;
      padding: 8px 12px;
      border-radius: 10px;
      color: var(--text);
      font-size: 13px;
      font-weight: 600;
      transition: all .2s;
    }
    .side-nav a:hover { background: var(--bg); color: var(--pink); }
    @media (min-width: 901px) {
      .side-nav { display: block; }
    }
    @media (max-width: 900px) {
      .page-layout { flex-direction: column; }
      .side-nav { width: 100%; position: static; display: block; }
      .side-nav-inner { display: flex; flex-wrap: wrap; gap: 4px; padding: 12px; }
      .side-nav-inner a { padding: 6px 10px; font-size: 12px; }
      .side-nav h4 { width: 100%; }
    }
`;

const rootPages = [
  'characters.html', 'maps.html', 'outfits.html',
  'beginner.html', 'codes.html', 'tierlist.html',
  'download.html', 'about.html', 'faq.html',
  'privacy.html', 'contact.html', 'bugs.html',
  'gallery.html', 'forum.html', 'search.html'
];

const subdirPages = [];
for (const dir of ['characters', 'maps', 'outfits']) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
  files.forEach(f => subdirPages.push(`${dir}/${f}`));
}

const blogPages = fs.readdirSync('blog').filter(f => f.endsWith('.html'));

const allPages = [...rootPages, ...subdirPages, ...blogPages.map(f => `blog/${f}`)];

for (const filePath of allPages) {
  if (!fs.existsSync(filePath)) continue;
  
  let html = fs.readFileSync(filePath, 'utf-8');
  const original = html;
  
  // Add sidebar CSS before the closing </style>
  if (html.includes('</style>') && !html.includes('.sidebar-toggle')) {
    html = html.replace('</style>', `${CSS_TO_ADD}</style>`);
  }
  
  // Fix nav not wrapping properly - ensure header-inner has flex
  if (html.includes('.header-inner{') && !html.includes('justify-content:')) {
    html = html.replace('.header-inner{', '.header-inner{display:flex;align-items:center;justify-content:space-between;');
  }
  
  if (html !== original) {
    fs.writeFileSync(filePath, html);
    console.log(`  ✅ CSS: ${filePath}`);
  } else {
    console.log(`  = CSS: ${filePath} (no changes)`);
  }
}

console.log('\nCSS update done!');
