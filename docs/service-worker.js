var precacheConfig = ["./index.html","./js.js"],
    urlsToCacheKeys = precacheConfig.map(i => new URL(i, self.location).toString()),
    cacheName = "site";

self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(cacheName)
        .then(cache => cache.addAll(precacheConfig))
        .then(() => self.skipWaiting())
    );
});

self.addEventListener("activate",function(e){
    e.waitUntil(
        caches.keys()
        .then(cacheNames =>
            Promise.all(
                cacheNames.map(function(n) {
                    if (n != cacheName) {
                        return caches.delete(n);
                    }
                })
            )
        )
        .then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", function(event) {
    var req = event.request;
    if (req.method !== 'GET') return;

    var n = req.url,
        t = urlsToCacheKeys.includes(n);
    if (!t) {
        n += 'index.html';
        t = urlsToCacheKeys.includes(n);
    }
    if (t) {
        event.respondWith(
            caches.open(cacheName).then(function(cache){
                return cache.match(n).then(function(res){
                        if (res) return res;
                        throw Error("The cached response that was expected is missing.")
                })
            }).catch(function(e){
                console.warn('Couldn\'t serve response for "%s" from cache: %O',event.request.url, e);
                return fetch(event.request)
            })
        );
    }
});
