import React from 'react';
import { Experience } from '@/types';

interface ExperienceRowProps {
  experience: Experience;
}

export const ExperienceRow: React.FC<ExperienceRowProps> = ({ experience }) => {
  return (
    <div className="py-6 px-4 sm:px-6 -mx-4 sm:-mx-6 rounded-2xl transition-all duration-200 hover:bg-white/[0.04] group flex flex-col md:flex-row md:items-start justify-between gap-4">
      {/* Left: Role & Company & Description */}
      <div className="space-y-1.5 flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2.5">
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
            {experience.role}
          </h3>
          {experience.current && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
              Current
            </span>
          )}
        </div>
        <p className="text-xs sm:text-sm text-zinc-400 font-medium">
          {experience.company} {experience.location && <span className="text-zinc-600">· {experience.location}</span>}
        </p>
        {experience.description && (
          <p className="text-xs text-zinc-500 leading-relaxed max-w-xl pt-1">
            {experience.description}
          </p>
        )}
      </div>

      {/* Right: Period Date */}
      <div className="flex flex-col md:items-end gap-1 shrink-0 pt-0.5 md:pt-1">
        <span className="text-xs sm:text-sm font-mono text-zinc-400 tracking-wider whitespace-nowrap bg-zinc-800/50 px-3 py-1 rounded-full border border-zinc-700/40">
          {experience.period}
        </span>
      </div>
    </div>
  );
};
