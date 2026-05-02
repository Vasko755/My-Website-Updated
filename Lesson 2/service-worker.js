self.addEventListener("Install", event => {
    event.waitUntil(
        caches.open("pwa-cache").then(cache => {
            return cache.addAll(["/", "/index2.html","/style.css","/script.js","/offline.html"]);
        })
    )
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.requset);
        }).catch(() => caches.match("/offline.html"))
    );
});