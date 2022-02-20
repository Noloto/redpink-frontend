import { useEffect, useState } from 'react';
import ShopifyClient from '../../shopify-client';
import { productsQuery } from '../queries/products/products.query';

async function fetchProducts(): Promise<any> {
  const { data } = await ShopifyClient.query({
    query: productsQuery,
  });

  const productData = data.products.edges;

  const productsArray: Array<Object> = Object.values(productData);

  const products = productsArray[0] as Array<Object>;

  return products;
}

export default fetchProducts;
