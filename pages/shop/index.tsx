import type { NextPage } from 'next';
import Navigation from '../../components/Navigation/Navigation';
import Products from '../../components/Products/Products';
import styles from '../../styles/Shop.module.css';

const Shop: NextPage = () => {
  return (
    <>
      <div className={styles.background}>
        <Navigation></Navigation>
        <Products></Products>
      </div>
    </>
  );
};

export default Shop;
