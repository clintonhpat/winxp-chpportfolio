import React, { useState } from 'react';
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

function SidebarLink({ icon, children, onClick, active }) {
  return (
    <button className={`xp-sidebar-link ${active ? 'active' : ''}`} onClick={onClick}>
      <span className="xp-sidebar-link-icon">{icon}</span>
      <span>{children}</span>
    </button>
  );
}

function SkillBar({ name, level }) {
  const getBarColor = (level) => {
    if (level >= 90) return '#22a854'; // Expert - green
    if (level >= 70) return '#2266b5'; // Advanced - blue
    return '#e89b24'; // Intermediate - orange
  };

  return (
    <div className="skill-bar-container">
      <div className="skill-bar-header">
        <span className="skill-name">{name}</span>
        <span className="skill-level">{level}%</span>
      </div>
      <div className="skill-bar-bg">
        <div 
          className="skill-bar-fill" 
          style={{ 
            width: `${level}%`,
            background: getBarColor(level)
          }}
        />
      </div>
    </div>
  );
}

function Skills() {
  const { skills = {} } = portfolioData;
  const [activeCategory, setActiveCategory] = useState('all');

  // Default skills data if not provided in portfolioData
  const frontend = Array.isArray(skills.frontend) ? skills.frontend : [
    { name: 'React', level: 90 },
    { name: 'Vue.js', level: 75 },
    { name: 'TypeScript', level: 85 },
    { name: 'JavaScript', level: 95 },
    { name: 'HTML5', level: 95 },
    { name: 'CSS3', level: 90 },
  ];

  const backend = Array.isArray(skills.backend) ? skills.backend : [
    { name: 'Node.js', level: 85 },
    { name: 'Python', level: 75 },
    { name: 'PostgreSQL', level: 80 },
    { name: 'MongoDB', level: 75 },
  ];

  const tools = Array.isArray(skills.tools) ? skills.tools : [
    { name: 'Git', level: 90 },
    { name: 'Docker', level: 70 },
    { name: 'AWS', level: 65 },
    { name: 'Linux', level: 75 },
  ];

  const softSkills = Array.isArray(skills.soft) ? skills.soft : [
    'Problem Solving', 'Team Collaboration', 'Communication', 'Time Management'
  ];

  const getActiveSkills = () => {
    switch (activeCategory) {
      case 'all': 
        return { 
          title: 'All Skills', 
          skills: [...frontend, ...backend, ...tools] 
        };
      case 'frontend': 
        return { title: 'Frontend Development', skills: frontend };
      case 'backend': 
        return { title: 'Backend Development', skills: backend };
      case 'tools': 
        return { title: 'Tools & Technologies', skills: tools };
      default: 
        return { title: 'All Skills', skills: [...frontend, ...backend, ...tools] };
    }
  };

  const { title, skills: activeSkills } = getActiveSkills();

  return (
    <div className="skills-window">
      <div className="xp-explorer-sidebar">
        <CollapsibleSection title="Skill Categories">
          <SidebarLink 
            icon="📚" 
            onClick={() => setActiveCategory('all')}
            active={activeCategory === 'all'}
          >
            All Skills
          </SidebarLink>
          <SidebarLink 
            icon="🎨" 
            onClick={() => setActiveCategory('frontend')}
            active={activeCategory === 'frontend'}
          >
            Frontend
          </SidebarLink>
          <SidebarLink 
            icon="⚙️" 
            onClick={() => setActiveCategory('backend')}
            active={activeCategory === 'backend'}
          >
            Backend
          </SidebarLink>
          <SidebarLink 
            icon="🔧" 
            onClick={() => setActiveCategory('tools')}
            active={activeCategory === 'tools'}
          >
            Tools
          </SidebarLink>
          <SidebarLink 
            icon="💜" 
            onClick={() => setActiveCategory('soft')}
            active={activeCategory === 'soft'}
          >
            Soft Skills
          </SidebarLink>
        </CollapsibleSection>

        <CollapsibleSection title="Legend">
          <div className="skills-legend">
            <div className="legend-item">
              <span className="legend-bar expert"></span>
              <span>Expert (90%+)</span>
            </div>
            <div className="legend-item">
              <span className="legend-bar advanced"></span>
              <span>Advanced (70-89%)</span>
            </div>
            <div className="legend-item">
              <span className="legend-bar intermediate"></span>
              <span>Intermediate (50-69%)</span>
            </div>
          </div>
        </CollapsibleSection>
      </div>

      <div className="skills-content">
        <div className="skills-header">
          <span className="skills-header-icon">🛠️</span>
          <div>
            <h1>My Skills</h1>
            <p>Technologies and tools I work with</p>
          </div>
        </div>

        {activeCategory === 'soft' ? (
          <div className="soft-skills-section">
            <h2>💡 Soft Skills</h2>
            <div className="soft-skills-tags">
              {softSkills.map((skill, index) => (
                <span key={index} className="soft-skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        ) : (
          <div className="skills-section">
            <h2>📊 {title}</h2>
            <div className="skills-list">
              {activeSkills.map((skill, index) => (
                <SkillBar key={index} name={skill.name} level={skill.level} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Skills;