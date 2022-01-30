import type { NextPage } from 'next';
import Image from 'next/image';
import Navigation from '../../components/Navigation/Navigation';
import Products from '../../components/Products/Products';
import styles from './shop.module.css';

const Shop: NextPage = () => {
  return (
    <>
      <div className={styles.background}>
        <div className={styles.container}>
          <Navigation></Navigation>
          <Products></Products>
        </div>
      </div>
    </>
  );
};

export default Shop;
