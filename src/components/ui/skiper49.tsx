"use client";

import { motion } from "motion/react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React, { useRef } from "react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { cn } from "@/lib/utils";

export interface CarouselImageItem {
  src: string;
  alt: string;
  title?: string;
  caption?: string;
}

export interface Carousel_003Props {
  images?: CarouselImageItem[];
  className?: string;
  showPagination?: boolean;
  showNavigation?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  spaceBetween?: number;
  onImageClick?: (index: number) => void;
}

export const Carousel_003: React.FC<Carousel_003Props> = ({
  images = defaultImages,
  className,
  showPagination = true,
  showNavigation = true,
  loop = true,
  autoplay = true,
  autoplayDelay = 3000, // Exactly 3 seconds as requested
  spaceBetween = 20,
  onImageClick,
}) => {
  const swiperRef = useRef<SwiperType | null>(null);

  const css = `
  .Carousal_003 {
    width: 100%;
    padding-top: 15px !important;
    padding-bottom: 50px !important;
  }
  
  .Carousal_003 .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 280px;
    height: 380px;
    border-radius: 1rem;
    overflow: hidden;
    transition: transform 0.3s ease;
  }

  @media (min-width: 640px) {
    .Carousal_003 .swiper-slide {
      width: 360px;
      height: 420px;
    }
  }

  @media (min-width: 1024px) {
    .Carousal_003 .swiper-slide {
      width: 440px;
      height: 450px;
    }
  }

  .Carousal_003 .swiper-pagination-bullet {
    background-color: #222222 !important;
    opacity: 0.25;
    transition: all 0.3s ease;
    width: 8px;
    height: 8px;
  }

  .Carousal_003 .swiper-pagination-bullet-active {
    opacity: 1;
    width: 24px;
    border-radius: 9999px;
    background-color: #10B981 !important;
  }
  `;

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.35,
        delay: 0.2,
      }}
      className={cn("relative w-full max-w-6xl mx-auto px-4 sm:px-6 select-none", className)}
    >
      <style>{css}</style>

      <div className="w-full relative group">
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          spaceBetween={spaceBetween}
          autoplay={
            autoplay
              ? {
                  delay: autoplayDelay,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }
              : false
          }
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          loop={loop}
          slideToClickedSlide={true} // Click any non-centered photo to smoothly slide to it
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 120,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={
            showPagination
              ? {
                  clickable: true,
                }
              : false
          }
          navigation={
            showNavigation
              ? {
                  nextEl: ".swiper-button-next-custom",
                  prevEl: ".swiper-button-prev-custom",
                }
              : false
          }
          className="Carousal_003"
          modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
        >
          {images.map((image, index) => (
            <SwiperSlide 
              key={index} 
              className="group/slide relative shadow-lg border border-brand-border/60 bg-zinc-900 cursor-pointer"
              onClick={() => {
                // If clicked, advance to next slide or notify
                if (swiperRef.current) {
                  swiperRef.current.slideNext();
                }
                if (onImageClick) {
                  onImageClick(index);
                }
              }}
            >
              <img
                className="h-full w-full object-cover transition-transform duration-700 group-hover/slide:scale-105"
                src={image.src}
                alt={image.alt}
                loading="lazy"
              />

              {/* Gradient vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover/slide:opacity-90 transition-opacity" />

              {/* Title & Caption Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 text-white z-10">
                {image.title && (
                  <h4 className="text-sm sm:text-base font-bold tracking-tight mb-1 drop-shadow-sm">
                    {image.title}
                  </h4>
                )}
                {image.caption ? (
                  <p className="text-[11px] sm:text-xs text-zinc-300 font-mono line-clamp-2">
                    {image.caption}
                  </p>
                ) : (
                  <p className="text-[11px] sm:text-xs text-zinc-300 font-mono truncate">
                    {image.alt}
                  </p>
                )}
                <div className="mt-2 flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-emerald-400 opacity-0 group-hover/slide:opacity-100 transition-opacity">
                  <span>Click photo to advance</span>
                  <span>&rarr;</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Arrows */}
        {showNavigation && (
          <>
            <button
              type="button"
              aria-label="Previous slide"
              className="swiper-button-prev-custom absolute -left-2 sm:left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 text-brand-dark shadow-md border border-brand-border/80 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all cursor-pointer hover:scale-105"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              className="swiper-button-next-custom absolute -right-2 sm:right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 text-brand-dark shadow-md border border-brand-border/80 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all cursor-pointer hover:scale-105"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* Autoplay & Interaction status hint */}
      <div className="text-center mt-1">
        <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Auto-sliding every 3s · Click any photo to advance
        </span>
      </div>
    </motion.div>
  );
};

export const defaultImages: CarouselImageItem[] = [
  {
    src: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=1400&auto=format&fit=crop",
    alt: "Plantation aerial survey with drone",
    title: "Drone Orthomosaic Survey",
    caption: "High-resolution spatial mapping across 10,000+ Ha pineapple fields.",
  },
  {
    src: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?q=80&w=1400&auto=format&fit=crop",
    alt: "Drone telemetry & edge hardware",
    title: "Edge Computer Vision Telemetry",
    caption: "Real-time crop anomaly detection running directly on airborne edge modules.",
  },
  {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop",
    alt: "Microscope mineral grain analysis",
    title: "Cassiterite Instance Segmentation",
    caption: "Automated polygon grain masks and size classification from PT Timah labs.",
  },
  {
    src: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=1400&auto=format&fit=crop",
    alt: "GIS multispectral mapping",
    title: "NDVI Vegetation Analytics",
    caption: "Multispectral vegetation index for crop vigor evaluation and yield prediction.",
  },
  {
    src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1400&auto=format&fit=crop",
    alt: "Automated agricultural fieldwork",
    title: "Geo-referenced Field Assets",
    caption: "Synchronized plot boundaries integrated into enterprise spatial database.",
  },
];

export const Skiper49: React.FC = () => {
  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-transparent py-6">
      <Carousel_003 images={defaultImages} showPagination loop autoplay autoplayDelay={3000} />
    </div>
  );
};

export default Skiper49;
