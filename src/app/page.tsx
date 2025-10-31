// app/page.tsx
import ProductCardDemo from "./components/products/ProductCardDemo";
import { Hero } from "./components/layout/Hero";

export default function HomePage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex justify-center">
        <Hero />
      </div>
    </div>
  );
}