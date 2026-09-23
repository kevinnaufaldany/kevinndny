import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { experiencesData } from '@/data/experiences';
import { Experience } from '@/types';
import { fetchExperiences } from '@/services/portfolioService';
import { ExperienceRow } from '@/components/cards/ExperienceRow';
import { Watermark } from '@/components/ui/Watermark';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { fadeInUp, staggerContainer } from '@/lib/motion';

export const ExperienceSection: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>(experiencesData);
  const { ref, isInView } = useScrollReveal();

  useEffect(() => {
    // Dynamic query from Supabase with instant fallback
    fetchExperiences().then((data) => {
      if (data && data.length > 0) {
        setExperiences(data);
      }
    });
  }, []);

  return (
    <section id="experience" className="py-20 px-4 sm:px-8 bg-brand-surface border-t border-brand-border/80">
      <div 
        ref={ref}
        className="max-w-7xl mx-auto relative rounded-3xl bg-brand-dark text-white p-8 sm:p-14 md:p-16 overflow-hidden shadow-card border border-zinc-800"
      >
        {/* Subtle Dark Watermark */}
        <Watermark text="EXPERIENCE" dark />

        <div className="relative z-10">
          {/* Header Row */}
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col sm:flex-row sm:items-end justify-between pb-10 border-b border-zinc-800 gap-4"
          >
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                Career Trajectory
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mt-1">
                /EXPERIENCE
              </h2>
            </div>
            <span className="text-xs font-mono px-4 py-1.5 rounded-full bg-zinc-800/80 text-zinc-300 border border-zinc-700/60 w-fit">
              5+ years of craft & engineering
            </span>
          </motion.div>

          {/* Timeline Table */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="divide-y divide-zinc-800/70 mt-2"
          >
            {experiences.map((exp, idx) => (
              <motion.div key={idx} variants={fadeInUp}>
                <ExperienceRow experience={exp} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
