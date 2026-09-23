import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/cn';
import { fadeInUp } from '@/lib/motion';

interface SectionHeaderProps {
  watermark: string;
  title: string;
  category?: string;
  subtitle?: string;
  dark?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  watermark,
  title,
  category,
  subtitle,
  dark = false,
  className,
  children
}) => {
  return (
    <motion.div 
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={cn("relative w-full text-center pb-10 sm:pb-14 select-none overflow-hidden", className)}
    >
      {/* 1. Giant Faint Watermark Backdrop (Matching frame_07.jpg reference) */}
      <div 
        className="w-full flex justify-center items-center pointer-events-none select-none" 
        aria-hidden="true"
      >
        <span 
          className={cn(
            "text-6xl sm:text-8xl md:text-9xl lg:text-[11vw] font-black uppercase tracking-tight leading-none block whitespace-nowrap",
            dark ? "text-white/[0.08]" : "text-neutral-200/80"
          )}
        >
          {watermark}
        </span>
      </div>

      {/* 2. Main Section Title Overlapping the Watermark */}
      <div className="relative z-10 -mt-6 sm:-mt-12 md:-mt-16 lg:-mt-20 px-4">
        {category && (
          <span 
            className={cn(
              "block text-xs font-mono uppercase tracking-widest mb-1 sm:mb-2",
              dark ? "text-zinc-400" : "text-brand-secondary"
            )}
          >
            {category}
          </span>
        )}
        <h2 
          className={cn(
            "text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase",
            dark ? "text-white" : "text-brand-dark"
          )}
        >
          {title}
        </h2>
        {subtitle && (
          <p 
            className={cn(
              "mt-3 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed",
              dark ? "text-zinc-400" : "text-brand-secondary"
            )}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* 3. Action / Metadata row (Filter pills, buttons, badges) */}
      {children && (
        <div className="mt-6 sm:mt-8 relative z-10">
          {children}
        </div>
      )}
    </motion.div>
  );
};

export default SectionHeader;
