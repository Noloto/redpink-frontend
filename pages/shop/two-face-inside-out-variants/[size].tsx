import ShopifyClient from '../../../shopify-client';
import { GetStaticPaths, NextPage } from 'next';
import { useEffect, useState } from 'react';
import { productVariantsQuery } from '../../../common/queries/products/productVariant.query';
import Image from 'next/image';
import Navigation from '../../../components/Navigation/Navigation';
import { useLocalStorage } from '../../../common/utils/useLocalStorage';
import { nanoid } from 'nanoid';
import { useCycle } from 'framer-motion';

type RequiredProps = {
  productVariants: any;
};

const ProductVariants: NextPage<RequiredProps> = ({ productVariants }) => {
  const [productSizeVariants, setProductSizeVariants] = useState<Array<any>>(
    []
  );

  const [showMe, setShowMe] = useCycle(false, true);

  const [cart, updateCart] = useLocalStorage<Cart>('CART', {
    id: 'NOT INIZIALIZED',
    checkoutUrl: 'NOT INIZIALIZED',
    products: [],
  });

  const addToCart = (
    id: string,
    title: string,
    price: string,
    images: Image[],
    variants: Variant[]
  ) => {
    const CartItem: CartItem = {
      id: id,
      title: title,
      price: price,
      images: images,
      variants: variants,
      uuid: nanoid(),
      amount: 1,
      onlyOne: true,
    };

    const isCartItem = cart.products.findIndex(
      (e: CartItem) => e.title === title
    );

    if (isCartItem == -1) {
      let newProducts = cart.products;
      newProducts.push(CartItem);
      updateCart({ ...cart, products: newProducts });
    } else return;
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

  useEffect(() => {
    let localCartData = JSON.parse(
      window.localStorage.getItem('CART') as string
    );

    if (localCartData && localCartData.id !== 'NOT INIZIALIZED') {
      const cartId = cart.id;
      ShopifyClient.query({
        query: getCartById,
        variables: { cartId },
      }).then((res) => {
        console.log(res);
      });

      updateCart({
        id: localCartData?.id,
        checkoutUrl: localCartData?.checkoutUrl,
        products: cart?.products,
      });
      return;
    }

    const getCart = async () => {
      const { data } = await ShopifyClient.mutate({
        mutation: createCart,
      });

      updateCart({
        id: data.cartCreate.cart.id,
        checkoutUrl: data.cartCreate.cart.checkoutUrl,
        products: cart.products,
      });
    };

    getCart();
  }, []);

  return (
    <>
      <div className="bg-[url('/images/howlround.gif')] bg-no-repeat bg-center bg-fixed bg-cover min-h-screen min-w-screen">
        <Navigation showMe={showMe} setShowMe={() => setShowMe()}></Navigation>
        <div className="grid min-w-screen items-center sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {productSizeVariants.map((productVariant: any) => {
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
                        productVariant.node.id,
                        productVariant.node.title,
                        productVariant.node.priceV2.amount,
                        productVariant.node.image,
                        productVariant.node.variants
                      )
                    }
                  />
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
