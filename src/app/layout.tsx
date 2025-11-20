import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { CartDrawer } from "./components/cart/CartDrawer";
import { ToastContainer } from "./components/ui/Toast";
import { MarketAnnouncementBar } from "./components/layout/MarketAnnouncement";

// Configure Inter for all text
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: "Smiley Day Crochet",
  description: "Smiley Day Crochet is a crochet shop that sells crochet patterns and supplies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const market = {
    name: "Deck the Stalls Christmas Market",
    date: "November 21st-23rd",
    location: "The Barn at Homestead, Moss Point, MS",
  };
  return (
    <html lang="en">
      <body
        className={`${inter.variable} bg-linear-to-br from-[#FFF8E1] via-[#FFF3E0] to-[#FFECB3] antialiased min-h-screen`}
      >
        <ToastContainer />
        <CartDrawer />
        <div className="flex flex-col min-h-screen">
          <MarketAnnouncementBar
            market={market}
            backgroundColor="#E74C3C"
            textColor="#FFFFFF"
          />
          <Header />
          <main className="grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}