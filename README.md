# 🎤 MicApiApp – Microphone Catalog with JWT Login + React Native

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

>  screenshots of your app running on emulator
> <img width="586" height="922" alt="Captura de pantalla 2025-07-10 223648" src="https://github.com/user-attachments/assets/73183c0a-8b1e-4e06-993d-8b289b16fff3" />

<img width="592" height="908" alt="Captura de pantalla 2025-07-10 223733" src="https://github.com/user-attachments/assets/a2e92a19-5e27-4c7c-9a39-cfa5bbbd823d" />

<img width="583" height="815" alt="Captura de pantalla 2025-07-10 223753" src="https://github.com/user-attachments/assets/7b2a7fd3-bba4-4a14-8a00-1eba5cac74c7" />

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
