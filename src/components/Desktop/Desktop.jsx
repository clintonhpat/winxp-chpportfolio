import React, { useState, useCallback, useRef, useEffect } from 'react';
import DesktopIcon from './DesktopIcon';
import SelectionRectangle from './SelectionRectangle';
import ContextMenu from './ContextMenu';
import PersonalizeDialog from './PersonalizeDialog';
import { desktopIcons } from '../../data/desktopData';
import './Desktop.css';
import { useDesktop } from '../../contexts/DesktopContext';

const GRID_SIZE = 85;
const ICON_WIDTH = 75;
const ICON_HEIGHT = 85;

const ICON_SIZES = {
  small: 32,
  medium: 48,
  large: 64,
};

function Desktop() {
  const desktopRef = useRef(null);
  const didDragRef = useRef(false);
  
  const [iconPositions, setIconPositions] = useState(() => {
    const positions = {};
    desktopIcons.forEach((icon) => {
      positions[icon.id] = {
        x: icon.position.col * GRID_SIZE + 10,
        y: icon.position.row * GRID_SIZE + 10,
      };
    });
    return positions;
  });

  const [selectedIcons, setSelectedIcons] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionBox, setSelectionBox] = useState({ startX: 0, startY: 0, endX: 0, endY: 0 });
  
  // Context menu state
  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0 });
  
  // Personalize dialog state
  const [showPersonalize, setShowPersonalize] = useState(false);
  
// Desktop settings from context
const { settings, updateSettings } = useDesktop();

  // Selection rectangle logic
  const getIconsInSelection = useCallback((box) => {
    const selRect = {
      left: Math.min(box.startX, box.endX),
      right: Math.max(box.startX, box.endX),
      top: Math.min(box.startY, box.endY),
      bottom: Math.max(box.startY, box.endY),
    };

    const selected = [];
    desktopIcons.forEach((icon) => {
      const iconPos = iconPositions[icon.id];
      if (!iconPos) return;

      const iconRect = {
        left: iconPos.x,
        right: iconPos.x + ICON_WIDTH,
        top: iconPos.y,
        bottom: iconPos.y + ICON_HEIGHT,
      };

      const intersects = !(
        iconRect.left > selRect.right ||
        iconRect.right < selRect.left ||
        iconRect.top > selRect.bottom ||
        iconRect.bottom < selRect.top
      );

      if (intersects) {
        selected.push(icon.id);
      }
    });

    return selected;
  }, [iconPositions]);

  const handleMouseDown = useCallback((e) => {
    // Close context menu on any click
    if (contextMenu.show) {
      setContextMenu({ show: false, x: 0, y: 0 });
    }
    
    if (!e.target.classList.contains('desktop')) return;
    if (e.button !== 0) return;
    
    didDragRef.current = false;
    
    const rect = desktopRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsSelecting(true);
    setSelectionBox({ startX: x, startY: y, endX: x, endY: y });
    
    if (!e.ctrlKey && !e.metaKey) {
      setSelectedIcons([]);
    }
  }, [contextMenu.show]);

  const handleMouseMove = useCallback((e) => {
    if (!isSelecting) return;
    
    didDragRef.current = true;
    
    const rect = desktopRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
    
    const newBox = { startX: selectionBox.startX, startY: selectionBox.startY, endX: x, endY: y };
    setSelectionBox(newBox);
    
    const iconsInBox = getIconsInSelection(newBox);
    setSelectedIcons(iconsInBox);
  }, [isSelecting, selectionBox.startX, selectionBox.startY, getIconsInSelection]);

  const handleMouseUp = useCallback(() => {
    setIsSelecting(false);
  }, []);

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseUp]);

  // Right-click context menu
  const handleContextMenu = useCallback((e) => {
    e.preventDefault();
    setContextMenu({
      show: true,
      x: e.clientX,
      y: e.clientY,
    });
  }, []);

  const handleContextMenuClose = useCallback(() => {
    setContextMenu({ show: false, x: 0, y: 0 });
  }, []);

  const handleContextMenuAction = useCallback((action) => {
    switch (action) {
      case 'refresh':
        window.location.reload();
        break;
      case 'personalize':
      case 'properties':
      case 'display-settings':
        setShowPersonalize(true);
        break;
      case 'arrange-icons':
        // Reset icons to grid positions
        const newPositions = {};
        desktopIcons.forEach((icon, index) => {
          newPositions[icon.id] = {
            x: icon.position.col * GRID_SIZE + 10,
            y: icon.position.row * GRID_SIZE + 10,
          };
        });
        setIconPositions(newPositions);
        break;
      default:
        console.log('Menu action:', action);
    }
  }, []);

  const handleClick = useCallback((e) => {
    if (e.target.classList.contains('desktop') && !didDragRef.current) {
      setSelectedIcons([]);
    }
  }, []);

  // Icon handlers
  const handleIconSelect = useCallback((id, multiSelect, isAlreadySelected) => {
    if (isAlreadySelected && !multiSelect) {
      return;
    }
    
    setSelectedIcons(prev => {
      if (multiSelect) {
        if (prev.includes(id)) {
          return prev.filter(iconId => iconId !== id);
        } else {
          return [...prev, id];
        }
      } else {
        return [id];
      }
    });
  }, []);

  const handleIconClickUp = useCallback((id, multiSelect) => {
    if (!multiSelect) {
      setSelectedIcons([id]);
    }
  }, []);

  const handleIconDragMove = useCallback((deltaX, deltaY, draggedId) => {
    setIconPositions(prev => {
      const newPositions = { ...prev };
      const iconsToMove = selectedIcons.includes(draggedId) ? selectedIcons : [draggedId];
      
      iconsToMove.forEach(iconId => {
        if (newPositions[iconId]) {
          newPositions[iconId] = {
            x: newPositions[iconId].x + deltaX,
            y: newPositions[iconId].y + deltaY,
          };
        }
      });
      
      return newPositions;
    });
  }, [selectedIcons]);

  const handleIconDragEnd = useCallback((draggedId) => {
    if (!settings.snapToGrid) return;
    
    setIconPositions(prev => {
      const newPositions = { ...prev };
      const iconsToSnap = selectedIcons.includes(draggedId) ? selectedIcons : [draggedId];
      
      iconsToSnap.forEach(iconId => {
        if (newPositions[iconId]) {
          const pos = newPositions[iconId];
          newPositions[iconId] = {
            x: Math.max(10, Math.round(pos.x / GRID_SIZE) * GRID_SIZE + 10),
            y: Math.max(10, Math.round(pos.y / GRID_SIZE) * GRID_SIZE + 10),
          };
        }
      });
      
      return newPositions;
    });
  }, [selectedIcons, settings.snapToGrid]);

