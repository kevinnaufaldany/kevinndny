import React, { useState, useEffect } from 'react';
import { projectsData } from '@/data/projects';
import { Project } from '@/types';
import { fetchProjects } from '@/services/portfolioService';
import { WorksWheel, type WorksWheelItem } from '@/components/ui/works-wheel';
import { FilterPill } from '@/components/ui/FilterPill';
import { Button } from '@/components/ui/Button';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(projectsData);
  const [activeFilter, setActiveFilter] = useState('All');
  const { ref } = useScrollReveal();

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
          {/* Action Row: Category Filters on Left, GitHub on Right */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 max-w-6xl mx-auto w-full">
            <FilterPill 
              categories={filterCategories}
              activeCategory={activeFilter}
              onSelect={setActiveFilter}
            />

            <Button 
              asAnchor
              href="https://github.com/kevinnaufaldany"
              variant="outline"
              className="hidden md:inline-flex text-xs py-2 px-3.5"
            >
              View on GitHub
            </Button>
          </div>
        </SectionHeader>

        {/* 3D WorksWheel Showcase */}
        <div className="mt-6">
          <div className="w-full rounded-2xl border border-brand-border/70 overflow-hidden bg-radial from-zinc-50 to-white shadow-xs">
            <WorksWheel 
              items={wheelItems}
              label="Projects '26"
              action="View Project"
              className="h-[32rem] sm:h-[38rem] lg:h-[42rem]"
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ProjectsSection;
