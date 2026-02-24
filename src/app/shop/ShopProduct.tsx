import DiscountBadge from "@/components/DiscountBadge";
import Badge from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import WixImage from "@/components/WixImage";
import { formatCurrency } from "@/lib/utils";
import type { Product } from "@wix/stores_products";
import Link from "next/link";

interface ShopProductProps {
  product: Product;
}

export default function ShopProduct({ product }: ShopProductProps) {
  const mainImage = product.media?.mainMedia?.image;

  return (
    <Link href={`/products/${product.slug}`}>
      <Card>
        <div className="relative overflow-hidden">
          <WixImage
            mediaIdentifier={mainImage?.url}
            alt={mainImage?.altText}
            width={700}
            height={700}
            className="rounded-xl bg-white/20 transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute bottom-3 right-3 flex flex-wrap items-center gap-2">
            {product.ribbon && <Badge>{product.ribbon}</Badge>}
            {product.discount && <DiscountBadge data={product.discount} />}
            <Badge className="bg-secondary font-semibold text-secondary-foreground">
              {getFormattedPrice(product)}
            </Badge>
          </div>
        </div>
        <div className="space-y-3 p-3">
          <h3 className="text-center text-lg font-extrabold">{product.name}</h3>
        </div>
      </Card>
    </Link>
  );
}

function getFormattedPrice(product: Product) {
  const minPrice = product.priceRange?.minValue;
  const maxPrice = product.priceRange?.maxValue;

  if (minPrice && maxPrice && minPrice !== maxPrice) {
    return `from ${formatCurrency(minPrice, product.priceData?.currency)}`;
  } else {
    return (
      product.priceData?.formatted?.discountedPrice ||
      product.priceData?.formatted?.price ||
      "n/a"
    );
  }
}
