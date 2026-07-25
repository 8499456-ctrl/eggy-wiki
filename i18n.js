// i18n.js — Multi-language support (English / 中文)
// English is the default. Click "中文" in navbar to switch.
// Usage: Add data-i18n="key" to any element.

const i18nData = {
  'en': {
    // Nav
    'nav.home': 'Home',
    'nav.characters': 'Characters',
    'nav.elements': 'Elements',
    'nav.abyss': 'Abyss',
    'nav.weapons': 'Weapons',
    'nav.artifacts': 'Artifacts',
    'nav.materials': 'Materials',
    'nav.download': 'Download',
    'nav.codes': 'Codes',
    'nav.forum': 'Forum',
    'nav.login': 'Login',
    'nav.tierlist': 'Tier List',
    'nav.guides': 'Guides',
    'nav.bugs': 'Bugs',
    'nav.membership': 'Membership',
    
    // Language
    'lang.switch': '中文',
    
    // Home
    'home.title': 'The World of Teyvat',
    'home.subtitle': '— The Most Practical Genshin Guide Encyclopedia —',
    'home.desc': 'Character Reviews · Team Comps · Weapons & Artifacts · Material Farming · Live Codes',
    'home.cta.characters': '⚔️ Character Gallery',
    'home.cta.guides': '📖 Beginner\'s Guide',
    'home.elem.title': 'The Seven',
    'home.elem.inner': 'Elements',
    'home.elem.desc': 'Elemental reactions are the core of Genshin combat. Understand each element\'s power.',
    'home.features.title': 'Site ',
    'home.features.inner': 'Guide Categories',
    'home.features.desc': 'From starter tips to Abyss 36-stars — saving you time and frustration.',
    'home.card.chars': 'Character Gallery',
    'home.card.chars.desc': 'Full skill breakdowns, constellation recommendations, ascension materials, and endgame stat references.',
    'home.card.chars.tag': '90 Characters',
    'home.card.abyss': 'Abyss Comps',
    'home.card.abyss.desc': 'Monthly Spiral Abyss 36-star team recommendations, from budget to whale, floor by floor.',
    'home.card.weapons': 'Weapon Guide',
    'home.card.weapons.desc': 'Full weapon tier lists, BiS picks for each character (4-star and 5-star).',
    'home.card.artifacts': 'Artifacts',
    'home.card.artifacts.desc': 'Artifact set recommendations, main/sub stat priorities, and farming route planning.',
    'home.card.materials': 'Material Farming',
    'home.card.materials.desc': 'Optimal farming routes for character ascension, talent, and weapon materials.',
    'home.card.codes': 'Redeem Codes',
    'home.card.codes.desc': 'Live Primogems, Mora, Resin and other reward codes. Expired codes cleaned regularly.',
    'home.codes.title': '🎁 Live ',
    'home.codes.inner': 'Redeem Codes',
    'home.codes.desc': 'The latest Genshin reward codes — grab them before they expire!',
    'home.guides.title': 'Featured ',
    'home.guides.inner': 'Guides',
    'home.guides.desc': 'From beginner to advanced, all in one place.',
    'home.guide.beginner.title': 'Beginner\'s Guide · Fast Track AR 1~45',
    'home.guide.beginner.desc': '15 things every new player must know — resin planning, character picks, resource pitfalls. Reach AR 45 in no time.',
    'home.guide.abyss.title': 'Spiral Abyss Floor 12 Full Stars Guide',
    'home.guide.abyss.desc': 'Latest Abyss buff breakdown, optimal team comps, enemy spawn patterns and grouping tips — get your 600 Primogems.',
    'home.guide.elements.title': 'Elemental Reactions — Complete Guide',
    'home.guide.elements.desc': 'Vaporize, Melt, Aggravate, Bloom... all reaction formulas, multipliers, and trigger order explained in one article.',
    'home.guide.boss.title': 'Weekly Boss / Boss Rush Guide',
    'home.guide.boss.desc': 'All weekly boss mechanics explained + speedclear comps. Clear all weekly bosses in 30 minutes.',
    'home.elem.anemo': 'Anemo',
    'home.elem.geo': 'Geo',
    'home.elem.electro': 'Electro',
    'home.elem.dendro': 'Dendro',
    'home.elem.hydro': 'Hydro',
    'home.elem.pyro': 'Pyro',
    'home.elem.cryo': 'Cryo',
    'home.card.live': 'Live',
    'home.sidebar.boosters': '⚡ Game Booster',
    'home.sidebar.boosters.desc': 'Download slow? Lag in co-op? Try a game accelerator.',
    'home.sidebar.boosters.cta': 'Learn more →',
    'home.footer.copyright': '© 2026 Genshin Guide · Not affiliated with HoYoverse',
    
    // General
    'general.search': 'Search...',
    
    // Characters page
    'chars.title': 'All Characters — 90 Builds & Tier List (v6.3)',
    'chars.subtitle': '90 characters · Build guides · Teams · Materials',
    'chars.filter.all': 'All',
    'chars.search.placeholder': 'Search character...',
    
    // Tierlist
    'tier.title': 'Character Tier List',
    'tier.subtitle': 'Based on current meta and community consensus (v6.3)',
    'tier.all': 'All Roles',
    'tier.dd': 'Main DPS',
    'tier.sub': 'Sub DPS',
    'tier.support': 'Support',
    
    // Materials calendar
    'mat.calendar.title': 'Materials Farming Calendar',
    'mat.calendar.subtitle': 'Check what talent books and weapon materials are available each day (v6.3)',
    'mat.domains': 'Domains rotate daily',
  },
  'zh': {
    // Nav
    'nav.home': '首页',
    'nav.characters': '角色',
    'nav.elements': '元素',
    'nav.abyss': '深渊',
    'nav.weapons': '武器',
    'nav.artifacts': '圣遗物',
    'nav.materials': '材料',
    'nav.download': '下载',
    'nav.codes': '兑换码',
    'nav.forum': '论坛',
    'nav.login': '登录',
    'nav.tierlist': 'Tier 榜',
    'nav.guides': '指南',
    'nav.bugs': '问题反馈',
    'nav.membership': '会员',
    
    // Language
    'lang.switch': 'English',
    
    // Home
    'home.title': '原神攻略指南 2026',
    'home.subtitle': '最佳配装 · 角色排名 · 深渊攻略',
    'home.desc': '角色评测 · 配队方案 · 武器圣遗物 · 材料刷取 · 兑换码',
    'home.cta.characters': '⚔️ 查看所有角色',
    'home.cta.guides': '📖 新手指南',
    'home.elem.title': '七种',
    'home.elem.inner': '元素',
    'home.elem.desc': '元素反应是原神战斗的核心机制。了解每种元素的力量。',
    'home.features.title': '网站',
    'home.features.inner': '功能分类',
    'home.features.desc': '从新手到深渊满星 — 帮你省时省力。',
    'home.card.chars': '角色图鉴',
    'home.card.chars.desc': '天赋分析、命座推荐、突破材料、毕业面板参考。',
    'home.card.chars.tag': '90 位角色',
    'home.card.abyss': '深渊阵容',
    'home.card.abyss.desc': '每月深渊满星推荐阵容，从平民到氪佬，逐层解析。',
    'home.card.weapons': '武器指南',
    'home.card.weapons.desc': '全武器 T 度排名、各角色最佳武器推荐（4星和5星）。',
    'home.card.artifacts': '圣遗物',
    'home.card.artifacts.desc': '圣遗物套装推荐、主副词条优先级、刷取路线规划。',
    'home.card.materials': '材料刷取',
    'home.card.materials.desc': '角色突破、天赋、武器突破材料的最优刷取路线。',
    'home.card.codes': '兑换码',
    'home.card.codes.desc': '最新的原石、摩拉、树脂等奖励兑换码，过期码定期清理。',
    'home.codes.title': '🎁 实时',
    'home.codes.inner': '兑换码',
    'home.codes.desc': '最新原神兑换码 — 过期不候！',
    'home.guides.title': '精选',
    'home.guides.inner': '攻略',
    'home.guides.desc': '从新手入门到高阶进阶，一站式搞定。',
    'home.guide.beginner.title': '新手指南 · 快速到达 AR 45',
    'home.guide.beginner.desc': '15 个新手必知 — 树脂规划、角色选择、资源陷阱。轻松到 AR 45。',
    'home.guide.abyss.title': '深渊第 12 层满星攻略',
    'home.guide.abyss.desc': '最新深渊增益解析、最优配队、怪物刷新规律和聚怪技巧 — 拿满 600 原石。',
    'home.guide.elements.title': '元素反应完整指南',
    'home.guide.elements.desc': '蒸发、融化、激化、绽放... 所有反应公式、倍率和触发机制一文说清。',
    'home.guide.boss.title': '周常 Boss 速刷指南',
    'home.guide.boss.desc': '所有周本 Boss 机制详解 + 速通阵容。30 分钟内清完所有周本。',
    'home.elem.anemo': '风',
    'home.elem.geo': '岩',
    'home.elem.electro': '雷',
    'home.elem.dendro': '草',
    'home.elem.hydro': '水',
    'home.elem.pyro': '火',
    'home.elem.cryo': '冰',
    'home.card.live': '最新',
    'home.sidebar.boosters': '🚀 游戏加速器',
    'home.sidebar.boosters.desc': '海外玩家专用，延迟从 200ms 降至 30ms',
    'home.sidebar.boosters.cta': '了解详情 →',
    'home.footer.copyright': '© 2026 Genshin Guide · 与 HoYoverse 无关',
    
    // General
    'general.search': '搜索...',
    
    // Characters page
    'chars.title': '全部角色 — 90位配装 & Tier 榜 (v6.3)',
    'chars.subtitle': '90位角色 · 配装指南 · 队伍推荐 · 养成材料',
    'chars.filter.all': '全部',
    'chars.search.placeholder': '搜索角色名...',
    
    // Tierlist
    'tier.title': '角色强度排行榜',
    'tier.subtitle': '基于当前版本元数据和社区共识',
    'tier.all': '全部定位',
    'tier.dd': '主C',
    'tier.sub': '副C',
    'tier.support': '辅助',
    
    // Materials calendar
    'mat.calendar.title': '材料刷取日历',
    'mat.calendar.subtitle': '查看每天可以刷的天赋书和武器材料',
    'mat.domains': '秘境每日轮换',
  }
};

