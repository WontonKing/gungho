// 一年讀經：離線快取。改版時把 VERSION 加 1，使用者下次開啟就會拿到新版。
const VERSION = "bible1y-v3";
const FILES = ["./", "index.html", "guide.html", "manifest.webmanifest",
  "icons/icon-192.png", "icons/icon-512.png", "icons/maskable-512.png", "icons/apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES.map(f => new Request(f, { cache: "reload" })))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
// 網頁本身：先連網拿最新版，沒網路就用快取；圖示等其他檔案：先用快取
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then(res => {
      const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); return res;
    }).catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match("./"))));
    return;
  }
  e.respondWith(caches.match(req).then(r => r || fetch(req)));
});
