'use client';

import * as React from "react";
import { motion } from "framer-motion";

import { cn } from "../../../lib/utils";

interface ProductCardProps {
    title: string;
    price: number;
    currency?: string;
    imageUrl?: string;
    description?: string;
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
    description,
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
                "w-full flex flex-col bg-white text-gray-800 rounded-xl border-2 border-[#FFE082] shadow-sm hover:shadow-lg hover:border-[#FFB300] transition-all duration-200 overflow-hidden",
                className
            )}
        >
            {/* Product Image */}
            {imageUrl && (
                <div className="relative aspect-square w-full overflow-hidden bg-[#FFF8E1]">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
            )}

            {/* Product Content */}
            <div className="flex flex-col flex-grow p-4">
                {/* Product Header */}
                <div className="mb-2">
                    <h2 className="text-base font-semibold text-[#6B4423] leading-tight mb-1 line-clamp-2">{title}</h2>
                    <p className="text-lg font-bold text-[#FFB300]">
                        {currency}{price}
                    </p>
                </div>

                {/* Product Description */}
                {description && (
                    <div className="mb-3">
                        <p className="text-xs text-[#8B4513] line-clamp-2 leading-relaxed">{description}</p>
                    </div>
                )}

                {/* Color Selector */}
                <div className="mb-3">
                    <label className="text-xs font-medium text-[#8B4513] mb-1.5 block">
                        Color
                    </label>
                    <div className="flex items-center gap-2 flex-wrap" role="radiogroup">
                        {colors.map((color) => (
                            <motion.button
                                key={color}
                                type="button"
                                onClick={() => setSelectedColor(color)}
                                style={{ backgroundColor: color }}
                                className={cn(
                                    "h-7 w-7 rounded-full border-2 transition-all duration-200",
                                    selectedColor === color
                                        ? "ring-2 ring-[#FFB300] ring-offset-1 ring-offset-white border-white scale-110"
                                        : "border-[#FFE082] hover:scale-110 hover:border-[#FFB300]"
                                )}
                                whileHover={{ scale: 1.15 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label={`Select color ${color}`}
                                role="radio"
                                aria-checked={selectedColor === color}
                            />
                        ))}
                    </div>
                </div>

                {/* Add to Cart Button */}
                <motion.button
                    onClick={handleAddToCart}
                    className="mt-auto w-full bg-[#FFB300] text-[#6B4423] py-2.5 px-4 rounded-lg font-bold text-sm hover:bg-[#FFC107] transition-colors duration-200 shadow-sm hover:shadow-md"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                >
                    Add to cart
                </motion.button>
            </div>
        </motion.div>
    );
};

export { ProductCard };