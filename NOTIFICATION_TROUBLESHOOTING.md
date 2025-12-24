# 🔔 Notification Troubleshooting Guide

## ❌ Notifications Not Working? Follow These Steps:

### 🧪 **Step 1: Test Notifications**
1. Open the EasyShopping app
2. Click the **"Test Notification"** button (yellow button)
3. Allow permissions if prompted
4. You should see a test notification

**If test notification doesn't work:**
- Check browser notification settings
- Make sure notifications aren't blocked for this site
- Try refreshing the page

---

### 🔍 **Step 2: Check Debug Info**
1. Click **"Debug Location"** button (gray button)
2. Look for notification status in the popup
3. Should show: `🔔 Notifications: granted`

**If it shows "denied" or "default":**
- Click the lock/info icon in your browser's address bar
- Change notifications to "Allow"
- Refresh the page and try again

---

### 📱 **Step 3: Browser-Specific Fixes**

#### **Chrome (Desktop/Mobile):**
1. Click the lock icon in address bar
2. Set Notifications to "Allow"
3. Refresh the page
4. Test notification should work

#### **Safari (iPhone/iPad):**
1. Go to Settings → Safari → Website Settings
2. Find your site and allow notifications
3. Or use "Add to Home Screen" for better support

#### **Firefox:**
1. Click the shield icon in address bar
2. Allow notifications
3. Refresh and test

---

### 🛠️ **Step 4: Advanced Troubleshooting**

#### **Clear Browser Data:**
1. Clear site data for the app
2. Refresh the page
3. Allow permissions again
4. Test notifications

#### **Check Console Errors:**
1. Press F12 to open developer tools
2. Go to Console tab
3. Look for red error messages
4. Try the test notification and watch for errors

#### **Service Worker Issues:**
1. Go to Developer Tools → Application → Service Workers
2. Check if EasyShopping service worker is running
3. If not, refresh the page
4. Try unregistering and re-registering

---

### ✅ **What Should Work:**

#### **Browser Notifications (Always Available):**
- Work in any modern browser
- Require notification permission
- Show as browser notifications

#### **Service Worker Notifications (Better):**
- Work when service worker is active
- Better for PWA/installed apps
- More reliable on mobile

#### **Native App Notifications (Best):**
- Only when app is installed as PWA
- Work even when browser is closed
- True native mobile experience

---

### 🎯 **Quick Fix Checklist:**

- [ ] **Notification permission granted?** (Check with test button)
- [ ] **Location permission granted?** (Check with debug button)
- [ ] **Service worker active?** (Check developer tools)
- [ ] **Items in shopping list?** (Need incomplete items)
- [ ] **Stores added?** (Need stores within 200m)
- [ ] **Location tracking enabled?** (Toggle should be ON)
- [ ] **Notification history cleared?** (Use red button to reset)

---

### 🚨 **Common Issues & Solutions:**

| Problem | Solution |
|---------|----------|
| "Permission denied" | Enable notifications in browser settings |
| "Service worker not ready" | Refresh page, wait a few seconds |
| "No notifications near stores" | Check if you have incomplete items |
| "Notifications work once only" | Clear notification history |
| "No sound/vibration" | Check device notification settings |

---

### 💡 **Pro Tips:**

1. **Use Test Button First**: Always test notifications before relying on location-based ones
2. **Check Console**: Developer console shows helpful debug messages
3. **Clear History**: Use "Clear Notification History" to reset cooldowns
4. **Install as PWA**: For best mobile experience, install the app
5. **Enable High Accuracy**: Allow precise location for better detection

---

### 📞 **Still Not Working?**

If notifications still don't work after following this guide:

1. **Try a different browser** (Chrome usually works best)
2. **Check device settings** (notifications enabled for browser?)
3. **Try on different device** (desktop vs mobile)
4. **Use the alert fallback** (notifications will show as alerts)

The app is designed to work even without notifications - you'll get alerts instead of native notifications, which still provide the shopping reminders you need!