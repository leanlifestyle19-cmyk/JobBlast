const CACHE = 'jobblast-20260712b';   // M1: BUMP on EVERY index.html deploy.

// M16: list EVERY external API host here. Add to this on every API change.
const BYPASS = [
  'api.anthropic.com',
  'raw.githubusercontent.com',
  'githubusercontent.com',
  'github.io',
];

self.addEventListener('install', e => {
  // M4: add index.html individually — addAll() fails entirely if ANY file 404s.
  e.waitUntil(
    caches.open(CACHE)
      .then(c => fetch('./index.html').then(res => c.put('./index.html', res)))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (BYPASS.some(h => url.hostname.includes(h))) return; // let API/feed calls hit network

  // M5: serve app shell by request MODE, not by URL path.
  if (e.request.mode === 'navigate') {
    e.respondWith(caches.match('./index.html').then(r => r || fetch(e.request)));
    return;
  }
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return res;
    }))
  );
});