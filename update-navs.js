const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const dir = process.cwd();

// New header HTML
const SIDEBAR_HTML = `
<button class="sidebar-toggle" onclick="toggleSidebar()" title="More pages">☰</button>
    <div class="logo">🥚 Eggy<span>Wiki</span></div>
    <nav>
      <a href="index.html">Home</a>
      <a href="characters.html">Characters</a>
      <a href="maps.html">Maps</a>
      <a href="outfits.html">Outfits</a>
      <a href="beginner.html">Guide</a>
      <a href="codes.html">Codes</a>
      <a href="tierlist.html">Tier List</a>
    <button class="music-btn" id="musicBtn" onclick="tm()" title="Play Eggy Party theme">🎵</button>
    </nav>
`;

const SIDEBAR_PANEL = `
<!-- ===== Sidebar ===== -->
<div class="sidebar-overlay" id="sidebarOverlay" onclick="toggleSidebar()"></div>
<div class="sidebar" id="sidebar">
  <button class="close-btn" onclick="toggleSidebar()">✕</button>
  <h4>📚 More</h4>
  <a href="blog/index.html"><span class="emoji">📝</span>Blog</a>
  <a href="download.html"><span class="emoji">📥</span>Download</a>
  <a href="gallery.html"><span class="emoji">🖼️</span>Gallery</a>
  <a href="forum.html"><span class="emoji">💬</span>Forum</a>
  <a href="about.html"><span class="emoji">ℹ️</span>About</a>
  <a href="faq.html"><span class="emoji">❓</span>FAQ</a>
  <a href="privacy.html"><span class="emoji">🔒</span>Privacy</a>
  <a href="contact.html"><span class="emoji">📧</span>Contact</a>
  <a href="bugs.html"><span class="emoji">🐛</span>Bugs</a>
  <a href="search.html"><span class="emoji">🔍</span>Search</a>
</div>
`;

const SIDE_NAV_HTML = `
<div class="side-nav">
  <div class="side-nav-inner">
    <h4>📚 More Pages</h4>
    <a href="blog/index.html">📝 Blog</a>
    <a href="download.html">📥 Download</a>
    <a href="gallery.html">🖼️ Gallery</a>
    <a href="forum.html">💬 Forum</a>
    <a href="about.html">ℹ️ About</a>
    <a href="faq.html">❓ FAQ</a>
    <a href="privacy.html">🔒 Privacy</a>
    <a href="contact.html">📧 Contact</a>
    <a href="bugs.html">🐛 Bugs</a>
    <a href="search.html">🔍 Search</a>
  </div>
</div>
`;

const TOGGLE_SCRIPT = `
  function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('sidebarOverlay').classList.toggle('open');
  }
`;

const TOGGLE_BTN_SCRIPT = `<script>${TOGGLE_SCRIPT}</script>`;

// Root HTML pages to process
const rootPages = [
  'characters.html', 'maps.html', 'outfits.html',
  'beginner.html', 'codes.html', 'tierlist.html',
  'download.html', 'about.html', 'faq.html',
  'privacy.html', 'contact.html', 'bugs.html',
  'gallery.html', 'forum.html', 'search.html',
  'free-accelerator.html'
];

// Blog pages
const blogPages = fs.readdirSync('blog').filter(f => f.endsWith('.html'));

// Subdirectory pages
const subdirPages = [];
for (const dir of ['characters', 'maps', 'outfits']) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
  files.forEach(f => subdirPages.push(`${dir}/${f}`));
}

