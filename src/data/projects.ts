import { Project } from '@/types';

export const projectsData: Project[] = [
  {
    slug: 'bloomcare',
    title: 'BloomCare — Mental Health App Landing Page',
    category: 'Real Project',
    tags: ['Landing Page', 'Kumpin Studio'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1400&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1400&auto=format&fit=crop'
    ],
    summary: 'A calm, science-backed digital sanctuary helping users cultivate daily emotional well-being and mindful resilience.',
    description: 'BloomCare needed a distinctive, non-intimidating visual direction that balances clinical credibility with human warmth. We engineered an atmospheric dark-mode palette energized by neon magenta aura glows, fluid organic curves, and micro-interactions that slow down heart rates.',
    service: 'UI/UX Design, Interaction Design',
    timeline: '3 Weeks',
    tools: ['Figma', 'React', 'Tailwind CSS', 'Motion'],
    client: 'Kumpin Studio',
    liveUrl: 'https://bloomcare.app',
    metrics: [
      { label: 'Conversion Rate', value: '+42%' },
      { label: 'User Retention', value: '78%' },
      { label: 'App Store Rating', value: '4.9★' }
    ]
  },
  {
    slug: 'fragwater',
    title: 'FragWater — Luxury Fragrance Landing Page',
    category: 'Real Project',
    tags: ['Landing Page', 'Kumpin Studio'],
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1400&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1400&auto=format&fit=crop'
    ],
    summary: 'A modern luxury fragrance brand brought to life through a clean, elegant, and high-end landing page experience.',
    description: 'This design focuses on premium visual storytelling, editorial typography, and refined product presentation built to make every variant feel timeless, exclusive, and unforgettable. The layout embraces dramatic negative space, fine serif accents, and tactile scroll-driven choreography.',
    service: 'UI/UX Design, Web Design',
    timeline: '4 Weeks',
    tools: ['Figma', 'Next.js', 'Tailwind CSS', 'Lenis'],
    client: 'Kumpin Studio',
    liveUrl: 'https://fragwater.luxury',
    metrics: [
      { label: 'AOV Increase', value: '+28%' },
      { label: 'Bounce Rate', value: '-35%' },
      { label: 'Global Orders', value: '12K+' }
    ]
  },
  {
    slug: 'cryptocalm',
    title: 'CryptoCalm — Crypto Investment Dashboard for Beginners',
    category: 'Exploration',
    tags: ['Dashboard', 'Mobile App'],
    image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=1400&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1400&auto=format&fit=crop'
    ],
    summary: 'Demystifying decentralized finance with intuitive visual telemetry, automated rebalancing, and zero-jargon charts.',
    description: 'Cryptocurrency analytics tools are notorious for cognitive overload. CryptoCalm radically simplifies trading by replacing complex depth charts with color-graded confidence bands, clear risk indicators, and human-readable transaction narratives.',
    service: 'Product Strategy, Dashboard UI',
    timeline: '2 Weeks',
    tools: ['Figma', 'TypeScript', 'Chart.js'],
    client: 'Self-Initiated Concept',
    liveUrl: 'https://cryptocalm.dev',
    metrics: [
      { label: 'Task Speed', value: '3.2x Faster' },
      { label: 'Error Rate', value: '< 0.2%' },
      { label: 'SUS Score', value: '92/100' }
    ]
  },
  {
    slug: 'spenso',
    title: 'Spenso — Redefining Personal Finance with AI',
    category: 'Real Project',
    tags: ['Mobile App', 'Mikan Team'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1400&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1400&auto=format&fit=crop'
    ],
    summary: 'An intelligent personal wealth copilot that anticipates cashflow bottlenecks before they happen.',
    description: 'Spenso combines bank feed synchronization with conversational intelligence. We engineered a card-stack interaction paradigm that allows users to review daily subscriptions, recurring debits, and predictive savings goals in under 15 seconds.',
    service: 'Mobile Design, Prototyping',
    timeline: '5 Weeks',
    tools: ['Figma', 'React Native', 'Tailwind'],
    client: 'Mikan Team',
    liveUrl: 'https://spenso.io',
    metrics: [
      { label: 'Active Users', value: '45K+' },
      { label: 'Avg Saved/Mo', value: '$340' },
      { label: 'Day-30 Retention', value: '64%' }
    ]
  }
];
