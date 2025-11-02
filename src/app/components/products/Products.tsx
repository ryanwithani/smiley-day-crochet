'use client';

import { useState, useEffect } from 'react';
import { ProductCard } from '../ui/ProductCard';
import type { Product as ShopifyProduct } from '../../lib/shopify';

export interface Product {
  id: string;
  title: string;
  price: number;
  currency?: string;
  imageUrl?: string;
  description?: string;
  colors: string[];
  initialColor: string;
  collection: string;
}

interface ProductsProps {
  products?: Product[];
  collections?: string[];
}

export function Products({ products = [], collections = [] }: ProductsProps) {
  const [selectedCollection, setSelectedCollection] = useState<string>('all');
  const [shopifyProducts, setShopifyProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Sunflower-themed color options for products
  const defaultColors = ['#FFB300', '#FFF3E0', '#FFE082', '#8B4513', '#FFECB3', '#FFC107'];

  // Fetch products from Shopify via API route
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
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
          const imageUrl = product.images.edges[0]?.node.url || '';
          const price = parseFloat(product.priceRange.minVariantPrice.amount);
          const currency = product.priceRange.minVariantPrice.currencyCode;
          const description = product.description
            ? product.description.replace(/<[^>]*>/g, '').trim()
            : '';
          const collection = product.collections?.edges?.[0]?.node?.title || 'All Products';
          
          return {
            id: product.id,
            title: product.title,
            price,
            currency,
            imageUrl,
            description,
            colors: defaultColors,
            initialColor: defaultColors[0],
            collection,
          };
        });
        
        console.log('Converted products:', convertedProducts.length);
        setShopifyProducts(convertedProducts);
      } catch (error) {
        console.error('Error fetching products from Shopify:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Default sample products with sunflower-themed colors
  const defaultProducts: Product[] = [
    {
      id: '1',
      title: 'Crochet Blanket - Rainbow',
      price: 85,
      imageUrl: 'https://images.unsplash.com/photo-1624844990139-09948b62a46b?w=400&h=300&fit=crop',
      colors: ['#FFB300', '#FFF3E0', '#FFE082', '#FFECB3'],
      initialColor: '#FFB300',
      collection: 'Home Decor',
    },
    {
      id: '2',
      title: 'Amigurumi Bunny',
      price: 35,
      imageUrl: 'https://images.unsplash.com/photo-1558848862-42854f390454?w=400&h=300&fit=crop',
      colors: ['#FFF3E0', '#FFE082', '#FFECB3', '#FFF8E1'],
      initialColor: '#FFF3E0',
      collection: 'Toys',
    },
    {
      id: '3',
      title: 'Crochet Bag - Floral',
      price: 45,
      imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=300&fit=crop',
      colors: ['#FFB300', '#8B4513', '#FFC107', '#FFD54F'],
      initialColor: '#FFB300',
      collection: 'Accessories',
    },
    {
      id: '4',
      title: 'Crochet Scarf - Cozy',
      price: 28,
      imageUrl: 'https://images.unsplash.com/photo-1535888943842-63c1b1b0c3c9?w=400&h=300&fit=crop',
      colors: ['#FFB74D', '#FFC107', '#FFE082', '#FFECB3'],
      initialColor: '#FFB74D',
      collection: 'Accessories',
    },
    {
      id: '5',
      title: 'Crochet Pillow Cover',
      price: 38,
      imageUrl: 'https://images.unsplash.com/photo-1584100936595-3b063dd3e4a3?w=400&h=300&fit=crop',
      colors: ['#FFF3E0', '#FFE082', '#FFECB3', '#FFE0B2'],
      initialColor: '#FFF3E0',
      collection: 'Home Decor',
    },
    {
      id: '6',
      title: 'Amigurumi Bear',
      price: 32,
      imageUrl: 'https://images.unsplash.com/photo-1553480047-c4509084d7e2?w=400&h=300&fit=crop',
      colors: ['#8D6E63', '#A1887F', '#BCAAA4', '#D7CCC8'],
      initialColor: '#8D6E63',
      collection: 'Toys',
    },
  ];

  const displayProducts = products.length > 0 
    ? products 
    : shopifyProducts.length > 0 
      ? shopifyProducts 
      : defaultProducts;
  
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
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFB300] mb-0 text-center"
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
            className={`px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium rounded-full transition-all duration-200 ${
              selectedCollection === 'all'
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
              className={`px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium rounded-full transition-all duration-200 ${
                selectedCollection === collection
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
                title={product.title}
                price={product.price}
                currency={product.currency}
                imageUrl={product.imageUrl}
                description={product.description}
                colors={product.colors}
                initialColor={product.initialColor}
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