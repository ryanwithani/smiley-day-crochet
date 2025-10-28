'use client';

import { ProductCard } from "../ui/ProductCard";

// Main demo component to showcase the ProductCard
const ProductCardDemo = () => {
    // Sample product data to be passed as props
    const productData = {
        title: "Jeans",
        price: 40,
        imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop&crop=center",
        colors: ["#3b82f6", "#4b5563", "#f59e0b", "#60a5fa"],
        initialColor: "#3b82f6",
    };

    // Handler function to demonstrate capturing the selected variant details
    const handleAddToCart = (details: { color: string }) => {
        console.log("Added to cart:", details);
        alert(`Added to cart!
Color: ${details.color}`);
    };

    return (
        <div className="flex h-screen w-full items-center justify-center bg-background p-4">
            <ProductCard {...productData} onAddToCart={handleAddToCart} />
        </div>
    );
};

export default ProductCardDemo;
