import type { NextPage } from 'next';
import Navigation from '../../components/Navigation/Navigation';
import { useLocalStorage } from '../../common/utils/useLocalStorage';
import Image from 'next/image';
import { useState } from 'react';
import cx from 'classnames';
import styles from './Cart.module.css';

type RequiredProps = {};

const Shop: NextPage<RequiredProps> = () => {
  const [cart, setCartItem] = useLocalStorage<Array<CartItem>>('CART', []);

  const removeItem = (uuid: string) => {
    setCartItem(cart.filter((r) => r.uuid !== uuid));
  };

  const updateAmount = (data: any, element: any) => {
    const index = cart.findIndex((e) => e.uuid == data.uuid);

    if (index !== -1) {
      let newCart = [...cart];
      console.log(data.amount);
      newCart[index].amount = +element.target.value;
      setCartItem(newCart);
    }
  };
  return (
    <>
      <div className="bg-[url('/images/howlround.gif')] bg-no-repeat bg-center bg-fixed bg-cover min-h-screen min-w-screen">
        <Navigation></Navigation>
        {cart.map((item, idx) => {
          return (
            <div
              key={idx}
              className="flex justify-evenly items-center my-16 w-full"
            >
              <div className="w-32 md:w-56">
                <Image
                  src={item.imageSrc}
                  alt="Product in the Cart"
                  width={500}
                  height={450}
                  className="object-cover"
                />
              </div>
              <div className="flex gap-10">
                <p>{item.productName}</p>
                <p>{item.price}</p>
                <input
                  type="number"
                  name={item.productName}
                  value={item.amount}
                  onChange={(e) => updateAmount(item, e)}
                ></input>
              </div>
              <Image
                className={cx('pointer', styles.filterRedpink)}
                onClick={() => removeItem(item.uuid)}
                src="/images/redpink-trash.svg"
                alt="remove item from cart"
                width={30}
                height={30}
              />
            </div>
          );
        })}
        <button className="border-[#ed7878] border-[2px] border-solid flex justify-self-end">
          Checkout
        </button>
      </div>
    </>
  );
};

export default Shop;
