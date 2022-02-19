import ShopifyClient from '../../shopify-client';
import { productsQuery } from '../../common/queries/products.query';
import { GetStaticPaths, NextPage } from 'next';
import { useEffect, useState } from 'react';
import Navigation from '../../components/Navigation/Navigation';
import Image from 'next/image';
import Link from 'next/link';

type RequiredProps = {
  productData: any;
};

const ProductDetail: NextPage<RequiredProps> = ({ productData }) => {
  const [product, setProduct] = useState<any>([]);
  const [imageSrc, setImageSrc] = useState('/');
  const [price, setPrice] = useState('');
  const [name, setName] = useState('');
  const [pathName, setPathName] = useState('');

  const hoodieSizes = ['S-M', 'M-L', 'L-XL'];

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

  useEffect(() => {
    setPathName(window.location.pathname);
  }, []);
  if (pathName === '/shop/Two%20Face%20Reversible') {
    return (
      <>
        <div className="bg-[url('/images/howlround.gif')] bg-no-repeat bg-center bg-fixed bg-cover min-h-screen">
          <Navigation></Navigation>
          <div className="flex justify-center items-center flex-col min-h-[calc(100vh-30vh)] gap-36">
            <p className="text-3xl">CHOOSE YOUR SIZE</p>
            <div className="grid gap-20 grid-flow-col ">
              {hoodieSizes.map((size) => {
                return (
                  <Link
                    key={size}
                    href={`/shop/two-face-inside-out-variants/${size}`}
                  >
                    <a className="border-2 px-16 py-4 text-xl">{size}</a>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="bg-[url('/images/howlround.gif')] bg-no-repeat bg-center bg-fixed bg-cover min-h-screen">
        <Navigation></Navigation>
        <div className="grid md:grid-cols-2 sm:grid-cols-1 w-full h-[calc(100vh-30vh)] items-center justify-center">
          <div className="flex items-center justify-center">
            <Image
              src={imageSrc}
              alt="product"
              width={500}
              height={450}
              className="object-cover"
            />
          </div>
          <div className="flex items-start justify-center flex-col gap-10 h-full w-full">
            <p className="text-xl">{name}</p>
            <p className=" text-lg">{price}</p>
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
