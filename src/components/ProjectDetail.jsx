import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';

function ProjectDetail() {
  const { slug } = useParams();
  const { projects } = useProjects({ sortBy: 'title', sortDirection: 'asc' });

  const project = useMemo(() => projects.find(p => p.slug === slug || p.id === slug), [projects, slug]);

  if (!project) {
    return (
      <section className="projects" style={{ paddingTop: '4rem' }}>
        <div className="container">
          <h2 className="section-title">Project not found</h2>
          <p style={{ textAlign: 'center', marginBottom: '2rem' }}>We couldn't find that project.</p>
          <div style={{ textAlign: 'center' }}>
            <Link className="btn btn-secondary" to="/">Back to home</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="projects" style={{ paddingTop: '4rem' }}>
      <div className="container">
        <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>{project.title}</h2>
        {project.imageUrl && (
          <div className="project-image" style={{ marginBottom: '1.5rem', borderRadius: '12px', overflow: 'hidden' }}>
            <img src={project.imageUrl} alt={project.title} loading="lazy" />
          </div>
        )}
        {project.description && <p style={{ marginBottom: '1rem' }}>{project.description}</p>}
        {project.longDescription && <p style={{ marginBottom: '1.5rem' }}>{project.longDescription}</p>}
        {project.technologies?.length > 0 && (
          <div style={{ marginBottom: '1.5rem' }} className="project-technologies">
            {project.technologies.map((tech, idx) => (
              <span key={idx} className="tech-tag">{tech}</span>
            ))}
          </div>
        )}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link className="btn btn-secondary" to="/">← Back</Link>
          {project.link && (
            <a className="btn btn-primary" href={project.link} target="_blank" rel="noopener noreferrer">Open external link</a>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProjectDetail;


