import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

interface HeaderProps {
  onOpenResume: () => void;
}

const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Contact', href: '#contact' },
];

export function Header({ onOpenResume }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-300/15 bg-[#121215]/92 text-[#f4f4f6] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1380px] items-center justify-between gap-8 px-6 lg:px-10">
        <a
          href="#top"
          className="font-display text-sm font-extrabold tracking-[0.12em] uppercase text-[#f4f4f6] whitespace-nowrap shrink-0"
        >
          {PROFILE.name}
        </a>

        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-7 font-mono text-[11px] tracking-[0.12em] uppercase text-[#cbd0d8]">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors duration-150 hover:text-[#f4b6c2] whitespace-nowrap shrink-0"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenResume}
            className="hidden sm:inline-flex items-center justify-center border border-[#cbd0d8]/35 bg-transparent px-4 py-2 font-mono text-[11px] font-medium tracking-[0.08em] uppercase text-[#f4f4f6] transition-colors duration-150 hover:border-[#f4b6c2] hover:bg-[#f4b6c2] hover:text-[#18181b] whitespace-nowrap shrink-0 cursor-pointer"
          >
            Resume PDF
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex h-10 w-10 items-center justify-center border border-[#cbd0d8]/25 text-[#f4f4f6] transition-colors hover:border-[#f4b6c2] md:hidden cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-zinc-300/15 bg-[#121215] px-6 py-4 md:hidden">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 font-mono text-xs tracking-[0.12em] uppercase text-[#cbd0d8] hover:text-[#f4b6c2]"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="mt-2 inline-flex w-full items-center justify-center bg-[#f4b6c2] px-4 py-2.5 font-mono text-xs font-semibold tracking-[0.08em] uppercase text-[#18181b] cursor-pointer"
            >
              View Resume PDF
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
