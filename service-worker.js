importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
workbox.skipWaiting();
workbox.clientsClaim();

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

workbox.core.setCacheNameDetails({
    prefix: 'Footballovers',
    precache: 'precache',
    runtime: 'runtime',
});

workbox.routing.registerRoute(
    new RegExp('\.css$'),
    workbox.strategies.cacheFirst({
        cacheName: 'Footballovers-cache-stylesheets',
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 30, 
                maxEntries: 30, 
                purgeOnQuotaError: true
            })
        ]
    })
);

workbox.routing.registerRoute(
    new RegExp('\.js$'),
    workbox.strategies.cacheFirst({
        cacheName: 'Footballovers-cache-javascripts',
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 30, 
                maxEntries: 30, 
                purgeOnQuotaError: true
            })
        ]
    })
);

workbox.routing.registerRoute(
    new RegExp('\.(png|svg|jpg|jpeg)$'),
    workbox.strategies.cacheFirst({
        cacheName: 'Footballovers-cache-images',
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 30, 
                maxEntries: 70, 
                purgeOnQuotaError: true
            })
        ]
    })
);

workbox.routing.registerRoute(
    ({url}) => url.origin === "https://api.football-data.org",
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'Footballovers-cache-content',
    plugins:[
        new workbox.cacheableResponse.Plugin({statuses:[0,200]}),
        new workbox.expiration.Plugin({maxAgeSeconds: 60 * 30}),
    ]
    })
);

workbox.routing.registerRoute(
    ({url}) => url.origin === "https://fonts.googleapis.com",
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'Footballovers-cache-materialicons',
    plugins:[
        new workbox.cacheableResponse.Plugin({statuses:[0,200]}),
        new workbox.expiration.Plugin({maxAgeSeconds: 60 * 30}),
    ]
    })
);

workbox.precaching.precacheAndRoute([
    { url: "/index.html", revision: "1"},
    { url: "/navigate.html", revision: "1"},
    { url: "/standings.html", revision: "1"},
    { url: "/favicon.ico", revision: "1"},
    { url: "/pages/home.html", revision: "1"},
    { url: "/pages/scores.html", revision: "1"},
    { url: "/pages/teams.html", revision: "1"},
    { url: "/pages/favorite.html", revision: "1"},
    { url: "/css/materialize.min.css", revision: "1"},
    { url: "/css/style.css", revision: "1"},
    { url: "/js/script/materialize.min.js", revision: "1"},
    { url: "/js/script/navigate.js", revision: "1"},
    { url: "/js/script/register.js", revision: "1"},
    { url: "/js/script/fab.js", revision: "1"},
    { url: "/js/script/db.js", revision: "1"},
    { url: "/js/script/idb.js", revision: "1"},
    { url: "/js/data/api.js", revision: "1"},
    { url: "/push.js", revision: "1"},
    { url: "/assets/contact/whatsapp.png", revision: "1"},
    { url: "/assets/contact/instagram.png", revision: "1"},
    { url: "/assets/contact/facebook.png", revision: "1"},
    { url: "/assets/contact/gmail.png", revision: "1"},
    { url: "/assets/contact/logo.png", revision: "1"},
    { url: "/assets/icons/android-icon-192x192.png", revision: "1"},
    { url: "/assets/icons/favicon-16x16.png", revision: "1"},
    { url: "/assets/icons/favicon-32x32.png", revision: "1"},
    { url: "/assets/icons/favicon-96x96.png", revision: "1"},
    { url: "/assets/icons/icon-72x72.png", revision: "1"},
    { url: "/assets/icons/icon-96x96.png", revision: "1"},
    { url: "/assets/icons/icon-128x128.png", revision: "1"},
    { url: "/assets/icons/icon-144x144.png", revision: "1"},
    { url: "/assets/icons/icon-152x152.png", revision: "1"},
    { url: "/assets/icons/icon-192x192.png", revision: "1"},
    { url: "/assets/icons/icon-384x384.png", revision: "1"},
    { url: "/assets/icons/icon-512x512.png", revision: "1"},
    { url: "/assets/icons/icon-apple-192x192.png", revision: "1"},
    { url: "/assets/noimage/a.png", revision: "1"},
    ], 
    {
        ignoreUrlParametersMatching: [/.*/]
    }
);

self.addEventListener('push', function(event) {
    let body;
    if (event.data) {
      body = event.data.text();
    } else {
      body = 'Push message no payload';
    }
    const options = {
        body: body,
        icon: "/assets/icons/icon-72x72.png",
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification("Push Notification", options)
    );
});
    

