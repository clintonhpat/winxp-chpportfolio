import React, { useState, useCallback, useEffect, useRef } from 'react';
import Icon from '../Icons/Icon';
import { useWindowManager } from '../../contexts/WindowContext';
import './DesktopIcon.css';

function DesktopIcon({ 
  id,
  title, 
  icon, 
  windowConfig,
  position,
  isSelected,
  onSelect,
  onClickUp,
  onDragMove,
  onDragEnd,
  selectedIcons,
  iconSize = 48,
  showLabel = true,
}) {
  const { openWindow } = useWindowManager();
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const didMoveRef = useRef(false);
  const multiSelectRef = useRef(false);

  const handleMouseDown = useCallback((e) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    
    didMoveRef.current = false;
    multiSelectRef.current = e.ctrlKey || e.metaKey;
    
    onSelect(id, e.ctrlKey || e.metaKey, isSelected);
    
    setLastMousePos({ x: e.clientX, y: e.clientY });
    setIsDragging(true);
  }, [id, isSelected, onSelect]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e) => {
      const deltaX = e.clientX - lastMousePos.x;
      const deltaY = e.clientY - lastMousePos.y;
      
      if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
        didMoveRef.current = true;
      }
      
      if (didMoveRef.current) {
        onDragMove(deltaX, deltaY, id);
        setLastMousePos({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      
      if (didMoveRef.current) {
        onDragEnd(id);
      } else {
        onClickUp(id, multiSelectRef.current);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, lastMousePos, id, onDragMove, onDragEnd, onClickUp]);

  const handleDoubleClick = useCallback((e) => {
    e.stopPropagation();
    openWindow(id, { ...windowConfig, icon });
  }, [id, windowConfig, icon, openWindow]);

  return (
    <button
      className={`desktop-icon ${isSelected ? 'selected' : ''} ${isDragging ? 'dragging' : ''}`}
      style={{ left: position.x, top: position.y }}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
    >
      <div className="desktop-icon-image" style={{ width: iconSize, height: iconSize }}>
        <Icon type={icon} size={iconSize} className={isSelected ? 'selected' : ''} />
      </div>
      {showLabel && (
        <span className={`desktop-icon-label ${isSelected ? 'selected' : ''}`}>
          {title}
        </span>
      )}
    </button>
  );
}

export default DesktopIcon;