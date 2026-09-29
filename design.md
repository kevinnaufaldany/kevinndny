# 🎨 Design System — kevinndny.dev

> **Dokumen ini adalah sumber kebenaran tunggal (single source of truth) untuk seluruh visual & UI project portfolio ini.**
> Gunakan dokumen ini saat prompting agar AI menghasilkan kode yang konsisten dengan design system yang sudah ada.

---

## 📋 Ringkasan Project

| Property | Value |
|----------|-------|
| **Nama** | Kevin Naufal Dany — Portfolio |
| **Tipe** | Personal Portfolio / Developer Showcase |
| **Stack** | React 19 + Vite + TypeScript + Tailwind CSS 3 |
| **UI Library** | Lucide React (icons), Framer Motion (animasi), Lenis (smooth scroll) |
| **Style** | Minimalism & Swiss Style + Editorial touches |
| **Mode** | Light mode (utama), Dark mode support partial (di beberapa section) |

---

## 🎨 Color Palette

### Brand Colors (Tailwind Token)

Semua warna ini terdefinisi di `tailwind.config.js` → `theme.extend.colors.brand.*`

| Token | Hex | Preview | Fungsi |
|-------|-----|---------|--------|
| `brand-primary` | `#222222` | ![#222222](https://via.placeholder.com/16/222222/222222) | **CTA button utama**, teks heading, elemen aktif |
| `brand-secondary` | `#7B7B7B` | ![#7B7B7B](https://via.placeholder.com/16/7B7B7B/7B7B7B) | Subtitle, teks muted, ikon inaktif, label filter non-aktif |
| `brand-tertiary` | `#F8F8F8` | ![#F8F8F8](https://via.placeholder.com/16/F8F8F8/F8F8F8) | Background surface, area netral |
| `brand-dark` | `#111111` | ![#111111](https://via.placeholder.com/16/111111/111111) | Heading utama, tooltip background, expanding dot effect |
| `brand-card` | `#18181B` | ![#18181B](https://via.placeholder.com/16/18181B/18181B) | Card surface (dark section), foreground default |
| `brand-cardDark` | `#1E1E1E` | ![#1E1E1E](https://via.placeholder.com/16/1E1E1E/1E1E1E) | Card surface alternatif (dark variant) |
| `brand-accent` | `#10B981` | ![#10B981](https://via.placeholder.com/16/10B981/10B981) | **Status indikator** (available/online dot), emerald green |
| `brand-muted` | `#7B7B7B` | ![#7B7B7B](https://via.placeholder.com/16/7B7B7B/7B7B7B) | Sama dengan secondary (alias) |
| `brand-border` | `#E4E4E7` | ![#E4E4E7](https://via.placeholder.com/16/E4E4E7/E4E4E7) | Border default untuk button, card, pill, divider |
| `brand-surface` | `#F8F8F8` | ![#F8F8F8](https://via.placeholder.com/16/F8F8F8/F8F8F8) | Hover background, container filter |

### Utility Colors (Tailwind Standard)

| Token | Hex | Fungsi |
|-------|-----|--------|
| `white` | `#FFFFFF` | Background utama, teks di atas dark surface |
| `black` | `#000000` | Text selection background |
| `zinc-200` | `#E4E4E7` | Border tambahan, divider |
| `zinc-300` | `#D4D4D8` | Border hover state |
| `zinc-400` | `#A1A1AA` | Teks subtitle di dark section |
| `neutral-100` | `#F5F5F5` | Hover highlight background |
| `emerald-400` | `#34D399` | Ping animation pada status dot |

### Specialized Colors (Hardcoded)

| Komponen | Warna | Fungsi |
|----------|-------|--------|
| Body background (`index.html`) | `#F8F9FA` | Canvas utama editorial off-white |
| Body text (`index.html`) | `#111111` | Teks default high-contrast |
| Text selection | `bg-black text-white` | Brutalist invert selection |
| CSS base (`index.css`) | color: `#222222`, bg: `#FFFFFF` | Root defaults |
| Live Orb White | `#F4F4F5` body, `#09090B` eye | WebGL orb variant |
| Live Orb Black | `#18181B` body, `#F4F4F5` eye | WebGL orb variant |
| Live Orb Custom | `#7C5CFF` body, `#FAFAFA` eye | WebGL orb variant (purple) |

### ⚠️ Aturan Warna

```
✅ SELALU gunakan token Tailwind (brand-primary, brand-border, dll.)
✅ Untuk status "live/available" → brand-accent (#10B981)
✅ Untuk CTA/button utama → brand-primary (#222222) dengan text-white
✅ Untuk border → brand-border (#E4E4E7)
✅ Untuk hover background → brand-surface (#F8F8F8)

❌ JANGAN gunakan hex hardcoded di komponen baru
❌ JANGAN gunakan warna selain emerald/green untuk status indikator
❌ JANGAN gunakan gradient warna-warni (palette ini monokromatik + 1 accent)
```

---

## 🔤 Typography

### Font Family

```css
/* Tailwind config */
font-sans: '"Plus Jakarta Sans", Inter, system-ui, -apple-system, sans-serif'
font-display: '"Plus Jakarta Sans", system-ui, sans-serif'

/* Google Fonts import (sudah ada di index.html) */
Plus Jakarta Sans — weights: 300, 400, 500, 600, 700, 800
```

### Skala Typography

| Elemen | Class Tailwind | Contoh Penggunaan |
|--------|---------------|-------------------|
| **Watermark raksasa** | `text-6xl sm:text-8xl md:text-9xl lg:text-[11vw] font-black uppercase tracking-tight` | Background watermark di section |
| **Section Title** | `text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase` | Heading "PROJECTS", "EXPERIENCE" |
| **Category Eyebrow** | `text-xs font-mono uppercase tracking-widest` | Label "// 01 — SERVICES" |
| **Subtitle** | `text-xs sm:text-sm leading-relaxed` | Deskripsi di bawah heading |
| **Button Text** | `text-xs font-semibold tracking-tight` | Label pada button & pill |
| **Badge Text** | `text-xs font-medium tracking-tight` | Status badge text |
| **Tooltip** | `text-[11px] font-semibold whitespace-nowrap` | Tooltip hover |
| **HUD/Readout** | `text-[10px] font-mono tracking-widest` | Coordinate readout, tech labels |

### ⚠️ Aturan Typography

```
✅ Heading section SELALU uppercase + font-black + tracking-tight
✅ Eyebrow category SELALU font-mono + uppercase + tracking-widest
✅ Body & small text gunakan font-semibold atau font-medium
✅ Letter spacing: tight untuk heading, widest untuk mono labels

❌ JANGAN gunakan font selain Plus Jakarta Sans
❌ JANGAN gunakan font-normal/font-light untuk heading
❌ JANGAN gunakan text lebih kecil dari text-[10px] untuk readability
```

---

## 📐 Spacing System

### Padding & Margin Patterns

| Konteks | Pattern |
|---------|---------|
| **Button padding** | `px-6 py-2.5` |
| **Badge padding** | `px-4 py-1.5` |
| **Filter pill padding** | `px-4 py-1.5` (inner), `p-1 gap-1.5` (container) |
| **Social pill padding** | `px-5 py-2.5` |
| **Card padding** | `p-4 gap-4` |
| **Section wrapper** | `pb-10 sm:pb-14` (header), `mt-6 sm:mt-8` (content) |
| **Fixed floating element** | `bottom-6 right-6 sm:bottom-8 sm:right-8` |

### Gap Patterns

| Konteks | Gap |
|---------|-----|
| Button inner | `gap-1.5` |
| Badge inner | `gap-2` |
| Social icon row | `gap-1.5` (row), `gap-2` (column), `gap-2.5` (grid) |
| Card content | `gap-4` |

---

## 🔘 Border Radius System

| Token | Nilai | Digunakan Untuk |
|-------|-------|----------------|
| `rounded-full` | 9999px | **Signature shape** — Semua button, badge, pill, dot, filter, social pill |
| `rounded-2xl` | 16px | Card container, social icons container |
| `rounded-xl` | 12px | Icon tile, image thumbnail |
| `rounded-lg` | 8px | Tooltip, hover highlight pill |
| `rounded-3xl` | 24px | Orbiting skills core |

### ⚠️ Aturan Radius

```
✅ Button, badge, pill → SELALU rounded-full
✅ Card container → rounded-2xl
✅ Tooltip → rounded-lg

❌ JANGAN gunakan rounded-md atau rounded-sm untuk button
❌ JANGAN gunakan sharp corner (rounded-none) kecuali pada watermark/text element
```

---

## 🌑 Shadow & Elevation

| Token | Value | Digunakan Untuk |
|-------|-------|----------------|
| `shadow-subtle` | `0 2px 8px -2px rgba(0,0,0,0.05), 0 1px 4px -1px rgba(0,0,0,0.03)` | Resting state — button, badge, pill, card |
| `shadow-card` | `0 12px 30px -10px rgba(0,0,0,0.08)` | Hover state — button, card, pill |
| `shadow-glow` | `0 0 20px -5px rgba(16,185,129,0.3)` | Green glow effect |

### Elevation Hierarchy

```
Resting (level 0) → shadow-subtle
Hover (level 1)   → shadow-card
Float (level 2)   → shadow-lg / shadow-2xl
```

### Glassmorphism Effect

```
backdrop-blur-md + bg-white/90 atau bg-white/95
Digunakan pada: Badge, Back-to-Top, Social Icons bar, Navbar
```

---

## 🔲 Button Variants

### Variant Definitions (dari `Button.tsx`)

| Variant | Background | Text | Border | Hover |
|---------|-----------|------|--------|-------|
| **`primary`** | `bg-brand-primary` (#222) | `text-white` | — | `hover:bg-black`, `hover:scale-[1.02]`, `hover:shadow-card` |
| **`outline`** | `bg-transparent` | `text-brand-dark` (#111) | `border-brand-border` (#E4E4E7) | `hover:border-brand-primary`, `hover:bg-brand-surface` |
| **`ghost`** | `bg-transparent` | `text-brand-secondary` (#7B7B7B) | — | `hover:text-brand-primary`, `hover:bg-brand-surface` |
| **`white`** | `bg-white` | `text-brand-dark` (#111) | `border-zinc-200` | `hover:bg-brand-surface` |

### Button States

```
Default  → shadow-subtle
Hover    → shadow-card + scale-[1.02]
Active   → scale-[0.98]
Focus    → focus-visible:ring-2 ring-brand-primary
```

### Interactive Hover Button (direction-aware)

```
Default  → bg-white, border-brand-border, text-brand-dark
Hover    → expanding dot bg-brand-dark fills background, text slides out, new text-white slides in
Arrow    → diagonal arrow icon, group-hover translate effect
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Width | Usage |
|-----------|-------|-------|
| Default (mobile) | `< 640px` | Base styles, single column |
| `sm:` | `≥ 640px` | 2-column grids, larger text |
| `md:` | `≥ 768px` | Multi-column layouts |
| `lg:` | `≥ 1024px` | Full desktop layout |
| `xl:` | `≥ 1280px` | Wide content |

---

## ✨ Animation & Motion Language

### Spring Presets (dari `lib/motion.ts`)

| Preset | Config | Digunakan Untuk |
|--------|--------|----------------|
| `snappy` | `stiffness: 300, damping: 20` | UI toggle, card hover, quick response |
| `bouncy` | `stiffness: 200, damping: 12` | Playful elements |
| `gentle` | `stiffness: 120, damping: 14` | Ambient/decorative |
| `magnetic` | `stiffness: 220, damping: 16` | Magnetic cursor effect |

### Transition Variants

| Variant | Hidden State | Visible State | Timing |
|---------|-------------|---------------|--------|
| `fadeInUp` | `opacity: 0, y: 35` | `opacity: 1, y: 0` | `0.65s, ease: [0.22, 1, 0.36, 1]` |
| `heroLetterVariants` | `opacity: 0, y: 50` | `opacity: 1, y: 0` | `0.7s, ease: [0.16, 1, 0.3, 1]` |
| `cardHoverVariants` | `scale: 1` | `scale: 1.03` | `springPresets.snappy` |
| `staggerContainer` | — | — | `staggerChildren: 0.12, delayChildren: 0.05` |

### CSS Transition Standards

```
Hover transitions → duration-200 (simple color changes)
Complex transforms → duration-300 (scale, translate, shadow)
Easing → ease-out (default), custom cubic-bezier untuk entrance
```

### Micro-Interaction Signatures

| Interaction | Effect |
|-------------|--------|
| **Expanding Dot** | Dot `h-3 w-3` scales up (`scale-[5]`) to fill container on hover |
| **Diagonal Arrow** | `group-hover:translate-x-0.5 group-hover:-translate-y-0.5` |
| **Press Feedback** | `active:scale-[0.98]` atau `active:scale-95` |
| **Hover Lift** | `hover:scale-[1.02]` atau `hover:scale-[1.03]` |
| **Slide Replace** | Text slides out, new text slides in from opposite direction |

### ⚠️ Aturan Animasi

```
✅ SELALU gunakan spring physics dari motion.ts untuk Framer Motion
✅ SELALU respect prefers-reduced-motion
✅ Entrance animation → fadeInUp variant + viewport once
✅ Hover → duration-200 sampai duration-300

❌ JANGAN gunakan animasi infinite untuk dekoratif (kecuali loader)
❌ JANGAN gunakan ease-in-out untuk entrance (gunakan ease-out / custom bezier)
❌ JANGAN buat animasi tanpa reduced-motion fallback
```

---

## 🧩 Component Patterns

### Section Structure

Setiap section mengikuti pattern ini:

```tsx
<SectionWrapper id="section-id" dark={false}>
  <SectionHeader
    category="// 01 — CATEGORY"
    title="SECTION TITLE"
    subtitle="Brief description text"
    watermarkText="WATERMARK"
  />
  {/* Section content */}
</SectionWrapper>
```

### Card Pattern

```
Container: rounded-2xl + shadow-subtle
Hover: shadow-card + scale-[1.03]
Image: rounded-xl + object-cover
Content: p-4 gap-4
```

### Badge / Status Pattern

```
Container: rounded-full + bg-white/90 + backdrop-blur-md + shadow-subtle
Dot: brand-accent (#10B981) + animate-ping (emerald-400 behind)
Text: text-xs font-medium
```

### Social Pill Pattern

```
Container: rounded-full + bg-white + border-brand-border + shadow-subtle
Hover: border-brand-primary + bg-brand-surface + scale-[1.03]
Active: scale-[0.98]
Icon: text-brand-secondary → hover: text-brand-primary
```

### Filter Pill Pattern

```
Container: rounded-full + bg-brand-surface + border-brand-border/60
Active indicator: bg-white + border-zinc-200/80 + shadow-subtle (layoutId slide)
Active text: text-brand-dark
Inactive text: text-brand-secondary → hover: text-brand-dark
Spring: stiffness 350, damping 25
```

---

## 🌙 Dark Island Architecture

> **PENTING:** Project ini TIDAK menggunakan global dark mode toggle. Sebagai gantinya, menggunakan pola **Dark Island** — section/card tertentu menggunakan dark background di dalam halaman light.

### Kapan Menggunakan Dark Island?

| Section/Component | Background | Tujuan |
|-------------------|-----------|--------|
| **Experience Section** (inner card) | `bg-brand-dark` (#111) | Kontras visual, gravitas teknis |
| **Certifications Featured Card** | `bg-gradient-to-br from-brand-card via-zinc-900 to-black` | Highlight sertifikasi utama |
| **Service Accordion (open)** | `bg-brand-cardDark` (#1E1E1E) | State aktif accordion |

### Dark Island Token Map

| Elemen | Token Light | Token Dark Island |
|--------|-----------|-------------------|
| **Background** | `bg-white` / `bg-brand-surface` | `bg-brand-dark` / `bg-brand-cardDark` |
| **Heading** | `text-brand-dark` (#111) | `text-white` |
| **Subtitle** | `text-brand-secondary` (#7B7B7B) | `text-zinc-300` / `text-zinc-400` |
| **Watermark** | `text-brand-dark opacity-[0.035]` | `text-white opacity-[0.03]` |
| **Border** | `border-brand-border` (#E4E4E7) | `border-zinc-800` / `border-zinc-700/60` |
| **Divider** | `divide-zinc-200` | `divide-zinc-800/70` |
| **Badge bg** | `bg-white/90` | `bg-zinc-800/80` / `bg-white/5` |
| **Tag pill** | `bg-brand-surface border-zinc-200` | `bg-zinc-800/80 border-zinc-700/60` |
| **Hover** | `hover:bg-zinc-100/60` | `hover:bg-white/[0.04]` |
| **Accent** | `text-brand-accent` | `text-emerald-400` |
| **Accent bg** | `bg-emerald-500/10` | `bg-emerald-500/20` |
| **Eyebrow** | `text-brand-secondary` | `text-zinc-400` |

### ⚠️ Aturan Dark Island

```
✅ Dark island SELALU menggunakan rounded-3xl + border-zinc-800 + shadow-card
✅ Accent di dark island → emerald-400 (bukan brand-accent)
✅ Teks body di dark island → text-zinc-300 (bukan text-white)
✅ "Current" badge → bg-emerald-500/20 border-emerald-500/30 text-emerald-400

❌ JANGAN gunakan dark: prefix Tailwind (project ini tidak pakai global dark toggle)
❌ JANGAN gunakan text-white untuk body text di dark island (hanya heading)
❌ JANGAN lupa transisi visual antara light section → dark island
```

---

## 📏 Section Layout Patterns

### Max-Width Hierarchy

| Level | Token | Digunakan Untuk |
|-------|-------|----------------|
| **Global container** | `max-w-7xl mx-auto` (1280px) | SectionWrapper content, Navbar, Footer |
| **Action bar** | `max-w-6xl mx-auto` | Filter pills row, section action bars |
| **Focused content** | `max-w-5xl mx-auto` | Accordion (Services), narrow content |
| **CTA/Contact** | `max-w-4xl mx-auto` | Contact section |
| **Text constraint** | `max-w-3xl` / `max-w-xl` | Heading & subtitle max width |

### Section Padding Standard

| Konteks | Padding |
|---------|---------|
| **Standard section** | `py-20 sm:py-28 px-6 sm:px-8` |
| **Compact section** (Experience) | `py-12 sm:py-16 px-4 sm:px-8` |
| **Hero section** | `pt-20 sm:pt-24 md:pt-16 pb-12 md:pb-0 px-6 sm:px-16` |
| **Contact section** | `py-28 sm:py-36 px-6 sm:px-8` |

### Section Separator Pattern

```
Setiap section (kecuali Hero) memiliki border-t di atas:
border-t border-brand-border/80
```

### Page Flow (Z-Index Layers)

```
Layer 1: PixelCursorTrail (canvas, pointer-events-none)
Layer 2: Navbar (fixed top-0 z-50)
Layer 3: Main content (relative z-10)
Layer 4: BackToTop (fixed bottom-6 right-6, z-[9999])
Layer 5: Footer (normal flow)
```

### Grid Patterns

| Grid | Breakpoints | Digunakan Untuk |
|------|------------|----------------|
| `grid-cols-1 md:grid-cols-2 gap-8` | 1→2 col | Project cards |
| `grid-cols-1 md:grid-cols-3 gap-6` | 1→3 col | Certification cards |
| `grid-cols-1 lg:grid-cols-12 gap-8` | 12-col asymmetric | Featured card (3:9 atau 7:5) |

---

## 📦 Icon System

| Aspek | Standar |
|-------|---------|
| **Library** | Lucide React |
| **Default size** | `w-4 h-4` (inline), `w-5 h-5` (button), `size-[18px]` (social) |
| **Color** | Inherit dari parent (`currentColor`) |
| **Stroke width** | Default Lucide (2px) |

### ⚠️ Aturan Icon

```
✅ SELALU gunakan Lucide React untuk icon
✅ Icon button HARUS punya aria-label
❌ JANGAN gunakan emoji sebagai icon
❌ JANGAN gunakan icon library lain (no Heroicons, no FontAwesome)
```

---

## 🔗 Quick Reference untuk Prompting

### Saat membuat BUTTON baru:

```
"Buat button dengan bg-brand-primary text-white rounded-full px-6 py-2.5
text-xs font-semibold tracking-tight shadow-subtle
hover:bg-black hover:shadow-card hover:scale-[1.02]
active:scale-[0.98] transition-all duration-300"
```

### Saat membuat CARD baru:

```
"Buat card dengan bg-white rounded-2xl shadow-subtle p-4 gap-4
border border-brand-border
hover:shadow-card hover:scale-[1.03]
transition-all duration-300"
```

### Saat membuat BADGE/TAG baru:

```
"Buat badge dengan bg-white/90 backdrop-blur-md rounded-full
px-4 py-1.5 border border-brand-border shadow-subtle
text-xs font-medium text-brand-dark tracking-tight"
```

### Saat membuat SECTION baru:

```
"Buat section dengan SectionWrapper, SectionHeader yang memiliki
category eyebrow (font-mono uppercase tracking-widest text-xs text-brand-secondary),
title (text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase text-brand-dark),
dan watermark background (font-black uppercase opacity-[0.035])"
```

### Saat menambahkan ANIMASI entrance:

```
"Gunakan fadeInUp dari lib/motion.ts:
initial={{ opacity: 0, y: 35 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: '-80px' }}
transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}"
```

### Saat menambahkan HOVER effect:

```
"Tambahkan hover:scale-[1.02] active:scale-[0.98]
transition-all duration-300 cursor-pointer
shadow-subtle hover:shadow-card"
```

---

## 📂 File Structure Reference

```
src/
├── components/
│   ├── ui/           → Reusable UI primitives (Button, Badge, FilterPill, etc.)
│   ├── cards/        → Card variants (ProjectCard, ExperienceRow, ServiceAccordionItem)
│   ├── sections/     → Page sections (Hero, Projects, Experience, Services, etc.)
│   └── layout/       → Navbar, Footer, SectionWrapper
├── data/             → Static content data (projects, experiences, certifications, services)
├── hooks/            → Custom hooks (useLenis, useMagneticCursor, useScrollReveal)
├── lib/              → Utilities (cn, motion presets, supabase)
├── pages/            → Page components (HomePage, CaseStudyPage)
├── types/            → TypeScript interfaces
└── index.css         → Global styles & Lenis config
```

---

## 🏷️ Token Reference Map (Tailwind Config)

```js
// tailwind.config.js - ringkasan lengkap
{
  colors: {
    brand: {
      primary:   '#222222',  // CTA, heading, active
      secondary: '#7B7B7B',  // Muted text, inactive
      tertiary:  '#F8F8F8',  // Surface bg
      dark:      '#111111',  // Darkest text, tooltip bg
      card:      '#18181B',  // Dark card bg
      cardDark:  '#1E1E1E',  // Dark card variant
      accent:    '#10B981',  // Green status dot
      muted:     '#7B7B7B',  // Alias secondary
      border:    '#E4E4E7',  // Default border
      surface:   '#F8F8F8',  // Hover bg, filter bg
    },
    background: '#FFFFFF',
    foreground: '#18181B',
    muted: { DEFAULT: '#F4F4F5', foreground: '#71717A' },
    accent: { DEFAULT: '#F4F4F5', foreground: '#18181B' },
  },
  fontFamily: {
    sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
    display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
  },
  boxShadow: {
    subtle: '0 2px 8px -2px rgba(0,0,0,0.05), 0 1px 4px -1px rgba(0,0,0,0.03)',
    card:   '0 12px 30px -10px rgba(0,0,0,0.08)',
    glow:   '0 0 20px -5px rgba(16,185,129,0.3)',
  }
}
```

---

## 🧭 Navbar Pattern

```
Position: fixed top-0 left-0 right-0 z-50
Default (belum scroll): bg-transparent, py-6 px-6 sm:px-8
Scrolled (>30px): bg-white/85 backdrop-blur-md border-b border-brand-border/80, py-3.5

Logo: font-semibold text-brand-primary tracking-tight
Breadcrumb: text-xs font-mono text-brand-secondary
Nav links: text-sm font-medium text-brand-secondary hover:text-brand-primary tracking-tight
Nav index: text-xs text-brand-secondary/60 font-mono
CTA button: Button variant="primary" (hidden sm:inline-flex)
Mobile toggle: rounded-full border-brand-border shadow-subtle
Mobile menu: bg-white/95 backdrop-blur-xl border-b border-brand-border shadow-card
```

---

## 🦶 Footer Pattern

```
Top row: flex justify-between, py-5 sm:py-6 px-6 sm:px-8, max-w-7xl mx-auto
Brand: font-semibold text-brand-primary tracking-tight
Divider: repeating linear-gradient 315deg, h-8 sm:h-10, border-y border-zinc-200/80
Copyright: text-[11px] text-zinc-400 font-mono tracking-wider
Social icons: rounded-lg p-2, text-brand-secondary hover:text-brand-dark
```

---

## ♿ Accessibility Checklist

```
✅ Contrast ratio 4.5:1 minimum untuk semua teks
✅ Focus visible ring pada semua elemen interaktif (focus-visible:ring-2 ring-brand-primary)
✅ Min touch target 44×44px pada mobile
✅ prefers-reduced-motion dihormati di semua animasi
✅ aria-label pada icon button
✅ Alt text pada semua gambar
✅ Keyboard navigasi berfungsi penuh
✅ cursor-pointer pada semua elemen yang bisa diklik

❌ JANGAN hapus focus ring
❌ JANGAN buat button tanpa aria-label jika icon-only
❌ JANGAN andalkan hover saja untuk interaksi penting
```

---

## 📝 Template Prompting Lengkap

Gunakan template-template di bawah ini saat meminta AI membuat komponen baru. Copy-paste bagian yang relevan.

### Template: Membuat Komponen Baru

```
Buatkan komponen [NAMA] mengikuti design system kevinndny.dev:

WARNA:
- Background: bg-white (light) / bg-brand-dark (dark island)
- Teks utama: text-brand-dark (#111111)
- Teks sekunder: text-brand-secondary (#7B7B7B)
- Border: border-brand-border (#E4E4E7)
- Accent/status: brand-accent (#10B981)
- CTA: bg-brand-primary (#222222) + text-white

TYPOGRAPHY:
- Font: Plus Jakarta Sans (sudah set global)
- Heading: font-black uppercase tracking-tight
- Body: text-xs/text-sm font-medium/font-semibold
- Label/tag: text-xs font-mono uppercase tracking-widest

SHAPE & SPACING:
- Button/pill/badge: rounded-full
- Card: rounded-2xl
- Padding button: px-6 py-2.5
- Padding card: p-4 atau p-6
- Gap internal: gap-1.5 sampai gap-4

SHADOW:
- Default: shadow-subtle
- Hover: shadow-card

ANIMASI:
- Hover: scale-[1.02] + duration-300
- Active: scale-[0.98]
- Entrance: fadeInUp (opacity 0→1, y 35→0, 0.65s)
- Spring: stiffness 300, damping 20

AKSESIBILITAS:
- cursor-pointer pada element clickable
- focus-visible:ring-2 ring-brand-primary
- aria-label pada icon button
```

### Template: Membuat Section Baru

```
Buatkan section [NAMA] mengikuti pattern kevinndny.dev:

STRUKTUR:
- Wrapper: SectionWrapper id="[section-id]" + border-t border-brand-border/80
- Padding: py-20 sm:py-28 px-6 sm:px-8
- Container: max-w-7xl mx-auto

HEADER (gunakan SectionHeader):
- Watermark: text-[11vw] font-black uppercase opacity-[0.035]
- Category: text-xs font-mono uppercase tracking-widest text-brand-secondary
- Title: text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase text-brand-dark
- Subtitle: text-xs sm:text-sm text-brand-secondary leading-relaxed

ANIMASI ENTRANCE:
- motion.div dengan fadeInUp variant
- viewport={{ once: true, margin: "-80px" }}
- staggerContainer untuk children (staggerChildren: 0.12)
```

### Template: Membuat Dark Island Section

```
Buatkan [KOMPONEN] sebagai dark island:

CONTAINER:
- Background: bg-brand-dark (#111111) / bg-brand-cardDark (#1E1E1E)
- Border: border-zinc-800
- Radius: rounded-3xl
- Shadow: shadow-card

TEKS:
- Heading: text-white font-black
- Body: text-zinc-300 (BUKAN text-white)
- Meta/label: text-zinc-400 font-mono
- Accent: text-emerald-400

ELEMEN:
- Badge: bg-zinc-800/80 border-zinc-700/60 text-zinc-300
- Tag: bg-zinc-800/80 border-zinc-700/60 rounded-full
- Divider: divide-zinc-800/70
- Hover row: hover:bg-white/[0.04]
- "Current" badge: bg-emerald-500/20 border-emerald-500/30 text-emerald-400
```

---

> **💡 Tips Prompting:**
> 1. Copy-paste section yang relevan dari dokumen ini ke dalam prompt Anda
> 2. Sertakan hex warna spesifik saat minta perubahan warna
> 3. Referensikan nama komponen yang sudah ada (Button, Badge, SectionHeader) sebagai contoh
> 4. Untuk dark section, gunakan template "Dark Island" bukan dark mode biasa
> 5. Selalu sertakan aturan animasi dan aksesibilitas

