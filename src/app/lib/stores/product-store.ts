// src/lib/stores/product-store.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface ProductFilterState {
    // Selected collection/category
    selectedCollection: string;
    setSelectedCollection: (collection: string) => void;

    // Search query
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    clearSearch: () => void;

    // Sort preferences
    sortBy: 'newest' | 'price-low' | 'price-high' | 'name-asc' | 'name-desc';
    setSortBy: (sortBy: ProductFilterState['sortBy']) => void;

    // Price range filter
    priceRange: [number, number];
    setPriceRange: (range: [number, number]) => void;
    resetPriceRange: () => void;

    // Color filter (for filtering multiple products by color)
    selectedColors: string[];
    toggleColor: (color: string) => void;
    clearColorFilters: () => void;

    // View mode (grid/list)
    viewMode: 'grid' | 'list';
    setViewMode: (mode: 'grid' | 'list') => void;

    // Items per page
    itemsPerPage: number;
    setItemsPerPage: (count: number) => void;

    // Reset all filters
    resetFilters: () => void;
}

const DEFAULT_PRICE_RANGE: [number, number] = [0, 1000];

export const useProductStore = create<ProductFilterState>()(
    devtools(
        persist(
            (set) => ({
                // Collection
                selectedCollection: 'all',
                setSelectedCollection: (collection) =>
                    set({ selectedCollection: collection }, false, 'setSelectedCollection'),

                // Search
                searchQuery: '',
                setSearchQuery: (query) => set({ searchQuery: query }, false, 'setSearchQuery'),
                clearSearch: () => set({ searchQuery: '' }, false, 'clearSearch'),

                // Sort
                sortBy: 'newest',
                setSortBy: (sortBy) => set({ sortBy }, false, 'setSortBy'),

                // Price range
                priceRange: DEFAULT_PRICE_RANGE,
                setPriceRange: (range) => set({ priceRange: range }, false, 'setPriceRange'),
                resetPriceRange: () => set({ priceRange: DEFAULT_PRICE_RANGE }, false, 'resetPriceRange'),

                // Color filters
                selectedColors: [],
                toggleColor: (color) =>
                    set((state) => ({
                        selectedColors: state.selectedColors.includes(color)
                            ? state.selectedColors.filter(c => c !== color)
                            : [...state.selectedColors, color],
                    }), false, 'toggleColor'),
                clearColorFilters: () => set({ selectedColors: [] }, false, 'clearColorFilters'),

                // View mode
                viewMode: 'grid',
                setViewMode: (mode) => set({ viewMode: mode }, false, 'setViewMode'),

                // Items per page
                itemsPerPage: 12,
                setItemsPerPage: (count) => set({ itemsPerPage: count }, false, 'setItemsPerPage'),

                // Reset all
                resetFilters: () =>
                    set({
                        selectedCollection: 'all',
                        searchQuery: '',
                        sortBy: 'newest',
                        priceRange: DEFAULT_PRICE_RANGE,
                        selectedColors: [],
                    }, false, 'resetFilters'),
            }),
            {
                name: 'product-filters', // localStorage key
                partialize: (state) => ({
                    // Only persist these fields
                    sortBy: state.sortBy,
                    viewMode: state.viewMode,
                    itemsPerPage: state.itemsPerPage,
                }),
            }
        ),
        { name: 'product-store' }
    )
);

// Utility functions for filtering and sorting products
export interface Product {
    id: string;
    title: string;
    price: number;
    colors: string[];
    collection: string;
    createdAt?: string;
}

export function filterProducts(products: Product[], filters: ProductFilterState): Product[] {
    let filtered = [...products];

    // Filter by collection
    if (filters.selectedCollection !== 'all') {
        filtered = filtered.filter(p => p.collection === filters.selectedCollection);
    }

    // Filter by search query
    if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        filtered = filtered.filter(p =>
            p.title.toLowerCase().includes(query)
        );
    }

    // Filter by price range
    filtered = filtered.filter(p =>
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Filter by colors
    if (filters.selectedColors.length > 0) {
        filtered = filtered.filter(p =>
            p.colors.some(color => filters.selectedColors.includes(color))
        );
    }

    return filtered;
}

export function sortProducts(products: Product[], sortBy: ProductFilterState['sortBy']): Product[] {
    const sorted = [...products];

    switch (sortBy) {
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
        case 'name-asc':
            return sorted.sort((a, b) => a.title.localeCompare(b.title));
        case 'name-desc':
            return sorted.sort((a, b) => b.title.localeCompare(a.title));
        case 'newest':
            return sorted.sort((a, b) => {
                if (!a.createdAt || !b.createdAt) return 0;
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            });
        default:
            return sorted;
    }
}