import React from 'react';
import { Experience } from '@/types';

interface ExperienceRowProps {
  experience: Experience;
}

export const ExperienceRow: React.FC<ExperienceRowProps> = ({ experience }) => {
  return (
    <div className="py-7 px-4 -mx-4 rounded-2xl transition-all duration-200 hover:bg-white/[0.04] group flex flex-col md:flex-row md:items-center justify-between gap-4">
      {/* Left: Role & Company */}
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
            {experience.role}
          </h3>
          {experience.current && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Current
            </span>
          )}
        </div>
        <p className="text-sm text-zinc-400 font-medium">
          {experience.company} {experience.location && <span className="text-zinc-600">· {experience.location}</span>}
        </p>
      </div>

      {/* Right: Period & Description */}
      <div className="flex flex-col md:items-end gap-1">
        <span className="text-xs sm:text-sm font-mono text-zinc-400 tracking-wider">
          {experience.period}
        </span>
        {experience.description && (
          <p className="text-xs text-zinc-500 max-w-sm md:text-right hidden sm:block">
            {experience.description}
          </p>
        )}
      </div>
    </div>
  );
};
