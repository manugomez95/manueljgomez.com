import PropTypes from 'prop-types';
import { FloatingCard } from './FloatingCard';
import { decorativeImages } from '../data/cvData';

export const BackgroundGrid = ({ projects }) => {
  // Create a grid with repeated project cards (6x6 grid = 36 cards)
  const totalSlots = 36;
  
  // Create a shuffled array of project indices and decorative images
  const shuffledIndices = Array.from({ length: totalSlots }, (_, i) => {
    return {
      projectIndex: i % projects.length, // Cycle through projects in order
      imageIndex: 0, // Not used anymore
      useProject: true // Always show projects
    };
  });

  return (
    <div className="background-grid">
      {shuffledIndices.map((indices, index) => {
        const project = projects[indices.projectIndex];
        const imageUrl = indices.useProject ? project.imageUrl : decorativeImages[indices.imageIndex];
        
        return (
          <div 
            key={index} 
            className="background-card"
            style={{
              '--bg-image': `url(${imageUrl})`
            }}
          >
            {indices.useProject && (
              <>
                <h4>{project.title}</h4>
                <p>{project.description}</p>
                <div className="background-technologies">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="background-tech-item">{tech}</span>
                  ))}
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

BackgroundGrid.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
    imageUrl: PropTypes.string.isRequired,
  })).isRequired
};

const BaseCard = ({ className, children }) => (
  <FloatingCard className={className}>
    {children}
  </FloatingCard>
);

const ListCard = ({ className, title, items, itemClassName }) => (
  <BaseCard className={className}>
    <h3>{title}</h3>
    <div className={`${className}-list`}>
      {items.map((item, index) => (
        <span key={index} className={itemClassName}>{item}</span>
      ))}
    </div>
  </BaseCard>
);

const HeaderContentCard = ({ className, title, children }) => (
  <BaseCard className={className}>
    <h3>{title}</h3>
    {children}
  </BaseCard>
);

export const ContactCard = ({ email, location }) => (
  <HeaderContentCard className="contact-card" title="Contact">
    <div className="contact-info">
      <p>📧 {email}</p>
      <p>📍 {location}</p>
    </div>
  </HeaderContentCard>
);

export const AchievementsCard = ({ achievements }) => (
  <BaseCard className="achievements-card">
    <h3>Achievements</h3>
    <div className="achievements-list">
      {achievements.map((achievement, index) => (
        <div key={index} className="achievement-item">
          <span>{achievement.title}</span>
          {achievement.relatedProject && (
            <a href="#" className="project-reference">
              {achievement.relatedProject} →
            </a>
          )}
        </div>
      ))}
    </div>
  </BaseCard>
);

export const AboutCard = ({ about }) => (
  <HeaderContentCard className="about-card" title="About Me">
    <p>{about}</p>
  </HeaderContentCard>
);

const BaseInfoCard = ({ className, title, subtitle, period, description, projects }) => (
  <BaseCard className={className}>
    <h4>{title} <span className="separator">|</span> <span className="subtitle">{subtitle}</span></h4>
    <p className="period">{period}</p>
    <p>{description}</p>
    {projects?.length > 0 ? (
      <div className="related-projects">
        <p className="projects-label">Related Projects:</p>
        {projects.map((project, index) => (
          <a key={index} href={project.link} target="_blank" rel="noopener noreferrer" className="project-reference">
            {project.title} →
          </a>
        ))}
      </div>
    ) : null}
  </BaseCard>
);

export const EducationCard = ({ degree, institution, ...rest }) => (
  <BaseInfoCard
    className="education-card"
    title={degree}
    subtitle={institution}
    {...rest}
  />
);

export const ProjectCard = ({ title, description, technologies, link }) => (
  <BaseCard className="project-card">
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
  </BaseCard>
);

// PropTypes
const cardBasePropTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

BaseCard.propTypes = cardBasePropTypes;

ListCard.propTypes = {
  className: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  itemClassName: PropTypes.string.isRequired
};

HeaderContentCard.propTypes = {
  className: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

ContactCard.propTypes = {
  email: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired
};

AchievementsCard.propTypes = {
  achievements: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    relatedProject: PropTypes.string
  })).isRequired
};

AboutCard.propTypes = {
  about: PropTypes.string.isRequired
};

EducationCard.propTypes = {
  degree: PropTypes.string.isRequired,
  institution: PropTypes.string.isRequired,
  period: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  projects: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
  }))
};

ProjectCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
  link: PropTypes.string
};

BaseInfoCard.propTypes = {
  className: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  period: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  projects: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
  }))
}; 