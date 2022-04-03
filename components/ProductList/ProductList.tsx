import Product from '../Product/Product';
import Link from 'next/link';
type RequiredProps = {
  products: Array<Object>;
};

const Products: React.FC<RequiredProps> = ({ products }) => {
  return (
    <>
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
    </>
  );
};
export default Products;
