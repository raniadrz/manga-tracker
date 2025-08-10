import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Eye, Plus, Minus, Filter, BookOpen } from 'lucide-react';

function MangaList({ mangas, onUpdateManga, onDeleteManga }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Get unique categories and statuses
  const categories = [...new Set(mangas.map(manga => manga.category))];
  const statuses = [...new Set(mangas.map(manga => manga.status || 'reading'))];

  // Filter mangas based on search, category, and status
  const filteredMangas = mangas.filter(manga => {
    const matchesSearch = manga.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || manga.category === selectedCategory;
    const matchesStatus = selectedStatus === '' || (manga.status || 'reading') === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleChapterUpdate = (mangaId, increment) => {
    const manga = mangas.find(m => m.id === mangaId);
    if (manga) {
      const newChapter = Math.max(0, manga.currentChapter + increment);
      onUpdateManga(mangaId, { currentChapter: newChapter });
    }
  };

  const handleDelete = (mangaId) => {
    if (window.confirm('Are you sure you want to delete this manga?')) {
      onDeleteManga(mangaId);
    }
  };

  if (mangas.length === 0) {
    return (
      <div className="empty-state">
        <h3>No mangas yet!</h3>
        <p>Start building your collection by adding your first manga.</p>
      </div>
    );
  }

  return (
    <div className="manga-list-container">
      <div className="list-controls">
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search mangas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          
          <div className="filter-group">
            <Filter size={16} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-filter"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <BookOpen size={16} />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="status-filter"
            >
              <option value="">All Statuses</option>
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="stats">
          <span>Total: {filteredMangas.length}</span>
        </div>
      </div>

      <div className="manga-grid">
        {filteredMangas.map(manga => (
          <div key={manga.id} className="manga-card">
            <div className="manga-cover">
              {manga.coverImageUrl ? (
                <img 
                  src={manga.coverImageUrl} 
                  alt={manga.title}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
              ) : null}
              <div className="cover-placeholder" style={{ display: manga.coverImageUrl ? 'none' : 'block' }}>
                <span>📚</span>
              </div>
            </div>
            
            <div className="manga-info">
              <h3 className="manga-title">{manga.title}</h3>
              <div className="manga-category">
                <span className={`category-badge ${manga.category}`}>
                  {manga.category}
                </span>
                <span className={`status-badge ${manga.status || 'reading'}`}>
                  {manga.status || 'reading'}
                </span>
              </div>
              
              <div className="chapter-info">
                <span className="chapter-label">Chapter {manga.currentChapter}</span>
                {manga.totalChapters > 0 && (
                  <span className="total-chapters">/ {manga.totalChapters}</span>
                )}
              </div>
              
              {manga.description && (
                <p className="manga-description">{manga.description}</p>
              )}
            </div>
            
            <div className="manga-actions">
              <div className="chapter-controls">
                <button
                  onClick={() => handleChapterUpdate(manga.id, -1)}
                  className="btn btn-icon btn-secondary"
                  title="Decrease chapter"
                >
                  <Minus size={16} />
                </button>
                <button
                  onClick={() => handleChapterUpdate(manga.id, 1)}
                  className="btn btn-icon btn-primary"
                  title="Increase chapter"
                >
                  <Plus size={16} />
                </button>
              </div>
              
              <div className="action-buttons">
                <Link to={`/manga/${manga.id}`} className="btn btn-icon btn-secondary" title="View details">
                  <Eye size={16} />
                </Link>
                <button
                  onClick={() => handleDelete(manga.id)}
                  className="btn btn-icon btn-danger"
                  title="Delete manga"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredMangas.length === 0 && mangas.length > 0 && (
        <div className="no-results">
          <p>No mangas found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
}

export default MangaList; 