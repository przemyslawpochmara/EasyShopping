const CACHE_NAME = 'easyshopping-v4';
const BASE_URL = 'https://przemyslawpochmara.github.io/EasyShopping/';
const urlsToCache = [
  BASE_URL,
  BASE_URL + 'index.html',
  BASE_URL + 'manifest.json',
  BASE_URL + 'icn.png',
  BASE_URL + 'iconnn.png'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching files...');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('Service Worker installed successfully');
        return self.skipWaiting();
      })
  );
});

// Fetch event - serve from cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
      .catch(() => {
        // If both cache and network fail, return a basic offline page for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match(BASE_URL + 'index.html');
        }
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker activated');
      return self.clients.claim();
    })
  );
});

// Handle notification clicks - open app
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event.notification.tag);
  event.notification.close();

  if (event.action === 'open') {
    // Open the app
    event.waitUntil(
      clients.openWindow(BASE_URL)
    );
  } else if (event.action === 'dismiss') {
    // Just close the notification (already done above)
    console.log('Notification dismissed');
  } else {
    // Default click - focus or open app
    event.waitUntil(
      clients.matchAll({ 
        type: 'window',
        includeUncontrolled: true 
      }).then((clientList) => {
        // If app is already open, focus it
        for (const client of clientList) {
          if (client.url.includes(BASE_URL) && 'focus' in client) {
            return client.focus();
          }
        }
        // If app is not open, open it
        if (clients.openWindow) {
          return clients.openWindow(BASE_URL);
        }
      })
    );
  }
});

// Handle notification close
self.addEventListener('notificationclose', (event) => {
  console.log('Notification closed:', event.notification.tag);
});

// Background sync for location checking (when supported)
self.addEventListener('sync', (event) => {
  if (event.tag === 'location-check') {
    console.log('Background sync: location-check');
    event.waitUntil(performLocationCheck());
  }
});

// Push event for server-sent notifications (future enhancement)
self.addEventListener('push', (event) => {
  console.log('Push message received:', event);
  
  const options = {
    body: event.data ? event.data.text() : 'You have items to buy nearby!',
    icon: BASE_URL + 'icn.png',
    badge: BASE_URL + 'icn.png',
    tag: 'shopping-reminder',
    requireInteraction: false,
    actions: [
      {
        action: 'open',
        title: 'Open App',
        icon: BASE_URL + 'icn.png'
      },
      {
        action: 'dismiss',
        title: 'Dismiss',
        icon: BASE_URL + 'icn.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('🛒 Shopping Reminder', options)
  );
});

// Background location check function
async function performLocationCheck() {
  try {
    // This would be used for background location checking
    // Currently limited by browser security policies
    console.log('Background location check requested');
    
    // Send message to active clients to perform location check
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      client.postMessage({
        type: 'BACKGROUND_LOCATION_CHECK'
      });
    });
  } catch (error) {
    console.error('Background location check failed:', error);
  }
}

// Message handling from main app
self.addEventListener('message', (event) => {
  console.log('Service Worker received message:', event.data);
  
  if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
    const { title, body, tag, icon } = event.data;
    
    self.registration.showNotification(title || '🛒 Shopping Reminder', {
      body: body || 'You have items to buy nearby!',
      icon: icon || BASE_URL + 'icn.png',
      badge: BASE_URL + 'icn.png',
      tag: tag || 'shopping-reminder',
      requireInteraction: false,
      silent: false,
      vibrate: [200, 100, 200],
      actions: [
        {
          action: 'open',
          title: 'Open List',
          icon: BASE_URL + 'icn.png'
        }
      ]
    });
  }
});
