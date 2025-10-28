// lib/shopifyClient.ts

import { createStorefrontApiClient } from '@shopify/storefront-api-client';

// The '!' tells TypeScript we are sure these variables exist in .env.local
// A check will be performed to ensure they are not undefined.
if (!process.env.SHOPIFY_STORE_DOMAIN || !process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
    throw new Error("Shopify environment variables are not set.");
}

const client = createStorefrontApiClient({
    storeDomain: process.env.SHOPIFY_STORE_DOMAIN,
    apiVersion: '2025-10',
    publicAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
});

export default client;