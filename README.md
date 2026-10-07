# Windows XP Portfolio 🪟

An interactive developer portfolio that mimics the Windows XP desktop experience. Built with React and featuring draggable windows, a functional taskbar, start menu, and responsive design.

## ✨ Features

- **Interactive Desktop**: Double-click icons to open windows
- **Draggable Windows**: Move and resize windows just like in Windows XP
- **Functional Taskbar**: Start button, running applications, system tray with clock
- **Start Menu**: Navigate to all portfolio sections
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Portfolio Sections**:
  - About Me
  - Projects
  - Skills
  - Resume (with download option)
  - Contact Form
  - Internet Explorer (social links)
  - My Computer (navigation hub)
  - Recycle Bin (fun easter egg)

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ installed
- npm or yarn

### Installation

1. **Navigate to the project folder**
   ```bash
   cd winxp-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/
│   ├── Desktop/
│   │   ├── Desktop.jsx       # Main desktop area
│   │   ├── Desktop.css
│   │   ├── DesktopIcon.jsx   # Individual desktop icons
│   │   └── DesktopIcon.css
│   ├── Window/
│   │   ├── Window.jsx        # Draggable window component
│   │   ├── Window.css
│   │   ├── WindowContent.jsx # Routes to content components
│   │   ├── WindowManager.jsx # Renders all open windows
│   │   └── contents/         # Individual window contents
│   │       ├── AboutMe.jsx
│   │       ├── Projects.jsx
│   │       ├── Skills.jsx
│   │       ├── Resume.jsx
│   │       ├── Contact.jsx
│   │       ├── MyComputer.jsx
│   │       ├── InternetExplorer.jsx
│   │       ├── RecycleBin.jsx
│   │       └── ContentStyles.css
│   ├── Taskbar/
│   │   ├── Taskbar.jsx       # Bottom taskbar
│   │   └── Taskbar.css
│   ├── StartMenu/
│   │   ├── StartMenu.jsx     # Start menu popup
│   │   └── StartMenu.css
│   └── Icons/
│       ├── Icon.jsx          # Reusable icon component
│       └── Icon.css
├── contexts/
│   └── WindowContext.jsx     # Window state management
├── data/
│   └── desktopData.js        # Portfolio content & config
├── styles/
│   └── xp-theme.css          # Global XP theme styles
├── App.jsx
├── App.css
└── index.js
```

## 🎨 Customization

### Update Your Information

Edit `src/data/desktopData.js` to customize:

```javascript
export const portfolioData = {
  personal: {
    name: 'Your Name',
    title: 'Your Title',
    location: 'Your Location',
    email: 'your.email@example.com',
    bio: 'Your bio here...',
    avatar: '/path/to/avatar.jpg', // or null for default
  },
  // ... skills, projects, social links
};
```

### Add Projects

Add new projects to the `projects` array in `desktopData.js`:

```javascript
{
  id: 'project-id',
  title: 'Project Name',
  description: 'Project description',
  technologies: ['React', 'Node.js'],
  image: '/path/to/screenshot.png',
  liveUrl: 'https://yourproject.com',
  githubUrl: 'https://github.com/you/project',
}
```

### Add Your Resume

1. Place your resume PDF in the `public` folder as `resume.pdf`
2. Update the download link in `desktopData.js`

## 🚀 Deployment to Netlify

### Option 1: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy
netlify deploy --prod --dir=build
```

### Option 2: GitHub Integration

1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Build command: `npm run build`
6. Publish directory: `build`
7. Click "Deploy site"

### Option 3: Drag & Drop

1. Run `npm run build`
2. Go to [Netlify Drop](https://app.netlify.com/drop)
3. Drag the `build` folder to deploy

## 🛠️ Available Scripts

- `npm start` - Run development server
- `npm run build` - Build for production
- `npm test` - Run tests

## 📱 Mobile Support

The portfolio is fully responsive:
- **Desktop**: Full Windows XP experience
- **Tablet**: Adapted layout with touch support
- **Mobile**: Windows automatically maximize, simplified UI

## 🎯 Tips

1. **Custom Icons**: Replace SVG icons in `Icon.jsx` with your own
2. **Wallpaper**: Change the desktop background in `Desktop.css`
3. **Colors**: Modify CSS variables in `xp-theme.css`
4. **New Windows**: Add new content components in `contents/` and register them in `WindowContent.jsx`

## 📄 License

MIT License - Feel free to use this for your own portfolio!

---

Made with 💙 and nostalgia for the golden era of Windows
