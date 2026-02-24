import type { Product } from "@/types/wix"; 
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";

export const twConfig = resolveConfig(tailwindConfig);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatCurrency(
  price: number | string = 0,
  currency: string = "USD",
) {
  return Intl.NumberFormat("en", { style: "currency", currency }).format(
    Number(price),
  );
}

export function findVariant(
  product: Product,
  selectedOptions: Record<string, string>,
) {
  if (!product.manageVariants) return null;

  return (
    product.variants?.find((variant) => {
      return Object.entries(selectedOptions).every(
        ([key, value]) => variant.choices?.[key] === value,
      );
    }) || null
  );
}

export function checkInStock(
  product: Product,
  selectedOptions: Record<string, string>,
) {
  const variant = findVariant(product, selectedOptions);

  if (variant) {
    return (
      variant.stock?.quantity !== 0 &&
      variant.stock?.inStock === true
    );
  }

  return (
    product.stock?.inventoryStatus === "IN_STOCK" ||
    product.stock?.inventoryStatus === "PARTIALLY_OUT_OF_STOCK"
  );
}

export function formatDate(date: Date | string | null | undefined) {
  if (!date) return "";

  const dateObj = date instanceof Date ? date : new Date(date);

  if (isNaN(dateObj.getTime())) return "";

  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getReadingTime(richContent: any) {
  if (!richContent?.nodes) return 1;

  const text = richContent.nodes
    .map((node: any) => node.text || "")
    .join(" ");

  const words = text.trim().split(/\s+/).length;

  return Math.max(1, Math.ceil(words / 200)); // 200 words per min
}