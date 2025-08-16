import MangaList from './MangaList';

function HomePage({ mangas, onUpdateManga, onDeleteManga }) {
  return (
    <div className="home-page">
      <div className="page-header">
        <h1>My Manga Collection</h1>
        <p>Track and manage your manga reading progress</p>
      </div>
      <div className="manga-list-container">
        <MangaList 
          mangas={mangas} 
          onUpdateManga={onUpdateManga}
          onDeleteManga={onDeleteManga}
        />
      </div>
    </div>
  );
}

export default HomePage;
