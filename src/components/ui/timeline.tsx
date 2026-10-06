"use client";

import {
  type CSSProperties,
  useLayoutEffect,
  useRef,
  useSyncExternalStore,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const monthOrder = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
} as const;

export type Month = keyof typeof monthOrder;

export interface TimelineMilestone {
  id: string;
  year: string;
  month: Month;
  title: string;
  role?: string;
  content: string;
  tag?: string;
  isTop?: boolean;
}

export type TimelineProps = {
  id?: string;
  title?: string;
  periodLabel?: string;
  textColor?: string;
  mutedTextColor?: string;
  activeColor?: string;
  backgroundColor?: string;
  imageUrl?: string;
  imageAlt?: string;
  items?: TimelineMilestone[];
  topItems?: any[];
  bottomItems?: any[];
  duration?: number;
  scrollDuration?: number;
};

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQueryList = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQueryList.addEventListener("change", callback);
  return () => mediaQueryList.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.(REDUCED_MOTION_QUERY)?.matches ?? false;
}

function getServerReducedMotionSnapshot() {
  return false;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getServerReducedMotionSnapshot,
  );
}

export const defaultTimelineMilestones: TimelineMilestone[] = [
  {
    id: "2023-september",
    year: "2023",
    month: "September",
    title: "Practicum Assistant at ITERA",
    role: "Data Structures, OOP & CS Fundamentals",
    content: "Instructed laboratory practicums for undergraduate engineers in algorithms, data structures, and software engineering fundamentals.",
    tag: "Teaching & Algorithms",
    isTop: true,
  },
  {
    id: "2024-october",
    year: "2024",
    month: "October",
    title: "Geospatial GIS & AI Research",
    role: "Aerial Imagery & Deep Learning",
    content: "Integrated aerial multispectral orthomosaics with YOLO segmentation for agricultural boundary mapping and geospatial feature analysis.",
    tag: "Computer Vision & GIS",
    isTop: false,
  },
  {
    id: "2025-january",
    year: "2025",
    month: "January",
    title: "Head of Technopreneur Division",
    role: "HMIF ITERA Student Association",
    content: "Led technology division operations, delivering national hackathons, technical seminars, and collaborative public service digital platforms.",
    tag: "Leadership & Engineering",
    isTop: true,
  },
  {
    id: "2025-june",
    year: "2025",
    month: "June",
    title: "ICT Intern at PT. Timah Tbk",
    role: "Exploration & Mobile GIS Architecture",
    content: "Architected offline-first GPS survey mobile apps with embedded Mapbox synchronization and researched Cassiterite mineral AI instance models.",
    tag: "Mobile GIS & AI",
    isTop: false,
  },
  {
    id: "2026-march",
    year: "2026",
    month: "March",
    title: "AWS re/Start Cloud Graduate",
    role: "Enterprise Cloud & DevOps",
    content: "Mastered Linux enterprise servers, networking topologies, Python automation, and AWS cloud architecture in preparation for AWS Cloud Practitioner.",
    tag: "Cloud Architecture",
    isTop: true,
  },
  {
    id: "2026-august",
    year: "2026",
    month: "August",
    title: "Great Giant Foods CV Engineer",
    role: "MagangHub Kemnaker RI",
    content: "Deployed drone-based Computer Vision edge pipelines for automated plantation digitization and near real-time field analytics.",
    tag: "Production Edge AI",
    isTop: false,
  },
  {
    id: "2026-september",
    year: "2026",
    month: "September",
    title: "Edge AI Low-Latency Inference",
    role: "Embedded Vision Systems",
    content: "Optimized TensorRT and ONNX deep learning runtime pipelines for real-time edge processing on constrained edge devices.",
    tag: "Deep Learning & Optimization",
    isTop: true,
  },
];

