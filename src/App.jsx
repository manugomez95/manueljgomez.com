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
    
    // Helper function to get a random position within screen bounds
    const getRandomPosition = () => {
      return {
        x: (Math.random() * window.innerWidth * 3) - window.innerWidth * 1.5,
        y: (Math.random() * window.innerHeight * 3) - window.innerHeight * 1.5
      };
    };

    // Helper function to get a constant direction
    const getConstantDirection = () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 5;
      return {
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed
      };
    };

    // Initialize card states or transition to unorganized
    if (!cardStatesRef.current.length || (!isOrganized && cardStatesRef.current[0].lastX !== undefined)) {
      cardStatesRef.current = Array.from(elements).map(() => {
        const pos = getRandomPosition();
        const vel = getConstantDirection();
        return {
          x: pos.x,
          y: pos.y,
          vx: vel.vx,
          vy: vel.vy
        };
      });

      // Apply initial positions
      elements.forEach((el, index) => {
        const state = cardStatesRef.current[index];
        el.style.transform = `translate(${state.x}px, ${state.y}px)`;
      });

      // Start animation if unorganized
      if (!isOrganized) {
        let lastTime = performance.now();
        
        const animate = (currentTime) => {
          const deltaTime = (currentTime - lastTime) / 16;
          lastTime = currentTime;

          elements.forEach((el, index) => {
            const state = cardStatesRef.current[index];
            
            // Update position
            state.x += state.vx * deltaTime;
            state.y += state.vy * deltaTime;
            
            // Wrap around screen
            if (state.x < -window.innerWidth) {
              state.x = window.innerWidth;
            } else if (state.x > window.innerWidth) {
              state.x = -window.innerWidth;
            }
            if (state.y < -window.innerHeight) {
              state.y = window.innerHeight;
            } else if (state.y > window.innerHeight) {
              state.y = -window.innerHeight;
            }

            el.style.transform = `translate(${state.x}px, ${state.y}px)`;
          });

          if (!isOrganized) {
            animationFrameRef.current = requestAnimationFrame(animate);
          }
        };

        animationFrameRef.current = requestAnimationFrame(animate);
      }
    } else if (isOrganized) {
      // Just save current positions for organized state
      elements.forEach((el, index) => {
        const state = cardStatesRef.current[index];
        state.lastX = state.x;
        state.lastY = state.y;
      });
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
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
