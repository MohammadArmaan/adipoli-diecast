"use client";
import React from "react";

export default function ScrollingRibbon() {
  return (
    <div className="mx-auto max-w-7xl px-4">
      <div className="relative overflow-hidden rounded-lg border border-orange-500/40 shadow-[0_0_40px_hsl(var(--primary)/0.4)]">

        {/* ORANGE TRACK BACKGROUND */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-500" />

        {/* Plastic Shine Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.2),transparent)] opacity-40 animate-track-shine" />

        {/* Track Pattern (Center Strip) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30">
          <div className="w-full h-[4px] bg-black/60 relative">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,white,white_20px,transparent_20px,transparent_40px)] opacity-40 animate-lane-move" />
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="relative py-3 px-8">
          <div className="animate-marquee flex gap-12 whitespace-nowrap text-sm font-black uppercase tracking-[0.2em] text-black">

            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="inline-flex items-center gap-4">

                🏁 OFFICIAL DIE-CAST COLLECTION

                <span className="w-2 h-2 rounded-full bg-black" />

                🔥 LIMITED EDITION DROPS

                <span className="w-2 h-2 rounded-full bg-black" />

                ⚡ FAST SHIPPING PAN INDIA

                <span className="w-2 h-2 rounded-full bg-black" />

              </span>
            ))}

          </div>
        </div>

        {/* Subtle Bottom Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.3),transparent_70%)] opacity-30 pointer-events-none" />

      </div>

      <style jsx global>{`

        /* MARQUEE */
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        .animate-marquee {
          animation: marquee 18s linear infinite;
        }

        /* TRACK SHINE */
        @keyframes trackShine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .animate-track-shine {
          animation: trackShine 5s linear infinite;
        }

        /* LANE MOVE */
        @keyframes laneMove {
          0% { transform: translateX(0); }
          100% { transform: translateX(-40px); }
        }

        .animate-lane-move {
          animation: laneMove 1.5s linear infinite;
        }

      `}</style>
    </div>
  );
}