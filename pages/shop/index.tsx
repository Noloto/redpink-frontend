import type { NextPage } from 'next';
import ShopifyClient from '../../shopify-client';
import { productsQuery } from '../../common/queries/products/products.query';

import Navigation from '../../components/Navigation/Navigation';
import ProductList from '../../components/ProductList/ProductList';
import { useEffect, useState } from 'react';
import { useCycle } from 'framer-motion';

type RequiredProps = {
  productData: any;
};

const Shop: NextPage<RequiredProps> = ({ ...productData }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showMe, setShowMe] = useCycle(false, true);

  const [cart, setCart] = useState<Cart>();
  useEffect(() => {
    setCart(JSON.parse(window.localStorage.getItem('CART') as string));
  }, []);

  useEffect(() => {
    setProducts(
      productData.productData.map((p: any) => {
        return {
          id: p.node?.id,
          handle: p.node?.handle,
          title: p.node?.title,
          price: p.node?.priceRange?.minVariantPrice?.amount,
          images: p.node?.images?.edges,
        };
      })
    );
  }, [productData, setProducts]);

  return (
    <>
      <div className="bg-[url('/images/howlround_effect_v2.2.gif')] bg-no-repeat bg-center bg-fixed bg-cover min-h-screen">
        <Navigation cart={cart} showMe={showMe} setShowMe={() => setShowMe()} />
        {!showMe && <ProductList products={products}></ProductList>}
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
    revalidate: 60,
  };
}

export default Shop;
