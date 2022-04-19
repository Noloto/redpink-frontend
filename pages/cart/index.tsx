import type { NextPage } from 'next';
import Navigation from '../../components/Navigation/Navigation';
import { useLocalStorage } from '../../common/utils/useLocalStorage';
import Image from 'next/image';
import cx from 'classnames';
import styles from './Cart.module.css';
import ShopifyClient from '../../shopify-client';
import { createCart } from '../../common/queries/cart/createCart.mutation';
import { useEffect } from 'react';
import { getCartById } from '../../common/queries/cart/getCartById.query';
import { useRouter } from 'next/router';
import { useCycle } from 'framer-motion';

type RequiredProps = {};

const Shop: NextPage<RequiredProps> = () => {
  const router = useRouter();

  const [showMe, setShowMe] = useCycle(false, true);

  const [cart, updateCart] = useLocalStorage<Cart>('CART', {
    id: 'NOT INIZIALIZED',
    checkoutUrl: 'NOT INIZIALIZED',
    products: [],
  });

  const removeItem = (uuid: string) => {
    updateCart({
      ...cart,
      products: cart.products.filter((r) => r.uuid !== uuid),
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
      updateCart(newCart);
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

  const goToCheckout = () => {
    router.push(cart.checkoutUrl);
  };

  return (
    <>
      <div className="bg-[url('/images/howlround.gif')] bg-no-repeat bg-center bg-fixed bg-cover min-h-screen min-w-screen">
        <Navigation showMe={showMe} setShowMe={() => setShowMe()}></Navigation>
        {cart.products.map((product, idx) => {
          return (
            <div
              key={idx}
              className="flex justify-evenly items-center my-16 w-full"
            >
              <div className="w-32 md:w-56">
                <Image
                  src={
                    // TODO: notfound image & hoodie image
                    product?.images[0]?.node?.url ?? '/images/heroAnimation.gif'
                  }
                  alt="Product in the Cart"
                  width={500}
                  height={450}
                  className="object-cover"
                />
              </div>
              <div className="flex gap-10">
                <p>{product.title}</p>
                <p>{+product.price! * product.amount!}</p>
                <input
                  type="number"
                  className="text-redpink w-8"
                  name={product.title}
                  value={product.amount}
                  max={25}
                  onChange={(e) => updateAmount(product, e)}
                ></input>
              </div>
              <Image
                className={cx('pointer', styles.filterRedpink)}
                onClick={() => removeItem(product.uuid)}
                src="/images/redpink-trash.svg"
                alt="remove item from cart"
                width={30}
                height={30}
              />
            </div>
          );
        })}
        <div className="flex justify-end px-10">
          <button
            onClick={() => goToCheckout()}
            className="border-[#ed7878] border-[2px] border-solid text-redpink py-2 px-5 md:py-4 md:px-8"
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default Shop;
