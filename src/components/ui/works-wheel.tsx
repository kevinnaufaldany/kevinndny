"use client";

import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface WorksWheelItem {
  /** Project name. Shown beside the front card and in the index. */
  title: string;
  /** Cover art. Any src an <img> takes. */
  image: string;
  /** Where the card links to. Omit for a wheel that only browses. */
  href?: string;
  /** Optional category or tag (e.g. 'Real Project', 'Exploration') */
  category?: string;
  /** Optional summary of the project */
  summary?: string;
  /** Optional list of technical tags */
  tags?: string[];
}

export interface WorksWheelProps extends Omit<
  React.ComponentPropsWithoutRef<"div">,
  "children"
> {
  items: WorksWheelItem[];
  /** Sits in the middle of the ring. @default "Projects '26" */
  label?: string;
  /** Label on the card's action affordance. @default "View Project" */
  action?: string;
  /** Optional ref to outer pinned scroll track for page-scroll driven progression */
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  className?: string;
}

/* Geometry constants tuned so the revolving drum rotates in a clean vertical cylinder */
const CARD_RATIO = 1.45; // card width / height
const STEP = 38; // degrees between cards on the drum
const DRUM = 2.15; // drum radius in card heights
const LENS = 2.65; // perspective distance
const RING_R = 1.05; // ring radius

/** Sensitivity for standalone wheel notches and drag pixels */
const WHEEL_UNITS = 600;
const DRAG_UNITS = 360;
/** Fraction of remaining distance closed each frame */
const EASE = 0.12;

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

type Stage = { w: number; h: number };

function place(
  ringDeg: number,
  drumDeg: number,
  ringR: number,
  drumR: number,
  m: number,
) {
  // Drum rotates strictly on center vertical axis, preventing text collisions
  return (
    `translateX(0px)` +
    ` rotateZ(${(1 - m) * ringDeg}deg) translateY(${-(1 - m) * ringR}px)` +
    ` rotateX(${m * drumDeg}deg) translateZ(${m * drumR}px)`
  );
}

