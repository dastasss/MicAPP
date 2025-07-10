
# 🎤 MicApp – Microphone Catalog with JWT Login + React Native

A mobile application built with **React Native CLI**, allowing users to log in, select microphone brands (Neumann or Sennheiser), and view a list of microphones with images and links—consuming a **JWT-protected REST API developed in Express.js**.

---

## 🚀 Features

- 🔐 JWT authentication (username and password)
- 🧠 API consumption with token protection (Express)
- 🏷️ Brand selection using logos
- 🖼️ Microphone cards with images and info
- 🌐 External links for more details
- 📱 Support for both emulators and physical Android devices
- 🛠️ Decoupled architecture: `components`, `screens`, `services`, `types`

---


---

## 📸 Screenshots (optional)

> Add screenshots of your app running on emulator or physical device

---

## 🧪 How to Run the Project

### 1. Clone the repository

```bash
git clone https://github.com/your-username/MicApiApp.git
cd MicApiApp
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run on emulator or physical device

```bash
npx react-native start
```

In a new terminal:

```bash
npx react-native run-android
```

> For physical devices, enable USB debugging and allow USB installation on your phone.

---

## 🧱 Backend API (Express.js)

This project uses a **Node.js + Express.js** REST API.  
Main endpoints:

- `POST /auth/login` – returns JWT token
- `GET /microphones/neumann` – requires token
- `GET /microphones/sennheiser` – requires token

For Android emulators, the API base URL should be `http://10.0.2.2:3001`.

---

## 📤 Build APK

To generate an installable APK:

```bash
cd android
./gradlew assembleRelease
```

Final APK will be located at:

```
android/app/build/outputs/apk/release/app-release.apk
```

You can send it via WhatsApp, upload to Drive, or install it manually.

---

## ✨ Author

Created by **Daniel M.**, software developer and systems analyst.  
[Web Portfolio](https://porfolio-daniel.firebaseapp.com)

---

## 📄 License

MIT
