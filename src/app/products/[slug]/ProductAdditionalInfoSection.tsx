"use client";

import type { Product } from "@/types/wix";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Info as InfoIcon } from "lucide-react";

interface ProductAdditionalInfoSectionProps {
  product: Product;
}

export default function ProductAdditionalInfoSection({
  product,
}: ProductAdditionalInfoSectionProps) {
  const additionalSections = product.additionalInfoSections;

  if (!additionalSections?.length) return null;

  return (
    <section className="relative overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#0f0f0f,#1a1a1a)] p-8 sm:p-12 text-white shadow-2xl">
      
      {/* Orange Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.15),transparent_70%)] pointer-events-none" />

      <div className="relative space-y-8">
        
        {/* Header */}
        <div className="flex items-center gap-3 text-primary">
          <InfoIcon className="size-6" />
          <h2 className="text-2xl md:text-4xl font-extrabold uppercase tracking-wide">
            Performance Details
          </h2>
        </div>

        {/* Divider */}
        <div className="h-[2px] w-20 bg-primary" />

        {/* Accordion */}
        <Accordion
          type="multiple"
          defaultValue={additionalSections
            .slice(0, 1)
            .map((s) => s.title || "")}
          className="space-y-4"
        >
          {additionalSections.map((section) => (
            <AccordionItem
              key={section.title}
              value={section.title || ""}
              className="border border-white/10 bg-[#151515] rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/60"
            >
              <AccordionTrigger
                className="
                  px-5 py-4 
                  text-base sm:text-lg 
                  font-semibold uppercase tracking-wide
                  text-white
                  transition-colors
                  hover:text-primary
                "
              >
                {section.title}
              </AccordionTrigger>

              <AccordionContent className="px-5 pb-6">
                <div
                  dangerouslySetInnerHTML={{
                    __html: section.description || "",
                  }}
                  className="
                    prose prose-invert 
                    max-w-none 
                    text-gray-300 
                    text-sm sm:text-base
                  "
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}