import React, { useState } from 'react';
import { WindowProvider } from './contexts/WindowContext';
import { DesktopProvider, useDesktop } from './contexts/DesktopContext';
import LoginScreen from './components/LoginScreen/LoginScreen';
import Desktop from './components/Desktop/Desktop';
import WindowManager from './components/Window/WindowManager';
import Taskbar from './components/Taskbar/Taskbar';
import Screensaver from './components/Screensaver/Screensaver';
import './styles/xp-theme.css';
import './App.css';

function DesktopEnvironment({ currentUser, onLogout }) {
  const { settings, isScreensaverActive, exitScreensaver } = useDesktop();

  return (
    <>
      <div className="windows-xp-environment">
        <Desktop />
        <WindowManager />
        <Taskbar currentUser={currentUser} onLogout={onLogout} />
      </div>
      
      {isScreensaverActive && (
        <Screensaver 
          type={settings.screensaver} 
          onExit={exitScreensaver}
        />
      )}
    </>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (username) => {
    setCurrentUser(username);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <DesktopProvider>
      <WindowProvider>
        <DesktopEnvironment currentUser={currentUser} onLogout={handleLogout} />
      </WindowProvider>
    </DesktopProvider>
  );
}

export default App;