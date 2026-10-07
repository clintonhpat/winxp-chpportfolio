import React, { useState } from 'react';
import './PersonalizeDialog.css';
import { useDesktop } from '../../contexts/DesktopContext';

const WALLPAPERS = [
  { id: 'bliss', name: 'Bliss', file: 'wallpaper.png' },
  { id: 'azul', name: 'Azul', file: 'azul.png' },
  { id: 'autumn', name: 'Autumn', file: 'autumn.png' },
  { id: 'ascent', name: 'Ascent', file: 'ascent.png' },
  { id: 'vortec', name: 'Vortec Space', file: 'vortec.png' },
  { id: 'tulips', name: 'Tulips', file: 'tulips.png' },
  { id: 'stonehenge', name: 'Stonehenge', file: 'stonehenge.png' },
  { id: 'moon', name: 'Moon Flower', file: 'moon.png' },
  { id: 'blue', name: 'Windows XP Blue', color: '#3a6ea5' },
  { id: 'green', name: 'Forest Green', color: '#2d5a27' },
  { id: 'purple', name: 'Royal Purple', color: '#4a3b6b' },
  { id: 'red', name: 'Autumn Red', color: '#8b3a3a' },
  { id: 'teal', name: 'Ocean Teal', color: '#2a6b6b' },
  { id: 'black', name: 'None (Black)', color: '#000000' },
];

const ICON_SIZES = [
  { id: 'small', name: 'Small', size: 32 },
  { id: 'medium', name: 'Medium', size: 48 },
  { id: 'large', name: 'Large', size: 64 },
];

const SCREENSAVERS = [
  { id: 'none', name: '(None)' },
  { id: 'starfield', name: 'Starfield' },
  { id: 'matrix', name: 'Matrix' },
  { id: 'pipes', name: '3D Pipes' },
  { id: 'bubbles', name: 'Bubbles' },
];

function PersonalizeDialog({ onClose, settings, onSettingsChange }) {
  const { previewScreensaver } = useDesktop();
  const [activeTab, setActiveTab] = useState('wallpaper');
  const [localSettings, setLocalSettings] = useState(settings);

  const handleChange = (key, value) => {
    setLocalSettings(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleApply = () => {
    onSettingsChange(localSettings);
  };

  const handleOk = () => {
    onSettingsChange(localSettings);
    onClose();
  };

  return (
    <div className="dialog-overlay">
      <div className="personalize-dialog">
        <div className="dialog-titlebar">
          <span>Display Properties</span>
          <button className="dialog-close" onClick={onClose}>✕</button>
        </div>

        <div className="dialog-tabs">
          <button 
            className={`dialog-tab ${activeTab === 'wallpaper' ? 'active' : ''}`}
            onClick={() => setActiveTab('wallpaper')}
          >
            Desktop
          </button>
          <button 
            className={`dialog-tab ${activeTab === 'icons' ? 'active' : ''}`}
            onClick={() => setActiveTab('icons')}
          >
            Appearance
          </button>
          <button 
            className={`dialog-tab ${activeTab === 'screensaver' ? 'active' : ''}`}
            onClick={() => setActiveTab('screensaver')}
          >
            Screen Saver
          </button>
        </div>

        <div className="dialog-content">
          {activeTab === 'wallpaper' && (
            <div className="tab-content">
              <div className="preview-monitor">
                <div 
                    className="preview-screen"
                    style={{
                        backgroundColor: localSettings.wallpaperColor || '#3a6ea5',
                        backgroundImage: localSettings.wallpaperFile 
                        ? `url(${require(`../../assets/${localSettings.wallpaperFile}`)})` 
                        : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
              </div>
              
              <label className="setting-label">Background:</label>
              <div className="wallpaper-list">
                {WALLPAPERS.map((wp) => (
                  <button
                    key={wp.id}
                    className={`wallpaper-item ${localSettings.wallpaper === wp.id ? 'selected' : ''}`}
                    onClick={() => {
                        handleChange('wallpaper', wp.id);
                        handleChange('wallpaperColor', wp.color || null);
                        handleChange('wallpaperFile', wp.file || null);
                    }}
                    >
                    <div 
                    className="wallpaper-preview"
                    style={{
                        backgroundColor: wp.color || '#3a6ea5',
                        backgroundImage: wp.file ? `url(${require(`../../assets/${wp.file}`)})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                    />
                    <span>{wp.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'icons' && (
            <div className="tab-content">
              <label className="setting-label">Icon Size:</label>
              <div className="icon-size-options">
                {ICON_SIZES.map((size) => (
                  <button
                    key={size.id}
                    className={`icon-size-item ${localSettings.iconSize === size.id ? 'selected' : ''}`}
                    onClick={() => handleChange('iconSize', size.id)}
                  >
                    <div className="icon-size-preview">
                      <span style={{ fontSize: size.size * 0.6 }}>📁</span>
                    </div>
                    <span>{size.name}</span>
                  </button>
                ))}
              </div>

              <label className="setting-label" style={{ marginTop: 16 }}>
                <input
                  type="checkbox"
                  checked={localSettings.showIconLabels !== false}
                  onChange={(e) => handleChange('showIconLabels', e.target.checked)}
                />
                {' '}Show icon labels
              </label>

              <label className="setting-label">
                <input
                  type="checkbox"
                  checked={localSettings.snapToGrid !== false}
                  onChange={(e) => handleChange('snapToGrid', e.target.checked)}
                />
                {' '}Snap icons to grid
              </label>
            </div>
          )}

          {activeTab === 'screensaver' && (
            <div className="tab-content">
              <div className="preview-monitor">
                <div className="preview-screen screensaver-preview">
                  {localSettings.screensaver === 'starfield' && <div className="stars-preview">✨ Starfield ✨</div>}
                  {localSettings.screensaver === 'matrix' && <div className="matrix-preview">Matrix</div>}
                  {localSettings.screensaver === 'pipes' && <div className="pipes-preview">3D Pipes</div>}
                  {localSettings.screensaver === 'bubbles' && <div className="bubbles-preview">🫧 Bubbles 🫧</div>}
                  {localSettings.screensaver === 'none' && <div className="none-preview">(None)</div>}
                </div>
              </div>

              <label className="setting-label">Screen Saver:</label>
              <select 
                className="xp-select"
                value={localSettings.screensaver || 'none'}
                onChange={(e) => handleChange('screensaver', e.target.value)}
              >
                {SCREENSAVERS.map((ss) => (
                  <option key={ss.id} value={ss.id}>{ss.name}</option>
                ))}
              </select>

              <div className="screensaver-settings">
                <label className="setting-label">
                  Wait: 
                  <input 
                    type="number" 
                    className="xp-input wait-input"
                    value={localSettings.screensaverWait || 5}
                    onChange={(e) => handleChange('screensaverWait', parseInt(e.target.value))}
                    min="1"
                    max="60"
                  />
                  minutes
                </label>
              </div>

              <button 
                className="xp-button preview-btn"
                onClick={() => {
                  onSettingsChange(localSettings);
                  previewScreensaver();
                }}
                disabled={localSettings.screensaver === 'none'}
              >
                Preview
              </button>
            </div>
          )}
        </div>

        <div className="dialog-buttons">
          <button className="xp-button" onClick={handleOk}>OK</button>
          <button className="xp-button" onClick={onClose}>Cancel</button>
          <button className="xp-button" onClick={handleApply}>Apply</button>
        </div>
      </div>
    </div>
  );
}

export default PersonalizeDialog;