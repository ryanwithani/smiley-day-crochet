// src/app/components/ui/Toast.tsx
'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { useUIStore } from '@/app/lib/stores/ui-store';

export function ToastContainer() {
    const toasts = useUIStore((state) => state.toasts);
    const removeToast = useUIStore((state) => state.removeToast);

    return (
        <div className="fixed top-4 right-4 z-100 flex flex-col gap-2 pointer-events-none">
            <AnimatePresence mode="popLayout">
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        toast={toast}
                        onClose={() => removeToast(toast.id)}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
}

interface ToastProps {
    toast: {
        id: string;
        type: 'success' | 'error' | 'warning' | 'info';
        message: string;
    };
    onClose: () => void;
}

function Toast({ toast, onClose }: ToastProps) {
    const icons = {
        success: CheckCircle,
        error: AlertCircle,
        warning: AlertTriangle,
        info: Info,
    };

    const colors = {
        success: {
            bg: 'bg-green-50',
            border: 'border-green-200',
            text: 'text-green-800',
            icon: 'text-green-500',
        },
        error: {
            bg: 'bg-red-50',
            border: 'border-red-200',
            text: 'text-red-800',
            icon: 'text-red-500',
        },
        warning: {
            bg: 'bg-yellow-50',
            border: 'border-yellow-200',
            text: 'text-yellow-800',
            icon: 'text-yellow-500',
        },
        info: {
            bg: 'bg-blue-50',
            border: 'border-blue-200',
            text: 'text-blue-800',
            icon: 'text-blue-500',
        },
    };

    const Icon = icons[toast.type];
    const colorScheme = colors[toast.type];

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`
        ${colorScheme.bg} ${colorScheme.border}
        border-2 rounded-lg shadow-lg p-4 pr-12
        min-w-[300px] max-w-md
        pointer-events-auto
        relative
      `}
        >
            <div className="flex items-start gap-3">
                <Icon className={`${colorScheme.icon} w-5 h-5 mt-0.5 flex-shrink-0`} />
                <p className={`${colorScheme.text} text-sm font-medium flex-1`}>
                    {toast.message}
                </p>
            </div>

            <button
                onClick={onClose}
                className={`
          absolute top-2 right-2
          ${colorScheme.text} hover:opacity-70
          transition-opacity
          p-1 rounded
        `}
                aria-label="Close notification"
            >
                <X className="w-4 h-4" />
            </button>
        </motion.div>
    );
}