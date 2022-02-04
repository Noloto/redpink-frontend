import ProductPreview from '../ProductPreview/ProductPreview';
import styles from './Products.module.css';
import { useEffect, useState } from 'react';
type RequiredProps = {
  products: any;
};

const Products: React.FC<RequiredProps> = ({ products }) => {
  const [productData, setProducts] = useState([]);
  useEffect(() => {
    products = Object.values(products);
    setProducts(products);
  }, []);
  return (
    <>
      <div className={styles.productsList}>
        {productData.map((product: any) => {
          return product.map((p: any, idx: number) => {
            console.log(p);
            return (
              <ProductPreview
                imageSrc={p.node.images.edges[0].node.url}
                price={p.node.priceRange.minVariantPrice.amount}
                name={p.node.title}
                key={idx}
              ></ProductPreview>
            );
          });
        })}
      </div>
    </>
  );
};
export default Products;
