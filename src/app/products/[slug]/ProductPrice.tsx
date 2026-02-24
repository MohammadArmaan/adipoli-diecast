import DiscountBadge from "@/components/DiscountBadge";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/wix"; 


type Variant = NonNullable<Product["variants"]>[number];

interface ProductPriceProps {
  product: Product;
  selectedVariant: Variant | null;
}

export default function ProductPrice({
  product,
  selectedVariant,
}: ProductPriceProps) {
  const priceData = selectedVariant?.variant?.priceData ?? product.priceData;

  if (!priceData) return null;

  const hasDiscount = priceData.discountedPrice !== priceData.price;

  return (
    <div className="flex items-center gap-2.5 text-xl font-bold">
      <span className={cn(hasDiscount && "text-muted-foreground line-through")}>
        {priceData.formatted?.price}
      </span>

      {hasDiscount && <span>{priceData.formatted?.discountedPrice}</span>}

      {product.discount && <DiscountBadge data={product.discount} />}
    </div>
  );
}
