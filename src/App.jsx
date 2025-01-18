import { useState } from 'react'
import './App.css'

function App() {
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

  return (
    <div className="cv-container">
      <header className="cv-header">
        <h1>{personalInfo.name}</h1>
        <h2>{personalInfo.title}</h2>
        <div className="contact-info">
          <p>{personalInfo.email}</p>
          <p>{personalInfo.location}</p>
        </div>
      </header>

      <section className="about-section">
        <h3>About Me</h3>
        <p>{personalInfo.about}</p>
      </section>

      <section className="experience-section">
        <h3>Experience</h3>
        {experience.map((job, index) => (
          <div key={index} className="experience-item">
            <h4>{job.position}</h4>
            <h5>{job.company}</h5>
            <p className="period">{job.period}</p>
            <p>{job.description}</p>
          </div>
        ))}
      </section>

      <section className="education-section">
        <h3>Education</h3>
        {education.map((edu, index) => (
          <div key={index} className="education-item">
            <h4>{edu.degree}</h4>
            <h5>{edu.institution}</h5>
            <p className="period">{edu.period}</p>
            <p>{edu.description}</p>
          </div>
        ))}
      </section>

      <section className="skills-section">
        <h3>Skills</h3>
        <div className="skills-list">
          {skills.map((skill, index) => (
            <span key={index} className="skill-item">{skill}</span>
          ))}
        </div>
      </section>
    </div>
  )
}

export default App
