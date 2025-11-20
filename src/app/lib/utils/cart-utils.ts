// lib/utils/cart-utils.ts

import type { CartItem } from '../types/cart';

/**
 * Format price with currency symbol
 */
export function formatPrice(amount: number, currency: string = 'USD'): string {
    const symbols: Record<string, string> = {
        'USD': '$',
        'EUR': '€',
        'GBP': '£',
        'CAD': '$',
        'AUD': '$',
    };

    const symbol = symbols[currency] || '$';
    return `${symbol}${amount.toFixed(2)}`;
}

/**
 * Calculate cart totals
 */
export function calculateCartTotals(items: CartItem[]) {
    const subtotal = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    // Tax calculation (adjust rate as needed)
    const taxRate = 0.0; // 0% - update based on your requirements
    const tax = subtotal * taxRate;

    // Shipping calculation (you can make this more complex)
    const shipping = subtotal > 50 ? 0 : 5.99; // Free shipping over $50
    const shippingThreshold = 50;

    const total = subtotal + tax + shipping;

    return {
        subtotal,
        tax,
        shipping,
        total,
        shippingThreshold,
        hasFreeShipping: subtotal >= shippingThreshold,
        amountToFreeShipping: Math.max(0, shippingThreshold - subtotal),
    };
}

/**
 * Convert Product to CartItem format
 */
export function productToCartItem(
    product: {
        id: string;
        title: string;
        handle: string;
        price: number;
        currency?: string;
        images: { url: string; altText: string }[];
    },
    options: {
        selectedColor?: string;
        selectedColorName?: string;
        variantId?: string;
        quantity?: number;
    } = {}
): Omit<CartItem, 'id' | 'quantity'> & { quantity?: number } {
    return {
        productId: product.id,
        variantId: options.variantId,
        title: product.title,
        handle: product.handle,
        price: product.price,
        currency: product.currency || 'USD',
        quantity: options.quantity || 1,
        image: product.images[0] || {
            url: '/placeholder-product.png',
            altText: product.title,
        },
        selectedColor: options.selectedColor,
        selectedColorName: options.selectedColorName,
    };
}

/**
 * Get cart item display name (includes variant info)
 */
export function getCartItemDisplayName(item: CartItem): string {
    let name = item.title;

    if (item.selectedColorName) {
        name += ` - ${item.selectedColorName}`;
    }

    return name;
}

/**
 * Check if cart has any items
 */
export function isCartEmpty(items: CartItem[]): boolean {
    return items.length === 0;
}

/**
 * Get unique product count (not including quantities)
 */
export function getUniqueProductCount(items: CartItem[]): number {
    return items.length;
}

/**
 * Validate cart item before adding
 */
export function validateCartItem(
    item: Omit<CartItem, 'id'>
): { valid: boolean; error?: string } {
    if (!item.productId) {
        return { valid: false, error: 'Product ID is required' };
    }

    if (!item.title || item.title.trim() === '') {
        return { valid: false, error: 'Product title is required' };
    }

    if (item.price < 0) {
        return { valid: false, error: 'Price cannot be negative' };
    }

    if (item.quantity < 1) {
        return { valid: false, error: 'Quantity must be at least 1' };
    }

    if (item.quantity > 99) {
        return { valid: false, error: 'Quantity cannot exceed 99' };
    }

    return { valid: true };
}