import PropTypes from 'prop-types';
import { FloatingCard } from './FloatingCard';

export const ContactCard = ({ initial, animate, email, location }) => (
  <FloatingCard className="contact-card" initial={initial} animate={animate}>
    <div className="contact-info">
      <p>{email}</p>
      <p>{location}</p>
    </div>
  </FloatingCard>
);

export const AboutCard = ({ initial, animate, about }) => (
  <FloatingCard className="about-card" initial={initial} animate={animate}>
    <h3>About Me</h3>
    <p>{about}</p>
  </FloatingCard>
);

export const ExperienceCard = ({ initial, animate, position, company, period, description, projects }) => (
  <FloatingCard className="experience-card" initial={initial} animate={animate}>
    <h4>{position}</h4>
    <h5>{company}</h5>
    <p className="period">{period}</p>
    <p>{description}</p>
    {projects && projects.length > 0 && (
      <div className="related-projects">
        <p className="projects-label">Related Projects:</p>
        {projects.map((project, index) => (
          <a key={index} href={project.link} target="_blank" rel="noopener noreferrer" className="project-reference">
            {project.title} →
          </a>
        ))}
      </div>
    )}
  </FloatingCard>
);

export const EducationCard = ({ initial, animate, degree, institution, period, description, projects }) => (
  <FloatingCard className="education-card" initial={initial} animate={animate}>
    <h4>{degree}</h4>
    <h5>{institution}</h5>
    <p className="period">{period}</p>
    <p>{description}</p>
    {projects && projects.length > 0 && (
      <div className="related-projects">
        <p className="projects-label">Related Projects:</p>
        {projects.map((project, index) => (
          <a key={index} href={project.link} target="_blank" rel="noopener noreferrer" className="project-reference">
            {project.title} →
          </a>
        ))}
      </div>
    )}
  </FloatingCard>
);

export const SkillsCard = ({ initial, animate, skills }) => (
  <FloatingCard className="skills-card" initial={initial} animate={animate}>
    <h3>Skills</h3>
    <div className="skills-list">
      {skills.map((skill, index) => (
        <span key={index} className="skill-item">{skill}</span>
      ))}
    </div>
  </FloatingCard>
);

export const ProjectCard = ({ initial, animate, title, description, technologies, link }) => (
  <FloatingCard className="project-card" initial={initial} animate={animate}>
    <h4>{title}</h4>
    <p>{description}</p>
    <div className="project-technologies">
      {technologies.map((tech, index) => (
        <span key={index} className="tech-item">{tech}</span>
      ))}
    </div>
    {link && (
      <a href={link} target="_blank" rel="noopener noreferrer" className="project-link">
        View Project →
      </a>
    )}
  </FloatingCard>
);

// PropTypes
const cardBasePropTypes = {
  initial: PropTypes.object.isRequired,
  animate: PropTypes.object.isRequired
};

ContactCard.propTypes = {
  ...cardBasePropTypes,
  email: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired
};

AboutCard.propTypes = {
  ...cardBasePropTypes,
  about: PropTypes.string.isRequired
};

ExperienceCard.propTypes = {
  ...cardBasePropTypes,
  position: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  period: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  projects: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
  }))
};

EducationCard.propTypes = {
  ...cardBasePropTypes,
  degree: PropTypes.string.isRequired,
  institution: PropTypes.string.isRequired,
  period: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  projects: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
  }))
};

SkillsCard.propTypes = {
  ...cardBasePropTypes,
  skills: PropTypes.arrayOf(PropTypes.string).isRequired
};

ProjectCard.propTypes = {
  ...cardBasePropTypes,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
  link: PropTypes.string
}; 