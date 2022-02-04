import type { NextPage } from 'next';
import ShopifyClient from '../../apollo-client';
import { productsQuery } from '../../common/queries/products.query';

import Navigation from '../../components/Navigation/Navigation';
import Products from '../../components/Products/Products';
import styles from '../../styles/Shop.module.css';

type RequiredProps = {
  products: any;
};

const Shop: NextPage<RequiredProps> = ({ ...products }) => {
  return (
    <>
      <div className={styles.background}>
        <Navigation></Navigation>
        <Products products={products}></Products>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const { data } = await ShopifyClient.query({
    query: productsQuery,
  });
  return {
    props: JSON.parse(JSON.stringify({ products: data.products.edges })),
  };
}

export default Shop;
