import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping & Delivery",
  description:
    "Learn about shipping timelines, dispatch process, and delivery details for Anup Wheels die-cast collectibles across India.",
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
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground leading-8">
            At Anup Wheels, we ensure your die-cast collectibles are packed
            with care and delivered safely to your doorstep.
          </p>
        </div>

        {/* Online Orders Section */}
        <div className="relative rounded-3xl bg-[linear-gradient(135deg,#0f0f0f,#1a1a1a)] p-12 text-left shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,hsl(var(--primary)/0.15),transparent_70%)] pointer-events-none rounded-3xl" />

          <div className="relative space-y-8">

            {/* Online Only */}
            <div className="space-y-3">
              <h2 className="text-2xl font-bold uppercase tracking-wide text-primary">
                Online Orders Only
              </h2>
              <p className="text-gray-300 leading-7">
                All purchases are processed exclusively through our website.
                We currently operate as an online-only store and do not offer
                in-store pickups.
              </p>
              <p className="text-gray-300 leading-7">
                Orders are typically processed within <strong>1–2 business days</strong>.
                Once dispatched, tracking details will be shared via email.
              </p>
            </div>

            {/* Delivery Timeline */}
            <div className="space-y-3">
              <h2 className="text-2xl font-bold uppercase tracking-wide text-primary">
                Delivery Timeline
              </h2>
              <p className="text-gray-300 leading-7">
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
              <p className="text-gray-300 leading-7">
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
              <p className="text-gray-300 leading-7">
                We currently ship across most cities and towns in India. If
                your area is not serviceable, you will be notified during
                checkout before completing your purchase.
              </p>
            </div>

            {/* Questions */}
            <div className="space-y-3">
              <h2 className="text-2xl font-bold uppercase tracking-wide text-primary">
                Need Help?
              </h2>
              <p className="text-gray-300 leading-7">
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