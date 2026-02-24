import { getWixServerClient } from "@/lib/wix-client.server";
import { getCollections } from "@/wix-api/collections";
import SearchFilterLayout from "./SearchFilterLayout";
import ShopBanner from "./ShopBanner";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const wixClient = await getWixServerClient();

  const collections = await getCollections(wixClient);

  return (
    <>
      <ShopBanner />
    <SearchFilterLayout collections={collections}>
      <div id="products">
        {children}
      </div>
    </SearchFilterLayout>
    </>
  );
}
