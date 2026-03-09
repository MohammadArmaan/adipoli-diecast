import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Need help with your order or a limited drop? Contact Adipoli Diecast support for assistance with purchases, shipping, and collector inquiries.",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="space-y-16 text-center">
        {/* Header */}
        <div className="space-y-6">
          <h1 className="text-5xl font-extrabold uppercase tracking-wider text-foreground">
            Collector <span className="text-primary">Support</span>
          </h1>
          <p className="mx-auto max-w-3xl text-lg leading-8 text-muted-foreground">
            Whether it’s a limited drop, an order inquiry, or product details —
            our team is here to ensure your experience with Adipoli Diecast is
            smooth and reliable.
          </p>
        </div>

        {/* Support Section */}
        <div className="relative rounded-3xl bg-[linear-gradient(135deg,#0f0f0f,#1a1a1a)] p-12 text-left shadow-2xl">
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_30%_30%,hsl(var(--primary)/0.15),transparent_70%)]" />

          <div className="relative space-y-6">
            <h2 className="text-center text-3xl font-extrabold uppercase tracking-wide text-primary">
              How We Can Help
            </h2>

            <ul className="list-inside list-disc space-y-3 leading-7 text-gray-300">
              <li>Order tracking & shipping updates</li>
              <li>Product authenticity & details</li>
              <li>Limited edition drop information</li>
              <li>Returns & refund assistance</li>
              <li>General collector inquiries</li>
            </ul>

            <p className="pt-4 text-gray-300">
              For assistance, please reach out through our contact form or
              official support email listed on the website.
            </p>
          </div>
        </div>

        {/* Online Only Notice */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold uppercase tracking-wide">
            Online-Only Store
          </h2>
          <p className="mx-auto max-w-2xl leading-8 text-muted-foreground">
            Adipoli Diecast currently operates exclusively online. We do not
            have a physical retail location at this time. All purchases, support
            inquiries, and updates are handled digitally.
          </p>
          <p className="font-bold text-foreground/90">
            Shipping available across India.
          </p>
        </div>
      </div>
    </main>
  );
}
