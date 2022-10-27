import ShopifyClient from '../../shopify-client';
import { productsQuery } from '../../common/queries/products/products.query';
import { GetStaticPaths, GetStaticPropsContext, NextPage } from 'next';
import { useEffect, useState } from 'react';
import Navigation from '../../components/Navigation/Navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useLocalStorage } from '../../common/utils/useLocalStorage';
import { nanoid } from 'nanoid';
import { addItemToCart } from '../../common/queries/cart/addItemToCart.mutation';
import { useCycle } from 'framer-motion';
import { getCartById } from '../../common/queries/cart/getCartById.query';
import { createCart } from '../../common/queries/cart/createCart.mutation';
import { getProductByHandle } from '../../common/queries/products/product.query';

type RequiredProps = {
  p: any;
};

const ProductName: NextPage<RequiredProps> = ({ p }) => {
  const [showMe, setShowMe] = useCycle(false, true);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [cart, updateCart] = useLocalStorage<Cart>('CART', {
    id: 'NOT INIZIALIZED',
    checkoutUrl: 'NOT INIZIALIZED',
    products: [],
  });

  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    let localCartData = JSON.parse(
      window.localStorage.getItem('CART') as string
    );

    if (localCartData && localCartData.id !== 'NOT INIZIALIZED') {
      const cartId = cart.id;
      ShopifyClient.query({
        query: getCartById,
        variables: { cartId },
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
  }, [cart, updateCart]);

  useEffect(() => {
    if (p !== null) {
      setProduct({
        id: p.id,
        handle: p.handle,
        title: p.title,
        description: p.description,
        price: p.priceRange?.minVariantPrice?.amount,
        images: p.images?.edges,
        variants: p.variants?.edges,
      });
    }
  }, [p]);

  const addToCart = async () => {
    const cartId = cart.id;
    const variantId = product?.variants[0].node.id;
    let lineId = '';

    await ShopifyClient.mutate({
      mutation: addItemToCart,
      variables: { cartId, variantId, quantity },
    }).then((res: any) => {
      lineId = res?.data?.cartLinesAdd.cart.lines.edges[0].node.id;
    });

    if (product) {
      const CartItem: CartItem = {
        id: product.id,
        handle: product.handle,
        lineId: lineId,
        uuid: nanoid(),
        description: product.description,
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
        await updateCart({ ...cart, products: newProducts });
      } else {
        newCart.products[isCartItem].amount =
          1 + newCart.products[isCartItem].amount!;
        await updateCart(newCart);
      }
    }
  };

  return (
    <>
      <div className="bg-[url('/images/howlround_effect_v2.2.gif')] bg-no-repeat bg-center bg-fixed bg-cover min-h-screen">
        <Navigation cart={cart} showMe={showMe} setShowMe={() => setShowMe()} />
        <div className="absolute w-full pl-10  lg:pl-96 lg:pt-32">
          <Link href="/shop">
            <a className="hover:underline text-xs">shop</a>
          </Link>
          <p className="inline text-xs">{` > ${product?.title.toLowerCase()}`}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 h-[calc(100vh-30vh)] items-center justify-center">
          <div className="flex md:w-3/6 md:justify-self-end">
            <Image
              src={product?.images[0].node.url ?? '/images/capo.png'}
              alt="product"
              width={1920}
              height={1080}
              className="object-cover"
            />
          </div>
          <div className="flex flex-col w-3/4 gap-6 md:justify-self-start pl-12 md:pl-0 md:w-2/6">
            <p className="text-xl italic">{product?.title}</p>
            <p className="text-sm">{product?.price} $</p>
            <p className="text-sm">{product?.description}</p>
            <label
              htmlFor="quantityCounter"
              className="flex flex-row text-redpink gap-6"
            >
              <button
                onClick={() =>
                  setQuantity(quantity <= 1 ? quantity : quantity - 1)
                }
              >
                -
              </button>
              <p>{quantity}</p>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </label>
            <input
              className="hidden"
              id="quantityCounter"
              type="number"
              min={1}
            ></input>
            <button
              className="border-[#ed7878] border-[2px] border-solid py-3 bg-transparent text-redpink md:w-2/3 hover:bg-redpink hover:text-white transition duration-300"
              onClick={() => {
                addToCart();
                setIsAdding(true);
                setTimeout(() => {
                  setIsAdding(false);
                  setIsAdded(true);
                  setTimeout(() => {
                    setIsAdded(false);
                  }, 2000);
                }, 750);
              }}
            >
              {isAdding && 'Adding...'}
              {isAdded && 'Added!'}
              {!isAdded && !isAdding ? 'Add To Cart' : ''}
            </button>
          </div>
        </div>
      </div>
    </>
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

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const productHandle = context?.params?.productHandle;

  const { data } = await ShopifyClient.query({
    query: getProductByHandle,
    variables: { productHandle },
  });

  return {
    props: {
      p: JSON.parse(JSON.stringify({ data })).data.productByHandle,
    },
    revalidate: 60,
  };
};

export default ProductName;
