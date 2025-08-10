# 📚 Manga Tracker

A beautiful and modern web application to track your manga collection, built with React and Firebase. Keep track of your reading progress, organize by categories, and add cover images to your collection.

## ✨ Features

- **📖 Manga Management**: Add, edit, and delete mangas from your collection
- **🏷️ Categories**: Organize mangas by genre (Action, Adventure, Comedy, Drama, Fantasy, etc.)
- **📊 Chapter Tracking**: Track your current chapter and total chapters
- **🖼️ Cover Images**: Add cover images via URL links
- **🔍 Search & Filter**: Find mangas quickly with search and category filters
- **📱 Responsive Design**: Works perfectly on desktop and mobile devices
- **☁️ Cloud Storage**: All data is stored securely in Firebase Firestore
- **⚡ Real-time Updates**: Changes sync instantly across all devices

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- Firebase account

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd manga-tracker
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable Firestore Database
4. Go to Project Settings > General
5. Scroll down to "Your apps" and click the web icon (</>)
6. Register your app and copy the configuration

### 4. Configure Firebase

1. Open `src/firebase/config.js`
2. Replace the placeholder configuration with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};
```

### 5. Firestore Rules

In your Firebase Console, go to Firestore Database > Rules and set the following rules for development:

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

**Note**: These rules allow anyone to read/write. For production, implement proper authentication and security rules.

### 6. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🎯 Usage

### Adding a Manga

1. Click the "Add New Manga" button
2. Fill in the required fields:
   - **Title**: The name of the manga
   - **Category**: Select from predefined genres
   - **Current Chapter**: Your current reading progress
   - **Cover Image URL**: Link to the manga cover (optional)
   - **Description**: Brief description (optional)
3. Click "Add Manga"

### Managing Your Collection

- **View Details**: Click the eye icon to see full manga information
- **Update Chapters**: Use the + and - buttons to adjust your current chapter
- **Edit Manga**: Click the edit button to modify manga details
- **Delete Manga**: Remove mangas you no longer want to track
- **Search & Filter**: Use the search bar and category filter to find specific mangas

### Categories Available

- Action, Adventure, Comedy, Drama, Fantasy
- Horror, Mystery, Romance, Sci-Fi, Slice of Life
- Sports, Supernatural, Thriller

## 🛠️ Built With

- **React 18** - Modern React with hooks
- **Firebase Firestore** - NoSQL cloud database
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons
- **Vite** - Fast build tool and dev server
- **CSS3** - Modern styling with gradients and animations

## 📱 Responsive Design

The application is fully responsive and works great on:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌟 Features in Detail

### Real-time Sync
All changes are immediately reflected across all open browser tabs and devices thanks to Firebase's real-time capabilities.

### Beautiful UI
- Glassmorphism design with backdrop blur effects
- Smooth animations and transitions
- Gradient backgrounds and modern color schemes
- Intuitive user interface

### Data Persistence
- All manga data is stored in Firebase Firestore
- Automatic timestamps for creation and updates
- No local storage required

### Search & Organization
- Full-text search across manga titles
- Category-based filtering
- Sort by various criteria
- Quick chapter updates

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Firebase team for the amazing backend services
- React team for the incredible frontend framework
- The manga community for inspiration

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/manga-tracker/issues) page
2. Create a new issue with detailed information
3. Include your browser version and operating system

---

**Happy Manga Reading! 📚✨**