// Process each file
function processFile(filePath, isSubDir) {
  if (!fs.existsSync(filePath)) {
    console.log(`  SKIP: ${filePath} not found`);
    return;
  }
  
  let html = fs.readFileSync(filePath, 'utf-8');
  const original = html;
  const prefix = isSubDir ? '../' : '';
  
  // 1. Replace the header navigation
  // Find the header section
  const headerMatch = html.match(/<header>[\s\S]*?<\/header>/);
  if (!headerMatch) {
    console.log(`  SKIP: No header in ${filePath}`);
    return;
  }
  
  const newHeader = `<header>
  <div class="header-inner">
    ${SIDEBAR_HTML.replace('href="index.html"', `href="${prefix}index.html"`)
      .replace('href="characters.html"', `href="${prefix}characters.html"`)
      .replace('href="maps.html"', `href="${prefix}maps.html"`)
      .replace('href="outfits.html"', `href="${prefix}outfits.html"`)
      .replace('href="beginner.html"', `href="${prefix}beginner.html"`)
      .replace('href="codes.html"', `href="${prefix}codes.html"`)
      .replace('href="tierlist.html"', `href="${prefix}tierlist.html"`)}
    </div>
  </header>`;
  
  html = html.replace(/<header>[\s\S]*?<\/header>/, newHeader);
  
  // 2. Add sidebar panel after </header>
  const sidebarPanel = SIDEBAR_PANEL.replace(/href="blog\/index\.html"/g, `href="${prefix}blog/index.html"`)
    .replace(/href="download\.html"/g, `href="${prefix}download.html"`)
    .replace(/href="gallery\.html"/g, `href="${prefix}gallery.html"`)
    .replace(/href="forum\.html"/g, `href="${prefix}forum.html"`)
    .replace(/href="about\.html"/g, `href="${prefix}about.html"`)
    .replace(/href="faq\.html"/g, `href="${prefix}faq.html"`)
    .replace(/href="privacy\.html"/g, `href="${prefix}privacy.html"`)
    .replace(/href="contact\.html"/g, `href="${prefix}contact.html"`)
    .replace(/href="bugs\.html"/g, `href="${prefix}bugs.html"`)
    .replace(/href="search\.html"/g, `href="${prefix}search.html"`);
  
  html = html.replace('</header>', `</header>\n\n${sidebarPanel}`);
  
  // 3. Add side-nav after page-header or hero section
  // Insert side-nav + page-main wrapping
  const pageHeaderRegex = /(<div class="page-header">[\s\S]*?<\/div>)/;
  const pageHeaderMatch = html.match(pageHeaderRegex);
  
  if (pageHeaderMatch) {
    const sideNavHtml = SIDE_NAV_HTML.replace(/href="blog\/index\.html"/g, `href="${prefix}blog/index.html"`)
      .replace(/href="download\.html"/g, `href="${prefix}download.html"`)
      .replace(/href="gallery\.html"/g, `href="${prefix}gallery.html"`)
      .replace(/href="forum\.html"/g, `href="${prefix}forum.html"`)
      .replace(/href="about\.html"/g, `href="${prefix}about.html"`)
      .replace(/href="faq\.html"/g, `href="${prefix}faq.html"`)
      .replace(/href="privacy\.html"/g, `href="${prefix}privacy.html"`)
      .replace(/href="contact\.html"/g, `href="${prefix}contact.html"`)
      .replace(/href="bugs\.html"/g, `href="${prefix}bugs.html"`)
      .replace(/href="search\.html"/g, `href="${prefix}search.html"`);
    
    const layoutStart = `\n<div class="page-layout">\n${sideNavHtml}\n<div class="page-main">\n`;
    html = html.replace(pageHeaderMatch[0], `${pageHeaderMatch[0]}\n${layoutStart}`);
    
    // Close page-layout before footer
    html = html.replace('</footer>', '</div><!-- /page-main -->\n</div><!-- /page-layout -->\n</footer>');
  }
  
  // 4. Add toggleSidebar function before </body>
  if (html.includes('</body>')) {
    const toggleScript = `\n<script>${TOGGLE_SCRIPT}</script>\n`;
    html = html.replace('</body>', `${toggleScript}</body>`);
  }
  
  // 5. Clean footer duplicates
  html = html.replace(/(href="[^"]*">[^<]+<\/a>)\s*\1/g, '$1');
  
  if (html !== original) {
    fs.writeFileSync(filePath, html);
    console.log(`  ✅ ${filePath}`);
  } else {
    console.log(`  = ${filePath} (no changes)`);
  }
}

// Process
console.log('=== Root pages ===');
rootPages.forEach(f => processFile(f, false));

console.log('\n=== Subdirectory pages ===');
subdirPages.forEach(f => processFile(f, true));

console.log('\n=== Blog pages ===');
blogPages.forEach(f => processFile(`blog/${f}`, true));

console.log('\nDone!');
