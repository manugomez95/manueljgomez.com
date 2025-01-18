import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [isOrganized, setIsOrganized] = useState(false);
  const [personalInfo] = useState({
    name: "Your Name",
    title: "Professional Title",
    email: "email@example.com",
    location: "City, Country",
    about: "A brief description about yourself and your professional goals."
  });

  const [experience] = useState([
    {
      company: "Company Name",
      position: "Position",
      period: "2020 - Present",
      description: "Key responsibilities and achievements"
    }
  ]);

  const [education] = useState([
    {
      institution: "University Name",
      degree: "Degree",
      period: "2016 - 2020",
      description: "Relevant coursework and achievements"
    }
  ]);

  const [skills] = useState([
    "Skill 1",
    "Skill 2",
    "Skill 3"
  ]);

  useEffect(() => {
    if (!isOrganized) {
      const elements = document.querySelectorAll('.floating-card');
      elements.forEach(el => {
        const randomX = Math.random() * (window.innerWidth - 300);
        const randomY = Math.random() * (window.innerHeight - 200);
        const randomRotate = Math.random() * 360;
        el.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
      });
    }
  }, [isOrganized]);

  const toggleOrganize = () => {
    setIsOrganized(!isOrganized);
  };

  const renderCard = (content, index, className) => (
    <div 
      key={index}
      className={`floating-card ${className}`}
    >
      {content}
    </div>
  );

  return (
    <div className={`cv-container ${isOrganized ? 'organized' : ''}`}>
      <div 
        className="name-center"
        onClick={toggleOrganize}
      >
        <h1>{personalInfo.name}</h1>
        <h2>{personalInfo.title}</h2>
      </div>

      <div className="floating-elements">
        {renderCard(
          <div className="contact-info">
            <p>{personalInfo.email}</p>
            <p>{personalInfo.location}</p>
          </div>,
          0,
          'contact-card'
        )}

        {renderCard(
          <>
            <h3>About Me</h3>
            <p>{personalInfo.about}</p>
          </>,
          1,
          'about-card'
        )}

        {experience.map((job, index) => renderCard(
          <>
            <h4>{job.position}</h4>
            <h5>{job.company}</h5>
            <p className="period">{job.period}</p>
            <p>{job.description}</p>
          </>,
          index + 2,
          'experience-card'
        ))}

        {education.map((edu, index) => renderCard(
          <>
            <h4>{edu.degree}</h4>
            <h5>{edu.institution}</h5>
            <p className="period">{edu.period}</p>
            <p>{edu.description}</p>
          </>,
          index + experience.length + 2,
          'education-card'
        ))}

        {renderCard(
          <>
            <h3>Skills</h3>
            <div className="skills-list">
              {skills.map((skill, index) => (
                <span key={index} className="skill-item">{skill}</span>
              ))}
            </div>
          </>,
          experience.length + education.length + 2,
          'skills-card'
        )}
      </div>
    </div>
  )
}

export default App
