 
## Getting started 
```
pnpm dlx shadcn@latest add sonner  tooltip accordion sheet skeleton toggle switch carousel aspect-ratio badge tabs slider select card alert avatar button dialog dropdown-menu input label progress separator textarea scroll-area popover table radio-group checkbox
```
```
pnpm install @capacitor/core @capacitor/cli
``` 
Run

    ```npx cap init [name] [id] --web-dir=dist```
Example
```
npx cap init Rubito com.rubito.jp --web-dir=dist
```

[name] → just the human-readable app name (shown on device home screen)

[id] → the app’s unique identifier (like com.mycompany.myapp)
```
pnpm i @capacitor/ios @capacitor/android
npx cap add android
npx cap add ios
```
Great, you’ve got your Capacitor + React (Vite) app set up — now let’s walk through how to actually **deploy to iOS / Android** 🚀

---

# 📱 Deploying to Android

### 1. Build your web app

```bash
pnpm build
pnpx cap sync
```

### 2. Open in Android Studio

```bash
pnpx cap open android
```

* This launches Android Studio with the native project.
* Capacitor already copied your `dist/` build into the Android project (`android/app/src/main/assets/public/`).

### 3. Run on emulator or device

* Connect a physical Android phone (with USB debugging enabled).
* In Android Studio → click **Run ▶️**.
* Or run on an emulator.

### 4. Build a release APK / AAB

* In Android Studio:

  * `Build > Generate Signed App Bundle / APK`
  * Choose **Android App Bundle (AAB)** (preferred for Play Store).
  * Create or use an existing **keystore** (needed for signing).
* This generates a `.aab` file (upload to Google Play Console).

---

# 🍎 Deploying to iOS

### 1. Build your web app

```bash
pnpm build
pnpx cap sync
```

### 2. Open in Xcode

```bash
pnpx cap open ios
```

### 3. Run on simulator or device

* In Xcode, select a simulator (iPhone 15 Pro, etc.) or a connected iPhone.
* Click **Run ▶️**.

### 4. Build for App Store

* In Xcode:

  * Set your **Bundle Identifier** (must match what you registered in your Apple Developer account).
  * Configure **Signing & Capabilities** → select your Apple team.
* Archive the app:

  * `Product > Archive`
  * Then upload via **Organizer** to App Store Connect.

### 5. Publish

* Log into [App Store Connect](https://appstoreconnect.apple.com/).
* Add your app details, screenshots, metadata.
* Submit your archive for **App Review**.

---

# ⚡ Quick Tips

* **Testing first:**

  * Android: you can sideload an `.apk` directly.
  * iOS: you need a paid Apple Developer account ($99/year) to install on real devices or publish.
* **Updates:** each time you change your React code → run `pnpm build && pnpx cap sync` before opening Android Studio / Xcode.
* **Debugging:** you can use Chrome DevTools (via remote debugging) to inspect the webview inside the app.

---

 