export function Timeline({
  id = "experience",
  title = "Career Milestones",
  periodLabel = "2023 — Present",
  textColor = "#ffffff",
  mutedTextColor = "#a1a1aa",
  activeColor = "#10b981",
  backgroundColor = "#111111",
  imageUrl = "/assets/3x4-pro-no-bg.png",
  imageAlt = "Kevin Naufal Dany - Computer Vision Engineer",
  items,
}: TimelineProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const wholeSliderRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const sectionStyle: CSSProperties = {
    color: textColor,
    backgroundColor,
  };
  const activeStyle: CSSProperties = {
    backgroundColor: activeColor,
  };
  const mutedTextStyle: CSSProperties = {
    color: mutedTextColor,
  };

  const milestones = (items && items.length > 0 ? items : defaultTimelineMilestones).slice().sort((a, b) => {
    const yearDiff = Number(a.year) - Number(b.year);
    if (yearDiff !== 0) return yearDiff;
    return monthOrder[a.month] - monthOrder[b.month];
  });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const slider = wholeSliderRef.current;
    if (!section || !slider) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 640;
      const slidePercent = isMobile ? -80 : -64;
      const endLineWidth = isMobile ? "92%" : "98%";

      if (reducedMotion) {
        gsap.set(slider, { xPercent: 0 });
        gsap.set(".journey-line", { width: endLineWidth });
        milestones.forEach((item) => {
          gsap.set(`.jl-${item.id}`, { scaleY: 1 });
          gsap.set(`.jd-${item.id}`, { scale: 1 });
          gsap.set(`.card-${item.id}`, { opacity: 1, y: 0 });
        });
        return;
      }

      // Initial state
      gsap.set(".journey-line", { width: "0%" });
      milestones.forEach((item) => {
        gsap.set(`.jl-${item.id}`, {
          scaleY: 0,
          transformOrigin: item.isTop ? "bottom center" : "top center",
        });
        gsap.set(`.jd-${item.id}`, { scale: 0 });
        gsap.set(`.card-${item.id}`, {
          opacity: 0,
          y: item.isTop ? 20 : -20,
        });
      });

      // Master ScrollTrigger timeline synchronizing horizontal slide, rail and card unlocks
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
        },
        defaults: {
          ease: "none",
        },
      });

      // 1. Scrub horizontal track
      tl.fromTo(
        slider,
        { xPercent: 0 },
        { xPercent: slidePercent, ease: "none" },
        0
      );

      // 2. Scrub central glowing emerald rail
      tl.fromTo(
        ".journey-line",
        { width: "0%" },
        { width: endLineWidth, ease: "none" },
        0
      );

      // 3. Staggered reveal for each milestone as the rail reaches it
      milestones.forEach((item, index) => {
        const startTime = 0.04 + (index / milestones.length) * 0.78;
        const animDuration = 0.11;

        // Draw vertical connector stem
        tl.to(
          `.jl-${item.id}`,
          {
            scaleY: 1,
            duration: animDuration * 0.8,
            ease: "power2.out",
          },
          startTime
        );

        // Scale glowing milestone dot
        tl.to(
          `.jd-${item.id}`,
          {
            scale: 1,
            duration: animDuration * 0.7,
            ease: "back.out(2)",
          },
          startTime + 0.02
        );

        // Reveal card content
        tl.to(
          `.card-${item.id}`,
          {
            opacity: 1,
            y: 0,
            duration: animDuration,
            ease: "power2.out",
          },
          startTime + 0.03
        );
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, [reducedMotion, milestones]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative w-full border-t border-zinc-800 scroll-mt-0"
      style={{
        ...sectionStyle,
        height: "260vh",
      }}
    >
      {/* Sticky Full-Viewport Stage Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden select-none bg-[#111111]">
        {/* Top Header Row with Safe Clearance Under Fixed Navbar */}
        <div className="pt-20 sm:pt-24 pb-2 px-6 sm:px-12 max-w-7xl mx-auto w-full shrink-0 z-30 relative">
          {/* Subtle Watermark Backdrop (Positioned safely below fixed navbar) */}
          <div
            className="w-full flex justify-center items-center pointer-events-none select-none absolute top-12 sm:top-14 md:top-16 left-0 right-0 overflow-hidden opacity-20"
            aria-hidden="true"
          >
            <span className="text-6xl sm:text-8xl md:text-9xl font-black uppercase tracking-tight text-zinc-700/80 select-none leading-none block whitespace-nowrap">
              EXPERIENCE
            </span>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between border-b border-zinc-800/80 pb-3 gap-3">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#10b981] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                Career Trajectory
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white mt-1">
                /EXPERIENCE
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono px-3.5 py-1 rounded-full bg-zinc-800/80 text-zinc-300 border border-zinc-700/60 w-fit">
                {periodLabel} · 5+ years craft
              </span>
            </div>
          </div>
        </div>

        {/* Horizontal GSAP Timeline Slider Stage */}
        <div className="flex-1 min-h-0 w-full relative flex items-center overflow-hidden">
          <div
            ref={wholeSliderRef}
            className="flex h-[36vw] max-h-[580px] min-h-[420px] w-[260vw] items-center gap-[3vw] px-[4vw] max-[640px]:h-[74vh] max-[640px]:w-[680vw] max-[640px]:px-[6vw] max-[640px]:gap-[5vw]"
          >
            {/* Kevin's Authentic Portrait Card */}
            <div className="h-[360px] sm:h-[440px] md:h-[480px] w-[24vw] min-w-[260px] max-w-[340px] max-[640px]:h-[68vh] max-[640px]:w-[80vw] shrink-0 rounded-2xl overflow-hidden bg-gradient-to-b from-zinc-800/90 via-zinc-900 to-black border border-zinc-800 shadow-[0_0_35px_rgba(16,185,129,0.08)] flex flex-col items-center justify-between p-4 relative group">
              <div className="w-full flex items-center justify-between text-[11px] font-mono text-zinc-400 border-b border-zinc-800/80 pb-2">
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Active Engineer
                </span>
                <span>Lampung / Remote</span>
              </div>

              <div className="flex-1 w-full flex items-end justify-center overflow-hidden pt-2">
                <img
                  src={imageUrl}
                  alt={imageAlt}
                  draggable={false}
                  className="h-full w-auto max-w-full object-contain object-bottom drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
                />
              </div>

              <div className="w-full text-center pt-2.5 border-t border-zinc-800/80">
                <p className="text-xs sm:text-sm font-bold text-white tracking-tight">Kevin Naufal Dany</p>
                <p className="text-[10px] font-mono text-zinc-400">Computer Vision & AI Engineer</p>
              </div>
            </div>

            {/* Trajectory Intro Card */}
            <div className="h-[360px] sm:h-[440px] md:h-[480px] w-[18vw] min-w-[210px] max-w-[280px] max-[640px]:h-[68vh] max-[640px]:w-[70vw] shrink-0 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#10b981] block mb-1">
                  Trajectory
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
                  {title}
                </h3>
                <p className="text-xs text-zinc-400 mt-3 leading-relaxed" style={mutedTextStyle}>
                  From academic assistant to production-grade Computer Vision and edge AI systems.
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-800/80">
                <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-0.5">
                  Active Timeline
                </span>
                <span className="text-xs font-mono font-semibold text-emerald-400">
                  {periodLabel}
                </span>
              </div>
            </div>

            {/* Central Rail Area with Alternating Chronological Milestones */}
            <div className="relative h-full flex-1 flex items-center">
              {/* Central Glowing Emerald Line Rail */}
              <div className="w-full absolute left-0 top-1/2 -translate-y-1/2 flex items-center h-fit pointer-events-none z-10">
                <div
                  className="size-2.5 rounded-full shadow-[0_0_10px_#10b981]"
                  style={activeStyle}
                />
                <div
                  className="h-[2px] w-[0%] rounded-full journey-line shadow-[0_0_8px_rgba(16,185,129,0.7)]"
                  style={activeStyle}
                />
                <div
                  className="size-2.5 rounded-full shadow-[0_0_10px_#10b981]"
                  style={activeStyle}
                />
              </div>

              {/* Milestones Horizontal Columns */}
              <div className="flex h-full items-center gap-[2.5vw] max-[640px]:gap-[4vw] relative z-20">
                {milestones.map((item) => (
                  <div
                    key={item.id}
                    className="relative h-full w-[28vw] min-w-[300px] max-w-[400px] max-[640px]:w-[74vw] max-[640px]:min-w-[270px] shrink-0 flex flex-col justify-between py-2"
                  >
                    {/* Top Half Slot */}
                    <div className="h-1/2 flex flex-col justify-end pb-7 sm:pb-8 relative">
                      {item.isTop ? (
                        <>
                          {/* Vertical Connector Stem & Milestone Dot */}
                          <div className="absolute bottom-0 left-6 sm:left-8 w-fit flex flex-col items-center pointer-events-none z-20">
                            <div
                              className={`size-3 rounded-full jd-${item.id} shadow-[0_0_12px_#10b981] mb-[-1px]`}
                              style={activeStyle}
                            />
                            <div
                              className={`w-[2px] h-6 sm:h-8 origin-bottom jl-${item.id} shadow-[0_0_8px_rgba(16,185,129,0.6)]`}
                              style={activeStyle}
                            />
                          </div>

                          {/* Content Card */}
                          <div
                            className={`card-${item.id} rounded-2xl bg-zinc-900/90 border border-zinc-800 p-4 sm:p-5 shadow-lg backdrop-blur-sm hover:border-[#10b981]/40 transition-colors space-y-2`}
                          >
                            <div className="flex items-center justify-between text-[11px] font-mono">
                              <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                                <span className="size-1 rounded-full bg-[#10b981]" />
                                {item.year} · {item.month}
                              </span>
                              {item.tag && (
                                <span className="text-zinc-500 text-[10px] uppercase tracking-wider hidden sm:inline">
                                  {item.tag}
                                </span>
                              )}
                            </div>
                            <h4 className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug">
                              {item.title}
                            </h4>
                            <p
                              className="text-xs text-zinc-400 leading-relaxed line-clamp-3"
                              style={mutedTextStyle}
                            >
                              {item.content}
                            </p>
                          </div>
                        </>
                      ) : (
                        <div className="h-full" />
                      )}
                    </div>

                    {/* Rail Center Node */}
                    <div className="relative w-full flex items-center h-0 pointer-events-none">
                      <div className="absolute left-6 sm:left-8 -translate-x-[3px] size-2 rounded-full bg-[#10b981]/60" />
                    </div>

                    {/* Bottom Half Slot */}
                    <div className="h-1/2 flex flex-col justify-start pt-7 sm:pt-8 relative">
                      {!item.isTop ? (
                        <>
                          {/* Vertical Connector Stem & Milestone Dot */}
                          <div className="absolute top-0 left-6 sm:left-8 w-fit flex flex-col items-center pointer-events-none z-20">
                            <div
                              className={`w-[2px] h-6 sm:h-8 origin-top jl-${item.id} shadow-[0_0_8px_rgba(16,185,129,0.6)]`}
                              style={activeStyle}
                            />
                            <div
                              className={`size-3 rounded-full jd-${item.id} shadow-[0_0_12px_#10b981] mt-[-1px]`}
                              style={activeStyle}
                            />
                          </div>

                          {/* Content Card */}
                          <div
                            className={`card-${item.id} rounded-2xl bg-zinc-900/90 border border-zinc-800 p-4 sm:p-5 shadow-lg backdrop-blur-sm hover:border-[#10b981]/40 transition-colors space-y-2`}
                          >
                            <div className="flex items-center justify-between text-[11px] font-mono">
                              <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                                <span className="size-1 rounded-full bg-[#10b981]" />
                                {item.year} · {item.month}
                              </span>
                              {item.tag && (
                                <span className="text-zinc-500 text-[10px] uppercase tracking-wider hidden sm:inline">
                                  {item.tag}
                                </span>
                              )}
                            </div>
                            <h4 className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug">
                              {item.title}
                            </h4>
                            <p
                              className="text-xs text-zinc-400 leading-relaxed line-clamp-3"
                              style={mutedTextStyle}
                            >
                              {item.content}
                            </p>
                          </div>
                        </>
                      ) : (
                        <div className="h-full" />
                      )}
                    </div>
                  </div>
                ))}

                {/* Final End Marker Card */}
                <div className="h-[360px] sm:h-[440px] md:h-[480px] w-[18vw] min-w-[200px] max-w-[260px] max-[640px]:h-[68vh] max-[640px]:w-[65vw] shrink-0 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 flex flex-col items-center justify-center text-center">
                  <div className="size-10 rounded-full bg-[#10b981]/15 border border-[#10b981]/40 flex items-center justify-center mb-3">
                    <span className="size-2 rounded-full bg-[#10b981] animate-ping" />
                  </div>
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                    Present & Beyond
                  </span>
                  <p className="text-xs text-zinc-400 mt-2 max-w-[18ch]">
                    Continuously advancing production Computer Vision & Edge AI.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Timeline;
