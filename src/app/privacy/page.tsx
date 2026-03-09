import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Adipoli Diecast",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-4xl space-y-10 px-5 py-10 leading-7">
      <div className="space-y-8 text-center">
        {/* Header */}
        <h2 className="text-3xl font-bold">PRIVACY POLICY</h2>
        <p>
          At Adipoli Diecast, we value the trust you place in us. This Privacy
          Policy explains how we handle your information when you visit our
          website or place an order for our pet food products.
        </p>

        {/* Information Collection */}
        <div className="space-y-4 text-left">
          <h3 className="text-2xl font-semibold">INFORMATION WE COLLECT</h3>
          <p>
            We collect the following types of information to process your order
            and improve your shopping experience:
          </p>
          <ul className="list-inside list-disc">
            <li>
              Contact details like your name, phone number, and delivery address
            </li>
            <li>Order and payment information</li>
            <li>Usage data such as pages visited and browser type</li>
          </ul>
        </div>

        {/* Use of Information */}
        <div className="space-y-4 text-left">
          <h3 className="text-2xl font-semibold">
            HOW WE USE YOUR INFORMATION
          </h3>
          <p>Your data helps us:</p>
          <ul className="list-inside list-disc">
            <li>Fulfill and deliver your orders</li>
            <li>Improve our website and services</li>
            <li>Understand customer preferences and behavior</li>
          </ul>
        </div>

        {/* Data Security */}
        <div className="space-y-4 text-left">
          <h3 className="text-2xl font-semibold">DATA SECURITY</h3>
          <p>
            We use secure technologies, including SSL encryption, to protect
            your personal and payment information from unauthorized access.
          </p>
        </div>

        {/* Your Rights */}
        <div className="space-y-4 text-left">
          <h3 className="text-2xl font-semibold">YOUR RIGHTS</h3>
          <p>You may request to:</p>
          <ul className="list-inside list-disc">
            <li>Access or update your personal data</li>
            <li>Request deletion of your information</li>
            <li>Withdraw consent for data processing</li>
          </ul>
        </div>

        {/* Changes to Policy */}
        <div className="space-y-4 text-left">
          <h3 className="text-2xl font-semibold">CHANGES TO THIS POLICY</h3>
          <p>
            We may update this policy from time to time. Any changes will be
            reflected on this page, and we encourage you to review it
            periodically.
          </p>
        </div>

        {/* Questions Section */}
        <div className="space-y-4 text-left">
          <h3 className="text-2xl font-semibold">QUESTIONS?</h3>
          <p>
            If you have questions about your privacy, please refer to the FAQs
            on our website. We’re committed to keeping your information safe and
            secure.
          </p>
        </div>
      </div>
    </main>
  );
}
