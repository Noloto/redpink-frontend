import styles from './Shop.module.css';
import Head from 'next/head';
import ShopifyClient from '../../shopify-client';
import { productsQuery } from '../../common/queries/products/products.query';
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from 'next';
import Image from 'next/image';
import { getProductByHandle } from '../../common/queries/products/product.query';

type RequiredProps = {
  product: any;
};

const Product: NextPage<RequiredProps> = ({ product }) => {
  return (
    <main className={styles.container}>
      <div className={styles.product}>
        <Image
          src={product.images.edges[0].node.url}
          alt={product.images.edges[0].node.altText ?? ''}
          fill={true}
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className={styles.button}>
        <Image
          src={
            product.tags.find((tag: string) => tag === 'buy')
              ? '/images/bye.png'
              : '/images/want.png'
          }
          fill={true}
          style={{ objectFit: 'contain' }}
          alt=""
        />
      </div>
    </main>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await ShopifyClient.query({
    query: productsQuery,
  });

  const paths = Object.values(data.products.edges).map((product: any) => {
    return {
      params: {
        productHandle: product.node.handle,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const productHandle = context?.params?.productHandle;

  const { data } = await ShopifyClient.query({
    query: getProductByHandle,
    variables: { productHandle },
  });

  return {
    props: {
      product: JSON.parse(JSON.stringify({ data })).data.productByHandle,
    },
    revalidate: 60,
  };
};

export default Product;
