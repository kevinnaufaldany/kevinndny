import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-6 sm:px-8 border-t border-brand-border bg-white text-brand-secondary text-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-brand-primary">KEVIN NAUFAL DANY</span>
          <span className="text-zinc-300">/</span>
          <span>UI/UX & Creative Engineering</span>
        </div>

        <div className="flex items-center gap-6">
          <span>© {new Date().getFullYear()} All rights reserved.</span>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-brand-border bg-brand-surface hover:bg-zinc-200/70 text-brand-dark transition-all duration-200 select-none"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
};
