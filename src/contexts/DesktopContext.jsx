import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

const DesktopContext = createContext(null);

export function DesktopProvider({ children }) {
  const [settings, setSettings] = useState({
    wallpaper: 'bliss',
    wallpaperColor: null,
    wallpaperFile: 'wallpaper.png',
    iconSize: 'medium',
    showIconLabels: true,
    snapToGrid: true,
    screensaver: 'none',
    screensaverWait: 1, // minutes
  });

  const [isScreensaverActive, setIsScreensaverActive] = useState(false);
  const [isPreviewingScreensaver, setIsPreviewingScreensaver] = useState(false);
  const idleTimerRef = useRef(null);
  const lastActivityRef = useRef(Date.now());

  // Reset idle timer on any activity
  const resetIdleTimer = useCallback(() => {
    lastActivityRef.current = Date.now();
  }, []);

  // Check for idle timeout
  useEffect(() => {
    if (settings.screensaver === 'none') return;

    const checkIdle = () => {
      const idleTime = Date.now() - lastActivityRef.current;
      const waitTime = settings.screensaverWait * 60 * 1000; // Convert to ms

      if (idleTime >= waitTime && !isScreensaverActive && !isPreviewingScreensaver) {
        setIsScreensaverActive(true);
      }
    };

    // Listen for activity
    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];
    events.forEach(event => {
      window.addEventListener(event, resetIdleTimer);
    });

    // Check idle every second
    idleTimerRef.current = setInterval(checkIdle, 1000);

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, resetIdleTimer);
      });
      if (idleTimerRef.current) {
        clearInterval(idleTimerRef.current);
      }
    };
  }, [settings.screensaver, settings.screensaverWait, isScreensaverActive, isPreviewingScreensaver, resetIdleTimer]);

  const exitScreensaver = useCallback(() => {
    setIsScreensaverActive(false);
    setIsPreviewingScreensaver(false);
    lastActivityRef.current = Date.now();
  }, []);

  const previewScreensaver = useCallback(() => {
    if (settings.screensaver !== 'none') {
      setIsPreviewingScreensaver(true);
    }
  }, [settings.screensaver]);

  const updateSettings = useCallback((newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  const value = {
    settings,
    updateSettings,
    isScreensaverActive: isScreensaverActive || isPreviewingScreensaver,
    exitScreensaver,
    previewScreensaver,
  };

  return (
    <DesktopContext.Provider value={value}>
      {children}
    </DesktopContext.Provider>
  );
}

export function useDesktop() {
  const context = useContext(DesktopContext);
  if (!context) {
    throw new Error('useDesktop must be used within a DesktopProvider');
  }
  return context;
}

export default DesktopContext;