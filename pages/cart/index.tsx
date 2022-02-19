import type { NextPage } from 'next';
import ShopifyClient from '../../shopify-client';
import { productsQuery } from '../../common/queries/products.query';

import Navigation from '../../components/Navigation/Navigation';
import ProductList from '../../components/ProductList/ProductList';
import { useEffect, useState } from 'react';

type RequiredProps = {};
const Shop: NextPage<RequiredProps> = () => {
  return (
    <>
      <div className="bg-[url('/images/howlround.gif')] bg-no-repeat bg-center bg-fixed bg-cover min-h-screen">
        <Navigation></Navigation>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const { data } = await ShopifyClient.query({
    query: productsQuery,
  });
  return {
    props: {
      productData: data.products.edges,
    },
  };
}

export default Shop;
