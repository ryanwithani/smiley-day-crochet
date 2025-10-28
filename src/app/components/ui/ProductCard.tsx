'use client';

import * as React from "react";
import { motion } from "framer-motion";

import { cn } from "../../../lib/utils";
import { Button } from "./button";

// Props interface for type safety and reusability
interface ProductCardProps {
    title: string;
    price: number;
    currency?: string;
    imageUrl?: string;
    colors: string[];
    initialColor: string;
    onAddToCart: (details: { color: string }) => void;
    className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
    title,
    price,
    currency = "$",
    imageUrl,
    colors,
    initialColor,
    onAddToCart,
    className,
}) => {
    const [selectedColor, setSelectedColor] = React.useState(initialColor);

    const handleAddToCart = () => {
        onAddToCart({ color: selectedColor });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={cn(
                "w-full max-w-sm rounded-xl border bg-card text-card-foreground shadow-lg p-6",
                className
            )}
        >
            {/* Product Image */}
            {imageUrl && (
                <div className="mb-4">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-48 object-cover rounded-lg"
                    />
                </div>
            )}

            {/* Product Header */}
            <div className="flex items-start justify-between mb-4">
                <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
                <p className="text-2xl font-semibold text-primary">
                    {currency}
                    {price}
                </p>
            </div>

            {/* Color Selector */}
            <div className="mb-6">
                <label className="text-sm font-medium text-muted-foreground">
                    Color
                </label>
                <div className="flex items-center gap-3 mt-2" role="radiogroup">
                    {colors.map((color) => (
                        <motion.button
                            key={color}
                            type="button"
                            onClick={() => setSelectedColor(color)}
                            style={{ backgroundColor: color }}
                            className={cn(
                                "h-8 w-8 rounded-full border-2 transition-transform duration-200",
                                selectedColor === color
                                    ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                                    : "border-transparent"
                            )}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label={`Select color ${color}`}
                            role="radio"
                            aria-checked={selectedColor === color}
                        />
                    ))}
                </div>
            </div>

            {/* Add to Cart Button */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" className="w-full h-12 text-base" onClick={handleAddToCart}>
                    Add to cart
                </Button>
            </motion.div>
        </motion.div>
    );
};

export { ProductCard };
