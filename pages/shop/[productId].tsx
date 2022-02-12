import ShopifyClient from '../../shopify-client';
import { productsQuery } from '../../common/queries/products.query';
import { GetStaticPaths, NextPage } from 'next';
import { useEffect, useState } from 'react';
import Navigation from '../../components/Navigation/Navigation';
import Image from 'next/image';

type RequiredProps = {
  productData: any;
};

const ProductDetail: NextPage<RequiredProps> = ({ productData }) => {
  const [product, setProduct] = useState<any>([]);
  const [imageSrc, setImageSrc] = useState('/');
  const [price, setPrice] = useState('');
  const [name, setName] = useState('');
  useEffect(() => {
    productData.map((p: any) => {
      if (p != null) {
        const product: any = Object.values(p)[1];
        setImageSrc(product.images.edges[0].node.url);
        setPrice(product.priceRange.minVariantPrice.amount);
        setName(product.title);
      }
    });
  }, [product, imageSrc, price, name, productData]);

  return (
    <>
      <div className="bg-[url('/images/howlround.gif')] bg-no-repeat bg-center bg-fixed bg-cover min-h-screen">
        <Navigation></Navigation>
        <div className="grid md:grid-cols-2 sm:grid-cols-1 w-full h-[calc(100vh-30vh)] items-center justify-center">
          <div className="flex items-center justify-center">
            <Image src={imageSrc} alt="product" width={450} height={375} />
          </div>
          <div className="flex items-start justify-center flex-col gap-10 h-full w-full">
            <p>{name}</p>
            <p>{price}</p>
            <button className="border-[#ed7878] border-[2px] border-solid px-10 py-5 bg-transparent text-redpink">
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps = async (context: any) => {
  const productId = context.params.productId;

  const { data } = await ShopifyClient.query({
    query: productsQuery,
  });

  const productData = Object.values(data.products.edges).map((product: any) => {
    if (product.node.title === productId) {
      return product;
    }
  });

  return {
    props: JSON.parse(JSON.stringify({ productData })),
  };
};
export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await ShopifyClient.query({
    query: productsQuery,
  });

  const paths = Object.values(data.products.edges).map((product: any) => {
    return {
      params: { productId: product.node.title },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export default ProductDetail;
