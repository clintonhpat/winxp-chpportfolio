import React from 'react';
import { useWindowManager } from '../../contexts/WindowContext';
import { desktopIcons, startMenuItems, portfolioData } from '../../data/desktopData';
import Icon from '../Icons/Icon';
import './StartMenu.css';

/**
 * StartMenu Component
 * Windows XP style start menu with pinned programs and places
 */
function StartMenu({ onClose, currentUser, onLogout }) {
  const { openWindow } = useWindowManager();
  const { personal } = portfolioData;

  // Handle menu item click
  const handleItemClick = (itemId) => {
    const iconData = desktopIcons.find(icon => icon.id === itemId);
    if (iconData) {
      openWindow(itemId, {
        ...iconData.windowConfig,
        icon: iconData.icon,
      });
    }
    onClose();
  };

  return (
    <div className="start-menu" role="menu" aria-label="Start menu">
      {/* Header with user info */}
      <div className="start-menu-header">
        <div className="user-avatar">
          {personal.avatar ? (
            <img src={personal.avatar} alt={personal.name} />
          ) : (
            <span className="avatar-placeholder-icon">👤</span>
          )}
        </div>
        <span className="user-name">{currentUser || personal.name}</span>
      </div>

      {/* Main content area */}
      <div className="start-menu-body">
        {/* Left Column - Programs */}
        <div className="start-menu-left">
          {/* Pinned Programs */}
          <div className="pinned-programs">
            {startMenuItems.pinned.map((item) => (
              <button
                key={item.id}
                className="start-menu-item pinned"
                onClick={() => handleItemClick(item.id)}
              >
                <Icon type={item.icon} size={32} />
                <div className="item-info">
                  <span className="item-title">{item.title}</span>
                  <span className="item-description">{item.description}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="start-menu-divider" />

          {/* Recent/All Programs */}
          <div className="programs-list">
            {startMenuItems.programs.map((item) => (
              <button
                key={item.id}
                className="start-menu-item"
                onClick={() => handleItemClick(item.id)}
              >
                <Icon type={item.icon} size={24} />
                <span className="item-title">{item.title}</span>
              </button>
            ))}
          </div>

          {/* All Programs */}
          <div className="all-programs">
            <button className="all-programs-button">
              <span>All Programs</span>
              <span className="arrow">▶</span>
            </button>
          </div>
        </div>

        {/* Right Column - Places */}
        <div className="start-menu-right">
          <div className="places-list">
            {startMenuItems.places.map((item) => (
              <button
                key={item.id}
                className="start-menu-item place"
                onClick={() => handleItemClick(item.id)}
              >
                <Icon type={item.icon} size={24} />
                <span className="item-title">{item.title}</span>
              </button>
            ))}
          </div>

          <div className="start-menu-divider" />

          {/* System Links */}
          <div className="system-links">
            <button className="start-menu-item place">
              <span className="system-icon">⚙️</span>
              <span className="item-title">Control Panel</span>
            </button>
            <button className="start-menu-item place">
              <span className="system-icon">🖨️</span>
              <span className="item-title">Printers and Faxes</span>
            </button>
            <button className="start-menu-item place">
              <span className="system-icon">❓</span>
              <span className="item-title">Help and Support</span>
            </button>
            <button className="start-menu-item place">
              <span className="system-icon">🔍</span>
              <span className="item-title">Search</span>
            </button>
            <button className="start-menu-item place">
              <span className="system-icon">▶️</span>
              <span className="item-title">Run...</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="start-menu-footer">
        <button className="footer-button" onClick={() => { onClose(); onLogout(); }}>
          <span className="footer-icon">🔒</span>
          <span>Log Off</span>
        </button>
        <button className="footer-button shutdown" onClick={() => { onClose(); onLogout(); }}>
          <span className="footer-icon">⏻</span>
          <span>Turn Off Computer</span>
        </button>
      </div>
    </div>
  );
}

export default StartMenu;
