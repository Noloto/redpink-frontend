import Product from '../Product/Product';
import Link from 'next/link';
type RequiredProps = {
  products: Product[];
};

const ProductList: React.FC<RequiredProps> = ({ products }) => {
  return (
    <div
      className={`grid grid-cols-1 lg:px-48 h-full md:h-[calc(100vh-25vh)] ${
        products.length > 3 ? 'mt-24' : 'items-center md:h-[calc(100vh-25vh)]'
      }
      ${products.length <= 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}
    >
      {products.map((p: Product) => {
        return (
          <a href={`/shop/${p.handle}`} key={p.id}>
            <Product name={p.title} images={p.images}></Product>
          </a>
        );
      })}
    </div>
  );
};
export default ProductList;
