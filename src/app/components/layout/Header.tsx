// src/app/components/layout/Header.tsx
'use client';

import { ShoppingCart, Menu, Search, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useUIStore } from '@/app/lib/stores/ui-store';
import { useCartStore } from '@/app/lib/stores/cart-store';

export function Header() {
  const mobileMenuOpen = useUIStore((state) => state.mobileMenuOpen);
  const toggleMobileMenu = useUIStore((state) => state.toggleMobileMenu);

  // Use cart store methods for cart drawer
  const openCart = useCartStore((state) => state.openCart);
  const cartItemCount = useCartStore((state) => state.getItemCount());

  return (
    <nav className="bg-background/80 backdrop-blur-sm sticky top-[52px] z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/Smiley Day Crochet.svg"
              alt="Smiley Day Crochet Logo"
              width={300}
              height={300}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/#shop"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Shop All
            </Link>
            <Link
              href="/#shop"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              New Arrivals
            </Link>
            <Link
              href="/#shop"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Categories
            </Link>
            <Link
              href="/#about"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              About
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            {/* Search Button - Future feature */}
            <button
              className="p-2 hover:bg-accent rounded-full transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-secondary" />
            </button>

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="p-2 hover:bg-accent rounded-full transition-colors relative"
              aria-label={`Shopping cart with ${cartItemCount} items`}
            >
              <ShoppingCart className="w-5 h-5 text-secondary" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-accent rounded-full transition-colors"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-secondary" />
              ) : (
                <Menu className="w-5 h-5 text-secondary" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <Link
                href="/#shop"
                onClick={toggleMobileMenu}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Shop All
              </Link>
              <Link
                href="/#shop"
                onClick={toggleMobileMenu}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                New Arrivals
              </Link>
              <Link
                href="/#shop"
                onClick={toggleMobileMenu}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Categories
              </Link>
              <Link
                href="/#about"
                onClick={toggleMobileMenu}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}