import type { Product } from "@/types/wix"; 

interface ProductDescriptionSectionProps {
  product: Product;
}

export default function ProductDescriptionSection({
  product,
}: ProductDescriptionSectionProps) {
  const mainImage = product.media?.mainMedia?.image?.url;

  return (
    <section className="relative overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#0f0f0f,#1a1a1a)] p-10 md:p-16 text-white shadow-2xl">
      
      {/* Subtle Orange Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,hsl(var(--primary)/0.15),transparent_70%)] pointer-events-none" />

      <div className="relative space-y-10">
        
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-wider">
            Track <span className="text-primary drop-shadow-[0_0_15px_hsl(var(--primary)/0.7)]">
              Specifications
            </span>
          </h2>
          <div className="mt-4 h-[3px] w-24 mx-auto bg-primary" />
        </div>

        {/* Content */}
        <div className="flex flex-col-reverse md:flex-row items-center gap-12">
          
          {/* Description */}
          <div
            className="prose prose-invert max-w-none md:w-1/2 text-gray-300"
            dangerouslySetInnerHTML={{
              __html: product.description ?? "",
            }}
          />

          {/* Image */}
          <div className="md:w-1/2 relative group">
            
            {/* Glow Behind Image */}
            <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-60" />

            <img
              src={
                mainImage ??
                "https://via.placeholder.com/500x400?text=No+Image"
              }
              alt={product.name ?? "Product image"}
              className="relative w-full rounded-2xl object-contain transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}