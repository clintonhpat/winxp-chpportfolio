import React, { useState } from 'react';
import { portfolioData } from '../../../data/desktopData';
import './ContentStyles.css';

function CollapsibleSection({ title, defaultOpen = true, children }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="xp-sidebar-section">
      <button 
        className="xp-sidebar-header"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <span className="xp-collapse-arrow">{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && <div className="xp-sidebar-content">{children}</div>}
    </div>
  );
}

function SidebarLink({ icon, children, href }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="xp-sidebar-link">
      <span className="xp-sidebar-link-icon">{icon}</span>
      <span>{children}</span>
    </a>
  );
}

function SidebarInfo({ icon, label, value }) {
  return (
    <div className="sidebar-info-row">
      <span className="sidebar-info-icon">{icon}</span>
      <div className="sidebar-info-text">
        <span className="sidebar-info-label">{label}</span>
        <span className="sidebar-info-value">{value}</span>
      </div>
    </div>
  );
}

function AboutMe() {
  const { personal = {}, about = {} } = portfolioData;

  const bio = about.bio || "Welcome to my portfolio! I'm a passionate developer who loves creating innovative solutions and bringing ideas to life through code.";
  const funFacts = about.funFacts || [
    "I love solving complex problems",
    "Coffee is my fuel ☕",
    "Always learning something new"
  ];

  return (
    <div className="aboutme-window">
      <div className="xp-explorer-sidebar">
        <CollapsibleSection title="Quick Info">
          <div className="sidebar-info-list">
            <SidebarInfo icon="📍" label="Location" value={personal.location || 'City, Country'} />
            <SidebarInfo icon="💼" label="Title" value={personal.title || 'Developer'} />
            <SidebarInfo icon="✉️" label="Email" value={personal.email || 'email@example.com'} />
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="See Also">
          <SidebarLink icon="🔗" href={personal.github || 'https://github.com/clintonhpat'}>
            GitHub Profile
          </SidebarLink>
          <SidebarLink icon="🔗" href={personal.linkedin || 'https://linkedin.com'}>
            LinkedIn
          </SidebarLink>
        </CollapsibleSection>
      </div>

      <div className="aboutme-content">
        <div className="aboutme-header">
          <div className="aboutme-avatar">
            {personal.avatar ? (
              <img src={personal.avatar} alt={personal.name} />
            ) : (
              <div className="avatar-placeholder">👤</div>
            )}
          </div>
          <div className="aboutme-title">
            <h1>{personal.name || 'Your Name'}</h1>
            <p>{personal.title || 'Full Stack Developer'}</p>
          </div>
        </div>

        <section className="aboutme-section">
          <h2>👋 Hello, World!</h2>
          <p>{bio}</p>
        </section>

        <section className="aboutme-section">
          <h2>💡 What I Do</h2>
          <div className="whatido-grid">
            <div className="whatido-card">
              <div className="whatido-icon">🎨</div>
              <h3>Frontend Development</h3>
              <p>Building responsive, accessible, and performant user interfaces</p>
            </div>
            <div className="whatido-card">
              <div className="whatido-icon">⚙️</div>
              <h3>Backend Development</h3>
              <p>Creating robust APIs and server-side applications</p>
            </div>
          </div>
        </section>

        <section className="aboutme-section">
          <h2>🎯 Fun Facts</h2>
          <ul className="funfacts-list">
            {funFacts.map((fact, index) => (
              <li key={index}>{fact}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default AboutMe;