import { Star } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Aarav Sharma",
      location: "Mumbai, Maharashtra",
      text: "The detailing on these models is insane. The paint finish and build quality feel premium. Easily the best place for serious collectors.",
      rating: 5,
      collection: "JDM Series Collector",
    },
    {
      name: "Priya Menon",
      location: "Bengaluru, Karnataka",
      text: "The limited edition drops sell out fast for a reason. The packaging, authenticity, and speed of delivery are top-tier.",
      rating: 5,
      collection: "Track Legends Series",
    },
    {
      name: "Rajiv Patel",
      location: "Ahmedabad, Gujarat",
      text: "Anup Wheels feels like a proper collector’s garage. Every car I’ve ordered has exceeded expectations.",
      rating: 5,
      collection: "Premium Die-Cast Enthusiast",
    },
  ];

  return (
    <section className="relative py-20">
      {/* Heading */}
      <div className="text-center">
        <h2 className="mb-4 text-4xl font-extrabold uppercase tracking-wider md:text-5xl">
          What{" "}
          <span className="text-primary drop-shadow-[0_0_20px_hsl(var(--primary)/0.7)]">
            Collectors
          </span>{" "}
          Say
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-10">
          Real feedback from racing enthusiasts and die-cast collectors across
          India.
        </p>
      </div>
      {/* Cards */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-2xl bg-card p-8 text-center shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_0_40px_hsl(var(--primary)/0.25)]"
          >
            {/* Glow on hover */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.12),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            {/* Stars */}
            <div className="relative mb-5 flex justify-center space-x-1">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-primary text-primary transition-transform duration-300 group-hover:scale-110"
                />
              ))}
            </div>
            <p className="mb-4 italic text-foreground/80">
              {" "}
              "{testimonial.text}"{" "}
            </p>{" "}
            <div className="border-t pt-4">
              {" "}
              <div className="font-semibold text-foreground">
                {" "}
                {testimonial.name}{" "}
              </div>{" "}
              <div className="text-sm text-muted-foreground">
                {" "}
                {testimonial.location}{" "}
              </div>{" "}
              <div className="text-sm font-medium text-primary">
                {" "}
                Pet parent to {testimonial.collection}{" "}
              </div>
            </div>
            {/* Bottom racing accent */}
            <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-primary transition-all duration-500 group-hover:w-full" />
          </div>
        ))}
      </div>
    </section>
  );
}
