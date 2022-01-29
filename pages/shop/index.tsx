import type { NextPage } from 'next';
import Image from 'next/image';
import Products from '../../components/Products/Products';
import styles from './shop.module.css';

const Shop: NextPage = () => {
  return (
    <>
      <Products></Products>
      <Image
        src="/howlround.gif"
        layout="fill"
        alt="howl round"
        className={styles.background}
      ></Image>
    </>
  );
};

export default Shop;
