import AddMangaForm from './AddMangaForm';

function AddMangaPage({ onAddManga }) {
  return (
    <div className="add-manga-page">
      <div className="page-header">
        <h1>Add New Manga</h1>
        <p>Fill out the form below to add a new manga to your collection</p>
      </div>
      <div className="form-container">
        <AddMangaForm onAddManga={onAddManga} />
      </div>
    </div>
  );
}

export default AddMangaPage;
