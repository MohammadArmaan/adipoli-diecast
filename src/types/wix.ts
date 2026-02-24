import type { Collection as WixCollection } from "@wix/auto_sdk_stores_collections";
import type { Product as WixProduct } from "@wix/auto_sdk_stores_products";

/**
 * Extract V3 types from namespace
 */
// type WixCollection = stores.collections.Collection;
// type WixProduct = stores.products.Product;

/**
 * UI-safe collection type
 */
export type Collection = Pick<
  WixCollection,
  "_id" | "name" | "slug" | "media"
>;

/**
 * UI-safe product type
 */
export type Product = WixProduct;