// abmorrisart.com — vanilla replacements for the former Angular behavior.
// Three independent features, each a no-op if its DOM isn't present.

(function () {
  'use strict';

  // Friendly filter name -> hashtags a photo must contain (ALL of them).
  // Ported verbatim from the original PortfolioComponent tagMap.
  var TAG_MAP = {
    'All': [],
    'Digital Portrait': ['#portrait', '#procreate'],
    'Painted Portrait': ['#portrait', '#painting'],
    'Live Event': ['#weddingpainting'],
    'Watercolor': ['#watercolor']
  };

  // --- Mobile hamburger menu ------------------------------------------------
  function initMenu() {
    var toggle = document.getElementById('menu-toggle');
    var menu = document.getElementById('nav-menu-list');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', function () {
      toggle.classList.toggle('open');
      menu.classList.toggle('collapse');
    });
  }

  // --- Photo lightbox (open / next / back / swipe) --------------------------
  function initGallery() {
    var galleries = document.querySelectorAll('.photo-gallery');
    if (!galleries.length) return;

    var modal = document.getElementById('photo-modal');
    var modalImg = document.getElementById('modal-img');
    var closeBtn = document.getElementById('modal-close');
    if (!modal || !modalImg || !closeBtn) return;

    var list = [];      // [{ el, src, alt }]
    var index = 0;

    function visiblePhotos(gallery) {
      var out = [];
      gallery.querySelectorAll('.photo-container').forEach(function (c) {
        if (c.classList.contains('is-hidden')) return;
        var img = c.querySelector('img');
        if (img) {
          // Prefer the larger variant for the lightbox; fall back to the thumb.
          var full = img.getAttribute('data-full') || img.getAttribute('src');
          out.push({ el: c, src: full, alt: img.getAttribute('alt') || '' });
        }
      });
      return out;
    }

    function render() {
      var p = list[index];
      if (!p) return;
      modalImg.setAttribute('src', p.src);
      modalImg.setAttribute('alt', p.alt);
    }

    function open(newList, startIndex) {
      list = newList;
      index = startIndex;
      render();
      modal.hidden = false;
    }

    function close() {
      modal.hidden = true;
      modalImg.setAttribute('src', '');
    }

    function next() {
      if (!list.length) return;
      index = (index + 1) % list.length;
      render();
    }

    function back() {
      if (!list.length) return;
      index = (index - 1 + list.length) % list.length;
      render();
    }

    galleries.forEach(function (gallery) {
      gallery.addEventListener('click', function (e) {
        var img = e.target.closest ? e.target.closest('.photo-container img') : null;
        if (!img) return;
        var container = img.closest('.photo-container');
        var vis = visiblePhotos(gallery);
        var idx = 0;
        for (var i = 0; i < vis.length; i++) {
          if (vis[i].el === container) { idx = i; break; }
        }
        open(vis, idx);
      });
    });

    // Close via the × button.
    closeBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      close();
    });

    // Swipe via pointer events (mouse drag + touch). Matches the original:
    // left/up -> next, right/down -> back. A tap (no drag) does nothing.
    var startX = 0, startY = 0, tracking = false;
    var THRESHOLD = 40;

    modal.addEventListener('pointerdown', function (e) {
      if (e.target === closeBtn) return;
      tracking = true;
      startX = e.clientX;
      startY = e.clientY;
    });

    modal.addEventListener('pointerup', function (e) {
      if (!tracking) return;
      tracking = false;
      var dx = e.clientX - startX;
      var dy = e.clientY - startY;
      var absX = Math.abs(dx);
      var absY = Math.abs(dy);
      if (absX < THRESHOLD && absY < THRESHOLD) return;
      if (absX > absY) {
        if (dx < 0) { next(); } else { back(); }
      } else {
        if (dy < 0) { next(); } else { back(); }
      }
    });

    // Additive keyboard support (no layout change): Esc closes, arrows navigate.
    document.addEventListener('keydown', function (e) {
      if (modal.hidden) return;
      if (e.key === 'Escape') { close(); }
      else if (e.key === 'ArrowRight') { next(); }
      else if (e.key === 'ArrowLeft') { back(); }
    });
  }

  // --- Portfolio tag filter (URL ?tag= synced) ------------------------------
  function initFilter() {
    var select = document.getElementById('filter');
    var gallery = document.querySelector('.photo-gallery');
    if (!select || !gallery) return;

    var containers = Array.prototype.slice.call(gallery.querySelectorAll('.photo-container'));

    function apply(tagName) {
      var required = TAG_MAP[tagName] || [];
      containers.forEach(function (c) {
        var tags = (c.getAttribute('data-tags') || '').split(/\s+/);
        var match = required.every(function (r) { return tags.indexOf(r) !== -1; });
        c.classList.toggle('is-hidden', !match);
      });
    }

    function setFromUrl() {
      var tag = new URLSearchParams(window.location.search).get('tag');
      select.value = (tag && Object.prototype.hasOwnProperty.call(TAG_MAP, tag)) ? tag : 'All';
      apply(select.value);
    }

    select.addEventListener('change', function () {
      var tag = select.value;
      var params = new URLSearchParams(window.location.search);
      if (tag === 'All') { params.delete('tag'); } else { params.set('tag', tag); }
      var qs = params.toString();
      history.replaceState(null, '', window.location.pathname + (qs ? '?' + qs : ''));
      apply(tag);
    });

    setFromUrl();
  }

  function init() {
    initMenu();
    initGallery();
    initFilter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
