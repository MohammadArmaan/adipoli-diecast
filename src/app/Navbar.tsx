import logo from "@/assets/logo.png";
import SearchField from "@/components/SearchField";
import UserButton from "@/components/UserButton";
import { getWixServerClient } from "@/lib/wix-client.server";
import { getCart } from "@/wix-api/cart";
import { getCollections } from "@/wix-api/collections";
import { getLoggedInMember } from "@/wix-api/members";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import MainNavigation from "./MainNavigation";
import MobileMenu from "./MobileMenu";
import ShoppingCartButton from "./ShoppingCartButton";

export default async function Navbar() {
  const wixClient = await getWixServerClient();

  // const [cart, loggedInMember, collections] = await Promise.all([
  const [cart, loggedInMember] = await Promise.all([
    getCart(wixClient),
    getLoggedInMember(wixClient),
    // getCollections(wixClient),
  ]);

  return (
    <header className="fixed left-1/2 top-5 z-50 w-[95%] max-w-7xl -translate-x-1/2">
      <div className="relative flex items-center justify-between gap-5 rounded-2xl border border-white/15 bg-white/5 px-6 py-4 shadow-[0_8px_40px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition-all duration-300 dark:bg-black/40">
        {/* Glass highlight overlay */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(120deg,rgba(255,255,255,0.25),transparent_40%)] opacity-20" />
        <Suspense>
          <MobileMenu
            loggedInMember={loggedInMember}
          />
        </Suspense>

        {/* LEFT SIDE */}
        <div className="flex items-center gap-6">
          <Link href="/" className="group flex items-center gap-1 md:gap-3">
            <Image src={logo} alt="Anup Wheels Logo" width={50} height={50} />
            <h1 className="md:text-xl text-lg font-extrabold text-nowrap tracking-wide text-primary transition-colors group-hover:text-primary">
              ANUP WHEELS
            </h1>
          </Link>

          <MainNavigation
            className="hidden lg:flex"
          />
        </div>

        {/* SEARCH */}
        <SearchField className="hidden max-w-80 bg-transparent lg:inline" />

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-5">
          <UserButton
            loggedInMember={loggedInMember}
            className="hidden text-foreground lg:inline-flex"
          />
          <ShoppingCartButton initialData={cart} />
        </div>
      </div>

      {/* Subtle bottom glow */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl">
        <div className="absolute -bottom-2 left-0 right-0 h-8 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.3),transparent_70%)] opacity-60 blur-xl" />
      </div>
    </header>
  );
}
