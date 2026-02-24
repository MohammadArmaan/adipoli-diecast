import { formatCurrency } from "@/lib/utils";
import type { Product as WixProduct } from "@wix/stores_products";
import Link from "next/link";
import DiscountBadge from "./DiscountBadge";
import WixImage from "./WixImage";
import Badge from "./ui/badge";

interface ProductProps {
  product: WixProduct;
}

export default function Product({ product }: ProductProps) {
  const mainImage = product.media?.mainMedia?.image;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="h-full rounded-xl border bg-card shadow-md"
    >
      <div className="relative overflow-hidden">
        <WixImage
          mediaIdentifier={mainImage?.url}
          alt={mainImage?.altText || product.name}
          width={700}
          height={700}
          className="rounded-xl bg-white/20 transition-transform duration-300 hover:scale-105"
        />

        <div className="absolute bottom-3 right-3 flex flex-wrap items-center gap-2">
          {product.ribbon && <Badge>{product.ribbon}</Badge>}
          {product.discount && (
            <DiscountBadge data={product.discount} />
          )}
          <Badge className="bg-secondary font-semibold text-secondary-foreground">
            {getFormattedPrice(product)}
          </Badge>
        </div>
      </div>

      <div className="space-y-3 p-3">
        <h3 className="text-lg font-bold text-foreground">
          {product.name}
        </h3>

        <div
          className="line-clamp-5 text-muted-foreground"
          dangerouslySetInnerHTML={{
            __html: product.description || "",
          }}
        />
      </div>
    </Link>
  );
}

function getFormattedPrice(product: WixProduct) {
  const minPrice = product.priceRange?.minValue;
  const maxPrice = product.priceRange?.maxValue;

  if (minPrice && maxPrice && minPrice !== maxPrice) {
    return `from ${formatCurrency(
      minPrice,
      product.priceData?.currency
    )}`;
  }

  return (
    product.priceData?.formatted?.discountedPrice ||
    product.priceData?.formatted?.price ||
    "n/a"
  );
}