export function WorksWheel({
  items,
  label = "Projects '26",
  action = "View Project",
  scrollContainerRef,
  className,
  ...props
}: WorksWheelProps) {
  const stageRef = React.useRef<HTMLDivElement>(null);
  const wheelRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLElement | null)[]>([]);
  const labelRef = React.useRef<HTMLDivElement>(null);

  // Position refs for 60fps RAF loop
  const turn = React.useRef(0);
  const target = React.useRef(0);
  const [active, setActive] = React.useState(0);
  const [isRing, setIsRing] = React.useState(true);
  const [stage, setStage] = React.useState<Stage>({ w: 0, h: 0 });
  const [scrollProgress, setScrollProgress] = React.useState(0);

  const count = items.length;
  const last = Math.max(count - 1, 0);

  // Router navigation helper
  let navigate: ((to: string) => void) | null = null;
  try {
    navigate = useNavigate();
  } catch {
    navigate = null;
  }

  // Synchronize target and active bounds when items change
  React.useEffect(() => {
    target.current = clamp(target.current, 0, count);
    turn.current = clamp(turn.current, 0, count);
    setActive((prev) => clamp(prev, 0, last));
  }, [count, last]);

  // Reduced motion support
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setReduced(query.matches);
    read();
    query.addEventListener("change", read);
    return () => query.removeEventListener("change", read);
  }, []);

  // Stage size observer
  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const read = () => setStage({ w: el.clientWidth, h: el.clientHeight });
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Responsive stage metrics: ensures cards never overlap side panels on desktop or clip on mobile
  const metrics = React.useMemo(() => {
    const { w, h } = stage;
    const isMobile = w < 640;
    const isTablet = w >= 640 && w < 1024;
    const isSmallDesktop = w >= 1024 && w < 1280;
    const isLargeDesktop = w >= 1280;

    let cardW = 320;
    if (isMobile) {
      // Mobile: center card fits within screen width with ample margin
      cardW = clamp(w * 0.78, 230, 290);
    } else if (isTablet) {
      // Tablet: comfortable proportions in vertical stack
      cardW = clamp(w * 0.52, 280, 360);
    } else if (isSmallDesktop) {
      // Small Desktop (1024-1279px): Bounded to 300px so Left (w-72) and Right (w-52) NEVER collide
      const maxWByHeight = (h || 600) * 0.40 * CARD_RATIO;
      cardW = clamp(Math.min(maxWByHeight, 300), 260, 300);
    } else {
      // Large Desktop (>= 1280px): Generous presentation bounded within center 28% of stage
      const maxWByHeight = (h || 600) * 0.44 * CARD_RATIO;
      const maxWByWidth = w * 0.26;
      cardW = clamp(Math.min(maxWByHeight, maxWByWidth), 320, 380);
    }

    const cardH = cardW / CARD_RATIO;
    const drumR = cardH * DRUM;
    const ringR = cardH * RING_R;
    const ringScale = count
      ? clamp((((2 * Math.PI * ringR) / count) * 0.82) / (cardW || 1), 0.16, 1)
      : 1;

    return {
      cardW,
      cardH,
      ringR,
      ringScale,
      drumR,
      depth: cardH * LENS,
      title: Math.max(cardH * 0.086, 20),
      isMobile,
      isTablet,
      isSmallDesktop,
      isLargeDesktop,
    };
  }, [stage, count]);

  // Jump to specific project item (or Ring Overview: 0)
  const scrollToItem = React.useCallback(
    (index: number) => {
      const container = scrollContainerRef?.current;
      if (!container) {
        target.current = clamp(index, 0, count);
        return;
      }

      const rect = container.getBoundingClientRect();
      const scrollDistance = container.offsetHeight - window.innerHeight;
      if (scrollDistance <= 0) return;

      // With virtual steps (count + 0.6), index 0 = 0, index 1..count map to center points
      const targetProgress = count > 0 ? (index === 0 ? 0 : clamp(index / (count + 0.6), 0, 1)) : 0;
      const targetScrollY = window.scrollY + rect.top + targetProgress * scrollDistance;

      const lenis = (window as any).__lenis;
      if (lenis && typeof lenis.scrollTo === "function") {
        lenis.scrollTo(targetScrollY, { duration: 0.8 });
      } else {
        window.scrollTo({ top: targetScrollY, behavior: "smooth" });
      }
    },
    [scrollContainerRef, count],
  );

  // Scroll-driven progression tied to user's page scroll
  React.useEffect(() => {
    const container = scrollContainerRef?.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const scrollDistance = container.offsetHeight - window.innerHeight;
      if (scrollDistance <= 0) return;

      // Scrolled distance within the pinned container
      const scrolled = -rect.top;
      const progress = clamp(scrolled / scrollDistance, 0, 1);
      setScrollProgress(progress);

      // Mapping with virtual steps (count + 0.6) guarantees ~60vh dwell time on the last item
      const virtualTarget = progress * (count + 0.6);
      const nextTarget = clamp(virtualTarget, 0, count);
      target.current = nextTarget;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    const lenis = (window as any).__lenis;
    if (lenis && typeof lenis.on === "function") {
      lenis.on("scroll", handleScroll);
    }

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (lenis && typeof lenis.off === "function") {
        lenis.off("scroll", handleScroll);
      }
    };
  }, [scrollContainerRef, count]);

  // Animation frame loop: updates 3D transforms directly on DOM nodes at 60fps
  React.useEffect(() => {
    if (!stage.h) return;
    let frame = 0;
    const { ringR, ringScale, drumR } = metrics;

    const draw = () => {
      frame = requestAnimationFrame(draw);
      const gap = target.current - turn.current;
      if (Math.abs(gap) < 0.0004) turn.current = target.current;
      else turn.current += gap * (reduced ? 1 : EASE);

      const t = turn.current;
      const m = clamp(t, 0, 1);
      const pos = Math.max(0, t - 1);

      if (wheelRef.current) {
        wheelRef.current.style.transform = `translateZ(${-m * drumR}px)`;
      }

      for (let i = 0; i < count; i++) {
        const d = i - pos;
        const drumDeg = d * STEP;
        const card = cardRefs.current[i];
        if (card) {
          card.style.transform = place(
            d * (360 / Math.max(count, 1)),
            drumDeg,
            ringR,
            drumR,
            m,
          );

          if (m > 0.4) {
            // Drum mode: only the active front card is 100% bright; neighbors provide subtle 3D depth
            const absD = Math.abs(d);
            if (absD < 0.45) {
              card.style.opacity = "1";
              card.style.filter = "none";
              card.style.pointerEvents = "auto";
              card.style.zIndex = "100";
            } else if (absD < 1.35) {
              // Neighbor card: softly dimmed so it never competes with side text
              const neighborOpacity = clamp(0.65 - (absD - 0.45) * 0.35, 0.3, 0.65);
              card.style.opacity = String(neighborOpacity);
              card.style.filter = "brightness(0.85)";
              card.style.pointerEvents = "auto";
              card.style.zIndex = String(Math.round(80 - absD * 10));
            } else {
              // Distant cards: hidden
              card.style.opacity = "0";
              card.style.filter = "none";
              card.style.pointerEvents = "none";
              card.style.zIndex = "0";
            }
          } else {
            // Ring mode: all cards visible in ring
            card.style.opacity = "1";
            card.style.filter = "none";
            card.style.pointerEvents = "auto";
            card.style.zIndex = String(Math.round(100 - Math.abs(d)));
          }
        }
        const face = card?.firstElementChild as HTMLElement | null;
        if (face) face.style.transform = `scale(${lerp(ringScale, 1, m)})`;
      }

      if (labelRef.current) labelRef.current.style.opacity = String(1 - m);

      const near = clamp(Math.round(pos), 0, last);
      setActive((prev) => (prev === near ? prev : near));
      const currentlyRing = t < 0.35;
      setIsRing((prev) => (prev === currentlyRing ? prev : currentlyRing));
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [metrics, stage.h, count, last, reduced]);

  // Standalone fallback wheel listener (ONLY active when NOT driven by page scroll container)
  React.useEffect(() => {
    if (scrollContainerRef) return;
    const el = stageRef.current;
    if (!el) return;

    const onWheel = (event: WheelEvent) => {
      const delta = event.deltaY;
      if (Math.abs(delta) < 0.2) return;
      event.preventDefault();
      target.current = clamp(target.current + delta / WHEEL_UNITS, 0, count);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [scrollContainerRef, count]);

  const drag = React.useRef<number | null>(null);
  const dragDistance = React.useRef<number>(0);

  const activeItem = items[active];

  if (count === 0) {
    return (
      <div className="size-full flex items-center justify-center text-center p-8">
        <p className="text-sm font-mono text-zinc-400 uppercase tracking-wider">
          No projects found in this category
        </p>
      </div>
    );
  }

  return (
    <div
      aria-label={label}
      className={cn(
        "relative size-full overflow-hidden select-none",
        className,
      )}
      {...props}
    >
      {/* 3D Stage Container: touchAction pan-y guarantees 100% natural mobile scrolling without trapping */}
      <div
        ref={stageRef}
        tabIndex={0}
        role="region"
        aria-label={label}
        className="absolute inset-0 cursor-grab outline-none active:cursor-grabbing"
        style={{ perspective: `${metrics.depth}px`, touchAction: "pan-y" }}
        onPointerDown={(event) => {
          drag.current = event.clientY;
          dragDistance.current = 0;
          // Only capture pointer for mouse drag in standalone mode; never capture touch!
          if (event.pointerType === "mouse" && !scrollContainerRef) {
            event.currentTarget.setPointerCapture(event.pointerId);
          }
        }}
        onPointerMove={(event) => {
          if (drag.current === null) return;
          const delta = drag.current - event.clientY;
          dragDistance.current += Math.abs(delta);
          if (!scrollContainerRef) {
            target.current = clamp(target.current + delta / DRAG_UNITS, 0, count);
          } else if (event.pointerType === "mouse") {
            // Mouse drag on desktop scrolls the page naturally
            const lenis = (window as any).__lenis;
            if (lenis && typeof lenis.scrollTo === "function") {
              lenis.scrollTo(window.scrollY + delta * 1.5, { immediate: true });
            } else {
              window.scrollBy({ top: delta * 1.5, behavior: "auto" });
            }
          }
          drag.current = event.clientY;
        }}
        onPointerUp={() => {
          drag.current = null;
          if (!scrollContainerRef) {
            target.current = target.current > 0.5 ? Math.round(target.current) : 0;
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowRight") {
            scrollToItem(clamp(active + 2, 0, count));
            event.preventDefault();
          } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
            scrollToItem(clamp(active, 0, count));
            event.preventDefault();
          }
        }}
      >
        {/* 3D Revolving Drum */}
        <div
          ref={wheelRef}
          className="absolute top-1/2 left-1/2 [transform-style:preserve-3d]"
        >
          {items.map((item, i) => {
            const isCurrent = i === active;
            return (
              <div
                key={item.title}
                id={`works-wheel-${i}`}
                role="button"
                tabIndex={0}
                aria-label={`View ${item.title}`}
                ref={(node: HTMLElement | null) => {
                  cardRefs.current[i] = node;
                }}
                onClick={(e) => {
                  // Suppress click if user was dragging
                  if (dragDistance.current > 8) {
                    e.preventDefault();
                    return;
                  }
                  if (isRing) {
                    // In ring mode, click unfolds drum to this item
                    scrollToItem(i + 1);
                  } else if (isCurrent) {
                    // If already active in drum mode, navigate directly to project!
                    if (item.href && navigate) {
                      navigate(item.href);
                    }
                  } else {
                    // If not active, bring this card to center
                    scrollToItem(i + 1);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    if (item.href && navigate) {
                      navigate(item.href);
                    }
                  }
                }}
                className="group absolute [backface-visibility:hidden] block transition-shadow cursor-pointer select-none"
                style={{
                  width: metrics.cardW,
                  height: metrics.cardH,
                  marginLeft: -metrics.cardW / 2,
                  marginTop: -metrics.cardH / 2,
                }}
              >
                <div
                  className={cn(
                    "relative block size-full overflow-hidden rounded-2xl transition-all duration-300",
                    isCurrent && !isRing
                      ? "ring-2 ring-emerald-500 shadow-2xl shadow-emerald-500/20 scale-[1.02]"
                      : "border border-zinc-200/90 shadow-md opacity-85 hover:opacity-100 hover:border-zinc-300"
                  )}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    draggable={false}
                    className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Gradient overlay for contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                  {/* Active Card Category & Counter Badge */}
                  {isCurrent && !isRing && (
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 text-[10px] font-mono tracking-wider uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{String(i + 1).padStart(2, "0")} · {item.category || "Project"}</span>
                    </div>
                  )}

                  {/* Bottom Info on Active Card: Prominent, high-contrast, always visible */}
                  {isCurrent && !isRing && (
                    <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2 z-10">
                      <div className="min-w-0 flex-1">
                        <span className="block text-white font-bold text-xs sm:text-sm truncate drop-shadow-sm">
                          {item.title}
                        </span>
                      </div>

                      {/* Prominent ALWAYS-VISIBLE "View Project" Pill on the active card */}
                      {action && item.href && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (item.href && navigate) {
                              navigate(item.href);
                            }
                          }}
                          className="shrink-0 bg-white text-brand-dark hover:bg-emerald-400 hover:text-black active:scale-95 transition-all flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold shadow-lg border border-brand-border/40 cursor-pointer"
                          aria-label={`View case study for ${item.title}`}
                        >
                          <span>{action}</span>
                          <ArrowUpRight className="size-3.5 text-emerald-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </button>
                      )}
                    </div>
                  )}

                  {/* Hover Affordance in Ring Overview */}
                  {isRing && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-xs text-white text-center">
                      <span className="text-[10px] font-mono uppercase text-emerald-400 font-semibold mb-0.5">
                        {item.category || "Project"}
                      </span>
                      <span className="text-xs font-bold truncate max-w-[90%] mb-1.5">
                        {item.title}
                      </span>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-brand-dark text-[11px] font-semibold shadow-md">
                        <span>Explore</span>
                        <ArrowUpRight className="size-3 text-emerald-600" />
                      </span>
                    </div>
                  )}

                  {/* Hover Affordance for Inactive Cards in Drum Mode */}
                  {!isCurrent && !isRing && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/35 backdrop-blur-[1px]">
                      <span className="bg-white/95 text-brand-dark px-3 py-1 rounded-full text-xs font-semibold shadow-md flex items-center gap-1">
                        Select Project
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ring Center Title (Shown in Ring Overview mode) */}
      <div
        ref={labelRef}
        className="pointer-events-none absolute inset-0 grid place-items-center tracking-tight font-black text-zinc-200 uppercase text-center select-none"
        style={{ fontSize: metrics.title * 1.3 }}
      >
        <div className="space-y-1">
          <span className="block text-2xl sm:text-3xl font-black text-brand-dark tracking-tight">SELECTED ARCHIVES</span>
          <span className="text-xs font-mono tracking-widest text-zinc-400 font-semibold block">
            Scroll down to explore projects
          </span>
        </div>
      </div>

      {/* LEFT COLUMN: Active Project Details & Prominent CTA (Desktop >= 1024px) */}
      <div
        className={cn(
          "absolute left-4 lg:left-8 xl:left-12 top-1/2 -translate-y-1/2 z-20 pointer-events-auto transition-all duration-300 hidden lg:block",
          "w-72 xl:w-96"
        )}
      >
        {isRing ? (
          <div className="space-y-3 p-5 rounded-2xl bg-white/80 backdrop-blur-md border border-zinc-200/70 shadow-xs">
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-700 font-semibold px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/70">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Featured Works Archive
            </span>
            <h3 className="text-xl xl:text-2xl font-black text-brand-dark tracking-tight uppercase leading-tight">
              Selected Works & Case Studies
            </h3>
            <p className="text-xs xl:text-sm text-brand-secondary leading-relaxed">
              Explore real-world engineering solutions in Computer Vision, Machine Learning, and Spatial GIS.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => scrollToItem(1)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-dark text-white text-xs font-semibold uppercase tracking-wider hover:bg-black transition-colors cursor-pointer group"
              >
                <span>Start Exploring</span>
                <span className="group-hover:translate-y-0.5 transition-transform text-emerald-400">↓</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3.5 p-5 rounded-2xl bg-white/85 backdrop-blur-md border border-zinc-200/80 shadow-sm transition-all duration-200">
            {/* Project Index & Category Pill */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-semibold flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Project [{String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}]
              </span>
              {activeItem?.category && (
                <span className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200">
                  {activeItem?.category}
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="text-lg xl:text-2xl font-black text-brand-dark tracking-tight uppercase leading-tight line-clamp-2">
              {activeItem?.title}
            </h3>

            {/* Summary */}
            {activeItem?.summary && (
              <p className="text-xs xl:text-sm text-brand-secondary leading-relaxed line-clamp-3">
                {activeItem?.summary}
              </p>
            )}

            {/* Tags */}
            {activeItem?.tags && activeItem?.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {activeItem?.tags?.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600 border border-zinc-200/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Prominent VIEW PROJECT Call-to-Action Button */}
            {activeItem?.href && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    if (activeItem?.href && navigate) {
                      navigate(activeItem.href);
                    }
                  }}
                  className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-brand-dark text-white hover:bg-black font-semibold text-xs tracking-wider uppercase transition-all duration-200 shadow-md hover:shadow-xl hover:gap-3.5 group cursor-pointer"
                >
                  <span>View Project Case Study</span>
                  <ArrowUpRight className="size-3.5 text-emerald-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* RIGHT COLUMN: Quick Navigation Index (Desktop >= 1024px) */}
      <div
        className={cn(
          "absolute right-4 lg:right-8 xl:right-12 top-1/2 -translate-y-1/2 z-20 pointer-events-auto transition-all duration-300 hidden lg:block",
          "w-52 xl:w-72"
        )}
      >
        <div className="text-right p-3.5 xl:p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-zinc-200/70 shadow-xs">
          <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-2 border-b border-zinc-200/80 pb-1.5 flex items-center justify-between">
            <span className="text-emerald-700 font-semibold">{String(count).padStart(2, "0")} Archive Items</span>
            <span>Jump to</span>
          </div>

          <ol className="space-y-1">
            <li>
              <button
                type="button"
                onClick={() => scrollToItem(0)}
                className={cn(
                  "w-full text-right py-1 px-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 flex items-center justify-end gap-2 group cursor-pointer",
                  isRing
                    ? "bg-zinc-100 text-brand-dark font-bold border-r-2 border-emerald-500"
                    : "text-zinc-400 hover:text-brand-dark hover:bg-zinc-50"
                )}
              >
                <span>00 · Ring Overview</span>
                {isRing && <span className="size-1.5 rounded-full bg-emerald-500 shrink-0" />}
              </button>
            </li>
            {items.map((item, i) => {
              const isSelected = !isRing && i === active;
              return (
                <li key={item.title}>
                  <button
                    type="button"
                    onClick={() => scrollToItem(i + 1)}
                    className={cn(
                      "w-full text-right py-1 px-2 rounded-lg text-xs transition-all duration-200 flex items-center justify-end gap-2 group cursor-pointer truncate",
                      isSelected
                        ? "bg-zinc-100 text-brand-dark font-bold border-r-2 border-emerald-500"
                        : "text-zinc-400 hover:text-brand-dark hover:bg-zinc-50"
                    )}
                  >
                    <span className="truncate max-w-[200px]">
                      <span className="font-mono text-[11px] mr-1.5 text-zinc-400 group-hover:text-brand-dark">
                        {String(i + 1).padStart(2, "0")} ·
                      </span>
                      {item.title}
                    </span>
                    {isSelected && (
                      <span className="size-1.5 rounded-full bg-emerald-500 shrink-0" />
                    )}
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      {/* MOBILE & TABLET: Active Project Floating Dock Bar (< 1024px) */}
      {/* Positioned with right-20 clearance so it NEVER collides with BackToTop button (fixed bottom-6 right-6) */}
      <div className="absolute left-4 right-20 sm:left-8 sm:right-24 bottom-3 sm:bottom-4 z-20 pointer-events-auto block lg:hidden">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-brand-border/90 p-3 shadow-lg max-w-md">
          {isRing ? (
            <div className="flex items-center justify-between gap-2.5">
              <div className="min-w-0">
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-600 font-semibold block">
                  Ring Overview
                </span>
                <p className="text-xs font-bold text-brand-dark truncate">
                  Scroll or tap card to explore
                </p>
              </div>
              <button
                type="button"
                onClick={() => scrollToItem(1)}
                className="shrink-0 px-3.5 py-1.5 rounded-full bg-brand-dark text-white font-medium text-xs flex items-center gap-1 cursor-pointer"
              >
                <span>Start</span>
                <span>↓</span>
              </button>
            </div>
          ) : (
            <div>
              {/* Category & Project Counter Row */}
              <div className="flex items-center justify-between gap-2 text-[10px] font-mono uppercase text-zinc-500 mb-1">
                <span className="flex items-center gap-1.5 text-emerald-600 font-semibold truncate">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span>Project {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}</span>
                </span>
                {activeItem?.category && (
                  <span className="px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200 shrink-0">
                    {activeItem?.category}
                  </span>
                )}
              </div>

              {/* Title & View Button in single row */}
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-xs sm:text-sm font-bold text-brand-dark tracking-tight truncate flex-1">
                  {activeItem?.title}
                </h3>

                {activeItem?.href && (
                  <button
                    type="button"
                    onClick={() => {
                      if (activeItem?.href && navigate) {
                        navigate(activeItem.href);
                      }
                    }}
                    className="shrink-0 flex items-center gap-1 py-1.5 px-3 rounded-full bg-brand-dark text-white font-semibold text-[11px] tracking-wider uppercase shadow-xs active:scale-95 transition-transform cursor-pointer"
                  >
                    <span>View</span>
                    <ArrowUpRight className="size-3 text-emerald-400" />
                  </button>
                )}
              </div>

              {/* Quick thumb dots for switching */}
              <div className="flex items-center justify-center gap-1.5 mt-2 pt-1 border-t border-zinc-100">
                {items.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => scrollToItem(i + 1)}
                    className={cn(
                      "size-1.5 rounded-full transition-all duration-200 cursor-pointer",
                      !isRing && i === active
                        ? "w-4 bg-emerald-500"
                        : "bg-zinc-300 hover:bg-zinc-400"
                    )}
                    aria-label={`Go to project ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Scroll Progress & Status Bar (Desktop) */}
      <div className="absolute bottom-2 inset-x-0 z-20 pointer-events-none hidden lg:flex items-center justify-between px-8 xl:px-12 text-[10px] font-mono uppercase tracking-wider text-zinc-400">
        <span className="inline-flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Scroll down to explore projects
        </span>

        {/* Continuous Progress Bar */}
        <div className="w-36 xl:w-48 h-1 bg-zinc-200/80 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 transition-[width] duration-150 ease-out"
            style={{ width: `${Math.round(scrollProgress * 100)}%` }}
          />
        </div>

        <span>
          {isRing ? `00 / ${String(count).padStart(2, "0")}` : `${String(active + 1).padStart(2, "0")} / ${String(count).padStart(2, "0")}`}
        </span>
      </div>
    </div>
  );
}

export default WorksWheel;
