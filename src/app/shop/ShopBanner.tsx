"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Banner from "@/assets/shop-banner.png";

const ShopBanner = () => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById("products");
    if (productsSection) {
      productsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="relative h-[720px] w-full overflow-hidden bg-[#0f0f0f] lg:h-[650px]">

      {/* Track Texture Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,hsl(var(--primary)/0.25),transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,#000000,#111111,#000000)] opacity-90" />

      {/* Moving Track Lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="track-lines" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 lg:flex-row lg:px-20">

        {/* LEFT SIDE */}
        <div className="max-w-2xl text-center lg:text-left">
          <h1 className="text-5xl font-extrabold uppercase tracking-wider text-white md:text-6xl lg:text-7xl">
            <span className="block text-primary drop-shadow-[0_0_25px_hsl(var(--primary)/0.8)]">
              UNLEASH
            </span>
            <span className="block">THE COLLECTION</span>
          </h1>

          <p className="mt-6 text-lg text-gray-300 md:text-xl">
            Premium die-cast legends. Limited drops. Built for true collectors.
          </p>

          <Button
            onClick={scrollToProducts}
            className="group mt-10 bg-primary px-10 py-5 text-lg font-bold uppercase tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_hsl(var(--primary)/0.7)]"
          >
            Explore Collection
          </Button>
        </div>

        {/* RIGHT SIDE - DRIFTING IMAGE */}
        <div className="relative mt-16 flex flex-1 justify-center lg:mt-0 lg:justify-end">
          <div className="relative h-[350px] w-[350px] lg:h-[450px] lg:w-[450px]">

            {/* Drift Smoke Glow */}
            <div className="absolute inset-0 animate-pulse rounded-full bg-[radial-gradient(circle,hsl(var(--primary)/0.35),transparent_70%)] blur-2xl" />

            {/* Car Image */}
            <Image
              src={Banner}
              alt="Anup Wheels Collection"
              fill
              priority
              className="object-contain drift-car-animation drop-shadow-[0_30px_40px_rgba(0,0,0,0.9)]"
            />

            {/* Flame Trail Effect */}
            <div className="absolute bottom-10 left-10 h-2 w-40 animate-flame bg-gradient-to-r from-primary via-orange-500 to-transparent blur-md" />
          </div>
        </div>
      </div>

      {/* Bottom Curved Cut */}
      <div className="absolute bottom-0 left-0 right-0 h-20">
        <svg
          className="h-full w-full fill-background"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path d="M0,120 C300,0 900,0 1200,120 L1200,120 L0,120 Z" />
        </svg>
      </div>

      {/* Animations */}
      <style jsx global>{`
        /* Track Lines Animation */
        .track-lines {
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.05) 0px,
            rgba(255, 255, 255, 0.05) 2px,
            transparent 2px,
            transparent 120px
          );
          animation: moveTrack 4s linear infinite;
          opacity: 0.2;
        }

        @keyframes moveTrack {
          0% { transform: translateX(0); }
          100% { transform: translateX(-120px); }
        }

        /* Drift Animation */
        .drift-car-animation {
          animation: driftFloat 4s ease-in-out infinite alternate;
        }

        @keyframes driftFloat {
          0% {
            transform: translateX(0) rotate(0deg);
          }
          50% {
            transform: translateX(-10px) rotate(-2deg);
          }
          100% {
            transform: translateX(10px) rotate(2deg);
          }
        }

        /* Flame Effect */
        @keyframes flameMove {
          0% { transform: translateX(0); opacity: 0.8; }
          100% { transform: translateX(40px); opacity: 0; }
        }

        .animate-flame {
          animation: flameMove 1.2s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default ShopBanner;