// Build desktop style based on settings
const getWallpaperStyle = () => {
  if (settings.wallpaperFile) {
    try {
      const wallpaperUrl = require(`../../assets/${settings.wallpaperFile}`);
      return {
        backgroundImage: `url(${wallpaperUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    } catch (e) {
      console.warn('Wallpaper not found:', settings.wallpaperFile);
    }
  }
  
  if (settings.wallpaperColor) {
    return {
      backgroundImage: 'none',
      backgroundColor: settings.wallpaperColor,
    };
  }
  
  return {};
};

const desktopStyle = getWallpaperStyle();

  return (
    <>
      <div 
        ref={desktopRef}
        className="desktop"
        style={desktopStyle}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={handleClick}
        onContextMenu={handleContextMenu}
      >
        {desktopIcons.map((iconData) => (
          <DesktopIcon
            key={iconData.id}
            id={iconData.id}
            title={iconData.title}
            icon={iconData.icon}
            windowConfig={iconData.windowConfig}
            position={iconPositions[iconData.id]}
            isSelected={selectedIcons.includes(iconData.id)}
            onSelect={handleIconSelect}
            onClickUp={handleIconClickUp}
            onDragMove={handleIconDragMove}
            onDragEnd={handleIconDragEnd}
            selectedIcons={selectedIcons}
            iconSize={ICON_SIZES[settings.iconSize]}
            showLabel={settings.showIconLabels}
          />
        ))}
        
        {isSelecting && (
          <SelectionRectangle
            startX={selectionBox.startX}
            startY={selectionBox.startY}
            endX={selectionBox.endX}
            endY={selectionBox.endY}
          />
        )}
      </div>

      {contextMenu.show && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={handleContextMenuClose}
          onAction={handleContextMenuAction}
        />
      )}

      {showPersonalize && (
        <PersonalizeDialog
          settings={settings}
          onSettingsChange={updateSettings}
          onClose={() => setShowPersonalize(false)}
        />
      )}
    </>
  );
}

export default Desktop;