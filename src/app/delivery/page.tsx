import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping & Delivery",
  description:
    "Learn about shipping timelines, dispatch process, and delivery details for Adipoli Diecast die-cast collectibles across India.",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="space-y-16 text-center">
        {/* Header */}
        <div className="space-y-6">
          <h1 className="text-5xl font-extrabold uppercase tracking-wider">
            Shipping & <span className="text-primary">Delivery</span>
          </h1>
          <p className="mx-auto max-w-3xl text-lg leading-8 text-muted-foreground">
            At Adipoli Diecast, we ensure your die-cast collectibles are packed
            with care and delivered safely to your doorstep.
          </p>
        </div>

        {/* Online Orders Section */}
        <div className="relative rounded-3xl bg-[linear-gradient(135deg,#0f0f0f,#1a1a1a)] p-12 text-left shadow-2xl">
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_30%_30%,hsl(var(--primary)/0.15),transparent_70%)]" />

          <div className="relative space-y-8">
            {/* Online Only */}
            <div className="space-y-3">
              <h2 className="text-2xl font-bold uppercase tracking-wide text-primary">
                Online Orders Only
              </h2>
              <p className="leading-7 text-gray-300">
                All purchases are processed exclusively through our website. We
                currently operate as an online-only store and do not offer
                in-store pickups.
              </p>
              <p className="leading-7 text-gray-300">
                Orders are typically processed within{" "}
                <strong>1–2 business days</strong>. Once dispatched, tracking
                details will be shared via email.
              </p>
            </div>

            {/* Delivery Timeline */}
            <div className="space-y-3">
              <h2 className="text-2xl font-bold uppercase tracking-wide text-primary">
                Delivery Timeline
              </h2>
              <p className="leading-7 text-gray-300">
                Estimated delivery time is <strong>3–7 business days</strong>,
                depending on your location. We work with reliable courier
                partners to ensure secure and timely delivery.
              </p>
            </div>

            {/* Packaging */}
            <div className="space-y-3">
              <h2 className="text-2xl font-bold uppercase tracking-wide text-primary">
                Collector-Grade Packaging
              </h2>
              <p className="leading-7 text-gray-300">
                Each model is carefully packed to protect its condition during
                transit. We understand the importance of preserving packaging
                quality for collectors.
              </p>
            </div>

            {/* Locations */}
            <div className="space-y-3">
              <h2 className="text-2xl font-bold uppercase tracking-wide text-primary">
                Delivery Coverage
              </h2>
              <p className="leading-7 text-gray-300">
                We currently ship across most cities and towns in India. If your
                area is not serviceable, you will be notified during checkout
                before completing your purchase.
              </p>
            </div>

            {/* Questions */}
            <div className="space-y-3">
              <h2 className="text-2xl font-bold uppercase tracking-wide text-primary">
                Need Help?
              </h2>
              <p className="leading-7 text-gray-300">
                For order-related questions, tracking updates, or delivery
                concerns, please visit our Support page or contact our team
                through the official channels listed on the website.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
