"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/cn";

interface BackToTopProps {
  threshold?: number;
  className?: string;
}

export const BackToTop: React.FC<BackToTopProps> = ({ 
  threshold = 420, 
  className = "" 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  const scrollToTop = () => {
    if ((window as any).__lenis) {
      (window as any).__lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 16 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40",
            "group/btt relative w-11 h-11 sm:w-12 sm:h-12",
            "rounded-full border border-zinc-200/90 bg-white/95 backdrop-blur-md shadow-card hover:shadow-2xl",
            "flex items-center justify-center overflow-hidden cursor-pointer",
            "transition-all duration-300 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-primary",
            className
          )}
        >
          {/* Default State Arrow (Exits upward on hover) */}
          <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 text-brand-dark transition-all duration-300 group-hover/btt:-translate-y-8 group-hover/btt:opacity-0 relative z-10" />

          {/* Replacement White Arrow (Enters from below on hover) */}
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 text-white transition-all duration-300 translate-y-8 opacity-0 group-hover/btt:translate-y-0 group-hover/btt:opacity-100" />
          </div>

          {/* Expanding Circle Interactive Dot */}
          <div className="absolute left-[38%] top-[38%] h-2.5 w-2.5 rounded-full bg-brand-dark transition-all duration-300 group-hover/btt:left-0 group-hover/btt:top-0 group-hover/btt:h-full group-hover/btt:w-full group-hover/btt:scale-[1.8] group-hover/btt:bg-brand-dark pointer-events-none" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
