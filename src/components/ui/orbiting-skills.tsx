"use client";
import React, { useEffect, useState, memo } from 'react';

// --- Type Definitions ---
export type IconType = 
  | 'html' 
  | 'css' 
  | 'javascript' 
  | 'react' 
  | 'node' 
  | 'tailwind'
  | 'python'
  | 'pytorch'
  | 'opencv'
  | 'aws'
  | 'qgis'
  | 'typescript'
  | 'docker';

export type GlowColor = 'cyan' | 'purple' | 'emerald' | 'zinc' | 'amber';

export interface SkillIconProps {
  type: IconType;
}

export interface SkillConfig {
  id: string;
  orbitRadius: number;
  size: number;
  speed: number;
  iconType: IconType;
  phaseShift: number;
  glowColor: GlowColor;
  label: string;
}

export interface OrbitingSkillProps {
  config: SkillConfig;
  angle: number;
}

export interface GlowingOrbitPathProps {
  radius: number;
  glowColor?: GlowColor;
}

// --- High-Fidelity SVG Icon Components ---
const iconComponents: Record<IconType, { component: () => React.JSX.Element; color: string }> = {
  html: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" fill="#E34F26"/>
      </svg>
    ),
    color: '#E34F26'
  },
  css: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.751L12 19.351l5.379-1.443.744-8.157z" fill="#1572B6"/>
      </svg>
    ),
    color: '#1572B6'
  },
  javascript: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <rect width="24" height="24" fill="#F7DF1E" rx="3" />
        <path d="M22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" fill="#323330"/>
      </svg>
    ),
    color: '#F7DF1E'
  },
  react: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <g stroke="#61DAFB" strokeWidth="1.2" fill="none">
          <circle cx="12" cy="12" r="2.2" fill="#61DAFB"/>
          <ellipse cx="12" cy="12" rx="11" ry="4.2"/>
          <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(60 12 12)"/>
          <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(120 12 12)"/>
        </g>
      </svg>
    ),
    color: '#61DAFB'
  },
  node: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.602.065-.037.151-.023.218.017l2.256 1.339c.082.045.198.045.275 0l8.795-5.076c.082-.047.135-.141.135-.241V6.921c0-.103-.055-.198-.137-.246l-8.791-5.072c-.081-.047-.189-.047-.273 0L2.075 6.675c-.084.048-.139.144-.139.246v10.146c0 .1.055.194.139.241l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L1.352 18.675C.533 18.215 0 17.352 0 16.43V6.284c0-.922.533-1.786 1.352-2.245L10.147-.963c.8-.452 1.866-.452 2.657 0l8.796 5.002c.819.459 1.352 1.323 1.352 2.245v10.146c0 .922-.533 1.783-1.352 2.245l-8.796 5.078c-.28.163-.601.247-.926.247zm2.717-6.993c-3.849 0-4.654-1.766-4.654-3.246 0-.14.114-.253.256-.253h1.136c.127 0 .232.091.252.215.173 1.164.686 1.752 3.01 1.752 1.852 0 2.639-.419 2.639-1.401 0-.566-.224-1.03-3.099-1.249-2.404-.184-3.89-.768-3.89-2.689 0-1.771 1.491-2.825 3.991-2.825 2.808 0 4.199.975 4.377 3.068.007.072-.019.141-.065.193-.047.049-.111.077-.178.077h-1.14c-.119 0-.225-.083-.248-.196-.276-1.224-.944-1.616-2.746-1.616-2.023 0-2.259.705-2.259 1.234 0 .641.278.827 3.006 1.19 2.7.359 3.982.866 3.982 2.771 0 1.922-1.603 3.024-4.399 3.024z" fill="#339933"/>
      </svg>
    ),
    color: '#339933'
  },
  tailwind: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" fill="#06B6D4"/>
      </svg>
    ),
    color: '#06B6D4'
  },
  python: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path d="M11.91 2c-5.26 0-4.93 2.28-4.93 2.28l.01 2.37h5.02v.71H4.97S2 7.03 2 12.28c0 5.26 2.59 5.09 2.59 5.09h1.54v-2.17s-.08-2.59 2.54-2.59h5.01s2.45.04 2.45-2.41V4.41S16.48 2 11.91 2zm-2.73 1.57c.5 0 .91.41.91.91s-.41.91-.91.91-.91-.41-.91-.91.41-.91.91-.91z" fill="#3776AB"/>
        <path d="M12.09 22c5.26 0 4.93-2.28 4.93-2.28l-.01-2.37h-5.02v-.71h7.04s2.97.33 2.97-4.92c0-5.26-2.59-5.09-2.59-5.09h-1.54v2.17s.08 2.59-2.54 2.59H10.87s-2.45-.04-2.45 2.41v5.79s-.29 2.41 4.28 2.41zm2.73-1.57c-.5 0-.91-.41-.91-.91s.41-.91.91-.91.91.41.91.91-.41.91-.91.91z" fill="#FFD43B"/>
      </svg>
    ),
    color: '#3776AB'
  },
  pytorch: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12.83 2.27a.5.5 0 0 0-.66 0C8.38 5.48 5 9.77 5 14.5A7.5 7.5 0 0 0 12.5 22a7.5 7.5 0 0 0 7.5-7.5c0-4.73-3.38-9.02-7.17-12.23zm-.33 1.93c3.27 2.87 6.17 6.64 6.17 10.3a6.17 6.17 0 1 1-12.34 0c0-3.66 2.9-7.43 6.17-10.3zm2.5 6.5a1 1 0 0 0-1 1v2.5h-2.5a1 1 0 1 0 0 2h3.5a1 1 0 0 0 1-1v-3.5a1 1 0 0 0-1-1z" fill="#EE4C2C"/>
      </svg>
    ),
    color: '#EE4C2C'
  },
  opencv: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <circle cx="12" cy="7" r="4.5" stroke="#ED1C24" strokeWidth="2.2" fill="none" />
        <circle cx="7" cy="16" r="4.5" stroke="#00AEEF" strokeWidth="2.2" fill="none" />
        <circle cx="17" cy="16" r="4.5" stroke="#22B14C" strokeWidth="2.2" fill="none" />
      </svg>
    ),
    color: '#00AEEF'
  },
  aws: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M18.72 16.51c-2.47 1.82-6.08 2.78-9.17 2.78-4.32 0-8.21-1.6-11.15-4.28-.23-.21-.03-.49.25-.33 3.16 1.83 7.02 2.93 11 2.93 2.74 0 5.76-.64 8.47-1.97.41-.2.74.26.6.87zm1.18-.75c-.32-.41-2.09-.17-2.89-.08-.24.03-.28-.18-.06-.34 1.45-1.02 3.82-.73 4.1-.38.29.35-.08 2.74-1.44 3.86-.21.17-.41.08-.32-.15.29-.75.93-2.5.61-2.91z" fill="#FF9900"/>
        <path d="M12.92 6.55c-.2 1.44-.94 2.51-2.28 2.51-.76 0-1.28-.46-1.28-1.24 0-1.12.87-1.8 2.4-1.92l1.16-.09v.74zm1.96 4.31v-.47c0-.98-.05-2.02-.54-2.89-.5-.87-1.39-1.42-2.38-1.55l-2.01-.27c-2.31-.3-3.48 1.09-3.48 2.79 0 1.63 1.13 2.77 2.8 2.77 1.3 0 2.22-.6 2.74-1.5v1.12h2.87zm-7.6-6.17h2.89l1.82 7.04 1.82-7.04h2.89l-3.32 10.42h-2.78l-3.32-10.42z" fill="#232F3E"/>
      </svg>
    ),
    color: '#FF9900'
  },
  qgis: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.84 14.88l-2.58-2.58a4.92 4.92 0 0 1-1.26.18 5 5 0 1 1 5-5c0 .44-.06.87-.18 1.26l2.58 2.58-3.56 3.56z" fill="#589632"/>
        <path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" fill="#93B023"/>
      </svg>
    ),
    color: '#589632'
  },
  typescript: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <rect width="24" height="24" fill="#3178C6" rx="3" />
        <path d="M11.5 11h-2v7.5h-2V11h-2V9.5h6V11zm9.5 2.8c-.2-1.3-1.1-2.1-2.6-2.1-1.3 0-2.3.7-2.3 2 0 1.2.9 1.7 2.4 2.2 1.9.6 2.8 1.2 2.8 2.7 0 1.9-1.5 2.9-3.5 2.9-2.3 0-3.6-1.2-3.7-2.9h2c.1 1 .8 1.5 1.7 1.5 1 0 1.6-.5 1.6-1.3 0-.9-.7-1.3-2.1-1.8-1.9-.7-3.1-1.4-3.1-3 0-1.8 1.4-3 3.3-3 1.9 0 3.2 1 3.4 2.7l-1.9.1z" fill="#FFFFFF"/>
      </svg>
    ),
    color: '#3178C6'
  },
  docker: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M13.98 11.08h-2.15V8.95h2.15v2.13zm-2.48 0H9.36V8.95H11.5v2.13zm-2.49 0H6.86V8.95h2.15v2.13zm7.44 0h-2.14V8.95h2.14v2.13zm-2.47-2.46h-2.15V6.49h2.15v2.13zm-2.48 0H9.36V6.49H11.5v2.13zm-2.49 0H6.86V6.49h2.15v2.13zm7.44 0h-2.14V6.49h2.14v2.13zm4.72 4.14c-.39-.24-.95-.36-1.57-.36-.2 0-.39.01-.58.04-.37-1.63-1.64-2.89-3.23-3.28l-.34-.08-.22.28c-.46.59-.72 1.34-.72 2.11v.4H1.38c-.37 0-.68.29-.68.66.07 3.51 2.22 6.69 5.48 8.08 1.25.53 2.6.81 3.96.81 4.75 0 9.17-2.82 10.97-7.05.51-.15.93-.41 1.27-.77.16-.18.06-.47-.16-.6-.16-.09-.34-.17-.54-.24z" fill="#2496ED"/>
      </svg>
    ),
    color: '#2496ED'
  }
};

