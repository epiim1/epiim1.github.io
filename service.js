var CACHE = 'cache-v1';
var assets = [
	'/',
	'/favicon.ico',
	'/res/font/jf-openhuninn-10.woff2',
	'/res/img/bg.svg',
	'/res/img/logo.jpg',
	'/res/img/logo_240.jpg',
	'/res/js/wow.js',
	'/res/js/ua-parser.min.js',
	'/res/js/index.js',
	'/res/css/loading.css',
	'/res/css/index.css',
	'/res/css/animate.min.css'
];

self.addEventListener('install', function(evt) {
    console.log('[Service] Installed.');
    evt.waitUntil(precache());
});

self.addEventListener('fetch', function(evt) {
    // console.log('[Service] Serving Asset.');
    // console.log(evt.request);
    evt.respondWith(fromCache(evt.request));
    if(!isPicture(evt.request.url))
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

function isPicture(url) {
    var types = ["jpg","jpeg","png","svg","ico"];
    for(var i = 0; i < types.length; i++) {
        if(url.toLowerCase().includes("."+types[i])) return true;
    }
    return false;
}
