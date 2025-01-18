import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [isOrganized, setIsOrganized] = useState(false);
  const animationFrameRef = useRef();
  const cardStatesRef = useRef([]);
  const organizedPositionsRef = useRef([]);

  const [personalInfo] = useState({
    name: "Manuel Gómez",
    title: "XR Software Engineer",
    email: "manugomez@protonmail.com",
    location: "Madrid, Spain",
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
    const elements = document.querySelectorAll('.floating-card');
    
    // Initialize card states if not done yet
    if (!cardStatesRef.current.length) {
      cardStatesRef.current = Array.from(elements).map(() => ({
        x: (Math.random() * (window.innerWidth - 300)) - window.innerWidth/2,
        y: Math.random() * (window.innerHeight - 200),
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.5,
        lastX: 0,
        lastY: 0,
        lastRotation: 0
      }));

      // Apply initial positions
      elements.forEach((el, index) => {
        const state = cardStatesRef.current[index];
        el.style.transform = `translate(${state.x}px, ${state.y}px) rotate(${state.rotation}deg)`;
      });
    }

    if (isOrganized) {
      // Save current positions before organizing
      elements.forEach((el, index) => {
        const state = cardStatesRef.current[index];
        state.lastX = state.x;
        state.lastY = state.y;
        state.lastRotation = state.rotation;
      });

      // Set initial transform for smooth transition
      elements.forEach((el, index) => {
        const state = cardStatesRef.current[index];
        el.style.transform = `translate(${state.lastX}px, ${state.lastY}px) rotate(${state.lastRotation}deg)`;
        el.offsetHeight; // Force reflow
      });
    } else {
      if (cardStatesRef.current[0].lastX !== undefined) {
        // Restore last unorganized positions with transition
        elements.forEach((el, index) => {
          const state = cardStatesRef.current[index];
          state.x = state.lastX;
          state.y = state.lastY;
          state.rotation = state.lastRotation;
          el.style.transform = `translate(${state.x}px, ${state.y}px) rotate(${state.rotation}deg)`;
        });

        // Wait for transition to complete before starting animation
        setTimeout(() => {
          // Start animation
          let lastTime = performance.now();
          
          const animate = (currentTime) => {
            const deltaTime = (currentTime - lastTime) / 16;
            lastTime = currentTime;

            elements.forEach((el, index) => {
              const state = cardStatesRef.current[index];
              
              // Update position
              state.x += state.vx * deltaTime;
              state.y += state.vy * deltaTime;
              state.rotation += state.rotationSpeed * deltaTime;

              // Screen wrapping
              if (state.x < -window.innerWidth/2 - 300) state.x = window.innerWidth/2;
              if (state.x > window.innerWidth/2) state.x = -window.innerWidth/2 - 300;
              if (state.y < -200) state.y = window.innerHeight;
              if (state.y > window.innerHeight) state.y = -200;

              el.style.transform = `translate(${state.x}px, ${state.y}px) rotate(${state.rotation}deg)`;
            });

            if (!isOrganized) {
              animationFrameRef.current = requestAnimationFrame(animate);
            }
          };

          animationFrameRef.current = requestAnimationFrame(animate);
        }, parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--transition-time')) * 1000);

        return () => {
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
          }
        };
      }
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
