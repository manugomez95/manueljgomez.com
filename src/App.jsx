import { useState } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import './App.css'
import { b } from 'framer-motion/m';

function App() {
  const [isOrganized, setIsOrganized] = useState(false);
  const controls = useAnimationControls();

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

  const floatingAnimation = {
    animate: {
      x: [0, 100, 0],
      y: [0, 50, 0],
      transition: {
        x: {
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut"
        },
        y: {
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut"
        }
      }
    }
  };

  const toggleOrganize = () => {
    setIsOrganized(!isOrganized);
  };

  const renderCard = (content, index, className) => {
    const boundaries = {
      left: 0,
      right: window.innerWidth - 300,
      top: 0,
      bottom: window.innerHeight - 150
    };

    // Generate random durations between 4 and 10 seconds
    const xDuration = 4 + Math.random() * 6;
    const yDuration = 4 + Math.random() * 6;
    
    // Center-based starting positions for unorganized state
    const centerX = window.innerWidth / 2 - 150; // half of card width
    const centerY = window.innerHeight / 2 - 75; // half of card height
    const radius = Math.min(window.innerWidth, window.innerHeight) / 4; // radius for circular distribution
    const angle = (index / 5) * 2 * Math.PI; // distribute cards in a circle (5 is approx number of cards)
    const startX = centerX + radius * Math.cos(angle);
    const startY = centerY + radius * Math.sin(angle);
    const randomBoolean = Math.random() < 0.5;

    return (
      <motion.div 
        key={index}
        className={`floating-card ${className}`}
        initial={{ x: startX, y: startY }}
        animate={isOrganized ? 
          { 
            x: 0,
            y: index * 150,
            rotate: [null, -10 + Math.random() * 20, 0],
            scale: [1, 1.2, 1],
            transition: { 
              type: "spring",
              stiffness: 150,
              damping: 15,
              mass: 1,
              delay: index * 0.1,
              rotate: {
                duration: 0.5,
                ease: "easeOut"
              },
              scale: {
                duration: 0.5,
                times: [0, 0.6, 1]
              }
            }
          } : 
          {
            x: [startX, randomBoolean ? boundaries.right : boundaries.left, randomBoolean ? boundaries.left : boundaries.right],
            y: [startY, randomBoolean ? boundaries.bottom : boundaries.top, randomBoolean ? boundaries.top : boundaries.bottom],
            rotate: 0,
            transition: {
              x: {
                duration: xDuration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              },
              y: {
                duration: yDuration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }
            }
          }
        }
      >
        {content}
      </motion.div>
    );
  };

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
