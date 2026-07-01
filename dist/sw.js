// Bavarius PWA Service Worker
const CACHE = 'bavarius-v1'

const PRECACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/img/bav_min.png',
  '/img/logo.png',
  '/img/hamburger_icon.png',
  '/img/business.svg',
  '/img/pin.svg',
  '/img/icon_vk.png',
  '/img/bg_new.png',
  '/img/bg_main.jpg',
  '/img/bg_main2.jpg',
  '/img/bg_main3.jpg',
  '/img/bavarius_prev.jpg',
  '/img/icon-192.png',
  '/img/icon-512.png',
  '/fonts/CervoRegular.woff',
  '/fonts/CervoMedium.woff',
  '/fonts/RobotoRegular.woff',
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(PRECACHE))
  )
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return

  // Network-first for navigation; cache-first for assets
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const clone = response.clone()
          caches.open(CACHE).then(cache => cache.put(event.request, clone))
          return response
        })
        .catch(() => caches.match(event.request).then(r => r || caches.match('/')))
    )
  } else {
    event.respondWith(
      caches.match(event.request).then(cached =>
        cached || fetch(event.request).then(response => {
          if (response.ok) {
            const clone = response.clone()
            caches.open(CACHE).then(cache => cache.put(event.request, clone))
          }
          return response
        })
      )
    )
  }
})
