import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, X } from 'lucide-react';
import { PROJECTS, type ProjectCategory, type ProjectTone } from '../data/portfolioData';
import {
  PortfolioArchSandbox,
  PowerBISandbox,
  SolarMLSandbox,
  StudentCRUDSandbox,
  WeatherAPISandbox,
} from './ProjectSandboxes';

interface ProjectsSectionProps {
  selectedProjectId: string | null;
  onSelectProject: (id: string | null) => void;
}

const FILTER_TABS: { id: ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All Work' },
  { id: 'data-ml', label: 'Data & ML' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'systems-web', label: 'Systems & Web' },
];

const TONE_CLASSES: Record<ProjectTone, string> = {
  forest: 'bg-[#1f1b1e] text-[#f4b6c2]',
  clay: 'bg-[#f2cfd7] text-[#3a1f27]',
  charcoal: 'bg-[#dfe2e7] text-[#18181b]',
  ice: 'bg-[#2a2b31] text-[#f7dde3]',
  paperblue: 'bg-[#f6eaed] text-[#2d1e24]',
};

export function ProjectsSection({ selectedProjectId, onSelectProject }: ProjectsSectionProps) {
  const [filter, setFilter] = useState<ProjectCategory>('all');

  const visibleProjects = filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);
  const activeIndex = PROJECTS.findIndex((p) => p.id === selectedProjectId);
  const activeProject = activeIndex >= 0 ? PROJECTS[activeIndex] : null;
  const prevProject = activeIndex > 0 ? PROJECTS[activeIndex - 1] : null;
  const nextProject = activeIndex >= 0 && activeIndex < PROJECTS.length - 1 ? PROJECTS[activeIndex + 1] : null;

  useEffect(() => {
    if (!activeProject) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onSelectProject(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeProject, onSelectProject]);

  return (
    <section id="work" className="bg-[#f4f4f6] py-20 text-[#18181b]">
      <div className="mx-auto max-w-[1380px] px-6 lg:px-10">
        {/* Editorial Section Head */}
        <div className="flex flex-col justify-between gap-6 border-t border-[#d4d6dc] pt-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-[11px] font-medium tracking-[0.14em] uppercase text-[#6e717a]">
              01 · Selected Work
            </p>
            <h2 className="mt-3 font-display text-4xl font-extrabold tracking-[-0.045em] text-[#18181b] sm:text-6xl">
              Selected Projects
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-relaxed text-[#6e717a]">
            Applied systems across predictive machine learning, business intelligence, academic record CRUD, and responsive front-end engineering.
          </p>
        </div>

        {/* Interactive Filter Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#d4d6dc] pb-5">
          <div
            role="tablist"
            aria-label="Filter projects by discipline"
            className="inline-flex flex-wrap items-center gap-1.5"
          >
            {FILTER_TABS.map((tab) => {
              const active = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(tab.id)}
                  className={`px-4 py-2 font-mono text-[11px] font-medium tracking-[0.08em] uppercase transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#18181b] text-[#f4b6c2]'
                      : 'border border-[#d4d6dc] bg-white/75 text-[#6e717a] hover:border-[#18181b] hover:text-[#18181b]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-[#6e717a] tabular-nums">
            Showing {visibleProjects.length} of {PROJECTS.length} Case Studies
          </span>
        </div>

        {/* Tonal Editorial Cards */}
        <div className="mt-10 grid grid-cols-1 gap-7 md:grid-cols-2">
          {visibleProjects.map((project, idx) => {
            const isFeatured = filter === 'all' && idx === 0;
            return (
              <article
                key={project.id}
                onClick={() => onSelectProject(project.id)}
                className={`${isFeatured ? 'md:col-span-2' : ''} group cursor-pointer rounded-xl border border-[#d4d6dc] bg-[#e9eaee] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#9d3b54]/45 sm:p-5`}
              >
                {/* Tonal Poster Visual */}
                <div
                  className={`${TONE_CLASSES[project.tone]} relative flex ${
                    isFeatured ? 'aspect-[2.1/1] min-h-[260px]' : 'aspect-[1.32/1]'
                  } w-full items-center justify-center overflow-hidden rounded-lg p-8 text-center`}
                >
                  {/* Orbital Geometric Rings */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute aspect-square w-[54%] rounded-full border border-current opacity-30 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-10 -bottom-24 aspect-square w-[42%] rounded-full border border-current opacity-20"
                  />

                  <div className="relative z-10">
                    <small className="mb-4 block font-mono text-[10px] tracking-[0.14em] uppercase opacity-80">
                      {project.eyebrow}
                    </small>
                    <div className="font-display text-4xl font-extrabold uppercase leading-[0.88] tracking-[-0.06em] sm:text-6xl">
                      {project.posterLines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Unboxed Card Metadata & Editorial Footer */}
                <div className="mt-5 px-1">
                  <div className="flex items-center justify-between gap-4 font-mono text-[11px] tracking-[0.08em] uppercase text-[#6e717a]">
                    <span>
                      {project.indexLabel} · {project.domain}
                    </span>
                    <span className="tabular-nums shrink-0">{project.timeframe}</span>
                  </div>

                  <div className="mt-2.5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div className="max-w-xl">
                      <h3 className="font-display text-xl font-bold tracking-[-0.02em] text-[#18181b] sm:text-2xl">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#4c505a]">
                        {project.summary}
                      </p>
                      <p className="mt-3 font-mono text-[11px] text-[#6e717a]">
                        {project.stack.join(' · ')}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject(project.id);
                      }}
                      className="inline-flex items-center gap-2 border border-[#18181b] bg-[#18181b] px-4 py-2.5 font-mono text-[11px] font-medium tracking-[0.08em] uppercase text-[#f4f4f6] transition-colors group-hover:bg-[#f4b6c2] group-hover:text-[#18181b] group-hover:border-[#f4b6c2] whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Open Case Study
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Dark Case Study Overlay with Interactive Sandbox & Prev/Next Navigation */}
      {activeProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeProject.title}
          className="fixed inset-0 z-50 overflow-y-auto bg-[#121215] text-[#f4f4f6]"
        >
          {/* Case Header */}
          <div className="sticky top-0 z-10 border-b border-[#2e2f36] bg-[#121215]/95 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-[1380px] items-center justify-between gap-6 px-6 lg:px-10">
              <button
                type="button"
                onClick={() => onSelectProject(null)}
                className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.1em] uppercase text-[#d1d4dc] hover:text-[#f4b6c2] cursor-pointer whitespace-nowrap shrink-0"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Selected Work
              </button>

              <span className="hidden font-mono text-xs tracking-[0.1em] uppercase text-[#a1a5b0] sm:inline">
                Case Study {activeProject.indexLabel} / 0{PROJECTS.length}
              </span>

              <button
                type="button"
                onClick={() => onSelectProject(null)}
                aria-label="Close case study"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#2e2f36] text-[#f4f4f6] hover:border-[#f4b6c2] hover:bg-[#f4b6c2] hover:text-[#18181b] cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mx-auto max-w-[1380px] px-6 py-12 lg:px-10 lg:py-16">
            {/* Case Hero Title */}
            <div className="max-w-4xl">
              <p className="font-mono text-xs tracking-[0.14em] uppercase text-[#f4b6c2]">
                {activeProject.indexLabel} · {activeProject.domain}
              </p>
              <h2 className="mt-4 font-display text-4xl font-extrabold tracking-[-0.045em] text-[#f4f4f6] sm:text-6xl">
                {activeProject.title}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#d1d4dc]">
                {activeProject.summary}
              </p>
            </div>

            {/* 4-Column Case Metadata Strip */}
            <div className="mt-10 grid grid-cols-1 border-y border-[#2e2f36] sm:grid-cols-2 lg:grid-cols-4">
              <div className="border-b border-[#2e2f36] py-5 lg:border-r lg:border-b-0 lg:pr-6">
                <span className="block font-mono text-[10px] tracking-[0.12em] uppercase text-[#a1a5b0]">
                  Discipline
                </span>
                <strong className="mt-1.5 block text-xs font-medium text-[#f4f4f6]">
                  {activeProject.domain}
                </strong>
              </div>
              <div className="border-b border-[#2e2f36] py-5 lg:border-r lg:border-b-0 lg:px-6">
                <span className="block font-mono text-[10px] tracking-[0.12em] uppercase text-[#a1a5b0]">
                  Timeline
                </span>
                <strong className="mt-1.5 block font-mono text-xs font-medium text-[#f4f4f6] tabular-nums">
                  {activeProject.timeframe}
                </strong>
              </div>
              <div className="border-b border-[#2e2f36] py-5 sm:border-b-0 lg:border-r lg:px-6">
                <span className="block font-mono text-[10px] tracking-[0.12em] uppercase text-[#a1a5b0]">
                  Key Metric
                </span>
                <strong className="mt-1.5 block font-mono text-xs font-semibold text-[#f4b6c2] tabular-nums">
                  {activeProject.headlineMetric}
                </strong>
              </div>
              <div className="py-5 lg:pl-6">
                <span className="block font-mono text-[10px] tracking-[0.12em] uppercase text-[#a1a5b0]">
                  Stack
                </span>
                <strong className="mt-1.5 block text-xs font-medium text-[#f4f4f6]">
                  {activeProject.stack.join(' · ')}
                </strong>
              </div>
            </div>

            {/* Interactive Live Sandbox */}
            <div className="mt-12">
              <p className="mb-4 font-mono text-[11px] tracking-[0.12em] uppercase text-[#f4b6c2]">
                Interactive Prototype &amp; Evaluation Sandbox
              </p>
              {activeProject.sandboxType === 'solar-ml' && <SolarMLSandbox />}
              {activeProject.sandboxType === 'powerbi-sales' && <PowerBISandbox />}
              {activeProject.sandboxType === 'student-crud' && <StudentCRUDSandbox />}
              {activeProject.sandboxType === 'weather-api' && <WeatherAPISandbox />}
              {activeProject.sandboxType === 'portfolio-arch' && <PortfolioArchSandbox />}
            </div>

            {/* Methodology & Outcomes */}
            <div className="mt-14 grid grid-cols-1 gap-10 border-t border-[#2e2f36] pt-12 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#a1a5b0]">
                  Process &amp; Engineering Methodology
                </p>
                <ol className="mt-5 space-y-4">
                  {activeProject.methodology.map((step, idx) => (
                    <li key={step} className="flex items-start gap-3 text-sm leading-relaxed text-[#d1d4dc]">
                      <span className="font-mono text-xs font-medium text-[#f4b6c2] tabular-nums shrink-0 mt-0.5">
                        0{idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="lg:col-span-5">
                <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#a1a5b0]">
                  Measured Outcomes
                </p>
                <div className="mt-5 space-y-4">
                  {activeProject.outcomes.map((outcome) => (
                    <div key={outcome} className="border-t border-[#2e2f36] pt-4">
                      <div className="flex items-start gap-2.5 text-sm leading-relaxed text-[#f4f4f6]">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#f4b6c2]" />
                        <span>{outcome}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Previous / Next Case Navigation */}
            <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-[#2e2f36] pt-8">
              {prevProject ? (
                <button
                  type="button"
                  onClick={() => onSelectProject(prevProject.id)}
                  className="inline-flex items-center gap-3 text-left text-xs text-[#d1d4dc] hover:text-[#f4b6c2] cursor-pointer"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#2e2f36]">
                    <ArrowLeft className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block font-mono text-[10px] uppercase tracking-wider text-[#a1a5b0]">
                      Previous
                    </span>
                    <span className="font-medium text-[#f4f4f6]">{prevProject.title}</span>
                  </span>
                </button>
              ) : (
                <div />
              )}

              {nextProject && (
                <button
                  type="button"
                  onClick={() => onSelectProject(nextProject.id)}
                  className="inline-flex items-center gap-3 text-right text-xs text-[#d1d4dc] hover:text-[#f4b6c2] cursor-pointer ml-auto"
                >
                  <span>
                    <span className="block font-mono text-[10px] uppercase tracking-wider text-[#a1a5b0]">
                      Next Case Study
                    </span>
                    <span className="font-medium text-[#f4f4f6]">{nextProject.title}</span>
                  </span>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#2e2f36]">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
