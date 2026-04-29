# Image Gallery App

A React Native application demonstrating expertise in React Native architecture, Redux state management, GraphQL integration, native module bridges, form validation, and UI animations.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React Native CLI 0.85.2 |
| State Management | Redux Toolkit + redux-persist |
| GraphQL | Apollo Client v4 + Local Apollo Server |
| Navigation | React Navigation v7 (Native Stack) |
| Forms & Validation | Formik + Yup |
| Animations | React Native Reanimated v4 |
| Native Bridge | Kotlin (Android) + Objective-C (iOS) |
| Language | TypeScript |
| Package Manager | Yarn |

---

## Features

### Registration Screen
- Name, Email, Phone, Password with floating label inputs
- Inline validation (email format, 10-digit phone, min 8-char password)
- Password show/hide toggle
- Data persists across app restarts

### Image Gallery Screen
- 2-column grid (phones) / 3-column (tablets & iPads)
- Paginated — 10 images per page, auto-loads next page on scroll
- Pull-to-refresh to reload from page 1
- Tap a card to open detail screen
- Like/unlike images — press the heart icon on a card or **double-tap the image** to trigger the heart animation

### Image Detail Screen
- Zoom-in entrance animation when screen opens
- Press the like button or **double-tap the hero image** to trigger the heart burst animation
- Author, total likes, description
- **Device Info card at the bottom** — shows model, manufacturer, OS version and SDK level from the native bridge

---

## Getting Started

### Prerequisites

- Node.js >= 22
- Yarn >= 1.22
- Java 17 (for Android builds)
- Android Studio + Android SDK (for Android)
- Xcode 15+ with CocoaPods (for iOS)
- A running Android emulator or connected device

### 1. Install Dependencies

```bash
yarn install
```

### 2. Start the Local GraphQL Server

Open a terminal in the project root and run:

```bash
cd server
yarn install
yarn start
```

The server runs at `http://localhost:4000/graphql`.

> **Android emulator** — The app connects to `http://10.0.2.2:4000/graphql` automatically (Android routes `localhost` via `10.0.2.2`).
> **Physical Android device** — Open `src/graphql/apolloClient.ts` and replace `10.0.2.2` with your machine's LAN IP (e.g. `192.168.1.x`).
> **iOS simulator / physical iPhone** — Uses `localhost` directly, no change needed.

### 3. Start Metro Bundler

Open a second terminal:

```bash
yarn start
```

### 4. Run on Android

```bash
yarn android
```

### 5. Run on iOS

```bash
cd ios && pod install && cd ..
yarn ios
```

> **iOS note** — `pod install` is required before the first iOS build and whenever new native dependencies are added. The `DeviceDetails` native module is already registered in `project.pbxproj` so no manual Xcode step is needed.

---

## GraphQL API

The local server exposes the following schema:

```graphql
type Image {
  id:           ID!
  title:        String!
  author:       String!
  description:  String!
  imageUrl:     String!
  thumbnailUrl: String!
  likes:        Int!
}

type ImagePage {
  images:     [Image!]!
  totalCount: Int!
  hasNextPage: Boolean!
  page:       Int!
}

type Query {
  images(page: Int, limit: Int): ImagePage!
  image(id: ID!): Image
}
```

The server has 40 seed images. The app requests 10 per page.

---

## Animations

| Where | How to trigger | What plays |
|---|---|---|
| Gallery card | Press the heart icon on a card | Red heart bursts and fades out over the image |
| Gallery card | Double-tap the image thumbnail | Same heart burst + like count updates |
| Image Detail | Press the like button (top-right of title) | Button icon bounces once (single clean spring), heart bursts over the image |
| Image Detail | Double-tap the hero image | Heart burst plays, like state and count update |
| Image Detail | Screen open | Image zooms in from 0.72 → 1 with a spring; content slides up and fades in |
| Register form | Focus any input field | Label floats up and shrinks; border and icon colour shift to primary |
| Register form | Press the eye icon | Eye icon does a spring-bounce scale |

---

## Native Module

`DeviceDetails` is implemented as a native bridge module on both platforms.

**Android** — `DeviceDetailsModule.kt` reads from `android.os.Build`:

```kotlin
@ReactMethod
fun getDeviceInfo(promise: Promise) {
    val map = WritableNativeMap()
    map.putString("model", Build.MODEL)
    map.putString("manufacturer", Build.MANUFACTURER)
    map.putString("systemName", "Android")
    map.putString("systemVersion", Build.VERSION.RELEASE)
    map.putString("sdkVersion", Build.VERSION.SDK_INT.toString())
    promise.resolve(map)
}
```

**iOS** — `DeviceDetails.mm` reads from `UIDevice`:

```objc
RCT_EXPORT_METHOD(getDeviceInfo:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    UIDevice *device = [UIDevice currentDevice];
    resolve(@{
        @"model":         device.model,
        @"manufacturer":  @"Apple",
        @"systemName":    device.systemName,
        @"systemVersion": device.systemVersion,
        @"sdkVersion":    @"N/A",
    });
}
```

Accessed in JavaScript via:

```ts
import DeviceDetails from './src/native/DeviceDetails';
const info = await DeviceDetails.getDeviceInfo();
// Android: { model: "Pixel 7", manufacturer: "Google", systemName: "Android", systemVersion: "14", sdkVersion: "34" }
// iOS:     { model: "iPhone", manufacturer: "Apple",  systemName: "iOS",     systemVersion: "17.4", sdkVersion: "N/A" }
```

> The device info is displayed in the **Device Info card at the bottom of the Image Detail screen**.

## App Screenshots

[View App Screenshots](https://github.com/AmmarKhan21/RN-GalleryApp/tree/main/screenshots)
