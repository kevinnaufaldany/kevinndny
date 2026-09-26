import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '@/types';
import { useMagneticCursor } from '@/hooks/useMagneticCursor';
import { springPresets } from '@/lib/motion';

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
        <div className="p-6 bg-white flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-brand-dark group-hover:text-black transition-colors">
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm text-brand-secondary mt-2 line-clamp-2 leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-zinc-100">
            {project.tags.map((tag) => (
              <span 
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-medium bg-brand-surface text-brand-secondary border border-zinc-200/60"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.article>
    </Link>
  );
};
