import { useState } from 'react';
import { Check, Copy, ExternalLink, FileText, Mail, Phone, Send } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

interface ContactSectionProps {
  onOpenResume: () => void;
}

export function ContactSection({ onOpenResume }: ContactSectionProps) {
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);
  const [senderName, setSenderName] = useState('');
  const [topic, setTopic] = useState('Technical & Data Systems Collaboration');
  const [message, setMessage] = useState('');
  const [submittedNote, setSubmittedNote] = useState('');

  const handleCopy = async (value: string, field: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 1800);
    } catch {
      setCopiedField(null);
    }
  };

  const handleComposeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[Portfolio Inquiry] ${topic}${senderName ? ` — ${senderName}` : ''}`);
    const body = encodeURIComponent(
      `${message || 'Hello Renusree, I would like to connect regarding your Information Technology & Data Systems work.'}\n\nBest regards,\n${senderName || 'Colleague'}`,
    );
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    setSubmittedNote('Opened your default email client with a structured message draft.');
  };

  return (
    <section id="contact" className="bg-[#f2cfd7] pt-20 pb-8 text-[#18181b]">
      <div className="mx-auto max-w-[1380px] px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Oversized Blush Headline + Direct Channels */}
          <div className="lg:col-span-6">
            <p className="font-mono text-[11px] font-medium tracking-[0.14em] uppercase text-[#18181b]/70">
              06 · Connect &amp; Collaborate
            </p>
            <h2 className="mt-4 font-display text-5xl font-extrabold leading-[0.86] tracking-[-0.06em] text-[#18181b] sm:text-7xl lg:text-[5.5rem]">
              <span className="block">Let&apos;s build</span>
              <span className="block">together.</span>
            </h2>

            <p className="mt-6 max-w-md text-sm leading-relaxed text-[#18181b]/85">
              Open to software engineering, data analytics, cloud operations, and academic lab or teaching support collaborations.
            </p>

            {/* Primary Charcoal & Outlined Action Buttons */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${PROFILE.email}`}
                className="inline-flex items-center gap-2 bg-[#18181b] px-5 py-3 font-mono text-xs font-medium tracking-[0.06em] uppercase text-[#f4f4f6] transition-opacity hover:opacity-90 whitespace-nowrap shrink-0"
              >
                <Mail className="h-3.5 w-3.5" />
                {PROFILE.email}
              </a>

              <button
                type="button"
                onClick={() => handleCopy(PROFILE.email, 'email')}
                className="inline-flex items-center gap-1.5 border border-[#18181b] px-4 py-3 font-mono text-xs font-medium tracking-[0.06em] uppercase text-[#18181b] transition-colors hover:bg-[#18181b] hover:text-[#f2cfd7] cursor-pointer whitespace-nowrap shrink-0"
              >
                {copiedField === 'email' ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copiedField === 'email' ? 'Copied Email' : 'Copy Email'}
              </button>

              <button
                type="button"
                onClick={() => handleCopy(PROFILE.phone, 'phone')}
                className="inline-flex items-center gap-1.5 border border-[#18181b] px-4 py-3 font-mono text-xs font-medium tracking-[0.06em] uppercase text-[#18181b] transition-colors hover:bg-[#18181b] hover:text-[#f2cfd7] cursor-pointer whitespace-nowrap shrink-0"
              >
                {copiedField === 'phone' ? <Check className="h-3.5 w-3.5" /> : <Phone className="h-3.5 w-3.5" />}
                {copiedField === 'phone' ? 'Copied Phone' : PROFILE.phone}
              </button>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-5 font-mono text-xs font-medium uppercase tracking-[0.08em] text-[#18181b]">
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 hover:underline"
              >
                LinkedIn <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 hover:underline"
              >
                GitHub <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex items-center gap-1 hover:underline cursor-pointer uppercase"
              >
                <FileText className="h-3.5 w-3.5" />
                Resume PDF
              </button>
            </div>
          </div>

          {/* Right Structured Inquiry Composer */}
          <div className="border border-[#18181b]/20 bg-[#16161a] p-6 text-[#f4f4f6] sm:p-8 lg:col-span-6">
            <h3 className="font-display text-xl font-bold tracking-[-0.02em] text-[#f4f4f6]">
              Send a Direct Inquiry
            </h3>
            <p className="mt-1 text-xs text-[#a1a5b0]">
              Compose a structured note to launch directly in your email client.
            </p>

            <form onSubmit={handleComposeSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block space-y-1.5 text-xs font-medium text-[#d1d4dc]">
                  <span>Your Name</span>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Coordinator / Lead / Faculty Name"
                    className="w-full border border-[#2e2f36] bg-[#121215] px-3.5 py-2.5 text-sm text-[#f4f4f6] placeholder:text-[#6e717a]"
                  />
                </label>

                <label className="block space-y-1.5 text-xs font-medium text-[#d1d4dc]">
                  <span>Inquiry Focus</span>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full border border-[#2e2f36] bg-[#121215] px-3.5 py-2.5 text-sm text-[#f4f4f6]"
                  >
                    <option>Technical &amp; Data Systems Collaboration</option>
                    <option>Teaching / Lab Assistantship Opportunity</option>
                    <option>Software &amp; Web Engineering Role</option>
                    <option>Data Analytics &amp; ML Project</option>
                  </select>
                </label>
              </div>

              <label className="block space-y-1.5 text-xs font-medium text-[#d1d4dc]">
                <span>Message</span>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share context about the team, project, lab, or role..."
                  className="w-full border border-[#2e2f36] bg-[#121215] px-3.5 py-2.5 text-sm text-[#f4f4f6] placeholder:text-[#6e717a]"
                />
              </label>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-[#f4b6c2] px-5 py-3 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-[#18181b] transition-opacity hover:opacity-90 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Send className="h-3.5 w-3.5" />
                  Draft Email Message
                </button>

                {submittedNote && (
                  <span className="text-xs font-medium text-[#f4b6c2]">{submittedNote}</span>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Footer Integrated on Soft Blush Base */}
        <footer className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-[#c99aa6] pt-6 font-mono text-[11px] tracking-[0.06em] uppercase text-[#18181b]/80 sm:flex-row sm:items-center">
          <div>
            © {new Date().getFullYear()} {PROFILE.name} — Information Technology &amp; Data Systems
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <a href="#work" className="hover:text-[#18181b] hover:underline">
              Work
            </a>
            <a href="#about" className="hover:text-[#18181b] hover:underline">
              About
            </a>
            <a href="#experience" className="hover:text-[#18181b] hover:underline">
              Experience
            </a>
            <a href="#capabilities" className="hover:text-[#18181b] hover:underline">
              Capabilities
            </a>
            <button
              type="button"
              onClick={onOpenResume}
              className="font-semibold hover:underline cursor-pointer uppercase"
            >
              Resume PDF
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
}
