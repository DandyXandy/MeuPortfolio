'use client';

import { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { getScreenshotUrl } from '@/lib/screenshot';
import type { Project } from '@/data/projects';

export default function ProjectCard({
  project,
  title,
  description,
  viewCodeLabel,
}: {
  project: Project;
  title: string;
  description: string;
  viewCodeLabel: string;
}) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div
      data-aos="fade-up"
      className="card-glow group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-transform hover:-translate-y-1.5"
    >
      {/* Enlace que cubre toda la card (patrón "stretched link") — el
          ícono de GitHub, aparte, queda por encima para ser clickeable. */}
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={title}
        className="absolute inset-0 z-0"
      />

      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={viewCodeLabel}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-ink-950/70 text-mist/60 backdrop-blur-sm transition-colors hover:text-violet-light"
        >
          <Github size={14} />
        </a>
      )}

      <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink-800">
        {!imageFailed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={getScreenshotUrl(project.url)}
            alt={title}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-aurora-gradient-soft">
            <span className="font-display text-2xl text-mist/50">{title}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold text-mist">{title}</h3>
          <ExternalLink
            size={16}
            className="mt-1 shrink-0 text-mist/40 transition-colors group-hover:text-violet-light"
          />
        </div>
        <p className="text-sm leading-relaxed text-mist/60">{description}</p>
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] text-mist/50"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
