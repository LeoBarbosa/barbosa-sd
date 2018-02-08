const CACHE_GROUP = 'v1';

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_GROUP)
            .then(cache => {
                return cache.addAll([
                    'index.html',
                    'logo.png',
                    'style.css',
                    'sw.js',
                    'favicon.png',
                    'webapp-manifest.json'
                ])
            })
    );
});

self.addEventListener('activate', function (event) {
    event.waitUntil((resolve, reject) => {
        resolve();
    });
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) {
                return cachedResponse;
            }

            return caches.open(CACHE_GROUP).then(cache => {
                return fetch(event.request).then(response => {
                    return cache.put(event.request, response.clone()).then(() => {
                        return response;
                    });
                });
            });
        })
    );
});

self.addEventListener('push', function (event) {
    console.log('Received a push message', event);

    event.waitUntil(
        self.registration.showNotification('A message!', {
            body: "Message content",
            icon: './favicon.png',
            tag: 'push-notification-test'
        })
    )
})

