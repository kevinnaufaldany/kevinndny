import React from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/Button';
import { BlueprintInkReveal } from '@/components/ui/blueprint-ink-reveal';
import { SocialIcons } from '@/components/ui/social-icons';
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
              inkRadius={200}
              showCoordinates={false}
              seamless={true}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* 2. Anchored Portrait Photo — 100% Dead-Center on All Screens */}
      <motion.div 
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springPresets.gentle, delay: 0.15 }}
        className="w-full flex justify-center items-center my-6 md:my-0 md:absolute md:bottom-0 md:left-0 md:right-0 z-20 pointer-events-none"
      >
        <div className="relative flex justify-center items-end">
          <img 
            src="/assets/3x4-pro-no-bg.png" 
            alt="Kevin Naufal Dany"
            className="h-[46vh] sm:h-[54vh] md:h-[62vh] lg:h-[66vh] max-h-[620px] w-auto mx-auto object-contain object-bottom filter grayscale contrast-[1.08] hover:grayscale-0 transition-all duration-700 drop-shadow-md pointer-events-auto cursor-pointer"
            loading="eager"
          />
        </div>
      </motion.div>

      {/* 3. Hero Bottom Row (Left Role & Right Socials, Sejajar & Lowered) */}
      {/* Mobile: Natural sequence (Role first, then 2x2 Socials) */}
      {/* Desktop: Absolute bottom row on the exact same baseline (bottom-8 lg:bottom-10) */}
      <div className="w-full flex flex-col md:flex-row md:items-end md:justify-between z-30 gap-8 md:gap-0 md:absolute md:inset-x-0 md:bottom-8 lg:bottom-10 md:px-12 lg:px-16 pointer-events-none">
        
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

        {/* Right Column: White Minimalist Social Icons (Aligned horizontally with Left Column) */}
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="w-full md:w-auto flex justify-center md:justify-end pointer-events-auto"
        >
          {/* Mobile: 2x2 grid with clean white bg */}
          <div className="md:hidden w-full max-w-xs">
            <SocialIcons layout="grid2x2" showLabels={true} className="w-full" />
          </div>

          {/* Desktop: Horizontal white pill bar perfectly aligned with the left CTA button */}
          <div className="hidden md:block">
            <SocialIcons layout="row" />
          </div>
        </motion.div>

      </div>

    </section>
  );
};

export default HeroSection;
