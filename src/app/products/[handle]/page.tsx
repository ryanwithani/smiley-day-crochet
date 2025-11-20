'use client';

import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Product } from '../../components/products/Products';

// Cache products by handle to avoid refetching
const productCache: Map<string, Product> = new Map();
const fetchingPromises: Map<string, Promise<Product | null>> = new Map();

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

    const normalized = colorName.toLowerCase().trim();
    if (/^#[0-9A-F]{6}$/i.test(colorName)) {
        return colorName;
    }
    return colorMap[normalized] || '#FFB300';
}

export default function ProductDetailPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();

    const handle = params.handle as string;

    // Initialize with cached data if available
    const cachedProduct = productCache.get(handle);
    const [product, setProduct] = useState<Product | null>(cachedProduct || null);
    const [selectedColor, setSelectedColor] = useState<string>(cachedProduct?.initialColor || '');
    const [selectedColorName, setSelectedColorName] = useState<string>(cachedProduct?.colorNames?.[0] || '');
    const [selectedImage, setSelectedImage] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(1);
    const [isLoading, setIsLoading] = useState(!cachedProduct);

    // Fetch product data from API with caching
    useEffect(() => {
        if (!handle) return;

        // Check cache first
        const cachedProduct = productCache.get(handle);
        if (cachedProduct) {
            console.log('Using cached product:', handle);
            setProduct(cachedProduct);
            setSelectedColor(cachedProduct.initialColor || cachedProduct.colors[0]);
            setSelectedColorName(cachedProduct.colorNames?.[0] || '');
            setIsLoading(false);
            return;
        }

        // Check if already fetching
        const existingFetch = fetchingPromises.get(handle);
        if (existingFetch) {
            console.log('Fetch already in progress for:', handle);
            existingFetch.then((result) => {
                if (result) {
                    setProduct(result);
                    setSelectedColor(result.initialColor || result.colors[0]);
                    setSelectedColorName(result.colorNames?.[0] || '');
                }
                setIsLoading(false);
            });
            return;
        }

        const fetchProduct = async (): Promise<Product | null> => {
            try {
                setIsLoading(true);
                console.log('Fetching product from API:', handle);

                const response = await fetch(`/api/products/${handle}`);
                const data = await response.json();

                if (!response.ok) {
                    console.error('Failed to fetch product:', data.error);
                    return null;
                }

                const fetchedProduct = data.product;

                // Convert the Shopify product to our Product format
                const convertedProduct: Product = {
                    id: fetchedProduct.id,
                    title: fetchedProduct.title,
                    handle: fetchedProduct.handle,
                    price: parseFloat(fetchedProduct.priceRange.minVariantPrice.amount),
                    currency: fetchedProduct.priceRange.minVariantPrice.currencyCode,
                    images: fetchedProduct.images.edges.map((edge: any) => ({
                        url: edge.node.url,
                        altText: edge.node.altText || fetchedProduct.title
                    })),
                    description: fetchedProduct.description?.replace(/<[^>]*>/g, '').trim() || '',
                    collection: fetchedProduct.collections?.edges?.[0]?.node?.title || 'All Products',
                    colors: [],
                    colorNames: [],
                    initialColor: '',
                };

                // Extract color options
                const colorOption = fetchedProduct.options?.find(
                    (option: any) => option.name.toLowerCase() === 'color' || option.name.toLowerCase() === 'colour'
                );

                if (colorOption && colorOption.values.length > 0) {
                    convertedProduct.colorNames = colorOption.values;
                    convertedProduct.colors = colorOption.values.map(mapColorNameToHex);
                    convertedProduct.initialColor = convertedProduct.colors[0];
                }

                // Cache the product
                productCache.set(handle, convertedProduct);

                setProduct(convertedProduct);
                setSelectedColor(convertedProduct.initialColor || convertedProduct.colors[0]);
                setSelectedColorName(convertedProduct.colorNames?.[0] || '');

                return convertedProduct;
            } catch (error) {
                console.error('Error fetching product:', error);
                return null;
            } finally {
                setIsLoading(false);
                fetchingPromises.delete(handle);
            }
        };

        const fetchPromise = fetchProduct();
        fetchingPromises.set(handle, fetchPromise);
    }, [handle]);

    const handleAddToCart = () => {
        if (!product) return;

        // TODO: Implement actual cart functionality
        console.log('Add to cart:', {
            productId: product.id,
            color: selectedColorName,
            quantity,
        });

        alert(`Added ${quantity} ${product.title} (${selectedColorName}) to cart!`);
    };

    const handleQuantityChange = (delta: number) => {
        setQuantity(prev => Math.max(1, prev + delta));
    };

    // Get currency symbol
    const getCurrencySymbol = (currencyCode?: string): string => {
        const symbols: Record<string, string> = {
            'USD': '$',
            'EUR': '€',
            'GBP': '£',
            'CAD': '$',
            'AUD': '$',
        };
        return symbols[currencyCode || 'USD'] || '$';
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="flex items-center justify-center min-h-[60vh]">
                    <p className="text-lg text-secondary">Loading product...</p>
                </div>
            </div>
        );
    }

    // Error state - no product data
    if (!product) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                    <p className="text-lg text-secondary">Product not found</p>
                    <Link
                        href="/"
                        className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90 transition-colors"
                    >
                        Back to Shop
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 lg:py-12">
            {/* Breadcrumb Navigation */}
            <nav className="mb-6 lg:mb-8">
                <ol className="flex items-center gap-2 text-sm text-secondary">
                    <li>
                        <Link href="/" className="hover:text-primary transition-colors">
                            Home
                        </Link>
                    </li>
                    <li>/</li>
                    <li>
                        <Link href="/#shop" className="hover:text-primary transition-colors">
                            Shop
                        </Link>
                    </li>
                    <li>/</li>
                    <li className="text-foreground font-medium">{product.title}</li>
                </ol>
            </nav>

            {/* Product Detail Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Left Column - Images */}
                <div className="space-y-4">
                    {/* Main Image */}
                    <motion.div
                        key={selectedImage}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="aspect-square w-full rounded-xl overflow-hidden bg-background border-2 border-border"
                    >
                        {product.images && product.images.length > 0 ? (
                            <img
                                src={product.images[selectedImage].url}
                                alt={product.images[selectedImage].altText}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-secondary">
                                No image available
                            </div>
                        )}
                    </motion.div>

                    {/* Thumbnail Gallery - Only show if multiple images */}
                    {product.images && product.images.length > 1 && (
                        <div className="grid grid-cols-4 gap-3">
                            {product.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index
                                        ? 'ring-2 ring-primary ring-offset-2 border-primary'
                                        : 'border-border hover:scale-110 hover:border-primary'
                                        }`}
                                >
                                    <img
                                        src={image.url}
                                        alt={image.altText}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Column - Product Info */}
                <div className="space-y-6">
                    {/* Collection Badge */}
                    {product.collection && (
                        <div className="inline-block">
                            <span className="px-4 py-1.5 bg-background text-secondary text-sm font-medium rounded-full border border-border">
                                {product.collection}
                            </span>
                        </div>
                    )}

                    {/* Title and Price */}
                    <div>
                        <h1
                            className="text-3xl lg:text-4xl font-bold text-foreground mb-3"
                        >
                            {product.title}
                        </h1>
                        <p className="text-3xl font-bold text-primary">
                            {getCurrencySymbol(product.currency)}{product.price.toFixed(2)}
                        </p>
                    </div>

                    {/* Description */}
                    {product.description && (
                        <div className="prose prose-sm max-w-none">
                            <p className="text-secondary leading-relaxed">
                                {product.description}
                            </p>
                        </div>
                    )}

                    {/* Color Selector */}
                    {product.colors && product.colors.length > 0 && (
                        <div className="space-y-3">
                            <label className="text-sm font-semibold text-foreground block">
                                Color: <span className="font-normal text-secondary">{selectedColorName}</span>
                            </label>
                            <div className="flex items-center gap-3 flex-wrap">
                                {product.colors.map((color, index) => (
                                    <motion.button
                                        key={color}
                                        type="button"
                                        onClick={() => {
                                            setSelectedColor(color);
                                            setSelectedColorName(product.colorNames?.[index] || '');
                                        }}
                                        style={{ backgroundColor: color }}
                                        className={`h-10 w-10 rounded-full border-2 transition-all ${selectedColor === color
                                            ? 'ring-2 ring-primary ring-offset-2 border-white scale-110'
                                            : 'border-border hover:scale-110 hover:border-primary'
                                            }`}
                                        whileHover={{ scale: 1.15 }}
                                        whileTap={{ scale: 0.95 }}
                                        aria-label={`Select color ${product.colorNames?.[index] || color}`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quantity Selector */}
                    <div className="space-y-3">
                        <label className="text-sm font-semibold text-foreground block">
                            Quantity
                        </label>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center border-2 border-border rounded-lg overflow-hidden">
                                <button
                                    onClick={() => handleQuantityChange(-1)}
                                    className="px-4 py-2 bg-white hover:bg-background text-foreground font-bold transition-colors"
                                    aria-label="Decrease quantity"
                                >
                                    -
                                </button>
                                <span className="px-6 py-2 bg-white text-foreground font-semibold min-w-[60px] text-center">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => handleQuantityChange(1)}
                                    className="px-4 py-2 bg-white hover:bg-background text-foreground font-bold transition-colors"
                                    aria-label="Increase quantity"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <motion.button
                        onClick={handleAddToCart}
                        className="w-full bg-primary text-primary-foreground py-4 px-6 rounded-lg font-bold text-lg hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Add to Cart
                    </motion.button>

                    {/* Back to Shop Link */}
                    <Link
                        href="/#shop"
                        className="block text-center text-secondary hover:text-primary transition-colors underline"
                    >
                        ← Continue Shopping
                    </Link>
                </div>
            </div>

            {/* TODO: Add related products section here */}
            {/* TODO: Add product details tabs (Description, Shipping, Care Instructions) */}
        </div>
    );
}

