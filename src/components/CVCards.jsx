import PropTypes from 'prop-types';
import { FloatingCard } from './FloatingCard';

const BaseCard = ({ initial, animate, className, children }) => (
  <FloatingCard className={className} initial={initial} animate={animate}>
    {children}
  </FloatingCard>
);

const ListCard = ({ initial, animate, className, title, items, itemClassName }) => (
  <BaseCard initial={initial} animate={animate} className={className}>
    <h3>{title}</h3>
    <div className={`${className}-list`}>
      {items.map((item, index) => (
        <span key={index} className={itemClassName}>{item}</span>
      ))}
    </div>
  </BaseCard>
);

const HeaderContentCard = ({ initial, animate, className, title, children }) => (
  <BaseCard initial={initial} animate={animate} className={className}>
    <h3>{title}</h3>
    {children}
  </BaseCard>
);

export const ContactCard = ({ initial, animate, email, location }) => (
  <HeaderContentCard initial={initial} animate={animate} className="contact-card" title="Contact">
    <div className="contact-info">
      <p>📧 {email}</p>
      <p>📍 {location}</p>
    </div>
  </HeaderContentCard>
);

export const AboutCard = ({ initial, animate, about }) => (
  <HeaderContentCard initial={initial} animate={animate} className="about-card" title="About Me">
    <p>{about}</p>
  </HeaderContentCard>
);

const BaseInfoCard = ({ initial, animate, className, title, subtitle, period, description, projects }) => (
  <BaseCard className={className} initial={initial} animate={animate}>
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

export const ExperienceCard = ({ initial, animate, position, company, ...rest }) => (
  <BaseInfoCard
    className="experience-card"
    initial={initial}
    animate={animate}
    title={position}
    subtitle={company}
    {...rest}
  />
);

export const EducationCard = ({ initial, animate, degree, institution, ...rest }) => (
  <BaseInfoCard
    className="education-card"
    initial={initial}
    animate={animate}
    title={degree}
    subtitle={institution}
    {...rest}
  />
);

export const SkillsCard = ({ initial, animate, skills }) => (
  <ListCard
    initial={initial}
    animate={animate}
    className="skills-card"
    title="Skills"
    items={skills}
    itemClassName="skill-item"
  />
);

export const LanguagesCard = ({ initial, animate, languages }) => (
  <ListCard
    initial={initial}
    animate={animate}
    className="languages-card"
    title="Languages"
    items={languages}
    itemClassName="language-item"
  />
);

export const ProjectCard = ({ initial, animate, title, description, technologies, link }) => (
  <BaseCard initial={initial} animate={animate} className="project-card">
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
  initial: PropTypes.object.isRequired,
  animate: PropTypes.object.isRequired
};

BaseCard.propTypes = {
  ...cardBasePropTypes,
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

ListCard.propTypes = {
  ...cardBasePropTypes,
  className: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  itemClassName: PropTypes.string.isRequired
};

HeaderContentCard.propTypes = {
  ...cardBasePropTypes,
  className: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
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

LanguagesCard.propTypes = {
  ...cardBasePropTypes,
  languages: PropTypes.arrayOf(PropTypes.string).isRequired
};

ProjectCard.propTypes = {
  ...cardBasePropTypes,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
  link: PropTypes.string
};

BaseInfoCard.propTypes = {
  ...cardBasePropTypes,
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