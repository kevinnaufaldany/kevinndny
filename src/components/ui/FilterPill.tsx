import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/cn';

interface FilterPillProps {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
  className?: string;
}

export const FilterPill: React.FC<FilterPillProps> = ({
  categories,
  activeCategory,
  onSelect,
  className
}) => {
  return (
    <div className={cn("inline-flex items-center gap-1.5 p-1 rounded-full bg-brand-surface border border-brand-border/60", className)}>
      {categories.map((cat) => {
        const isActive = activeCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={cn(
              "relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-tight transition-colors duration-200 select-none",
              isActive ? "text-brand-dark" : "text-brand-secondary hover:text-brand-dark"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="activeFilterPill"
                className="absolute inset-0 bg-white rounded-full shadow-subtle border border-zinc-200/80"
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              />
            )}
            <span className="relative z-10">{cat}</span>
          </button>
        );
      })}
    </div>
  );
};
