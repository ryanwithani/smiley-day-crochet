'use client';

import { ShoppingCart, Heart, User, Menu, Search } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-transparent backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image src="/Smiley Day Crochet.svg" alt="Smiley Day Crochet Logo" width={300} height={300} />
          </div>
a
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-[#7CB342] transition-colors">
              Shop All
            </a>
            <a href="#" className="text-gray-700 hover:text-[#7CB342] transition-colors">
              New Arrivals
            </a>
            <a href="#" className="text-gray-700 hover:text-[#7CB342] transition-colors">
              Categories
            </a>
            <a href="#" className="text-gray-700 hover:text-[#7CB342] transition-colors">
              About
            </a>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-[#E1F5FE] rounded-full transition-colors">
              <Search className="w-5 h-5 text-gray-700" />
            </button>
            <button className="p-2 hover:bg-[#F3E5F5] rounded-full transition-colors">
              <Heart className="w-5 h-5 text-gray-700" />
            </button>
            <button className="p-2 hover:bg-[#FFF9C4] rounded-full transition-colors">
              <User className="w-5 h-5 text-gray-700" />
            </button>
            <button className="p-2 hover:bg-[#E8F5E9] rounded-full transition-colors relative">
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              <span className="absolute top-0 right-0 bg-[#9C27B0] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                3
              </span>
            </button>
            <button 
              className="md:hidden p-2 hover:bg-[#E8F5E9] rounded-full transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#E8F5E9]">
            <div className="flex flex-col space-y-4">
              <a href="#" className="text-gray-700 hover:text-[#7CB342] transition-colors">
                Shop All
              </a>
              <a href="#" className="text-gray-700 hover:text-[#7CB342] transition-colors">
                New Arrivals
              </a>
              <a href="#" className="text-gray-700 hover:text-[#7CB342] transition-colors">
                Categories
              </a>
              <a href="#" className="text-gray-700 hover:text-[#7CB342] transition-colors">
                About
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
