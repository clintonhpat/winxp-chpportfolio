import React from 'react';
import { useState } from 'react';
import { portfolioData } from '../../../data/desktopData';
import './ContentStyles.css';

function CollapsibleSection({ title, defaultOpen = true, children }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="xp-sidebar-section">
      <button 
        className="xp-sidebar-header"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <span className="xp-collapse-arrow">{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && <div className="xp-sidebar-content">{children}</div>}
    </div>
  );
}

function SidebarLink({ icon, children, onClick, href }) {
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="xp-sidebar-link">
        <span className="xp-sidebar-link-icon">{icon}</span>
        <span>{children}</span>
      </a>
    );
  }
  return (
    <button className="xp-sidebar-link" onClick={onClick}>
      <span className="xp-sidebar-link-icon">{icon}</span>
      <span>{children}</span>
    </button>
  );
}

function Projects() {
  const { projects = [] } = portfolioData;
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="projects-window">
      <div className="xp-explorer-sidebar">
        <CollapsibleSection title="File and Folder Tasks">
          <SidebarLink icon="📁" onClick={() => setSelectedCategory('all')}>
            View all projects
          </SidebarLink>
          <SidebarLink icon="🌐" href="https://github.com/clintonhpat">
            Visit GitHub
          </SidebarLink>
        </CollapsibleSection>

        <CollapsibleSection title="Project Categories">
          <SidebarLink icon="🎨" onClick={() => setSelectedCategory('React')}>
            Frontend
          </SidebarLink>
          <SidebarLink icon="⚙️" onClick={() => setSelectedCategory('Node.js')}>
            Backend
          </SidebarLink>
          <SidebarLink icon="📚" onClick={() => setSelectedCategory('all')}>
            Full Stack
          </SidebarLink>
        </CollapsibleSection>
      </div>

      <div className="projects-content">
        <div className="projects-header">
          <div className="projects-header-icon">📁</div>
          <div>
            <h1>My Projects</h1>
            <p>A collection of my work and personal projects</p>
          </div>
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <div key={index} className="project-card">
              {/* Project Thumbnail - shows image if available, otherwise folder icon */}
              <div className="project-card-thumbnail">
                {project.thumbnail ? (
                  <img src={project.thumbnail} alt={project.title} />
                ) : (
                  <span className="project-card-icon">📁</span>
                )}
              </div>
              
              <div className="project-card-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.technologies?.map((tech, i) => (
                    <span key={i} className="project-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      🌐 Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      💻 Source Code
                    </a>
                  )}
                  {project.testingUrl && (
                    <a href={project.testingUrl} target="_blank" rel="noopener noreferrer" className="testing-link">
                      📋 Testing Docs
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;