import Product from '../Product/Product';
import Link from 'next/link';
type RequiredProps = {
  products: Product[];
};

const Products: React.FC<RequiredProps> = ({ products }) => {
  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-1 lg:px-48 pb-16 mt-16 items-center h-full">
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
    </div>
  );
};
export default Products;
