import React from 'react';
import { motion } from 'motion/react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { CertificationsSection } from '@/components/sections/CertificationsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { PixelCursorTrail } from '@/components/ui/pixel-trail';

export const HomePage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-white text-brand-dark relative selection:bg-brand-primary selection:text-white"
    >
      {/* Background Pixel Cursor Trail (rendered behind cards and buttons with pointer-events-none) */}
      <PixelCursorTrail />

      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <ProjectsSection />
        <ServicesSection />
        <ExperienceSection />
        <CertificationsSection />
        <ContactSection />
      </main>
      <Footer />
    </motion.div>
  );
};

export default HomePage;
