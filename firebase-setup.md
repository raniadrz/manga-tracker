# 🔥 Firebase Setup Guide

Follow these steps to set up Firebase for your Manga Tracker application:

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter a project name (e.g., "manga-tracker")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Firestore Database

1. In your Firebase project dashboard, click "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" for development (you can secure it later)
4. Select a location for your database (choose the closest to your users)
5. Click "Done"

## Step 3: Get Your Configuration

1. Click the gear icon (⚙️) next to "Project Overview" in the left sidebar
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon (</>)
5. Register your app with a nickname (e.g., "manga-tracker-web")
6. Copy the configuration object

## Step 4: Update Your Config File

1. Open `src/firebase/config.js`
2. Replace the placeholder configuration with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key-here",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

## Step 5: Set Firestore Rules (Development)

1. In Firebase Console, go to Firestore Database > Rules
2. Replace the existing rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

3. Click "Publish"

**⚠️ Important**: These rules allow anyone to read/write to your database. This is fine for development but should be secured for production.

## Step 6: Test Your Setup

1. Start your development server: `npm run dev`
2. Open the app in your browser
3. Try adding a manga
4. Check Firebase Console > Firestore Database to see if data is being created

## Production Security (Optional)

When you're ready to deploy, update your Firestore rules to be more secure:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /mangas/{mangaId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

This requires users to be authenticated before they can read/write manga data.

## Troubleshooting

### Common Issues:

1. **"Firebase: Error (auth/unauthorized-domain)"**
   - Add your domain to Firebase Console > Authentication > Settings > Authorized domains

2. **"Firebase: Error (firestore/permission-denied)"**
   - Check your Firestore rules in Firebase Console

3. **"Firebase: Error (app/no-app)"**
   - Make sure you've initialized Firebase correctly in your config file

### Need Help?

- Check [Firebase Documentation](https://firebase.google.com/docs)
- Visit [Firebase Support](https://firebase.google.com/support)
- Check the console for specific error messages

---

Once you've completed these steps, your Manga Tracker will be fully connected to Firebase and ready to store your manga collection in the cloud! 🚀 