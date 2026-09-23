import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  alpha: number;
  image: HTMLImageElement;
  size: number;
  update: () => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

interface TechImage {
  name: string;
  src: string;
  image: HTMLImageElement;
}

// Tech stack specifically curated for Kevin Naufal Dany's CV (Computer Vision, AI, Cloud, Engineering)
const icons = [
  {
    name: "Python",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "PyTorch",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
  },
  {
    name: "OpenCV",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg",
  },
  {
    name: "AWS",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  },
  {
    name: "QGIS",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/qgis/qgis-original.svg",
  },
  {
    name: "TypeScript",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "React",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Git",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "Linux",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  },
];

const TechCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const techImagesRef = useRef<TechImage[]>([]);

  useEffect(() => {
    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let isMounted = true;

    // Preload tech icons with graceful fallback
    const loadImages = async () => {
      const loaded = await Promise.all(
        icons.map(({ name, src }) => {
          return new Promise<TechImage | null>((resolve) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.src = src;
            img.onload = () => resolve({ name, src, image: img });
            img.onerror = () => resolve(null);
          });
        })
      );
      if (isMounted) {
        techImagesRef.current = loaded.filter((item): item is TechImage => item !== null);
      }
    };

    loadImages().then(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      handleResize();
      window.addEventListener("resize", handleResize);

      const particles = particlesRef.current;
      let animId: number;

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.update();
          p.draw(ctx);
          if (p.alpha <= 0) {
            particles.splice(i, 1);
          }
        }
        animId = requestAnimationFrame(animate);
      };

      animate();

      let lastSpawn = 0;
      const onMove = (e: MouseEvent) => {
        const now = performance.now();
        // Throttle spawns slightly so performance remains buttery smooth 60fps
        if (now - lastSpawn < 35 || techImagesRef.current.length === 0) return;
        lastSpawn = now;

        const randomIcon =
          techImagesRef.current[
            Math.floor(Math.random() * techImagesRef.current.length)
          ];

        const size = 20 + Math.random() * 8;

        const particle: Particle = {
          x: e.clientX,
          y: e.clientY,
          alpha: 1,
          image: randomIcon.image,
          size,
          update() {
            this.y -= 0.6;
            this.alpha -= 0.022;
          },
          draw(ctx: CanvasRenderingContext2D) {
            ctx.globalAlpha = Math.max(0, this.alpha);
            ctx.drawImage(
              this.image,
              this.x - this.size / 2,
              this.y - this.size / 2,
              this.size,
              this.size
            );
            ctx.globalAlpha = 1;
          },
        };

        particles.push(particle);
      };

      window.addEventListener("mousemove", onMove, { passive: true });
      return () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
      };
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50 select-none"
    />
  );
};

export default TechCursor;
