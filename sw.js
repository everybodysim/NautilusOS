// CHANGE THIS every time you update site files
const CACHE_VERSION = 'v6';

// Unique cache name
const CACHE_NAME = 'nautilus-cache-' + CACHE_VERSION;

// Files to cache for offline use
const URLS_TO_CACHE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './style.css',
  './js/main.js'
];

// INSTALL EVENT
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

// ACTIVATE EVENT (removes old caches)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
});

// FETCH EVENT (serve cached first, then network)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
