/**
 * Enhanced search for Genshin Wiki
 * Supports fuzzy search, element/weapon filters, and instant results
 */
(function() {
  'use strict';

  // Build search index from char_simple.json
  let searchIndex = [];

  function buildIndex(data) {
    searchIndex = [];
    data.forEach(function(c) {
      searchIndex.push({
        id: c.id,
        name: c.name,
        element: c.element,
        rarity: c.rarity,
        region: c.region || '',
        keywords: [c.name, c.id, c.element, c.region || ''].join(' ').toLowerCase()
      });
    });
  }

  function fuzzyMatch(query, text) {
    query = query.toLowerCase().replace(/\s+/g, '');
    text = text.toLowerCase().replace(/ /g, '');
    let qi = 0;
    for (let ti = 0; ti < text.length && qi < query.length; ti++) {
      if (query[qi] === text[ti]) qi++;
    }
    return qi === query.length;
  }

  function search(query) {
    if (!query || query.length < 1) return [];
    const q = query.toLowerCase();
    const results = [];
    searchIndex.forEach(function(item) {
      let score = 0;
      // Exact name match (highest)
      if (item.name.toLowerCase() === q) score = 100;
      else if (item.name.toLowerCase().startsWith(q)) score = 80;
      else if (item.name.toLowerCase().includes(q)) score = 60;
      else if (item.id.toLowerCase() === q) score = 90;
      else if (item.id.toLowerCase().includes(q)) score = 50;
      else if (fuzzyMatch(q, item.name)) score = 30;
      else if (item.element === q) score = 40;
      else return; // no match

      results.push({char: item, score: score});
    });
    results.sort(function(a, b) { return b.score - a.score; });
    return results.slice(0, 20);
  }

  // Create search UI
  function createSearchUI() {
    // Enhance existing search input
    const existingInput = document.getElementById('navSearchInput');
    if (!existingInput) return;

    // Create dropdown
    const dropdown = document.createElement('div');
    dropdown.id = 'enhanced-search-dropdown';
    dropdown.style.cssText = `
      position: absolute; top: 100%; left: 0; right: 0; z-index: 9999;
      background: var(--bg-card); border: 1px solid var(--border);
      border-radius: 8px; max-height: 400px; overflow-y: auto;
      display: none; margin-top: 4px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    `;
    existingInput.parentElement.style.position = 'relative';
    existingInput.parentElement.appendChild(dropdown);

    let lastQuery = '';
    existingInput.addEventListener('input', function() {
      const query = this.value.trim();
      if (query === lastQuery && query !== '') return;
      lastQuery = query;

      if (query.length < 1) {
        dropdown.style.display = 'none';
        return;
      }

      const results = search(query);
      if (results.length === 0) {
        dropdown.innerHTML = '<div style="padding:12px;color:var(--text-dim);font-size:13px;text-align:center;">No characters found</div>';
        dropdown.style.display = 'block';
        return;
      }

      let html = '';
      results.forEach(function(r) {
        const c = r.char;
        const colorMap = {
          anemo: '#5dbf9a', geo: '#d4a84b', electro: '#b47bd4',
          dendro: '#7bc47b', hydro: '#4a9dd6', pyro: '#d9604a', cryo: '#7bc4d0'
        };
        const color = colorMap[c.element] || 'var(--gold)';
        const stars = '★'.repeat(c.rarity) || '';
        const avatar = window.charAvatars && window.charAvatars[c.id]
          ? '<img src="' + window.charAvatars[c.id] + '" style="width:32px;height:32px;border-radius:50%;">'
          : '<div style="width:32px;height:32px;border-radius:50%;background:' + color + '22;display:flex;align-items:center;justify-content:center;font-size:16px;">?</div>';

        html += '<a href="characters/' + c.id + '.html" style="display:flex;align-items:center;gap:10px;padding:8px 12px;text-decoration:none;color:var(--text);border-bottom:1px solid var(--border);transition:background .15s;" onmouseover="this.style.background=\'var(--bg-card-hover)\'" onmouseout="this.style.background=\'transparent\'">'
          + avatar
          + '<div style="flex:1;min-width:0;">'
          + '<div style="font-size:14px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + c.name + '</div>'
          + '<div style="font-size:11px;color:var(--text-dim);">' + c.element.charAt(0).toUpperCase() + c.element.slice(1) + ' · ' + stars + '</div>'
          + '</div>'
          + '<span style="font-size:10px;color:' + color + ';">' + c.element + '</span>'
          + '</a>';
      });
      dropdown.innerHTML = html;
      dropdown.style.display = 'block';
    });

    document.addEventListener('click', function(e) {
      if (!existingInput.parentElement.contains(e.target)) {
        dropdown.style.display = 'none';
      }
    });
  }

  // Load data and init
  function init() {
    fetch('/char_simple.json')
      .then(function(r) { return r.json(); })
      .then(function(data) {
        buildIndex(data);
        createSearchUI();
      })
      .catch(function(err) { console.warn('Search index failed to load:', err); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
