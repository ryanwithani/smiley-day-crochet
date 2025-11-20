// lib/stores/cart-store.ts
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartItem, CartStore } from '../types/cart';

// Helper function to generate unique cart item ID
// Combines product ID with variant details to create unique entries
function generateCartItemId(
    productId: string,
    selectedColor?: string,
    variantId?: string
): string {
    const parts = [productId];
    if (variantId) parts.push(variantId);
    if (selectedColor) parts.push(selectedColor);
    return parts.join('-');
}

// Helper function to safely parse stored cart data
function parseStoredCart(str: string | null): CartItem[] {
    if (!str) return [];
    try {
        const parsed = JSON.parse(str);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.error('Failed to parse stored cart:', error);
        return [];
    }
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            // Initial state
            items: [],
            isOpen: false,

            // Add item to cart
            addItem: (newItem) => {
                const itemId = generateCartItemId(
                    newItem.productId,
                    newItem.selectedColor,
                    newItem.variantId
                );

                set((state) => {
                    // Check if item already exists in cart
                    const existingItemIndex = state.items.findIndex(
                        (item) => item.id === itemId
                    );

                    if (existingItemIndex > -1) {
                        // Item exists, update quantity
                        const updatedItems = [...state.items];
                        const existingItem = updatedItems[existingItemIndex];
                        updatedItems[existingItemIndex] = {
                            ...existingItem,
                            quantity: existingItem.quantity + (newItem.quantity || 1),
                        };

                        return { items: updatedItems };
                    } else {
                        // New item, add to cart
                        const cartItem: CartItem = {
                            ...newItem,
                            id: itemId,
                            quantity: newItem.quantity || 1,
                        };

                        return { items: [...state.items, cartItem] };
                    }
                });

                // Optionally open cart drawer when item is added
                // Uncomment if you want this behavior
                // get().openCart();
            },

            // Remove item from cart
            removeItem: (itemId) => {
                set((state) => ({
                    items: state.items.filter((item) => item.id !== itemId),
                }));
            },

            // Update item quantity
            updateQuantity: (itemId, quantity) => {
                // Validate quantity
                if (quantity < 1) {
                    get().removeItem(itemId);
                    return;
                }

                // Limit maximum quantity per item (adjust as needed)
                const maxQuantity = 99;
                const validatedQuantity = Math.min(quantity, maxQuantity);

                set((state) => ({
                    items: state.items.map((item) =>
                        item.id === itemId
                            ? { ...item, quantity: validatedQuantity }
                            : item
                    ),
                }));
            },

            // Clear all items from cart
            clearCart: () => {
                set({ items: [] });
            },

            // Open cart drawer
            openCart: () => {
                set({ isOpen: true });
            },

            // Close cart drawer
            closeCart: () => {
                set({ isOpen: false });
            },

            // Toggle cart drawer
            toggleCart: () => {
                set((state) => ({ isOpen: !state.isOpen }));
            },

            // Get total number of items in cart
            getItemCount: () => {
                const { items } = get();
                return items.reduce((total, item) => total + item.quantity, 0);
            },

            // Get cart subtotal
            getSubtotal: () => {
                const { items } = get();
                return items.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                );
            },
        }),
        {
            name: 'smiley-day-cart', // localStorage key
            storage: createJSONStorage(() => localStorage),
            // Only persist cart items, not UI state
            partialize: (state) => ({ items: state.items }),
            // Handle hydration
            onRehydrateStorage: () => {
                return (state, error) => {
                    if (error) {
                        console.error('Failed to hydrate cart store:', error);
                    } else if (state) {
                        console.log('Cart hydrated with', state.items.length, 'items');
                    }
                };
            },
        }
    )
);

// Selector hooks for common operations (optional but recommended for performance)
export const useCartItems = () => useCartStore((state) => state.items);
export const useCartCount = () => useCartStore((state) => state.getItemCount());
export const useCartSubtotal = () => useCartStore((state) => state.getSubtotal());
export const useCartOpen = () => useCartStore((state) => state.isOpen);