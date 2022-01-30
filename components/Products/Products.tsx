import ProductPreview from '../ProductPreview/ProductPreview';
import product from '../../types/product';
import { stringify } from 'querystring';
type RequiredProps = {};

const productData: Array<product> = [
  {
    id: 1,
    name: '14 NewYears kisses',
    href: '/products/hat',
    price: '55',
    imageSrc: '/capo.png',
    imageAlt: 'hat',
  },
  {
    id: 2,
    name: 'two face inside/out',
    href: '/products/knit',
    price: '55',
    imageSrc: '/knit-inside-out.png',
    imageAlt: 'crew neck',
  },
  {
    id: 3,
    name: 'hat',
    href: '/products/ligther',
    price: '55',
    imageSrc: '/fire.png',
    imageAlt: 'ligther',
  },
];

const Products: React.FC<RequiredProps> = () => {
  return (
    <>
      {productData.map((p) => {
        return <>{<ProductPreview name={p.name}></ProductPreview>}</>;
      })}
    </>
  );
};
export default Products;
