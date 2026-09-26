"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";

interface PortraitSilhouetteProps {
  src: string;
  alt: string;
  className?: string;
  alphaThreshold?: number; // 0-255, default 25
}

export const PortraitSilhouette: React.FC<PortraitSilhouetteProps> = ({
  src,
  alt,
  className = "",
  alphaThreshold = 25,
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize offscreen canvas once image loads
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    img.onload = () => {
      // Downsample slightly for ultra-fast, 60fps O(1) alpha lookup
      const canvas = document.createElement("canvas");
      const scale = Math.min(1, 360 / img.naturalWidth);
      canvas.width = Math.round(img.naturalWidth * scale);
      canvas.height = Math.round(img.naturalHeight * scale);

      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (ctx) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvasRef.current = canvas;
        setIsLoaded(true);
      }
    };
  }, [src]);

  // Window pointermove handler for alpha-accurate hit testing
  const checkHit = useCallback(
    (e: PointerEvent) => {
      if (!canvasRef.current || !imgRef.current) return;

      const rect = imgRef.current.getBoundingClientRect();
      const clientX = e.clientX;
      const clientY = e.clientY;

      // Quick bounding box rejection
      if (
        clientX < rect.left ||
        clientX > rect.right ||
        clientY < rect.top ||
        clientY > rect.bottom
      ) {
        if (isHovered) setIsHovered(false);
        return;
      }

      // Convert to normalized coordinates [0, 1]
      const normX = (clientX - rect.left) / rect.width;
      const normY = (clientY - rect.top) / rect.height;

      const canvas = canvasRef.current;
      const px = Math.min(canvas.width - 1, Math.max(0, Math.floor(normX * canvas.width)));
      const py = Math.min(canvas.height - 1, Math.max(0, Math.floor(normY * canvas.height)));

      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      const pixel = ctx.getImageData(px, py, 1, 1).data;
      const alpha = pixel[3]; // Alpha channel: 0 = transparent, 255 = fully opaque

      const touchingSilhouette = alpha > alphaThreshold;
      setIsHovered(touchingSilhouette);
    },
    [isHovered, alphaThreshold]
  );

  useEffect(() => {
    if (!isLoaded) return;

    window.addEventListener("pointermove", checkHit, { passive: true });
    return () => {
      window.removeEventListener("pointermove", checkHit);
    };
  }, [isLoaded, checkHit]);

  return (
    <div className={`relative flex justify-center items-end ${isHovered ? "cursor-pointer" : ""}`}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="eager"
        className={`pointer-events-none select-none transition-all duration-700 drop-shadow-md ${
          isHovered
            ? "filter-none grayscale-0 contrast-100"
            : "filter grayscale contrast-[1.08]"
        } ${className}`}
      />
    </div>
  );
};

export default PortraitSilhouette;
