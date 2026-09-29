"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/cn";

interface BackToTopProps {
  /** Scroll distance in pixels after which the button becomes visible (defaults to 850px, passing hero/dashboard) */
  threshold?: number;
  className?: string;
}

export const BackToTop: React.FC<BackToTopProps> = ({ 
  threshold = 850, 
  className = "" 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  // Scroll detection combining native scroll, document scrollTop, and Lenis smooth scroll
  const evaluateScroll = useCallback(() => {
    const lenis = (window as any).__lenis;
    const lenisScroll = typeof lenis?.scroll === "number" ? lenis.scroll : null;
    const winScroll = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const currentScroll = lenisScroll !== null ? Math.max(lenisScroll, winScroll) : winScroll;
    
    setIsVisible(currentScroll > threshold);
  }, [threshold]);

  useEffect(() => {
    evaluateScroll();

    // Native scroll listener
    window.addEventListener("scroll", evaluateScroll, { passive: true });
    document.addEventListener("scroll", evaluateScroll, { passive: true });

    // Lenis scroll subscription
    let unsubLenis: (() => void) | undefined;
    const checkLenis = () => {
      const lenis = (window as any).__lenis;
      if (lenis && !unsubLenis) {
        const onLenisScroll = (e: any) => {
          const s = typeof e?.scroll === "number" ? e.scroll : window.scrollY;
          setIsVisible(s > threshold);
        };
        lenis.on("scroll", onLenisScroll);
        unsubLenis = () => {
          if (lenis?.off) lenis.off("scroll", onLenisScroll);
        };
        return true;
      }
      return false;
    };

    if (!checkLenis()) {
      // Poll briefly if Lenis initializes shortly after mount
      const interval = setInterval(() => {
        if (checkLenis()) clearInterval(interval);
      }, 200);
      const timer = setTimeout(() => clearInterval(interval), 4000);
      return () => {
        window.removeEventListener("scroll", evaluateScroll);
        document.removeEventListener("scroll", evaluateScroll);
        if (unsubLenis) unsubLenis();
        clearInterval(interval);
        clearTimeout(timer);
      };
    }

    return () => {
      window.removeEventListener("scroll", evaluateScroll);
      document.removeEventListener("scroll", evaluateScroll);
      if (unsubLenis) unsubLenis();
    };
  }, [evaluateScroll, threshold]);

  const scrollToTop = () => {
    const lenis = (window as any).__lenis;
    if (lenis && typeof lenis.scrollTo === "function") {
      lenis.scrollTo(0, { duration: 1.2, immediate: false });
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
          initial={{ opacity: 0, scale: 0.6, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 24 }}
          transition={{ type: "spring", stiffness: 380, damping: 26 }}
          className={cn(
            "fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50",
            "group/btt relative w-12 h-12 sm:w-13 sm:h-13",
            "rounded-full border border-zinc-200/90 bg-white/95 backdrop-blur-md shadow-card hover:shadow-2xl",
            "flex items-center justify-center overflow-hidden cursor-pointer select-none",
            "transition-all duration-300 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-primary active:scale-95",
            className
          )}
          style={{ position: "fixed", right: "1.5rem", bottom: "1.5rem", left: "auto", zIndex: 9999 }}
        >
          {/* Expanding Circle Interactive Dot (Expands radially from dead center) */}
          <div className="absolute inset-0 m-auto h-3 w-3 rounded-full bg-brand-dark scale-0 transition-transform duration-300 ease-out group-hover/btt:scale-[5] pointer-events-none" />

          {/* Default Dark Arrow (Slides up & exits on hover) */}
          <ArrowUp className="w-5 h-5 text-brand-dark transition-all duration-300 group-hover/btt:-translate-y-8 group-hover/btt:opacity-0 relative z-10" />

          {/* Replacement White Arrow (Slides up from below on hover) */}
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <ArrowUp className="w-5 h-5 text-white transition-all duration-300 translate-y-8 opacity-0 group-hover/btt:translate-y-0 group-hover/btt:opacity-100" />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;


