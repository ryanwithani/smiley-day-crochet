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
    <div className="w-full overflow-hidden">
      {/* Decorative elements with fluid positioning and sizing */}
      <div className="absolute top-[5%] left-[5%] w-[clamp(3rem,5vw,5rem)] h-[clamp(3rem,5vw,5rem)] bg-[#E8F5E9] rounded-full opacity-50"></div>
      <div className="absolute bottom-[10%] right-[10%] w-[clamp(4rem,8vw,8rem)] h-[clamp(4rem,8vw,8rem)] bg-[#F3E5F5] rounded-full opacity-50"></div>
      
      {/* Hero section with improved typography */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero content with fluid spacing */}
          <div className="grid lg:grid-cols-2 gap-0 items-center mb-12">
            {/* Site Blurb Text Block - Using UPDATED hero-text classes for better readability */}
            <div className="relative z-10 flex justify-center lg:justify-end">
              <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg border-4 border-white p-6 md:p-8 max-w-lg">
                {/* Using hero-title class for larger font size */}
                <h2 className="hero-text hero-title text-balance font-bold text-gray-800 mb-4">
                  Hi, I'm Cassidy !
                </h2>
                {/* Using hero-paragraph class for larger, more readable text */}
                <p className="hero-text hero-paragraph text-gray-700 text-pretty">
                  {siteBlurb}
                </p>
              </div>
            </div>

            {/* Logo Image - Static on Right */}
            <div className="relative z-10 flex justify-center lg:justify-start -ml-4 lg:-ml-6">
              <Image
                src="/imageLogo.svg"
                alt="Smiley Day Crochet Logo"
                className="w-full max-w-md h-auto object-contain"
                width={500}
                height={500}
                priority
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Upcoming Markets Component */}
      <UpcomingMarkets markets={upcomingMarkets} />

      {/* Products Component */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Products />
        </div>
      </section>
    </div>
  );
}