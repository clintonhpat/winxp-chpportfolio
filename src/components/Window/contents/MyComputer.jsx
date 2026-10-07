import React, { useState } from 'react';
import { useWindowManager } from '../../../contexts/WindowContext';
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

function SidebarLink({ icon, children, onClick, href }) {
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="xp-sidebar-link">
        <span className="xp-sidebar-link-icon">{icon}</span>
        <span>{children}</span>
      </a>
    );
  }
  return (
    <button className="xp-sidebar-link" onClick={onClick}>
      <span className="xp-sidebar-link-icon">{icon}</span>
      <span>{children}</span>
    </button>
  );
}

function MyComputer() {
  const { openWindow } = useWindowManager();

  const handleDriveClick = (driveId, title, content) => {
    openWindow(driveId, {
      title,
      content,
      size: { width: 800, height: 600 },
    });
  };

  return (
    <div className="xp-explorer-window">
      <div className="xp-explorer-sidebar">
        <CollapsibleSection title="System Tasks">
          <SidebarLink icon="ℹ️" onClick={() => alert('System Information:\n\nPortfolio XP Professional\nVersion 2024')}>
            View system information
          </SidebarLink>
          <SidebarLink icon="➕" onClick={() => alert('All programs are pre-installed!')}>
            Add or remove programs
          </SidebarLink>
        </CollapsibleSection>

        <CollapsibleSection title="Other Places">
          <SidebarLink icon="📁" onClick={() => handleDriveClick('about-me', 'About Me', 'AboutMe')}>
            My Documents
          </SidebarLink>
          <SidebarLink icon="🌐" onClick={() => handleDriveClick('internet-explorer', 'Internet Explorer', 'InternetExplorer')}>
            My Network Places
          </SidebarLink>
        </CollapsibleSection>

        <CollapsibleSection title="Details">
          <div className="xp-sidebar-details">
            <div className="xp-detail-row">
              <span className="xp-detail-label">System:</span>
              <span className="xp-detail-value">Portfolio XP Professional</span>
            </div>
            <div className="xp-detail-row">
              <span className="xp-detail-label">Version:</span>
              <span className="xp-detail-value">Version 2024</span>
            </div>
            <div className="xp-detail-row">
              <span className="xp-detail-label">Processor:</span>
              <span className="xp-detail-value">Creativity Processor</span>
            </div>
            <div className="xp-detail-row">
              <span className="xp-detail-label">Memory:</span>
              <span className="xp-detail-value">∞ GB Imagination</span>
            </div>
          </div>
        </CollapsibleSection>
      </div>

      <div className="xp-explorer-content">
        <h2 className="xp-content-heading">Hard Disk Drives</h2>
        <div className="xp-drive-grid">
          <button 
            className="xp-drive-item"
            onClick={() => handleDriveClick('about-me', 'About Me', 'AboutMe')}
          >
            <div className="xp-drive-icon">
              <div className="xp-drive-visual">
                <div className="xp-drive-body"></div>
                <div className="xp-drive-light"></div>
              </div>
            </div>
            <span className="xp-drive-label">About Me (C:)</span>
            <div className="xp-drive-bar">
              <div className="xp-drive-bar-fill" style={{ width: '75%' }}></div>
            </div>
            <span className="xp-drive-status">Skills loaded</span>
          </button>

          <button 
            className="xp-drive-item"
            onClick={() => handleDriveClick('my-projects', 'My Projects', 'Projects')}
          >
            <div className="xp-drive-icon">
              <div className="xp-drive-visual">
                <div className="xp-drive-body"></div>
                <div className="xp-drive-light green"></div>
              </div>
            </div>
            <span className="xp-drive-label">Projects (D:)</span>
            <div className="xp-drive-bar">
              <div className="xp-drive-bar-fill green" style={{ width: '60%' }}></div>
            </div>
            <span className="xp-drive-status">Growing daily</span>
          </button>
        </div>

        <h2 className="xp-content-heading">Devices with Removable Storage</h2>
        <div className="xp-drive-grid">
          <button 
            className="xp-drive-item"
            onClick={() => handleDriveClick('resume', 'Resume', 'Resume')}
          >
            <div className="xp-drive-icon">
              <div className="xp-disc-visual">
                <div className="xp-disc-outer"></div>
                <div className="xp-disc-inner"></div>
              </div>
            </div>
            <span className="xp-drive-label">Resume (E:)</span>
          </button>
        </div>

        <h2 className="xp-content-heading">Network Locations</h2>
        <div className="xp-drive-grid">
          <a href="https://github.com/clintonhpat" target="_blank" rel="noopener noreferrer" className="xp-drive-item">
            <div className="xp-drive-icon xp-network-icon">🌐</div>
            <span className="xp-drive-label">GitHub</span>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="xp-drive-item">
            <div className="xp-drive-icon xp-network-icon">💼</div>
            <span className="xp-drive-label">LinkedIn</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default MyComputer;