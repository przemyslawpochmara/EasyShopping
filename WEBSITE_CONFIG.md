# 🌐 Website Address Configuration

## 🔧 **Current Configuration:**

The PWA is currently configured with placeholder URLs. You need to replace `https://yourdomain.com/EasyShopping-main/` with your actual website address.

## 📝 **Files to Update:**

### **1. manifest.json**
Replace all instances of:
```
https://yourdomain.com/EasyShopping-main/
```

With your actual URL, for example:
```
https://myshoppingapp.com/
https://username.github.io/easyshopping/
https://mysite.com/apps/shopping/
```

### **2. sw.js (Service Worker)**
Update the `BASE_URL` constant:
```javascript
const BASE_URL = 'https://yourdomain.com/EasyShopping-main/';
```

Change to your actual URL:
```javascript
const BASE_URL = 'https://myshoppingapp.com/';
```

### **3. index.html**
Update notification icon URLs:
```javascript
icon: 'https://yourdomain.com/EasyShopping-main/icn.png'
```

Change to your actual URL:
```javascript
icon: 'https://myshoppingapp.com/icn.png'
```

## 🎯 **Common Deployment Scenarios:**

### **GitHub Pages:**
```
https://username.github.io/repository-name/
```

### **Custom Domain:**
```
https://myshoppingapp.com/
```

### **Subdirectory:**
```
https://mysite.com/apps/shopping/
```

### **Netlify/Vercel:**
```
https://app-name.netlify.app/
https://app-name.vercel.app/
```

## 🔄 **Quick Replace Instructions:**

1. **Find and Replace** in all files:
   - Find: `https://yourdomain.com/EasyShopping-main/`
   - Replace: `https://your-actual-domain.com/your-path/`

2. **Make sure to include the trailing slash** (`/`) at the end

3. **Test the PWA** after updating to ensure all links work

## ✅ **Verification:**

After updating the URLs:
- [ ] PWA installs correctly
- [ ] Notifications show proper icons
- [ ] Clicking notifications opens the app
- [ ] All shortcuts work properly
- [ ] Icons load in the app store/install prompt

## 💡 **Pro Tip:**

You can use a simple find-and-replace operation in your code editor to update all instances at once:
1. Open all files (manifest.json, sw.js, index.html)
2. Find: `yourdomain.com/EasyShopping-main`
3. Replace: `your-actual-domain.com/your-path`
4. Replace all instances

This ensures consistency across all PWA configuration files!