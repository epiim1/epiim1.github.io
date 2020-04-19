var CACHE = 'cache-v1';
var assets = [
	'/',
	'/favicon.ico',
	'/res/font/jf-openhuninn-10.woff2',
	'/res/img/bg.svg',
	'/res/img/logo.jpg',
	'/res/img/logo_240.jpg',
	'/res/js/ig-embed.js',
	'/res/js/ua-parser.min.js',
	'/res/js/index.js',
	'/res/css/index.css',
	'/res/css/animate.min.css'
];

self.addEventListener('install', function(evt) {
    console.log('[Service] Installed.');
    evt.waitUntil(precache());
});

self.addEventListener('fetch', function(evt) {
    console.log('[Service] Serving Asset.');
    console.log(evt.request);
    evt.respondWith(fromCache(evt.request));
    evt.waitUntil(update(evt.request));
});

function precache() {
    return caches.open(CACHE).then(function(cache) {
        return cache.addAll(assets);
    }).then(() => {
        console.log('[Service] Precached Assets.');
    });
}

function fromCache(request) {
    return caches.open(CACHE).then(function(cache) {
        return cache.match(request).then(function(matching) {
            return matching || fetch(request);
        });
    });
}

function update(request) {
    return caches.open(CACHE).then(function(cache) {
        return fetch(request).then(function(response) {
            return cache.put(request, response);
        });
    });
}
