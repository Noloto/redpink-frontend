import type { NextPage } from 'next';
import Navigation from '../../components/Navigation/Navigation';
import { useLocalStorage } from '../../common/utils/useLocalStorage';
import Image from 'next/image';
import cx from 'classnames';
import styles from './Cart.module.css';
import ShopifyClient from '../../shopify-client';
import { createCart } from '../../common/queries/cart/createCart.mutation';
import { useEffect, useState } from 'react';
import { getCartById } from '../../common/queries/cart/getCartById.query';
import { useRouter } from 'next/router';
import { useCycle } from 'framer-motion';
import { updateLineQuantity } from '../../common/queries/cart/updateLineQuantity.mutation';

const Cart: NextPage = () => {
  const router = useRouter();

  const [showMe, setShowMe] = useCycle(false, true);

  const [cart, updateCart] = useLocalStorage<Cart>('CART', {
    id: 'NOT INIZIALIZED',
    checkoutUrl: 'NOT INIZIALIZED',
    products: [],
  });

  const [isSSR, setIsSSR] = useState(true);
  useEffect(() => {
    setIsSSR(false);
  }, []);

  useEffect(() => {
    cart.products.length === 0 ?? localStorage.clear;
  }, [cart]);

  const removeItem = async (uuid: string) => {
    const index = cart.products.findIndex((e) => e.uuid == uuid);
    let newCart = cart;

    const cartId = cart.id;
    const lineId = cart.products[index].lineId;
    const quantity = 0;

    await ShopifyClient.mutate({
      mutation: updateLineQuantity,
      variables: { cartId, lineId, quantity },
    })
      .then(async (res: any) => {
        await updateCart({
          ...cart,
          products: cart.products.filter((r) => r.uuid !== uuid),
        });
      })
      .catch((err) => {
        localStorage.clear;
        console.log(err);
      });
  };

  const updateAmount = (data: any, element: any) => {
    const index = cart.products.findIndex((e) => e.uuid == data.uuid);
    let newCart = cart;

    if (index !== -1 && cart.products.map((i) => i.onlyOne)) {
      newCart.products[index].amount = 1;
    } else if (index !== -1 && +element.target.value < -1) {
      removeItem(data.uuid);
    } else if (index !== -1 && +element.target.value <= 25) {
      newCart.products[index].amount = +element.target.value;

      const cartId = cart.id;
      const lineId = cart.products[index].id;
      const quantity = cart.products[index].amount;

      ShopifyClient.query({
        query: updateLineQuantity,
        variables: { cartId, lineId, quantity },
      })
        .then((res: any) => {
          updateCart({
            id: res?.data.cart.id,
            checkoutUrl: res?.data.cart.checkoutUrl,
            products: newCart?.products,
          });
        })
        .catch((err) => {
          localStorage.clear;
          return;
        });
    } else if (index !== -1 && +element.target.value > 25) {
      newCart.products[index].amount = 25;
      updateCart(newCart);
    }
  };

  useEffect(() => {
    let localCartData = JSON.parse(
      window.localStorage.getItem('CART') as string
    );

    if (localCartData && localCartData.id !== 'NOT INIZIALIZED') {
      const cartId = cart.id;

      ShopifyClient.query({
        query: getCartById,
        variables: { cartId },
      })
        .then((res: any) => {
          updateCart({
            id: res?.data.cart.id,
            checkoutUrl: res?.data.cart.checkoutUrl,
            products: localCartData?.products,
          });
        })
        .catch((err) => {
          localStorage.clear;
          return;
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

  const goToCheckout = () => {
    router.push(cart.checkoutUrl);
  };

  let total = 0;

  for (let i = 0; i < cart.products.length; i++) {
    total += +cart.products[i].price * +cart.products[i].amount;
  }

  return (
    <>
      {!isSSR && cart.products.length > 0 ? (
        <div className="bg-[url('/images/howlround.gif')] bg-no-repeat bg-center bg-fixed bg-cover min-h-screen min-w-screen">
          <Navigation
            cart={cart}
            showMe={showMe}
            setShowMe={() => setShowMe()}
          ></Navigation>
          <h3 className=" text-redpink italic ml-4 md:mt-24 md:ml-44 text-xl">
            Shopping Cart
          </h3>

          <div>
            {cart.products.map((product, idx) => {
              return (
                <div
                  key={idx}
                  className="flex justify-evenly items-center my-16 w-full"
                >
                  <div className="flex w-32 md:w-56 flex-row">
                    <Image
                      src={
                        // TODO: notfound image & hoodie image
                        product?.images[0]?.node?.url ??
                        '/images/heroAnimation.gif'
                      }
                      alt="Product in the Cart"
                      width={500}
                      height={450}
                      className="object-cover"
                    />
                    <p>{product.title}</p>
                  </div>
                  <div className="flex gap-10">
                    <input
                      type="number"
                      className="text-redpink w-8"
                      name={product.title}
                      value={product.amount}
                      max={25}
                      onChange={(e) => updateAmount(product, e)}
                    ></input>
                  </div>
                  <div
                    className="flex cursor-pointer flex-row"
                    onClick={() => removeItem(product.uuid)}
                  >
                    <p className="mr-12">
                      $ {+product.price! * product.amount!}.00
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="#ed7878"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="border-b-[1px] border-redpink md:mt-22 mx-5 md:mx-10" />
          <div className="flex justify-end px-10 flex-col mt-10 md:mt-10">
            <div className="flex flex-row justify-between md:justify-end md:gap-72 mb-6">
              <p className="text-redpink">Subtotal</p>
              <p className="mr-0 md:mr-3">{`${total} $`}</p>
            </div>
            <div className="md:flex md:justify-end">
              <button
                onClick={() => goToCheckout()}
                className="border-[#ed7878] border-[2px] border-solid py-2 bg-transparent text-redpink w-full md:w-1/4 md:py-3 hover:bg-redpink hover:text-white transition duration-300"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[url('/images/howlround.gif')] bg-no-repeat bg-center bg-fixed bg-cover min-h-screen min-w-screen">
          <Navigation
            showMe={showMe}
            cart={cart}
            setShowMe={() => setShowMe()}
          ></Navigation>
          <div className="flex justify-center flex-col items-center h-[calc(100vh-30vh)] gap-16">
            <p className="text-4xl">૮₍˶ •. • ⑅₎ა ♡</p>
            <p className="text-2xl text-center	">
              your shopping cart seems empty so theres nothing to show here...
              really
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
