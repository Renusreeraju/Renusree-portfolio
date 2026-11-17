import { BookOpen, FileText, Users } from 'lucide-react';
import { CERTIFICATIONS, EDUCATION } from '../data/portfolioData';

const COLLABORATION_PILLARS = [
  {
    icon: BookOpen,
    title: 'Analytical & Lab Readiness',
    detail:
      'Experienced in structuring raw datasets, benchmarking quantitative models (RMSE, R²), and writing reproducible documentation in Python, SQL, and Excel.',
  },
  {
    icon: Users,
    title: 'Technical Mentorship & Communication',
    detail:
      'Trained in Effective Leadership (edX) with proven experience gathering user feedback, facilitating Agile sprint coordination, and explaining complex interfaces clearly.',
  },
  {
    icon: FileText,
    title: 'Systems & Accessibility Rigor',
    detail:
      'Committed to WCAG usability standards, structured version control via Git/GitHub, and reliable backend-to-frontend testing across enterprise simulations and web apps.',
  },
];

export function CredentialsSection() {
  return (
    <section id="credentials" className="bg-[#f6f6f7] py-20 text-[#18181b] lg:py-24">
      <div className="mx-auto max-w-[1380px] px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-6 border-t border-[#d4d6dc] pt-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-[11px] font-medium tracking-[0.14em] uppercase text-[#6e717a]">
              05 · Academic &amp; Verified Credentials
            </p>
            <h2 className="mt-3 font-display text-4xl font-extrabold tracking-[-0.045em] text-[#18181b] sm:text-5xl">
              Education &amp; Certifications
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-[#6e717a]">
            Formal foundation in Computer Science and Information Technology alongside applied cloud, programming, and leadership credentials.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Education Column */}
          <div className="space-y-6 lg:col-span-5">
            {EDUCATION.map((edu) => (
              <div
                key={edu.degree}
                className="border border-[#e4c6ce] bg-[#f7e6e9] p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-[#6e717a]">
                  <span>{edu.location}</span>
                  <span className="tabular-nums">{edu.period}</span>
                </div>

                <h3 className="mt-3 font-display text-xl font-bold tracking-[-0.02em] text-[#18181b]">
                  {edu.degree}
                </h3>
                <p className="mt-1 text-sm font-medium text-[#4c505a]">{edu.institution}</p>

                <div className="mt-3 font-mono text-xs font-semibold text-[#9d3b54] tabular-nums">
                  {edu.gpa}
                </div>

                <ul className="mt-4 space-y-2 border-t border-[#e4c6ce] pt-4 text-xs leading-relaxed text-[#4c505a]">
                  {edu.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Certifications & Collaboration Readiness */}
          <div className="lg:col-span-7">
            <div className="divide-y divide-[#d4d6dc] border-y border-[#d4d6dc]">
              {CERTIFICATIONS.map((cert, index) => (
                <div
                  key={cert.title}
                  className="flex flex-col justify-between gap-2 py-4 sm:flex-row sm:items-center"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs font-semibold text-[#9d3b54] tabular-nums">
                      0{index + 1}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-[#18181b]">{cert.title}</h3>
                      <p className="text-xs text-[#6e717a]">{cert.focus}</p>
                    </div>
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#4c505a] sm:text-right shrink-0">
                    {cert.issuer}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {COLLABORATION_PILLARS.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="border border-[#e4c6ce] bg-[#f7e6e9] p-5"
                  >
                    <Icon className="h-4 w-4 text-[#9d3b54]" />
                    <h3 className="mt-3 font-display text-sm font-bold text-[#18181b]">
                      {pillar.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#4c505a]">
                      {pillar.detail}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
