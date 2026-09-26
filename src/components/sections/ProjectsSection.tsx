import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { projectsData } from '@/data/projects';
import { Project } from '@/types';
import { fetchProjects } from '@/services/portfolioService';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { FilterPill } from '@/components/ui/FilterPill';
import { Button } from '@/components/ui/Button';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { staggerContainer } from '@/lib/motion';

export const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(projectsData);
  const [activeFilter, setActiveFilter] = useState('All');
  const { ref, isInView } = useScrollReveal();

  useEffect(() => {
    // Dynamic query from Supabase with instant fallback
    fetchProjects().then((data) => {
      if (data && data.length > 0) {
        setProjects(data);
      }
    });
  }, []);

  const filterCategories = ['All', 'Real Project', 'Exploration'];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <SectionWrapper id="work" className="border-t border-brand-border/80 bg-white">
      <div ref={ref}>
        {/* Section Header with PORTFOLIO Watermark Backdrop (Exact Frame 07 Reference Layout) */}
        <SectionHeader
          watermark="PORTFOLIO"
          title="/SELECTED WORK"
          category="Selected Archives"
        >
          {/* Action Row right below title: Filters on Left, View All on Right */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 max-w-6xl mx-auto">
            <FilterPill 
              categories={filterCategories}
              activeCategory={activeFilter}
              onSelect={setActiveFilter}
            />

            <Button 
              asAnchor
              href="https://github.com/kevinnaufaldany"
              variant="outline"
              className="hidden sm:inline-flex"
            >
              View All Work
            </Button>
          </div>
        </SectionHeader>

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

export default ProjectsSection;
