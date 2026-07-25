/**
 * Character Detail Enhancer
 * Loads enhanced character data (best builds, teams, constellations)
 * and displays it on individual character pages.
 */
(function() {
  'use strict';

  // Get character ID from URL path
  function getCharId() {
    const path = window.location.pathname;
    const match = path.match(/\/characters\/(.+)\.html/);
    return match ? match[1] : null;
  }

  const charId = getCharId();
  if (!charId) return; // Not a character page

  // Load enhancement data
  fetch('/char_enhance.json')
    .then(function(r) { return r.json(); })
    .then(function(data) {
      const info = data[charId];
      if (!info) return;

      // Find the hero section to check character name
      const hero = document.querySelector('.hero');
      if (!hero) return;

      // Build the enhanced character content
      buildCharacterInfo(info);
    })
    .catch(function(err) { console.warn('Enhance data not loaded:', err); });

  function buildCharacterInfo(info) {
    // Create the enhanced build section
    const section = document.createElement('section');
    section.id = 'char-build-section';

    // Element color
    const elementColors = {
      anemo: '#5dbf9a', geo: '#d4a84b', electro: '#b47bd4',
      dendro: '#7bc47b', hydro: '#4a9dd6', pyro: '#d9604a', cryo: '#7bc4d0'
    };
    const accent = elementColors[info.element] || '#d4a84b';

    section.style.cssText = 'padding: 40px 24px; border-top: 1px solid var(--border);';

    // Build HTML
    let html = '<div class="container">';

    // Quick Status Bar
    html += '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:28px;justify-content:center;">';
    html += '<span style="padding:6px 14px;border-radius:20px;background:' + accent + '22;color:' + accent + ';font-size:13px;font-weight:600;">' + (info.role || '') + '</span>';
    html += '<span style="padding:6px 14px;border-radius:20px;background:var(--bg-card);border:1px solid var(--border);font-size:13px;color:var(--text-dim);">' + (info.weapon || '') + '</span>';
    if (info.rarity) {
      const stars = '★'.repeat(info.rarity);
      html += '<span style="padding:6px 14px;border-radius:20px;background:var(--bg-card);border:1px solid var(--border);font-size:13px;color:var(--gold);">' + stars + '</span>';
    }
    html += '</div>';

    // Main content grid
    html += '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;">';

    // Card: Best Weapons
    html += '<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:20px;">';
    html += '<h4 style="color:var(--gold);font-size:16px;margin-bottom:12px;">🗡️ Best Weapons</h4>';
    html += '<ol style="padding-left:20px;margin:0;">';
    (info.best_weapons || []).forEach(function(w) {
      html += '<li style="margin-bottom:6px;font-size:13px;color:var(--text);">' + w + '</li>';
    });
    html += '</ol></div>';

    // Card: Best Artifacts
    html += '<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:20px;">';
    html += '<h4 style="color:var(--gold);font-size:16px;margin-bottom:12px;">💎 Best Artifacts</h4>';
    (info.best_artifacts || []).forEach(function(a) {
      html += '<div style="margin-bottom:8px;font-size:13px;color:var(--text);">• ' + a + '</div>';
    });
    if (info.main_stats) {
      html += '<div style="margin-top:10px;padding:10px;background:' + accent + '11;border-radius:8px;font-size:12px;color:var(--text-dim);">';
      html += '<strong style="color:' + accent + ';">Main Stats:</strong> ' + info.main_stats.join(' | ');
      html += '</div>';
    }
    html += '</div>';

    // Card: Talent Priority
    html += '<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:20px;">';
    html += '<h4 style="color:var(--gold);font-size:16px;margin-bottom:12px;">📖 Talent Priority</h4>';
    (info.talent_priority || []).forEach(function(t) {
      html += '<div style="margin-bottom:8px;font-size:13px;">' + t + '</div>';
    });
    html += '</div>';

    // Card: Constellation Priority
    html += '<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:20px;">';
    html += '<h4 style="color:var(--gold);font-size:16px;margin-bottom:12px;">⭐ Constellation Priority</h4>';
    (info.constellation_priority || []).forEach(function(c, i) {
      html += '<div style="margin-bottom:6px;font-size:13px;">• <strong>' + c.split(':')[0] + '</strong>' + (c.indexOf(':') > -1 ? ':' + c.split(':').slice(1).join(':') : '') + '</div>';
    });
    html += '</div>';

    // Card: Best Teams
    html += '<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:20px;grid-column:span 2;">';
    html += '<h4 style="color:var(--gold);font-size:16px;margin-bottom:12px;">👥 Best Teams</h4>';
    html += '<div style="display:flex;flex-wrap:wrap;gap:12px;">';
    (info.best_teams || []).forEach(function(t) {
      html += '<div style="flex:1;min-width:200px;padding:12px;background:' + accent + '08;border:1px solid ' + accent + '22;border-radius:10px;font-size:13px;">' + t + '</div>';
    });
    html += '</div></div>';

    // Card: Strengths & Weaknesses
    html += '<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:20px;">';
    html += '<h4 style="color:var(--gold);font-size:16px;margin-bottom:12px;">✅ Strengths</h4>';
    (info.strengths || []).forEach(function(s) {
      html += '<div style="margin-bottom:6px;font-size:13px;color:#4ade80;">+ ' + s + '</div>';
    });
    html += '</div>';

    html += '<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:20px;">';
    html += '<h4 style="color:var(--gold);font-size:16px;margin-bottom:12px;">⚠️ Weaknesses</h4>';
    (info.weaknesses || []).forEach(function(w) {
      html += '<div style="margin-bottom:6px;font-size:13px;color:#f87171;">− ' + w + '</div>';
    });
    html += '</div>';

    // Card: Materials
    html += '<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:20px;">';
    html += '<h4 style="color:var(--gold);font-size:16px;margin-bottom:12px;">🛠️ Ascension Materials</h4>';
    (info.ascension_materials || []).forEach(function(m) {
      html += '<div style="margin-bottom:6px;font-size:13px;">• ' + m + '</div>';
    });
    html += '</div>';

    html += '<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:20px;">';
    html += '<h4 style="color:var(--gold);font-size:16px;margin-bottom:12px;">📚 Talent Materials</h4>';
    (info.talent_materials || []).forEach(function(m) {
      html += '<div style="margin-bottom:6px;font-size:13px;">• ' + m + '</div>';
    });
    html += '</div>';

    html += '</div></div>';

    section.innerHTML = html;

    // Insert after the hero section
    const featuresSection = document.querySelector('#features') || document.querySelector('section:not(.hero)');
    if (featuresSection && featuresSection.parentNode) {
      featuresSection.parentNode.insertBefore(section, featuresSection);
    } else {
      // Fallback: insert before footer
      const footer = document.querySelector('footer');
      if (footer && footer.parentNode) {
        footer.parentNode.insertBefore(section, footer);
      } else {
        document.body.appendChild(section);
      }
    }
  }
})();
