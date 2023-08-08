import styles from '../../styles/Home.module.css';
import { NextPage } from 'next';
import ProductList from '../../components/ProductList/ProductList';
import ShopifyClient from '../../shopify-client';
import { productsQuery } from '../../common/queries/products/products.query';
import { useEffect, useState } from 'react';

type RequiredProps = {
  productsData: Product[];
};

const Home: NextPage<RequiredProps> = ({ productsData }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(
      productsData.map((p: any) => {
        return {
          id: p.node?.id,
          handle: p.node?.handle,
          title: p.node?.title,
          price: p.node?.priceRange?.minVariantPrice?.amount,
          images: p.node?.images?.edges,
          description: p.node?.description,
          variants: p.node?.variants,
          tags: p.node?.tags,
        };
      })
    );
  }, [productsData]);

  return (
    <>
      <main className={styles.shopContainer}>
        <ProductList products={products}></ProductList>
      </main>
    </>
  );
};

export async function getServerSideProps() {
  const { data } = await ShopifyClient.query({
    query: productsQuery,
  });

  return {
    props: {
      productsData: data.products.edges,
    },
  };
}

export default Home;
