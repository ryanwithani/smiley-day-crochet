'use client';

// app/components/cart/CartDrawer.tsx
import { useEffect } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/app/lib/stores/cart-store';
import { formatPrice, calculateCartTotals, getCartItemDisplayName } from '@/app/lib/utils/cart-utils';
import type { CartItem } from '@/app/lib/types/cart';
import Link from 'next/link';
import Image from 'next/image';

export function CartDrawer() {
    const { items, isOpen, closeCart, updateQuantity, removeItem } = useCartStore();

    const totals = calculateCartTotals(items);
    const isEmpty = items.length === 0;

    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Handle escape key to close drawer
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                closeCart();
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, closeCart]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-black/50 z-100"
                        aria-hidden="true"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-105 flex flex-col"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="cart-title"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-[#FFE082] bg-[#FFF3E0]">
                            <h2
                                id="cart-title"
                                className="text-xl font-bold text-[#6B4423] flex items-center gap-2"
                            >
                                <ShoppingBag className="w-5 h-5" />
                                Shopping Cart ({items.reduce((sum, item) => sum + item.quantity, 0)})
                            </h2>
                            <button
                                onClick={closeCart}
                                className="p-2 hover:bg-[#FFE082] rounded-full transition-colors"
                                aria-label="Close cart"
                            >
                                <X className="w-5 h-5 text-[#8B4513]" />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-4">
                            {isEmpty ? (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <ShoppingBag className="w-16 h-16 text-[#FFE082] mb-4" />
                                    <p className="text-lg font-medium text-[#8B4513] mb-2">
                                        Your cart is empty
                                    </p>
                                    <p className="text-sm text-foreground mb-6">
                                        Add some handmade items to get started!
                                    </p>
                                    <button
                                        onClick={closeCart}
                                        className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90 transition-colors"
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {items.map((item) => (
                                        <CartItem
                                            key={item.id}
                                            item={item}
                                            onUpdateQuantity={updateQuantity}
                                            onRemove={removeItem}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer - Totals and Checkout */}
                        {!isEmpty && (
                            <div className="border-t border-border bg-background p-4 space-y-4">
                                {/* Free Shipping Progress */}
                                {!totals.hasFreeShipping && (
                                    <div className="text-sm text-secondary bg-white rounded-lg p-3 border border-border">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-medium">
                                                {formatPrice(totals.amountToFreeShipping, items[0]?.currency)} away from free shipping!
                                            </span>
                                        </div>
                                        <div className="w-full bg-accent rounded-full h-2 overflow-hidden">
                                            <div
                                                className="bg-primary h-full transition-all duration-300"
                                                style={{
                                                    width: `${Math.min((totals.subtotal / totals.shippingThreshold) * 100, 100)}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Totals */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm text-secondary">
                                        <span>Subtotal</span>
                                        <span>{formatPrice(totals.subtotal, items[0]?.currency)}</span>
                                    </div>
                                    {totals.shipping > 0 && (
                                        <div className="flex items-center justify-between text-sm text-secondary">
                                            <span>Shipping</span>
                                            <span>{formatPrice(totals.shipping, items[0]?.currency)}</span>
                                        </div>
                                    )}
                                    {totals.tax > 0 && (
                                        <div className="flex items-center justify-between text-sm text-secondary">
                                            <span>Tax</span>
                                            <span>{formatPrice(totals.tax, items[0]?.currency)}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center justify-between text-lg font-bold text-foreground pt-2 border-t border-border">
                                        <span>Total</span>
                                        <span>{formatPrice(totals.total, items[0]?.currency)}</span>
                                    </div>
                                </div>

                                {/* Checkout Button */}
                                <button
                                    onClick={() => {
                                        // TODO: Implement checkout functionality
                                        console.log('Proceeding to checkout...');
                                        alert('Checkout functionality coming soon!');
                                    }}
                                    className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-bold text-lg hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg"
                                >
                                    Proceed to Checkout
                                </button>

                                <button
                                    onClick={closeCart}
                                    className="w-full text-secondary py-2 text-sm hover:text-primary transition-colors"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

// Cart Item Component
interface CartItemProps {
    item: CartItem;
    onUpdateQuantity: (id: string, quantity: number) => void;
    onRemove: (id: string) => void;
}

function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
    const displayName = getCartItemDisplayName(item);

    return (
        <div className="flex gap-4 bg-white rounded-lg p-3 border border-border hover:border-primary transition-colors">
            {/* Product Image */}
            <Link
                href={`/products/${item.handle}`}
                className="shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-background border border-border"
            >
                <img
                    src={item.image.url}
                    alt={item.image.altText}
                    className="w-full h-full object-cover"
                />
            </Link>

            {/* Product Details */}
            <div className="flex-1 min-w-0">
                <Link
                    href={`/products/${item.handle}`}
                    className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-2 text-sm mb-1"
                >
                    {displayName}
                </Link>

                <p className="text-sm font-medium text-primary mb-2">
                    {formatPrice(item.price, item.currency)}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                    <div className="flex items-center border border-border rounded-lg overflow-hidden">
                        <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-background transition-colors"
                            aria-label="Decrease quantity"
                        >
                            <Minus className="w-3 h-3 text-secondary" />
                        </button>
                        <span className="px-3 py-1 text-sm font-medium text-foreground min-w-8 text-center">
                            {item.quantity}
                        </span>
                        <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-background transition-colors"
                            aria-label="Increase quantity"
                        >
                            <Plus className="w-3 h-3 text-secondary" />
                        </button>
                    </div>

                    <button
                        onClick={() => onRemove(item.id)}
                        className="p-1 hover:bg-destructive/10 text-destructive rounded transition-colors"
                        aria-label="Remove item"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Item Subtotal */}
            <div className="shrink-0 text-right">
                <p className="text-sm font-bold text-foreground">
                    {formatPrice(item.price * item.quantity, item.currency)}
                </p>
            </div>
        </div>
    );
}