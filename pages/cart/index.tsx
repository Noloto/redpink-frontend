import type { NextPage } from 'next';
import Navigation from '../../components/Navigation/Navigation';
import { useLocalStorage } from '../../common/utils/useLocalStorage';
import Image from 'next/image';

type RequiredProps = {};

const Shop: NextPage<RequiredProps> = () => {
  const [cart, setCartItem] = useLocalStorage<Array<CartItem>>('CART', []);

  const removeItem = () => {
    console.log(cart);
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
                <p>{item.amount}</p>
              </div>
              <button className="pointer" onClick={removeItem}>
                x
              </button>
            </div>
          );
        })}
        <button className="border-[#ed7878] border-[2px] border-solid flex justify-self-end">
          checkout
        </button>
      </div>
    </>
  );
};

export default Shop;
