import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase/config';
import './App.css';

// Contexts
import { AuthProvider } from './contexts/AuthContext';

// Components
import Header from './components/Header';
import MangaList from './components/MangaList';
import AddMangaForm from './components/AddMangaForm';
import AddMangaPage from './components/AddMangaPage';
import HomePage from './components/HomePage';
import MangaDetail from './components/MangaDetail';
import MangaDetailPage from './components/MangaDetailPage';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Fetch mangas from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'mangas'), (snapshot) => {
      const mangaList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMangas(mangaList);
      setDataLoaded(true);
    });

    return () => unsubscribe();
  }, []);

  // Minimum loading time effect
  useEffect(() => {
    if (dataLoaded) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000); // Show loading for at least 2 seconds

      return () => clearTimeout(timer);
    }
  }, [dataLoaded]);

  // Add new manga
  const addManga = async (mangaData) => {
    try {
      await addDoc(collection(db, 'mangas'), {
        ...mangaData,
        createdAt: new Date(),
        lastUpdated: new Date()
      });
    } catch (error) {
      console.error('Error adding manga:', error);
    }
  };

  // Update manga
  const updateManga = async (id, updates) => {
    try {
      const mangaRef = doc(db, 'mangas', id);
      await updateDoc(mangaRef, {
        ...updates,
        lastUpdated: new Date()
      });
    } catch (error) {
      console.error('Error updating manga:', error);
    }
  };

  // Delete manga
  const deleteManga = async (id) => {
    try {
      await deleteDoc(doc(db, 'mangas', id));
    } catch (error) {
      console.error('Error deleting manga:', error);
    }
  };

  if (loading) {
    return (
      <div className="loading-page">
        <LoadingSpinner size="large" text="Loading Manga Tracker..." />
      </div>
    );
  }

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <>
                    <Header />
                    <main className="main-content">
                      <HomePage 
                        mangas={mangas}
                        onUpdateManga={updateManga}
                        onDeleteManga={deleteManga}
                      />
                    </main>
                  </>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/add-manga" 
              element={
                <ProtectedRoute>
                  <>
                    <Header />
                    <main className="main-content">
                      <AddMangaPage onAddManga={addManga} />
                    </main>
                  </>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/manga/:id" 
              element={
                <ProtectedRoute>
                  <>
                    <Header />
                    <main className="main-content">
                      <MangaDetailPage 
                        mangas={mangas}
                        onUpdateManga={updateManga}
                        onDeleteManga={deleteManga}
                      />
                    </main>
                  </>
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
