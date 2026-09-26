"use client"
import * as React from "react"

export type BlueprintInkRevealProps = {
  /** The word drawn as an outline plate and revealed as solid */
  wordmark?: string
  /** Radius of the ink reveal, in screen pixels */
  inkRadius?: number
  /** The drafting-style X/Y readout in the top right */
  showCoordinates?: boolean
  /** Extra root class names */
  className?: string
  /** Hide CAD borders & background for seamless hero integration */
  seamless?: boolean
}

/**
 * ============================================================================
 * PANDUAN PENGATURAN TYPOGRAPHY WORDMARK ("KEVIN NAUFAL")
 * ============================================================================
 * File ini mengontrol efek interaktif Wordmark Hero ("KEVIN NAUFAL").
 * Anda dapat dengan mudah menyesuaikan parameter tampilan berikut:
 * 
 * 1. Lebar & Tinggi Koordinat SVG (VIEW_W & VIEW_H):
 *    - VIEW_W: Mengatur lebar bidang kanvas SVG (saat ini 1320).
 *      Jika menambah letter-spacing atau menambah panjang kata, besarkan nilai ini
 *      agar huruf paling kiri (K) dan paling kanan (L) tidak terpotong.
 *    - VIEW_H: Mengatur tinggi bidang kanvas SVG (saat ini 220).
 * 
 * 2. Ukuran Huruf (fontSize) & Jarak Antar Huruf (letterSpacing):
 *    - Diatur di objek `WORDMARK_TYPOGRAPHY_STYLES` di bawah.
 *    - `fontSize`: `${VIEW_H * 0.62}px` (~136px). Naikkan jika ingin huruf lebih tinggi/tebal.
 *    - `letterSpacing`: "0.06em". Nilai ini memberikan jarak renggang yang gagah & lega.
 *      Ubah ke 0.07em atau 0.08em jika ingin lebih renggang lagi.
 * 
 * 3. Radius Efek Tinta Ink (inkRadius):
 *    - Diatur via props `inkRadius` pada komponen (default 100-180px di HeroSection.tsx).
 * ============================================================================
 */

// Lebar kanvas SVG koordinat proporsional untuk tipografi grotesque modern
const VIEW_W = 1320
const VIEW_H = 220

/**
 * Konfigurasi Gaya Tipografi Bersama (Memastikan teks outline & solid selalu selaras)
 */
export const WORDMARK_TYPOGRAPHY_STYLES: React.CSSProperties = {
  fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, -apple-system, sans-serif",
  fontWeight: 900,
  fontSize: `${VIEW_H * 0.62}px`, // Skala ukuran font proporsional terhadap kanvas
  letterSpacing: "0.06em",         // Jarak antar huruf (tracking) - diperlebar untuk kesan gagah & bernafas
}

