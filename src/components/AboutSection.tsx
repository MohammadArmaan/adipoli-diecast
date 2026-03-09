import { CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import CarFlameImage from "@/assets/car-flame.png";

export default function AboutSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#0f0f0f,#1a1a1a)] p-12 shadow-2xl">
      {/* Subtle Orange Glow Background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,hsl(var(--primary)/0.15),transparent_60%)]" />

      <div className="relative grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* Left Content */}
        <div className="space-y-6">
          <h2 className="text-4xl font-extrabold uppercase tracking-wide text-white md:text-5xl">
            Built For{" "}
            <span className="text-primary drop-shadow-[0_0_20px_hsl(var(--primary)/0.7)]">
              Speed
            </span>
          </h2>

          <p className="text-lg text-gray-300">
            At Adipoli Diecast, we curate iconic die-cast machines inspired by
            legendary racing culture. Every model is crafted for collectors who
            demand precision, performance, and presence.
          </p>

          <div className="space-y-3">
            {[
              "Premium die-cast detailing",
              "Limited edition track legends",
              "Authentic racing-inspired designs",
              "Built for collectors & enthusiasts",
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-gray-200">{item}</span>
              </div>
            ))}
          </div>

          <Link href="/about">
            <Button className="group mt-5 bg-primary px-8 py-4 text-lg font-bold uppercase tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_hsl(var(--primary)/0.7)]">
              Explore Our Story
            </Button>
          </Link>
        </div>

        {/* Right Image */}
        <div className="relative flex justify-center">
          {/* Heat Glow Under Car */}
          <div className="absolute bottom-10 h-40 w-60 rounded-full bg-primary/20 opacity-60 blur-3xl" />

          <Image
            src={CarFlameImage}
            alt="Hot Wheels Racing Car"
            width={500}
            height={500}
            className="car-hover object-contain transition-transform duration-700"
          />
        </div>
      </div>
    </section>
  );
}
