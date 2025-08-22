import { useState } from 'react';
import { cvData } from './data/cvData';

// Theme hook
function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
  };

  return { isDark, toggleTheme };
}

function Header() {
  const { isDark, toggleTheme } = useTheme();
  
  return (
    <header className="header">
      <div className="container">
        <div className="nav">
          <h1 className="logo">{cvData.personalInfo.name}</h1>
          <nav className="nav-links">
            <a href="#hero">About</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
            <button className="theme-toggle" onClick={toggleTheme}>
              {isDark ? '☀️' : '🌙'}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="container">
        <h1 className="hero-title">{cvData.personalInfo.name}</h1>
        <p className="hero-subtitle">{cvData.personalInfo.title}</p>
        <p className="hero-description">{cvData.personalInfo.about}</p>
        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary">View Projects</a>
          <a href="#contact" className="btn btn-secondary">Get In Touch</a>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects-grid">
          {cvData.projects.slice(0, 4).map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-image">
                <img src={project.imageUrl} alt={project.title} />
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                    View Project →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Let&apos;s Connect</h2>
        <div className="contact-content">
          <p>Interested in working together or have a question?</p>
          <div className="contact-info">
            <a href={`mailto:${cvData.personalInfo.email}`} className="contact-link">
              📧 {cvData.personalInfo.email}
            </a>
            <span className="contact-location">📍 {cvData.personalInfo.location}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

export default App;
