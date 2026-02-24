"use client";

import AddToCartButton from "@/components/AddToCartButton";
import BackInStockNotificationButton from "@/components/BackInStockNotificationButton";
import BuyNowButton from "@/components/BuyNowButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Badge from "@/components/ui/badge";
import {
  ShieldCheckIcon,
  TruckIcon,
  RefreshCwIcon,
  CheckCircleIcon,
  StarIcon,
  Flame,
} from "lucide-react";
import { checkInStock, findVariant } from "@/lib/utils";
import type { Product } from "@/types/wix"; 
import { useState } from "react";
import ProductMedia from "./ProductMedia";
import ProductOptions from "./ProductOptions";
import ProductPrice from "./ProductPrice";
import { Card } from "@/components/ui/card";
import Zoom from "react-medium-image-zoom";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);

  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >(
    product.productOptions
      ?.map((option) => ({
        [option.name || ""]: option.choices?.[0].description || "",
      }))
      ?.reduce((acc, curr) => ({ ...acc, ...curr }), {}) || {},
  );

  const selectedVariant = findVariant(product, selectedOptions);
  const inStock = checkInStock(product, selectedOptions);
  const availableQuantity =
    selectedVariant?.stock?.quantity ?? product.stock?.quantity;
  const availableQuantityExceeded =
    !!availableQuantity && quantity > availableQuantity;

  const selectedOptionsMedia = product.productOptions?.flatMap((option) => {
    const selectedChoice = option.choices?.find(
      (choice) => choice.description === selectedOptions[option.name || ""],
    );
    return selectedChoice?.media?.items ?? [];
  });

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 lg:px-8">
        {/* Mobile Layout - Stacked vertically */}
        <div className="space-y-6 lg:hidden">
          {/* Mobile Product Media */}
          <div className="rounded-lg bg-background p-4">
            <ProductMedia
              media={
                !!selectedOptionsMedia?.length
                  ? selectedOptionsMedia
                  : product.media?.items
              }
            />
          </div>

          {/* Mobile Product Details */}
          <div className="space-y-6 rounded-lg bg-background p-2">
            {/* Product Header */}
            <div className="space-y-3">
              <h1 className="text-3xl font-bold leading-tight text-foreground">
                {product.name}
              </h1>
              <div className="flex flex-col items-start gap-2">
                <ProductPrice
                  product={product}
                  selectedVariant={selectedVariant}
                />
                {product.ribbon && (
                  <Badge className="inline-flex rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1 text-sm font-medium text-white">
                    {product.ribbon}
                  </Badge>
                )}
              </div>
            </div>

            {/* Product Options */}
            <div className="space-y-4">
              <ProductOptions
                product={product}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
              />
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Label className="text-sm font-medium text-foreground">
                  QTY
                </Label>
                <div className="flex items-center rounded-md border border-gray-300 dark:border-gray-700">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-foreground hover:bg-gray-50 dark:hover:bg-gray-900"
                  >
                    -
                  </button>
                  <span className="min-w-[60px] border-x border-gray-300 px-4 py-2 text-center font-medium dark:border-gray-700">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-foreground hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900"
                  >
                    +
                  </button>
                </div>
              </div>

              {inStock ? (
                <>
                  <AddToCartButton
                    product={product}
                    selectedOptions={selectedOptions}
                    quantity={quantity}
                    disabled={availableQuantityExceeded || quantity < 1}
                    className="h-12 w-full rounded-md bg-primary font-semibold text-white hover:bg-primary/90"
                  />
                  <BuyNowButton
                    product={product}
                    selectedOptions={selectedOptions}
                    quantity={quantity}
                    disabled={availableQuantityExceeded || quantity < 1}
                    className="h-12 w-full text-base font-semibold"
                  />
                </>
              ) : (
                <BackInStockNotificationButton
                  product={product}
                  selectedOptions={selectedOptions}
                  className="h-12 w-full bg-primary text-white"
                />
              )}
            </div>
            {/* trust Signals - Mobile layout */}
            <div className="border-t border-white/10 pt-8">
              <h3 className="mb-6 text-center text-xl font-bold uppercase tracking-wide text-white">
                Why Collectors Choose Us
              </h3>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Authentic */}
                <div className="group flex flex-col items-center rounded-xl bg-card p-8 text-center shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_0_40px_hsl(var(--primary)/0.25)]">
                  

                  <ShieldCheckIcon className="mb-3 h-6 w-6 text-primary transition-transform duration-500 group-hover:scale-110" />
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-foreground">
                    100% Authentic
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Genuine die-cast collectibles
                  </p>
                  <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-primary transition-all duration-500 group-hover:w-full" />
                </div>

                {/* Limited Drops */}
                <div className="group flex flex-col items-center rounded-xl bg-card p-8 text-center shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_0_40px_hsl(var(--primary)/0.25)]">
                  

                  <Flame className="mb-3 h-6 w-6 text-primary transition-transform duration-500 group-hover:scale-110" />
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-foreground">
                    Limited Drops
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Rare & exclusive releases
                  </p>
                  <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-primary transition-all duration-500 group-hover:w-full" />
                </div>

                {/* Secure Checkout */}
                <div className="group flex flex-col items-center rounded-xl bg-card p-8 text-center shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_0_40px_hsl(var(--primary)/0.25)]">
                  
                  <CheckCircleIcon className="mb-3 h-6 w-6 text-primary transition-transform duration-500 group-hover:scale-110" />

                  <h4 className="text-sm font-semibold uppercase tracking-wide text-foreground">
                    Secure Checkout
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Safe & encrypted payment
                  </p>
                  <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-primary transition-all duration-500 group-hover:w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Side by side like the design */}
        <div className="hidden lg:block">
          <div className="overflow-hidden rounded-lg bg-background">
            <div className="grid grid-cols-2 gap-0">
              {/* LEFT SIDE - Media + Trust Signals */}
              <div className="flex flex-col gap-10 bg-background p-8">
                <ProductMedia
                  media={
                    !!selectedOptionsMedia?.length
                      ? selectedOptionsMedia
                      : product.media?.items
                  }
                />

                {/* Trust Signals - only visible on desktop */}
                <div className="border-t border-white/10 pt-8">
                  <h3 className="mb-6 text-center text-xl font-bold uppercase tracking-wide text-white">
                    Why Collectors Choose Us
                  </h3>

                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Authentic */}
                    <div className="group flex flex-col items-center rounded-xl bg-card p-8 text-center shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_0_40px_hsl(var(--primary)/0.25)]">
                      

                      <ShieldCheckIcon className="mb-3 h-6 w-6 text-primary transition-transform duration-500 group-hover:scale-110" />
                      <h4 className="text-sm font-semibold uppercase tracking-wide text-foreground">
                        100% Authentic
                      </h4>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Genuine die-cast collectibles
                      </p>
                      <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-primary transition-all duration-500 group-hover:w-full" />
                    </div>

                    {/* Limited Drops */}
                    <div className="group flex flex-col items-center rounded-xl bg-card p-8 text-center shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_0_40px_hsl(var(--primary)/0.25)]">
                      

                      <Flame className="mb-3 h-6 w-6 text-primary transition-transform duration-500 group-hover:scale-110" />
                      <h4 className="text-sm font-semibold uppercase tracking-wide text-foreground">
                        Limited Drops
                      </h4>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Rare & exclusive releases
                      </p>
                      <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-primary transition-all duration-500 group-hover:w-full" />
                    </div>

                    {/* Secure Checkout */}
                    <div className="group flex flex-col items-center rounded-xl bg-card p-8 text-center shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_0_40px_hsl(var(--primary)/0.25)]">
                      
                      <CheckCircleIcon className="mb-3 h-6 w-6 text-primary transition-transform duration-500 group-hover:scale-110" />

                      <h4 className="text-sm font-semibold uppercase tracking-wide text-foreground">
                        Secure Checkout
                      </h4>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Safe & encrypted payment
                      </p>
                      <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-primary transition-all duration-500 group-hover:w-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE - Product Details */}
              <div className="space-y-6 p-8">
                <div className="space-y-4">
                  <h1 className="text-6xl font-extrabold leading-tight text-foreground">
                    {product.name}
                  </h1>
                  <div className="flex items-center gap-2">
                    <ProductPrice
                      product={product}
                      selectedVariant={selectedVariant}
                    />
                    {product.ribbon && (
                      <Badge className="inline-flex rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1 text-sm font-medium text-white">
                        {product.ribbon}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Product Options */}
                <div className="space-y-4">
                  <ProductOptions
                    product={product}
                    selectedOptions={selectedOptions}
                    setSelectedOptions={setSelectedOptions}
                  />
                </div>

                {/* Quantity Selection */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Label className="text-sm font-medium text-foreground">
                      QTY
                    </Label>
                    <div className="flex items-center rounded-md border border-gray-300 bg-background dark:border-gray-700">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-2 font-medium text-foreground hover:bg-gray-50 dark:hover:bg-gray-900"
                      >
                        -
                      </button>
                      <span className="min-w-[60px] border-x border-gray-300 px-4 py-2 text-center font-medium dark:border-gray-700">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-2 font-medium text-foreground hover:bg-gray-50 dark:hover:bg-gray-900"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {!!availableQuantity &&
                    (availableQuantityExceeded || availableQuantity < 10) && (
                      <span className="text-sm font-medium text-red-600">
                        Only {availableQuantity} left in stock
                      </span>
                    )}
                </div>

                {/* Action Button */}
                <div className="flex flex-col gap-y-5 pt-4">
                  {inStock ? (
                    <>
                      <AddToCartButton
                        product={product}
                        selectedOptions={selectedOptions}
                        quantity={quantity}
                        disabled={availableQuantityExceeded || quantity < 1}
                        className="h-16 w-full rounded-md bg-primary text-base font-semibold text-white hover:bg-primary/90"
                      />
                      <BuyNowButton
                        product={product}
                        selectedOptions={selectedOptions}
                        quantity={quantity}
                        disabled={availableQuantityExceeded || quantity < 1}
                        className="h-16 w-full text-base font-semibold"
                      />
                    </>
                  ) : (
                    <BackInStockNotificationButton
                      product={product}
                      selectedOptions={selectedOptions}
                      className="h-12 w-full rounded-md bg-primary font-semibold text-white"
                    />
                  )}
                </div>

                {product.description && (
                  <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
                    <div
                      className="prose prose-sm max-w-none text-sm leading-relaxed text-foreground dark:prose-invert"
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
