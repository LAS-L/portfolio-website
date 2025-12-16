
const CACHE_NAME = 'portfolio-v2'
const urlsToCache = [
  '/',
  '/index.html'
]

// Optional: assets to cache on install
const assetsToCache = [
  '/favicon.ico',
  '/manifest.json'
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache:', CACHE_NAME)
        
        // Only cache essential files and skip ones that might fail
        const cachePromises = []
        
        // Always cache the main page
        cachePromises.push(
          cache.add('/').catch(error => {
            console.warn('Failed to cache /:', error)
          })
        )
        
        // Cache other URLs with error handling
        urlsToCache.forEach(url => {
          if (url !== '/') {
            cachePromises.push(
              cache.add(url).catch(error => {
                console.warn(`Failed to cache ${url}:`, error)
              })
            )
          }
        })
        
        return Promise.all(cachePromises)
      })
      .then(() => {
        console.log('All resources cached successfully')
        return self.skipWaiting()
      })
      .catch(error => {
        console.error('Cache installation failed:', error)
      })
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    }).then(() => {
      console.log('Service worker activated')
      return self.clients.claim()
    })
  )
})

self.addEventListener('fetch', event => {
  // Skip non-GET requests and chrome-extension requests
  if (event.request.method !== 'GET' || 
      event.request.url.startsWith('chrome-extension://')) {
    return
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached response if found
        if (response) {
          return response
        }

        // Clone the request for fetching
        const fetchRequest = event.request.clone()

        return fetch(fetchRequest)
          .then(response => {
            // Check if response is valid
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response
            }

            // Clone the response for caching
            const responseToCache = response.clone()

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache)
                  .catch(error => {
                    console.warn('Failed to cache response:', error)
                  })
              })

            return response
          })
          .catch(error => {
            console.warn('Fetch failed, returning offline page:', error)
            
            // For navigation requests, return cached index.html
            if (event.request.mode === 'navigate') {
              return caches.match('/')
            }
            
            // For other requests, you could return a custom offline response
            return new Response('Network error', {
              status: 408,
              headers: { 'Content-Type': 'text/plain' }
            })
          })
      })
  )
})

// Handle background sync for form submissions
self.addEventListener('sync', event => {
  if (event.tag === 'sync-forms') {
    event.waitUntil(syncForms())
  }
})

// Handle push notifications
self.addEventListener('push', event => {
  const options = {
    body: event.data?.text() || 'New update available!',
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  }

  event.waitUntil(
    self.registration.showNotification('Portfolio Update', options)
  )
})

self.addEventListener('notificationclick', event => {
  event.notification.close()
  
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      for (const client of clientList) {
        if (client.url === '/' && 'focus' in client) {
          return client.focus()
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/')
      }
    })
  )
})

async function syncForms() {
  // This would sync form data when connection is restored
  console.log('Syncing forms...')
  // Implement your form sync logic here
}
