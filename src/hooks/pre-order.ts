import { useState } from "react";
import { useToast } from "./use-toast";
import { wixBrowserClient } from "@/lib/wix-client.browser";
import { env } from "@/env";
import type { Product } from "@/types/wix";

interface PreOrderData {
  email: string;
  name: string;
  quantity: number;
  productId: string;
  productName: string;
  selectedOptions: Record<string, string>;
  itemUrl: string;
}

export function usePreOrder() {
  const { toast } = useToast();
  const [pending, setPending] = useState(false);

  async function submitPreOrder(
    data: PreOrderData,
    product: Product
  ) {
    setPending(true);
    
    try {
      // Option 1: Try custom API endpoint first
      try {
        const response = await fetch('/api/pre-orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...data,
            timestamp: new Date().toISOString(),
          }),
        });

        if (response.ok) {
          toast({ 
            description: "Pre-order submitted successfully! We'll notify you when the product is ready to ship." 
          });
          return { success: true };
        }
      } catch (apiError) {
        console.log('API endpoint not available, using fallback method...');
      }

      // Option 2: Fallback method - you can customize this based on your Wix setup
      // For now, we'll just use a simple fetch to your backend or handle it differently
      try {
        // You might want to replace this with your own backend endpoint
        // or use Wix's contact form API, or store in your own database
        const fallbackResponse = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'pre-order',
            ...data,
            message: `Pre-order request for ${product.name}`,
            timestamp: new Date().toISOString(),
          }),
        });

        if (fallbackResponse.ok) {
          toast({ 
            description: "Pre-order submitted successfully! We'll notify you when the product is ready to ship." 
          });
          return { success: true };
        }
      } catch (fallbackError) {
        console.error("Fallback method failed:", fallbackError);
      }

      // If both methods fail, throw an error
      throw new Error("All pre-order submission methods failed");

    } catch (error) {
      console.error("Pre-order request failed:", error);
      toast({
        variant: "destructive",
        description: "Failed to submit pre-order request. Please try again.",
      });
      return { success: false };
    } finally {
      setPending(false);
    }
  }

  return { submitPreOrder, pending };
}