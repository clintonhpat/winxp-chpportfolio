// Desktop icons and their configurations
// This file serves as the single source of truth for all desktop items

export const ICON_TYPES = {
  FOLDER: 'folder',
  FILE: 'file',
  SHORTCUT: 'shortcut',
  COMPUTER: 'computer',
  RECYCLE: 'recycle',
  DOCUMENT: 'document',
  INTERNET: 'internet',
  EMAIL: 'email',
  VAPOR: 'vapor',
};

export const desktopIcons = [
  {
    id: 'my-computer',
    title: 'My Computer',
    icon: ICON_TYPES.COMPUTER,
    type: 'system',
    position: { row: 0, col: 0 },
    windowConfig: {
      title: 'My Computer',
      size: { width: 650, height: 450 },
      content: 'MyComputer',
    },
  },
  {
    id: 'about-me',
    title: 'About Me',
    icon: ICON_TYPES.FOLDER,
    type: 'folder',
    position: { row: 1, col: 0 },
    windowConfig: {
      title: 'About Me',
      size: { width: 700, height: 500 },
      content: 'AboutMe',
    },
  },
  {
    id: 'projects',
    title: 'Projects',
    icon: ICON_TYPES.FOLDER,
    type: 'folder',
    position: { row: 2, col: 0 },
    windowConfig: {
      title: 'My Projects',
      size: { width: 800, height: 550 },
      content: 'Projects',
    },
  },
  {
    id: 'resume',
    title: 'Resume.pdf',
    icon: ICON_TYPES.DOCUMENT,
    type: 'document',
    position: { row: 3, col: 0 },
    windowConfig: {
      title: 'Resume - Document Viewer',
      size: { width: 700, height: 550 },
      content: 'Resume',
    },
  },
  {
    id: 'contact',
    title: 'Contact Me',
    icon: ICON_TYPES.EMAIL,
    type: 'shortcut',
    position: { row: 4, col: 0 },
    windowConfig: {
      title: 'Contact Me',
      size: { width: 500, height: 450 },
      content: 'Contact',
    },
  },
  {
    id: 'skills',
    title: 'Skills',
    icon: ICON_TYPES.FOLDER,
    type: 'folder',
    position: { row: 0, col: 1 },
    windowConfig: {
      title: 'My Skills',
      size: { width: 600, height: 500 },
      content: 'Skills',
    },
  },
  {
    id: 'internet-explorer',
    title: 'Internet Explorer',
    icon: ICON_TYPES.INTERNET,
    type: 'shortcut',
    position: { row: 1, col: 1 },
    windowConfig: {
      title: 'Internet Explorer - Portfolio Links',
      size: { width: 750, height: 500 },
      content: 'InternetExplorer',
    },
  },
  {
    id: 'recycle-bin',
    title: 'Recycle Bin',
    icon: ICON_TYPES.RECYCLE,
    type: 'system',
    position: { row: 5, col: 0 },
    windowConfig: {
      title: 'Recycle Bin',
      size: { width: 500, height: 350 },
      content: 'RecycleBin',
    },
  },
    {
    id: 'vapor',
    title: 'Vapor',
    icon: ICON_TYPES.VAPOR,
    type: 'shortcut',
    position: { row: 2, col: 1 },
    windowConfig: {
      title: 'Vapor',
      size: { width: 900, height: 600 },
      content: 'Vapor',
    },
  },
];

// Start menu structure
export const startMenuItems = {
  pinned: [
    {
      id: 'internet-explorer',
      title: 'Internet Explorer',
      icon: ICON_TYPES.INTERNET,
      description: 'Browse the Internet',
    },
    {
      id: 'contact',
      title: 'E-mail',
      icon: ICON_TYPES.EMAIL,
      description: 'Contact Me',
    },
  ],
  programs: [
    {
      id: 'about-me',
      title: 'About Me',
      icon: ICON_TYPES.FOLDER,
    },
    {
      id: 'projects',
      title: 'My Projects',
      icon: ICON_TYPES.FOLDER,
    },
    {
      id: 'skills',
      title: 'Skills',
      icon: ICON_TYPES.FOLDER,
    },
    {
      id: 'resume',
      title: 'Resume',
      icon: ICON_TYPES.DOCUMENT,
    },
  ],
  places: [
    {
      id: 'my-computer',
      title: 'My Computer',
      icon: ICON_TYPES.COMPUTER,
    },
    {
      id: 'projects',
      title: 'My Documents',
      icon: ICON_TYPES.FOLDER,
    },
  ],
};

