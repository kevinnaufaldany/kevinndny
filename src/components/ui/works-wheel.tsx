"use client";

import * as React from "react";
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
}

export interface WorksWheelProps extends Omit<
  React.ComponentPropsWithoutRef<"section">,
  "children"
> {
  items: WorksWheelItem[];
  /** Sits in the middle of the ring. @default "Works '26" */
  label?: string;
  /** Label on the card's hover affordance. Omit to drop it. @default "View" */
  action?: string;
}

/* Geometry constants. */
const CARD_H = 0.42; // front card height, relative to stage
const CARD_RATIO = 1.48; // card width / height
const STEP = 40; // degrees between cards on the drum
const DRUM = 2.22; // drum radius in card heights
const LENS = 2.7; // perspective distance
const RING_R = 1.14; // ring radius
const BOW = 1.82; // arc radius
const TITLE = 0.082; // title size scale
const INDEX = 0.038; // index list size scale
const CULL = 1.6; // distance threshold for rendering

const WHEEL_UNITS = 900;
const DRAG_UNITS = 420;
const SETTLE = 140;
const EASE = 0.12;

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

type Stage = { w: number; h: number };

const rad = (deg: number) => (deg * Math.PI) / 180;

const bowAt = (drumDeg: number, bow: number) =>
  -bow * (1 - Math.cos(rad(drumDeg)));

function place(
  ringDeg: number,
  drumDeg: number,
  ringR: number,
  drumR: number,
  bow: number,
  m: number,
) {
  return (
    `translateX(${m * bowAt(drumDeg, bow)}px)` +
    ` rotateZ(${(1 - m) * ringDeg}deg) translateY(${-(1 - m) * ringR}px)` +
    ` rotateX(${m * drumDeg}deg) translateZ(${m * drumR}px)`
  );
}

