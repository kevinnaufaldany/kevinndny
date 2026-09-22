import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, X } from 'lucide-react';
import { Service } from '@/types';
import { cn } from '@/lib/cn';
import { springPresets } from '@/lib/motion';

interface ServiceAccordionItemProps {
  service: Service;
  isOpen: boolean;
  onToggle: () => void;
}

export const ServiceAccordionItem: React.FC<ServiceAccordionItemProps> = ({
  service,
  isOpen,
  onToggle
}) => {
  return (
    <motion.div
      layout
      transition={springPresets.snappy}
      onClick={onToggle}
      className={cn(
        "cursor-pointer transition-colors duration-300 overflow-hidden",
        isOpen 
          ? "bg-brand-cardDark text-white p-8 md:p-10 rounded-3xl my-4 shadow-2xl border border-zinc-800" 
          : "py-8 px-4 hover:bg-zinc-100/60 rounded-xl text-brand-dark"
      )}
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between gap-4">
        <h3 className={cn(
          "text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight uppercase",
          isOpen ? "text-white" : "text-brand-dark"
        )}>
          {service.title}
        </h3>

        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 flex-shrink-0",
          isOpen 
            ? "border-zinc-700 bg-zinc-800 text-white" 
            : "border-brand-border bg-white text-brand-dark shadow-subtle"
        )}>
          {isOpen ? (
            <X className="w-5 h-5 transition-transform duration-300 rotate-90" />
          ) : (
            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 hover:translate-x-0.5 hover:-translate-y-0.5" />
          )}
        </div>
      </div>

      {/* Expanded Content Reveal */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="pt-8 mt-6 border-t border-zinc-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Left Column: Description & Tags */}
            <div className="lg:col-span-7 space-y-6">
              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-xl">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-2.5">
                {service.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-4 py-1.5 rounded-full text-xs font-mono font-medium bg-zinc-800/80 text-zinc-300 border border-zinc-700/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: 3D Tilted Mockup Showcase */}
            {service.mockupImages && service.mockupImages.length > 0 && (
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <motion.div
                  initial={{ opacity: 0, x: 40, rotate: 0 }}
                  animate={{ opacity: 1, x: 0, rotate: -8 }}
                  transition={springPresets.bouncy}
                  className="relative w-60 sm:w-72 aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-zinc-700/60 bg-zinc-800 transform-gpu"
                >
                  <img 
                    src={service.mockupImages[0]} 
                    alt={`${service.title} showcase`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-4 text-[10px] font-mono uppercase tracking-widest text-white/80">
                    Interactive Preview
                  </span>
                </motion.div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
