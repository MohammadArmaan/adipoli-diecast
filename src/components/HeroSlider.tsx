"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import Image from "next/image";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

import banner1 from "@/assets/banner-1.png";
import banner2 from "@/assets/banner-2.png";
import banner3 from "@/assets/banner-3.png";

interface SlideContent {
  image: any;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  brandName: string;
}

const slideContents: SlideContent[] = [
  {
    image: banner1,
    title: "Unleash The Speed.",
    subtitle: "Feel The Drift.",
    description: "Build your ultimate Hot Wheels collection.",
    buttonText: "Shop Now",
    buttonLink: "/shop",
    brandName: "ANUP WHEELS",
  },
  {
    image: banner2,
    title: "Track Ready Legends.",
    subtitle: "Race Beyond Limits.",
    description: "Premium die-cast models for real collectors.",
    buttonText: "Explore Cars",
    buttonLink: "/shop",
    brandName: "ANUP WHEELS",
  },
  {
    image: banner3,
    title: "Turbo Charged Deals.",
    subtitle: "Ignite Your Garage.",
    description: "Limited edition drops. Grab before they vanish.",
    buttonText: "Discover Now",
    buttonLink: "/shop",
    brandName: "ANUP WHEELS",
  },
];

export default function HeroSlider() {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative mx-auto max-w-7xl px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 lg:py-12">
      <Swiper
        modules={[Autoplay, Pagination]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={900}
        loop
        grabCursor
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet !bg-white/40 !w-2 !h-2 sm:!w-3 sm:!h-3",
          bulletActiveClass: "swiper-pagination-bullet-active !bg-primary",
        }}
        className="h-[350px] sm:h-[450px] md:h-[550px] lg:h-[600px] rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl lg:shadow-2xl"
      >
        {slideContents.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              <Image
                src={slide.image}
                alt={`Slide ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80 sm:from-black/70 sm:via-black/40 sm:to-black/70" />

              <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 md:px-10 lg:px-12">
                <div className="max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl text-center text-white">
                  {activeIndex === index && (
                    <div key={activeIndex} className="animate-wrapper">
                      <h2 className="brand">
                        {slide.brandName}
                      </h2>

                      <h1 className="title">
                        <span className="block main-title">
                          {slide.title}
                        </span>
                        <span className="block subtitle">
                          {slide.subtitle}
                        </span>
                      </h1>

                      <p className="description">
                        {slide.description}
                      </p>

                      <Button
                        asChild
                        size="lg"
                        className="cta group"
                      >
                        <Link href={slide.buttonLink}>
                          {slide.buttonText}
                          <ArrowRight className="ml-2 sm:ml-3 h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-2" />
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Nav Buttons - Hidden on mobile, visible on tablet+ */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="nav-left"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
      </button>

      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="nav-right"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
      </button>

      <style jsx global>{`
        /* Brand Name */
        .brand {
          margin-bottom: 0.75rem;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: hsl(var(--primary));
          animation: slideInFromLeft 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          animation-delay: 0.1s;
          opacity: 0;
        }

        @media (min-width: 640px) {
          .brand {
            margin-bottom: 1rem;
            font-size: 0.75rem;
            letter-spacing: 0.25em;
          }
        }

        @media (min-width: 768px) {
          .brand {
            margin-bottom: 1.25rem;
            font-size: 0.85rem;
            letter-spacing: 0.3em;
          }
        }

        @media (min-width: 1024px) {
          .brand {
            margin-bottom: 1.5rem;
            font-size: 0.95rem;
          }
        }

        /* Title Container */
        .title {
          margin-bottom: 1rem;
          font-weight: 900;
          text-transform: uppercase;
          font-size: 1.5rem;
          line-height: 1.1;
        }

        @media (min-width: 640px) {
          .title {
            margin-bottom: 1.25rem;
            font-size: 2rem;
          }
        }

        @media (min-width: 768px) {
          .title {
            margin-bottom: 1.5rem;
            font-size: 2.25rem;
          }
        }

        @media (min-width: 1024px) {
          .title {
            font-size: 2.75rem;
          }
        }

        @media (min-width: 1280px) {
          .title {
            font-size: 3rem;
          }
        }

        /* Main Title - Drifting Animation */
        .main-title {
          animation: driftInSmooth 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          animation-delay: 0.3s;
          opacity: 0;
          display: inline-block;
        }

        /* Subtitle */
        .subtitle {
          color: hsl(var(--primary));
          text-shadow: 0 0 15px hsl(var(--primary) / 0.5);
          animation: glowFadeIn 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          animation-delay: 0.7s;
          opacity: 0;
          display: inline-block;
        }

        @media (min-width: 768px) {
          .subtitle {
            text-shadow: 0 0 20px hsl(var(--primary) / 0.6);
          }
        }

        /* Description */
        .description {
          margin-bottom: 1.5rem;
          font-size: 0.875rem;
          line-height: 1.5;
          animation: fadeSlideUp 0.8s ease-out forwards;
          animation-delay: 1s;
          opacity: 0;
          max-width: 90%;
          margin-left: auto;
          margin-right: auto;
        }

        @media (min-width: 640px) {
          .description {
            margin-bottom: 2rem;
            font-size: 1rem;
          }
        }

        @media (min-width: 768px) {
          .description {
            font-size: 1.1rem;
          }
        }

        @media (min-width: 1024px) {
          .description {
            margin-bottom: 2.5rem;
            font-size: 1.15rem;
          }
        }

        /* CTA Button */
        .cta {
          background: hsl(var(--primary));
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 0.75rem 1.5rem;
          font-size: 0.75rem;
          animation: scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          animation-delay: 1.3s;
          opacity: 0;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @media (min-width: 640px) {
          .cta {
            padding: 0.875rem 1.75rem;
            font-size: 0.85rem;
            letter-spacing: 0.75px;
          }
        }

        @media (min-width: 768px) {
          .cta {
            padding: 1rem 2rem;
            font-size: 0.9rem;
            letter-spacing: 1px;
          }
        }

        .cta:hover {
          box-shadow: 0 0 25px hsl(var(--primary) / 0.6);
          transform: scale(1.05);
        }

        @media (min-width: 768px) {
          .cta:hover {
            box-shadow: 0 0 30px hsl(var(--primary) / 0.7);
            transform: scale(1.08);
          }
        }

        /* Navigation Buttons */
        .nav-left,
        .nav-right {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 20;
          background: rgba(0, 0, 0, 0.5);
          padding: 8px;
          border-radius: 9999px;
          color: white;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: none;
        }

        @media (min-width: 640px) {
          .nav-left,
          .nav-right {
            display: block;
            padding: 10px;
          }
        }

        @media (min-width: 768px) {
          .nav-left,
          .nav-right {
            padding: 12px;
          }
        }

        .nav-left {
          left: 0.5rem;
        }

        .nav-right {
          right: 0.5rem;
        }

        @media (min-width: 768px) {
          .nav-left {
            left: 1rem;
          }
          .nav-right {
            right: 1rem;
          }
        }

        .nav-left:hover,
        .nav-right:hover {
          background: hsl(var(--primary));
          transform: translateY(-50%) scale(1.1);
        }

        /* ========== ANIMATIONS ========== */

        /* Smooth Drifting Animation */
        @keyframes driftInSmooth {
          0% {
            opacity: 0;
            transform: translateX(-120px) translateY(-15px) rotate(-5deg) scale(0.9);
            filter: blur(4px);
          }
          40% {
            opacity: 0.6;
            transform: translateX(-30px) translateY(-5px) rotate(-2deg) scale(0.95);
            filter: blur(2px);
          }
          70% {
            transform: translateX(12px) translateY(2px) rotate(1deg) scale(1.02);
            filter: blur(0px);
          }
          85% {
            transform: translateX(-4px) translateY(-1px) rotate(-0.5deg) scale(1.01);
          }
          100% {
            opacity: 1;
            transform: translateX(0) translateY(0) rotate(0deg) scale(1);
            filter: blur(0px);
          }
        }

        /* Slide in from left with bounce */
        @keyframes slideInFromLeft {
          0% {
            opacity: 0;
            transform: translateX(-60px);
          }
          60% {
            transform: translateX(8px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Glow and fade in */
        @keyframes glowFadeIn {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
            text-shadow: 0 0 0px hsl(var(--primary) / 0);
          }
          50% {
            text-shadow: 0 0 30px hsl(var(--primary) / 0.8);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            text-shadow: 0 0 20px hsl(var(--primary) / 0.6);
          }
        }

        /* Fade and slide up */
        @keyframes fadeSlideUp {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Scale in with bounce */
        @keyframes scaleIn {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          60% {
            transform: scale(1.05) translateY(-3px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        /* Mobile-specific animation adjustments */
        @media (max-width: 639px) {
          @keyframes driftInSmooth {
            0% {
              opacity: 0;
              transform: translateX(-80px) translateY(-10px) rotate(-3deg) scale(0.92);
              filter: blur(3px);
            }
            50% {
              opacity: 0.7;
              transform: translateX(-15px) translateY(-3px) rotate(-1deg) scale(0.97);
              filter: blur(1px);
            }
            75% {
              transform: translateX(8px) translateY(1px) rotate(0.5deg) scale(1.01);
            }
            100% {
              opacity: 1;
              transform: translateX(0) translateY(0) rotate(0deg) scale(1);
              filter: blur(0px);
            }
          }
        }

        /* Swiper pagination custom styles for responsiveness */
        .swiper-pagination {
          bottom: 0.75rem !important;
        }

        @media (min-width: 640px) {
          .swiper-pagination {
            bottom: 1rem !important;
          }
        }

        @media (min-width: 768px) {
          .swiper-pagination {
            bottom: 1.25rem !important;
          }
        }
      `}</style>
    </div>
  );
}