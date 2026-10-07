import React, { useState, useEffect } from 'react';
import { useWindowManager } from '../../contexts/WindowContext';
import StartMenu from '../StartMenu/StartMenu';
import Icon from '../Icons/Icon';
import './Taskbar.css';

/**
 * Taskbar Component
 * Windows XP style taskbar with start button, running apps, and system tray
 */
function Taskbar({ currentUser, onLogout }) {
  const { windows, windowOrder, activeWindowId, focusWindow, restoreWindow } = useWindowManager();
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update clock every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Format time for display
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Handle start button click
  const handleStartClick = () => {
    setIsStartMenuOpen(!isStartMenuOpen);
  };

  // Close start menu
  const handleCloseStartMenu = () => {
    setIsStartMenuOpen(false);
  };

  // Handle taskbar button click
  const handleTaskbarButtonClick = (windowId) => {
    const window = windows[windowId];
    if (window.isMinimized) {
      restoreWindow(windowId);
    } else if (activeWindowId === windowId) {
      // If clicking the active window, minimize it
      // (This is optional XP behavior)
    } else {
      focusWindow(windowId);
    }
  };

  // Get windows for taskbar (exclude minimized from order but show in buttons)
  const taskbarWindows = Object.values(windows);

  return (
    <>
      <div className="taskbar">
        {/* Start Button */}
        <button 
          className={`start-button ${isStartMenuOpen ? 'active' : ''}`}
          onClick={handleStartClick}
          aria-label="Start menu"
          aria-expanded={isStartMenuOpen}
        >
          <span className="start-logo">🪟</span>
          <span className="start-text">start</span>
        </button>

        {/* Quick Launch (optional) */}
        <div className="quick-launch">
          <div className="quick-launch-divider" />
        </div>

        {/* Taskbar Buttons */}
        <div className="taskbar-buttons">
          {taskbarWindows.map((window) => (
            <button
              key={window.id}
              className={`taskbar-button ${activeWindowId === window.id && !window.isMinimized ? 'active' : ''} ${window.isMinimized ? 'minimized' : ''}`}
              onClick={() => handleTaskbarButtonClick(window.id)}
              title={window.title}
            >
              <Icon type={window.icon} size={16} />
              <span className="taskbar-button-text">{window.title}</span>
            </button>
          ))}
        </div>

        {/* System Tray */}
        <div className="system-tray">
          <div className="tray-icons">
            <span className="tray-icon" title="Volume">🔊</span>
            <span className="tray-icon" title="Network">📶</span>
          </div>
          <div className="tray-clock" title={currentTime.toLocaleDateString()}>
            {formatTime(currentTime)}
          </div>
        </div>
      </div>

      {/* Start Menu */}
      {isStartMenuOpen && (
        <StartMenu 
          onClose={handleCloseStartMenu} 
          currentUser={currentUser}
          onLogout={onLogout}
        />
      )}

      {/* Overlay to close start menu when clicking outside */}
      {isStartMenuOpen && (
        <div 
          className="start-menu-overlay" 
          onClick={handleCloseStartMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
}

export default Taskbar;
