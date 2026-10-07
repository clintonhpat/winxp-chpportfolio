import React, { useRef, useCallback, useEffect, useState } from 'react';
import { useWindowManager } from '../../contexts/WindowContext';
import Icon from '../Icons/Icon';
import WindowContent from './WindowContent';
import './Window.css';

/**
 * Window Component
 * Draggable, resizable window with XP styling
 */
function Window({ windowData }) {
  const {
    id,
    title,
    icon,
    content,
    position,
    size,
    minSize,
    isMinimized,
    isMaximized,
    zIndex,
  } = windowData;

  const {
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    focusWindow,
    updatePosition,
    updateSize,
    activeWindowId,
    windowOrder,
  } = useWindowManager();

  const windowRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const isActive = activeWindowId === id;
  const currentZIndex = windowOrder.indexOf(id) + 100;

  // Handle window focus
  const handleFocus = useCallback(() => {
    if (!isActive) {
      focusWindow(id);
    }
  }, [id, isActive, focusWindow]);

  // Drag handlers
  const handleDragStart = useCallback((e) => {
    if (isMaximized) return;
    
    e.preventDefault();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    setIsDragging(true);
    setDragOffset({
      x: clientX - position.x,
      y: clientY - position.y,
    });
    focusWindow(id);
  }, [isMaximized, position, id, focusWindow]);

  const handleDrag = useCallback((e) => {
    if (!isDragging) return;
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const newX = Math.max(0, clientX - dragOffset.x);
    const newY = Math.max(0, clientY - dragOffset.y);
    
    updatePosition(id, { x: newX, y: newY });
  }, [isDragging, dragOffset, id, updatePosition]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Resize handlers
  const handleResizeStart = useCallback((e) => {
    if (isMaximized) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    setIsResizing(true);
    setResizeStart({
      x: clientX,
      y: clientY,
      width: size.width,
      height: size.height,
    });
    focusWindow(id);
  }, [isMaximized, size, id, focusWindow]);

  const handleResize = useCallback((e) => {
    if (!isResizing) return;
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const deltaX = clientX - resizeStart.x;
    const deltaY = clientY - resizeStart.y;
    
    const newWidth = Math.max(minSize.width, resizeStart.width + deltaX);
    const newHeight = Math.max(minSize.height, resizeStart.height + deltaY);
    
    updateSize(id, { width: newWidth, height: newHeight });
  }, [isResizing, resizeStart, minSize, id, updateSize]);

  const handleResizeEnd = useCallback(() => {
    setIsResizing(false);
  }, []);

  // Global mouse/touch event listeners for drag and resize
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDrag);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchmove', handleDrag);
      window.addEventListener('touchend', handleDragEnd);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleDrag);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging, handleDrag, handleDragEnd]);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleResize);
      window.addEventListener('mouseup', handleResizeEnd);
      window.addEventListener('touchmove', handleResize);
      window.addEventListener('touchend', handleResizeEnd);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleResize);
      window.removeEventListener('mouseup', handleResizeEnd);
      window.removeEventListener('touchmove', handleResize);
      window.removeEventListener('touchend', handleResizeEnd);
    };
  }, [isResizing, handleResize, handleResizeEnd]);

  // Window control handlers
  const handleMinimize = useCallback((e) => {
    e.stopPropagation();
    minimizeWindow(id);
  }, [id, minimizeWindow]);

  const handleMaximize = useCallback((e) => {
    e.stopPropagation();
    if (isMaximized) {
      restoreWindow(id);
    } else {
      maximizeWindow(id);
    }
  }, [id, isMaximized, maximizeWindow, restoreWindow]);

  const handleClose = useCallback((e) => {
    e.stopPropagation();
    closeWindow(id);
  }, [id, closeWindow]);

  // Double click title bar to maximize/restore
  const handleTitleDoubleClick = useCallback(() => {
    if (isMaximized) {
      restoreWindow(id);
    } else {
      maximizeWindow(id);
    }
  }, [id, isMaximized, maximizeWindow, restoreWindow]);

  if (isMinimized) return null;

  const windowStyle = isMaximized
    ? {
        top: 0,
        left: 0,
        width: '100%',
        height: `calc(100% - var(--taskbar-height))`,
        zIndex: currentZIndex,
      }
    : {
        top: position.y,
        left: position.x,
        width: size.width,
        height: size.height,
        zIndex: currentZIndex,
      };

  return (
    <div
      ref={windowRef}
      className={`window ${isActive ? 'active' : 'inactive'} ${isMaximized ? 'maximized' : ''}`}
      style={windowStyle}
      onMouseDown={handleFocus}
      role="dialog"
      aria-label={title}
    >
      {/* Title Bar */}
      <div
        className={`window-title-bar ${isActive ? 'active' : 'inactive'}`}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        onDoubleClick={handleTitleDoubleClick}
      >
        <div className="window-title-left">
          <Icon type={icon} size={16} />
          <span className="window-title-text">{title}</span>
        </div>
        <div className="window-controls">
          <button
            className="window-control-btn minimize"
            onClick={handleMinimize}
            aria-label="Minimize"
          >
            <span className="control-icon">−</span>
          </button>
          <button
            className="window-control-btn maximize"
            onClick={handleMaximize}
            aria-label={isMaximized ? 'Restore' : 'Maximize'}
          >
            <span className="control-icon">{isMaximized ? '❐' : '□'}</span>
          </button>
          <button
            className="window-control-btn close"
            onClick={handleClose}
            aria-label="Close"
          >
            <span className="control-icon">×</span>
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="window-body">
        <WindowContent contentType={content} windowId={id} />
      </div>

      {/* Resize Handle */}
      {!isMaximized && (
        <div
          className="window-resize-handle"
          onMouseDown={handleResizeStart}
          onTouchStart={handleResizeStart}
          aria-label="Resize window"
        />
      )}
    </div>
  );
}

export default Window;
