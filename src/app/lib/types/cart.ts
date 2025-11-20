// lib/types/cart.ts

export interface CartItem {
    id: string; // Unique ID for this cart item (productId + variant)
    productId: string; // Shopify product ID
    variantId?: string; // Shopify variant ID (if applicable)
    title: string;
    handle: string;
    price: number;
    currency: string;
    quantity: number;
    image: {
        url: string;
        altText: string;
    };
    // Variant details
    selectedColor?: string;
    selectedColorName?: string;
    // Additional variant options can be added here
    // e.g., size, material, etc.
}

export interface CartState {
    items: CartItem[];
    isOpen: boolean;
}

export interface CartActions {
    // Item management
    addItem: (item: Omit<CartItem, 'id' | 'quantity'> & { quantity?: number }) => void;
    removeItem: (itemId: string) => void;
    updateQuantity: (itemId: string, quantity: number) => void;
    clearCart: () => void;

    // UI state
    openCart: () => void;
    closeCart: () => void;
    toggleCart: () => void;

    // Computed values (these are derived, not actions, but included for convenience)
    getItemCount: () => number;
    getSubtotal: () => number;
}

export type CartStore = CartState & CartActions;