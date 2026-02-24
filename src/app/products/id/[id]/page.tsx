import { getWixServerClient } from "@/lib/wix-client.server";
import { getProductById } from "@/wix-api/products";
import { notFound, redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { id } = await params;              
  const resolvedSearchParams = await searchParams; 

  const queryString = new URLSearchParams(
    resolvedSearchParams as Record<string, string>
  ).toString();

  if (id === "someId") {
    redirect(`/products/i-m-a-product-1${queryString ? `?${queryString}` : ""}`);
  }

  const wixClient = await getWixServerClient();
  const product = await getProductById(wixClient, id);

  if (!product) notFound();

  redirect(
    `/products/${product.slug}${queryString ? `?${queryString}` : ""}`
  );
}
