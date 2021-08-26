// Names of caches
const PRECACHE = 'illustrative-code-2.1.0';
const RUNTIME = 'runtime';

// List of assets always to be cached
const PRECACHE_URLS = [
    'index.html',
    'site.css',
    'site.js'
];

// Install handler (precache assets)
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(PRECACHE)
            .then(cache => cache.addAll(PRECACHE_URLS))
            .then(self.skipWaiting())
    );
});

// Active handler (clean up old cached)
self.addEventListener('active', event => {
    const currentCaches = [
        PRECACHE,
        RUNTIME
    ];

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
        }).then(cachesToDelete => {
            return Promise.all(cachesToDelete.map(cacheToDelete => {
                return caches.delete(cacheToDelete);
            }));
        }).then(() => self.clients.claim())
    );
});

// Fetch handler (use cache for local assets if possible)
self.addEventListener('fetch', event => {
    // Ignore cross-origin requests
    if (!event.request.url.startsWith(self.location.origin)) return;

    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) return cachedResponse;

            return caches.open(RUNTIME).then(cache => {
                return fetch(event.request).then(response => {
                    return cache.put(event.request, response.clone()).then(() => {
                        return response;
                    });
                });
            });
        })
    );
});