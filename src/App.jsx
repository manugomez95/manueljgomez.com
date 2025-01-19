import { useCardAnimation } from './hooks/useCardAnimation';
import { cvData } from './data/cvData';
import { getInitialPosition } from './utils/animations';
import {
  ContactCard,
  AboutCard,
  ExperienceCard,
  EducationCard,
  SkillsCard
} from './components/CVCards';
import './App.css';

function App() {
  const totalCards = 2 + cvData.experience.length + cvData.education.length + 1; // Contact, About, Experience(s), Education(s), Skills
  const { isOrganized, setIsOrganized, startPos: contactStartPos, getAnimation: getContactAnimation } = useCardAnimation(0, totalCards);
  const { startPos: aboutStartPos, getAnimation: getAboutAnimation } = useCardAnimation(1, totalCards);

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
        <ContactCard
          initial={{ x: contactStartPos.x, y: contactStartPos.y }}
          animate={getContactAnimation()}
          email={cvData.personalInfo.email}
          location={cvData.personalInfo.location}
        />

        <AboutCard
          initial={{ x: aboutStartPos.x, y: aboutStartPos.y }}
          animate={getAboutAnimation()}
          about={cvData.personalInfo.about}
        />

        {cvData.experience.map((job, index) => {
          const { startPos, getAnimation } = useCardAnimation(index + 2, totalCards);
          return (
            <ExperienceCard
              key={index}
              initial={{ x: startPos.x, y: startPos.y }}
              animate={getAnimation()}
              {...job}
            />
          );
        })}

        {cvData.education.map((edu, index) => {
          const { startPos, getAnimation } = useCardAnimation(index + 2 + cvData.experience.length, totalCards);
          return (
            <EducationCard
              key={index}
              initial={{ x: startPos.x, y: startPos.y }}
              animate={getAnimation()}
              {...edu}
            />
          );
        })}

        <SkillsCard
          initial={{ x: getInitialPosition(totalCards - 1, totalCards).x, y: getInitialPosition(totalCards - 1, totalCards).y }}
          animate={useCardAnimation(totalCards - 1, totalCards).getAnimation()}
          skills={cvData.skills}
        />
      </div>
    </div>
  );
}

export default App;
