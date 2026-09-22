# 🎬 Portfolio Motion & Design Specification (Reverse Engineered)
> **Source Reference:** *Personal Portfolio Website — Animations by Dymas Alfin 🌵 for Mikan Team on Dribbble*  
> **Source Files in Project:** 
> - HD Video: [portfolio_motion_reference_hd.mp4](file:///D:/Abckup_desktop/kevinndny.dev/references/motion/portfolio_motion_reference_hd.mp4)
> - SD Preview: [portfolio_motion_reference_sd.mp4](file:///D:/Abckup_desktop/kevinndny.dev/references/motion/portfolio_motion_reference_sd.mp4)
> - Extracted Keyframes: [keyframes/](file:///D:/Abckup_desktop/kevinndny.dev/references/motion/keyframes/)

---

## 1. Visual Aesthetics & Design System
* **Style:** Minimalism & Swiss Style combined with Editorial High-End Digital Portfolio.
* **Palette:**
  - Background (Light Mode / Default): `#FFFFFF` and crisp off-white `#F9F9FB`
  - High-Contrast Dark Accents: `#111111` / `#18181B`
  - Accent / Status: Emerald Green `#10B981` (for `Available for New Project` live pulse indicator)
  - Typography: Clean Neo-Grotesque Sans-Serif (Inter / Plus Jakarta Sans / General Sans) with high typographic contrast.
* **Typographic Signature:**
  - Hero Title: Double-style treatment: First word outlined/stroke only (`-webkit-text-stroke: 1.5px black; color: transparent;`), second word heavy solid black (`font-black tracking-tight`).
  - Section Watermarks: Huge, low-opacity (5-8% opacity) uppercase watermarks positioned behind section headers (`PORTFOLIO`, `SERVICE`, `EXPERIENCE`).

---

## 2. Section Breakdown & Interaction Spec

### A. Hero Section (Frame 01 - 05)
- **Top Navigation Bar:**
  - Left: Floating status badge pill `● Available for New Project` with glowing green dot.
  - Center: Nav anchors with counts: `Work [40]`, `Service [4]`, `Experience [9y+]`, `Contact`.
  - Right: `Let's Talk ↗` high-contrast dark pill button with subtle elevation shadow.
- **Centerpiece:**
  - Giant typography banner (e.g. `KEVIN NAUFAL DANY` or `KEVIN NDNY`).
  - Outlined first name + Solid black last name.
  - Grayscale cutout portrait anchored at the bottom-center, overlapping typography with depth z-indexing.
- **Hero Bottom Content:**
  - Bottom Left: Role subtitle (`UI/UX Designer` / `Full-Stack Developer`), mission tagline, and `Let's collaborate ↗` dark pill button.
  - Bottom Right: Vertically stacked social pills (`Dribbble`, `Instagram`, `LinkedIn`, `GitHub`, `Behance`).

### B. Selected Work / Projects Grid (Frame 06 - 08)
- **Header:**
  - Large background watermark: `PORTFOLIO`
  - Title: `/SELECTED WORK`
  - Filter pills: `All`, `Real Project`, `Exploration` (with active state pill transition).
  - Top-Right Action: `View All Work ↗`.
- **Project Cards (2-Column Grid):**
  - High-definition thumbnail with embedded badge on top-left (`REAL PROJECT` or `EXPLORATION`).
  - Project Title + Category tags (`Landing Page`, `Mobile App`, `Dashboard`, `Studio`).
- **Motion Interaction:**
  - Magnetic cursor: When hovering over card preview, a circular white button with black arrow `↗` tracks the mouse cursor dynamically.
  - Card image scales subtly (`scale: 1.03`) with smooth spring physics (`stiffness: 300, damping: 20`).

### C. Services Interactive Accordion (Frame 09 - 11)
- **Header:**
  - Watermark: `SERVICE`
  - Title: `/SERVICE`
- **Accordion List Items:**
  - Standard state: Clean horizontal row with title (`UIUX DESIGN`, `WEB DESIGN & DEV`, `BRANDING`, `MOTIONS & ANIMATIONS`) and arrow `↗`.
  - **Expanded / Active State (Frame 11):**
    - Smoothly transitions into an inverted dark card (`#1E1E1E`).
    - Right arrow `↗` morphs into a close icon `✕`.
    - Content reveals: Service description + a 3D tilted (-8deg) floating mockup stack that slides in with spring overshoot!

### D. Experience Section (Frame 12 - 15)
- **Container Transition:**
  - The section container transforms into a full-width dark theme card (`#18181B`).
  - Watermark: `EXPERIENCE` in subtle dark gray.
  - Left: `/EXPERIENCE`, Right: `9+ years of experience` (or customized experience badge).
- **Timeline Table:**
  - Clean divider lines separating roles, company names, and date ranges.
  - Row hover effect with smooth glow and slight text brightness shift.

### E. Project Case Study Transition (Frame 16 - 20)
- **Page Transition:**
  - Clicking any project card expands into a dedicated case study view.
  - Top navigation updates to `← Back` button and persistent availability pill.
  - Two-column project header: Project title, category, description, CTAs (`Live Preview ↗`, `Contact Me`), alongside metadata (Service, Timeline, Tools).
  - Editorial presentation with high-resolution imagery and narrative story blocks.

### F. Call-to-Action / Contact Section (Frame 21 - 22)
- Centered layout:
  - Live indicator badge `● Available for New Project`.
  - Massive heading: `HAVE A PROJECT IN MIND?`
  - Inspiring description text.
  - Dark pill button `Contact Me ↗`.

---

## 3. Recommended Animation & Tech Stack
- **Framework:** React + Vite + TypeScript
- **Styling:** Tailwind CSS + PostCSS
- **Animation Engine:** `motion` (`motion/react` / Framer Motion) + GSAP for advanced scrub/scroll triggers
- **Smooth Scrolling:** `@studio-freight/lenis` or `lenis`
- **Icons:** `lucide-react`
- **Design Intelligence:** Powered by `ui-ux-pro-max` skill
