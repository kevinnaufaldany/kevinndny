import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import { projectsData } from '@/data/projects';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { fadeInUp, staggerContainer } from '@/lib/motion';

export const CaseStudyPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const projectIndex = projectsData.findIndex((p) => p.slug === slug);
  const project = projectsData[projectIndex];

  useEffect(() => {
    window.scrollTo(0, 0);
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

  const nextProject = projectsData[(projectIndex + 1) % projectsData.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen bg-white text-brand-dark"
    >
      <Navbar isCaseStudy />

      <main className="pt-28 pb-24 px-6 sm:px-8 max-w-7xl mx-auto">
        {/* Project Header Two-Column Hero (Matching Video Frame 19) */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-brand-border/80"
        >
          {/* Left Column: Title, Category, Summary, Action buttons */}
          <motion.div variants={fadeInUp} className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2.5">
              {project.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-3.5 py-1 rounded-full text-xs font-semibold bg-brand-surface border border-zinc-200 text-brand-secondary"
                >
                  {tag}
                </span>
              ))}
              <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-black text-white">
                {project.category}
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-brand-dark leading-tight">
              {project.title}
            </h1>

            <p className="text-base sm:text-xl text-brand-secondary leading-relaxed max-w-2xl font-normal">
              {project.summary}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              {project.liveUrl && (
                <Button 
                  asAnchor
                  href={project.liveUrl}
                  variant="primary"
                  className="py-3.5 px-8"
                >
                  Live Preview
                </Button>
              )}
              <Button 
                asAnchor
                href="#contact"
                variant="outline"
                showArrow={false}
                className="py-3.5 px-7"
              >
                Inquire Project
              </Button>
            </div>
          </motion.div>

          {/* Right Column: Metadata Specifications Grid */}
          <motion.div variants={fadeInUp} className="lg:col-span-5 flex flex-col justify-between">
            <div className="bg-brand-surface rounded-3xl p-8 border border-brand-border/80 space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-brand-secondary block mb-1">
                  Service / Domain
                </span>
                <p className="text-base font-bold text-brand-dark">{project.service}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-brand-secondary block mb-1">
                    Timeline
                  </span>
                  <p className="text-base font-bold text-brand-dark">{project.timeline}</p>
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-brand-secondary block mb-1">
                    Client / Team
                  </span>
                  <p className="text-base font-bold text-brand-dark">{project.client}</p>
                </div>
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-brand-secondary block mb-2">
                  Tools & Architecture
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span 
                      key={tool}
                      className="px-3 py-1 rounded-full text-xs font-mono bg-white border border-zinc-200 text-brand-dark"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Metrics Callouts */}
            {project.metrics && (
              <div className="grid grid-cols-3 gap-3 pt-6">
                {project.metrics.map((m) => (
                  <div key={m.label} className="p-4 rounded-2xl bg-white border border-brand-border text-center shadow-subtle">
                    <span className="text-xl sm:text-2xl font-black text-brand-dark block">{m.value}</span>
                    <span className="text-[10px] sm:text-xs font-mono text-brand-secondary uppercase">{m.label}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Narrative & Editorial Presentation (Matching Frame 20) */}
        <div className="py-16 space-y-16">
          {/* Main Showcase Hero Image */}
          <div className="rounded-3xl overflow-hidden shadow-card border border-brand-border">
            <img 
              src={project.image} 
              alt={`${project.title} Hero View`}
              className="w-full h-auto object-cover max-h-[700px]"
            />
          </div>

          {/* Narrative Callout Block */}
          <div className="max-w-3xl mx-auto p-8 sm:p-12 rounded-3xl bg-brand-surface border border-brand-border text-center sm:text-left">
            <span className="text-xs font-mono uppercase tracking-widest text-brand-secondary block mb-2">
              Design Philosophy & Strategy
            </span>
            <p className="text-lg sm:text-xl text-brand-dark leading-relaxed font-medium">
              "{project.description}"
            </p>
          </div>

          {/* Supplementary Gallery Screens */}
          {project.gallery && project.gallery.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.gallery.slice(1).map((imgUrl, i) => (
                <div key={i} className="rounded-2xl overflow-hidden shadow-subtle border border-brand-border">
                  <img 
                    src={imgUrl} 
                    alt={`${project.title} Screen ${i + 2}`} 
                    className="w-full h-full object-cover aspect-[4/3]"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Next Project Footer Bar */}
        <div className="pt-16 border-t border-brand-border/80 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link to="/">
            <Button variant="outline" showArrow={false} className="gap-2">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Selected Work</span>
            </Button>
          </Link>

          <Link to={`/project/${nextProject.slug}`} className="group flex items-center gap-4 text-right">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-brand-secondary block">
                Next Project
              </span>
              <span className="text-base font-bold text-brand-dark group-hover:text-black">
                {nextProject.title}
              </span>
            </div>
            <div className="w-10 h-10 rounded-full bg-brand-surface border border-brand-border flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-colors">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </Link>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
};
