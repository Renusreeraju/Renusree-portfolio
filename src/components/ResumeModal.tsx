import { useEffect, useRef, useState } from 'react';
import { Download, FileText, Loader2, Printer, X, ZoomIn, ZoomOut } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import {
  CERTIFICATIONS,
  EDUCATION,
  EXPERIENCES,
  PROFILE,
  PROJECTS,
} from '../data/portfolioData';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
}

export function ResumeModal({ open, onClose }: ResumeModalProps) {
  const [viewMode, setViewMode] = useState<'pdf' | 'formatted'>('pdf');
  const [numPages, setNumPages] = useState<number>(0);
  const [scale, setScale] = useState<number>(1.35);
  const [loading, setLoading] = useState<boolean>(false);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState<boolean>(false);
  const pagesContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open || viewMode !== 'pdf') return;
    let cancelled = false;

    async function renderPdf() {
      setLoading(true);
      setPdfError(null);
      try {
        const response = await fetch(PROFILE.resumePath);
        if (!response.ok) {
          throw new Error(`Unable to fetch PDF (${response.status})`);
        }
        const buffer = await response.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument({ data: buffer });
        const pdf = await loadingTask.promise;

        if (cancelled) return;
        setNumPages(pdf.numPages);

        const container = pagesContainerRef.current;
        if (!container) return;
        container.innerHTML = '';

        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          if (cancelled) return;
          const page = await pdf.getPage(pageNum);
          const viewport = page.getViewport({ scale });

          const pageWrapper = document.createElement('div');
          pageWrapper.className =
            'mx-auto mb-5 overflow-hidden border border-[#3b3d38] bg-white shadow-lg';
          pageWrapper.style.width = `${Math.floor(viewport.width)}px`;
          pageWrapper.style.maxWidth = '100%';

          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.width = Math.floor(viewport.width * dpr);
          canvas.height = Math.floor(viewport.height * dpr);
          canvas.style.width = '100%';
          canvas.style.height = 'auto';
          canvas.style.display = 'block';

          if (context) {
            context.setTransform(dpr, 0, 0, dpr, 0, 0);
            await page.render({
              canvasContext: context,
              viewport,
              canvas,
            }).promise;
          }

          pageWrapper.appendChild(canvas);
          container.appendChild(pageWrapper);
        }
      } catch (err) {
        if (!cancelled) {
          setPdfError(err instanceof Error ? err.message : 'Unable to render PDF preview.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    renderPdf();
    return () => {
      cancelled = true;
    };
  }, [open, viewMode, scale]);

  const handleDownloadPdf = async () => {
    setDownloading(true);
    try {
      const response = await fetch(PROFILE.resumePath);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'Renusree_Ayyapparaju_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);
    } catch {
      const fallbackLink = document.createElement('a');
      fallbackLink.href = PROFILE.resumePath;
      fallbackLink.download = 'Renusree_Ayyapparaju_Resume.pdf';
      fallbackLink.click();
    } finally {
      setDownloading(false);
    }
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Resume Document Viewer"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#121215]/85 p-3 backdrop-blur-xs sm:p-5"
      onClick={onClose}
    >
      <div
        className="flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden border border-[#2e2f36] bg-[#18171a] text-[#f4f4f6] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#2e2f36] px-5 py-4 sm:px-6">
          <div>
            <h2 className="font-display text-lg font-bold text-[#f4f4f6]">
              {PROFILE.name} — Curriculum Vitae
            </h2>
            <p className="font-mono text-xs text-[#a1a5b0]">
              {PROFILE.email} · {PROFILE.phone}
              {numPages > 0 && viewMode === 'pdf' ? ` · ${numPages} Pages` : ''}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Switch between rendered Original PDF & Formatted Text View */}
            <div role="tablist" aria-label="Resume view mode" className="inline-flex border border-[#2e2f36] bg-[#121215] p-1">
              <button
                type="button"
                role="tab"
                aria-selected={viewMode === 'pdf'}
                onClick={() => setViewMode('pdf')}
                className={`px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.06em] transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  viewMode === 'pdf' ? 'bg-[#f4b6c2] text-[#18181b]' : 'text-[#d1d4dc] hover:text-[#f4f4f6]'
                }`}
              >
                PDF Preview
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={viewMode === 'formatted'}
                onClick={() => setViewMode('formatted')}
                className={`px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.06em] transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  viewMode === 'formatted' ? 'bg-[#f4b6c2] text-[#18181b]' : 'text-[#d1d4dc] hover:text-[#f4f4f6]'
                }`}
              >
                Text View
              </button>
            </div>

            {viewMode === 'pdf' && (
              <div className="hidden sm:inline-flex items-center border border-[#2e2f36] bg-[#121215]">
                <button
                  type="button"
                  onClick={() => setScale((s) => Math.max(0.85, Number((s - 0.15).toFixed(2))))}
                  aria-label="Zoom out"
                  className="p-2 text-[#d1d4dc] hover:text-[#f4b6c2] cursor-pointer"
                >
                  <ZoomOut className="h-3.5 w-3.5" />
                </button>
                <span className="px-2 font-mono text-[11px] text-[#f4f4f6] tabular-nums">
                  {Math.round(scale * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setScale((s) => Math.min(2.1, Number((s + 0.15).toFixed(2))))}
                  aria-label="Zoom in"
                  className="p-2 text-[#d1d4dc] hover:text-[#f4b6c2] cursor-pointer"
                >
                  <ZoomIn className="h-3.5 w-3.5" />
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={downloading}
              className="inline-flex items-center gap-1.5 bg-[#f4b6c2] px-3.5 py-2 font-mono text-xs font-semibold uppercase tracking-[0.06em] text-[#18181b] transition-opacity hover:opacity-90 disabled:opacity-60 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              {downloading ? 'Preparing...' : 'Download PDF'}
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              aria-label="Print resume"
              className="hidden sm:inline-flex items-center gap-1.5 border border-[#2e2f36] px-3 py-2 font-mono text-xs font-medium uppercase tracking-[0.06em] text-[#f4f4f6] transition-colors hover:border-[#f4b6c2] hover:text-[#f4b6c2] cursor-pointer whitespace-nowrap shrink-0"
            >
              <Printer className="h-3.5 w-3.5" />
              Print
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume modal"
              className="inline-flex h-9 w-9 items-center justify-center border border-[#2e2f36] text-[#d1d4dc] transition-colors hover:border-[#f4b6c2] hover:text-[#f4b6c2] cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Viewer Body */}
        <div className="flex-1 overflow-y-auto bg-[#121215] p-4 sm:p-6">
          {viewMode === 'pdf' ? (
            <div>
              {loading && (
                <div className="flex flex-col items-center justify-center gap-3 py-20 text-xs text-[#d1d4dc]">
                  <Loader2 className="h-6 w-6 animate-spin text-[#f4b6c2]" />
                  <span className="font-mono uppercase tracking-wider">
                    Rendering PDF Document...
                  </span>
                </div>
              )}

              {pdfError && (
                <div className="mx-auto max-w-lg border border-[#2e2f36] bg-[#18171a] p-6 text-center">
                  <FileText className="mx-auto h-7 w-7 text-[#f4b6c2]" />
                  <p className="mt-3 text-sm font-semibold text-[#f4f4f6]">
                    PDF Canvas preview unavailable ({pdfError})
                  </p>
                  <p className="mt-1 text-xs text-[#a1a5b0]">
                    Switch to Text View for instant reading or download the original PDF file directly.
                  </p>
                  <div className="mt-5 flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setViewMode('formatted')}
                      className="bg-[#f4b6c2] px-4 py-2 font-mono text-xs font-semibold uppercase text-[#18181b] cursor-pointer"
                    >
                      Open Text View
                    </button>
                    <button
                      type="button"
                      onClick={handleDownloadPdf}
                      className="border border-[#2e2f36] px-4 py-2 font-mono text-xs uppercase text-[#f4f4f6] cursor-pointer"
                    >
                      Download PDF
                    </button>
                  </div>
                </div>
              )}

              <div ref={pagesContainerRef} className="flex flex-col items-center" />
            </div>
          ) : (
            <div className="mx-auto max-w-3xl border border-[#d4d6dc] bg-[#f6f6f7] p-8 text-[#18181b] shadow-lg sm:p-10">
              <div className="border-b border-[#18181b] pb-4 text-center">
                <h3 className="font-display text-2xl font-extrabold uppercase tracking-tight">
                  {PROFILE.name}
                </h3>
                <p className="mt-1 font-mono text-xs text-[#4c505a]">
                  {PROFILE.email} · {PROFILE.phone} ·{' '}
                  <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="underline">
                    LinkedIn
                  </a>{' '}
                  ·{' '}
                  <a href={PROFILE.github} target="_blank" rel="noreferrer" className="underline">
                    GitHub
                  </a>
                </p>
              </div>

              <div className="mt-5 space-y-5 text-xs leading-relaxed">
                <section>
                  <h4 className="border-b border-[#d4d6dc] pb-1 font-mono text-[11px] font-bold uppercase tracking-wider text-[#18181b]">
                    Professional Summary
                  </h4>
                  <p className="mt-2 text-[#3f424a]">{PROFILE.summary}</p>
                </section>

                <section>
                  <h4 className="border-b border-[#d4d6dc] pb-1 font-mono text-[11px] font-bold uppercase tracking-wider text-[#18181b]">
                    Technical Skills
                  </h4>
                  <div className="mt-2 space-y-1 text-[#3f424a]">
                    <p><strong>Languages:</strong> Python, SQL</p>
                    <p><strong>Web Technologies:</strong> HTML, CSS, JavaScript, Bootstrap</p>
                    <p><strong>Cloud &amp; DevOps:</strong> AWS (EC2, S3, Lambda – basics), DevOps, Cloud Computing Fundamentals</p>
                    <p><strong>Data &amp; Machine Learning:</strong> Power BI, Microsoft Excel, Scikit-learn, Pandas, NumPy, Matplotlib, Seaborn</p>
                    <p><strong>MS Office:</strong> Excel, Word, PowerPoint</p>
                    <p><strong>Soft Skills:</strong> Rapport Building, Stakeholder Management, People Management, Communication</p>
                  </div>
                </section>

                <section>
                  <h4 className="border-b border-[#d4d6dc] pb-1 font-mono text-[11px] font-bold uppercase tracking-wider text-[#18181b]">
                    Professional Experience
                  </h4>
                  <div className="mt-2 space-y-3">
                    {EXPERIENCES.map((exp) => (
                      <div key={exp.id}>
                        <div className="flex flex-wrap justify-between font-semibold text-[#18181b]">
                          <span>{exp.role} — {exp.organization}</span>
                          <span className="font-mono text-[11px] text-[#5e626d]">{exp.period}</span>
                        </div>
                        <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[#3f424a]">
                          {exp.contributions.map((c) => (
                            <li key={c}>{c}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h4 className="border-b border-[#d4d6dc] pb-1 font-mono text-[11px] font-bold uppercase tracking-wider text-[#18181b]">
                    Projects
                  </h4>
                  <div className="mt-2 space-y-3">
                    {PROJECTS.map((proj) => (
                      <div key={proj.id}>
                        <div className="flex flex-wrap justify-between font-semibold text-[#18181b]">
                          <span>{proj.title}</span>
                          <span className="font-mono text-[11px] text-[#5e626d]">{proj.timeframe}</span>
                        </div>
                        <p className="mt-0.5 text-[#3f424a]">{proj.summary}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h4 className="border-b border-[#d4d6dc] pb-1 font-mono text-[11px] font-bold uppercase tracking-wider text-[#18181b]">
                    Education &amp; Certifications
                  </h4>
                  <div className="mt-2 space-y-1.5 text-[#3f424a]">
                    {EDUCATION.map((edu) => (
                      <p key={edu.degree}>
                        <strong>{edu.degree}</strong> — {edu.institution}, {edu.location} ({edu.gpa} · {edu.period})
                      </p>
                    ))}
                    <p className="pt-1">
                      <strong>Certifications:</strong> {CERTIFICATIONS.map((c) => `${c.title} (${c.issuer})`).join(' · ')}
                    </p>
                  </div>
                </section>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
