import React from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/Button';
import { BlueprintInkReveal } from '@/components/ui/blueprint-ink-reveal';
import { LiveOrb } from '@/components/ui/live-orb';
import { SocialIcons } from '@/components/ui/social-icons';
import { PortraitSilhouette } from '@/components/ui/portrait-silhouette';
import { fadeInUp, staggerContainer, springPresets } from '@/lib/motion';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen md:h-screen md:min-h-[700px] md:max-h-[1080px] overflow-hidden flex flex-col justify-between pt-20 sm:pt-24 md:pt-16 pb-12 md:pb-0 px-6 sm:px-10 md:px-12 lg:px-16 max-w-7xl mx-auto select-none">
      
      {/* 1. Giant Bold Name: "KEVIN NAUFAL" (Clean grotesque, matching frame_03) */}
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="w-full text-center z-10 pt-1 sm:pt-3"
      >
        <motion.div variants={fadeInUp} className="w-full">
          <div className="w-full max-w-5xl lg:max-w-6xl mx-auto">
            <BlueprintInkReveal 
              wordmark="KEVIN NAUFAL" 
              inkRadius={100}
              showCoordinates={false}
              seamless={true}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* 2. Anchored Portrait Photo — 100% Dead-Center on All Screens with Alpha-Accurate Silhouette Hover */}
      <motion.div 
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springPresets.gentle, delay: 0.15 }}
        className="w-full flex justify-center items-center my-6 md:my-0 md:absolute md:bottom-0 md:left-0 md:right-0 z-20 pointer-events-none"
      >
        <PortraitSilhouette 
          src="/assets/3x4-pro-no-bg.png" 
          alt="Kevin Naufal Dany"
          className="h-[46vh] sm:h-[54vh] md:h-[62vh] lg:h-[66vh] max-h-[620px] w-auto mx-auto object-contain object-bottom"
        />
      </motion.div>

      {/**
       * ============================================================================
       * PANDUAN PENGATURAN HERO SECTION
       * ============================================================================
       * 1. Lebar Kontainer Wordmark:
       *    - `max-w-5xl lg:max-w-6xl` di atas menentukan lebar maksimal teks "KEVIN NAUFAL".
       * 
       * 2. Tinggi Foto Portrait Silhouette:
       *    - `h-[46vh] sm:h-[54vh] md:h-[62vh] lg:h-[66vh] max-h-[620px]`
       *    - Dapat diperbesar/diperkecil dengan mengubah persentase viewport height (vh).
       * 
       * 3. Baseline Posisi Baris Bawah (Desktop):
       *    - `md:bottom-12 lg:bottom-16` di pembungkus baris bawah.
       *    - Naikkan ke `bottom-16 lg:bottom-20` jika ingin posisi role & social bar lebih naik.
       * 
       * 4. Jarak Vertikal Live Orb ke Social Pill Bar:
       *    - Diatur melalui `gap-7 sm:gap-8 md:gap-9` pada wrapper kolom kanan serta
       *      `mb-2 sm:mb-3` pada pembungkus Live Orb.
       *    - Naikkan nilai mb (misal `mb-4` atau `mb-6`) jika ingin Live Orb melayang lebih tinggi lagi.
       * ============================================================================
       */}

      {/* 3. Hero Bottom Row (Left Role & Right Socials, Sejajar & Lifted above screen bottom) */}
      {/* Mobile: Natural sequence (Role first, then 2x2 Socials) */}
      {/* Desktop: Absolute bottom row on the exact same baseline (bottom-12 lg:bottom-16) */}
      <div className="w-full flex flex-col md:flex-row md:items-end md:justify-between z-30 gap-8 md:gap-0 md:absolute md:inset-x-0 md:bottom-12 lg:bottom-16 md:px-12 lg:px-16 pointer-events-none">
        
        {/* Left Column: Role Headline, Tagline, & Collaborate CTA */}
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="w-full md:max-w-xs lg:max-w-sm text-center md:text-left space-y-3 pointer-events-auto"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-[2rem] font-black tracking-tight text-brand-dark leading-tight">
              Computer Vision Engineer
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-brand-secondary leading-relaxed font-normal">
              AI, Computer Vision & Edge Systems. Turning complex imagery into real-time intelligent solutions.
            </p>
          </div>
          <div className="pt-1 flex justify-center md:justify-start">
            <Button 
              asAnchor 
              href="#contact" 
              variant="primary" 
              className="py-3 px-7 text-xs sm:text-sm shadow-subtle hover:shadow-card"
            >
              Let's collaborate
            </Button>
          </div>
        </motion.div>

        {/* Right Column: Live Orb Character & White Minimalist Social Icons */}
        {/* Menggunakan gap-7 sm:gap-8 md:gap-9 dan mb-2 sm:mb-3 agar Live Orb memiliki elevasi naik yang elegan di atas bar sosial */}
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="w-full md:w-auto flex flex-col items-center md:items-center gap-7 sm:gap-8 md:gap-9 pointer-events-auto"
        >
          {/* Interactive Live Orb centered horizontally with elevated breathing room above social pill */}
          <div className="flex justify-center mb-2 sm:mb-3">
            <div className="relative group cursor-grab active:cursor-grabbing hover:scale-105 transition-all duration-300 drop-shadow-md">
              <LiveOrb size={120} variant="white" interactive={true} blink={true} />
            </div>
          </div>

          {/* Mobile: 2x2 grid with clean white bg */}
          <div className="md:hidden w-full max-w-xs">
            <SocialIcons layout="grid2x2" showLabels={true} className="w-full" />
          </div>

          {/* Desktop: Horizontal white pill bar perfectly centered below Live Orb */}
          <div className="hidden md:block">
            <SocialIcons layout="row" />
          </div>
        </motion.div>

      </div>

    </section>
  );
};

export default HeroSection;
