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
  return lastSpace > 80
    ? truncated.substring(0, lastSpace) + "..."
    : truncated + "...";
}

export default function AnimatedShopProduct({
  product,
}: AnimatedShopProductProps) {
  const mainImage = product.media?.mainMedia?.image;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/products/${product.slug}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative block h-full"
    >
      <div
        className={`/* ── Dark theme (default) ── */ /* ── Light theme ── */ relative h-full overflow-hidden rounded-lg border-2 border-zinc-700 bg-gradient-to-br from-zinc-900 via-zinc-800 to-black shadow-[0_8px_30px_rgb(0,0,0,0.6)] transition-all duration-500 hover:border-red-600/50 hover:shadow-[0_20px_60px_rgba(220,38,38,0.4)] [html:not(.dark)_&]:border-slate-200 [html:not(.dark)_&]:bg-gradient-to-br [html:not(.dark)_&]:from-white [html:not(.dark)_&]:via-slate-50 [html:not(.dark)_&]:to-slate-100 [html:not(.dark)_&]:shadow-[0_8px_30px_rgba(0,0,0,0.12)] [html:not(.dark)_&]:hover:border-red-500/60 [html:not(.dark)_&]:hover:shadow-[0_20px_60px_rgba(220,38,38,0.25)]`}
      >
        {/* Metallic shine sweep */}
        <div
          className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent transition-transform duration-700 dark:bg-gradient-to-tr dark:from-transparent dark:via-white/5 dark:to-transparent ${isHovered ? "translate-x-full" : "-translate-x-full"} `}
        />

        {/* Top-right decorative corner plate */}
        <div className="clip-diagonal absolute right-0 top-0 z-0 h-24 w-24 bg-gradient-to-br from-zinc-600 via-zinc-700 to-zinc-900 opacity-30 dark:from-zinc-600 dark:via-zinc-700 dark:to-zinc-900 [html:not(.dark)_&]:from-slate-200 [html:not(.dark)_&]:via-slate-300 [html:not(.dark)_&]:to-slate-400" />

        {/* ── Image container ── */}
        <div className="relative aspect-square overflow-hidden">
          {/* Garage floor texture lines */}
          <div className="absolute inset-0 z-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(255,255,255,0.03)_2px,rgba(255,255,255,0.03)_4px)] dark:bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(255,255,255,0.03)_2px,rgba(255,255,255,0.03)_4px)] [html:not(.dark)_&]:bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

          {/* Product image with scale+rotate on hover */}
          <div
            className={`relative h-full w-full transition-all duration-700 ${isHovered ? "rotate-2 scale-110" : "scale-100"}`}
          >
            <WixImage
              mediaIdentifier={mainImage?.url}
              alt={mainImage?.altText || product.name}
              width={700}
              height={700}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Vignette overlay */}
          <div
            className={`dark:bg-gradient-radial bg-gradient-radial absolute inset-0 from-transparent via-transparent to-white/60 transition-opacity duration-500 dark:from-transparent dark:via-transparent dark:to-black/80 ${isHovered ? "opacity-0" : "opacity-60"} `}
          />

          {/* Red glow from bottom on hover */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-red-600/40 via-transparent to-transparent transition-opacity duration-500 dark:from-red-700/40 [html:not(.dark)_&]:from-red-500/30 ${isHovered ? "opacity-100" : "opacity-0"} `}
          />

          {/* Speed streaks — red theme */}
          <div
            className={`absolute left-0 top-1/2 h-0.5 bg-gradient-to-r from-red-600 to-transparent transition-all duration-300 ${isHovered ? "w-full opacity-80" : "w-0 opacity-0"}`}
          />
          <div
            className={`absolute left-0 top-1/2 mt-4 h-0.5 bg-gradient-to-r from-rose-500 to-transparent transition-all delay-100 duration-300 ${isHovered ? "w-3/4 opacity-60" : "w-0 opacity-0"}`}
          />
          <div
            className={`absolute left-0 top-1/2 mt-8 h-0.5 bg-gradient-to-r from-red-400 to-transparent transition-all delay-200 duration-300 ${isHovered ? "w-1/2 opacity-40" : "w-0 opacity-0"}`}
          />

          {/* Tire smoke */}
          <div
            className={`absolute bottom-0 left-1/4 h-32 w-32 rounded-full blur-3xl transition-all duration-500 dark:bg-white/10 [html:not(.dark)_&]:bg-red-200/40 ${isHovered ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"} `}
          />

          {/* Badges */}
          <div className="absolute left-3 top-3 z-30 flex flex-col gap-2">
            {product.ribbon && (
              <Badge className="border-none bg-gradient-to-r from-red-700 to-rose-700 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                {product.ribbon}
              </Badge>
            )}
            {product.discount && <DiscountBadge data={product.discount} />}
          </div>

          {/* Specs panel — slides up on hover */}
          <div
            className={`absolute inset-x-0 bottom-0 p-6 transition-transform duration-500 ${isHovered ? "translate-y-0" : "translate-y-full"} [html:not(.dark)_&]:from-slate-50/98 bg-gradient-to-t from-white/95 via-white/90 to-transparent dark:bg-gradient-to-t dark:from-black dark:via-black/95 dark:to-transparent [html:not(.dark)_&]:via-slate-50/90`}
          >
            <div className="space-y-2">
              <h4 className="text-lg font-black uppercase tracking-wider text-red-700 dark:text-red-500">
                {product.name}
              </h4>
              <p className="font-mono text-sm leading-relaxed text-slate-500 dark:text-zinc-400">
                {getCleanDescription(product?.description ?? undefined)}
              </p>

              {/* Spec bars */}
              <div className="space-y-1 pt-2">
                {[
                  {
                    label: "SPEED",
                    pct: "85%",
                    from: "from-red-600",
                    to: "to-rose-600",
                    delay: "delay-200",
                  },
                  {
                    label: "RARITY",
                    pct: "70%",
                    from: "from-green-400",
                    to: "to-green-600",
                    delay: "delay-300",
                  },
                  {
                    label: "VALUE",
                    pct: "90%",
                    from: "from-yellow-500",
                    to: "to-yellow-600",
                    delay: "delay-400",
                  },
                ].map(({ label, pct, from, to, delay }) => (
                  <div key={label} className="flex items-center gap-2 text-xs">
                    <span className="w-16 text-slate-400 dark:text-zinc-500">
                      {label}
                    </span>
                    <div className="h-1 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-zinc-800">
                      <div
                        className={`h-full bg-gradient-to-r ${from} ${to} transition-all duration-1000 ${delay}`}
                        style={{ width: isHovered ? pct : "0%" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom: title + price ── */}
        <div className="relative border-t border-slate-200 bg-gradient-to-b from-white to-slate-50 p-5 transition-colors duration-300 dark:border-zinc-700/50 dark:bg-gradient-to-b dark:from-zinc-900 dark:to-black">
          {/* Dot-grid background accent */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#000_1px,transparent_1px)] bg-[size:20px_20px] opacity-5 dark:bg-[radial-gradient(circle_at_center,_#fff_1px,transparent_1px)]" />

          <div className="relative flex items-center justify-between">
            <h3 className="flex-1 truncate text-base font-black uppercase tracking-wide text-slate-800 transition-colors duration-300 group-hover:text-red-700 dark:text-white dark:group-hover:text-red-500">
              {product.name}
            </h3>

            {/* Price badge */}
            <div className="relative ml-3">
              <div className="absolute inset-0 bg-gradient-to-br from-red-700 to-rose-800 opacity-50 blur-md" />
              <Badge className="relative border-2 border-red-400/30 bg-gradient-to-br from-red-700 via-red-600 to-rose-700 px-4 py-1.5 text-sm font-black text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]">
                {getFormattedPrice(product)}
              </Badge>
            </div>
          </div>

          {/* Racing stripe — red */}
          <div
            className={`mt-3 h-1 rounded-full bg-gradient-to-r from-red-700 via-rose-600 to-transparent transition-all duration-500 ${isHovered ? "w-full" : "w-0"}`}
          />
        </div>

        {/* Corner bolts */}
        {[
          "top-2 left-2",
          "top-2 right-2",
          "bottom-2 left-2",
          "bottom-2 right-2",
        ].map((pos) => (
          <div
            key={pos}
            className={`absolute ${pos} h-2 w-2 rounded-full bg-slate-300 shadow-inner dark:bg-zinc-600`}
          />
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
