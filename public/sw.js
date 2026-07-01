// Bavarius PWA Service Worker
const CACHE = 'bavarius-v1'

const PRECACHE = [
  '/bavarius-next/',
  '/bavarius-next/index.html',
  '/bavarius-next/manifest.json',
  '/bavarius-next/img/bav_min.png',
  '/bavarius-next/img/logo.png',
  '/bavarius-next/img/hamburger_icon.png',
  '/bavarius-next/img/business.svg',
  '/bavarius-next/img/pin.svg',
  '/bavarius-next/img/icon_vk.png',
  '/bavarius-next/img/bg_new.png',
  '/bavarius-next/img/bg_main.jpg',
  '/bavarius-next/img/bg_main2.jpg',
  '/bavarius-next/img/bg_main3.jpg',
  '/bavarius-next/img/bavarius_prev.jpg',
  '/bavarius-next/img/icon-192.png',
  '/bavarius-next/img/icon-512.png',
  '/bavarius-next/fonts/CervoRegular.woff',
  '/bavarius-next/fonts/CervoMedium.woff',
  '/bavarius-next/fonts/RobotoRegular.woff',
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
        .catch(() => caches.match(event.request).then(r => r || caches.match('/bavarius-next/')))
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
