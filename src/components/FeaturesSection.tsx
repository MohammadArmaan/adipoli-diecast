import { Flame, Gauge, Trophy, ShieldCheck } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <Flame className="h-8 w-8 text-primary" />,
      title: "Built for Speed",
      description:
        "Precision-crafted die-cast machines engineered for collectors who live for performance and design.",
    },
    {
      icon: <Gauge className="h-8 w-8 text-primary" />,
      title: "Limited Edition Drops",
      description:
        "Exclusive releases and rare track legends that elevate your collection to the next level.",
    },
    {
      icon: <Trophy className="h-8 w-8 text-primary" />,
      title: "Collector Grade Quality",
      description:
        "Premium detailing, authentic finishes, and iconic models inspired by real racing legends.",
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-primary" />,
      title: "Authentic & Original",
      description:
        "100% genuine Hot Wheels collectibles sourced for serious enthusiasts and fans.",
    },
  ];

  return (
    <section className="relative py-20">
      {/* Section Heading */}
      <div className="mb-14 text-center">
        <h2 className="mb-4 text-4xl font-extrabold uppercase tracking-wider md:text-5xl">
          Why <span className="text-primary drop-shadow-[0_0_15px_hsl(var(--primary)/0.7)]">
            Collectors
          </span>{" "}
          Choose Us
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Designed for speed lovers, die-cast enthusiasts, and collectors who
          demand more than ordinary.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-2xl bg-card p-8 text-center shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_0_40px_hsl(var(--primary)/0.25)]"
          >
            {/* Glow Background */}
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.12),transparent_70%)]" />

            {/* Icon */}
            <div className="relative mb-6 flex justify-center transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6">
              {feature.icon}
            </div>

            {/* Title */}
            <h3 className="relative mb-3 text-xl font-bold uppercase tracking-wide transition-colors group-hover:text-primary">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="relative text-muted-foreground">
              {feature.description}
            </p>

            {/* Track Line Accent */}
            <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-primary transition-all duration-500 group-hover:w-full" />
          </div>
        ))}
      </div>
    </section>
  );
}