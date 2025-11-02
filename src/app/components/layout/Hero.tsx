import Image from 'next/image';
import { UpcomingMarkets } from './UpcomingMarkets';
import type { Market } from './UpcomingMarkets';
import { Products } from '../products/Products';

interface HeroProps {
  siteBlurb?: string;
  upcomingMarkets?: Market[];
}

export function Hero({ 
  siteBlurb = "What started as a cozy hobby quickly became my favorite way to spread happiness — one stitch at a time. I believe handmade things carry a little piece of joy, and my goal is to share that joy with you through colorful, feel-good crochet creations. From plushies to accessories, each piece is crafted with care, love, and plenty of smiles.",
  upcomingMarkets 
}: HeroProps) {
  return (
    <div className="relative overflow-hidden">
      {/* Decorative elements - Sunflower inspired */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-[#FFF3E0] rounded-full opacity-60"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-[#FFE082] rounded-full opacity-60"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-0 lg:gap-1 items-center mb-12 lg:mb-16">
          {/* Site Blurb Text Block - Rotating Card on Left */}
          <div className="relative z-10 flex justify-center lg:justify-end lg:pr-2">
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border-8 border-[#FFE082] transform rotate-2 hover:rotate-0 transition-transform duration-300 p-8 max-w-lg">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#8B4513] mb-4" style={{ fontFamily: 'var(--font-dynapuff)' }}>
                Hi, I'm Cassidy !
              </h2>
              <p className="text-lg text-[#6B4423] leading-relaxed" style={{ fontFamily: 'var(--font-quicksand)' }}>
                {siteBlurb}
              </p>
            </div>
          </div>

          {/* Logo Image - Static on Right */}
          <div className="relative z-10 flex justify-center lg:justify-start lg:pl-2">
            <Image
              src="/imageLogo.svg"
              alt="Smiley Day Crochet Logo"
              className="w-full max-w-md h-auto object-contain"
              width={500}
              height={500}
            />
          </div>
        </div>

      </div>
      
      {/* Upcoming Markets Component - Full width white background */}
      <UpcomingMarkets markets={upcomingMarkets} />

      {/* Products Component */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <Products />
      </div>
    </div>
  );
}