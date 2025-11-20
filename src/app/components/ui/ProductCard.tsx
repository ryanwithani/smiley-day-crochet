// src/app/components/ui/ProductCard.tsx
'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { cn } from '@/app/lib/utils/utils';
import { ProductColorSelector } from '../products/ProductColorSelector';
import { AddToCartButton } from '../products/AddtoCartButton';

interface ProductCardProps {
  title: string;
  handle: string;
  price: number;
  currency?: string;
  images: { url: string; altText: string }[];
  description?: string;
  colors: string[];
  colorNames: string[];
  initialColor: string;
  collection: string;
  productId: string;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  handle,
  price,
  currency = 'USD',
  images,
  description,
  colors,
  colorNames,
  initialColor,
  collection,
  productId,
  className,
}) => {
  const router = useRouter();
  const [selectedColor, setSelectedColor] = React.useState(initialColor);
  const [selectedColorName, setSelectedColorName] = React.useState(colorNames[0] || '');

  const handleCardClick = () => {
    router.push(`/products/${handle}`);
  };

  const handleColorSelect = (color: string, colorName: string) => {
    setSelectedColor(color);
    setSelectedColorName(colorName);
  };

  // Get currency symbol
  const getCurrencySymbol = (currencyCode?: string): string => {
    const symbols: Record<string, string> = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      CAD: '$',
      AUD: '$',
    };
    return symbols[currencyCode || 'USD'] || '$';
  };

  // Prepare image object for cart
  const imageForCart = images[0] ? {
    url: images[0].url,
    altText: images[0].altText || title
  } : {
    url: '/placeholder-product.png',
    altText: title
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      onClick={handleCardClick}
      className={cn(
        'w-full flex flex-col bg-white text-gray-800 rounded-xl border-2 border-border shadow-sm hover:shadow-lg hover:border-primary transition-all duration-200 overflow-hidden cursor-pointer',
        className
      )}
    >
      {/* Product Image */}
      {images[0] && (
        <div className="relative aspect-square w-full overflow-hidden bg-background">
          <img
            src={images[0].url}
            alt={images[0].altText || title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Product Content */}
      <div className="flex flex-col flex-grow p-3">
        {/* Product Header */}
        <div className="mb-2">
          <h2 className="text-sm font-semibold text-foreground leading-tight mb-1 line-clamp-2">
            {title}
          </h2>
          <p className="text-base font-bold text-primary">
            {getCurrencySymbol(currency)}
            {price.toFixed(2)}
          </p>
        </div>

        {/* Color Selector */}
        {colors && colors.length > 0 && (
          <div className="mb-2" onClick={(e) => e.stopPropagation()}>
            <ProductColorSelector
              colors={colors}
              colorNames={colorNames}
              selectedColor={selectedColor}
              selectedColorName={selectedColorName}
              onColorSelect={handleColorSelect}
              size="small"
              showLabel={true}
            />
          </div>
        )}

        {/* Add to Cart Button */}
        <div className="mt-auto" onClick={(e) => e.stopPropagation()}>
          <AddToCartButton
            productId={productId}
            productTitle={title}
            productHandle={handle}
            productPrice={price}
            productCurrency={currency}
            productImage={imageForCart}
            selectedColor={selectedColor}
            selectedColorName={selectedColorName}
            variant="default"
          />
        </div>
      </div>
    </motion.div>
  );
};

export { ProductCard };