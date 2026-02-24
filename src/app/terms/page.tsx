import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read how Anup Wheels collects, uses, and protects your personal information when purchasing die-cast collectibles online.",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16 text-white">
      <div className="space-y-14">

        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold uppercase tracking-wide">
            Privacy <span className="text-primary">Policy</span>
          </h1>
          <div className="mx-auto h-[3px] w-24 bg-primary" />
          <p className="mx-auto max-w-3xl text-gray-300 leading-7">
            At Anup Wheels, we respect your privacy and are committed to
            protecting your personal information when you use our website
            or make a purchase.
          </p>
        </div>

        <div className="space-y-12 text-left">

          {/* Information We Collect */}
          <section className="space-y-4 border-l-4 border-primary pl-6">
            <h2 className="text-2xl font-bold uppercase text-primary">
              Information We Collect
            </h2>
            <p className="text-gray-300 leading-7">
              We collect information necessary to process orders and improve
              your shopping experience. This may include:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>Name, contact number, and delivery address</li>
              <li>Email address for order updates</li>
              <li>Order history and transaction details</li>
              <li>Device and browser usage data</li>
            </ul>
          </section>

          {/* How We Use Information */}
          <section className="space-y-4 border-l-4 border-primary pl-6">
            <h2 className="text-2xl font-bold uppercase text-primary">
              How We Use Your Information
            </h2>
            <p className="text-gray-300 leading-7">
              Your information is used to:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>Process and deliver your orders</li>
              <li>Provide customer support</li>
              <li>Improve website functionality</li>
              <li>Communicate important updates or promotional releases</li>
            </ul>
          </section>

          {/* Data Security */}
          <section className="space-y-4 border-l-4 border-primary pl-6">
            <h2 className="text-2xl font-bold uppercase text-primary">
              Data Security
            </h2>
            <p className="text-gray-300 leading-7">
              We implement appropriate security measures, including SSL
              encryption and secure payment gateways, to protect your personal
              and transaction data from unauthorized access.
            </p>
          </section>

          {/* Data Sharing */}
          <section className="space-y-4 border-l-4 border-primary pl-6">
            <h2 className="text-2xl font-bold uppercase text-primary">
              Data Sharing
            </h2>
            <p className="text-gray-300 leading-7">
              We do not sell or trade your personal information. Limited data
              may be shared with trusted third-party service providers such as
              payment processors and courier partners strictly for order
              fulfillment purposes.
            </p>
          </section>

          {/* Your Rights */}
          <section className="space-y-4 border-l-4 border-primary pl-6">
            <h2 className="text-2xl font-bold uppercase text-primary">
              Your Rights
            </h2>
            <p className="text-gray-300 leading-7">
              You may request to:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>Access your personal data</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Withdraw consent for marketing communications</li>
            </ul>
          </section>

          {/* Cookies */}
          <section className="space-y-4 border-l-4 border-primary pl-6">
            <h2 className="text-2xl font-bold uppercase text-primary">
              Cookies
            </h2>
            <p className="text-gray-300 leading-7">
              Our website may use cookies to enhance user experience,
              analyze traffic, and improve performance. You may disable
              cookies through your browser settings.
            </p>
          </section>

          {/* Policy Updates */}
          <section className="space-y-4 border-l-4 border-primary pl-6">
            <h2 className="text-2xl font-bold uppercase text-primary">
              Policy Updates
            </h2>
            <p className="text-gray-300 leading-7">
              This Privacy Policy may be updated periodically. Changes will
              be reflected on this page. Continued use of the website
              constitutes acceptance of the updated policy.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}