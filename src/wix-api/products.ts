import { WixClient } from "@/lib/wix-client.base";

export type ProductsSort = "last_updated" | "price_asc" | "price_desc" | "name_asc" | "name_desc";

interface QueryProductsFilter {
  q?: string;
  collectionIds?: string[] | string;
  sort?: ProductsSort;
  priceMin?: number;
  priceMax?: number;
  skip?: number;
  limit?: number;
}

/**
 * Get product by slug
 */
export async function getProductBySlug(
  wixClient: WixClient,
  slug: string,
) {
  const result = await wixClient.products
    .queryProducts()
    .eq("slug", slug)
    .limit(1)
    .find();

  return result.items[0] || null;
}

/**
 * Get related products
 */
export async function getRelatedProducts(
  wixClient: WixClient,
  productId: string,
) {
  const result = await wixClient.products
    .queryProducts()
    .ne("_id", productId)
    .limit(4)
    .find();

  return result.items || [];
}

/**
 * Query products with filters
 */
export async function queryProducts(
  wixClient: WixClient,
  {
    q,
    collectionIds,
    sort = "last_updated",
    priceMin,
    priceMax,
    skip = 0,
    limit = 8,
  }: QueryProductsFilter,
) {
  let query = wixClient.products.queryProducts();

  // -----------------------------
  // SERVER-SIDE COLLECTION FILTER
  // -----------------------------

  if (collectionIds) {
    const ids = Array.isArray(collectionIds)
      ? collectionIds
      : [collectionIds];

    query = query.hasSome("collectionIds", ids);
  }

  // -----------------------------
  // SAFE SERVER-SIDE SORTING
  // (Only fields Wix allows)
  // -----------------------------

  if (sort === "name_asc") {
    query = query.ascending("name");
  }

  if (sort === "name_desc") {
    query = query.descending("name");
  }

  if (sort === "last_updated") {
    query = query.descending("_id");
  }

  // 🚨 IMPORTANT:
  // Fetch larger dataset first (since filtering is client-side)
  const result = await query.limit(100).find();

  let items = result.items || [];

  // =============================
  // CLIENT-SIDE SEARCH
  // =============================

  if (q) {
    const search = q.toLowerCase().trim();

    items = items.filter((product: any) =>
      product.name?.toLowerCase().includes(search)
    );
  }

  // =============================
  // CLIENT-SIDE PRICE FILTER
  // =============================

  if (priceMin !== undefined) {
    items = items.filter(
      (product: any) =>
        (product.priceData?.price ?? 0) >= priceMin
    );
  }

  if (priceMax !== undefined) {
    items = items.filter(
      (product: any) =>
        (product.priceData?.price ?? 0) <= priceMax
    );
  }

  // =============================
  // CLIENT-SIDE PRICE SORT
  // =============================

  if (sort === "price_asc") {
    items.sort(
      (a: any, b: any) =>
        (a.priceData?.price ?? 0) -
        (b.priceData?.price ?? 0)
    );
  }

  if (sort === "price_desc") {
    items.sort(
      (a: any, b: any) =>
        (b.priceData?.price ?? 0) -
        (a.priceData?.price ?? 0)
    );
  }

  // =============================
  // PAGINATION (ALWAYS LAST)
  // =============================

  const totalCount = items.length;
  const totalPages = Math.ceil(totalCount / limit);

  const paginatedItems = items.slice(skip, skip + limit);

  return {
    items: paginatedItems,
    totalCount,
    totalPages,
  };
}

/**
 * Get all products
 */
export async function getProducts(
  wixClient: WixClient,
  limit: number = 50
) {
  const result = await wixClient.products
    .queryProducts()
    .limit(limit)
    .find();

  return result.items || [];
}

/**
 * Get product by ID
 */
export async function getProductById(
  wixClient: WixClient,
  productId: string,
) {
  const response = await wixClient.products.getProduct(productId);
  return response?.product || null;
}
/**
 * Get featured products
 */
export async function getFeaturedProducts(
  wixClient: WixClient,
  limit: number = 10
) {
  // Use _id descending as proxy for newest
  const result = await wixClient.products
    .queryProducts()
    .limit(limit)
    .descending("_id")
    .find();

  return result.items || [];
}