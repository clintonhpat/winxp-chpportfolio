import React, { useState } from 'react';
import './ContentStyles.css';

/**
 * Resume Content Component
 * Displays a PDF resume with download option
 */
function Resume() {
  const [loadError, setLoadError] = useState(false);

  // Path to your resume PDF in the assets folder
  const resumePath = require('../../../assets/resume.pdf');

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumePath;
    link.download = 'Resume.pdf';
    link.click();
  };

  const handlePrint = () => {
    window.open(resumePath, '_blank');
  };

  return (
    <div className="resume-window">
      {/* Toolbar */}
      <div className="resume-toolbar">
        <div className="toolbar-left">
          <span className="toolbar-title">📄 Resume.pdf</span>
        </div>
        <div className="toolbar-right">
          <button className="xp-button toolbar-btn" onClick={handleDownload}>
            💾 Download
          </button>
          <button className="xp-button toolbar-btn" onClick={handlePrint}>
            🖨️ Print
          </button>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="resume-viewer">
        {loadError ? (
          <div className="resume-fallback">
            <div className="fallback-icon">📄</div>
            <h2>Resume Preview</h2>
            <p>PDF preview not available in this browser.</p>
            <button className="xp-button" onClick={handleDownload}>
              💾 Download Resume PDF
            </button>
          </div>
        ) : (
          <iframe
            src={`${resumePath}#toolbar=0&navpanes=0`}
            className="resume-iframe"
            title="Resume PDF"
            onError={() => setLoadError(true)}
          />
        )}
      </div>
    </div>
  );
}

export default Resume;