'use client';

import { useEffect, useState } from 'react';
import { Project } from '@/types';
import api from '@/lib/api';

const FEATURED_FALLBACK: Project[] = [
  {
    _id: 'gh-praneeth-portfolio',
    title: 'Praneeth Portfolio (this site)',
    description:
      'Microservices portfolio: Next.js frontend, API gateway, separate auth, content, and AI services, Socket.io realtime, PWA offline support.',
    techStack: ['Next.js', 'TypeScript', 'Node.js', 'FastAPI', 'MongoDB', 'PostgreSQL', 'Docker', 'Socket.io'],
    githubUrl: 'https://github.com/praneethrms04/praneeth-portfolio',
    featured: true,
    status: 'in-progress',
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    _id: 'gh-system-health-monitor',
    title: 'System Health Monitor',
    description:
      'Collects health data from multiple machines via Python/Node agents and surfaces it on a centralized React dashboard with TanStack Query/Table.',
    techStack: ['Python', 'Express', 'MongoDB', 'React', 'TypeScript', 'TanStack Query', 'Tailwind'],
    githubUrl: 'https://github.com/praneethrms04/system-health-monitor',
    featured: true,
    status: 'completed',
    createdAt: '2025-08-25T00:00:00Z',
  },
  {
    _id: 'gh-social-media-microservices',
    title: 'Social Media Microservices',
    description:
      'Backend split into independent Node.js services — auth, posts, media, and search — communicating over REST with isolated databases.',
    techStack: ['Node.js', 'Express', 'MongoDB', 'Microservices', 'REST'],
    githubUrl: 'https://github.com/praneethrms04/social-media-microservices',
    featured: true,
    status: 'completed',
    createdAt: '2025-08-10T00:00:00Z',
  },
  {
    _id: 'gh-mern-ai-generation',
    title: 'MERN AI Image Generation',
    description:
      'Full-stack image generation app with prompt history, Cloudinary uploads, and a Tailwind UI on top of an Express/Mongo backend.',
    techStack: ['MongoDB', 'Express', 'React', 'Node.js', 'Cloudinary', 'Tailwind'],
    githubUrl: 'https://github.com/praneethrms04/MERN-AI_generation',
    featured: true,
    status: 'completed',
    createdAt: '2025-01-26T00:00:00Z',
  },
  {
    _id: 'gh-ams-app',
    title: 'AMS App',
    description:
      'Asset Management System built in TypeScript for tracking, assigning, and auditing organizational assets.',
    techStack: ['TypeScript', 'Next.js', 'React'],
    githubUrl: 'https://github.com/praneethrms04/ams-app',
    featured: true,
    status: 'in-progress',
    createdAt: '2026-03-05T00:00:00Z',
  },
  {
    _id: 'gh-lawyer-audit-report',
    title: 'Lawyer Audit Report',
    description:
      'Next.js application for generating and managing structured legal audit reports, scaffolded in Firebase Studio.',
    techStack: ['Next.js', 'TypeScript', 'Firebase'],
    githubUrl: 'https://github.com/praneethrms04/lawyer-audit-report',
    featured: true,
    status: 'in-progress',
    createdAt: '2026-02-23T00:00:00Z',
  },
  {
    _id: 'gh-lms',
    title: 'LMS Platform',
    description:
      'Learning Management System with separate TypeScript frontend and backend repos — courses, lessons, and student progress tracking.',
    techStack: ['TypeScript', 'React', 'Node.js', 'Express', 'MongoDB'],
    githubUrl: 'https://github.com/praneethrms04/lms-frontend',
    featured: true,
    status: 'completed',
    createdAt: '2024-04-22T00:00:00Z',
  },
  {
    _id: 'gh-ecommerce-inventory',
    title: 'E-commerce Inventory',
    description:
      'TypeScript inventory management app for tracking SKUs, stock levels, and product catalog operations.',
    techStack: ['TypeScript', 'React', 'Node.js'],
    githubUrl: 'https://github.com/praneethrms04/ecommerce-inventory',
    featured: true,
    status: 'completed',
    createdAt: '2025-01-26T00:00:00Z',
  },
  {
    _id: 'gh-map-integration',
    title: 'Map Integration (Mapbox)',
    description:
      'React + Mapbox GL playground with draw tools, polygon support, and interactive map overlays.',
    techStack: ['React', 'Mapbox GL', 'JavaScript'],
    githubUrl: 'https://github.com/praneethrms04/map-integration',
    featured: false,
    status: 'completed',
    createdAt: '2024-01-01T00:00:00Z',
  },
];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/content/projects');
        const fromApi: Project[] = res.data.projects ?? [];
        setProjects(fromApi.length > 0 ? fromApi : FEATURED_FALLBACK);
      } catch {
        setProjects(FEATURED_FALLBACK);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-24 bg-black">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-16">
          <span className="text-blue-400 text-sm font-medium tracking-widest uppercase">
            My Work
          </span>
          <h2 className="text-4xl font-bold text-white mt-2">Projects</h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map((i) => (
              <div key={i} className="h-64 rounded-xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            No projects yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project._id}
                className="group p-6 rounded-xl border border-white/10 bg-white/5 hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-start justify-between mb-4 gap-3">
                  <h3 className="text-white font-semibold text-lg group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
                    project.status === 'completed'
                      ? 'bg-green-500/20 text-green-400'
                      : project.status === 'in-progress'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {project.status}
                  </span>
                </div>

                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="text-xs px-2 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 mt-auto pt-2">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                      className="text-xs text-gray-400 hover:text-white transition-colors">
                      GitHub →
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                      className="text-xs text-gray-400 hover:text-white transition-colors">
                      Live →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
