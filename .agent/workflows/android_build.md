---
description: Build and sync the Android application
---

1. Build the web application
// turbo
npm run build

2. Sync assets to the Android project
// turbo
npx cap sync android

3. Open the project in Android Studio to build the APK
// turbo
npx cap open android

4. In Android Studio, go to Build > Build Bundle(s) / APK(s) > Build APK(s)
