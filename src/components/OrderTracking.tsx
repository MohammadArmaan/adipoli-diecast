"use client";

import { orders } from "@wix/ecom";

interface OrderTrackingProps {
  fulfillmentStatus?: orders.FulfillmentStatus | string | null;
}

export default function OrderTracking({
  fulfillmentStatus,
}: OrderTrackingProps) {
  const steps = ["Order placed", "Packed", "Shipped", "Delivered"];

  let currentStep = 0;

  if (fulfillmentStatus === "PARTIALLY_FULFILLED") currentStep = 2;

  if (fulfillmentStatus === "FULFILLED") currentStep = 3;

  return (
    <div className="mt-4 rounded-lg border bg-muted/40 p-4">
      <div className="mb-3 text-sm font-semibold">Order Progress</div>

      <div className="relative flex items-center justify-between">
        <div className="absolute left-0 top-3 h-[2px] w-full bg-muted"></div>

        <div
          className="absolute left-0 top-3 h-[2px] bg-primary"
          style={{
            width: `${(currentStep / (steps.length - 1)) * 100}%`,
          }}
        ></div>

        {steps.map((step, index) => {
          const completed = index <= currentStep;

          return (
            <div
              key={step}
              className="relative z-10 flex flex-col items-center"
            >
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs font-bold ${
                  completed
                    ? "border-primary bg-primary text-white"
                    : "border-muted-foreground bg-background"
                }`}
              >
                {completed ? "✓" : ""}
              </div>

              <span className="mt-2 text-xs">{step}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
