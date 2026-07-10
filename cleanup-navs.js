const fs = require('fs');

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
  
  // Fix 1: page-layout > page-main /page-main /page-layout should appear exactly once
  // Content area is between page-header div and footer
  
  // Remove ALL existing page-layout/page-main wrappers
  html = html.replace(/<div class="page-layout">\s*/g, '');
  html = html.replace(/<div class="side-nav">[\s\S]*?<\/div>\s*<\/div>\s*/g, '');
  html = html.replace(/<div class="side-nav">[\s\S]*?<\/div>/g, '');
  html = html.replace(/<div class="page-main">\s*/g, '');
  html = html.replace(/<!-- \/page-main -->/g, '');
  html = html.replace(/<!-- \/page-layout -->/g, '');
  html = html.replace(/<\/div><!-- \/page-main -->\s*<\/div><!-- \/page-layout -->/g, '');
  html = html.replace(/<!-- \/page-main -->\s*<\/div>\s*<!-- \/page-layout -->/g, '');
  html = html.replace(/<\/div>\s*<!-- \/page-main -->/g, '');
  html = html.replace(/<\/div>\s*<!-- \/page-layout -->/g, '');
  
  // Fix 2: Remove duplicate sidebar panels
  html = html.replace(/<!-- ===== Sidebar ===== -->[\s\S]*?<\/div>\s*<\/div>\s*/g, (match) => {
    // Keep only the first occurrence
    return '';
  });
  
  // Fix 3: Remove toggleSidebar script duplicates
  html = html.replace(/function toggleSidebar\(\)[\s\S]*?}\s*<\/script>/g, '');
  
  // Fix 4: Remove orphan sidebar close buttons
  html = html.replace(/<button class="close-btn"[^>]*>✕<\/button>/g, '');
  
  if (html !== original) {
    fs.writeFileSync(filePath, html);
    console.log(`  ✅ Cleaned: ${filePath}`);
  }
}

console.log('\nCleanup done! Now re-applying sidebar...');
