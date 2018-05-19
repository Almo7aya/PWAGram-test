
const STATIC_CACHE_NAME = 'static-v21';
const DYNAMIC_CACHE_NAME = 'dynamic-v15';

self.addEventListener('install', function (event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then(cache => {
      console.log('[Service Worker] caching ...');
      cache.addAll([
        '/',
        '/offline.html',
        '/index.html',
        '/src/js/app.js',
        '/src/js/material.min.js',
        '/src/js/promise.js',
        '/src/js/fetch.js',
        '/src/js/feed.js',
        'https://fonts.googleapis.com/css?family=Roboto:400,700',
        'https://fonts.googleapis.com/icon?family=Material+Icons',
        'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css',
        '/src/css/app.css',
        '/src/css/feed.css',
        '/src/images/main-image.jpg'
      ]);
    })
  )
});

self.addEventListener('activate', function (event) {
  console.log('[Service Worker] Activating Service Worker ....', event);
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.map(key => {
    if (key !== DYNAMIC_CACHE_NAME && key !== STATIC_CACHE_NAME) {
      console.log('[Service Worker] deleting old caches...', key);
      return caches.delete(key);
    }
  }))));
  return self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      if (/.*detector.*$|.*ng-validate.*$/.test(event.request.url)) {
        return fetch(event.request)
      }

      if (response) return response;
      return fetch(event.request).then(res => {
        return caches.open(DYNAMIC_CACHE_NAME).then(ch => {
          ch.put(event.request.url, res.clone());
          return res;
        });
      }).catch(() => caches.open(STATIC_CACHE_NAME).then(cache => cache.match('offline.html')));
    })
  );
});