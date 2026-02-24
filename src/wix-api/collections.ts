import { WixClient } from "@/lib/wix-client.base";
import { cache } from "react";

/**
 * Get all collections (V3)
 */
export const getCollections = cache(
  async (wixClient: WixClient) => {
    try {
      // V3: queryCollections() is a builder, still needs .find()
      const result = await wixClient.collections
        .queryCollections()
        .find();
      
      return result.items || [];
    } catch (error) {
      // console.error("Error fetching collections:", error);
      return [];
    }
  }
);

/**
 * Get single collection by ID (V3)
 */
export const getCollectionById = cache(
  async (wixClient: WixClient, collectionId: string) => {
    try {
      // V3: getCollection returns the collection directly
      const collection = await wixClient.collections.getCollection(collectionId);
      return collection || null;
    } catch (error) {
      console.error("Error fetching collection:", error);
      return null;
    }
  }
);

/**
 * Get single collection by slug (V3)
 */
export const getCollectionBySlug = cache(
  async (wixClient: WixClient, slug: string) => {
    try {
      const result = await wixClient.collections
        .queryCollections()
        .find();
      
      return result.items?.find((c) => c.slug === slug) || null;
    } catch (error) {
      console.error("Error fetching collection by slug:", error);
      return null;
    }
  }
);

/**
 * Get products from a collection (V3)
 */
export const getProductsByCollection = cache(
  async (wixClient: WixClient, collectionId: string) => {
    try {
      const result = await wixClient.products
        .queryProducts()
        .hasSome("collectionIds", [collectionId])
        .find();
      
      return result.items || [];
    } catch (error) {
      console.error("Error fetching products by collection:", error);
      return [];
    }
  }
);