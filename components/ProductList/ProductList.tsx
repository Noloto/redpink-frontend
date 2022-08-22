import Product from '../Product/Product';
import Link from 'next/link';
type RequiredProps = {
  products: Product[];
};

const Products: React.FC<RequiredProps> = ({ products }) => {
  return (
    <div
      className={`grid sm:grid-cols-1 lg:px-48 ${
        products.length > 3 ? 'mt-24' : ' items-center h-[calc(100vh-25vh)]'
      }
      ${products.length <= 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}
    >
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
                className={products.length <= 2 ? 'w-4/5' : ''}
              ></Product>
            </a>
          </Link>
        );
      })}
    </div>
  );
};
export default Products;
