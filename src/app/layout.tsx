import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Poppins, Racing_Sans_One, Titillium_Web } from "next/font/google";
import Footer from "./Footer";
import "./globals.css";
import Navbar from "./Navbar";
import ReactQueryProvider from "./ReactQueryProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const racingSansOne = Racing_Sans_One({
  subsets: ["latin"],
  weight: "400",
});

const titilliumWeb = Titillium_Web({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Anup Wheels",
    default: "Anup Wheels",
  },
  description:
    "Discover premium die-cast cars, limited edition Hot Wheels collectibles, and track-ready legends. Ignite your collection with Anup Wheels.",
  keywords: [
    "Hot Wheels",
    "Die-cast cars",
    "Limited edition cars",
    "Car collectibles",
    "Toy cars India",
  ],
  openGraph: {
    title: "Anup Wheels – Ignite Your Collection",
    description:
      "Premium die-cast cars, limited drops, and racing legends. Discover exclusive Hot Wheels collectibles.",
    url: "https://anup-wheels.vercel.app/",
    siteName: "Anup Wheels",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Anup Wheels Hot Wheels Collection",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anup Wheels – Ignite Your Collection",
    description: "Limited edition die-cast cars and racing legends.",
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${titilliumWeb.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <Navbar />
            <div className="min-h-[50vh] pt-32">{children}</div>
            <Footer />
          </ReactQueryProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
