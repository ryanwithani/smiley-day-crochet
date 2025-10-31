'use client';

import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
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

  // Default color options for products (site theme colors)
  const defaultColors = ['#E1F5FE', '#F3E5F5', '#FFF9C4', '#7CB342', '#9C27B0', '#FFD54F'];

  // Fetch products from Shopify via API route
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        console.log('Fetching products from Shopify API route...');
        
        // Call our API route instead of calling Shopify directly
        const response = await fetch('/api/products');
        const data = await response.json();
        
        if (!response.ok) {
          // Extract error details from response
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
        
        // Convert Shopify products to our Product format
        const convertedProducts: Product[] = fetched.map((product: ShopifyProduct) => {
          const imageUrl = product.images.edges[0]?.node.url || '';
          const price = parseFloat(product.priceRange.minVariantPrice.amount);
          const currency = product.priceRange.minVariantPrice.currencyCode;
          
          // Extract description (strip HTML if present)
          const description = product.description
            ? product.description.replace(/<[^>]*>/g, '').trim()
            : '';
          
          // Extract collection from Shopify product collections
          // Use the first collection if available, otherwise default to "All Products"
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
        console.error('Error details:', error);
        // Keep shopifyProducts as empty array, will fall back to defaults
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Default sample products - only used as fallback if Shopify API fails and no products provided via props
  // These will be replaced by Shopify API data when available
  const defaultProducts: Product[] = [
    {
      id: '1',
      title: 'Crochet Blanket - Rainbow',
      price: 85,
      imageUrl: 'https://images.unsplash.com/photo-1624844990139-09948b62a46b?w=400&h=300&fit=crop',
      colors: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#FF6B9D'],
      initialColor: '#FF6B6B',
      collection: 'Home Decor',
    },
    {
      id: '2',
      title: 'Amigurumi Bunny',
      price: 35,
      imageUrl: 'https://images.unsplash.com/photo-1558848862-42854f390454?w=400&h=300&fit=crop',
      colors: ['#F3E5F5', '#E1F5FE', '#FFF9C4', '#E8F5E9'],
      initialColor: '#F3E5F5',
      collection: 'Toys',
    },
    {
      id: '3',
      title: 'Crochet Bag - Floral',
      price: 45,
      imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=300&fit=crop',
      colors: ['#7CB342', '#9C27B0', '#FFD54F', '#81C784'],
      initialColor: '#7CB342',
      collection: 'Accessories',
    },
    {
      id: '4',
      title: 'Crochet Scarf - Cozy',
      price: 28,
      imageUrl: 'https://images.unsplash.com/photo-1535888943842-63c1b1b0c3c9?w=400&h=300&fit=crop',
      colors: ['#FFB74D', '#BA68C8', '#64B5F6', '#81C784'],
      initialColor: '#FFB74D',
      collection: 'Accessories',
    },
    {
      id: '5',
      title: 'Crochet Pillow Cover',
      price: 38,
      imageUrl: 'https://images.unsplash.com/photo-1584100936595-3b063dd3e4a3?w=400&h=300&fit=crop',
      colors: ['#E1F5FE', '#F3E5F5', '#FFF9C4', '#FFE0B2'],
      initialColor: '#E1F5FE',
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

  // Use provided products, then Shopify products, then defaults
  const displayProducts = products.length > 0 
    ? products 
    : shopifyProducts.length > 0 
      ? shopifyProducts 
      : defaultProducts;
  
  // Debug logging
  useEffect(() => {
    console.log('Display products source:', {
      hasPropsProducts: products.length > 0,
      hasShopifyProducts: shopifyProducts.length > 0,
      usingDefaults: products.length === 0 && shopifyProducts.length === 0,
      totalProducts: displayProducts.length,
      isLoading
    });
  }, [products.length, shopifyProducts.length, displayProducts.length, isLoading]);
  
  // Get unique collections from products
  const uniqueCollections = collections.length > 0 
    ? collections 
    : Array.from(new Set(displayProducts.map(p => p.collection)));

  // Filter products by selected collection
  const filteredProducts = selectedCollection === 'all'
    ? displayProducts
    : displayProducts.filter(product => product.collection === selectedCollection);

  const handleAddToCart = (productId: string, details: { color: string }) => {
    console.log('Added to cart:', { productId, ...details });
    // Here you would typically add to cart state/context
    alert(`Added to cart!\nColor: ${details.color}`);
  };

  return (
    <div className="mt-20 lg:mt-24">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-[#7CB342]" />
          <h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-0 text-center drop-shadow-lg"
            style={{ 
              fontFamily: 'var(--font-dynapuff)',
              WebkitTextStroke: '3px #7CB342',
              paintOrder: 'stroke fill',
            } as React.CSSProperties}
          >
            Shop
          </h2>
          <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-[#7CB342]" />
        </div>

        {/* Collection Filter */}
        <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 mb-8 sm:mb-12">
          <button
            onClick={() => setSelectedCollection('all')}
            className={`px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium rounded-full transition-all duration-200 ${
              selectedCollection === 'all'
                ? 'bg-[#7CB342] text-white shadow-md hover:shadow-lg hover:bg-[#689F38]'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-[#7CB342] hover:text-[#7CB342]'
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
                  ? 'bg-[#9C27B0] text-white shadow-md hover:shadow-lg hover:bg-[#7B1FA2]'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-[#9C27B0] hover:text-[#9C27B0]'
              }`}
            >
              {collection}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">Loading products...</p>
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
            <p className="text-lg text-gray-600">No products found in this collection.</p>
          </div>
        )}
    </div>
  );
}

