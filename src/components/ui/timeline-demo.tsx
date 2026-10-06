"use client";

import Timeline from "@/components/ui/timeline";

const settings = {
  textColor: "var(--color-foreground, #111111)",
  mutedTextColor: "var(--color-muted-foreground, #71717a)",
  activeColor: "#10b981", // Harmonized to user's #10b981 green token
  backgroundColor: "var(--color-background, #ffffff)",
  duration: 1.4,
};

export function TimelineDemo(props: Partial<typeof settings>) {
  const s = { ...settings, ...props };
  return (
    <main className="bg-background text-foreground">
      {/* Lead-in so the pinned timeline has somewhere to scroll in from. */}
      <section className="flex h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#10b981] font-semibold">
          Engineering Journey
        </p>
        <h1 className="max-w-[18ch] text-4xl font-bold leading-tight tracking-tight sm:text-6xl text-brand-dark">
          Career Trajectory & Milestones
        </h1>
        <p className="max-w-md text-sm leading-relaxed text-zinc-500">
          Scroll down — the section pins, the track slides sideways, and each
          milestone draws its stem and reveals its story.
        </p>
        <span className="mt-2 animate-bounce text-[#10b981]">&darr;</span>
      </section>

      {/* Realistic usage: authentic copy, branded accent, tuned reveal speed. */}
      <Timeline
        title="Engineering Journey"
        periodLabel="2023 — 2026"
        backgroundColor={s.backgroundColor}
        textColor={s.textColor}
        mutedTextColor={s.mutedTextColor}
        activeColor={s.activeColor}
        imageUrl="/assets/3x4-pro-no-bg.png"
        imageAlt="Kevin Naufal Dany"
        duration={s.duration}
      />

      <section className="flex h-screen items-center justify-center px-6 text-center text-sm text-zinc-500">
        From academic assistant to production-grade Computer Vision and edge AI systems.
      </section>
    </main>
  );
}

export default TimelineDemo;
