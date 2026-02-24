"use client";

import DiscountBadge from "@/components/DiscountBadge";
import Badge from "@/components/ui/badge";
import WixImage from "@/components/WixImage";
import { formatCurrency } from "@/lib/utils";
import type { Product } from "@/types/wix";
import Link from "next/link";
import { useState } from "react";

interface AnimatedShopProductProps {
  product: Product;
}

function getCleanDescription(htmlDescription: string | undefined): string {
  if (!htmlDescription) {
    return "Premium die-cast collectible with exceptional detail and authentic design.";
  }
  const cleanText = htmlDescription.replace(/<[^>]*>/g, "").trim();
  if (cleanText.length <= 100) return cleanText;
  const truncated = cleanText.substring(0, 100);
  const lastSpace = truncated.lastIndexOf(" ");
  return lastSpace > 80 ? truncated.substring(0, lastSpace) + "..." : truncated + "...";
}

export default function AnimatedShopProduct({ product }: AnimatedShopProductProps) {
  const mainImage = product.media?.mainMedia?.image;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/products/${product.slug}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative block h-full"
    >
      {/*
        DARK:  zinc-900 → zinc-800 → black  (original)
        LIGHT: white → slate-50 → slate-100, borders slate-200, accents orange
      */}
      <div className={`
        relative h-full overflow-hidden rounded-lg border-2 shadow-[0_8px_30px_rgb(0,0,0,0.6)]
        transition-all duration-500

        /* ── Dark theme (default) ── */
        bg-gradient-to-br from-zinc-900 via-zinc-800 to-black
        border-zinc-700
        hover:shadow-[0_20px_60px_rgba(249,115,22,0.4)]
        hover:border-orange-500/50

        /* ── Light theme ── */
        dark:bg-gradient-to-br dark:from-zinc-900 dark:via-zinc-800 dark:to-black
        dark:border-zinc-700
        dark:hover:shadow-[0_20px_60px_rgba(249,115,22,0.4)]
        dark:hover:border-orange-500/50

        [html:not(.dark)_&]:bg-gradient-to-br
        [html:not(.dark)_&]:from-white
        [html:not(.dark)_&]:via-slate-50
        [html:not(.dark)_&]:to-slate-100
        [html:not(.dark)_&]:border-slate-200
        [html:not(.dark)_&]:shadow-[0_8px_30px_rgba(0,0,0,0.12)]
        [html:not(.dark)_&]:hover:shadow-[0_20px_60px_rgba(249,115,22,0.25)]
        [html:not(.dark)_&]:hover:border-orange-400/60
      `}>

        {/* Metallic shine sweep */}
        <div className={`
          absolute inset-0 transition-transform duration-700
          dark:bg-gradient-to-tr dark:from-transparent dark:via-white/5 dark:to-transparent
          bg-gradient-to-tr from-transparent via-white/30 to-transparent
          ${isHovered ? "translate-x-full" : "-translate-x-full"}
        `} />

        {/* Top-right decorative corner plate */}
        <div className="
          absolute top-0 right-0 w-24 h-24 opacity-30 clip-diagonal z-0
          bg-gradient-to-br from-zinc-600 via-zinc-700 to-zinc-900
          dark:from-zinc-600 dark:via-zinc-700 dark:to-zinc-900
          [html:not(.dark)_&]:from-slate-200 [html:not(.dark)_&]:via-slate-300 [html:not(.dark)_&]:to-slate-400
        " />

        {/* ── Image container ── */}
        <div className="relative aspect-square overflow-hidden">

          {/* Garage floor texture lines */}
          <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(255,255,255,0.03)_2px,rgba(255,255,255,0.03)_4px)] z-0
            dark:bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(255,255,255,0.03)_2px,rgba(255,255,255,0.03)_4px)]
            [html:not(.dark)_&]:bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]
          " />

          {/* Product image with scale+rotate on hover */}
          <div className={`relative h-full w-full transition-all duration-700 ${isHovered ? "scale-110 rotate-2" : "scale-100"}`}>
            <WixImage
              mediaIdentifier={mainImage?.url}
              alt={mainImage?.altText || product.name}
              width={700}
              height={700}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Vignette overlay (dark: dark vignette / light: subtle white vignette) */}
          <div className={`
            absolute inset-0 transition-opacity duration-500
            dark:bg-gradient-radial dark:from-transparent dark:via-transparent dark:to-black/80
            bg-gradient-radial from-transparent via-transparent to-white/60
            ${isHovered ? "opacity-0" : "opacity-60"}
          `} />

          {/* Orange glow from bottom on hover */}
          <div className={`
            absolute inset-0 bg-gradient-to-t from-orange-500/40 via-transparent to-transparent
            transition-opacity duration-500
            dark:from-orange-600/40
            [html:not(.dark)_&]:from-orange-400/30
            ${isHovered ? "opacity-100" : "opacity-0"}
          `} />

          {/* Speed streaks */}
          <div className={`absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-orange-500 to-transparent transition-all duration-300 ${isHovered ? "w-full opacity-80" : "w-0 opacity-0"}`} />
          <div className={`absolute top-1/2 left-0 h-0.5 mt-4 bg-gradient-to-r from-red-500 to-transparent transition-all duration-300 delay-100 ${isHovered ? "w-3/4 opacity-60" : "w-0 opacity-0"}`} />
          <div className={`absolute top-1/2 left-0 h-0.5 mt-8 bg-gradient-to-r from-yellow-500 to-transparent transition-all duration-300 delay-200 ${isHovered ? "w-1/2 opacity-40" : "w-0 opacity-0"}`} />

          {/* Tire smoke */}
          <div className={`
            absolute bottom-0 left-1/4 w-32 h-32 rounded-full blur-3xl
            transition-all duration-500
            dark:bg-white/10
            [html:not(.dark)_&]:bg-orange-200/40
            ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `} />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-30">
            {product.ribbon && (
              <Badge className="bg-gradient-to-r from-orange-600 to-red-600 text-white border-none shadow-lg font-bold tracking-wider uppercase text-xs">
                {product.ribbon}
              </Badge>
            )}
            {product.discount && <DiscountBadge data={product.discount} />}
          </div>

          {/* Specs panel — slides up on hover */}
          <div className={`
            absolute inset-x-0 bottom-0 p-6 transition-transform duration-500
            ${isHovered ? "translate-y-0" : "translate-y-full"}
            dark:bg-gradient-to-t dark:from-black dark:via-black/95 dark:to-transparent
            bg-gradient-to-t from-white/95 via-white/90 to-transparent
            [html:not(.dark)_&]:from-slate-50/98 [html:not(.dark)_&]:via-slate-50/90
          `}>
            <div className="space-y-2">
              <h4 className="
                font-black text-lg tracking-wider uppercase
                dark:text-orange-500
                text-orange-600
              ">
                {product.name}
              </h4>
              <p className="
                text-sm leading-relaxed font-mono
                dark:text-zinc-400
                text-slate-500
              ">
                {getCleanDescription(product?.description ?? undefined)}
              </p>

              {/* Spec bars */}
              <div className="space-y-1 pt-2">
                {[
                  { label: "SPEED",  pct: "85%",  from: "from-orange-500", to: "to-red-500",     delay: "delay-200" },
                  { label: "RARITY", pct: "70%",  from: "from-yellow-500", to: "to-orange-500",  delay: "delay-300" },
                  { label: "VALUE",  pct: "90%",  from: "from-green-500",  to: "to-emerald-500", delay: "delay-400" },
                ].map(({ label, pct, from, to, delay }) => (
                  <div key={label} className="flex items-center gap-2 text-xs">
                    <span className="dark:text-zinc-500 text-slate-400 w-16">{label}</span>
                    <div className="flex-1 h-1 rounded-full overflow-hidden dark:bg-zinc-800 bg-slate-200">
                      <div className={`h-full bg-gradient-to-r ${from} ${to} transition-all duration-1000 ${delay} ${isHovered ? `w-[${pct}]` : "w-0"}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom: title + price ── */}
        <div className="
          relative p-5 border-t transition-colors duration-300
          dark:bg-gradient-to-b dark:from-zinc-900 dark:to-black dark:border-zinc-700/50
          bg-gradient-to-b from-white to-slate-50 border-slate-200
        ">
          {/* Dot-grid background accent */}
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_#000_1px,transparent_1px)] bg-[size:20px_20px]
            dark:bg-[radial-gradient(circle_at_center,_#fff_1px,transparent_1px)]
          " />

          <div className="relative flex items-center justify-between">
            <h3 className="
              font-black text-base tracking-wide uppercase flex-1 truncate
              transition-colors duration-300
              dark:text-white dark:group-hover:text-orange-500
              text-slate-800 group-hover:text-orange-600
            ">
              {product.name}
            </h3>

            {/* Price badge */}
            <div className="relative ml-3">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-red-700 blur-md opacity-50" />
              <Badge className="relative bg-gradient-to-br from-orange-600 via-orange-500 to-red-600 text-white border-2 border-orange-400/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] font-black text-sm px-4 py-1.5">
                {getFormattedPrice(product)}
              </Badge>
            </div>
          </div>

          {/* Racing stripe */}
          <div className={`h-1 bg-gradient-to-r from-orange-600 via-red-600 to-transparent rounded-full mt-3 transition-all duration-500 ${isHovered ? "w-full" : "w-0"}`} />
        </div>

        {/* Corner bolts */}
        {["top-2 left-2", "top-2 right-2", "bottom-2 left-2", "bottom-2 right-2"].map((pos) => (
          <div key={pos} className={`absolute ${pos} w-2 h-2 rounded-full shadow-inner dark:bg-zinc-600 bg-slate-300`} />
        ))}
      </div>
    </Link>
  );
}

function getFormattedPrice(product: Product) {
  const minPrice = product.priceRange?.minValue;
  const maxPrice = product.priceRange?.maxValue;

  if (minPrice && maxPrice && minPrice !== maxPrice) {
    return `from ${formatCurrency(minPrice, product.priceData?.currency)}`;
  }
  return (
    product.priceData?.formatted?.discountedPrice ||
    product.priceData?.formatted?.price ||
    "N/A"
  );
}