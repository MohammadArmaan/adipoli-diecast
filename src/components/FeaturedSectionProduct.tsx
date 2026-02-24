import { formatCurrency } from "@/lib/utils";
import type { Product } from "@/types/wix";
import Link from "next/link";
import DiscountBadge from "./DiscountBadge";
import WixImage from "./WixImage";
import Badge from "./ui/badge";
import Image from "next/image";
import CarAnimate from "@/assets/car-animate.png";

interface FeaturedSectionProductProps {
  product: Product;
}

export default function FeaturedSectionProduct({
  product,
}: FeaturedSectionProductProps) {
  const mainImage = product.media?.mainMedia?.image;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative block h-full"
    >
      {/*
        DARK:  zinc-900 → zinc-800 → black   (original)
        LIGHT: white → slate-50 → slate-100, orange accents preserved
      */}
      <div className="
        relative h-full overflow-hidden rounded-lg border-2 transition-all duration-500

        /* Dark (default) */
        bg-gradient-to-br from-zinc-900 via-zinc-800 to-black
        border-zinc-700
        shadow-[0_8px_30px_rgb(0,0,0,0.6)]
        hover:shadow-[0_20px_60px_rgba(249,115,22,0.4)]
        hover:border-orange-500/50

        /* Light */
        dark:bg-gradient-to-br dark:from-zinc-900 dark:via-zinc-800 dark:to-black
        dark:border-zinc-700
        dark:shadow-[0_8px_30px_rgb(0,0,0,0.6)]
        dark:hover:shadow-[0_20px_60px_rgba(249,115,22,0.4)]
        dark:hover:border-orange-500/50

        [html:not(.dark)_&]:bg-gradient-to-br
        [html:not(.dark)_&]:from-white
        [html:not(.dark)_&]:via-slate-50
        [html:not(.dark)_&]:to-slate-100
        [html:not(.dark)_&]:border-slate-200
        [html:not(.dark)_&]:shadow-[0_8px_30px_rgba(0,0,0,0.10)]
        [html:not(.dark)_&]:hover:shadow-[0_20px_60px_rgba(249,115,22,0.22)]
        [html:not(.dark)_&]:hover:border-orange-400/60
      ">

        {/* Metallic shine sweep */}
        <div className="
          absolute inset-0 z-10 transition-transform duration-700
          bg-gradient-to-tr from-transparent via-white/5 to-transparent
          group-hover:translate-x-full -translate-x-full
          [html:not(.dark)_&]:via-white/40
        " />

        {/* Top-right corner plate */}
        <div className="
          absolute top-0 right-0 w-24 h-24 opacity-30 clip-diagonal z-0
          bg-gradient-to-br from-zinc-600 via-zinc-700 to-zinc-900
          [html:not(.dark)_&]:from-slate-200 [html:not(.dark)_&]:via-slate-300 [html:not(.dark)_&]:to-slate-400
        " />

        {/* ── Image container ── */}
        <div className="relative aspect-square overflow-hidden">

          {/* Animated road background */}
          <div className="absolute inset-0 z-0">
            {/* Asphalt / surface */}
            <div className="
              absolute inset-0
              bg-zinc-950
              [html:not(.dark)_&]:bg-slate-100
            " />

            {/* Road lines */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              {/* Centre dashed line */}
              <div className="absolute top-0 left-1/2 w-1 h-full -translate-x-1/2 opacity-0 group-hover:opacity-60 transition-opacity duration-300">
                <div className="road-dashes h-full bg-yellow-400 [html:not(.dark)_&]:bg-yellow-500" />
              </div>
              {/* Left edge */}
              <div className="absolute top-0 left-[15%] w-0.5 h-full opacity-0 group-hover:opacity-40 transition-opacity duration-300">
                <div className="road-line h-full bg-white [html:not(.dark)_&]:bg-slate-400" />
              </div>
              {/* Right edge */}
              <div className="absolute top-0 right-[15%] w-0.5 h-full opacity-0 group-hover:opacity-40 transition-opacity duration-300">
                <div className="road-line h-full bg-white [html:not(.dark)_&]:bg-slate-400" />
              </div>

              {/* Speed lines */}
              <div className="speed-lines-container absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="speed-line absolute top-[20%] left-0 h-0.5 w-full bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
                <div className="speed-line absolute top-[40%] left-0 h-0.5 w-full bg-gradient-to-r from-transparent via-red-500/20 to-transparent animation-delay-150" />
                <div className="speed-line absolute top-[60%] left-0 h-0.5 w-full bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent animation-delay-300" />
                <div className="speed-line absolute top-[80%] left-0 h-0.5 w-full bg-gradient-to-r from-transparent via-orange-500/30 to-transparent animation-delay-450" />
              </div>
            </div>

            {/* Road depth gradient */}
            <div className="
              absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
              bg-gradient-to-b from-transparent via-transparent to-zinc-950/50
              [html:not(.dark)_&]:to-slate-200/60
            " />
          </div>

          {/* Product image — drifts on hover */}
          <div className="relative z-10 h-full w-full transition-all duration-700 group-hover:scale-95 group-hover:-rotate-3 group-hover:translate-x-4">
            <WixImage
              mediaIdentifier={mainImage?.url}
              alt={mainImage?.altText || product.name}
              width={700}
              height={700}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Drift smoke */}
          <div className="
            absolute bottom-10 left-1/4 w-40 h-40 rounded-full blur-3xl z-[5]
            bg-white/20
            [html:not(.dark)_&]:bg-orange-200/30
            transition-all duration-700 opacity-0
            group-hover:opacity-60 group-hover:translate-x-8
          " />
          <div className="
            absolute bottom-5 left-1/3 w-32 h-32 rounded-full blur-2xl z-[5]
            bg-orange-500/20
            [html:not(.dark)_&]:bg-orange-300/25
            transition-all duration-700 delay-100 opacity-0
            group-hover:opacity-40 group-hover:translate-x-12
          " />

          {/* Skid marks */}
          <div className="
            absolute bottom-16 left-10 w-32 h-1 rounded-full blur-sm rotate-12 z-[5]
            bg-zinc-800/80
            [html:not(.dark)_&]:bg-slate-400/60
            transition-all duration-500 opacity-0 group-hover:opacity-100
          " />
          <div className="
            absolute bottom-12 left-16 w-28 h-1 rounded-full blur-sm rotate-12 z-[5]
            bg-zinc-700/60
            [html:not(.dark)_&]:bg-slate-400/40
            transition-all duration-500 delay-100 opacity-0 group-hover:opacity-80
          " />

          {/* Drift car overlay */}
          <div className="absolute inset-0 z-20 pointer-events-none transition-all duration-700 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-full">
            <Image
              src={CarAnimate}
              alt="Drifting Car"
              fill
              className="object-contain drop-shadow-[0_0_30px_rgba(249,115,22,0.6)]"
            />
          </div>

          {/* Headlight beams */}
          <div className="absolute top-1/2 left-0 w-full h-32 -translate-y-1/2 opacity-0 group-hover:opacity-30 transition-opacity duration-500 z-[15]">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/0 via-yellow-200/40 to-yellow-200/0 blur-xl transform -skew-y-12" />
          </div>

          {/* Sparks */}
          <div className="absolute top-1/3 right-1/4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
            <div className="spark w-1 h-1 bg-yellow-400 rounded-full shadow-[0_0_8px_rgba(250,204,21,0.8)]" />
          </div>
          <div className="absolute top-1/2 right-1/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 z-20">
            <div className="spark w-1.5 h-1.5 bg-orange-400 rounded-full shadow-[0_0_10px_rgba(251,146,60,0.8)]" />
          </div>
          <div className="absolute top-2/3 right-[40%] opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200 z-20">
            <div className="spark w-1 h-1 bg-red-400 rounded-full shadow-[0_0_8px_rgba(248,113,113,0.8)]" />
          </div>

          {/* Vignette */}
          <div className="
            absolute inset-0 z-[15] transition-opacity duration-500 group-hover:opacity-40
            bg-gradient-radial from-transparent via-transparent to-black/80
            [html:not(.dark)_&]:to-white/60
          " />

          {/* Orange underglow */}
          <div className="
            absolute inset-0 z-[15] transition-opacity duration-500 opacity-0 group-hover:opacity-100
            bg-gradient-to-t from-orange-600/40 via-transparent to-transparent
            [html:not(.dark)_&]:from-orange-400/25
          " />

          {/* Badges */}
          <div className="absolute left-3 top-3 z-30 flex flex-col gap-2">
            {product.ribbon && (
              <Badge className="bg-gradient-to-r from-orange-600 to-red-600 text-white border-none shadow-lg font-bold tracking-wider uppercase text-xs">
                {product.ribbon}
              </Badge>
            )}
            {product.discount && <DiscountBadge data={product.discount} />}
          </div>

          {/* Price badge */}
          <div className="absolute bottom-3 right-3 z-30">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-red-700 blur-md opacity-50" />
              <Badge className="relative bg-gradient-to-br from-orange-600 via-orange-500 to-red-600 text-white border-2 border-orange-400/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] font-black text-sm px-4 py-1.5">
                {getFormattedPrice(product)}
              </Badge>
            </div>
          </div>
        </div>

        {/* ── Bottom: title ── */}
        <div className="
          relative p-5 border-t z-20 transition-colors duration-300
          bg-gradient-to-b from-zinc-900 to-black border-zinc-700/50
          [html:not(.dark)_&]:bg-gradient-to-b
          [html:not(.dark)_&]:from-white
          [html:not(.dark)_&]:to-slate-50
          [html:not(.dark)_&]:border-slate-200
        ">
          {/* Dot-grid accent */}
          <div className="
            absolute inset-0 opacity-5
            bg-[radial-gradient(circle_at_center,_#fff_1px,transparent_1px)] bg-[size:20px_20px]
            [html:not(.dark)_&]:bg-[radial-gradient(circle_at_center,_#000_1px,transparent_1px)]
          " />

          <div className="relative">
            <h3 className="
              font-black text-base tracking-wide uppercase text-center transition-colors duration-300
              text-white group-hover:text-orange-500
              [html:not(.dark)_&]:text-slate-800 [html:not(.dark)_&]:group-hover:text-orange-600
            ">
              {product.name}
            </h3>

            {/* Racing stripe */}
            <div className="h-1 bg-gradient-to-r from-transparent via-orange-600 to-transparent rounded-full mt-3 transition-all duration-500 opacity-0 group-hover:opacity-100 mx-auto w-0 group-hover:w-3/4" />
          </div>
        </div>

        {/* Corner bolts */}
        {(["top-2 left-2", "top-2 right-2", "bottom-2 left-2", "bottom-2 right-2"] as const).map((pos) => (
          <div
            key={pos}
            className={`absolute ${pos} w-2 h-2 rounded-full shadow-inner z-30 bg-zinc-600 [html:not(.dark)_&]:bg-slate-300`}
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