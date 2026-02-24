import { useQuickBuy } from "@/hooks/checkout";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/wix";
import { CreditCardIcon } from "lucide-react";
import LoadingButton from "./LoadingButton";
import { ButtonProps } from "./ui/button";

interface BuyNowButtonProps extends ButtonProps {
  product: Product;
  quantity: number;
  selectedOptions: Record<string, string>;
}

export default function BuyNowButton({
  product,
  quantity,
  selectedOptions,
  className,
  ...props
}: BuyNowButtonProps) {
  const { startCheckoutFlow, pending } = useQuickBuy();

  return (
    <LoadingButton
      onClick={() => startCheckoutFlow({ product, quantity, selectedOptions })}
      loading={pending}
      variant="secondary"
      className={cn(
  `
  group relative flex items-center justify-center gap-3
  rounded-xl px-8 py-4
  text-lg font-semibold uppercase tracking-wide
  bg-[#111111] text-white
  border border-white/10
  transition-all duration-300
  hover:-translate-y-1
  hover:border-primary
  hover:bg-[#1a1a1a]
  hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)]
  active:scale-95
  `,
  className
)}
      {...props}
    >
      <CreditCardIcon />
      Buy now
    </LoadingButton>
  );
}
