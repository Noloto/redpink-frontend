import ShopifyClient from '../../../shopify-client';
import { GetStaticPaths, NextPage } from 'next';
import { useEffect, useState } from 'react';
import { productVariantsQuery } from '../../../common/queries/productVariant.query';
import Image from 'next/image';
import Navigation from '../../../components/Navigation/Navigation';

type RequiredProps = {
  productVariants: any;
};

const ProductVariants: NextPage<RequiredProps> = ({ productVariants }) => {
  const [productSizeVariants, setProductSizeVariants] = useState<Array<any>>(
    []
  );
  useEffect(() => {
    productVariants.map(async (productVariant: any) => {
      const pathSizeName = await window.location.pathname.split(
        '/shop/two-face-inside-out-variants/'
      );
      const productVariantSize = await productVariant.node.title.split('/');
      if (
        pathSizeName[1].replace(/\s/g, '') ===
        productVariantSize[0].replace(/\s/g, '')
      ) {
        setProductSizeVariants((prevState) => [...prevState, productVariant]);
      }
    });
  }, [productVariants]);

  return (
    <>
      <div className="bg-[url('/images/howlround.gif')] bg-no-repeat bg-center bg-fixed bg-cover min-h-screen">
        <Navigation></Navigation>
        <div className="grid sm:grid-cols-1 md:grid-cols-5">
          {productSizeVariants.map((productVariant: any) => {
            return (
              <>
                <div className="w-full h-full m-5">
                  <Image
                    key={productVariant}
                    src={productVariant.node.image.url}
                    alt={productVariant.node.image.altText ?? 'alt'}
                    className="cursor-pointer bg-[#330b0b] bg-opacity-50 rounded-xl"
                    width={300}
                    height={350}
                  ></Image>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export const getStaticProps = async (context: any) => {
  const size = context.params.size;

  const { data } = await ShopifyClient.query({
    query: productVariantsQuery,
  });

  const productVariants = Object.values(
    data.products.edges[0].node.variants.edges
  );

  return {
    props: JSON.parse(JSON.stringify({ productVariants })),
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await ShopifyClient.query({
    query: productVariantsQuery,
  });

  return {
    paths: [
      {
        params: {
          size: 'S-M',
        },
      },
      {
        params: {
          size: 'M-L',
        },
      },
      {
        params: {
          size: 'L-XL',
        },
      },
    ],
    fallback: false,
  };
};

export default ProductVariants;
