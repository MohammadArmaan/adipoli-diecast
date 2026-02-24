import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Anup Wheels",
  description:
    "Discover the passion behind Anup Wheels – India’s destination for premium die-cast cars, limited edition drops, and collector-grade racing legends.",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16 text-white">
      <div className="space-y-16 text-center">

        {/* Header */}
        <div className="space-y-6">
          <h1 className="text-5xl font-extrabold uppercase tracking-wider text-foreground">
            About <span className="text-primary">Anup Wheels</span>
          </h1>

          <p className="mx-auto max-w-3xl text-lg text-muted-foreground leading-8">
            Anup Wheels was built for collectors, racing enthusiasts, and
            die-cast lovers who live for speed, precision, and iconic design.
            We are not just a store — we are a garage for legends.
          </p>
        </div>

        {/* Mission + Vision */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 text-left">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold uppercase tracking-wide text-primary">
              Our Mission
            </h2>
            <p className="text-muted-foreground leading-7">
              To bring the thrill of the track into every collector’s hands.
              From limited edition releases to timeless classics, we carefully
              curate premium die-cast models that celebrate automotive history,
              performance, and craftsmanship.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold uppercase tracking-wide text-primary">
              What We Stand For
            </h2>
            <p className="text-muted-foreground leading-7">
              Authenticity. Detail. Passion. Every model we offer is genuine,
              collector-grade, and carefully handled to ensure it arrives in
              pristine condition — ready for display or your personal garage.
            </p>
          </div>
        </div>

        {/* Brand Story */}
        <div className="relative rounded-3xl bg-[linear-gradient(135deg,#0f0f0f,#1a1a1a)] p-12 text-left shadow-2xl">

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,hsl(var(--primary)/0.15),transparent_70%)] pointer-events-none rounded-3xl" />

          <div className="relative space-y-6">
            <h2 className="text-3xl font-extrabold uppercase tracking-wider text-center text-primary">
              Our Story
            </h2>

            <p className="text-gray-300 leading-8">
              Anup Wheels began with a simple passion: the love of cars. From
              childhood collections to rare limited releases, the fascination
              with automotive design turned into a mission — to create a
              destination where collectors can discover, secure, and celebrate
              iconic die-cast models.
            </p>

            <p className="text-gray-300 leading-8">
              We believe every car tells a story — whether it’s a track-ready
              supercar, a vintage legend, or a modern hypercar masterpiece.
              Our platform is designed for enthusiasts who appreciate detail,
              authenticity, and the thrill of limited drops.
            </p>

            <p className="text-gray-300 leading-8">
              At Anup Wheels, it’s not about selling toys. It’s about building
              collections. It’s about reliving racing history. It’s about owning
              a piece of speed.
            </p>
          </div>
        </div>

        {/* Community Section */}
        <div className="space-y-6">
          <h2 className="text-4xl font-extrabold uppercase tracking-wide text-foreground">
            Join The <span className="text-primary">Collectors Garage</span>
          </h2>

          <p className="mx-auto max-w-2xl text-muted-foreground leading-8">
            We&apos;re building a community of passionate collectors across India.
            Stay tuned for limited drops, exclusive releases, and special
            editions that disappear as fast as they arrive.
          </p>

          <p className="text-foreground/90 font-bold">
            Online-first. Shipping across India.
          </p>
        </div>

      </div>
    </main>
  );
}