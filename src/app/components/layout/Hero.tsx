import Image from 'next/image';
import { UpcomingMarkets } from './UpcomingMarkets';
import type { Market } from './UpcomingMarkets';
import { Products } from '../products/Products';
import { Calendar, MapPin } from 'lucide-react';

interface HeroProps {
  siteBlurb?: string;
  upcomingMarkets?: Market[];
}

export function Hero({
  siteBlurb = "What started as a cozy hobby quickly became my favorite way to spread happiness — one stitch at a time. I believe handmade things carry a little piece of joy, and my goal is to share that joy with you through colorful, feel-good crochet creations. From plushies to accessories, each piece is crafted with care, love, and plenty of smiles.",
  upcomingMarkets = []
}: HeroProps) {
  // TODO: Remove this temporary hardcoded market when data source is ready
  const temporaryMarket: Market = {
    name: 'Your Market Name',
    date: 'December 15, 2024',
    location: 'Market Location Address',
    description: 'Come visit us at the market!'
  };

  // Use temporary market if no markets provided, otherwise use provided markets
  const displayMarkets = upcomingMarkets.length > 0 ? upcomingMarkets : [temporaryMarket];

  const marketCount = displayMarkets.length;
  const singleMarket = marketCount === 1 ? displayMarkets[0] : null;
  const multipleMarkets = marketCount >= 2;

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

        {/* Single Market Banner - Displayed below logo/intro when only 1 market */}
        {singleMarket && (
          <div className="relative z-10 flex justify-center mb-12 lg:mb-16">
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border-8 border-[#FFB300] transform -rotate-1 hover:rotate-0 transition-transform duration-300 p-6 lg:p-8 max-w-2xl w-full">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-3xl lg:text-4xl">🌻</span>
                <h2
                  className="text-2xl lg:text-3xl font-bold text-[#FFB300] text-center"
                  style={{ fontFamily: 'var(--font-dynapuff)' }}
                >
                  Find Me At
                </h2>
                <span className="text-3xl lg:text-4xl">🌻</span>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-[#FFE082]">
                <h3 className="text-xl lg:text-2xl font-bold text-[#FFB300] mb-4 text-center">
                  {singleMarket.name}
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-center space-x-2 text-[#6B4423]">
                    <Calendar className="w-5 h-5 text-[#8B4513]" />
                    <span className="text-base font-medium">{singleMarket.date}</span>
                  </div>

                  <div className="flex items-center justify-center space-x-2 text-[#6B4423]">
                    <MapPin className="w-5 h-5 text-[#8B4513]" />
                    <span className="text-base">{singleMarket.location}</span>
                  </div>

                  {singleMarket.description && (
                    <p className="text-sm text-[#6B4423] mt-4 pt-4 border-t border-[#FFE082] text-center">
                      {singleMarket.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Upcoming Markets Component - Only show for 2+ markets */}
      {multipleMarkets && <UpcomingMarkets markets={displayMarkets} />}

      {/* Products Component - Clean separation with spacing */}
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <Products />
        </div>
      </div>
    </div>
  );
}