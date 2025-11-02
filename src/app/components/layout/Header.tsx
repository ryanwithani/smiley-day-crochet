'use client';

import { ShoppingCart, Heart, User, Menu, Search } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-[#FFE082]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image src="/Smiley Day Crochet.svg" alt="Smiley Day Crochet Logo" width={300} height={300} />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-[#6B4423] hover:text-[#FFB300] transition-colors font-medium">
              Shop All
            </a>
            <a href="#" className="text-[#6B4423] hover:text-[#FFB300] transition-colors font-medium">
              New Arrivals
            </a>
            <a href="#" className="text-[#6B4423] hover:text-[#FFB300] transition-colors font-medium">
              Categories
            </a>
            <a href="#" className="text-[#6B4423] hover:text-[#FFB300] transition-colors font-medium">
              About
            </a>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-[#FFF3E0] rounded-full transition-colors">
              <Search className="w-5 h-5 text-[#8B4513]" />
            </button>
            <button className="p-2 hover:bg-[#FFE082] rounded-full transition-colors">
              <Heart className="w-5 h-5 text-[#8B4513]" />
            </button>
            <button className="p-2 hover:bg-[#FFF8E1] rounded-full transition-colors">
              <User className="w-5 h-5 text-[#8B4513]" />
            </button>
            <button className="p-2 hover:bg-[#FFECB3] rounded-full transition-colors relative">
              <ShoppingCart className="w-5 h-5 text-[#8B4513]" />
              <span className="absolute top-0 right-0 bg-[#FFB300] text-[#6B4423] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                3
              </span>
            </button>
            <button 
              className="md:hidden p-2 hover:bg-[#FFF3E0] rounded-full transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-5 h-5 text-[#8B4513]" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#FFE082]">
            <div className="flex flex-col space-y-4">
              <a href="#" className="text-[#6B4423] hover:text-[#FFB300] transition-colors font-medium">
                Shop All
              </a>
              <a href="#" className="text-[#6B4423] hover:text-[#FFB300] transition-colors font-medium">
                New Arrivals
              </a>
              <a href="#" className="text-[#6B4423] hover:text-[#FFB300] transition-colors font-medium">
                Categories
              </a>
              <a href="#" className="text-[#6B4423] hover:text-[#FFB300] transition-colors font-medium">
                About
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}