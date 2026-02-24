import { env } from "@/env";
import { requiredString } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Product } from "@/types/wix";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import LoadingButton from "./LoadingButton";
import { Button, ButtonProps } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { usePreOrder } from "@/hooks/pre-order";


const formSchema = z.object({
  email: requiredString.email(),
  name: requiredString,
});

type FormValues = z.infer<typeof formSchema>;

interface PreOrderButtonProps extends ButtonProps {
  product: Product;
  selectedOptions: Record<string, string>;
  quantity: number;
}

export default function PreOrderButton({
  product,
  selectedOptions,
  quantity,
  ...props
}: PreOrderButtonProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const { submitPreOrder, pending } = usePreOrder();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
    },
  });

  async function onSubmit({ email, name }: FormValues) {
    setIsSuccess(false);

    const preOrderData = {
      email,
      name,
      quantity,
      productId: product._id!,
      productName: product.name!,
      selectedOptions,
      itemUrl: env.NEXT_PUBLIC_BASE_URL + "/products/" + product.slug,
    };

    const result = await submitPreOrder(preOrderData, product);
    
    if (result.success) {
      setIsSuccess(true);
      form.reset();
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button {...props}>Pre-Order Now</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pre-Order {product.name}</DialogTitle>
          <DialogDescription>
            This product is available for pre-order. Enter your details and
            we&apos;ll notify you when it&apos;s ready to ship.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Your email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="rounded-md bg-blue-50 p-3 dark:bg-blue-900/20">
              <p className="text-sm text-blue-600 dark:text-blue-400">
                Quantity: {quantity} | Pre-order will be processed when the product becomes available
              </p>
            </div>
            <LoadingButton type="submit" loading={pending}>
              Confirm Pre-Order
            </LoadingButton>
          </form>
        </Form>
        {isSuccess && (
          <div className="py-2.5 text-green-500">
            Thank you! Your pre-order has been submitted successfully. We&apos;ll
            notify you when the product is ready to ship.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}