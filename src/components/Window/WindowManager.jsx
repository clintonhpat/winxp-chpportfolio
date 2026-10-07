import React from 'react';
import { useWindowManager } from '../../contexts/WindowContext';
import Window from '../Window/Window';

/**
 * WindowManager Component
 * Renders all open windows from the window context
 */
function WindowManager() {
  const { windows } = useWindowManager();
  
  return (
    <>
      {Object.values(windows).map((windowData) => (
        <Window key={windowData.id} windowData={windowData} />
      ))}
    </>
  );
}

export default WindowManager;
