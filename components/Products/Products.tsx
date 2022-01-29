import ProductPreview from '../ProductPreview/ProductPreview';
import product from '../../types/product';
import { stringify } from 'querystring';
type RequiredProps = {};

const productData: Array<product> = [
  {
    name: 'Crew',
  },
  {
    name: 'Hat',
  },
  {
    name: 'lighter',
  },
];

const Products: React.FunctionComponent<RequiredProps> = () => {
  return (
    <>
      {productData.map((p) => {
        return (
          <>
            <ProductPreview name={p.name}></ProductPreview>
          </>
        );
      })}
    </>
  );
};
export default Products;
