import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ handle: string }> }
) {
    try {
        const { handle } = await params;

        // Check environment variables first
        const storeDomain = process.env.SHOPIFY_STORE_DOMAIN;
        const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

        if (!storeDomain || !accessToken) {
            console.error('Missing Shopify environment variables');
            return NextResponse.json(
                {
                    error: 'Shopify configuration missing',
                    details: 'SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN must be set in .env.local'
                },
                { status: 500 }
            );
        }

        // Dynamically import to avoid module load errors
        const { getProductByHandle } = await import('../../../lib/shopify');
        const product = await getProductByHandle(handle);

        if (!product) {
            return NextResponse.json(
                { error: 'Product not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ product }, { status: 200 });
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

        return NextResponse.json(
            {
                error: 'Failed to fetch product',
                details: errorMessage,
                stack: process.env.NODE_ENV === 'development' ? errorDetails : undefined
            },
            { status: 500 }
        );
    }
}

