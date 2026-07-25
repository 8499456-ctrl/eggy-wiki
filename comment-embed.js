// ====== Comment Embed v2 — 完整重写 ======
// 评论通过 /api/comments 读写，无需登录
// Usage: CommentEmbed.mount('container-id', { page: 'forum', title: '...' })

window.CommentEmbed = {
  mount: function(containerId, opts) {
    var el = document.getElementById(containerId);
    if (!el) return;
    opts = opts || {};
    var page = opts.page || 'forum';
    var title = opts.title || '💬 Comments';
    var subtitle = opts.subtitle || 'Share your thoughts!';

    el.innerHTML = [
      '<div class="comment-section">',
        '<h2>' + title + '</h2>',
        '<p class="sub">' + subtitle + '</p>',
        '<div class="cform">',
          '<div class="cerror" id="cerror-' + page + '"></div>',
          '<div class="crow">',
            '<input type="text" id="cname-' + page + '" placeholder="Your name" maxlength="50" autocomplete="off">',
          '</div>',
          '<textarea id="ctext-' + page + '" placeholder="Write your comment..." maxlength="2000"></textarea>',
          '<div class="bwrap">',
            '<span class="charcount"><span id="ccount-' + page + '">0</span>/2000</span>',
            '<button class="btn-post" id="cbtn-' + page + '" onclick="CommentEmbed.post(\'' + page + '\')">Post Comment</button>',
          '</div>',
        '</div>',
        '<div id="clist-' + page + '">',
          '<div class="cspin" id="cspin-' + page + '">Loading comments...</div>',
        '</div>',
      '</div>'
    ].join('');

    var ta = document.getElementById('ctext-' + page);
    if (ta) {
      ta.addEventListener('input', function() {
        var cc = document.getElementById('ccount-' + page);
        if (cc) cc.textContent = this.value.length;
      });
    }

    this.load(page);
  },

  load: function(page) {
    var listEl = document.getElementById('clist-' + page);
    if (!listEl) return;
    var spinEl = document.getElementById('cspin-' + page);

    fetch('/api/comments?page=' + encodeURIComponent(page))
      .then(function(r) { return r.json(); })
      .then(function(data) {
        if (spinEl) spinEl.style.display = 'none';
        var comments = data.comments || [];
        if (comments.length === 0) {
          listEl.innerHTML = '<div class="cempty">No comments yet. Be the first!</div>';
          return;
        }
        var html = '';
        for (var i = 0; i < comments.length; i++) {
          var c = comments[i];
          var d = new Date(c.time);
          var timeStr = d.toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric', hour:'2-digit', minute:'2-digit' });
          html += '<div class="citem">' +
            '<div class="meta">' +
              '<span class="name">' + this._esc(c.author) + '</span>' +
              '<span class="time">' + timeStr + '</span>' +
            '</div>' +
            '<div class="ctext">' + this._esc(c.text) + '</div>' +
          '</div>';
        }
        listEl.innerHTML = html;
      }.bind(this))
      .catch(function() {
        if (spinEl) spinEl.style.display = 'none';
        listEl.innerHTML = '<div class="cerror" style="display:block">Failed to load comments.</div>';
      });
  },

  post: function(page) {
    var nameEl = document.getElementById('cname-' + page);
    var textEl = document.getElementById('ctext-' + page);
    var btn = document.getElementById('cbtn-' + page);
    var errorEl = document.getElementById('cerror-' + page);

    if (!nameEl || !textEl) return;
    var name = nameEl.value.trim();
    var content = textEl.value.trim();

    if (errorEl) errorEl.style.display = 'none';
    if (!name) { this._showError(page, 'Please enter your name.'); return; }
    if (!content) { this._showError(page, 'Please write something.'); return; }

    btn.disabled = true;
    btn.textContent = 'Posting...';

    fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ author: name, text: content, page: page })
    })
      .then(function(r) { return r.json(); })
      .then(function(data) {
        if (data.ok) {
          if (textEl) textEl.value = '';
          var cc = document.getElementById('ccount-' + page);
          if (cc) cc.textContent = '0';
          this.load(page);
        } else {
          this._showError(page, data.error || 'Failed to post.');
        }
      }.bind(this))
      .catch(function() {
        this._showError(page, 'Network error. Please try again.');
      }.bind(this))
      .then(function() {
        btn.disabled = false;
        btn.textContent = 'Post Comment';
      });
  },

  _showError: function(page, msg) {
    var el = document.getElementById('cerror-' + page);
    if (!el) return;
    el.textContent = msg;
    el.style.display = 'block';
    setTimeout(function() { el.style.display = 'none'; }, 4000);
  },

  _esc: function(str) {
    if (!str) return '';
    var d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }
};

// Auto-mount — 自动挂载评论区
(function() {
  var mounts = [
    { id: 'forum-comments', opts: { page: 'forum', title: '💬 Forum Comments', subtitle: 'Discuss Genshin Impact!' } }
  ];
  (function tryMount() {
    var allDone = true;
    for (var i = 0; i < mounts.length; i++) {
      var m = mounts[i];
      var el = document.getElementById(m.id);
      if (!el) { allDone = false; continue; }
      if (el.getAttribute('data-mounted')) continue;
      el.setAttribute('data-mounted', '1');
      window.CommentEmbed.mount(m.id, m.opts);
    }
    if (!allDone) setTimeout(tryMount, 300);
  })();
})();
