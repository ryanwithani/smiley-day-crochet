// app/page.tsx
import { ProductHero } from "./components/layout/ProductHero";
import { Products } from "./components/products/Products";

export default function HomePage() {
  return (
    // Single seamless background gradient for entire page
    <div className="bg-gradient-to-b from-background to-white">
      <ProductHero />
      <Products />
    </div>
  );

}