import { Link, useLocation } from 'react-router-dom';
import { BookOpen, LogOut, User, Home, BookOpenCheck, ChevronLeft, ChevronRight, Plus, Settings, Sparkles, Video, FileText, FolderOpen, Clock, Puzzle, MoreHorizontal } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useState, useEffect } from 'react';
import './Header.css';

function Header() {
  const { currentUser, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Update App container class when sidebar state changes
  useEffect(() => {
    const appElement = document.querySelector('.App');
    if (appElement) {
      if (isCollapsed) {
        appElement.classList.add('sidebar-collapsed');
      } else {
        appElement.classList.remove('sidebar-collapsed');
      }
    }
  }, [isCollapsed]);

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`header ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="header-content">
        {/* User Section */}
        <div className="user-section-top">
          <div className="user-info-main">
            <div className="user-avatar">
              <User size={20} />
            </div>
            {!isCollapsed && (
              <div className="user-details-main">
                <span className="username-main">{currentUser?.displayName || currentUser?.email || 'User'}</span>
                <button className="close-user-btn">
                  <MoreHorizontal size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* New Chat Button */}
        <div className="new-chat-section">
          <Link to="/add-manga" className="new-chat-btn">
            <Plus size={20} />
            {!isCollapsed && <span>New Manga</span>}
          </Link>
        </div>
        
        {/* Main Navigation */}
        <nav className="nav">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            <Home size={20} />
            {!isCollapsed && <span>Home</span>}
          </Link>
          {/* <Link to="/files" className={`nav-link ${isActive('/files') ? 'active' : ''}`}>
            <FileText size={20} />
            {!isCollapsed && <span>Files</span>}
          </Link> */}
          
        </nav>


        {/* Bottom Section */}
        <div className="bottom-section">
          <button className="settings-btn">
            <Settings size={20} />
            {!isCollapsed && <span>Settings</span>}
          </button>
          
          
          
          <button onClick={handleLogout} className="logout-btn" title="Logout">
            <LogOut size={20} />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>

        {/* Toggle Button */}
        <button className="toggle-btn" onClick={toggleSidebar} title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}>
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
    </header>
  );
}

export default Header; 