import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { EXPERIENCES, HERO_METRICS } from '../data/portfolioData';

export function ExperienceSection() {
  const [activeId, setActiveId] = useState(EXPERIENCES[0].id);

  return (
    <div>
      {/* About Statement + Quantitative Luminous Blush Stat Strip */}
      <section id="about" className="border-b border-[#2e2f36] bg-[#16161a] py-20 text-[#f4f4f6] lg:py-24">
        <div className="mx-auto max-w-[1380px] px-6 lg:px-10">
          <div className="flex flex-col justify-between gap-6 border-t border-[#2e2f36] pt-6 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-[11px] font-medium tracking-[0.14em] uppercase text-[#a1a5b0]">
                02 · About &amp; Approach
              </p>
              <h2 className="mt-3 font-display text-4xl font-extrabold tracking-[-0.045em] text-[#f4f4f6] sm:text-5xl">
                Clarity in Systems &amp; Data
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-[#a1a5b0]">
              Combining quantitative analysis, backend structure, and accessible UI craft.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="font-display text-3xl font-bold leading-[1.06] tracking-[-0.04em] text-[#f4f4f6] sm:text-5xl">
                Engineering practical solutions where{' '}
                <span className="text-[#f4b6c2]">data rigor meets clear communication.</span>
              </p>
            </div>

            <div className="space-y-4 text-[15px] leading-relaxed text-[#d1d4dc] lg:col-span-5">
              <p>
                With a B.Tech background in Computer Science and Information Technology, I bridge exploratory data modeling, cloud deployment workflows, and WCAG-informed web engineering.
              </p>
              <p>
                Whether configuring Kafka and REST controllers, auditing raw datasets for Power BI dashboards, or iterating on interface usability with stakeholder feedback, I focus on verifiable outcomes and transparent documentation.
              </p>
            </div>
          </div>

          {/* 4-Column Luminous Blush Quantitative Strip */}
          <div className="mt-14 grid grid-cols-1 gap-6 border-t border-[#2e2f36] pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {HERO_METRICS.map((item) => (
              <div key={item.label}>
                <strong className="block font-display text-3xl font-extrabold tracking-[-0.04em] text-[#f4b6c2] tabular-nums sm:text-4xl">
                  {item.value}
                </strong>
                <span className="mt-2 block font-mono text-[11px] uppercase tracking-[0.08em] text-[#f4f4f6]">
                  {item.label}
                </span>
                <span className="mt-1 block text-xs text-[#a1a5b0]">{item.context}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Experience Rows on Metallic Silver Band */}
      <section id="experience" className="border-b border-[#cfd2da] bg-[#e9ebef] py-20 text-[#18181b] lg:py-24">
        <div className="mx-auto max-w-[1380px] px-6 lg:px-10">
          <div className="flex flex-col justify-between gap-6 border-t border-[#cfd2da] pt-6 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-[11px] font-medium tracking-[0.14em] uppercase text-[#5e626d]">
                03 · Professional Experience
              </p>
              <h2 className="mt-3 font-display text-4xl font-extrabold tracking-[-0.045em] text-[#18181b] sm:text-5xl">
                Industry &amp; Training Track
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-[#5e626d]">
              Select any engagement below to inspect responsibilities, systems stack, and measurable impact.
            </p>
          </div>

          <div className="mt-10 border-b border-[#cfd2da]">
            {EXPERIENCES.map((exp, idx) => {
              const expanded = exp.id === activeId;
              return (
                <div
                  key={exp.id}
                  className="border-t border-[#cfd2da] py-7 transition-colors"
                >
                  <button
                    type="button"
                    aria-expanded={expanded}
                    onClick={() => setActiveId(exp.id)}
                    className="grid w-full grid-cols-1 items-baseline gap-4 text-left lg:grid-cols-12 cursor-pointer"
                  >
                    <div className="flex items-baseline gap-4 lg:col-span-5">
                      <span className="font-mono text-xs font-semibold text-[#9d3b54] tabular-nums">
                        0{idx + 1}
                      </span>
                      <div>
                        <h3 className="font-display text-2xl font-bold tracking-[-0.03em] text-[#18181b] sm:text-3xl">
                          {exp.role}
                        </h3>
                        <p className="mt-1 text-sm text-[#4c505a]">{exp.organization}</p>
                      </div>
                    </div>

                    <div className="lg:col-span-4">
                      <span className="font-mono text-xs tracking-[0.06em] uppercase text-[#5e626d]">
                        {exp.focusArea}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4 lg:col-span-3 lg:justify-end">
                      <span className="font-mono text-xs text-[#5e626d] tabular-nums">
                        {exp.period}
                      </span>
                      <span
                        className={`font-mono text-xs font-semibold uppercase tracking-wider ${
                          expanded ? 'text-[#9d3b54]' : 'text-[#4c505a]'
                        }`}
                      >
                        {expanded ? 'Active' : 'Inspect +'}
                      </span>
                    </div>
                  </button>

                  {expanded && (
                    <div className="mt-6 grid grid-cols-1 gap-8 border border-[#cfd2da] bg-[#f7f7f9] p-6 lg:grid-cols-12">
                      <div className="lg:col-span-5 lg:pl-2">
                        <p className="text-sm leading-relaxed text-[#3f424a]">{exp.summary}</p>
                        <div className="mt-5 border-t border-[#cfd2da] pt-4">
                          <span className="block font-mono text-[10px] uppercase tracking-[0.1em] text-[#5e626d]">
                            Verified Outcome
                          </span>
                          <strong className="mt-1 block text-sm font-semibold text-[#9d3b54]">
                            {exp.impactMetric}
                          </strong>
                        </div>
                        <p className="mt-4 font-mono text-[11px] text-[#5e626d]">
                          {exp.tools.join(' · ')}
                        </p>
                      </div>

                      <div className="lg:col-span-7">
                        <ul className="space-y-3">
                          {exp.contributions.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2.5 text-sm leading-relaxed text-[#18181b]"
                            >
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#9d3b54]" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
