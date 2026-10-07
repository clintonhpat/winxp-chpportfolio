import React, { useState } from 'react';
import { portfolioData } from '../../../data/desktopData';
import './ContentStyles.css';

/**
 * InternetExplorer Content Component
 * Fake browser showing portfolio links and social media
 */
function InternetExplorer() {
  const { social, personal } = portfolioData;
  const [currentUrl, setCurrentUrl] = useState('https://portfolio.dev/links');

  const links = [
    {
      id: 'github',
      title: 'GitHub',
      url: social.github,
      icon: '🐙',
      description: 'Check out my repositories and contributions',
      color: '#24292e',
    },
    {
      id: 'linkedin',
      title: 'LinkedIn',
      url: social.linkedin,
      icon: '💼',
      description: 'Connect with me professionally',
      color: '#0077b5',
    },
    {
      id: 'twitter',
      title: 'Twitter / X',
      url: social.twitter,
      icon: '🐦',
      description: 'Follow me for tech updates and thoughts',
      color: '#1da1f2',
    },
    {
      id: 'email',
      title: 'Email',
      url: `mailto:${personal.email}`,
      icon: '📧',
      description: 'Send me a message directly',
      color: '#ea4335',
    },
  ];

  const favorites = [
    { title: 'MDN Web Docs', url: 'https://developer.mozilla.org' },
    { title: 'Stack Overflow', url: 'https://stackoverflow.com' },
    { title: 'GitHub', url: 'https://github.com' },
    { title: 'React Docs', url: 'https://react.dev' },
  ];

  return (
    <div className="ie-content">
      {/* IE Toolbar */}
      <div className="ie-toolbar">
        <div className="ie-toolbar-buttons">
          <button className="ie-toolbar-btn" disabled>
            <span>←</span>
            <span className="btn-label">Back</span>
          </button>
          <button className="ie-toolbar-btn" disabled>
            <span>→</span>
            <span className="btn-label">Forward</span>
          </button>
          <button className="ie-toolbar-btn">
            <span>🔄</span>
            <span className="btn-label">Refresh</span>
          </button>
          <button className="ie-toolbar-btn">
            <span>🏠</span>
            <span className="btn-label">Home</span>
          </button>
        </div>
        <div className="ie-address-bar">
          <span className="address-label">Address</span>
          <div className="address-input-wrapper">
            <span className="address-icon">🌐</span>
            <input 
              type="text" 
              className="xp-input address-input" 
              value={currentUrl}
              onChange={(e) => setCurrentUrl(e.target.value)}
            />
          </div>
          <button className="xp-button go-btn">Go</button>
        </div>
      </div>

      {/* IE Content Area */}
      <div className="ie-browser-content">
        <div className="ie-page">
          <header className="ie-page-header">
            <h1>🌐 My Web Presence</h1>
            <p>Find me around the internet</p>
          </header>

          <div className="links-grid">
            {links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-card"
                style={{ '--link-color': link.color }}
              >
                <span className="link-icon">{link.icon}</span>
                <div className="link-info">
                  <h3>{link.title}</h3>
                  <p>{link.description}</p>
                </div>
                <span className="link-arrow">→</span>
              </a>
            ))}
          </div>

          <div className="ie-favorites-section">
            <h2>⭐ Favorite Resources</h2>
            <p>Some sites I find invaluable as a developer:</p>
            <div className="favorites-list">
              {favorites.map((fav, index) => (
                <a
                  key={index}
                  href={fav.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="favorite-link"
                >
                  <span className="fav-icon">📄</span>
                  <span>{fav.title}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="ie-footer">
            <p>🔒 This page is secure and totally legit (just like Windows XP's security 😉)</p>
          </div>
        </div>
      </div>

      {/* IE Status Bar */}
      <div className="ie-status-bar">
        <span className="status-text">✅ Done</span>
        <span className="status-zone">🌐 Internet</span>
      </div>
    </div>
  );
}

export default InternetExplorer;
