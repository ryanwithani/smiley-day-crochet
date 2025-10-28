// app/page.tsx
import ProductCardDemo from "./components/products/ProductCardDemo";

export default function HomePage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-center text-brand-purple-dark mb-8">
        Our Latest Creations
      </h1>
      <div className="flex justify-center">
        <ProductCardDemo />
      </div>
    </div>
  );
}