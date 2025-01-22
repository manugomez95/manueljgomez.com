import { useCardAnimation } from './hooks/useCardAnimation';
import { cvData } from './data/cvData';
import { getInitialPosition } from './utils/animations';
import { Routes, Route, Link } from 'react-router-dom';
import { MetabaseDashboard } from './components/MetabaseDashboard';
import {
  ContactCard,
  AboutCard,
  ExperienceCard,
  EducationCard,
  SkillsCard,
  LanguagesCard,
  ProjectCard,
  AchievementsCard,
  BackgroundGrid
} from './components/CVCards';
import './styles/variables.css';
import './styles/base.css';
import './styles/floating.css';
import './styles/organized.css';

function CVPage() {
  const totalCards = 4 + cvData.experience.length + cvData.education.length + 1 + cvData.projects.length;
  const { isOrganized, setIsOrganized, startPos: contactStartPos, getAnimation: getContactAnimation } = useCardAnimation(0, totalCards);
  const { startPos: aboutStartPos, getAnimation: getAboutAnimation } = useCardAnimation(1, totalCards);
  const { startPos: achievementsStartPos, getAnimation: getAchievementsAnimation } = useCardAnimation(2, totalCards);
  const { startPos: skillsStartPos, getAnimation: getSkillsAnimation } = useCardAnimation(3, totalCards);
  const { startPos: languagesStartPos, getAnimation: getLanguagesAnimation } = useCardAnimation(4, totalCards);

  // Pre-calculate experience animations
  const experienceAnimations = cvData.experience.map((_, index) => {
    return useCardAnimation(index + 5, totalCards);
  });

  // Pre-calculate education animations
  const educationAnimations = cvData.education.map((_, index) => {
    return useCardAnimation(index + 5 + cvData.experience.length, totalCards);
  });

  // Pre-calculate project animations
  const projectAnimations = cvData.projects.map((_, index) => {
    return useCardAnimation(
      index + 5 + cvData.experience.length + cvData.education.length,
      totalCards
    );
  });

  const toggleOrganize = () => {
    setIsOrganized(!isOrganized);
  };

  return (
    <div className={`cv-container ${isOrganized ? 'organized' : ''}`}>
      {!isOrganized && <BackgroundGrid projects={cvData.projects} />}
      <Link 
        to="/dashboard" 
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          padding: '6px 12px',
          color: '#666',
          textDecoration: 'none',
          fontSize: '14px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          zIndex: 1000
        }}
      >
        Dashboard
      </Link>
      <div className="name-center" onClick={toggleOrganize}>
        <h1>{cvData.personalInfo.name}</h1>
        <h2>{cvData.personalInfo.title}</h2>
      </div>

      <div className="floating-elements">
        {isOrganized ? (
          <>
            <div className="left-column">
              <AboutCard
                initial={{ x: aboutStartPos.x, y: aboutStartPos.y }}
                animate={getAboutAnimation()}
                about={cvData.personalInfo.about}
              />

              <ContactCard
                initial={{ x: contactStartPos.x, y: contactStartPos.y }}
                animate={getContactAnimation()}
                email={cvData.personalInfo.email}
                location={cvData.personalInfo.location}
              />

              <AchievementsCard
                initial={{ x: achievementsStartPos.x, y: achievementsStartPos.y }}
                animate={getAchievementsAnimation()}
                achievements={cvData.achievements}
              />

              <SkillsCard
                initial={{ x: skillsStartPos.x, y: skillsStartPos.y }}
                animate={getSkillsAnimation()}
                skills={cvData.skills}
              />

              <LanguagesCard
                initial={{ x: languagesStartPos.x, y: languagesStartPos.y }}
                animate={getLanguagesAnimation()}
                languages={cvData.languages}
              />
            </div>

            <div className="right-column">
              <h3 className="section-title">Experience</h3>
              {cvData.experience.map((job, index) => {
                const { startPos, getAnimation } = experienceAnimations[index];
                const relatedProjects = cvData.projects.filter(project => project.relatedExperience === job.company);
                return (
                  <ExperienceCard
                    key={index}
                    initial={{ x: startPos.x, y: startPos.y }}
                    animate={getAnimation()}
                    {...job}
                    projects={relatedProjects}
                  />
                );
              })}

              <h3 className="section-title education">Education</h3>
              {cvData.education.map((edu, index) => {
                const { startPos, getAnimation } = educationAnimations[index];
                const relatedProjects = cvData.projects.filter(project => project.relatedEducation === edu.institution);
                return (
                  <EducationCard
                    key={index}
                    initial={{ x: startPos.x, y: startPos.y }}
                    animate={getAnimation()}
                    {...edu}
                    projects={relatedProjects}
                  />
                );
              })}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<CVPage />} />
      <Route path="/dashboard" element={<MetabaseDashboard />} />
    </Routes>
  );
}

export default App;
