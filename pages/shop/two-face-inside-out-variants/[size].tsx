import ShopifyClient from '../../../shopify-client';
import { GetStaticPaths, NextPage } from 'next';
import { useEffect, useState } from 'react';
import { productVariantsQuery } from '../../../common/queries/products/productVariant.query';
import Image from 'next/image';
import Navigation from '../../../components/Navigation/Navigation';
import { useLocalStorage } from '../../../common/utils/useLocalStorage';
import { nanoid } from 'nanoid';

type RequiredProps = {
  productVariants: any;
};

const ProductVariants: NextPage<RequiredProps> = ({ productVariants }) => {
  const [productSizeVariants, setProductSizeVariants] = useState<Array<any>>(
    []
  );
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);

  const [cart, setCartItem] = useLocalStorage<Array<CartItem>>('CART', []);

  const addToCart = (title: string, image: string, price: string) => {
    const CartItem: CartItem = {
      uuid: nanoid(),
      productName: title,
      price: price,
      amount: quantity,
      imageSrc: image,
    };

    const isCartItem = cart.findIndex((e: any) => e.productName === name);
    if (isCartItem == -1) {
      setCartItem((prevState) => [...prevState, CartItem]);
    } else {
      let newCart = [...cart];
      newCart[isCartItem].amount = quantity + newCart[isCartItem].amount;
      setCartItem(newCart);
    }
  };

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
      <div className="bg-[url('/images/howlround.gif')] bg-no-repeat bg-center bg-fixed bg-cover min-h-screen min-w-screen">
        <Navigation></Navigation>
        <div className="grid min-w-screen items-center sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {productSizeVariants.map((productVariant: any) => {
            {
              console.log(productVariant);
            }
            return (
              <>
                <div className="flex w-full h-full justify-center">
                  <Image
                    key={productVariant.node.title}
                    src={productVariant.node.image.url}
                    alt={productVariant.node.image.altText ?? 'alt'}
                    className="cursor-pointer object-cover"
                    width={300}
                    height={350}
                    onClick={() =>
                      addToCart(
                        productVariant.node.title,
                        productVariant.node.image.url,
                        productVariant.node.priceV2.amount
                      )
                    }
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
