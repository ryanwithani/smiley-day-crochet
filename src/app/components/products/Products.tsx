'use client';

import { useState, useEffect } from 'react';
import { ProductCard } from '../ui/ProductCard';
import type { Product as ShopifyProduct } from '../../lib/shopify';

export interface Product {
  id: string;
  title: string;
  handle: string;
  price: number;
  currency?: string;
  images: {
    url: string;
    altText: string;
  }[];
  description?: string;
  colors: string[];
  colorNames: string[];
  initialColor: string;
  collection: string;
}

interface ProductsProps {
  products?: Product[];
  collections?: string[];
}

// Cache products in memory to avoid refetching
let cachedProducts: Product[] | null = null;
let isFetching = false;
const fetchPromises: Promise<Product[]>[] = [];

function mapColorNameToHex(colorName: string): string {
  const colorMap: Record<string, string> = {
    // Common color names
    'red': '#FF0000',
    'blue': '#0000FF',
    'green': '#00FF00',
    'yellow': '#FFFF00',
    'black': '#000000',
    'white': '#FFFFFF',
    'pink': '#FFC0CB',
    'purple': '#800080',
    'orange': '#FFA500',
    'brown': '#A52A2A',
    'gray': '#808080',
    'grey': '#808080',
    'beige': '#F5F5DC',
    'navy': '#000080',
    'teal': '#008080',
    'maroon': '#800000',
    'olive': '#808000',
    'lime': '#00FF00',
    'aqua': '#00FFFF',
    'silver': '#C0C0C0',
    'gold': '#FFD700',

    // Sunflower-themed colors
    'sunflower': '#FFB300',
    'golden': '#FFB300',
    'cream': '#FFF3E0',
    'amber': '#FFE082',
    'chocolate': '#8B4513',
    'honey': '#FFECB3',
    'mustard': '#FFC107',
  };

  // Convert to lowercase and trim
  const normalized = colorName.toLowerCase().trim();

  // Check if it's already a hex color
  if (/^#[0-9A-F]{6}$/i.test(colorName)) {
    return colorName;
  }

  // Return mapped color or a default
  return colorMap[normalized] || '#FFB300'; // Default to sunflower yellow
}

