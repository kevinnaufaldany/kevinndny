import { useState } from 'react';
import { 
  ArrowUpRight, 
  X, 
  Sparkles 
} from 'lucide-react';

// Clean SVG Brand Icons
const GithubIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const DribbbleIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
    <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
    <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72" />
  </svg>
);

const InstagramIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function App() {
  const [activeService, setActiveService] = useState<number | null>(0);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Real Project' | 'Exploration'>('All');

  const services = [
    {
      id: 0,
      title: 'UIUX DESIGN',
      desc: 'Designing clear, accessible, and scalable digital interfaces for web applications, mobile platforms, and interactive dashboards.',
      tags: ['Design System', 'Wireframing', 'Prototyping', 'Figma']
    },
    {
      id: 1,
      title: 'WEB DESIGN & DEV',
      desc: 'Crafting responsive, high-performance web applications with React, TypeScript, Tailwind CSS, and buttery smooth animations.',
      tags: ['Frontend Architecture', 'Vite & Next.js', 'Tailwind CSS', 'API Integration']
    },
    {
      id: 2,
      title: 'BRANDING',
      desc: 'Establishing distinctive visual identities, typographic systems, color palettes, and comprehensive design tokens.',
      tags: ['Brand Identity', 'Logo Marks', 'Style Guides', 'Editorial Direction']
    },
    {
      id: 3,
      title: 'MOTIONS & ANIMATIONS',
      desc: 'Bringing interfaces to life with purposeful choreography, GSAP timeline sequencing, and Framer Motion micro-interactions.',
      tags: ['Interactive Choreography', 'Framer Motion', 'GSAP', 'Micro-interactions']
    }
  ];

  const projects = [
    {
      id: 1,
      title: 'BloomCare — Mental Health App Landing Page',
      category: 'Real Project',
      tags: ['Landing Page', 'Design System'],
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 2,
      title: 'FragWater — Luxury Fragrance Editorial Experience',
      category: 'Real Project',
      tags: ['Landing Page', 'E-Commerce'],
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 3,
      title: 'CryptoCalm — Investment Analytics & Dashboard',
      category: 'Exploration',
      tags: ['Dashboard', 'Fintech'],
      image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 4,
      title: 'Spenso — Personal Finance Copilot with AI',
      category: 'Real Project',
      tags: ['Mobile App', 'AI Platform'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop'
    }
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  const experiences = [
    { role: 'Creative Director & Lead Frontend', company: 'Studio Mikan', period: '2024 — Present' },
    { role: 'Senior Product Designer', company: 'Digital Agency', period: '2022 — 2024' },
    { role: 'UI/UX & Interaction Designer', company: 'Tech Innovation Labs', period: '2020 — 2022' },
    { role: 'Frontend & UI Developer', company: 'Creative Software Co.', period: '2018 — 2020' }
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#111111] font-sans antialiased selection:bg-black selection:text-white">
      {/* 1. TOP NAVIGATION */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-md bg-white/80 border-b border-zinc-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-zinc-200 shadow-sm text-xs font-medium tracking-tight">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Available for New Project
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
            <a href="#work" className="hover:text-black transition-colors">Work <span className="text-xs text-zinc-400 font-mono">[04]</span></a>
            <a href="#services" className="hover:text-black transition-colors">Service <span className="text-xs text-zinc-400 font-mono">[04]</span></a>
            <a href="#experience" className="hover:text-black transition-colors">Experience <span className="text-xs text-zinc-400 font-mono">[5y+]</span></a>
            <a href="#contact" className="hover:text-black transition-colors">Contact</a>
          </nav>

          {/* Right CTA */}
          <a 
            href="#contact" 
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-black text-white text-xs font-medium hover:bg-zinc-800 transition-all shadow-sm group"
          >
            Let's Talk
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative min-h-screen pt-28 pb-16 px-6 flex flex-col justify-between max-w-7xl mx-auto overflow-hidden">
        {/* Giant Typography Banner */}
        <div className="pt-6 md:pt-10 text-center select-none">
          <h1 className="text-6xl sm:text-8xl md:text-[11vw] font-black tracking-tighter leading-none flex flex-wrap items-center justify-center gap-x-6">
            <span className="text-outline">KEVIN</span>
            <span className="text-[#111111]">NAUFAL</span>
          </h1>
        </div>

        {/* Center Portrait Slot */}
        <div className="relative my-6 flex justify-center items-center pointer-events-none">
          <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-b from-zinc-100 to-zinc-200 border border-zinc-200 flex items-center justify-center overflow-hidden shadow-2xl relative">
            <div className="absolute inset-0 bg-radial from-transparent via-white/20 to-zinc-900/10" />
            <Sparkles className="w-16 h-16 text-zinc-400 animate-pulse" />
            <span className="absolute bottom-6 text-xs text-zinc-500 font-mono tracking-widest uppercase">
              Portrait Slot
            </span>
          </div>
        </div>

        {/* Hero Bottom Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end pt-4">
          {/* Left: Role & Tagline */}
          <div className="space-y-4 max-w-md">
            <div>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-900">
                UI/UX Designer & Creative Engineer
              </h2>
              <p className="mt-1 text-sm text-zinc-500 leading-relaxed">
                Designing and building digital products that are clear, usable, high-converting, and crafted with meticulous attention to motion.
              </p>
            </div>
            <a 
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white text-xs font-semibold hover:bg-zinc-800 transition-all shadow-md group"
            >
              Let's collaborate
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Right: Social Pills Stack */}
          <div className="flex flex-wrap md:justify-end gap-2.5">
            {[
              { name: 'GitHub', icon: GithubIcon, href: 'https://github.com' },
              { name: 'LinkedIn', icon: LinkedinIcon, href: 'https://linkedin.com' },
              { name: 'Dribbble', icon: DribbbleIcon, href: 'https://dribbble.com' },
              { name: 'Instagram', icon: InstagramIcon, href: 'https://instagram.com' },
            ].map((s) => (
              <a 
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-zinc-200 text-xs font-medium text-zinc-700 hover:text-black hover:border-black transition-all shadow-sm"
              >
                <s.icon className="w-3.5 h-3.5" />
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SELECTED WORK SECTION */}
      <section id="work" className="relative py-24 px-6 border-t border-zinc-200 bg-white">
        <div className="max-w-7xl mx-auto relative">
          {/* Background Watermark */}
          <div className="absolute -top-14 left-0 right-0 text-center pointer-events-none select-none">
            <span className="text-7xl md:text-9xl font-black tracking-tighter text-zinc-950 opacity-[0.03]">
              PORTFOLIO
            </span>
          </div>

          {/* Section Header */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">Featured Showcase</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-900 mt-1">
                /SELECTED WORK
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 bg-zinc-100 p-1 rounded-full w-fit">
              {(['All', 'Real Project', 'Exploration'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    activeFilter === tab 
                      ? 'bg-white text-black shadow-sm' 
                      : 'text-zinc-500 hover:text-black'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Projects 2-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((p) => (
              <div 
                key={p.id}
                className="group relative rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-50 hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
              >
                {/* Thumbnail */}
                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-200">
                  <img 
                    src={p.image} 
                    alt={p.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  {/* Badge */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white/90 backdrop-blur-sm text-black shadow-sm">
                    {p.category}
                  </span>
                  {/* Hover Floating Arrow */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6 bg-white flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold tracking-tight text-zinc-900 group-hover:text-black">
                      {p.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {p.tags.map((t) => (
                      <span key={t} className="px-3 py-1 rounded-full text-xs bg-zinc-100 text-zinc-600 font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SERVICES SECTION */}
      <section id="services" className="relative py-24 px-6 bg-[#FAFAFA] border-t border-zinc-200">
        <div className="max-w-7xl mx-auto relative">
          {/* Watermark */}
          <div className="absolute -top-14 left-0 right-0 text-center pointer-events-none select-none">
            <span className="text-7xl md:text-9xl font-black tracking-tighter text-zinc-950 opacity-[0.03]">
              SERVICE
            </span>
          </div>

          <div className="relative z-10 mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">Core Capabilities</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-900 mt-1">
              /SERVICE
            </h2>
          </div>

          {/* Interactive Expanding Accordion */}
          <div className="divide-y divide-zinc-200 border-y border-zinc-200">
            {services.map((s) => {
              const isOpen = activeService === s.id;
              return (
                <div 
                  key={s.id}
                  onClick={() => setActiveService(isOpen ? null : s.id)}
                  className={`transition-all duration-300 cursor-pointer ${
                    isOpen 
                      ? 'bg-[#18181B] text-white p-8 rounded-2xl my-3 shadow-xl' 
                      : 'py-6 px-4 hover:bg-zinc-100/70 text-zinc-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className={`text-xl md:text-3xl font-black tracking-tight ${isOpen ? 'text-white' : 'text-zinc-900'}`}>
                      {s.title}
                    </h3>
                    <div className="p-2 rounded-full border border-zinc-300 dark:border-zinc-700">
                      {isOpen ? (
                        <X className="w-5 h-5 text-white" />
                      ) : (
                        <ArrowUpRight className="w-5 h-5 text-zinc-600" />
                      )}
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {isOpen && (
                    <div className="mt-6 pt-6 border-t border-zinc-800 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                      <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
                        {s.desc}
                      </p>
                      <div className="flex flex-wrap gap-2 md:justify-end">
                        {s.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1 rounded-full text-xs bg-zinc-800 text-zinc-200 font-mono">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. EXPERIENCE SECTION (Inverted Dark Container) */}
      <section id="experience" className="py-24 px-6 bg-[#111111] text-white border-t border-zinc-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          {/* Watermark */}
          <div className="absolute -top-10 left-0 right-0 text-center pointer-events-none select-none">
            <span className="text-7xl md:text-9xl font-black tracking-tighter text-white opacity-[0.03]">
              EXPERIENCE
            </span>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-zinc-800 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">Career Trajectory</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mt-1">
                /EXPERIENCE
              </h2>
            </div>
            <span className="text-xs font-mono px-4 py-1.5 rounded-full bg-zinc-800 text-zinc-300 w-fit">
              5+ years of digital creation
            </span>
          </div>

          <div className="divide-y divide-zinc-800/80">
            {experiences.map((exp, idx) => (
              <div 
                key={idx}
                className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-zinc-900/50 px-4 -mx-4 rounded-xl transition-colors"
              >
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">{exp.role}</h3>
                  <p className="text-xs md:text-sm text-zinc-400">{exp.company}</p>
                </div>
                <div className="text-xs md:text-sm font-mono text-zinc-500">
                  {exp.period}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION / FOOTER */}
      <footer id="contact" className="py-28 px-6 bg-white text-center relative border-t border-zinc-200">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-medium text-zinc-700">
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Available for New Project
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter text-zinc-900">
            HAVE A PROJECT IN MIND?
          </h2>

          <p className="text-sm md:text-base text-zinc-600 max-w-xl mx-auto leading-relaxed">
            Together, we can create something clear, impactful, and memorable. Let's collaborate to bring your ideas to life.
          </p>

          <div className="pt-4">
            <a 
              href="mailto:contact@kevinndny.dev" 
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-black text-white text-sm font-semibold hover:bg-zinc-800 transition-all shadow-xl hover:scale-105 group"
            >
              Contact Me
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          <div className="pt-16 text-xs text-zinc-400 font-mono">
            © {new Date().getFullYear()} Kevin Naufal Dany. All rights reserved. Crafted with Antigravity & Motion.
          </div>
        </div>
      </footer>
    </div>
  );
}
