import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { projectsData } from '@/data/projects';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { FilterPill } from '@/components/ui/FilterPill';
import { Button } from '@/components/ui/Button';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { fadeInUp, staggerContainer } from '@/lib/motion';

export const ProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const { ref, isInView } = useScrollReveal();

  const filterCategories = ['All', 'Real Project', 'Exploration'];

  const filteredProjects = activeFilter === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === activeFilter);

  return (
    <SectionWrapper id="work" watermark="PORTFOLIO" className="border-t border-brand-border/80">
      <div ref={ref}>
        {/* Section Header & Filter Bar */}
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12"
        >
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-brand-secondary">
              Selected Archives
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-brand-dark mt-1">
              /SELECTED WORK
            </h2>
          </div>

          <div className="flex flex-wrap items-center justify-between sm:justify-end gap-4">
            <FilterPill 
              categories={filterCategories}
              activeCategory={activeFilter}
              onSelect={setActiveFilter}
            />

            <Button 
              asAnchor
              href="https://github.com/kevinndny"
              variant="outline"
              className="hidden sm:inline-flex"
            >
              View All Work
            </Button>
          </div>
        </motion.div>

        {/* Project Cards 2-Column Grid */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};
