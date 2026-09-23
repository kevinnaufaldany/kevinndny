import { useEffect, useRef, useState, useCallback } from "react"

interface Pixel {
  id: number
  x: number
  y: number
  opacity: number
  age: number
}

const PIXEL_SIZE = 10
const TRAIL_LENGTH = 35
const FADE_SPEED = 0.035

export function PixelCursorTrail({ className = "" }: { className?: string }) {
  const [pixels, setPixels] = useState<Pixel[]>([])
  const pixelIdRef = useRef(0)
  const lastPositionRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number | undefined>(undefined)

  const createPixel = useCallback((x: number, y: number) => {
    return {
      id: pixelIdRef.current++,
      x,
      y,
      opacity: 0.7,
      age: 0,
    }
  }, [])

  useEffect(() => {
    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const handleWindowMouseMove = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY

      const dx = x - lastPositionRef.current.x
      const dy = y - lastPositionRef.current.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance > PIXEL_SIZE) {
        const newPixel = createPixel(x, y)
        setPixels((prev) => [...prev.slice(-TRAIL_LENGTH), newPixel])
        lastPositionRef.current = { x, y }
      }
    }

    window.addEventListener("mousemove", handleWindowMouseMove, { passive: true })
    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove)
    }
  }, [createPixel])

  useEffect(() => {
    const animate = () => {
      setPixels((prev) =>
        prev
          .map((pixel) => ({
            ...pixel,
            opacity: pixel.opacity - FADE_SPEED,
            age: pixel.age + 1,
          }))
          .filter((pixel) => pixel.opacity > 0)
      )
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div
      className={`fixed inset-0 w-screen h-screen pointer-events-none overflow-hidden select-none z-[1] ${className}`}
      aria-hidden="true"
    >
      {pixels.map((pixel) => {
        // Calculate size based on age - older pixels are smaller
        const sizeMultiplier = Math.max(0.25, 1 - pixel.age / 80)
        const currentSize = PIXEL_SIZE * sizeMultiplier

        return (
          <div
            key={pixel.id}
            className="absolute pointer-events-none bg-neutral-800/80 dark:bg-white/80 rounded-[1px] shadow-sm"
            style={{
              left: pixel.x - currentSize / 2,
              top: pixel.y - currentSize / 2,
              width: currentSize,
              height: currentSize,
              opacity: pixel.opacity,
              transition: "width 0.1s ease-out, height 0.1s ease-out",
            }}
          />
        )
      })}
    </div>
  )
}

export default PixelCursorTrail
