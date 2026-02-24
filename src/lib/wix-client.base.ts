import { createClient, OAuthStrategy, Tokens } from "@wix/sdk";
import { collections } from "@wix/stores";
import { products } from "@wix/stores";
import { currentCart } from "@wix/ecom";
import { checkout } from "@wix/ecom";
import { orders } from "@wix/ecom";
import { members } from "@wix/members";
import { reviews } from "@wix/reviews";
import { redirects } from "@wix/redirects";
import { files } from "@wix/media";
import { env } from "@/env";
import * as backInStockNotifications from "@wix/auto_sdk_ecom_back-in-stock-notifications";
import { items } from "@wix/data";
import { posts, categories } from "@wix/blog";

export function getWixClient(tokens?: Tokens) {
  return createClient({
    modules: {
      collections,
      products,
      currentCart,
      checkout,
      orders,
      members,
      reviews,
      redirects,
      files,
      items,
      posts,
      categories,
      backInStockNotifications,
    },
    auth: OAuthStrategy({
      clientId: env.NEXT_PUBLIC_WIX_CLIENT_ID,
      tokens,
    }),
  });
}

export type WixClient = ReturnType<typeof getWixClient>;