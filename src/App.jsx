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
import MangaDetail from './components/MangaDetail';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch mangas from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'mangas'), (snapshot) => {
      const mangaList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMangas(mangaList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

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
    return <div className="loading">Loading...</div>;
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
                      <AddMangaForm onAddManga={addManga} />
                      <MangaList 
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
              path="/manga/:id" 
              element={
                <ProtectedRoute>
                  <>
                    <Header />
                    <main className="main-content">
                      <MangaDetail 
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