export function BlueprintInkReveal({
  wordmark = "KEVIN NAUFAL",
  inkRadius = 180,
  showCoordinates = false,
  className = "",
  seamless = true,
}: BlueprintInkRevealProps) {

  const containerRef = React.useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = React.useState(false)
  const [coords, setCoords] = React.useState({ x: VIEW_W / 2, y: VIEW_H / 2 })
  const [springCoords, setSpringCoords] = React.useState({ x: VIEW_W / 2, y: VIEW_H / 2 })
  const [currentRadius, setCurrentRadius] = React.useState(0)
  const svgRef = React.useRef<SVGSVGElement | null>(null)
  const [viewScale, setViewScale] = React.useState(1)
  const [reducedMotion, setReducedMotion] = React.useState(false)
  const rafId = React.useRef<number | null>(null)

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mq.matches)
    const h = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener("change", h)
    return () => mq.removeEventListener("change", h)
  }, [])

  React.useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const read = () => {
      const m = svg.getScreenCTM()
      if (m && m.a > 0) setViewScale(m.a)
    }
    read()
    const ro = new ResizeObserver(read)
    ro.observe(svg)
    window.addEventListener("scroll", read, { passive: true })
    return () => {
      ro.disconnect()
      window.removeEventListener("scroll", read)
    }
  }, [])

  const toViewBox = (clientX: number, clientY: number) => {
    const svg = svgRef.current
    if (svg) {
      const m = svg.getScreenCTM()
      if (m) {
        const pt = svg.createSVGPoint()
        pt.x = clientX
        pt.y = clientY
        const p = pt.matrixTransform(m.inverse())
        return { x: p.x, y: p.y }
      }
      const r = svg.getBoundingClientRect()
      const scale = Math.min(r.width / VIEW_W, r.height / VIEW_H) || 1
      return {
        x: (clientX - r.left - (r.width - VIEW_W * scale) / 2) / scale,
        y: (clientY - r.top - (r.height - VIEW_H * scale) / 2) / scale,
      }
    }
    return { x: VIEW_W / 2, y: VIEW_H / 2 }
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    setCoords(toViewBox(e.clientX, e.clientY))
    if (!isHovered) setIsHovered(true)
  }

  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    const p = toViewBox(e.clientX, e.clientY)
    setCoords(p)
    setSpringCoords(p)
    setIsHovered(true)
  }

  const handlePointerLeave = () => {
    setIsHovered(false)
  }

  const springRef = React.useRef({ x: VIEW_W / 2, y: VIEW_H / 2 })
  const radiusRef = React.useRef(0)
  const coordsRef = React.useRef(coords)
  coordsRef.current = coords

  React.useEffect(() => {
    const targetRadius = isHovered ? inkRadius : 0

    if (reducedMotion) {
      springRef.current = { ...coords }
      radiusRef.current = targetRadius
      setSpringCoords(springRef.current)
      setCurrentRadius(targetRadius)
      return
    }

    const update = () => {
      const target = coordsRef.current
      let moving = false

      const dx = target.x - springRef.current.x
      const dy = target.y - springRef.current.y
      if (Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05) {
        springRef.current = {
          x: springRef.current.x + dx * 0.18,
          y: springRef.current.y + dy * 0.18,
        }
        moving = true
      } else if (springRef.current.x !== target.x || springRef.current.y !== target.y) {
        springRef.current = { x: target.x, y: target.y }
        moving = true
      }

      const dr = targetRadius - radiusRef.current
      if (Math.abs(dr) > 0.2) {
        radiusRef.current = radiusRef.current + dr * 0.16
        moving = true
      } else if (radiusRef.current !== targetRadius) {
        radiusRef.current = targetRadius
        moving = true
      }

      if (moving) {
        setSpringCoords(springRef.current)
        setCurrentRadius(radiusRef.current)
        rafId.current = requestAnimationFrame(update)
        return
      }
      rafId.current = null
    }

    rafId.current = requestAnimationFrame(update)
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [coords, isHovered, inkRadius, reducedMotion])

  const filterId = React.useId().replace(/:/g, "_") + "_disp"
  const maskId = React.useId().replace(/:/g, "_") + "_mask"

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={`relative w-full overflow-hidden select-none cursor-crosshair ${
        seamless ? "" : "border-y border-brand-border bg-white"
      } ${className}`}
    >
      {showCoordinates && (
        <div className="absolute top-3.5 right-6 z-20 hidden sm:flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-brand-secondary pointer-events-none">
          <span>X: {Math.round(springCoords.x)}</span>
          <span>•</span>
          <span>Y: {Math.round(springCoords.y)}</span>
        </div>
      )}

      {/* Blueprint Lettering Container */}
      <div className="relative w-full py-2 px-2 sm:px-4 flex items-center justify-center">
        <div className="w-full max-w-6xl">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-auto block"
            aria-hidden="true"
          >
            <defs>
              <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.045 0.055"
                  numOctaves="4"
                  seed="5"
                  result="noise"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale="80"
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
                <feGaussianBlur stdDeviation="1.6" result="blurred" />
                <feComponentTransfer in="blurred" result="contrast">
                  <feFuncA type="linear" slope="2.5" intercept="-0.65" />
                </feComponentTransfer>
              </filter>

              <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width={VIEW_W} height={VIEW_H}>
                <rect width={VIEW_W} height={VIEW_H} fill="black" />
                <circle
                  cx={springCoords.x}
                  cy={springCoords.y}
                  r={currentRadius / Math.max(0.0001, viewScale)}
                  fill="white"
                  style={{ filter: `url(#${filterId})` }}
                />
              </mask>
            </defs>

            {/* 1. Base Outlined Hairline Plate - Instantaneous First-Paint Render (No canvas delay or blank flash) */}
            <text
              x="50%"
              y="54%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="none"
              stroke="#18181b"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-75 select-none"
              style={WORDMARK_TYPOGRAPHY_STYLES}
            >
              {(wordmark || "KEVIN NAUFAL").toUpperCase()}
            </text>

            {/* 2. Revealed Solid Ink Plate masked dynamically by pointer turbulence circle */}
            <text
              x="50%"
              y="54%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#09090b"
              stroke="none"
              mask={`url(#${maskId})`}
              className="select-none pointer-events-none"
              style={WORDMARK_TYPOGRAPHY_STYLES}
            >
              {(wordmark || "KEVIN NAUFAL").toUpperCase()}
            </text>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default BlueprintInkReveal
