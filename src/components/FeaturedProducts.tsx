import { getWixServerClient } from "@/lib/wix-client.server";
import { getCollections, getProductsByCollection } from "@/wix-api/collections";
import FeaturedSectionProduct from "./FeaturedSectionProduct";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function FeaturedProducts() {
  const wixClient = getWixServerClient();

  const result = await wixClient.products
    .queryProducts()
    .descending("_id") // newest first
    .limit(4)
    .find();

  const featuredProducts = result.items || [];

  if (!featuredProducts.length) return null;

  return (
    <section className="relative space-y-12 py-16">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/90 to-background" />

      <div className="text-center">
        <h2 className="mb-4 text-4xl font-extrabold uppercase tracking-wider md:text-5xl">
          Featured{" "}
          <span className="text-primary drop-shadow-[0_0_15px_hsl(var(--primary)/0.8)]">
            Track Legends
          </span>
        </h2>

        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Handpicked die-cast machines built for speed, style, and serious
          collectors. Limited drops. Maximum thrill.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {featuredProducts.map((product: any) => (
          <FeaturedSectionProduct key={product._id} product={product} />
        ))}
      </div>

      <div className="text-center">
        <Button
          asChild
          className="group bg-primary px-8 py-4 text-lg font-bold uppercase tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsl(var(--primary)/0.7)]"
        >
          <Link href="/shop">
            Explore Full Garage
            <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
          </Link>
        </Button>
      </div>
    </section>
  );
}