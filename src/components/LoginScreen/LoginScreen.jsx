import React, { useState } from 'react';
import './LoginScreen.css';

function LoginScreen({ onLogin }) {
  const [showShutdown, setShowShutdown] = useState(false);

  const handleUserClick = (username) => {
    onLogin(username);
  };

  const handleShutdown = () => {
    setShowShutdown(true);
  };

  if (showShutdown) {
    return (
      <div className="shutdown-screen">
        <div className="shutdown-message">
          <div className="shutdown-icon">💻</div>
          <p>It is now safe to close this browser tab.</p>
          <button 
            className="restart-btn"
            onClick={() => setShowShutdown(false)}
          >
            Restart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="login-screen">
      {/* Top blue bar */}
      <div className="login-top-bar" />

      {/* Main content */}
      <div className="login-content">
        {/* Left side - Windows logo */}
        <div className="login-left">
          <div className="windows-logo">
            <div className="logo-squares">
              <div className="logo-square red" />
              <div className="logo-square green" />
              <div className="logo-square blue" />
              <div className="logo-square yellow" />
            </div>
            <div className="logo-text">
              <span className="microsoft-text">Microsoft</span>
              <span className="windows-text">
                Windows<span className="xp-text">XP</span>
              </span>
            </div>
          </div>
          <p className="login-instruction">To begin, click your user name</p>
        </div>

        {/* Divider */}
        <div className="login-divider" />

        {/* Right side - User accounts */}
        <div className="login-right">
          <div className="user-list">
            {/* Main User */}
            <button 
              className="user-account"
              onClick={() => handleUserClick('User')}
            >
              <div className="user-avatar">
                <div className="avatar-image">👤</div>
              </div>
              <div className="user-info">
                <span className="user-name">User</span>
              </div>
            </button>

            {/* Guest Account */}
            <button 
              className="user-account guest"
              onClick={() => handleUserClick('Guest')}
            >
              <div className="user-avatar">
                <div className="avatar-image guest-avatar">👥</div>
              </div>
              <div className="user-info">
                <span className="user-name">Guest</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="login-bottom-bar">
        <button className="shutdown-button" onClick={handleShutdown}>
          <div className="shutdown-icon-small">⏻</div>
          <span>Turn off computer</span>
        </button>

        <div className="login-help-text">
          After you log on, you can add or change accounts.<br />
          Just go to Control Panel and click User Accounts.
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;