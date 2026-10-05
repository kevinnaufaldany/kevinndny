import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { projectsData } from '@/data/projects';
import { Project } from '@/types';
import { fetchProjects } from '@/services/portfolioService';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { WorksWheel, type WorksWheelItem } from '@/components/ui/works-wheel';
import { FilterPill } from '@/components/ui/FilterPill';
import { Button } from '@/components/ui/Button';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { staggerContainer } from '@/lib/motion';
import { Disc3, LayoutGrid } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(projectsData);
  const [activeFilter, setActiveFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'wheel' | 'grid'>('wheel');
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

  // Map filtered projects into 3D WorksWheel items
  const wheelItems: WorksWheelItem[] = filteredProjects.map((p) => ({
    title: p.title,
    image: p.image,
    href: `/project/${p.slug}`,
    category: p.category,
  }));

  return (
    <SectionWrapper id="project" className="border-t border-brand-border/80 bg-white">
      <div ref={ref}>
        {/* Section Header with PORTFOLIO Watermark Backdrop */}
        <SectionHeader
          watermark="PORTFOLIO"
          title="/SELECTED PROJECTS"
          category="Selected Archives"
        >
          {/* Action Row: Filters on Left, View Toggle & GitHub on Right */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 max-w-6xl mx-auto w-full">
            <FilterPill 
              categories={filterCategories}
              activeCategory={activeFilter}
              onSelect={setActiveFilter}
            />

            <div className="flex items-center gap-2.5">
              {/* View Switch: 3D Wheel vs Grid */}
              <div className="inline-flex items-center p-1 rounded-xl bg-zinc-100/90 border border-brand-border/70 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setViewMode('wheel')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                    viewMode === 'wheel'
                      ? 'bg-white text-brand-dark shadow-xs font-semibold'
                      : 'text-zinc-500 hover:text-brand-dark'
                  }`}
                  title="3D Interactive Wheel View"
                >
                  <Disc3 className="w-3.5 h-3.5" />
                  <span>3D Wheel</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                    viewMode === 'grid'
                      ? 'bg-white text-brand-dark shadow-xs font-semibold'
                      : 'text-zinc-500 hover:text-brand-dark'
                  }`}
                  title="Card Grid View"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Grid</span>
                </button>
              </div>

              <Button 
                asAnchor
                href="https://github.com/kevinnaufaldany"
                variant="outline"
                className="hidden md:inline-flex text-xs py-2 px-3.5"
              >
                View on GitHub
              </Button>
            </div>
          </div>
        </SectionHeader>

        {/* Dynamic Project View: 3D WorksWheel or Grid */}
        <div className="mt-4">
          <AnimatePresence mode="wait">
            {viewMode === 'wheel' ? (
              <motion.div
                key="wheel-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="w-full rounded-2xl border border-brand-border/70 overflow-hidden bg-radial from-zinc-50 to-white shadow-xs"
              >
                <WorksWheel 
                  items={wheelItems}
                  label="Projects '26"
                  action="View Project"
                  className="h-[32rem] sm:h-[36rem] lg:h-[40rem]"
                />
              </motion.div>
            ) : (
              <motion.div 
                key="grid-view"
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                exit={{ opacity: 0 }}
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
            )}
          </AnimatePresence>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ProjectsSection;
