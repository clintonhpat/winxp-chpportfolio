import React, { useEffect, useRef } from 'react';
import './ContextMenu.css';

function ContextMenu({ x, y, onClose, onAction }) {
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  // Adjust position to keep menu on screen
  useEffect(() => {
    if (menuRef.current) {
      const menu = menuRef.current;
      const rect = menu.getBoundingClientRect();
      
      if (rect.right > window.innerWidth) {
        menu.style.left = `${x - rect.width}px`;
      }
      if (rect.bottom > window.innerHeight - 40) { // 40 for taskbar
        menu.style.top = `${y - rect.height}px`;
      }
    }
  }, [x, y]);

  const handleItemClick = (action) => {
    onAction(action);
    onClose();
  };

  return (
    <div 
      ref={menuRef}
      className="context-menu"
      style={{ left: x, top: y }}
    >
      <div className="context-menu-section">
        <button 
          className="context-menu-item"
          onClick={() => handleItemClick('arrange-icons')}
        >
          <span className="menu-icon">📐</span>
          <span className="menu-label">Arrange Icons By</span>
          <span className="menu-arrow">▶</span>
        </button>
        <button 
          className="context-menu-item"
          onClick={() => handleItemClick('refresh')}
        >
          <span className="menu-icon">🔄</span>
          <span className="menu-label">Refresh</span>
        </button>
      </div>

      <div className="context-menu-divider" />

      <div className="context-menu-section">
        <button 
          className="context-menu-item has-submenu"
          onClick={() => handleItemClick('new')}
        >
          <span className="menu-icon">📄</span>
          <span className="menu-label">New</span>
          <span className="menu-arrow">▶</span>
        </button>
      </div>

      <div className="context-menu-divider" />

      <div className="context-menu-section">
        <button 
          className="context-menu-item"
          onClick={() => handleItemClick('display-settings')}
        >
          <span className="menu-icon">🖥️</span>
          <span className="menu-label">Display Settings</span>
        </button>
        <button 
          className="context-menu-item"
          onClick={() => handleItemClick('personalize')}
        >
          <span className="menu-icon">🎨</span>
          <span className="menu-label">Personalize</span>
        </button>
      </div>

      <div className="context-menu-divider" />

      <div className="context-menu-section">
        <button 
          className="context-menu-item"
          onClick={() => handleItemClick('properties')}
        >
          <span className="menu-icon">⚙️</span>
          <span className="menu-label">Properties</span>
        </button>
      </div>
    </div>
  );
}

export default ContextMenu;