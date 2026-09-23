"use client"

import React, { useState } from "react"

export interface SocialItem {
  name: string
  href: string
  icon: React.ReactNode
}

const defaultSocials: SocialItem[] = [
  {
    name: "GitHub",
    href: "https://github.com/kevinnaufaldany",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-[18px]">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/kevin-naufal-dany/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-[18px]">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com/kevinndny",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-[18px]">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    name: "Email",
    href: "mailto:kevinndny@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-[18px]">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
]

interface SocialIconsProps {
  layout?: "row" | "column" | "grid2x2" | "auto"
  className?: string
  showLabels?: boolean
}

export function SocialIcons({ layout = "auto", className = "", showLabels = false }: SocialIconsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Layout container classes based on mode
  const getLayoutClasses = () => {
    switch (layout) {
      case "grid2x2":
        return "grid grid-cols-2 gap-2.5 p-2.5"
      case "column":
        return "flex flex-col gap-2 p-2"
      case "row":
        return "flex items-center gap-1.5 p-1.5"
      case "auto":
      default:
        return "grid grid-cols-2 sm:flex sm:items-center gap-2 sm:gap-1.5 p-2 sm:p-1.5"
    }
  }

  return (
    <div
      className={`relative rounded-2xl bg-white/95 backdrop-blur-md border border-brand-border text-brand-dark shadow-subtle hover:shadow-card transition-shadow duration-300 ${getLayoutClasses()} ${className}`}
    >
      {defaultSocials.map((social, index) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center gap-2 h-11 px-3 sm:px-0 sm:size-10 rounded-xl transition-all duration-200 hover:bg-neutral-100"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          aria-label={social.name}
        >
          {/* Subtle highlight pill */}
          <span
            className={`absolute inset-1 rounded-lg bg-neutral-100 transition-all duration-200 ease-out ${
              hoveredIndex === index ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          />

          {/* Icon */}
          <span
            className={`relative z-10 transition-all duration-200 ease-out ${
              hoveredIndex === index ? "text-brand-dark scale-110" : "text-brand-secondary group-hover:text-brand-dark"
            }`}
          >
            {social.icon}
          </span>

          {/* Optional inline label for 2x2 mode on mobile */}
          {showLabels && (
            <span className="sm:hidden relative z-10 text-xs font-semibold text-brand-secondary group-hover:text-brand-dark">
              {social.name}
            </span>
          )}

          {/* Active bottom indicator bar */}
          <span
            className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-brand-dark transition-all duration-200 ease-out ${
              hoveredIndex === index ? "w-3 opacity-100" : "w-0 opacity-0"
            }`}
          />

          {/* Floating Tooltip */}
          <span
            className={`absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-brand-dark text-white text-[11px] font-semibold whitespace-nowrap shadow-lg transition-all duration-200 ease-out z-30 pointer-events-none ${
              hoveredIndex === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
            }`}
          >
            {social.name}
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 size-2 rotate-45 bg-brand-dark" />
          </span>
        </a>
      ))}
    </div>
  )
}

export default SocialIcons
