import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Edit, Save, X, Trash2, ArrowLeft, Plus, Minus } from 'lucide-react';

function MangaDetail({ mangas, onUpdateManga, onDeleteManga }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  const manga = mangas.find(m => m.id === id);

  if (!manga) {
    return (
      <div className="error-state">
        <h3>Manga not found</h3>
        <button onClick={() => navigate('/')} className="btn btn-primary">
          Go back to collection
        </button>
      </div>
    );
  }

  const handleEdit = () => {
    setEditData({
      title: manga.title,
      category: manga.category,
      currentChapter: manga.currentChapter,
      totalChapters: manga.totalChapters || 0,
      coverImageUrl: manga.coverImageUrl || '',
      description: manga.description || '',
      status: manga.status || 'reading'
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdateManga(id, {
      ...editData,
      currentChapter: parseInt(editData.currentChapter) || 0,
      totalChapters: parseInt(editData.totalChapters) || 0
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({});
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this manga?')) {
      onDeleteManga(id);
      navigate('/');
    }
  };

  const handleChapterUpdate = (increment) => {
    const newChapter = Math.max(0, manga.currentChapter + increment);
    onUpdateManga(id, { currentChapter: newChapter });
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date.toDate ? date.toDate() : date).toLocaleDateString();
  };

  if (isEditing) {
    return (
      <div className="manga-detail">
        <div className="detail-header">
          <button onClick={handleCancel} className="btn btn-secondary">
            <X size={20} />
            Cancel
          </button>
          <h2>Edit Manga</h2>
          <button onClick={handleSave} className="btn btn-primary">
            <Save size={20} />
            Save
          </button>
        </div>

        <div className="edit-form">
          <div className="form-group">
            <label htmlFor="edit-title">Title</label>
            <input
              type="text"
              id="edit-title"
              value={editData.title}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-category">Category</label>
            <select
              id="edit-category"
              value={editData.category}
              onChange={(e) => setEditData({ ...editData, category: e.target.value })}
              required
            >
              <option value="action">Action</option>
              <option value="adventure">Adventure</option>
              <option value="comedy">Comedy</option>
              <option value="drama">Drama</option>
              <option value="fantasy">Fantasy</option>
              <option value="horror">Horror</option>
              <option value="mystery">Mystery</option>
              <option value="romance">Romance</option>
              <option value="sci-fi">Sci-Fi</option>
              <option value="slice-of-life">Slice of Life</option>
              <option value="sports">Sports</option>
              <option value="supernatural">Supernatural</option>
              <option value="thriller">Thriller</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="edit-current-chapter">Current Chapter</label>
              <input
                type="number"
                id="edit-current-chapter"
                value={editData.currentChapter}
                onChange={(e) => setEditData({ ...editData, currentChapter: e.target.value })}
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="edit-total-chapters">Total Chapters</label>
              <input
                type="number"
                id="edit-total-chapters"
                value={editData.totalChapters}
                onChange={(e) => setEditData({ ...editData, totalChapters: e.target.value })}
                min="0"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="edit-status">Status</label>
            <select
              id="edit-status"
              value={editData.status}
              onChange={(e) => setEditData({ ...editData, status: e.target.value })}
            >
              <option value="reading">Reading</option>
              <option value="completed">Completed</option>
              <option value="on-hold">On Hold</option>
              <option value="dropped">Dropped</option>
              <option value="plan-to-read">Plan to Read</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="edit-cover-url">Cover Image URL</label>
            <input
              type="url"
              id="edit-cover-url"
              value={editData.coverImageUrl}
              onChange={(e) => setEditData({ ...editData, coverImageUrl: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-description">Description</label>
            <textarea
              id="edit-description"
              value={editData.description}
              onChange={(e) => setEditData({ ...editData, description: e.target.value })}
              rows="4"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="manga-detail">
      <div className="detail-header">
        <button onClick={() => navigate('/')} className="btn btn-secondary">
          <ArrowLeft size={20} />
          Back to Collection
        </button>
        <h2>{manga.title}</h2>
        <div className="header-actions">
          <button onClick={handleEdit} className="btn btn-primary">
            <Edit size={20} />
            Edit
          </button>
          <button onClick={handleDelete} className="btn btn-danger">
            <Trash2 size={20} />
            Delete
          </button>
        </div>
      </div>

      <div className="detail-content">
        <div className="detail-main">
          <div className="cover-section">
            {manga.coverImageUrl ? (
              <img 
                src={manga.coverImageUrl} 
                alt={manga.title}
                className="detail-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
            ) : null}
            <div className="cover-placeholder detail" style={{ display: manga.coverImageUrl ? 'none' : 'block' }}>
              <span>📚</span>
            </div>
          </div>

          <div className="info-section">
            <div className="info-group">
              <label>Category:</label>
              <span className={`category-badge ${manga.category}`}>
                {manga.category}
              </span>
            </div>

            <div className="info-group">
              <label>Status:</label>
              <span className={`status-badge ${manga.status || 'reading'}`}>
                {manga.status || 'reading'}
              </span>
            </div>

            <div className="info-group">
              <label>Current Chapter:</label>
              <div className="chapter-controls">
                <button
                  onClick={() => handleChapterUpdate(-1)}
                  className="btn btn-icon btn-secondary"
                  title="Decrease chapter"
                >
                  <Minus size={16} />
                </button>
                <span className="chapter-number">{manga.currentChapter}</span>
                <button
                  onClick={() => handleChapterUpdate(1)}
                  className="btn btn-icon btn-primary"
                  title="Increase chapter"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {manga.totalChapters > 0 && (
              <div className="info-group">
                <label>Total Chapters:</label>
                <span>{manga.totalChapters}</span>
              </div>
            )}

            <div className="info-group">
              <label>Added:</label>
              <span>{formatDate(manga.createdAt)}</span>
            </div>

            <div className="info-group">
              <label>Last Updated:</label>
              <span>{formatDate(manga.lastUpdated)}</span>
            </div>

            {manga.description && (
              <div className="info-group">
                <label>Description:</label>
                <p className="description-text">{manga.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MangaDetail; 