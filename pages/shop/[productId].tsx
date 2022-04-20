import ShopifyClient from '../../shopify-client';
import { productsQuery } from '../../common/queries/products/products.query';
import { GetStaticPaths, NextPage } from 'next';
import { useEffect, useState } from 'react';
import Navigation from '../../components/Navigation/Navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useLocalStorage } from '../../common/utils/useLocalStorage';
import { nanoid } from 'nanoid';
import { hoodieSizes } from '../../common/enums/constants';
import { addItemToCart } from '../../common/queries/cart/addItemToCart.mutation';
import { useCycle } from 'framer-motion';
import cx from 'classnames';
import { getCartById } from '../../common/queries/cart/getCartById.query';
import { createCart } from '../../common/queries/cart/createCart.mutation';

type RequiredProps = {
  productData: any;
};

const ProductDetail: NextPage<RequiredProps> = ({ productData }) => {
  const [pathName, setPathName] = useState('');
  const [showMe, setShowMe] = useCycle(false, true);

  const [cart, updateCart] = useLocalStorage<Cart>('CART', {
    id: 'NOT INIZIALIZED',
    checkoutUrl: 'NOT INIZIALIZED',
    products: [],
  });

  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    setPathName(window.location.pathname);
  }, []);

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

  useEffect(() => {
    productData.map((p: any) => {
      if (p !== null) {
        setProduct({
          id: p.node?.id,
          title: p.node?.title,
          price: p.node?.priceRange?.minVariantPrice?.amount,
          images: p.node?.images?.edges,
          variants: p.node?.variants?.edges,
        });
      }
    });
  }, []);

  const addToCart = () => {
    const cartId = cart.id;
    const variantId = product?.variants[0].node.id;

    ShopifyClient.mutate({
      mutation: addItemToCart,
      variables: { cartId, variantId },
    }).then((res) => {
      console.log(res);
    });

    if (product) {
      const CartItem: CartItem = {
        id: product.id,
        uuid: nanoid(),
        title: product.title,
        price: product.price,
        images: product.images,
        variants: product.variants,
        onlyOne: false,
        amount: 1,
      };

      let newCart: Cart = cart;

      const isCartItem = cart.products.findIndex(
        (e: CartItem) => e.title === product?.title
      );

      if (isCartItem == -1) {
        let newProducts = cart.products;
        newProducts.push(CartItem);
        updateCart({ ...cart, products: newProducts });
      } else {
        newCart.products[isCartItem].amount =
          1 + newCart.products[isCartItem].amount!;
        updateCart(newCart);
      }
    }
  };

  if (pathName === '/shop/Two%20Face%20Reversible') {
    return (
      <>
        <div className="bg-[url('/images/howlround.gif')] bg-no-repeat bg-center bg-fixed bg-cover min-h-screen min-w-screen text-center justify-center">
          <Navigation
            showMe={showMe}
            setShowMe={() => setShowMe()}
          ></Navigation>
          <div className="grid items-center justify-center mt-32">
            <p className="text-3xl">CHOOSE YOUR SIZE</p>
            <div className="grid sm:grid-cols-1 md:grid-cols-3 mt-16">
              {hoodieSizes.map((size) => {
                return (
                  <div
                    key={size}
                    className="border-2 border-redpink rounded-sm text-center py-3 text-xl mt-8 md:mr-8 md:px-16"
                  >
                    <Link href={`/shop/two-face-inside-out-variants/${size}`}>
                      <a className="">{size}</a>
                    </Link>
                  </div>
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
        <Navigation showMe={showMe} setShowMe={() => setShowMe()}></Navigation>
        <div className="grid grid-cols-1 md:grid-cols-2 w-screen h-[calc(100vh-30vh)] place-items-center ">
          <div className="flex md:w-4/6 justify-self-end">
            <Image
              src={product?.images[0].node.url ?? '/images/capo.png'}
              alt="product"
              width={1920}
              height={1080}
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-6 justify-self-start pl-12 md:pl-0 md:w-2/6">
            <p className="text-xl italic">{product?.title}</p>
            <p className="text-sm">{product?.price} $</p>
            <button
              className="border-[#ed7878] border-[2px] border-solid py-3 bg-transparent text-redpink md:w-2/3 hover:bg-redpink hover:text-white transition duration-300"
              onClick={addToCart}
            >
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