// Store original text for each data-i18n element so we can restore English
let originalTexts = {};

function detectLang() {
  const urlParams = new URLSearchParams(window.location.search);
  const urlLang = urlParams.get('lang');
  if (urlLang === 'zh') return 'zh';
  return 'en';
}

let currentLang = detectLang();

function applyTranslations(lang) {
  currentLang = lang;
  const data = i18nData[lang] || {};
  
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  
  // Save originals on first run only
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const text = data[key];
    if (text === undefined) return;
    
    const children = el.children;
    if (children.length > 0) {
      // Element has child tags (like <span> in titles)
      // Only replace the first text node (before any children)
      for (let child of el.childNodes) {
        if (child.nodeType === Node.TEXT_NODE && child.textContent.trim()) {
          child.textContent = text;
          break;
        }
      }
    } else {
      el.textContent = text;
    }
  });
  
  // data-i18n-inner (for <span> in titles)
  document.querySelectorAll('[data-i18n-inner]').forEach(el => {
    const key = el.getAttribute('data-i18n-inner');
    if (data[key]) el.textContent = data[key];
  });
  
  // data-i18n-prefix (for h2/h3 that have child <span>, only replaces first text node)
  document.querySelectorAll('[data-i18n-prefix]').forEach(el => {
    const key = el.getAttribute('data-i18n-prefix');
    const text = data[key];
    if (text === undefined) return;
    for (let child of el.childNodes) {
      if (child.nodeType === Node.TEXT_NODE && child.textContent.trim()) {
        child.textContent = text;
        break;
      }
    }
  });
  
  // Placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (data[key]) el.placeholder = data[key];
  });
  
  // Titles
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    if (data[key]) el.title = data[key];
  });
  
  // Update switcher text (in nav bar)
  const switchers = document.querySelectorAll('.lang-switcher');
  switchers.forEach(btn => {
    const key = btn.getAttribute('data-i18n-switch') || 'lang.switch';
    if (data[key]) btn.textContent = data[key];
  });
  
  // Dispatch event
  document.dispatchEvent(new CustomEvent('langChanged', { detail: { lang } }));
  
  // Update URL
  const url = new URL(window.location);
  if (lang === 'en') url.searchParams.delete('lang');
  else url.searchParams.set('lang', lang);
  window.history.replaceState({}, '', url);
}

function toggleLang(e) {
  if (e) e.preventDefault();
  const newLang = currentLang === 'zh' ? 'en' : 'zh';
  applyTranslations(newLang);
}

// Init
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => applyTranslations(currentLang));
} else {
  applyTranslations(currentLang);
}
