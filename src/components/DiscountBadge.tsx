import type { Product } from "@/types/wix";
import Badge from "./ui/badge";

type Discount = NonNullable<Product["discount"]>;

interface DiscountBadgeProps {
  data: Discount;
}

export default function DiscountBadge({ data }: DiscountBadgeProps) {
  if (data.type !== "PERCENT") {
    return null;
  }

  return (
    <Badge className="bg-primary text-primary-foreground">
      -{data.value}%
    </Badge>
  );
}