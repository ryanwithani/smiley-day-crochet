// app/page.tsx
import { Hero } from "./components/layout/Hero";

export default function HomePage() {
  return (
    // Removed extra container and simplified structure for more fluid layout
    <div className="flow-container">
      <Hero />
    </div>
  );
}