import { ArrowUpRight } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

interface HeroSectionProps {
  onSelectProject: (projectId: string) => void;
  onOpenResume: () => void;
}

export function HeroSection({ onSelectProject, onOpenResume }: HeroSectionProps) {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-[#121215] py-20 text-[#f4f4f6]"
    >
      {/* Subtle architectural glow & silver-blush orbital line art */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              'radial-gradient(circle at 78% 36%, rgba(244, 182, 194, 0.16), transparent 44%), radial-gradient(circle at 22% 80%, rgba(203, 208, 216, 0.08), transparent 42%), linear-gradient(90deg, #121215 0%, rgba(18,18,21,0.94) 50%, rgba(42,32,37,0.45) 100%)',
          }}
        />
        <svg
          viewBox="0 0 800 800"
          className="orbit-spin absolute -right-28 top-1/2 h-[640px] w-[640px] -translate-y-1/2 text-[#cbd0d8]/22 lg:right-6"
          fill="none"
        >
          <circle cx="400" cy="400" r="320" stroke="currentColor" strokeWidth="1" />
          <circle cx="400" cy="400" r="230" stroke="#f4b6c2" strokeOpacity="0.32" strokeWidth="1" strokeDasharray="6 10" />
          <circle cx="400" cy="400" r="140" stroke="currentColor" strokeWidth="1" />
          <line x1="80" y1="400" x2="720" y2="400" stroke="currentColor" strokeWidth="0.75" />
          <line x1="400" y1="80" x2="400" y2="720" stroke="currentColor" strokeWidth="0.75" />
        </svg>
      </div>

      <div className="mx-auto w-full max-w-[1380px] px-6 lg:px-10">
        <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="flex items-center gap-3.5 font-mono text-xs font-medium tracking-[0.13em] uppercase text-[#f4b6c2]">
              <span className="h-[2px] w-7 shrink-0 bg-[#f4b6c2]" aria-hidden="true" />
              <span>Information Technology · Data Systems · Web Engineering</span>
            </p>

            <h1 className="mt-7 font-display text-5xl font-extrabold tracking-[-0.045em] text-[#f4f4f6] sm:text-7xl lg:text-[5.25rem] lg:leading-[0.94]">
              <span className="block text-2xl font-medium tracking-[-0.02em] text-[#cbd0d8] sm:text-3xl">
                Hi, I&apos;m
              </span>
              <span className="mt-2 block">{PROFILE.name}</span>
            </h1>

            <p className="mt-7 max-w-2xl font-display text-2xl font-semibold tracking-[-0.03em] text-[#f4f4f6] sm:text-3xl">
              I turn data, cloud logic, and interface craft into dependable systems.
            </p>

            <div className="my-7 h-px w-20 bg-[#f4b6c2]/70" aria-hidden="true" />

            <p className="max-w-xl text-[15px] leading-relaxed text-[#d1d4dc]">
              {PROFILE.summary}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-6">
              <a
                href="#work"
                className="group inline-flex items-center gap-3 font-mono text-xs font-medium tracking-[0.12em] uppercase text-[#f4f4f6] transition-colors hover:text-[#f4b6c2] whitespace-nowrap shrink-0"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#f4b6c2]/70 text-[#f4b6c2] transition-colors group-hover:bg-[#f4b6c2] group-hover:text-[#18181b]">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
                <span>Explore Selected Work</span>
              </a>

              <button
                type="button"
                onClick={() => onSelectProject('solar-radiation-ml')}
                className="border border-[#cbd0d8]/30 px-4 py-2.5 font-mono text-[11px] tracking-[0.1em] uppercase text-[#e4e6eb] transition-colors hover:border-[#f4b6c2] hover:text-[#f4b6c2] cursor-pointer whitespace-nowrap shrink-0"
              >
                Launch ML Sandbox
              </button>
            </div>
          </div>

          {/* Right Column: Editorial Index Preview */}
          <div className="lg:col-span-4">
            <div className="border-t border-[#cbd0d8]/25 pt-6">
              <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#a1a5b0]">
                Core Disciplines
              </p>
              <ul className="mt-4 divide-y divide-[#cbd0d8]/15 text-sm">
                <li className="flex items-baseline justify-between gap-4 py-3">
                  <span className="font-medium text-[#f4f4f6]">Machine Learning &amp; EDA</span>
                  <span className="font-mono text-xs text-[#f4b6c2] tabular-nums">96% Acc.</span>
                </li>
                <li className="flex items-baseline justify-between gap-4 py-3">
                  <span className="font-medium text-[#f4f4f6]">Backend &amp; Kafka / REST</span>
                  <span className="font-mono text-xs text-[#f4b6c2] tabular-nums">5 Tasks</span>
                </li>
                <li className="flex items-baseline justify-between gap-4 py-3">
                  <span className="font-medium text-[#f4f4f6]">WCAG Web Performance</span>
                  <span className="font-mono text-xs text-[#f4b6c2] tabular-nums">-20% Load</span>
                </li>
                <li className="flex items-baseline justify-between gap-4 py-3">
                  <span className="font-medium text-[#f4f4f6]">Power BI &amp; SQL Analytics</span>
                  <span className="font-mono text-xs text-[#f4b6c2] tabular-nums">Drill-Down</span>
                </li>
              </ul>

              <div className="mt-6 flex flex-wrap items-center gap-5 border-t border-[#cbd0d8]/20 pt-5 font-mono text-[11px] tracking-[0.1em] uppercase text-[#cbd0d8]">
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#f4b6c2] transition-colors"
                >
                  GitHub ↗
                </a>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#f4b6c2] transition-colors"
                >
                  LinkedIn ↗
                </a>
                <button
                  type="button"
                  onClick={onOpenResume}
                  className="hover:text-[#f4b6c2] transition-colors cursor-pointer uppercase"
                >
                  Resume ↗
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
