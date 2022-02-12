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
      <Navigation></Navigation>
      {productSizeVariants.map((productVariant: any) => {
        return (
          <>
            <Image
              key={productVariant}
              src={productVariant.node.image.url}
              alt={productVariant.node.image.altText ?? 'alt'}
              width={100}
              height={100}
            ></Image>
          </>
        );
      })}
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
