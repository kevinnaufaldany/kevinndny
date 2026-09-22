import { Transition, Variants } from 'motion/react';

// Spring Physics configurations from Build Plan
export const springPresets = {
  snappy: { type: 'spring', stiffness: 300, damping: 20 } as Transition,
  bouncy: { type: 'spring', stiffness: 200, damping: 12, overshootClamping: false } as Transition,
  gentle: { type: 'spring', stiffness: 120, damping: 14 } as Transition,
  magnetic: { type: 'spring', stiffness: 220, damping: 16 } as Transition,
};

// Scroll Reveal Variants
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } 
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

export const heroLetterVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
  },
};

export const cardHoverVariants: Variants = {
  rest: { scale: 1, transition: springPresets.snappy },
  hover: { scale: 1.03, transition: springPresets.snappy },
};
