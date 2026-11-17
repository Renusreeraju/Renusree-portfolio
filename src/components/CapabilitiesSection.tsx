import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { CAPABILITY_DOMAINS } from '../data/portfolioData';

export function CapabilitiesSection() {
  const [activeDomainId, setActiveDomainId] = useState(CAPABILITY_DOMAINS[0].id);
  const current = CAPABILITY_DOMAINS.find((d) => d.id === activeDomainId) ?? CAPABILITY_DOMAINS[0];

  return (
    <section id="capabilities" className="bg-[#18171a] py-20 text-[#f4f4f6] lg:py-24">
      <div className="mx-auto max-w-[1380px] px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-6 border-t border-[#2e2f36] pt-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-[11px] font-medium tracking-[0.14em] uppercase text-[#a1a5b0]">
              04 · Information Science &amp; Technical Matrix
            </p>
            <h2 className="mt-3 font-display text-4xl font-extrabold tracking-[-0.045em] text-[#f4f4f6] sm:text-5xl">
              Core Capabilities
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-[#a1a5b0]">
            Select a discipline to inspect applied tools, problem-solving patterns, and supporting project evidence.
          </p>
        </div>

        {/* Interactive Domain Selector */}
        <div
          role="tablist"
          aria-label="Technical capability domains"
          className="mt-10 grid grid-cols-1 gap-2 border border-[#2e2f36] bg-[#121215] p-2 sm:grid-cols-2 lg:grid-cols-4"
        >
          {CAPABILITY_DOMAINS.map((domain, idx) => {
            const active = domain.id === activeDomainId;
            return (
              <button
                key={domain.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveDomainId(domain.id)}
                className={`px-4 py-3.5 text-left transition-colors duration-150 cursor-pointer ${
                  active
                    ? 'bg-[#f4b6c2] text-[#18181b]'
                    : 'bg-transparent text-[#cbd0d8] hover:bg-[#222228] hover:text-[#f4f4f6]'
                }`}
              >
                <div
                  className={`font-mono text-[10px] tabular-nums ${
                    active ? 'text-[#18181b]/75' : 'text-[#a1a5b0]'
                  }`}
                >
                  0{idx + 1}
                </div>
                <div className="mt-1 text-xs font-bold leading-snug">{domain.title}</div>
              </button>
            );
          })}
        </div>

        {/* Active Domain Details */}
        <div className="mt-6 border border-[#2e2f36] bg-[#201f24] p-6 sm:p-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="flex flex-col justify-between lg:col-span-5">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.08em] text-[#f4b6c2]">
                  {current.subtitle}
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold tracking-[-0.03em] text-[#f4f4f6] sm:text-3xl">
                  {current.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#d1d4dc]">
                  {current.description}
                </p>
              </div>

              <div className="mt-6 border-t border-[#2e2f36] pt-5">
                <div className="text-xs font-semibold text-[#f4f4f6]">{current.evidenceTitle}</div>
                <p className="mt-1.5 text-xs leading-relaxed text-[#a1a5b0]">
                  {current.evidenceDetail}
                </p>
                <a
                  href="#work"
                  className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-[#f4b6c2] hover:underline"
                >
                  Review Related Artifacts
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
              {current.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="border border-[#2e2f36] bg-[#141418] p-5"
                >
                  <h4 className="font-display text-base font-bold text-[#f4f4f6]">
                    {skill.name}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-[#a1a5b0]">
                    {skill.application}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
