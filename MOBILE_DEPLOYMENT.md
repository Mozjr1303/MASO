# Mobile Deployment Guide

This document explains how to build, sign, and deploy the Maso Awards mobile application for Android and iOS.

## Prerequisites

- **Node.js & npm**: Installed on your machine.
- **Android Studio**: For Android builds.
- **Xcode**: For iOS builds (requires macOS).
- **Capacitor CLI**: `npm install @capacitor/cli`

## Common Commands

### Syncing Web Assets
Whenever you make changes to the React web code, you must build it and sync it to the native platforms:
```bash
npm run build
npx cap sync
```

---

## Android Deployment

### 1. Generate a Debug APK
For testing on your own device:
```bash
cd android
./gradlew assembleDebug
```
The APK will be located at `android/app/build/outputs/apk/debug/app-debug.apk`.

### 2. Generate a Release APK / App Bundle
To publish to the Google Play Store or distribute a production version:

1.  **Open in Android Studio**:
    ```bash
    npx cap open android
    ```
2.  **Generate a Signing Key**: If you don't have one, go to `Build > Generate Signed Bundle / APK...` and follow the wizard to create a new keystore.
3.  **Build Signed APK**:
    - Select `APK` or `Android App Bundle`.
    - Select the `release` variant.
    - Provide your keystore credentials.
4.  **Output**: The signed file will be generated in `android/app/release/`.

---

## iOS Deployment (macOS only)

### 1. Open in Xcode
```bash
npx cap open ios
```

### 2. Configure Signing & Capabilities
1.  In Xcode, select the `App` project in the Project Navigator.
2.  Go to the **Signing & Capabilities** tab.
3.  Select your **Development Team**.
4.  Ensure the **Bundle Identifier** is set to `com.masoawards.app`.

### 3. Build & Archive
1.  Select **Generic iOS Device** as the build target.
2.  Go to `Product > Archive`.
3.  Once the archive is created, use the **Distribute App** button in the Organizer window to upload to App Store Connect or export for Ad-Hoc distribution.

---

## Troubleshooting

### Splash Screen & Icons
To update the splash screen or app icons:
1.  Place your source images (at least 1024x1024) in the `assets/` folder.
2.  Use a tool like `@capacitor/assets` to regenerate them:
    ```bash
    npx @capacitor/assets generate --android --ios
    ```

### Push Notifications
The app is configured to listen for push notifications. To make them work in production:
1.  **Android**: Register your app in Firebase Console and download `google-services.json` into `android/app/`.
2.  **iOS**: Enable Push Notifications in Xcode's Signing & Capabilities and upload your APNs Key to Firebase or your push provider.
