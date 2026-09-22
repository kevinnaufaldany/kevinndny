import React from 'react';
import { cn } from '@/lib/cn';

interface BadgeProps {
  text?: string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ 
  text = 'Available for New Project',
  className 
}) => {
  return (
    <div 
      className={cn(
        "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-brand-border shadow-subtle text-xs font-medium text-brand-dark tracking-tight transition-all hover:border-zinc-300 select-none",
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
      </span>
      <span>{text}</span>
    </div>
  );
};
