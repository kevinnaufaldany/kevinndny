import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight, Cpu, Layers, Globe, Sparkles } from 'lucide-react';
import { projectsData } from '@/data/projects';
import { Project } from '@/types';
import { fetchProjectBySlug } from '@/services/portfolioService';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { Carousel360 } from '@/components/ui/image-fan-carousel';
import { OrbitingSkills } from '@/components/ui/orbiting-skills';
import { fadeInUp, staggerContainer } from '@/lib/motion';

export const CaseStudyPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const initialProject = projectsData.find((p) => p.slug === slug);
  const [project, setProject] = useState<Project | undefined>(initialProject);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (slug) {
      fetchProjectBySlug(slug).then((data) => {
        if (data) setProject(data);
      });
    }
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
        <p className="text-brand-secondary mb-6">The requested case study could not be located.</p>
        <Link to="/">
          <Button variant="primary">Return to Homepage</Button>
        </Link>
      </div>
    );
  }

  const projectIndex = projectsData.findIndex((p) => p.slug === slug);
  const nextProject = projectsData[(projectIndex + 1) % projectsData.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen bg-white text-brand-dark"
    >
      <Navbar isCaseStudy projectTitle={project.title} />

      <main className="pt-24 sm:pt-28 md:pt-32 pb-20 sm:pb-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        {/* Project Header Two-Column Hero */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 sm:pb-16 border-b border-brand-border/80"
        >
          {/* Left Column: Title, Category, Summary, Action buttons */}
          <motion.div variants={fadeInUp} className="lg:col-span-7 space-y-5 sm:space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              {project.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-brand-surface border border-zinc-200 text-brand-secondary"
                >
                  {tag}
                </span>
              ))}
              <span className="text-[11px] sm:text-xs font-mono uppercase px-3 py-0.5 sm:py-1 rounded-full bg-black text-white">
                {project.category}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-brand-dark leading-[1.12]">
              {project.title}
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-brand-secondary leading-relaxed max-w-2xl font-normal">
              {project.summary}
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
              {project.liveUrl && (
                <InteractiveHoverButton 
                  asAnchor
                  href={project.liveUrl}
                  target="_blank"
                  text="Live Preview"
                  className="w-40 sm:w-44 py-3 sm:py-3.5 shadow-subtle hover:shadow-card font-medium"
                />
              )}
              <Button 
                asAnchor
                href="/#contact"
                variant="outline"
                showArrow={false}
                className="py-3 sm:py-3.5 px-6 sm:px-7"
              >
                Inquire Project
              </Button>
            </div>
          </motion.div>

          {/* Right Column: Metadata Specifications Grid */}
          <motion.div variants={fadeInUp} className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="bg-brand-surface/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 border border-brand-border/80 space-y-4 sm:space-y-6">
              <div>
                <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-brand-secondary block mb-1">
                  Service / Domain
                </span>
                <p className="text-sm sm:text-base font-bold text-brand-dark">{project.service}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-brand-secondary block mb-1">
                    Timeline
                  </span>
                  <p className="text-sm sm:text-base font-bold text-brand-dark">{project.timeline}</p>
                </div>
                <div>
                  <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-brand-secondary block mb-1">
                    Client / Team
                  </span>
                  <p className="text-sm sm:text-base font-bold text-brand-dark">{project.client}</p>
                </div>
              </div>

              <div>
                <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-brand-secondary block mb-2">
                  Tools & Architecture
                </span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.tools.map((tool) => (
                    <span 
                      key={tool}
                      className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs font-mono bg-white border border-zinc-200 text-brand-dark shadow-xs"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Metrics Callouts */}
            {project.metrics && (
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {project.metrics.map((m) => (
                  <div key={m.label} className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-brand-border text-center shadow-subtle min-w-0">
                    <span className="text-sm sm:text-xl lg:text-2xl font-black text-brand-dark block truncate">{m.value}</span>
                    <span className="text-[9px] sm:text-[11px] font-mono text-brand-secondary uppercase block truncate mt-0.5">{m.label}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Showcase Hero Image */}
        <div className="pt-10 sm:pt-14 pb-8 sm:pb-12">
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-card border border-brand-border bg-zinc-50 relative group">
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] sm:text-xs font-mono text-white">
              Primary Visual • Orthomosaic Telemetry
            </div>
            <img 
              src={project.image} 
              alt={`${project.title} Hero View`}
              className="w-full h-auto object-cover max-h-[600px] transition-transform duration-500 group-hover:scale-[1.01]"
            />
          </div>
        </div>

        {/* 3D Interactive Project Visuals Reel */}
        <section className="py-6 sm:py-8">
          <div className="py-10 sm:py-14 px-3 sm:px-8 md:px-10 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-brand-surface/80 via-white to-brand-surface/40 border border-brand-border shadow-subtle overflow-hidden">
            <div className="text-center mb-6 sm:mb-12 max-w-2xl mx-auto px-2">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-brand-secondary inline-block px-3 py-1 rounded-full bg-white border border-zinc-200 mb-2 shadow-xs">
                3D Spatial Cylinder
              </span>
              <h3 className="text-xl sm:text-3xl font-bold tracking-tight text-brand-dark mt-1">
                Field Telemetry & Spatial Visuals
              </h3>
              <p className="text-xs sm:text-sm text-brand-secondary mt-1.5 sm:mt-2 leading-relaxed">
                Rotate through the spatial cylinder to inspect high-resolution field captures, aerial telemetry, and automated crop boundary digitization.
              </p>
            </div>
            
            <Carousel360 
              imagesList={project.gallery && project.gallery.length > 0 ? project.gallery : [project.image]} 
            />
          </div>
        </section>

        {/* Tech Stack & Engineering Architecture Section with OrbitingSkills */}
        <section className="py-12 sm:py-16 border-t border-brand-border/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Tech Stack & System Architecture Breakdown */}
            <div className="lg:col-span-6 space-y-5 sm:space-y-6">
              <div>
                <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-brand-secondary inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-surface border border-zinc-200 mb-3 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  Engineering Architecture
                </span>
                <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-brand-dark">
                  Tech Stack by System Architecture
                </h2>
                <p className="text-xs sm:text-base text-brand-secondary mt-2 leading-relaxed">
                  A high-throughput edge AI and geospatial mapping system built for continuous plantation surveillance, combining real-time computer vision inference with GIS shapefile synchronization.
                </p>
              </div>

              {/* Feature Cards */}
              <div className="space-y-3 pt-1 sm:pt-2">
                <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-brand-border/80 flex items-start gap-3 sm:gap-4 transition-all duration-300 hover:border-emerald-500/40 hover:shadow-subtle">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-zinc-950 text-white shrink-0 mt-0.5 shadow-sm">
                    <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-brand-dark">Edge Computer Vision & Real-time Inference</h4>
                    <p className="text-[11px] sm:text-xs text-brand-secondary mt-0.5 sm:mt-1 leading-relaxed">
                      Custom YOLO and PyTorch models trained on high-altitude orthomosaics for plant crown detection, density scoring, and early anomaly flagging directly on field hardware.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-brand-border/80 flex items-start gap-3 sm:gap-4 transition-all duration-300 hover:border-emerald-500/40 hover:shadow-subtle">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-zinc-950 text-white shrink-0 mt-0.5 shadow-sm">
                    <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-brand-dark">Geospatial GIS & Polygon Synchronization</h4>
                    <p className="text-[11px] sm:text-xs text-brand-secondary mt-0.5 sm:mt-1 leading-relaxed">
                      Automated QGIS integration managing .shp polygon layers, CRS spatial reprojection, and parcel-level metadata across 10,000+ hectares with 100% unique plot IDs.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-brand-border/80 flex items-start gap-3 sm:gap-4 transition-all duration-300 hover:border-emerald-500/40 hover:shadow-subtle">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-zinc-950 text-white shrink-0 mt-0.5 shadow-sm">
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-brand-dark">Scalable Telemetry & Cloud Storage</h4>
                    <p className="text-[11px] sm:text-xs text-brand-secondary mt-0.5 sm:mt-1 leading-relaxed">
                      Automated ingestion pipelines structuring orthomosaic imagery, drone sortie logs, and plot health matrices into centralized cloud repositories.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Orbiting Skills Interactive Visual */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center">
              <div className="w-full bg-gradient-to-b from-brand-surface/90 via-white to-brand-surface/60 border border-brand-border/90 rounded-2xl sm:rounded-3xl p-4 sm:p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-subtle min-h-[360px] sm:min-h-[460px]">
                <div className="w-full flex items-center justify-between mb-2 sm:mb-4 z-10 px-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-brand-secondary bg-white px-2.5 py-1 rounded-full border border-zinc-200 shadow-xs">
                    Interactive Stack Orbit
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400 hidden sm:inline-block">
                    Hover to pause
                  </span>
                </div>

                {/* Orbiting Component with center core AI / GIS */}
                <OrbitingSkills centerLabel="AI / GIS" />
              </div>
            </div>
          </div>
        </section>

        {/* Narrative & Case Study Editorial */}
        <section className="py-12 sm:py-16 border-t border-brand-border/80 space-y-10 sm:space-y-12">
          {/* Executive Strategy Block */}
          <div className="max-w-4xl mx-auto p-6 sm:p-10 md:p-12 rounded-2xl sm:rounded-3xl bg-zinc-950 text-white border border-zinc-800 shadow-card text-center sm:text-left">
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-2 sm:mb-3">
              Design Philosophy & Strategy
            </span>
            <p className="text-base sm:text-xl lg:text-2xl text-zinc-100 leading-relaxed font-medium">
              "{project.description}"
            </p>
          </div>

          {/* Deep-Dive Editorial Breakdown: Problem, Solution, Results */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pt-2 sm:pt-4">
            <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-brand-surface/90 border border-brand-border/80 space-y-2.5 sm:space-y-3 hover:border-zinc-300 hover:bg-white transition-all">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-brand-secondary block">
                01 / The Challenge
              </span>
              <h3 className="text-base sm:text-lg font-bold text-brand-dark">Massive Scale & Blind Spots</h3>
              <p className="text-xs sm:text-sm text-brand-secondary leading-relaxed">
                Inspecting over 10,000 hectares of pineapple plantations by manual field scouting resulted in days of latency, high operational costs, and undetected localized crop stress.
              </p>
            </div>

            <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-brand-surface/90 border border-brand-border/80 space-y-2.5 sm:space-y-3 hover:border-zinc-300 hover:bg-white transition-all">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-brand-secondary block">
                02 / The Solution
              </span>
              <h3 className="text-base sm:text-lg font-bold text-brand-dark">Autonomous Drone-AI Pipeline</h3>
              <p className="text-xs sm:text-sm text-brand-secondary leading-relaxed">
                Deployed aerial sorties paired with edge Computer Vision to execute automated plant counting, polygon boundary tracing (.shp), and instantaneous health categorization.
              </p>
            </div>

            <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-brand-surface/90 border border-brand-border/80 space-y-2.5 sm:space-y-3 hover:border-zinc-300 hover:bg-white transition-all">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-brand-secondary block">
                03 / Quantified Impact
              </span>
              <h3 className="text-base sm:text-lg font-bold text-brand-dark">100% Boundary Digitization</h3>
              <p className="text-xs sm:text-sm text-brand-secondary leading-relaxed">
                Achieved real-time inference speeds on edge devices, 100% unique plot mapping across the entire plantation estate, and actionable agronomy insights.
              </p>
            </div>
          </div>
        </section>

        {/* Next Project Footer Bar - Single Row on Mobile & Desktop */}
        <div className="pt-12 sm:pt-16 border-t border-brand-border/80 flex flex-row items-center justify-between gap-3 sm:gap-6 w-full">
          {/* Left: All Projects with Left-Facing Interactive Hover Button */}
          <Link to="/#work" className="shrink-0">
            <InteractiveHoverButton 
              asDiv
              direction="left"
              text="All Projects"
              textClassName="text-[11px] sm:text-xs font-semibold"
              className="w-28 sm:w-36 py-2.5 sm:py-3 shadow-none border-zinc-300 hover:border-brand-primary/40"
            />
          </Link>

          {/* Right: Next Project with Graceful Truncation */}
          <Link 
            to={`/project/${nextProject.slug}`} 
            className="group flex items-center gap-2 sm:gap-3.5 text-right min-w-0 max-w-[62%] sm:max-w-[50%]"
          >
            <div className="min-w-0 text-right">
              <span className="text-[9px] sm:text-xs font-mono uppercase tracking-widest text-brand-secondary block leading-tight">
                Next Project
              </span>
              <span className="text-xs sm:text-sm md:text-base font-bold text-brand-dark group-hover:text-black truncate block leading-snug">
                {nextProject.title}
              </span>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-brand-surface border border-brand-border flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-colors shrink-0">
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </Link>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
};

export default CaseStudyPage;