export function Products({ products = [], collections = [] }: ProductsProps) {
  const [selectedCollection, setSelectedCollection] = useState<string>('all');
  const [shopifyProducts, setShopifyProducts] = useState<Product[]>(cachedProducts || []);
  const [isLoading, setIsLoading] = useState(!cachedProducts);

  // Fetch products from Shopify via API route with caching
  useEffect(() => {
    // If we already have cached products, use them immediately
    if (cachedProducts) {
      console.log('Using cached products:', cachedProducts.length);
      setShopifyProducts(cachedProducts);
      setIsLoading(false);
      return;
    }

    // If already fetching, wait for the existing fetch
    if (isFetching && fetchPromises.length > 0) {
      console.log('Fetch already in progress, waiting...');
      fetchPromises[0].then(products => {
        setShopifyProducts(products);
        setIsLoading(false);
      });
      return;
    }

    const fetchProducts = async (): Promise<Product[]> => {
      try {
        setIsLoading(true);
        isFetching = true;
        console.log('Fetching products from Shopify API route...');

        const response = await fetch('/api/products');
        const data = await response.json();

        if (!response.ok) {
          const errorMessage = data.error || 'Unknown error';
          const errorDetails = data.details || data.message || '';
          console.error('API route error:', errorMessage, errorDetails);
          throw new Error(`${errorMessage}: ${errorDetails}`);
        }

        const fetched = data.products || [];
        console.log('Shopify API returned:', fetched.length, 'products');

        if (fetched.length === 0) {
          console.warn('No products returned from Shopify API. Check your Shopify credentials and store configuration.');
        }

        const convertedProducts: Product[] = fetched.map((product: ShopifyProduct) => {
          const images = product.images.edges.map(edge => ({
            url: edge.node.url,
            altText: edge.node.altText || product.title
          }));
          const price = parseFloat(product.priceRange.minVariantPrice.amount);
          const currency = product.priceRange.minVariantPrice.currencyCode;
          const description = product.description
            ? product.description.replace(/<[^>]*>/g, '').trim()
            : '';
          const collection = product.collections?.edges?.[0]?.node?.title || 'All Products';

          const colorOption = product.options?.find(
            (option) => option.name.toLowerCase() === 'color' || option.name.toLowerCase() === 'colour'
          );

          let productColors: string[] = [];
          let colorNames: string[] = [];

          if (colorOption && colorOption.values.length > 0) {
            // Store both color names and hex values
            colorNames = colorOption.values;
            productColors = colorOption.values.map(mapColorNameToHex);
            console.log(`Product "${product.title}" colors:`, colorOption.values, '→', productColors);
          } else {
            console.log(`Product "${product.title}" has no color options, using defaults`);
          }


          return {
            id: product.id,
            title: product.title,
            handle: product.handle,
            price,
            currency,
            images,
            description,
            colors: productColors,
            colorNames,
            initialColor: productColors[0],
            collection,
          };
        });

        console.log('Converted products:', convertedProducts.length);

        // Cache the products for future use
        cachedProducts = convertedProducts;
        setShopifyProducts(convertedProducts);

        return convertedProducts;
      } catch (error) {
        console.error('Error fetching products from Shopify:', error);
        return [];
      } finally {
        setIsLoading(false);
        isFetching = false;
      }
    };

    const fetchPromise = fetchProducts();
    fetchPromises.push(fetchPromise);

    fetchPromise.finally(() => {
      // Clean up promise reference
      const index = fetchPromises.indexOf(fetchPromise);
      if (index > -1) {
        fetchPromises.splice(index, 1);
      }
    });
  }, []);


  const displayProducts = products.length > 0
    ? products
    : shopifyProducts.length > 0
      ? shopifyProducts
      : [];

  useEffect(() => {
    console.log('Display products source:', {
      hasPropsProducts: products.length > 0,
      hasShopifyProducts: shopifyProducts.length > 0,
      usingDefaults: products.length === 0 && shopifyProducts.length === 0,
      totalProducts: displayProducts.length,
      isLoading
    });
  }, [products.length, shopifyProducts.length, displayProducts.length, isLoading]);

  const uniqueCollections = collections.length > 0
    ? collections
    : Array.from(new Set(displayProducts.map(p => p.collection)));

  const filteredProducts = selectedCollection === 'all'
    ? displayProducts
    : displayProducts.filter(product => product.collection === selectedCollection);

  const handleAddToCart = (productId: string, details: { color: string }) => {
    console.log('Added to cart:', { productId, ...details });
    alert(`Added to cart!\nColor: ${details.color}`);
  };

  return (
    <div className="mt-20 lg:mt-24">
      <div className="flex items-center justify-center gap-4 mb-10">
        <span className="text-5xl sm:text-6xl lg:text-7xl">🌻</span>
        <h2
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FFB300] mb-0 text-center"
          style={{
            fontFamily: 'var(--font-dynapuff)',
          }}
        >
          Shop
        </h2>
        <span className="text-5xl sm:text-6xl lg:text-7xl">🌻</span>
      </div>

      {/* Collection Filter */}
      <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 mb-8 sm:mb-12">
        <button
          onClick={() => setSelectedCollection('all')}
          className={`px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium rounded-full transition-all duration-200 ${selectedCollection === 'all'
            ? 'bg-[#FFB300] text-[#6B4423] shadow-md hover:shadow-lg hover:bg-[#FFC107]'
            : 'bg-white text-[#6B4423] hover:bg-[#FFF3E0] border-2 border-[#FFE082] hover:border-[#FFB300]'
            }`}
        >
          All Products
        </button>
        {uniqueCollections.map((collection) => (
          <button
            key={collection}
            onClick={() => setSelectedCollection(collection)}
            className={`px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium rounded-full transition-all duration-200 ${selectedCollection === collection
              ? 'bg-[#FFB300] text-[#6B4423] shadow-md hover:shadow-lg hover:bg-[#FFC107]'
              : 'bg-white text-[#6B4423] hover:bg-[#FFF3E0] border-2 border-[#FFE082] hover:border-[#FFB300]'
              }`}
          >
            {collection}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12">
          <p className="text-lg text-[#8B4513]">Loading products...</p>
        </div>
      )}

      {/* Products Grid */}
      {!isLoading && filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              productId={product.id}
              title={product.title}
              handle={product.handle}
              price={product.price}
              currency={product.currency}
              images={product.images}
              description={product.description}
              colors={product.colors}
              colorNames={product.colorNames}
              initialColor={product.initialColor}
              collection={product.collection}
              onAddToCart={(details) => handleAddToCart(product.id, details)}
            />
          ))}
        </div>
      )}

      {!isLoading && filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-[#8B4513]">No products found in this collection.</p>
        </div>
      )}
    </div>
  );
}