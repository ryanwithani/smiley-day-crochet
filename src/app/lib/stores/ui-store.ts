// src/lib/stores/ui-store.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UIState {
    // Mobile menu
    mobileMenuOpen: boolean;
    setMobileMenuOpen: (open: boolean) => void;
    toggleMobileMenu: () => void;

    // Search modal
    searchModalOpen: boolean;
    setSearchModalOpen: (open: boolean) => void;
    toggleSearchModal: () => void;

    // Toast notifications
    toasts: Toast[];
    addToast: (toast: Omit<Toast, 'id' | 'timestamp'>) => void;
    removeToast: (id: string) => void;
    clearToasts: () => void;

    // Filter panel (mobile)
    filterPanelOpen: boolean;
    setFilterPanelOpen: (open: boolean) => void;
    toggleFilterPanel: () => void;
}

export interface Toast {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    duration?: number; // milliseconds, 0 for persistent
    timestamp: number;
}

export const useUIStore = create<UIState>()(
    devtools(
        (set, get) => ({
            // Mobile menu
            mobileMenuOpen: false,
            setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }, false, 'setMobileMenuOpen'),
            toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen }), false, 'toggleMobileMenu'),

            // Search modal
            searchModalOpen: false,
            setSearchModalOpen: (open) => set({ searchModalOpen: open }, false, 'setSearchModalOpen'),
            toggleSearchModal: () => set((state) => ({ searchModalOpen: !state.searchModalOpen }), false, 'toggleSearchModal'),

            // Toast notifications
            toasts: [],
            addToast: (toast) => {
                const id = `toast-${Date.now()}-${Math.random()}`;
                const timestamp = Date.now();
                const newToast: Toast = {
                    id,
                    timestamp,
                    duration: toast.duration ?? 5000, // Default 5 seconds
                    ...toast,
                };

                set((state) => ({
                    toasts: [...state.toasts, newToast],
                }), false, 'addToast');

                // Auto-remove toast after duration
                if (newToast.duration && newToast.duration > 0) {
                    setTimeout(() => {
                        get().removeToast(id);
                    }, newToast.duration);
                }
            },
            removeToast: (id) => set((state) => ({
                toasts: state.toasts.filter(toast => toast.id !== id),
            }), false, 'removeToast'),
            clearToasts: () => set({ toasts: [] }, false, 'clearToasts'),

            // Filter panel
            filterPanelOpen: false,
            setFilterPanelOpen: (open) => set({ filterPanelOpen: open }, false, 'setFilterPanelOpen'),
            toggleFilterPanel: () => set((state) => ({ filterPanelOpen: !state.filterPanelOpen }), false, 'toggleFilterPanel'),
        }),
        { name: 'ui-store' }
    )
);