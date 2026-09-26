import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '@/types';
import { useMagneticCursor } from '@/hooks/useMagneticCursor';
import { springPresets } from '@/lib/motion';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { position, isHovered, bind } = useMagneticCursor();

  return (
    <Link to={`/project/${project.slug}`}>
      <motion.article 
        initial="rest"
        whileHover="hover"
        className="group relative rounded-2xl overflow-hidden border border-brand-border/70 bg-white hover:border-brand-primary/40 shadow-subtle hover:shadow-card transition-colors duration-300 flex flex-col cursor-pointer"
      >
        {/* Card Thumbnail Area — Magnetic Floating Cursor constrained only to image background */}
        <div 
          {...bind}
          className="relative aspect-[16/10] overflow-hidden bg-zinc-100"
        >
          <motion.img 
            src={project.image} 
            alt={project.title} 
            loading="lazy"
            className="w-full h-full object-cover"
            variants={{
              rest: { scale: 1 },
              hover: { scale: 1.04 }
            }}
            transition={springPresets.snappy}
          />

          {/* Badge Overlay */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white/90 backdrop-blur-md text-brand-dark shadow-subtle border border-zinc-200/60">
              {project.category}
            </span>
          </div>

          {/* Magnetic Floating Cursor Arrow */}
          <AnimatePresence>
            {isHovered && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  x: position.x - 28,
                  y: position.y - 28,
                }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                className="pointer-events-none absolute top-0 left-0 z-20 w-14 h-14 rounded-full bg-white text-brand-dark shadow-2xl flex items-center justify-center border border-zinc-200/80"
              >
                <ArrowUpRight className="w-6 h-6 stroke-[2.5]" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Card Info Content */}
        <div className="p-6 bg-white flex-1 flex flex-col justify-between gap-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-brand-secondary">
              <span>{project.service}</span>
              <span>{project.timeline}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-brand-dark group-hover:text-black transition-colors leading-snug">
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm text-brand-secondary line-clamp-2 leading-relaxed font-normal">
              {project.summary}
            </p>
          </div>

          {/* Bottom Action & Tags Row */}
          <div className="pt-4 border-t border-zinc-100 flex items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1.5 flex-1 overflow-hidden">
              {project.tags.slice(0, 3).map((tag) => (
                <span 
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-brand-surface text-brand-secondary border border-zinc-200/60 whitespace-nowrap"
                >
                  {tag}
                </span>
              ))}
            </div>
            <InteractiveHoverButton 
              asDiv 
              text="View" 
              textClassName="text-xs font-semibold"
              className="w-24 py-2 shrink-0 shadow-none border-zinc-200 hover:border-brand-primary/40"
            />
          </div>
        </div>
      </motion.article>
    </Link>
  );
};
