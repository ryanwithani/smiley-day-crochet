// lib/shopify.ts

import client from './shopifyClient';

// We can still keep our own Type definition for clarity on our pages,
// but the client itself will also provide types.
export type Product = {
    id: string;
    title: string;
    handle: string;
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
          }
        }
      }
    }
  `;

    try {
        // Use the client's 'request' method. It handles fetch, headers, and errors.
        const { data, errors } = await client.request<AllProductsResponse>(ALL_PRODUCTS_QUERY);

        if (errors) {
            throw new Error(JSON.stringify(errors));
        }

        if (!data || !data.products) {
            return [];
        }

        return data.products.edges.map(edge => edge.node);

    } catch (error) {
        console.error("Error fetching all products:", error);
        return [];
    }
}