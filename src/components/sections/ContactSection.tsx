import React from 'react';
import { motion } from 'motion/react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { fadeInUp, staggerContainer } from '@/lib/motion';

export const ContactSection: React.FC = () => {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="contact" className="py-28 sm:py-36 px-6 sm:px-8 bg-white border-t border-brand-border/80 text-center relative overflow-hidden">
      <div ref={ref} className="max-w-4xl mx-auto space-y-8 relative z-10">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-6"
        >
          {/* Status Badge */}
          <motion.div variants={fadeInUp} className="flex justify-center">
            <Badge text="Available for New Project" />
          </motion.div>

          {/* Heading */}
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter text-brand-dark max-w-3xl mx-auto leading-tight"
          >
            HAVE A PROJECT IN MIND?
          </motion.h2>

          {/* Description */}
          <motion.p 
            variants={fadeInUp}
            className="text-sm sm:text-base md:text-lg text-brand-secondary max-w-xl mx-auto leading-relaxed"
          >
            Together, we can create something clear, impactful, and unforgettable. Let's collaborate to bring your ambitious ideas to life.
          </motion.p>

          {/* Action Button */}
          <motion.div variants={fadeInUp} className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <InteractiveHoverButton 
              asAnchor
              href="mailto:kevin@kevinndny.dev"
              text="Contact Me"
              className="w-44 py-3.5"
            />
            <Button 
              asAnchor
              href="https://linkedin.com/in/kevinndny"
              variant="outline"
              className="py-4 px-8 text-sm"
            >
              Connect on LinkedIn
            </Button>
          </motion.div>

          {/* Editorial Meta footer note */}
          <motion.div variants={fadeInUp} className="pt-12 text-xs font-mono text-brand-secondary/70 flex flex-wrap items-center justify-center gap-6">
            <span>Indonesia (GMT+7)</span>
            <span>·</span>
            <span>Response time: &lt; 24h</span>
            <span>·</span>
            <span>Direct: kevin@kevinndny.dev</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