export function WorksWheel({
  items,
  label = "Works '26",
  action = "View Project",
  className,
  ...props
}: WorksWheelProps) {
  const stageRef = React.useRef<HTMLDivElement>(null);
  const wheelRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLElement | null)[]>([]);
  const labelRef = React.useRef<HTMLDivElement>(null);
  const titleRef = React.useRef<HTMLDivElement>(null);

  const turn = React.useRef(0);
  const target = React.useRef(0);
  const [active, setActive] = React.useState(0);
  const [stage, setStage] = React.useState<Stage>({ w: 0, h: 0 });

  const count = items.length;
  const last = Math.max(count - 1, 0);

  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setReduced(query.matches);
    read();
    query.addEventListener("change", read);
    return () => query.removeEventListener("change", read);
  }, []);

  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const read = () => setStage({ w: el.clientWidth, h: el.clientHeight });
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const metrics = React.useMemo(() => {
    const { w, h } = stage;
    // Responsive card width factor: wider on mobile for maximum legibility
    const maxWFactor = w < 640 ? 0.76 : w < 1024 ? 0.52 : 0.38;
    const cardW = Math.min(h * CARD_H * CARD_RATIO, w * maxWFactor || 300);
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
      bow: cardH * BOW,
      depth: cardH * LENS,
      title: Math.max(cardH * TITLE, 18),
      index: Math.max(cardH * INDEX, 12),
    };
  }, [stage, count]);

  // One pass per frame: ease toward the target, then write every transform
  React.useEffect(() => {
    if (!stage.h) return;
    let frame = 0;
    const { ringR, ringScale, drumR, bow } = metrics;

    const draw = () => {
      frame = requestAnimationFrame(draw);
      const gap = target.current - turn.current;
      if (Math.abs(gap) < 0.0005) turn.current = target.current;
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
            d * (360 / count),
            drumDeg,
            ringR,
            drumR,
            bow,
            m,
          );
          card.style.opacity = m > 0.5 && Math.abs(d) > CULL ? "0" : "1";
          card.style.zIndex = String(Math.round(100 - Math.abs(d) * 2));
        }
        const face = card?.firstElementChild as HTMLElement | null;
        if (face) face.style.transform = `scale(${lerp(ringScale, 1, m)})`;
      }

      if (labelRef.current) labelRef.current.style.opacity = String(1 - m);
      if (titleRef.current) titleRef.current.style.opacity = String(m);
      const near = clamp(Math.round(pos), 0, last);
      setActive((prev) => (prev === near ? prev : near));
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [metrics, stage.h, count, last, reduced]);

  const to = React.useCallback(
    (next: number) => {
      target.current = clamp(next, 0, last + 1);
    },
    [last],
  );

  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (event: WheelEvent) => {
      const next = target.current + event.deltaY / WHEEL_UNITS;
      if (next > 0 && next < last + 1) event.preventDefault();
      to(next);
      window.clearTimeout(settling.current);
      settling.current = window.setTimeout(
        () => to(Math.round(target.current)),
        SETTLE,
      );
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      window.clearTimeout(settling.current);
    };
  }, [to, last]);

  const drag = React.useRef<number | null>(null);
  const dragDistance = React.useRef<number>(0);
  const settling = React.useRef(0);

  return (
    <section
      aria-label={label}
      className={cn(
        "bg-white text-brand-dark relative h-full min-h-[28rem] sm:min-h-[34rem] w-full overflow-hidden select-none",
        className,
      )}
      {...props}
    >
      <div
        ref={stageRef}
        tabIndex={0}
        role="listbox"
        aria-label={label}
        aria-activedescendant={`works-wheel-${active}`}
        className="focus-visible:outline-brand-dark absolute inset-0 cursor-grab touch-pan-x outline-none focus-visible:outline-2 focus-visible:-outline-offset-4 active:cursor-grabbing"
        style={{ perspective: `${metrics.depth}px` }}
        onPointerDown={(event) => {
          drag.current = event.clientY;
          dragDistance.current = 0;
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (drag.current === null) return;
          const delta = drag.current - event.clientY;
          dragDistance.current += Math.abs(delta);
          to(target.current + delta / DRAG_UNITS);
          drag.current = event.clientY;
        }}
        onPointerUp={() => {
          drag.current = null;
          if (target.current > 1) to(Math.round(target.current));
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") to(Math.round(target.current) + 1);
          else if (event.key === "ArrowUp") to(Math.round(target.current) - 1);
          else return;
          event.preventDefault();
        }}
      >
        <div
          ref={wheelRef}
          className="absolute top-1/2 left-1/2 [transform-style:preserve-3d]"
        >
          {items.map((item, i) => {
            const Tag = (item.href ? "a" : "div") as "a";
            return (
              <React.Fragment key={item.title}>
                <Tag
                  id={`works-wheel-${i}`}
                  role="option"
                  aria-selected={i === active}
                  href={item.href}
                  onClick={(e) => {
                    // Suppress click if user was dragging the wheel
                    if (dragDistance.current > 8) {
                      e.preventDefault();
                    }
                  }}
                  ref={(node: HTMLElement | null) => {
                    cardRefs.current[i] = node;
                  }}
                  className="group absolute [backface-visibility:hidden] block transition-shadow"
                  style={{
                    width: metrics.cardW,
                    height: metrics.cardH,
                    marginLeft: -metrics.cardW / 2,
                    marginTop: -metrics.cardH / 2,
                  }}
                >
                  <span className="bg-zinc-100 shadow-md border border-brand-border/70 relative block size-full overflow-hidden rounded-xl group-hover:border-brand-primary/50 transition-colors">
                    <img
                      src={item.image}
                      alt={item.title}
                      draggable={false}
                      className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient overlay for contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 opacity-70 group-hover:opacity-85 transition-opacity" />

                    {/* Card metadata (category & title on card) */}
                    <div className="absolute left-3.5 bottom-3.5 right-3.5 text-white z-10">
                      {item.category && (
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md inline-block mb-1.5 border border-white/20">
                          {item.category}
                        </span>
                      )}
                      <p className="text-xs sm:text-sm font-bold truncate leading-snug drop-shadow-sm">
                        {item.title}
                      </p>
                    </div>

                    {/* Action button affordance */}
                    {action && item.href ? (
                      <span className="bg-white/95 text-brand-dark pointer-events-none absolute right-3 top-3 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.7rem] font-semibold opacity-0 backdrop-blur-md shadow-md border border-brand-border/50 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 translate-y-1">
                        <svg
                          viewBox="0 0 12 12"
                          className="size-2.5"
                          aria-hidden="true"
                        >
                          <path
                            d="M3 9 9 3M4 3h5v5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {action}
                      </span>
                    ) : null}
                  </span>
                </Tag>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Ring Center Title */}
      <div
        ref={labelRef}
        className="pointer-events-none absolute inset-0 grid place-items-center tracking-tight font-bold text-zinc-300 uppercase text-center select-none"
        style={{ fontSize: metrics.title }}
      >
        {label}
      </div>

      {/* Active Project Title (shown when drum opens) */}
      <div
        ref={titleRef}
        className="pointer-events-none absolute top-1/2 left-[5%] sm:left-[8%] -translate-y-1/2 tracking-tight opacity-0 max-w-[28%] hidden md:block"
        style={{ fontSize: metrics.title }}
      >
        <span className="text-[11px] font-mono uppercase tracking-widest text-brand-secondary block mb-1">
          Active Project [{String(active + 1).padStart(2, '0')}]
        </span>
        <h3 className="font-bold text-brand-dark leading-tight line-clamp-2">
          {items[active]?.title}
        </h3>
      </div>

      {/* Quick Navigation Index on Right */}
      <ol
        className="text-zinc-400 absolute top-[6%] right-[3%] text-right leading-[1.8] hidden sm:block z-20 max-w-[200px]"
        style={{ fontSize: metrics.index }}
      >
        {items.map((item, i) => (
          <li key={item.title} className="truncate">
            <button
              type="button"
              onClick={() => to(i + 1)}
              className={cn(
                "focus-visible:outline-brand-dark cursor-pointer transition-colors outline-none focus-visible:outline-1 truncate block ml-auto hover:text-brand-dark text-[11px] sm:text-xs",
                i === active && "text-brand-dark font-bold underline decoration-brand-accent underline-offset-4",
              )}
            >
              {String(i + 1).padStart(2, '0')} · {item.title}
            </button>
          </li>
        ))}
      </ol>

      {/* Bottom Hint Indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none text-center">
        <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-1.5 bg-white/80 backdrop-blur-xs px-3 py-1 rounded-full border border-zinc-200/60 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Scroll / Drag to Rotate Wheel · Click Card to View
        </span>
      </div>
    </section>
  );
}

export default WorksWheel;
