import MangaDetail from './MangaDetail';

function MangaDetailPage({ mangas, onUpdateManga, onDeleteManga }) {
  return (
    <div className="manga-detail-page">
      <div className="page-header">
        <h1>Manga Details</h1>
        <p>View and edit manga information</p>
      </div>
      <div className="detail-container">
        <MangaDetail 
          mangas={mangas}
          onUpdateManga={onUpdateManga}
          onDeleteManga={onDeleteManga}
        />
      </div>
    </div>
  );
}

export default MangaDetailPage;
