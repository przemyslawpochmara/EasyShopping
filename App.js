const itemInput = document.getElementById('itemInput');
const addBtn = document.getElementById('addBtn');
const shoppingList = document.getElementById('shoppingList');
const locationToggle = document.getElementById('locationToggle');
const manageStoresBtn = document.getElementById('manageStoresBtn');
const storeModal = document.getElementById('storeModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const storeNameInput = document.getElementById('storeNameInput');
const addStoreBtn = document.getElementById('addStoreBtn');
const storeListEl = document.getElementById('storeList');
const storeCount = document.getElementById('storeCount');

let items = JSON.parse(localStorage.getItem('shoppingList')) || [];
let stores = JSON.parse(localStorage.getItem('stores')) || [];
let locationEnabled = localStorage.getItem('locationEnabled') === 'true';
let watchId = null;

// Service Worker Registration
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(() => {
        console.log('Service Worker registered');
    });
}

// Request notification permission
if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
}

function saveToLocalStorage() {
    localStorage.setItem('shoppingList', JSON.stringify(items));
    localStorage.setItem('stores', JSON.stringify(stores));
    localStorage.setItem('locationEnabled', locationEnabled);
}

function renderList() {
    shoppingList.innerHTML = '';
    items.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = `list-item ${item.completed ? 'completed' : ''}`;
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item.completed;
        checkbox.onchange = () => toggleItem(index);
        
        const span = document.createElement('span');
        span.textContent = item.text;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteItem(index);
        
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        shoppingList.appendChild(li);
    });
}

function renderStores() {
    storeCount.textContent = stores.length;
    storeListEl.innerHTML = '';
    
    if (stores.length === 0) {
        storeListEl.innerHTML = '<div class="empty-text">No stores added yet. Add stores where you shop to get reminders!</div>';
        return;
    }
    
    stores.forEach((store, index) => {
        const div = document.createElement('div');
        div.className = 'store-item';
        
        const span = document.createElement('span');
        span.textContent = `📍 ${store.name}`;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Remove';
        deleteBtn.onclick = () => deleteStore(index);
        
        div.appendChild(span);
        div.appendChild(deleteBtn);
        storeListEl.appendChild(div);
    });
}

function addItem() {
    const text = itemInput.value.trim();
    if (text) {
        items.push({ text, completed: false });
        itemInput.value = '';
        saveToLocalStorage();
        renderList();
    }
}

function toggleItem(index) {
    items[index].completed = !items[index].completed;
    saveToLocalStorage();
    renderList();
}

function deleteItem(index) {
    items.splice(index, 1);
    saveToLocalStorage();
    renderList();
}

function deleteStore(index) {
    if (confirm('Are you sure you want to remove this store?')) {
        stores.splice(index, 1);
        saveToLocalStorage();
        renderStores();
    }
}

function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3;
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

function checkNearbyStores(position) {
    const hasIncompleteItems = items.some(item => !item.completed);
    if (!hasIncompleteItems) return;

    const userLat = position.coords.latitude;
    const userLon = position.coords.longitude;
    const lastNotified = JSON.parse(localStorage.getItem('lastNotified') || '{}');
    const now = Date.now();

    stores.forEach(store => {
        const distance = getDistance(userLat, userLon, store.latitude, store.longitude);
        
        if (distance <= 200) {
            const lastTime = lastNotified[store.name] || 0;
            if (now - lastTime > 3600000) { // 1 hour cooldown
                showNotification(store.name);
                lastNotified[store.name] = now;
                localStorage.setItem('lastNotified', JSON.stringify(lastNotified));
            }
        }
    });
}

function showNotification(storeName) {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('🛒 Shopping Reminder', {
            body: `You're near ${storeName}! Don't forget your shopping list.`,
            icon: 'icon-192.png',
            badge: 'icon-192.png',
            tag: 'shopping-reminder'
        });
    }
}

function startLocationTracking() {
    if ('geolocation' in navigator) {
        watchId = navigator.geolocation.watchPosition(
            checkNearbyStores,
            (error) => {
                console.error('Location error:', error);
                alert('Could not access your location. Please enable location services.');
                locationToggle.checked = false;
                locationEnabled = false;
                saveToLocalStorage();
            },
            {
                enableHighAccuracy: true,
                maximumAge: 60000,
                timeout: 27000
            }
        );
    } else {
        alert('Geolocation is not supported by your browser.');
        locationToggle.checked = false;
        locationEnabled = false;
    }
}

function stopLocationTracking() {
    if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
    }
}

// Event Listeners
addBtn.addEventListener('click', addItem);
itemInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addItem();
});

locationToggle.addEventListener('change', (e) => {
    locationEnabled = e.target.checked;
    saveToLocalStorage();
    
    if (locationEnabled) {
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    startLocationTracking();
                    alert('Location tracking enabled! You\'ll get notified when near your stores.');
                } else {
                    locationToggle.checked = false;
                    locationEnabled = false;
                    alert('Please enable notifications to use store reminders.');
                }
            });
        } else if (Notification.permission === 'granted') {
            startLocationTracking();
            alert('Location tracking enabled! You\'ll get notified when near your stores.');
        } else {
            locationToggle.checked = false;
            locationEnabled = false;
            alert('Please enable notifications in your browser settings.');
        }
    } else {
        stopLocationTracking();
    }
});

manageStoresBtn.addEventListener('click', () => {
    storeModal.classList.add('show');
    renderStores();
});

closeModalBtn.addEventListener('click', () => {
    storeModal.classList.remove('show');
});

addStoreBtn.addEventListener('click', () => {
    const name = storeNameInput.value.trim();
    if (!name) {
        alert('Please enter a store name');
        return;
    }
    
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                stores.push({
                    name: name,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
                saveToLocalStorage();
                renderStores();
                storeNameInput.value = '';
                alert(`${name} added to your store locations!`);
            },
            (error) => {
                alert('Could not get your current location. Please enable location services.');
            }
        );
    } else {
        alert('Geolocation is not supported by your browser.');
    }
});

// Initialize
locationToggle.checked = locationEnabled;
if (locationEnabled) {
    startLocationTracking();
}
renderList();
renderStores();

// PWA Install Prompt
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    const installPrompt = document.createElement('div');
    installPrompt.className = 'install-prompt show';
    installPrompt.innerHTML = `
        <span>Install EasyShopping app?</span>
        <button id="installBtn">Install</button>
        <button id="dismissBtn" style="background: #6c757d;">Not now</button>
    `;
    document.body.appendChild(installPrompt);
    
    document.getElementById('installBtn').addEventListener('click', () => {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            deferredPrompt = null;
            installPrompt.remove();
        });
    });
    
    document.getElementById('dismissBtn').addEventListener('click', () => {
        installPrompt.remove();
    });
});
