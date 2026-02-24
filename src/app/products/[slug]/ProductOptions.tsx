import { Label } from "@/components/ui/label";
import { checkInStock, cn } from "@/lib/utils";
import type { Product } from "@/types/wix"; 

interface ProductOptionsProps {
  product: Product;
  selectedOptions: Record<string, string>;
  setSelectedOptions: (options: Record<string, string>) => void;
}

export default function ProductOptions({
  product,
  selectedOptions,
  setSelectedOptions,
}: ProductOptionsProps) {
  return (
    <div className="space-y-2.5">
      {product.productOptions?.map((option) => (
        <fieldset key={option.name} className="space-y-1.5">
          <legend>
            <Label asChild>
              <span className="text-[18px] font-medium">
                {option.name}
              </span>
            </Label>
          </legend>

          <div className="flex flex-wrap items-center gap-1.5">
            {option.choices?.map((choice) => (
              <div key={choice.description}>
                <input
                  type="radio"
                  id={choice.description}
                  name={option.name}
                  value={choice.description}
                  checked={
                    selectedOptions[option.name || ""] ===
                    choice.description
                  }
                  onChange={() =>
                    setSelectedOptions({
                      ...selectedOptions,
                      [option.name || ""]:
                        choice.description || "",
                    })
                  }
                  className="peer hidden"
                />

                <Label
                  htmlFor={choice.description}
                  className={cn(
                    "flex min-w-14 cursor-pointer items-center justify-center gap-1.5 border p-2 rounded-md transition-all",
                    !checkInStock(product, {
                      ...selectedOptions,
                      [option.name || ""]:
                        choice.description || "",
                    }) && "opacity-50",
                    selectedOptions[option.name || ""] ===
                      choice.description &&
                      "border-primary ring-1 ring-primary"
                  )}
                >
                  {/* ✅ V3-safe color check */}
                  {option.optionType === "color" && (
                    <span
                      className="h-4 w-4 rounded-full border"
                      style={{ backgroundColor: choice.value }}
                    />
                  )}

                  <span>{choice.description}</span>
                </Label>
              </div>
            ))}
          </div>
        </fieldset>
      ))}
    </div>
  );
}