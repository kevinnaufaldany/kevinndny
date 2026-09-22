import { useInView, useReducedMotion } from 'motion/react';
import { useRef } from 'react';

export function useScrollReveal(options = { once: true, amount: 0.2 }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, options);
  const shouldReduceMotion = useReducedMotion();

  return {
    ref,
    isInView: shouldReduceMotion ? true : isInView,
    shouldReduceMotion,
  };
}
