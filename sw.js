
self.addEventListener('install', function(event) {
    const CACHE_GROUP = 'v1';
    
    event.waitUntil(
        caches.open(CACHE_GROUP)
            .then(cache => {
                return cache.addAll([
                    'index.html',
                    'logo.png',
                    'style.css',
                    'sw.js',
                    'favicon.png',
                    'sw.js'
                ]);
            })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil((resolve, reject) => {
        resolve();
    });
});

this.addEventListener('fetch', function(event) {
    const CACHE_GROUP = 'v1';
    event.respondWith(
        caches.match(event.request)
            .then(result => {
                return result || fetch(event.request)
                    .then(response => {
                        if (response.status == 200) {
                            caches.open(CACHE_GROUP).then(cache => {
                                cache.put(event.request, response);
                            });
                            return response;
                        }
                    })
            })
    )

});


self.addEventListener('push', function(event) {
    console.log('Received a push message', event);

    event.waitUntil(
        self.registration.showNotification('A message!', {
            body: "Message content",
            icon: './favicon.png',
            tag: 'push-notification-test'
        })
    )
})