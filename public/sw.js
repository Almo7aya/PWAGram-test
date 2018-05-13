// this is my really first SW XD
self.addEventListener('install', event => {
    console.log('[Service Worker] => installing SW :', event);
});

self.addEventListener('activate', event => {
    console.log('[Service Worker] => activating SW :', event);
    self.clients.claim();
});

self.addEventListener('fetch', event => {
    console.log('[Service Worker] => fetching :', event);
});

self.addEventListener('push', event => {
    console.log('[Service Worker] => pushing :', event);
})