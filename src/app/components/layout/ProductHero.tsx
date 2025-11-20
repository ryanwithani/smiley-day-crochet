import Image from 'next/image';
import { CTAButton } from '../ui/CTAButton';
import { DecorationCircles } from '../ui/DecorationCircles';

interface HeroProduct {
  id: string;
  title: string;
  image: string;
  price: number;
  href: string;
}

interface ProductHeroProps {
  headline?: string;
  subheadline?: string;
  featuredProducts?: HeroProduct[];
  ctaText?: string;
  ctaHref?: string;
}

const defaultFeaturedProducts: HeroProduct[] = [
  {
    id: '1',
    title: 'Teddy Bear Plushie',
    image: '/products/teddy-bear.jpg', // Replace with actual images
    price: 24.99,
    href: '/products/teddy-bear'
  },
  {
    id: '2',
    title: 'Sunflower Keychain',
    image: '/products/sunflower-keychain.jpg',
    price: 8.99,
    href: '/products/sunflower-keychain'
  },
  {
    id: '3',
    title: 'Bunny Buddy',
    image: '/products/bunny-buddy.jpg',
    price: 22.99,
    href: '/products/bunny-buddy'
  }
];

export function ProductHero({
  headline = "Handmade Crochet Creations",
  subheadline = "Bringing joy, one stitch at a time. Every piece is crafted with love and care.",
  featuredProducts = defaultFeaturedProducts,
  ctaText = "Shop All Products",
  ctaHref = "#shop"
}: ProductHeroProps) {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      {/* Decorative background elements */}
      <DecorationCircles />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Content */}
        <div className="text-center mb-12 lg:mb-16">
          {/* Headline */}
          <h1
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-secondary mb-4"
          >
            {headline}
          </h1>

          {/* Subheadline */}
          <p
            className="text-base sm:text-lg text-foreground max-w-3xl mx-auto mb-8"
          >
            {subheadline}
          </p>

          {/* CTA Button */}
          <CTAButton href={ctaHref} size="lg">
            {ctaText}
          </CTAButton>
        </div>

        {/* Featured Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {featuredProducts.map((product) => (
            <a
              key={product.id}
              href={product.href}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg border-4 border-border hover:border-primary transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              {/* Product Image */}
              <div className="relative w-full h-64 bg-gradient-to-br from-background to-accent flex items-center justify-center">
                {/* Placeholder - Replace with actual Image component when you have product images */}
                <div className="text-8xl">
                  {product.title.includes('Teddy') && '🐻'}
                  {product.title.includes('Sunflower') && '🌼'}
                  {product.title.includes('Bunny') && '🐰'}
                </div>
                {/* Uncomment when you have real images:
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                */}
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3
                  className="text-base font-bold text-secondary mb-2"
                >
                  {product.title}
                </h3>
                <p
                  className="text-lg font-bold text-primary"
                >
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}