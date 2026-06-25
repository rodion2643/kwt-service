(function () {
  'use strict';

  const REMOTE_BASE = 'https://kwtservice.com/php/';

  /** GitHub Pages: username.github.io/repo-name/ */
  function detectBasePath() {
    const meta = document.querySelector('meta[name="kwt-base"]');
    if (meta && meta.content) return meta.content.replace(/\/?$/, '/');

    const { hostname, pathname } = window.location;
    if (hostname.endsWith('github.io')) {
      const seg = pathname.split('/').filter(Boolean)[0];
      if (seg && !seg.includes('.')) return `/${seg}/`;
    }
    return '';
  }

  const basePath = detectBasePath();

  function url(localPath) {
    if (!localPath) return '';
    if (/^https?:\/\//i.test(localPath)) return localPath;
    const clean = localPath.replace(/^\.\//, '').replace(/^\//, '');
    return `${basePath}${clean}`;
  }

  function remote(remotePath) {
    if (!remotePath) return '';
    if (/^https?:\/\//i.test(remotePath)) return remotePath;
    return REMOTE_BASE + remotePath.replace(/^\//, '');
  }

  function imgSrc(item) {
    return url(item.image || item.img || '');
  }

  function imgFallback(item) {
    return item.remote || item.remoteImage ? remote(item.remote || item.remoteImage) : '';
  }

  function imgHtml(item, opts) {
    const alt = opts?.alt || item.name || item.title || '';
    const cls = opts?.className || '';
    const src = imgSrc(item);
    const fb = imgFallback(item);
    const onerr = fb
      ? ` onerror="if(!this.dataset.fallback){this.dataset.fallback='1';this.src='${fb.replace(/'/g, "\\'")}';}"`
      : '';
    return `<img src="${src}" alt="${alt.replace(/"/g, '&quot;')}" class="${cls}" loading="lazy"${onerr}>`;
  }

  window.KWTAssets = { basePath, url, remote, imgSrc, imgFallback, imgHtml };
})();
