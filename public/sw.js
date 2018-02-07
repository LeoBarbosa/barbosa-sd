const CACHE_GROUP = 'v1';

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_GROUP)
            .then(cache => {
                return cache.addAll([
                    'index.html',
                    'logo.png',
                    'style.css',
                    'sw.js',
                    'favicon.png'
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

    event.respondWith(
        caches.match(event.request)
            .then(result => {
                return result || fetch(event.request)
                    .then(response => {
                        if (response.status == 200) {
                            caches.open(CACHE_GROUP).then(cache => {
                                cache.put(event.request, response.clone());
                            });
                        }
                        return response;
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