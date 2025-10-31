// lib/shopify.ts

import getClient from './shopifyClient';

// We can still keep our own Type definition for clarity on our pages,
// but the client itself will also provide types.
export type Product = {
    id: string;
    title: string;
    handle: string;
    description: string;
    priceRange: {
        minVariantPrice: {
            amount: string;
            currencyCode: string;
        };
    };
    images: {
        edges: {
            node: {
                url: string;
                altText: string | null;
            };
        }[];
    };
    collections?: {
        edges: {
            node: {
                title: string;
                handle: string;
            };
        }[];
    };
};

// The shape of the data returned by the API for the 'products' query
type AllProductsResponse = {
    products: {
        edges: { node: Product }[];
    };
};

export async function getAllProducts(): Promise<Product[]> {
    const ALL_PRODUCTS_QUERY = `
    query AllProducts {
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
            description
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            collections(first: 1) {
              edges {
                node {
                  title
                  handle
                }
              }
            }
          }
        }
      }
    }
  `;

    try {
        const client = getClient();
        console.log('Shopify client initialized, making request...');
        // Use the client's 'request' method. It handles fetch, headers, and errors.
        const { data, errors } = await client.request<AllProductsResponse>(ALL_PRODUCTS_QUERY);

        console.log('Shopify API response:', { hasData: !!data, hasErrors: !!errors, errors });

        if (errors) {
            console.error('Shopify API errors:', errors);
            throw new Error(JSON.stringify(errors));
        }

        if (!data || !data.products) {
            console.warn('No data or products in response');
            return [];
        }

        const products = data.products.edges.map(edge => edge.node);
        console.log('Successfully fetched', products.length, 'products from Shopify');
        return products;

    } catch (error) {
        console.error("Error fetching all products from Shopify:", error);
        if (error instanceof Error) {
            console.error("Error message:", error.message);
            console.error("Error stack:", error.stack);
        }
        return [];
    }
}