'use client';

import Image from 'next/image';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { getScreenshotUrl } from '@/lib/screenshot';
import type { Project } from '@/data/projects';

export default function FeaturedProjectCard({
  project,
  title,
  description,
  featuredLabel,
  caseStudyLabel,
  viewLiveLabel,
  viewCodeLabel,
}: {
  project: Project;
  title: string;
  description: string;
  featuredLabel: string;
  caseStudyLabel: string;
  viewLiveLabel: string;
  viewCodeLabel: string;
}) {
  return (
    <div
      data-aos="fade-up"
      className="card-glow group relative flex flex-col overflow-hidden rounded-2xl border border-violet-light/30 bg-white/[0.03]"
    >
      <span className="absolute right-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-aurora-gradient px-3 py-1 text-[11px] font-semibold text-white shadow-lg shadow-violet/30">
        {featuredLabel}
      </span>

      <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink-800">
        <Image
          src={getScreenshotUrl(project.url)}
          alt={title}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-display text-lg font-semibold text-mist">{title}</h3>
          <span className="font-mono text-xs text-mist/50">{project.year}</span>
        </div>
        <p className="text-sm leading-relaxed text-mist/60">{description}</p>
        <div className="flex flex-wrap gap-2 pt-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] text-mist/50"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-4 pt-4">
          {project.caseStudy && (
            <Link
              href={`/projects/${project.caseStudy}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-light transition-colors hover:text-violet"
            >
              {caseStudyLabel}
              <ArrowRight size={14} />
            </Link>
          )}
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={viewLiveLabel}
            className="ml-auto flex h-8 w-8 items-center justify-center rounded-full text-mist/50 transition-colors hover:text-violet-light"
          >
            <ExternalLink size={15} />
          </a>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={viewCodeLabel}
              className="flex h-8 w-8 items-center justify-center rounded-full text-mist/50 transition-colors hover:text-violet-light"
            >
              <Github size={15} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
