// src/app/components/products/AddToCartButton.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Check } from 'lucide-react';
import { useCartStore } from '@/app/lib/stores/cart-store';
import { useUIStore } from '@/app/lib/stores/ui-store';

interface AddToCartButtonProps {
    productId: string;
    productTitle: string;
    productHandle: string;
    productPrice: number;
    productCurrency?: string;
    productImage: {
        url: string;
        altText: string;
    };
    selectedColor?: string;
    selectedColorName?: string;
    variantId?: string;
    quantity?: number;
    variant?: 'default' | 'small' | 'large';
    className?: string;
}

export function AddToCartButton({
    productId,
    productTitle,
    productHandle,
    productPrice,
    productCurrency = 'USD',
    productImage,
    selectedColor,
    selectedColorName,
    variantId,
    quantity = 1,
    variant = 'default',
    className = '',
}: AddToCartButtonProps) {
    const [isAdding, setIsAdding] = useState(false);
    const [justAdded, setJustAdded] = useState(false);
    const addItem = useCartStore((state) => state.addItem);
    const addToast = useUIStore((state) => state.addToast);

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isAdding || justAdded) return;

        setIsAdding(true);

        try {
            // Simulate a brief delay for UX (optional)
            await new Promise(resolve => setTimeout(resolve, 300));

            // Add item to cart using user's cart-store format
            addItem({
                productId,
                variantId,
                title: productTitle,
                handle: productHandle,
                price: productPrice,
                currency: productCurrency,
                image: productImage,
                selectedColor,
                selectedColorName,
                quantity,
            });

            // Show success state
            setJustAdded(true);

            // Show toast notification
            addToast({
                type: 'success',
                message: `Added ${productTitle} to cart!`,
                duration: 3000,
            });

            // Reset success state after animation
            setTimeout(() => {
                setJustAdded(false);
            }, 2000);

        } catch (error) {
            console.error('Error adding to cart:', error);
            addToast({
                type: 'error',
                message: 'Failed to add item to cart. Please try again.',
                duration: 5000,
            });
        } finally {
            setIsAdding(false);
        }
    };

    const sizeClasses = {
        small: 'py-2 px-4 text-sm',
        default: 'py-2.5 px-4 text-sm',
        large: 'py-4 px-6 text-lg',
    };

    return (
        <motion.button
            onClick={handleAddToCart}
            disabled={isAdding || justAdded}
            className={`
        w-full bg-primary text-primary-foreground rounded-lg font-bold
        hover:bg-primary/90 transition-all duration-200 
        shadow-sm hover:shadow-md
        disabled:opacity-70 disabled:cursor-not-allowed
        flex items-center justify-center gap-2
        ${sizeClasses[variant]}
        ${className}
      `}
            whileHover={{ scale: justAdded ? 1 : 1.01 }}
            whileTap={{ scale: justAdded ? 1 : 0.99 }}
        >
            {justAdded ? (
                <>
                    <Check className="w-5 h-5" />
                    <span>Added!</span>
                </>
            ) : isAdding ? (
                <>
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                        <ShoppingCart className="w-5 h-5" />
                    </motion.div>
                    <span>Adding...</span>
                </>
            ) : (
                <>
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add to cart</span>
                </>
            )}
        </motion.button>
    );
}