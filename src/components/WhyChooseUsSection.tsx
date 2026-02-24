import { Flame, Trophy, Map } from "lucide-react";

export default function WhyChooseUsSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#0f0f0f,#1c1c1c)] p-16 text-white shadow-2xl">
      
      {/* Orange Glow Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,hsl(var(--primary)/0.18),transparent_70%)] pointer-events-none" />

      <div className="relative text-center">
        <h2 className="mb-8 text-4xl font-extrabold uppercase tracking-wider md:text-5xl">
          Powered By <span className="text-primary drop-shadow-[0_0_20px_hsl(var(--primary)/0.7)]">
            Speed
          </span>
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3">
          
          {/* Limited Drops */}
          <div className="group space-y-4 transition-all duration-500 hover:-translate-y-3">
            <Flame className="mx-auto h-10 w-10 text-primary transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6" />
            <div className="text-4xl font-extrabold text-primary">250+</div>
            <h3 className="text-xl font-semibold uppercase tracking-wide">
              Limited Drops Released
            </h3>
            <p className="text-gray-300">
              Exclusive die-cast models launched for serious collectors.
            </p>
          </div>

          {/* Iconic Models */}
          <div className="group space-y-4 transition-all duration-500 hover:-translate-y-3">
            <Trophy className="mx-auto h-10 w-10 text-primary transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6" />
            <div className="text-4xl font-extrabold text-primary">500+</div>
            <h3 className="text-xl font-semibold uppercase tracking-wide">
              Iconic Racing Models
            </h3>
            <p className="text-gray-300">
              Legendary track-inspired cars curated for performance lovers.
            </p>
          </div>

          {/* Reach */}
          <div className="group space-y-4 transition-all duration-500 hover:-translate-y-3">
            <Map className="mx-auto h-10 w-10 text-primary transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6" />
            <div className="text-4xl font-extrabold text-primary">PAN INDIA</div>
            <h3 className="text-xl font-semibold uppercase tracking-wide">
              Fast Nationwide Delivery
            </h3>
            <p className="text-gray-300">
              Bringing speed, style, and collectibles to garages across India.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}