// --- Memoized Icon Component ---
export const SkillIcon = memo(({ type }: SkillIconProps) => {
  const IconComponent = iconComponents[type]?.component;
  return IconComponent ? <IconComponent /> : null;
});
SkillIcon.displayName = 'SkillIcon';

// --- Default Configuration for Web & Engineering Skills ---
export const DEFAULT_SKILLS_CONFIG: SkillConfig[] = [
  // Inner Orbit (Radius 95px)
  { 
    id: 'python',
    orbitRadius: 95, 
    size: 42, 
    speed: 1.1, 
    iconType: 'python', 
    phaseShift: 0, 
    glowColor: 'cyan',
    label: 'Python'
  },
  { 
    id: 'pytorch',
    orbitRadius: 95, 
    size: 42, 
    speed: 1.1, 
    iconType: 'pytorch', 
    phaseShift: (2 * Math.PI) / 3, 
    glowColor: 'purple',
    label: 'PyTorch'
  },
  { 
    id: 'opencv',
    orbitRadius: 95, 
    size: 42, 
    speed: 1.1, 
    iconType: 'opencv', 
    phaseShift: (4 * Math.PI) / 3, 
    glowColor: 'cyan',
    label: 'OpenCV'
  },
  // Outer Orbit (Radius 175px)
  { 
    id: 'qgis',
    orbitRadius: 175, 
    size: 46, 
    speed: -0.65, 
    iconType: 'qgis', 
    phaseShift: 0, 
    glowColor: 'emerald',
    label: 'QGIS / Spatial'
  },
  { 
    id: 'aws',
    orbitRadius: 175, 
    size: 46, 
    speed: -0.65, 
    iconType: 'aws', 
    phaseShift: (Math.PI) / 2, 
    glowColor: 'amber',
    label: 'AWS Cloud'
  },
  { 
    id: 'react',
    orbitRadius: 175, 
    size: 48, 
    speed: -0.65, 
    iconType: 'react', 
    phaseShift: Math.PI, 
    glowColor: 'cyan',
    label: 'React'
  },
  { 
    id: 'tailwind',
    orbitRadius: 175, 
    size: 44, 
    speed: -0.65, 
    iconType: 'tailwind', 
    phaseShift: (3 * Math.PI) / 2, 
    glowColor: 'purple',
    label: 'Tailwind CSS'
  },
];