// Portfolio content data
export const portfolioData = {
  personal: {
    name: 'Clint Patterson',
    title: 'Full Stack Developer',
    location: 'Florence, Alabama',
    email: 'ClintonHPat@gmail.com',
    bio: `Welcome to my portfolio! I'm a passionate developer who loves creating 
    innovative solutions and bringing ideas to life through code. With experience 
    in modern web technologies, I enjoy building applications that are both 
    functional and visually appealing.`,
    avatar: null, // Add your avatar URL here
  },
  about: {
    bio: "Welcome to my portfolio! I'm a passionate developer who loves creating innovative solutions and bringing ideas to life through code. With experience in modern web technologies, I enjoy building applications that are both functional and visually appealing.",
    funFacts: [
      "I love solving complex problems",
      "Coffee is my fuel ☕",
      "Always learning something new"
    ],
  },
skills: {
    frontend: [
      { name: 'React', level: 80 },        // 80 is "Very Strong" for a junior.
      { name: 'JavaScript', level: 75 },   // 75 is perfect. It implies you know ES6+ but respect the language's depth.
      { name: 'HTML5', level: 85 },        // Lowered from 95. 95 implies memorizing the entire spec.
      { name: 'CSS3', level: 80 },         // Lowered from 90. 
      { name: 'Bootstrap', level: 75 },    // Good working knowledge.
      { name: 'Redux', level: 60 },        // Honest. You used it in one project (BillieJeans), you aren't an expert yet.
      { name: 'Power Apps', level: 70 },   // Solid competence based on your background.
    ],
    backend: [
      { name: 'Node.js', level: 70 },      // 70 means "I can build a REST API," which is exactly what you did.
      { name: 'Power Automate', level: 85 }, // KEEP THIS HIGH. This is your "Special Sauce" and you have real experience here.
      { name: 'Express', level: 70 },
      { name: 'SQL/MySQL', level: 60 },    // Basic CRUD is usually around 60. 75+ implies complex stored procedures/optimization.
      { name: 'MongoDB', level: 65 },      
      { name: 'REST APIs', level: 75 },    // You have built multiple, so you are strong here.
      { name: 'ASP.NET', level: 50 },      // 50 says "I have used it, but it's not my main daily driver."
      { name: 'Firebase', level: 55 },     // Honest for a side project usage.
    ],
    tools: [
      { name: 'Git', level: 70 },          // 90 is for people who know obscure plumbing commands. 70 is "I can merge, branch, and fix conflicts."
      { name: 'VS Code', level: 90 },      // It's fine to be high here, everyone lives in their editor.
      { name: 'SharePoint', level: 75 },   // Good solid corporate skill.
      { name: 'Postman', level: 70 },
      { name: 'NPM', level: 70 },
      { name: 'Azure', level: 50 },        // Unless you are configuring VNETs and IAM roles, keep cloud providers lower.
      { name: 'AWS', level: 40 },          // Keep it conservative if you haven't deployed complex apps there.
      { name: 'Figma', level: 50 },        // "I can read a design," not "I am a designer."
      { name: 'Linux/CLI', level: 55 },
    ],
    soft: ['Problem Solving', 'Team Collaboration', 'Communication', 'Agile/Scrum'],
  },
projects: [
    {
      id: 'project-1',
      title: 'To Do List',
      description: 'A basic To-Do list application allowing users to add, edit, and delete tasks.',
      technologies: ['React', 'JavaScript', 'CSS'],
      category: 'frontend', // 'frontend', 'backend', or 'fullstack'
      thumbnail: 'https://i.ibb.co/2P6RvBV/todo-List-Pic.png',
      liveUrl: 'https://reacttodolist.onrender.com/',
      githubUrl: 'https://github.com/clintonhpat/react-to-do-list',
      testingUrl: null,
    },
    {
      id: 'project-2',
      title: 'Netflix Clone',
      description: 'A Netflix replica utilizing IMDB API with working subscriptions integrating Stripe',
      technologies: ['React', 'Firebase', 'Stripe', 'Axios'],
      category: 'fullstack',
      thumbnail: 'https://i.ibb.co/3vtsWx4/notflix.png',
      liveUrl: 'https://netflixclonereact.onrender.com/',
      githubUrl: 'https://github.com/clintonhpat/netflix-clone-react',
      testingUrl: 'https://docs.google.com/document/d/1Ipf4XDVp13ce9CMBpkj25CwcnZtcLqAL/edit',
    },
    {
      id: 'project-3',
      title: 'CRUD Zoology',
      description: 'A RESTful API enabling users to manage animal data with real-time updates, supporting full CRUD operations.',
      technologies: ['React', 'Bootstrap', 'C#', 'ASP.NET Core', 'SQL'],
      category: 'fullstack',
      thumbnail: 'https://i.ibb.co/dpFbZtR/Zoology-Animals.png',
      liveUrl: 'https://crudzoologyapp.onrender.com/',
      githubUrl: 'https://github.com/clintonhpat/crud-zoology-api',
      testingUrl: 'https://docs.google.com/document/d/1zheDnZpzSHG9w0Qe9rvMLj5lDsWd2Zmw/edit',
    },
    {
      id: 'project-4',
      title: 'BillieJeans Auto',
      description: 'A MERN stack ticketing system allowing managers to assign tasks and notes to specific user roles.',
      technologies: ['React', 'Redux', 'CSS', 'Node.js', 'Express', 'MongoDB'],
      category: 'fullstack',
      thumbnail: 'https://i.ibb.co/cTrm3WD/Billie-Jeans-Auto-Notes.png',
      liveUrl: 'https://billiejeansauto.onrender.com/',
      githubUrl: 'https://github.com/clintonhpat/BillieJeansAuto-Api',
      testingUrl: 'https://docs.google.com/document/d/1N7AIbKs5oV00kn4DtfWmITtdef5rM482/edit',
    },
  ],
  social: {
    github: 'https://github.com/clintonhpat',
    linkedin: 'https://linkedin.com/in/yourusername',
    twitter: 'https://twitter.com/yourusername',
  },
  resume: {
    downloadUrl: '/resume.pdf', // Add your resume PDF path
  },
};
