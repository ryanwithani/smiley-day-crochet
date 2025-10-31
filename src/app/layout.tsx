import type { Metadata } from "next";
// Direct font imports (easier than using next/font)
// You'll need to install these packages:
// npm install @fontsource/quicksand @fontsource/outfit @fontsource/shadows-into-light @fontsource/caveat
import "@fontsource/quicksand/400.css";
import "@fontsource/quicksand/500.css";
import "@fontsource/quicksand/600.css";
import "@fontsource/quicksand/700.css";
import "@fontsource/outfit/400.css";
import "@fontsource/outfit/500.css";
import "@fontsource/outfit/600.css";
import "@fontsource/outfit/700.css";
import "@fontsource/shadows-into-light/400.css";
import "@fontsource/caveat/400.css";
import "@fontsource/caveat/500.css";
import "@fontsource/caveat/600.css";

import "./globals.css";
import { Header } from "./components/layout/Header";
import Footer from "./components/layout/Footer";

export const metadata: Metadata = {
  title: "Smiley Day Crochet",
  description: "Smiley Day Crochet is a crochet shop that sells crochet patterns and supplies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-[#E1F5FE] via-[#F3E5F5] to-[#FFF9C4] antialiased min-h-screen">
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}