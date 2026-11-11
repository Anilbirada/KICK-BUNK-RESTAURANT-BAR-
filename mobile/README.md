# KICK BUNK 360 — React Native / Expo Mobile Application

This directory contains the production mobile application for **Kick Bunk 360** (iOS & Android).

It connects to the centralized Node.js REST API backend (`/api/v1`) and shares the exact same database records, menus, reviews, and inquiry channels as the website.

---

## 1. Features & Screens Implemented (16 Screens)

1. **Splash Screen** (`SplashScreen.tsx`): Official brand animation & logo
2. **Onboarding Screen** (`OnboardingScreen.tsx`): Value proposition & hero imagery
3. **Home Screen** (`HomeScreen.tsx`): 4.1 ★ Google Rating badge, promo codes, signature dishes, quick actions
4. **Business Information Screen** (`BusinessInfoScreen.tsx`): Ambience story, garden dining, clay tandoors, timings
5. **Menu Screen** (`MenuScreen.tsx`): Dynamic categories, veg/non-veg filter, search, spice tags
6. **Category Screen** (`CategoryScreen.tsx`): Culinary category tiles with dish counters
7. **Product Detail Screen** (`ProductDetailScreen.tsx`): High-res photos, portion sizes, add-ons, favorites toggle
8. **Gallery Screen** (`GalleryScreen.tsx`): Image gallery with full-screen lightbox modal
9. **Video Screen** (`VideoScreen.tsx`): Drone tours & live tandoor preparation reels
10. **Customer Reviews Screen** (`ReviewsScreen.tsx`): Google Maps verified reviews & direct review action
11. **Location Screen** (`LocationScreen.tsx`): Bengaluru Flagship & Tirupati maps, direct dial, opening hours
12. **Contact Screen** (`ContactScreen.tsx`): Interactive contact form submitting directly to PostgreSQL database
13. **Profile Screen** (`ProfileScreen.tsx`): Gold tier loyalty balance (450 pts), visit history, past orders
14. **Settings Screen** (`SettingsScreen.tsx`): Push notifications, preferred outlet switcher, app version
15. **Favorites Screen** (`FavoritesScreen.tsx`): Saved dishes with one-tap re-ordering
16. **Notifications Screen** (`NotificationsScreen.tsx`): Real-time KDS prep alerts and table booking notices

---

## 2. Running Locally

### Install Dependencies:
```bash
cd mobile
npm install
```

### Start Development Server:
```bash
npx expo start
```
- Press `a` to run on Android Emulator.
- Press `i` to run on iOS Simulator.
- Press `w` to run on Web Browser.
- Scan the QR code using the **Expo Go** app on your physical device.

---

## 3. Production Build Instructions

### Prerequisites:
Install EAS CLI globally and log in:
```bash
npm install -g eas-cli
eas login
```

### Build Android APK (for internal testing / direct client installation):
```bash
eas build -p android --profile preview
```

### Build Android AAB (for Google Play Store submission):
```bash
eas build -p android --profile production
```

### Build iOS IPA (for Apple App Store / TestFlight submission):
```bash
eas build -p ios --profile production
```
