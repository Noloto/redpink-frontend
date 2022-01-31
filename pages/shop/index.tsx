import type { NextPage } from 'next';
import { productsQuery } from '../../common/queries/products.query';

import Navigation from '../../components/Navigation/Navigation';
import Products from '../../components/Products/Products';
import styles from '../../styles/Shop.module.css';
import client from '../../apollo-client';

type RequiredProps = {
  products: any;
};

const Shop: NextPage<RequiredProps> = ({ products }) => {
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
  const { data } = await client.query({
    query: productsQuery,
  });
  return {
    props: {
      products: data.products,
    },
  };
}

export default Shop;
