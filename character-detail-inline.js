/**
 * Dynamic Character Detail Page
 * Renders a complete character detail page from JSON data
 * Single page for ALL 90+ characters
 */
(function() {
  'use strict';

  const elementColors = {
    anemo: '#5dbf9a', geo: '#d4a84b', electro: '#b47bd4',
    dendro: '#7bc47b', hydro: '#4a9dd6', pyro: '#d9604a', cryo: '#7bc4d0'
  };

  const elementIcons = {
    anemo: '🍃', geo: '🪨', electro: '⚡', dendro: '🌿', hydro: '💧', pyro: '🔥', cryo: '❄️'
  };

  function getCharId() {
    const m = window.location.search.match(/[?&]char=([^&]+)/);
    return m ? decodeURIComponent(m[1]) : null;
  }

  const charId = getCharId();
  if (!charId) return;

  // Hide all original page content
  document.body.querySelectorAll('.hero, section, .ad-wrap, #home-comments, #gallery').forEach(function(el) {
    el.style.display = 'none';
  });
  // Hide footer temporarily
  document.querySelectorAll('footer').forEach(function(f) { f.style.display = 'none'; });

  // Inline data mode
  (function(charData, enhanceData) {
    const char = charData.find(c => c.id === charId);
    if (!char) { window.location.href = '/characters.html'; return; }

    const info = enhanceData[charId] || {};
    const element = char.element;
    const color = elementColors[element] || '#d4a84b';
    const icon = elementIcons[element] || '🌟';
    const name = char.name;
    const rarity = char.rarity;
    const region = char.region || 'Teyvat';
    const weaponType = info.weapon || 'Unknown';
    const role = info.role || 'Character';
    const stars = '★'.repeat(rarity);
    const starsEmpty = '☆'.repeat(5 - rarity);

    const section = document.createElement('section');
    section.id = 'char-dynamic-section';
    section.style.cssText = 'margin-left:180px;';

    let html = '';

    // ===== Hero =====
    html += '<div style="position:relative;overflow:hidden;padding:80px 24px 40px;background:linear-gradient(135deg,' + color + '22,#0d1117 80%);">';
    html += '<div class="container" style="max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:32px;flex-wrap:wrap;">';

    // Avatar
    html += '<div style="flex-shrink:0;width:120px;height:120px;border-radius:50%;background:' + color + '22;border:3px solid ' + color + ';display:flex;align-items:center;justify-content:center;font-size:48px;">';
    const avatarUrl = window.charAvatars && window.charAvatars[charId]
      ? '<img src="' + window.charAvatars[charId] + '" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">'
      : icon;
    html += avatarUrl + '</div>';

    // Info
    html += '<div style="flex:1;min-width:200px;">';
    html += '<h1 style="font-size:clamp(28px,5vw,48px);font-weight:800;margin-bottom:4px;">' + name + '</h1>';
    html += '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:8px;">';
    html += '<span style="padding:4px 12px;border-radius:16px;background:' + color + '22;color:' + color + ';font-size:12px;font-weight:600;">' + icon + ' ' + element.charAt(0).toUpperCase() + element.slice(1) + '</span>';
    html += '<span style="padding:4px 12px;border-radius:16px;background:var(--bg-card);border:1px solid var(--border);font-size:12px;">' + weaponType + '</span>';
    html += '<span style="padding:4px 12px;border-radius:16px;background:var(--bg-card);border:1px solid var(--border);font-size:12px;">' + role + '</span>';
    html += '<span style="padding:4px 12px;border-radius:16px;background:var(--bg-card);border:1px solid var(--border);font-size:12px;">' + region + '</span>';
    html += '</div>';
    html += '<div style="font-size:16px;color:var(--gold);letter-spacing:2px;">' + stars + '</div>';
    html += '</div>';

    // Back button
    html += '<div style="flex-shrink:0;"><a href="/characters.html" style="display:inline-flex;align-items:center;gap:6px;padding:10px 20px;background:var(--bg-card);border:1px solid var(--border);border-radius:8px;color:var(--text-dim);font-size:14px;text-decoration:none;transition:all .2s;" onmouseover="this.style.borderColor=this.style.color=this.getAttribute(\'data-color\')" onmouseout="this.style.borderColor=\'\';this.style.color=\'var(--text-dim)\'" data-color="' + color + '">← All Characters</a></div>';

    html += '</div></div>';

    // ===== Build Section =====
    html += '<div class="container" style="max-width:1200px;margin:0 auto;padding:32px 24px;">';

    // Grid
    html += '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;">';

    // Best Weapons
    html += '<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:20px;">';
    html += '<h4 style="color:var(--gold);font-size:16px;margin-bottom:12px;">🗡️ Best Weapons</h4>';
    html += '<ol style="padding-left:20px;margin:0;">';
    (info.best_weapons || ['Amos\' Bow']).forEach(function(w) {
      html += '<li style="margin-bottom:6px;font-size:13px;color:var(--text);">' + w + '</li>';
    });
    html += '</ol></div>';

    // Best Artifacts
    html += '<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:20px;">';
    html += '<h4 style="color:var(--gold);font-size:16px;margin-bottom:12px;">💎 Best Artifacts</h4>';
    (info.best_artifacts || ['2-Piece + 2-Piece Combo']).forEach(function(a) {
      html += '<div style="margin-bottom:8px;font-size:13px;color:var(--text);">• ' + a + '</div>';
    });
    if (info.main_stats) {
      html += '<div style="margin-top:10px;padding:10px;background:' + color + '11;border-radius:8px;font-size:12px;color:var(--text-dim);">';
      html += '<strong style="color:' + color + ';">Main Stats:</strong> ' + info.main_stats.join(' | ');
      html += '</div>';
    }
    html += '</div>';

    // Talent Priority
    html += '<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:20px;">';
    html += '<h4 style="color:var(--gold);font-size:16px;margin-bottom:12px;">📖 Talent Priority</h4>';
    (info.talent_priority || ['Skill ≥ Burst > Normal Attack']).forEach(function(t) {
      html += '<div style="margin-bottom:8px;font-size:13px;">' + t + '</div>';
    });
    html += '</div>';

    // Constellation Priority
    html += '<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:20px;">';
    html += '<h4 style="color:var(--gold);font-size:16px;margin-bottom:12px;">⭐ Constellation Priority</h4>';
    (info.constellation_priority || ['C1: Good upgrade', 'C2: Strong option']).forEach(function(c) {
      html += '<div style="margin-bottom:6px;font-size:13px;">• ' + c + '</div>';
    });
    html += '</div>';

    // Best Teams (2 columns span)
    html += '<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:20px;grid-column:span 2;">';
    html += '<h4 style="color:var(--gold);font-size:16px;margin-bottom:12px;">👥 Recommended Teams</h4>';
    html += '<div style="display:flex;flex-wrap:wrap;gap:12px;">';
    const teams = info.best_teams || [name + ' + Bennett + Xingqiu + Xiangling'];
    teams.forEach(function(t) {
      html += '<div style="flex:1;min-width:200px;padding:12px;background:' + color + '08;border:1px solid ' + color + '22;border-radius:10px;font-size:13px;">' + t + '</div>';
    });
    html += '</div></div>';

    // Strengths
    html += '<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:20px;">';
    html += '<h4 style="color:var(--gold);font-size:16px;margin-bottom:12px;">✅ Strengths</h4>';
    (info.strengths || ['Versatile kit', 'Good damage output']).forEach(function(s) {
      html += '<div style="margin-bottom:6px;font-size:13px;color:#4ade80;">+ ' + s + '</div>';
    });
    html += '</div>';

    // Weaknesses
    html += '<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:20px;">';
    html += '<h4 style="color:var(--gold);font-size:16px;margin-bottom:12px;">⚠️ Weaknesses</h4>';
    (info.weaknesses || ['Situational', 'Team-dependent']).forEach(function(w) {
      html += '<div style="margin-bottom:6px;font-size:13px;color:#f87171;">− ' + w + '</div>';
    });
    html += '</div>';

    // Ascension Materials
    html += '<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:20px;">';
    html += '<h4 style="color:var(--gold);font-size:16px;margin-bottom:12px;">🛠️ Ascension Materials</h4>';
    (info.ascension_materials || ['Element Gem', 'Local Specialty', 'Common Drops', 'Boss Material']).forEach(function(m) {
      html += '<div style="margin-bottom:6px;font-size:13px;">• ' + m + '</div>';
    });
    html += '</div>';

    // Talent Materials
    html += '<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:20px;">';
    html += '<h4 style="color:var(--gold);font-size:16px;margin-bottom:12px;">📚 Talent Materials</h4>';
    (info.talent_materials || ['Talent Books', 'Common Drops', 'Weekly Boss Drops']).forEach(function(m) {
      html += '<div style="margin-bottom:6px;font-size:13px;">• ' + m + '</div>';
    });
    html += '</div>';

    html += '</div></div>';

    section.innerHTML = html;

    // Show footer again
    document.querySelectorAll('footer').forEach(function(f) { f.style.display = ''; });

    document.body.insertBefore(section, document.querySelector('footer') || document.body.lastChild);

    // Update page title
    document.title = name + ' Build & Guide — Genshin Wiki';
    // Update meta description
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = 'Best ' + name + ' build guide. Weapons, artifacts, teams, constellations, and materials for ' + name + ' in Genshin Impact.';

    // Scroll to top
    window.scrollTo(0, 0);
  })(CHAR_SIMPLE, CHAR_ENHANCE);
})();
