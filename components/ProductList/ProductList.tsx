import Product from '../Product/Product';
import Link from 'next/link';
type RequiredProps = {
  products: Array<Object>;
};

const Products: React.FC<RequiredProps> = ({ products }) => {
  return (
    <>
      <div className="grid md:grid-cols-3 sm:grid-cols-1 w-full h-[calc(100vh-10vh)] p-10 justify-center items-center">
        {products.map((p: any, idx: number) => {
          return (
            <Link href={`/shop/${p.node.title}`} key={p.node.title} passHref>
              <a>
                <Product
                  imageSrc={p.node.images.edges[0].node.url}
                  price={p.node.priceRange.minVariantPrice.amount}
                  name={p.node.title}
                  key={idx}
                ></Product>
              </a>
            </Link>
          );
        })}
      </div>
    </>
  );
};
export default Products;
