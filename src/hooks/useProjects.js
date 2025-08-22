import { useMemo, useState } from 'react';

// Lightweight loader for many projects at scale using Vite's glob imports
// Expects JSON modules exporting a default object that conforms to Project shape
// Location: src/data/projects/**/*.json

function normalizeProject(rawProject) {
  const project = { ...rawProject };
  if (!project.id) {
    // Prefer provided slug, otherwise derive from title
    const base = (project.slug || project.title || 'project')
      .toString()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    project.id = base;
  }
  if (!project.slug) {
    project.slug = project.id;
  }
  return project;
}

export function useProjects(options = {}) {
  const {
    directory = '/src/data/projects',
    pageSize = 6,
    sortBy = 'title',
    sortDirection = 'asc'
  } = options;

  // import.meta.glob requires a relative path from project root without leading slash
  const modules = useMemo(() => {
    // eslint-disable-next-line no-undef
    const glob = import.meta.glob('../data/projects/**/*.json', { eager: true });
    const loaded = Object.entries(glob).map(([path, mod]) => {
      const data = mod.default || mod;
      const normalized = normalizeProject(data);
      return { ...normalized, _path: path };
    });

    const sorted = loaded.sort((a, b) => {
      const dir = sortDirection === 'desc' ? -1 : 1;
      const av = (a[sortBy] || '').toString().toLowerCase();
      const bv = (b[sortBy] || '').toString().toLowerCase();
      if (av < bv) return -1 * dir;
      if (av > bv) return 1 * dir;
      return 0;
    });
    return sorted;
  }, [directory, sortBy, sortDirection]);

  const [visibleCount, setVisibleCount] = useState(pageSize);
  const visible = modules.slice(0, visibleCount);
  const hasMore = visibleCount < modules.length;

  const loadMore = () => setVisibleCount((c) => Math.min(c + pageSize, modules.length));

  return { projects: modules, visible, hasMore, loadMore, reset: () => setVisibleCount(pageSize) };
}

export default useProjects;


