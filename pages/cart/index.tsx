import styles from '../../styles/Cart.module.css';

import { NextPage } from 'next';

import Image from 'next/image';

import { PiTrashLight } from 'react-icons/pi';

import ShopifyClient from '../../shopify-client';
import { updateLineQuantity } from '../../common/queries/cart/updateLineQuantity.mutation';
import { useLocalStorage } from '../../common/utils/useLocalStorage';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Cart: NextPage = ({}) => {
  const [cart, updateCart] = useLocalStorage<Cart>('CART', {
    id: 'NOT INIZIALIZED',
    checkoutUrl: 'NOT INIZIALIZED',
    products: [],
  });

  const router = useRouter();

  const removeItem = async (uuid: string) => {
    const index = cart.products.findIndex((e) => e.uuid == uuid);

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

  const goToCheckout = () => {
    router.push(cart.checkoutUrl);
  };

  const [isSSR, setIsSSR] = useState(true);
  useEffect(() => {
    setIsSSR(false);
  }, []);

  let total = 0;

  for (let i = 0; i < cart.products.length; i++) {
    total += +cart.products[i].price * +cart?.products[i].amount;
  }

  return (
    <>
      {!isSSR && (
        <div className={styles.container}>
          {cart.products.map((product, idx) => {
            return (
              <div className={styles.productContainer} key={idx}>
                <div className={styles.imageContainer}>
                  <Image
                    src={product?.images[0]?.node?.url}
                    fill={true}
                    style={{ objectFit: 'contain' }}
                    alt=""
                    sizes="(max-width: 768px) 100vw"
                  />
                </div>
                <div className={styles.productDetail}>
                  <p>{product.title}</p>
                  <p>{product.variants[0].node.title}</p>
                </div>
                <p>{product.amount}</p>
                <p>{+product.price! * product.amount!} $</p>
                <Image
                  src="/images/bones.png"
                  alt=""
                  width={30}
                  height={20}
                  onClick={() => removeItem(product.uuid)}
                />
              </div>
            );
          })}
          <div className={styles.detailsContainer}>
            <p>{total} $</p>
            <button
              onClick={() => goToCheckout()}
              className={styles.checkoutButton}
            >
              PEACE OUT
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
