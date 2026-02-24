import { useAddItemToCart } from "@/hooks/cart";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/wix";
import { ShoppingCartIcon } from "lucide-react";
import LoadingButton from "./LoadingButton";
import { ButtonProps } from "./ui/button";

interface AddToCartButtonProps extends ButtonProps {
  product: Product;
  selectedOptions: Record<string, string>;
  quantity: number;
}

export default function AddToCartButton({
  product,
  selectedOptions,
  quantity,
  className,
  ...props
}: AddToCartButtonProps) {
  const mutation = useAddItemToCart();

  return (
    <LoadingButton
      onClick={() =>
        mutation.mutate({
          product,
          selectedOptions,
          quantity,
        })
      }
      loading={mutation.isPending}
      className={cn(
        `
        group relative flex items-center justify-center gap-3
        rounded-xl px-8 py-4
        text-lg font-extrabold uppercase tracking-wide
        text-white
        bg-gradient-to-r from-primary via-orange-500 to-primary
        shadow-lg
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-[0_0_40px_hsl(var(--primary)/0.8)]
        active:scale-95
        overflow-hidden
        `,
        className
      )}
      {...props}
    >
      {/* Shine effect */}
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-all duration-700 group-hover:translate-x-full group-hover:opacity-100" />

      <ShoppingCartIcon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />

      <span className="relative z-10">Add To Cart</span>
    </LoadingButton>
  );
}