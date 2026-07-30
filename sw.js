const CACHE = "allstunts-assets-v3";
const FILES = [
  "./",
  "./index.html",
  "./css/styles.css?v=20260730-2",
  "./js/app.js?v=20260730-2",
  "./data/inventory-data.js?v=20260730-2",
  "./assets/logo.svg?v=20260730-2",
  "./manifest.webmanifest?v=20260730-2"
];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)));
  self.skipWaiting();
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))));
  self.clients.claim();
});
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request).then(response => {
      const copy = response.clone();
      caches.open(CACHE).then(cache => cache.put(event.request, copy));
      return response;
    }).catch(() => caches.match(event.request).then(hit => hit || caches.match("./index.html")))
  );
});
