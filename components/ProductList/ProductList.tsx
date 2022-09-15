import Product from '../Product/Product';
import Link from 'next/link';
type RequiredProps = {
  products: Product[];
};

const ProductList: React.FC<RequiredProps> = ({ products }) => {
  return (
    <div
      className={`grid sm:grid-cols-1 lg:px-48 ${
        products.length > 3 ? 'mt-24' : 'items-center h-[calc(100vh-25vh)]'
      }
      ${products.length <= 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}
    >
      {products.map((p: Product) => {
        return (
          <Link href={`/shop/${p.handle}`} key={p.id} passHref>
            <a>
              <Product name={p.title} images={p.images}></Product>
            </a>
          </Link>
        );
      })}
    </div>
  );
};
export default ProductList;
