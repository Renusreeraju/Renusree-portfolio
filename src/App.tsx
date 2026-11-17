import { useState } from 'react';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { ContactSection } from './components/ContactSection';
import { CredentialsSection } from './components/CredentialsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#f4f4f6] text-[#18181b]">
      <Header onOpenResume={() => setResumeOpen(true)} />

      <main>
        <HeroSection
          onSelectProject={(id) => setSelectedProjectId(id)}
          onOpenResume={() => setResumeOpen(true)}
        />
        <ProjectsSection
          selectedProjectId={selectedProjectId}
          onSelectProject={setSelectedProjectId}
        />
        <ExperienceSection />
        <CapabilitiesSection />
        <CredentialsSection />
        <ContactSection onOpenResume={() => setResumeOpen(true)} />
      </main>

      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  );
}
