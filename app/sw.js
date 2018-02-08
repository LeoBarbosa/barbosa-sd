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
        caches.match(event.request, { ignoreSearch: true }).then(response => {
            return response || fetch(event.request)
            .then(res => {
                if(res.status == 200) {
                    caches.open(CACHE_GROUP).then(cache=> {
                        cache.put(event.request, res.clone())
                    });
                }
                return res;
            })
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


