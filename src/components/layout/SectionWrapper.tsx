import React from 'react';
import { Watermark } from '@/components/ui/Watermark';
import { cn } from '@/lib/cn';

interface SectionWrapperProps {
  id?: string;
  watermark?: string;
  dark?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  id,
  watermark,
  dark = false,
  className,
  children
}) => {
  return (
    <section 
      id={id} 
      className={cn(
        "relative py-20 sm:py-28 px-6 sm:px-8 overflow-hidden transition-colors duration-300 scroll-mt-0",
        dark ? "bg-brand-dark text-white" : "bg-white text-brand-dark",
        className
      )}
    >
      {watermark && <Watermark text={watermark} dark={dark} />}
      <div className="max-w-7xl mx-auto relative z-10">
        {children}
      </div>
    </section>
  );
};
