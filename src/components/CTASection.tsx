import { Flame } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#0f0f0f,#1c1c1c)] p-16 text-center text-white shadow-2xl">
      
      {/* Orange Glow Burst */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.25),transparent_70%)] pointer-events-none" />

      <div className="relative">
        <Flame className="mx-auto mb-6 h-14 w-14 text-primary drop-shadow-[0_0_20px_hsl(var(--primary)/0.8)]" />

        <h2 className="mb-6 text-4xl font-extrabold uppercase tracking-wider md:text-5xl">
          Ready For The <span className="text-primary">Next Drop?</span>
        </h2>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-300">
          Limited edition releases. Track-inspired legends. 
          Once they’re gone, they’re gone.
        </p>

        <Link href="/shop">
          <Button className="group bg-primary px-12 py-5 text-lg font-bold uppercase tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_hsl(var(--primary)/0.7)]">
            Explore Latest Drops
          </Button>
        </Link>

        {/* Bottom Racing Accent Line */}
        <div className="mt-12 h-[3px] w-40 mx-auto bg-primary transition-all duration-500 group-hover:w-60" />
      </div>
    </section>
  );
}