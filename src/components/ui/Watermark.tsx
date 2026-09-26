import React from 'react';
import { cn } from '@/lib/cn';

interface WatermarkProps {
  text: string;
  dark?: boolean;
  className?: string;
}

export const Watermark: React.FC<WatermarkProps> = ({
  text,
  dark = false,
  className
}) => {
  return (
    <div 
      aria-hidden="true"
      className={cn(
        "absolute top-2 sm:top-4 md:top-6 left-0 right-0 text-center pointer-events-none select-none z-0 overflow-hidden",
        className
      )}
    >
      <span 
        className={cn(
          "text-6xl sm:text-8xl md:text-[10vw] font-black tracking-tighter uppercase",
          dark ? "text-white opacity-[0.03]" : "text-brand-dark opacity-[0.035]"
        )}
      >
        {text}
      </span>
    </div>
  );
};
