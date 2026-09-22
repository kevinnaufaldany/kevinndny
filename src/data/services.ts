import { Service } from '@/types';

export const servicesData: Service[] = [
  {
    id: 'uiux',
    title: 'UIUX DESIGN',
    description: 'Designing clear, scalable, and delightful interfaces for enterprise dashboards, mobile apps, and high-impact web products.',
    tags: ['Design System', 'Wireframing', 'Interactive Prototypes', 'Figma Mastery'],
    mockupImages: [
      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1616469829941-c7200edec809?q=80&w=800&auto=format&fit=crop'
    ]
  },
  {
    id: 'webdev',
    title: 'WEB DESIGN & DEV',
    description: 'Building ultra-responsive, accessible, and fast web applications using React, Next.js, Vite, TypeScript, and modern CSS architecture.',
    tags: ['Frontend Architecture', 'Vite & React 19', 'Tailwind CSS', 'Performance Optimization'],
    mockupImages: [
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop'
    ]
  },
  {
    id: 'branding',
    title: 'BRANDING',
    description: 'Crafting unforgettable brand narratives, bespoke typographic systems, color theory guidelines, and comprehensive design tokens.',
    tags: ['Brand Identity', 'Logomarks', 'Typography Systems', 'Editorial Direction'],
    mockupImages: [
      'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=800&auto=format&fit=crop'
    ]
  },
  {
    id: 'motion',
    title: 'MOTIONS & ANIMATIONS',
    description: 'Bringing interfaces to life with purposeful choreography, spring physics, scroll-triggered reveals, and micro-interactions.',
    tags: ['Motion Design', 'Framer Motion', 'GSAP Animation', 'Spatial Continuity'],
    mockupImages: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop'
    ]
  }
];
