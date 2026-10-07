import React from 'react';
import AboutMe from './contents/AboutMe';
import Projects from './contents/Projects';
import Contact from './contents/Contact';
import Resume from './contents/Resume';
import Skills from './contents/Skills';
import MyComputer from './contents/MyComputer';
import InternetExplorer from './contents/InternetExplorer';
import RecycleBin from './contents/RecycleBin';
import Vapor from './contents/Vapor';
import './WindowContent.css';

// Content component registry
const contentComponents = {
  AboutMe,
  Projects,
  Contact,
  Resume,
  Skills,
  MyComputer,
  InternetExplorer,
  RecycleBin,
  Vapor,
};

/**
 * WindowContent Component
 * Routes to the appropriate content component based on contentType
 */
function WindowContent({ contentType, windowId }) {
  const ContentComponent = contentComponents[contentType];
  
  if (!ContentComponent) {
    return (
      <div className="window-content-fallback">
        <p>Content not found: {contentType}</p>
      </div>
    );
  }
  
  return (
    <div className="window-content">
      <ContentComponent windowId={windowId} />
    </div>
  );
}

export default WindowContent;
