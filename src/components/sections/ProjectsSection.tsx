import React, { useState, useEffect, useRef, useCallback } from 'react';
import { projectsData } from '@/data/projects';
import { Project } from '@/types';
import { fetchProjects } from '@/services/portfolioService';
import { WorksWheel, type WorksWheelItem } from '@/components/ui/works-wheel';
import { FilterPill } from '@/components/ui/FilterPill';
import { Button } from '@/components/ui/Button';

export const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(projectsData);
  const [activeFilter, setActiveFilter] = useState('All');
  const sectionRef = useRef<HTMLElement>(null);

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
    summary: p.summary,
    tags: p.tags,
  }));

  const handleFilterSelect = useCallback((cat: string) => {
    if (cat === activeFilter) return;

    // When changing category while scrolled deep into section, smoothly align to section top
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top < -20) {
        const topY = window.scrollY + rect.top;
        const lenis = (window as any).__lenis;
        if (lenis && typeof lenis.scrollTo === 'function') {
          lenis.scrollTo(topY, { duration: 0.5 });
        } else {
          window.scrollTo({ top: topY, behavior: 'smooth' });
        }
      }
    }
    setActiveFilter(cat);
  }, [activeFilter]);

  // Scroll track height: ~70vh per item + 100vh viewport ensures comfortable scroll dwell per item
  const trackHeightVh = Math.max(220, 100 + wheelItems.length * 70);

  return (
    <section
      id="project"
      ref={sectionRef}
      className="relative w-full bg-white border-t border-brand-border/80"
      style={{ height: `${trackHeightVh}vh` }}
    >
      {/* Sticky Full-Viewport Stage Container: blends seamlessly into page, no boxed wrapper */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden bg-white select-none">
        
        {/* Section Header: positioned with safe clearance under fixed navbar */}
        <div className="pt-20 sm:pt-24 pb-2 px-4 sm:px-8 max-w-7xl mx-auto w-full shrink-0 z-30 relative">
          {/* Subtle Watermark Backdrop: safely positioned below fixed navbar and centered behind header row */}
          <div
            className="w-full flex justify-center items-center pointer-events-none select-none absolute top-12 sm:top-14 md:top-16 left-0 right-0 overflow-hidden opacity-25 sm:opacity-35"
            aria-hidden="true"
          >
            <span className="text-6xl sm:text-8xl md:text-9xl font-black uppercase tracking-tight text-neutral-200/90 select-none leading-none block whitespace-nowrap">
              PORTFOLIO
            </span>
          </div>

          {/* Header Title & Filter Row */}
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
            {/* Title & Eyebrow */}
            <div className="text-center md:text-left">
              <span className="block text-[11px] font-mono uppercase tracking-widest text-brand-secondary mb-0.5">
                Selected Archives
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight uppercase text-brand-dark">
                /SELECTED PROJECTS
              </h2>
            </div>

            {/* Filter Pills and GitHub Link */}
            <div className="flex items-center gap-3 sm:gap-4">
              <FilterPill
                categories={filterCategories}
                activeCategory={activeFilter}
                onSelect={handleFilterSelect}
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
          </div>
        </div>

        {/* 3D WorksWheel Showcase: Natural flow, no "kotakan", driven by page scroll */}
        <div className="flex-1 min-h-0 w-full relative">
          <WorksWheel
            items={wheelItems}
            scrollContainerRef={sectionRef}
            label="Projects '26"
            action="View Project"
            className="h-full"
          />
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
