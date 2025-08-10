import { Link } from 'react-router-dom';
import { BookOpen, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

function Header() {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <BookOpen size={32} />
          <h1>Manga Tracker</h1>
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/" className="nav-link">My Collection</Link>
        </nav>
        {currentUser && (
          <div className="user-section">
            <div className="user-info">
              <User size={20} />
              <span className="username">{currentUser.displayName || currentUser.email}</span>
            </div>
            <button onClick={handleLogout} className="logout-btn">
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header; 