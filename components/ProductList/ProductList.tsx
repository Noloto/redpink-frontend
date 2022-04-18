import Product from '../Product/Product';
import Link from 'next/link';
type RequiredProps = {
  products: Product[];
};

const Products: React.FC<RequiredProps> = ({ products }) => {
  return (
    <>
      {products.map((p: Product, idx: number) => {
        return (
          <Link href={`/shop/${p.title}`} key={p.title} passHref>
            <a>
              <Product
                key={idx}
                id={p.id}
                name={p.title}
                price={p.price}
                images={p.images}
                variants={p.variants}
              ></Product>
            </a>
          </Link>
        );
      })}
    </>
  );
};
export default Products;
