import { useState } from 'react';
import { Plus, BookOpen, Hash, Image, Tag } from 'lucide-react';

function AddMangaForm({ onAddManga }) {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    status: 'reading',
    currentChapter: '',
    totalChapters: '',
    coverImageUrl: '',
    description: ''
  });
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.category || !formData.currentChapter) {
      alert('Please fill in all required fields');
      return;
    }
    
    onAddManga({
      ...formData,
      currentChapter: parseInt(formData.currentChapter) || 0,
      totalChapters: parseInt(formData.totalChapters) || 0
    });
    
    setFormData({
      title: '',
      category: '',
      status: 'reading',
      currentChapter: '',
      totalChapters: '',
      coverImageUrl: '',
      description: ''
    });
    setIsFormOpen(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isFormOpen) {
    return (
      <div className="add-manga-button">
        <button 
          onClick={() => setIsFormOpen(true)}
          className="btn btn-primary"
        >
          <Plus size={20} />
          Add New Manga
        </button>
      </div>
    );
  }

  return (
    <div className="add-manga-form">
      <div className="form-header">
        <h2>Add New Manga</h2>
        <button 
          onClick={() => setIsFormOpen(false)}
          className="btn btn-secondary"
        >
          Cancel
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="title">
            <BookOpen size={16} />
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter manga title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">
            <Tag size={16} />
            Category *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            
            {/* Main Genres */}
            <optgroup label="Main Genres">
              <option value="action">Action</option>
              <option value="adventure">Adventure</option>
              <option value="comedy">Comedy</option>
              <option value="drama">Drama</option>
              <option value="fantasy">Fantasy</option>
              <option value="horror">Horror</option>
              <option value="mystery">Mystery</option>
              <option value="romance">Romance</option>
              <option value="harem">Harem</option>
              <option value="sci-fi">Sci-Fi</option>
              <option value="slice-of-life">Slice of Life</option>
              <option value="sports">Sports</option>
              <option value="supernatural">Supernatural</option>
              <option value="shounen">Shounen</option>
              <option value="shoujo">Shoujo</option>
              <option value="seinen">Seinen</option>
              <option value="josei">Josei</option>
              <option value="school-life">School Life</option>
              <option value="work-life">Work Life</option>
              <option value="isekai">Isekai</option>
              <option value="reincarnation">Reincarnation</option>
              <option value="time-travel">Time Travel</option>
              <option value="vampire">Vampire</option>
              <option value="cooking">Cooking</option>
            </optgroup>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="status">
            <BookOpen size={16} />
            Reading Status *
          </label>
          <select
            id="status"
            name="status"
            value={formData.status || 'reading'}
            onChange={handleChange}
            required
          >
            <option value="reading">Currently Reading</option>
            <option value="completed">Completed</option>
            <option value="plan-to-read">Plan to Read</option>
            <option value="on-hold">On Hold</option>
            <option value="dropped">Dropped</option>
            <option value="re-reading">Re-reading</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="currentChapter">
            <Hash size={16} />
            Current Chapter *
          </label>
          <input
            type="number"
            id="currentChapter"
            name="currentChapter"
            value={formData.currentChapter}
            onChange={handleChange}
            placeholder="0"
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="totalChapters">
            <Hash size={16} />
            Total Chapters
          </label>
          <input
            type="number"
            id="totalChapters"
            name="totalChapters"
            value={formData.totalChapters}
            onChange={handleChange}
            placeholder="Unknown"
            min="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="coverImageUrl">
            <Image size={16} />
            Cover Image URL
          </label>
          <input
            type="url"
            id="coverImageUrl"
            name="coverImageUrl"
            value={formData.coverImageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter manga description (optional)"
            rows="3"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            <Plus size={20} />
            Add Manga
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddMangaForm; 