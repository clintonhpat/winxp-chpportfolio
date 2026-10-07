import React, { useState } from 'react';
import './SidebarPanel.css';

function SidebarPanel({ title, children, defaultCollapsed = false, variant = 'default' }) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  return (
    <div className={`sidebar-panel ${variant} ${isCollapsed ? 'collapsed' : ''}`}>
      <button 
        className="sidebar-panel-header"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <span className="sidebar-panel-title">{title}</span>
        <span className="sidebar-panel-toggle">{isCollapsed ? '▼' : '▲'}</span>
      </button>
      {!isCollapsed && (
        <div className="sidebar-panel-content">
          {children}
        </div>
      )}
    </div>
  );
}

export function SidebarLink({ icon, children, onClick, href }) {
  if (href) {
    return (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="sidebar-link"
      >
        <span className="sidebar-link-icon">{icon}</span>
        <span className="sidebar-link-text">{children}</span>
      </a>
    );
  }

  return (
    <button className="sidebar-link" onClick={onClick}>
      <span className="sidebar-link-icon">{icon}</span>
      <span className="sidebar-link-text">{children}</span>
    </button>
  );
}

export function SidebarInfo({ icon, label, value }) {
  return (
    <div className="sidebar-info">
      <span className="sidebar-info-icon">{icon}</span>
      <div className="sidebar-info-content">
        <span className="sidebar-info-label">{label}</span>
        <span className="sidebar-info-value">{value}</span>
      </div>
    </div>
  );
}

export default SidebarPanel;