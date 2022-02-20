import type { NextPage } from 'next';
import ShopifyClient from '../../shopify-client';
import { productsQuery } from '../../common/queries/products/products.query';

import Navigation from '../../components/Navigation/Navigation';
import ProductList from '../../components/ProductList/ProductList';
import { useEffect, useState } from 'react';

type RequiredProps = {
  productData: Array<Object>;
};
const Shop: NextPage<RequiredProps> = ({ ...productData }) => {
  const [products, setProducts] = useState<Array<Object>>([]);

  useEffect(() => {
    const productsArray: Array<Object> = Object.values(productData);
    setProducts(productsArray[0] as Array<Object>);
  }, []);

  return (
    <>
      <div className="bg-[url('/images/howlround.gif')] bg-no-repeat bg-center bg-fixed bg-cover min-h-screen">
        <Navigation></Navigation>
        <ProductList products={products}></ProductList>
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
