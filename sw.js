// CHANGE THIS every time you update files
const CACHE_VERSION = 'v1';

// This creates a unique cache name
const CACHE_NAME = 'nautilus-cache-' + CACHE_VERSION;

// Files to store for offline use
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.webmanifest'
];

// INSTALL EVENT
// Runs when the service worker is first installed
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

// ACTIVATE EVENT
// Cleans up old caches when version changes
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

// FETCH EVENT
// Intercepts network requests
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
