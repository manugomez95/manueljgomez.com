import { useCardAnimation } from './hooks/useCardAnimation';
import { cvData } from './data/cvData';
import { getInitialPosition } from './utils/animations';
import {
  ContactCard,
  AboutCard,
  ExperienceCard,
  EducationCard,
  SkillsCard,
  LanguagesCard,
  ProjectCard
} from './components/CVCards';
import './styles/variables.css';
import './styles/base.css';
import './styles/floating.css';
import './styles/organized.css';

function App() {
  const totalCards = 3 + cvData.experience.length + cvData.education.length + 1 + cvData.projects.length; // Contact, About, Skills, Languages, Experience(s), Education(s), Projects
  const { isOrganized, setIsOrganized, startPos: contactStartPos, getAnimation: getContactAnimation } = useCardAnimation(0, totalCards);
  const { startPos: aboutStartPos, getAnimation: getAboutAnimation } = useCardAnimation(1, totalCards);
  const { startPos: skillsStartPos, getAnimation: getSkillsAnimation } = useCardAnimation(2, totalCards);
  const { startPos: languagesStartPos, getAnimation: getLanguagesAnimation } = useCardAnimation(3, totalCards);

  // Pre-calculate all project animations
  const projectAnimations = cvData.projects.map((_, index) => {
    return useCardAnimation(
      index + 4 + cvData.experience.length + cvData.education.length,
      totalCards
    );
  });

  const toggleOrganize = () => {
    setIsOrganized(!isOrganized);
  };

  return (
    <div className={`cv-container ${isOrganized ? 'organized' : ''}`}>
      <div className="name-center" onClick={toggleOrganize}>
        <h1>{cvData.personalInfo.name}</h1>
        <h2>{cvData.personalInfo.title}</h2>
      </div>

      <div className="floating-elements">
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
          {isOrganized && <h3 className="section-title">Experience</h3>}
          {cvData.experience.map((job, index) => {
            const { startPos, getAnimation } = useCardAnimation(index + 4, totalCards);
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

          {isOrganized && <h3 className="section-title education">Education</h3>}
          {cvData.education.map((edu, index) => {
            const { startPos, getAnimation } = useCardAnimation(index + 4 + cvData.experience.length, totalCards);
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

        {!isOrganized && cvData.projects.map((project, index) => {
          const { startPos, getAnimation } = projectAnimations[index];
          return (
            <ProjectCard
              key={index}
              initial={{ x: startPos.x, y: startPos.y }}
              animate={getAnimation()}
              {...project}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