// --- Memoized Orbiting Skill Component ---
const OrbitingSkill = memo(({ config, angle }: OrbitingSkillProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { orbitRadius, size, iconType, label } = config;

  const x = Math.cos(angle) * orbitRadius;
  const y = Math.sin(angle) * orbitRadius;

  return (
    <div
      className="absolute top-1/2 left-1/2 transition-all duration-300 ease-out pointer-events-auto"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
        zIndex: isHovered ? 30 : 15,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
          relative w-full h-full p-2.5 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md
          rounded-2xl border border-zinc-200/80 dark:border-zinc-800 flex items-center justify-center
          transition-all duration-300 cursor-pointer shadow-md
          ${isHovered ? 'scale-125 shadow-xl border-zinc-400' : 'hover:scale-105 hover:border-zinc-300'}
        `}
        style={{
          boxShadow: isHovered
            ? `0 0 25px ${iconComponents[iconType]?.color || '#18181b'}40, 0 10px 25px rgba(0,0,0,0.15)`
            : undefined
        }}
      >
        <SkillIcon type={iconType} />
        {isHovered && (
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-zinc-900/95 text-white dark:bg-white dark:text-zinc-900 backdrop-blur-md rounded-md text-[11px] font-mono tracking-tight font-medium whitespace-nowrap shadow-lg z-40 pointer-events-none">
            {label}
          </div>
        )}
      </div>
    </div>
  );
});
OrbitingSkill.displayName = 'OrbitingSkill';

const GlowingOrbitPath = memo(({ radius, glowColor = 'zinc' }: GlowingOrbitPathProps) => {
  const glowColors: Record<GlowColor, { primary: string; secondary: string; border: string }> = {
    cyan: {
      primary: 'rgba(6, 182, 212, 0.3)',
      secondary: 'rgba(6, 182, 212, 0.12)',
      border: 'rgba(6, 182, 212, 0.25)'
    },
    purple: {
      primary: 'rgba(147, 51, 234, 0.3)',
      secondary: 'rgba(147, 51, 234, 0.12)',
      border: 'rgba(147, 51, 234, 0.25)'
    },
    emerald: {
      primary: 'rgba(16, 185, 129, 0.3)',
      secondary: 'rgba(16, 185, 129, 0.12)',
      border: 'rgba(16, 185, 129, 0.25)'
    },
    amber: {
      primary: 'rgba(245, 158, 11, 0.3)',
      secondary: 'rgba(245, 158, 11, 0.12)',
      border: 'rgba(245, 158, 11, 0.25)'
    },
    zinc: {
      primary: 'rgba(113, 113, 122, 0.25)',
      secondary: 'rgba(113, 113, 122, 0.08)',
      border: 'rgba(228, 228, 231, 0.8)'
    }
  };

  const colors = glowColors[glowColor] || glowColors.zinc;

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
      style={{
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
      }}
    >
      {/* Subtle depth ring */}
      <div
        className="absolute inset-0 rounded-full border border-dashed border-zinc-200 dark:border-zinc-800"
        style={{
          boxShadow: `0 0 20px ${colors.secondary}`,
        }}
      />
    </div>
  );
});
GlowingOrbitPath.displayName = 'GlowingOrbitPath';

export interface OrbitingSkillsProps {
  skills?: SkillConfig[];
  centerLabel?: string;
  className?: string;
}

// --- Main App Component ---
export function OrbitingSkills({ 
  skills = DEFAULT_SKILLS_CONFIG, 
  centerLabel = "AI / CV",
  className = "" 
}: OrbitingSkillsProps) {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      setTime(prevTime => prevTime + deltaTime);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  // Derive unique orbit radii
  const uniqueRadii = Array.from(new Set(skills.map(s => s.orbitRadius)));

  return (
    <div className={`relative w-full flex items-center justify-center select-none ${className}`}>
      <div 
        className="relative w-[340px] h-[340px] sm:w-[400px] sm:h-[400px] md:w-[420px] md:h-[420px] flex items-center justify-center scale-[0.75] sm:scale-100 origin-center transition-transform duration-300"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Central Core with sleek modern glass aesthetic */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-zinc-900 to-black text-white rounded-3xl flex flex-col items-center justify-center z-20 relative shadow-2xl border border-zinc-800">
          <div className="absolute inset-0 rounded-3xl bg-zinc-800/40 blur-lg pointer-events-none" />
          <div className="relative z-10 flex flex-col items-center justify-center gap-1">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="text-white"
            >
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
            <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-300 font-bold">
              {centerLabel}
            </span>
          </div>
        </div>

        {/* Render glowing orbit rings */}
        {uniqueRadii.map((rad) => (
          <GlowingOrbitPath
            key={`orbit-path-${rad}`}
            radius={rad}
            glowColor="zinc"
          />
        ))}

        {/* Render orbiting skill icons */}
        {skills.map((config) => {
          const angle = time * config.speed + (config.phaseShift || 0);
          return (
            <OrbitingSkill
              key={config.id}
              config={config}
              angle={angle}
            />
          );
        })}
      </div>
    </div>
  );
}

export default OrbitingSkills;
