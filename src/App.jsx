import { useState } from 'react';
import { cvData } from './data/cvData';
import { useProjects } from './hooks/useProjects';

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
  const { visible, hasMore, loadMore } = useProjects({ pageSize: 6, sortBy: 'title', sortDirection: 'asc' });

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects-grid">
          {visible.map((project) => (
            <div key={project.id} className="project-card">
              {project.imageUrl && (
                <div className="project-image">
                  <img src={project.imageUrl} alt={project.title} loading="lazy" />
                </div>
              )}
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-technologies">
                  {project.technologies?.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
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
        {hasMore && (
          <div className="projects-actions" style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button className="btn btn-secondary" onClick={loadMore}>Load more</button>
          </div>
        )}
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
            <a href={cvData.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="contact-link">
              💼 LinkedIn
            </a>
            <a href={cvData.personalInfo.twitter} target="_blank" rel="noopener noreferrer" className="contact-link">
              🐦 X
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
