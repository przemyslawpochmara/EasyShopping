# EasyShopping Mobile App

A simple shopping list mobile app built with React Native and Expo.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the app:
```bash
npm start
```

3. Run on your device:
   - Install "Expo Go" app on your phone (iOS or Android)
   - Scan the QR code shown in the terminal
   
   OR
   
   - Press `a` for Android emulator
   - Press `i` for iOS simulator (Mac only)

## Features

- Add items to your shopping list
- Check off items as you shop
- Delete items you don't need
- Data persists between app sessions
- **Location-based reminders**: Get notified when you're near your saved stores
- **Background tracking**: App monitors your location even when closed
- **Manage store locations**: Save your favorite stores and get automatic reminders

## How Location Reminders Work

1. Enable "Store Reminders" toggle in the app
2. Grant location permissions (including background location)
3. Add stores by going to "Manage Stores" and clicking "Add Current Location" while at the store
4. The app will notify you when you're within 200 meters of any saved store (only if you have uncompleted items)

## Permissions Required

- **Location (Always)**: To detect when you're near stores
- **Notifications**: To send you shopping reminders

## Build for Production

For Android:
```bash
expo build:android
```

For iOS:
```bash
expo build:ios
```
