'use client';

import { useState } from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';
import { getScreenshotUrl } from '@/lib/screenshot';
import type { Project } from '@/data/projects';

export default function ProjectCard({
  project,
  title,
  description,
  featuredLabel,
}: {
  project: Project;
  title: string;
  description: string;
  featuredLabel: string;
}) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      data-aos="fade-up"
      className={`card-glow group relative flex flex-col overflow-hidden rounded-2xl border bg-white/[0.03] transition-transform hover:-translate-y-1.5 ${
        project.featured ? 'border-violet-light/40' : 'border-white/10'
      }`}
    >
      {project.featured && (
        <span className="absolute right-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-aurora-gradient px-3 py-1 text-[11px] font-semibold text-white shadow-lg shadow-violet/30">
          <Sparkles size={12} />
          {featuredLabel}
        </span>
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
    </a>
  );
}
