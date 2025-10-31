import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check environment variables first
    const storeDomain = process.env.SHOPIFY_STORE_DOMAIN;
    const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
    
    if (!storeDomain || !accessToken) {
      console.error('Missing Shopify environment variables:', {
        hasStoreDomain: !!storeDomain,
        hasAccessToken: !!accessToken
      });
      return NextResponse.json(
        { 
          error: 'Shopify configuration missing',
          details: 'SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN must be set in .env.local'
        },
        { status: 500 }
      );
    }

    // Dynamically import to avoid module load errors
    const { getAllProducts } = await import('../../lib/shopify');
    const products = await getAllProducts();
    
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error('API route error:', error);
    
    let errorMessage = 'Unknown error';
    let errorDetails = '';
    
    if (error instanceof Error) {
      errorMessage = error.message;
      errorDetails = error.stack || '';
    } else if (typeof error === 'string') {
      errorMessage = error;
    }
    
    // Check for common issues
    if (errorMessage.includes('environment variables') || errorMessage.includes('SHOPIFY')) {
      return NextResponse.json(
        { 
          error: 'Shopify configuration error',
          details: errorMessage,
          help: 'Please ensure SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN are set in .env.local'
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch products', 
        details: errorMessage,
        stack: process.env.NODE_ENV === 'development' ? errorDetails : undefined
      },
      { status: 500 }
    );
  }
}

