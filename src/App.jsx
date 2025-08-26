import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cvData } from './data/cvData';
import { useProjects } from './hooks/useProjects';
import ProjectDetail from './components/ProjectDetail.jsx';
import LanguageSwitcher from './components/LanguageSwitcher.jsx';

// Theme hook
function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  // Set the data-theme attribute on mount and when isDark changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    // data-theme will be set automatically by the useEffect above
  };

  return { isDark, toggleTheme };
}

function Header() {
  const { isDark, toggleTheme } = useTheme();
  const { t } = useTranslation();
  
  return (
    <header className="header">
      <div className="container">
        <div className="nav">
          <h1 className="logo">{cvData.personalInfo.name}</h1>
          <nav className="nav-links">
            <a href="/#hero">{t('nav.about')}</a>
            <a href="/#projects">{t('nav.projects')}</a>
            <a href="/#contact">{t('nav.contact')}</a>
            <LanguageSwitcher />
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
  const { t } = useTranslation();
  
  return (
    <section id="hero" className="hero">
      <div className="container">
        <h1 className="hero-title">{t('hero.title')}</h1>
        <p className="hero-subtitle">{t('hero.subtitle')}</p>
        <p className="hero-description">{t('hero.about')}</p>
        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary">{t('hero.viewProjects')}</a>
          <a href="#contact" className="btn btn-secondary">{t('hero.getInTouch')}</a>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const { visible, hasMore, loadMore } = useProjects({ pageSize: 6, sortBy: 'title', sortDirection: 'asc' });
  const { t } = useTranslation();

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">{t('projects.title')}</h2>
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
                {project.hasDetailPage ? (
                  <Link to={`/projects/${project.slug}`} className="project-link">
                    View Project →
                  </Link>
                ) : (
                  project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                      View Project →
                    </a>
                  )
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
  const { t } = useTranslation();
  
  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">{t('contact.title')}</h2>
        <div className="contact-content">
          <p>{t('contact.description')}</p>
          <div className="contact-info">
            <a href={`mailto:${cvData.personalInfo.email}`} className="contact-link">
              📧 {cvData.personalInfo.email}
            </a>
            <a href={cvData.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="contact-link">
              💼 {t('contact.linkedin')}
            </a>
            <a href={cvData.personalInfo.twitter} target="_blank" rel="noopener noreferrer" className="contact-link">
              🐦 {t('contact.twitter')}
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
        <Routes>
          <Route
            path="/"
            element={(
              <>
                <Hero />
                <Projects />
                <Contact />
              </>
            )}
          />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
