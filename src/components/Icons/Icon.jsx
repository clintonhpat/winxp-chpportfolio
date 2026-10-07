import React from 'react';
import { ICON_TYPES } from '../../data/desktopData';
import './Icon.css';

// SVG icon components for Windows XP style icons
const IconSVGs = {
  [ICON_TYPES.FOLDER]: () => (
    <svg viewBox="0 0 48 48" className="icon-svg">
      <defs>
        <linearGradient id="folderGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFE896" />
          <stop offset="100%" stopColor="#E6B800" />
        </linearGradient>
      </defs>
      <path d="M4 8h16l4 6h20v28H4V8z" fill="url(#folderGrad)" stroke="#C89B00" strokeWidth="1"/>
      <path d="M4 14h40v22H4z" fill="#FFF3B8" opacity="0.3"/>
      <path d="M6 10h12l3 4h-15z" fill="#FFF7CC"/>
    </svg>
  ),
  
  [ICON_TYPES.COMPUTER]: () => (
    <svg viewBox="0 0 48 48" className="icon-svg">
      <defs>
        <linearGradient id="monitorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E8E8E8" />
          <stop offset="100%" stopColor="#B0B0B0" />
        </linearGradient>
        <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1E90FF" />
          <stop offset="100%" stopColor="#0066CC" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="40" height="30" rx="2" fill="url(#monitorGrad)" stroke="#666" strokeWidth="1"/>
      <rect x="7" y="7" width="34" height="22" fill="url(#screenGrad)"/>
      <rect x="20" y="34" width="8" height="6" fill="#888"/>
      <rect x="12" y="40" width="24" height="4" rx="1" fill="url(#monitorGrad)" stroke="#666" strokeWidth="0.5"/>
      <circle cx="24" cy="32" r="1" fill="#00FF00"/>
    </svg>
  ),
  
  [ICON_TYPES.DOCUMENT]: () => (
    <svg viewBox="0 0 48 48" className="icon-svg">
      <defs>
        <linearGradient id="docGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF" />
          <stop offset="100%" stopColor="#E0E0E0" />
        </linearGradient>
      </defs>
      <path d="M8 4h22l10 10v30H8V4z" fill="url(#docGrad)" stroke="#888" strokeWidth="1"/>
      <path d="M30 4v10h10" fill="#C0C0C0" stroke="#888" strokeWidth="1"/>
      <rect x="12" y="18" width="24" height="2" fill="#CC0000"/>
      <rect x="12" y="24" width="20" height="1" fill="#666"/>
      <rect x="12" y="28" width="22" height="1" fill="#666"/>
      <rect x="12" y="32" width="18" height="1" fill="#666"/>
      <rect x="12" y="36" width="20" height="1" fill="#666"/>
    </svg>
  ),
  
  [ICON_TYPES.RECYCLE]: () => (
    <svg viewBox="0 0 48 48" className="icon-svg">
      <defs>
        <linearGradient id="recycleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E8E8E8" />
          <stop offset="100%" stopColor="#A0A0A0" />
        </linearGradient>
      </defs>
      <path d="M10 14h28l-3 30H13L10 14z" fill="url(#recycleGrad)" stroke="#666" strokeWidth="1"/>
      <rect x="8" y="10" width="32" height="4" rx="1" fill="#B0B0B0" stroke="#666" strokeWidth="0.5"/>
      <path d="M18 10V8a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" fill="none" stroke="#666" strokeWidth="1"/>
      <line x1="16" y1="18" x2="17" y2="40" stroke="#888" strokeWidth="1"/>
      <line x1="24" y1="18" x2="24" y2="40" stroke="#888" strokeWidth="1"/>
      <line x1="32" y1="18" x2="31" y2="40" stroke="#888" strokeWidth="1"/>
    </svg>
  ),
  
  [ICON_TYPES.INTERNET]: () => (
    <svg viewBox="0 0 48 48" className="icon-svg">
      <defs>
        <linearGradient id="ieGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4BA3FF" />
          <stop offset="100%" stopColor="#0066CC" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="20" fill="url(#ieGrad)" stroke="#003366" strokeWidth="1"/>
      <ellipse cx="24" cy="24" rx="20" ry="10" fill="none" stroke="#FFF" strokeWidth="2"/>
      <ellipse cx="24" cy="24" rx="10" ry="20" fill="none" stroke="#FFF" strokeWidth="2"/>
      <line x1="4" y1="24" x2="44" y2="24" stroke="#FFF" strokeWidth="1.5"/>
      <path d="M8 16c8 4 24 4 32 0" fill="none" stroke="#FFD700" strokeWidth="3"/>
      <circle cx="38" cy="14" r="4" fill="#FFD700"/>
    </svg>
  ),
  
  [ICON_TYPES.EMAIL]: () => (
    <svg viewBox="0 0 48 48" className="icon-svg">
      <defs>
        <linearGradient id="mailGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF9E6" />
          <stop offset="100%" stopColor="#E6D9A6" />
        </linearGradient>
      </defs>
      <rect x="4" y="10" width="40" height="28" rx="2" fill="url(#mailGrad)" stroke="#B39F00" strokeWidth="1"/>
      <path d="M4 12l20 14 20-14" fill="none" stroke="#B39F00" strokeWidth="1.5"/>
      <path d="M4 10l20 16 20-16" fill="#FFF" stroke="#B39F00" strokeWidth="1"/>
    </svg>
  ),
  
  [ICON_TYPES.FILE]: () => (
    <svg viewBox="0 0 48 48" className="icon-svg">
      <defs>
        <linearGradient id="fileGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF" />
          <stop offset="100%" stopColor="#E8E8E8" />
        </linearGradient>
      </defs>
      <path d="M10 4h18l12 12v28H10V4z" fill="url(#fileGrad)" stroke="#888" strokeWidth="1"/>
      <path d="M28 4v12h12" fill="#D0D0D0" stroke="#888" strokeWidth="1"/>
    </svg>
  ),
  
  [ICON_TYPES.SHORTCUT]: () => (
    <svg viewBox="0 0 48 48" className="icon-svg">
      <defs>
        <linearGradient id="shortcutGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF" />
          <stop offset="100%" stopColor="#E8E8E8" />
        </linearGradient>
      </defs>
      <path d="M10 4h18l12 12v28H10V4z" fill="url(#shortcutGrad)" stroke="#888" strokeWidth="1"/>
      <path d="M28 4v12h12" fill="#D0D0D0" stroke="#888" strokeWidth="1"/>
      <path d="M8 36l8-8-2-6 6 2 8-8v12h-12l-2 6z" fill="#000" opacity="0.7"/>
    </svg>
  ),

  [ICON_TYPES.VAPOR]: () => {
    let vaporLogo;
    try {
      vaporLogo = require('../../assets/vapor-logo.png');
    } catch (e) {
      vaporLogo = null;
    }
    return (
      <img 
        src={vaporLogo} 
        alt="Vapor" 
        className="icon-svg" 
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    );
  },
};

/**
 * Icon Component
 * Renders Windows XP style icons with consistent styling
 */
function Icon({ 
  type = ICON_TYPES.FOLDER, 
  size = 32,
  className = '',
  style = {},
}) {
  const IconComponent = IconSVGs[type] || IconSVGs[ICON_TYPES.FILE];
  
  return (
    <div 
      className={`xp-icon ${className}`}
      style={{ 
        width: size, 
        height: size,
        ...style 
      }}
    >
      <IconComponent />
    </div>
  );
}

export default Icon;
