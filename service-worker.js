// Names of caches
const NAME = 'ic';
const VERSION = '{{ VERSION }}';
const CACHES = {
    PRE: NAME + '-precache-' + VERSION,
    RUN: NAME + '-runtime-' + VERSION
};

// Map of offline assets
const OFFLINE_ASSETS = {
    css: 'offline/offline.css',
    html: 'offline/index.html'
};

// List of assets always to be cached
const PRECACHE_URLS = [
    'index.html',
    ...Object.values(OFFLINE_ASSETS),
    'site.js'
];

// Caches always needed assets
async function preCache() {
    const cache = await caches.open(CACHES.PRE);
    await cache.addAll(PRECACHE_URLS);
}

// Install handler (precache assets)
self.addEventListener('install', event => {
    event.waitUntil(preCache());
    self.skipWaiting();
});

// Clean up old caches
async function cleanup(currentCaches) {
    const cacheNames = await caches.keys();

    const cachesToDelete = cacheNames.filter(cacheName => !currentCaches.includes(cacheName));

    await Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
    }));
}

// Activate handler (clean up old caches)
self.addEventListener('activate', event => {
    const currentCaches = Object.values(CACHES);
    event.waitUntil(cleanup(currentCaches));
    self.clients.claim();
});

// Use caches assets if possible
async function useCache(event) {
    try {
        const cachedResponse = await caches.match(event.request);

        if (cachedResponse) return cachedResponse;

        const cache = await caches.open(CACHES.RUN);

        const response = await fetch(event.request);

        await cache.put(event.request, response.clone());

        return response;
    } catch (error) {
        if (event.request.mode === 'navigate') {
            console.error('Fetch failed; returning offline page instead.', error);

            const cache = await caches.open(CACHES.PRE);
            const offlinePath = await cache.match(OFFLINE_ASSETS.html);
            return offlinePath;
        }
    }
}

// Fetch handler (use cached assets if possible)
self.addEventListener('fetch', event => {
    // Ignore cross-origin requests
    if (!event.request.url.startsWith(self.location.origin)) return;

    // Ignore BrowserSync requests
    if (event.request.url.includes('browser-sync')) return;

    event.respondWith(useCache(event));
});