const CACHE_NAME = 'shubham-portfolio-v2';
const OFFLINE_URL = '/offline.html';

// Assets to cache on install
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/offline.html',
    '/manifest.json',
    '/favicon.svg',
    '/favicon-192x192.png',
    '/favicon-512x512.png',
    '/favicon-maskable-192x192.png',
    '/favicon-maskable-512x512.png'
];

// Crawler user agents to detect
const CRAWLER_USER_AGENTS = [
    'googlebot',
    'bingbot',
    'slurp',
    'duckduckbot',
    'baiduspider',
    'yandexbot',
    'facebookexternalhit',
    'twitterbot',
    'linkedinbot',
    'whatsapp',
    'telegrambot',
    'slackbot',
    'discordbot',
    'applebot',
    'duckduckgo-favicons-bot',
    'ia_archiver'
];

/**
 * Detects if the request is from a crawler/bot
 * @param {string} userAgent - The user agent string from the request
 * @returns {boolean} - True if the request is from a crawler
 */
function isCrawler(userAgent) {
    if (!userAgent) return false;
    const ua = userAgent.toLowerCase();
    return CRAWLER_USER_AGENTS.some(bot => ua.includes(bot));
}

// Install event - cache essential assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            );
        })
    );
    self.clients.claim();
});

// Fetch event - network first, fallback to cache
self.addEventListener('fetch', (event) => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') return;

    // Skip external requests
    if (!event.request.url.startsWith(self.location.origin)) return;

    // Get user agent from request headers
    const userAgent = event.request.headers.get('user-agent') || '';
    
    // Bypass cache for crawlers - always serve fresh content
    if (isCrawler(userAgent)) {
        event.respondWith(
            fetch(event.request)
                .catch(() => {
                    // Even for crawlers, if network fails, try cache as last resort
                    return caches.match(event.request).then(cachedResponse => {
                        return cachedResponse || new Response('Offline', { status: 503 });
                    });
                })
        );
        return;
    }

    // Normal caching strategy for regular users
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // Clone and cache successful responses
                if (response.status === 200) {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                }
                return response;
            })
            .catch(async () => {
                // Try cache first
                const cachedResponse = await caches.match(event.request);
                if (cachedResponse) {
                    return cachedResponse;
                }

                // For navigation requests, show offline page
                if (event.request.mode === 'navigate') {
                    const offlineCache = await caches.match(OFFLINE_URL);
                    if (offlineCache) return offlineCache;
                }

                return new Response('Offline', { status: 503 });
            })
    );
});
