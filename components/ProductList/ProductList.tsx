import styles from './ProductList.module.css';
import Product from '../Product/Product';

type RequiredProps = {
  products: Product[];
};

const ProductList: React.FC<RequiredProps> = ({ products }) => {
  return (
    <div className={styles.productList}>
      {products.map((p, idx) => {
        return <Product key={idx} product={p}></Product>;
      })}
    </div>
  );
};

export default ProductList;
