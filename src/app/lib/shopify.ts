// lib/shopify.ts

import getClient from './shopifyClient';

export type ProductOption = {
  name: string;
  values: string[];
};

export type ProductVariant = {
  id: string;
  title: string;
  selectedOptions: {
    name: string;
    value: string;
  }
  price: {
    amount: string;
    currencyCode: string;
  }
};

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
  options: ProductOption[];
  variants: {
    edges: {
      node: ProductVariant;
    }[];
  }
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
            images(first: 10) {
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
            options {
              name
              values
            }
            variants(first: 50) {
              edges {
                node {
                  id
                  title
                  selectedOptions {
                    name
                    value
                  }
                  price {
                    amount
                    currencyCode
                  }
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

// The shape of the data returned by the API for the 'productByHandle' query
type ProductByHandleResponse = {
  productByHandle: Product | null;
};

export async function getProductByHandle(handle: string): Promise<Product | null> {
  const PRODUCT_BY_HANDLE_QUERY = `
    query ProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
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
        images(first: 10) {
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
        options {
          name
          values
        }
        variants(first: 50) {
          edges {
            node {
              id
              title
              selectedOptions {
                name
                value
              }
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  try {
    const client = getClient();
    console.log('Fetching product by handle:', handle);

    // Pass variables correctly for Shopify Storefront API Client
    const { data, errors } = await client.request<ProductByHandleResponse>(
      PRODUCT_BY_HANDLE_QUERY,
      {
        variables: {
          handle: handle
        }
      }
    );

    if (errors) {
      console.error('Shopify API errors:', errors);
      throw new Error(JSON.stringify(errors));
    }

    if (!data || !data.productByHandle) {
      console.warn('Product not found:', handle);
      return null;
    }

    console.log('Successfully fetched product:', data.productByHandle.title);
    return data.productByHandle;

  } catch (error) {
    console.error("Error fetching product by handle from Shopify:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    return null;
  }
}