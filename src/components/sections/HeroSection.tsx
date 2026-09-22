import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SocialPill } from '@/components/ui/SocialPill';
import { fadeInUp, staggerContainer, springPresets } from '@/lib/motion';

export const HeroSection: React.FC = () => {
  const socials = [
    { name: 'GitHub', href: 'https://github.com/kevinndny', iconName: 'github' },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/kevinndny', iconName: 'linkedin' },
    { name: 'Dribbble', href: 'https://dribbble.com', iconName: 'dribbble' },
    { name: 'Instagram', href: 'https://instagram.com/kevinndny', iconName: 'instagram' },
  ];

  return (
    <section className="relative min-h-screen pt-28 pb-16 px-6 sm:px-8 flex flex-col justify-between max-w-7xl mx-auto overflow-hidden">
      {/* Editorial Aeonik-Inspired Meta Badges (Top Row under Nav) */}
      <motion.div 
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="flex items-center justify-between text-xs font-mono text-brand-secondary/80 border-b border-brand-border/60 pb-4 mb-4 select-none"
      >
        <div className="flex items-center gap-6">
          <span className="hidden sm:inline-block tracking-wider uppercase">UI/UX & Creative Engineering</span>
          <span>/</span>
          <span className="text-brand-dark font-medium">Available for Q3/Q4</span>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-brand-dark">+40</span>
            <span className="text-[10px] uppercase text-brand-secondary">Projects</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-brand-dark">5y+</span>
            <span className="text-[10px] uppercase text-brand-secondary">Experience</span>
          </div>
        </div>
      </motion.div>

      {/* Main Giant Typography Banner */}
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="pt-4 md:pt-8 text-center select-none"
      >
        <h1 className="text-6xl sm:text-8xl md:text-[12vw] font-black tracking-tighter leading-[0.88] flex flex-wrap items-center justify-center gap-x-4 md:gap-x-8">
          <motion.span 
            variants={fadeInUp}
            className="text-outline hover:text-outline-white transition-all cursor-default"
          >
            KEVIN
          </motion.span>
          <motion.span 
            variants={fadeInUp}
            className="text-brand-primary"
          >
            NAUFAL
          </motion.span>
        </h1>
      </motion.div>

      {/* Centerpiece: Anchored Portrait Frame with Depth */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ ...springPresets.gentle, delay: 0.2 }}
        className="relative my-6 md:my-8 flex justify-center items-center pointer-events-none"
      >
        <div className="relative w-64 h-72 sm:w-76 sm:h-84 md:w-84 md:h-96 rounded-3xl overflow-hidden border border-zinc-200/80 shadow-card bg-gradient-to-b from-zinc-100 via-white to-zinc-200">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop" 
            alt="Kevin Naufal Dany portrait"
            className="w-full h-full object-cover filter grayscale contrast-105"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-0 right-0 text-center">
            <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-black/60 text-white backdrop-blur-md">
              Kevin Naufal Dany
            </span>
          </div>
        </div>
      </motion.div>

      {/* Hero Bottom Split: Bio / Tagline on Left, Social Pills on Right */}
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end pt-4 border-t border-brand-border/60"
      >
        {/* Left: Role & Collaborative CTA */}
        <motion.div variants={fadeInUp} className="space-y-4 max-w-md">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-brand-dark">
              UI/UX Designer & Creative Developer
            </h2>
            <p className="mt-1.5 text-sm text-brand-secondary leading-relaxed">
              Crafting digital products that marry Swiss-minimal clarity with purposeful motion, high usability, and conversion-focused systems.
            </p>
          </div>
          <Button asAnchor href="#contact" variant="primary" className="py-3 px-7">
            Let's collaborate
          </Button>
        </motion.div>

        {/* Right: Social Pills & Scroll Prompt */}
        <motion.div variants={fadeInUp} className="flex flex-col md:items-end gap-5">
          <div className="flex flex-wrap md:justify-end gap-2.5">
            {socials.map((s) => (
              <SocialPill key={s.name} name={s.name} href={s.href} iconName={s.iconName} />
            ))}
          </div>

          <a 
            href="#work" 
            className="hidden md:inline-flex items-center gap-2 text-xs font-mono text-brand-secondary hover:text-brand-dark transition-colors tracking-widest uppercase select-none"
          >
            <span>Scroll down</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};
