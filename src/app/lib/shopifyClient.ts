// lib/shopifyClient.ts

import { createStorefrontApiClient } from '@shopify/storefront-api-client';

// Lazy initialization to avoid errors during module import
function createClient() {
    const storeDomain = process.env.SHOPIFY_STORE_DOMAIN;
    const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
    
    if (!storeDomain || !accessToken) {
        throw new Error(
            `Shopify environment variables are not set. ` +
            `Found: SHOPIFY_STORE_DOMAIN=${!!storeDomain}, SHOPIFY_STOREFRONT_ACCESS_TOKEN=${!!accessToken}`
        );
    }

    return createStorefrontApiClient({
        storeDomain,
        apiVersion: '2025-10',
        publicAccessToken: accessToken,
    });
}

// Export a getter function instead of initializing immediately
let clientInstance: ReturnType<typeof createClient> | null = null;

export default function getClient() {
    if (!clientInstance) {
        clientInstance = createClient();
    }
    return clientInstance;
}