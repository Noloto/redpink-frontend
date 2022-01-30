import ProductPreview from '../ProductPreview/ProductPreview';
import product from '../../types/product';
import styles from './Products.module.css';
type RequiredProps = {};

const productData: Array<product> = [
  {
    id: 1,
    name: 'Ligther',
    href: '/products/ligther',
    price: '55',
    imageSrc: '/images/fire.png',
    imageAlt: 'ligther',
  },
  {
    id: 2,
    name: '14 NewYears kisses',
    href: '/products/hat',
    price: '55',
    imageSrc: '/images/capo.png',
    imageAlt: 'hat',
  },
  {
    id: 3,
    name: 'two face inside/out',
    href: '/products/knit',
    price: '55',
    imageSrc: '/images/knit-inside-out.png',
    imageAlt: 'crew neck',
  },
];

const Products: React.FC<RequiredProps> = () => {
  return (
    <>
      <div className={styles.productsList}>
        {productData.map((p) => {
          return (
            <>
              {
                <ProductPreview
                  id={p.id}
                  name={p.name}
                  href={p.href}
                  price={p.price}
                  imageSrc={p.imageSrc}
                  imageAlt={p.imageAlt}
                ></ProductPreview>
              }
            </>
          );
        })}
      </div>
    </>
  );
};
export default Products;
