import Link from 'next/link';
import cx from 'classnames';

import {
  NAVIGATION_ITEMS,
  NAVIGATION_TITLES,
} from '../../common/enums/navigation';
import { SOCIAL_MEDIA_LINK } from '../../common/enums/social-media';
import { useEffect, useRef, useState } from 'react';
import { animate, AnimatePresence, motion, useCycle } from 'framer-motion';
import { BurgerX } from '../common/BurgerX/BurgerX';
import { useDimensions } from '../../common/utils/use-dimensions';

type RequiredProps = {
  showMe: boolean;
  setShowMe: () => void;
  cart: Cart | undefined;
};
type OptionalProps = {
  className?: string;
};

const Navigation: React.FC<RequiredProps & OptionalProps> = ({
  className,
  showMe,
  cart,
  setShowMe,
}) => {
  const [whereAmI, setWhereAmI] = useState<string>();

  const containerRef = useRef(null);
  const height = useDimensions(containerRef);

  useEffect(() => {
    setWhereAmI(`/${window.location.pathname.split('/', 2)[1]}`);
  }, []);

  return (
    <>
      {/**MOBILE OPEN */}
      <motion.nav
        initial={false}
        animate={showMe ? 'open' : 'closed'}
        custom={{ height }}
        ref={containerRef}
        className={`${showMe ? 'visible' : 'hidden'}`}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showMe ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="w-screen h-screen bg-redpink"
        >
          <div className="flex visible lg:hidden p-5 items-center">
            <div className="flex justify-center w-1/6">
              <BurgerX toggle={() => setShowMe()} />
            </div>
            <div className="w-4/6">
              <Link href={NAVIGATION_ITEMS.SHOP} passHref>
                <a className="text-2xl ml-6 text-black">
                  ･*。 　 　･° 　　　°。 * 。 　　　　　　 ･°
                </a>
              </Link>
            </div>
            <div className="flex justify-center w-1/6">
              <Link href={NAVIGATION_ITEMS.CART} passHref>
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="black"
                    strokeWidth="1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </a>
              </Link>
            </div>
          </div>

          <div
            className={`h-2/3 flex justify-center items-center flex-col gap-10 text-3xl`}
          >
            <Link href={NAVIGATION_ITEMS.HOME} passHref>
              <a className="text-[black]">{NAVIGATION_TITLES.HOME}</a>
            </Link>
            <Link href={NAVIGATION_ITEMS.SHOP} passHref>
              <a className="text-[black]">{NAVIGATION_TITLES.SHOP}</a>
            </Link>
            <Link href={NAVIGATION_ITEMS.CONTACT} passHref>
              <a className="text-[black]">{NAVIGATION_TITLES.CONTACT}</a>
            </Link>
          </div>
        </motion.div>
      </motion.nav>
      {/**MOBILE CLOSED */}
      {!showMe && (
        <div className="flex visible lg:hidden p-5 items-center">
          <div className=" flex justify-center w-1/6">
            <BurgerX toggle={() => setShowMe()} />
          </div>
          <div className="w-4/6">
            <Link href={NAVIGATION_ITEMS.SHOP} passHref>
              <a className="text-2xl ml-6">
                ･*。 　 　･° 　　　°。 * 。 　　　　　　 ･°
              </a>
            </Link>
          </div>
          <div className="flex justify-center w-1/6">
            <Link href={NAVIGATION_ITEMS.CART} passHref>
              <a>
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  {cart?.products && cart?.products?.length > 0 && (
                    <p className="flex text-xs">{cart.products.length}</p>
                  )}
                </div>
              </a>
            </Link>
          </div>
        </div>
      )}

      {/**DESKTOP */}
      <div
        className={cx(
          'hidden lg:flex grid-flow-col grid-cols-3 h-[10vh] items-center justify-between px-24 pt-6 w-full',
          className
        )}
      >
        <div className="flex w-1/6 justify-evenly text-xs">
          <Link href={NAVIGATION_ITEMS.HOME} passHref>
            <a className="mr-6">{NAVIGATION_TITLES.HOME}</a>
          </Link>
          <Link href={NAVIGATION_ITEMS.SHOP} passHref>
            <a
              className={`mr-6 ${
                whereAmI === NAVIGATION_ITEMS.SHOP
                  ? 'border-b border-redpink'
                  : ''
              } `}
            >
              {NAVIGATION_TITLES.SHOP}
            </a>
          </Link>
          <Link href={NAVIGATION_ITEMS.CONTACT} passHref>
            <a
              className={`mr-6 ${
                whereAmI === NAVIGATION_ITEMS.CONTACT
                  ? 'border-b border-redpink'
                  : ''
              } `}
            >
              {NAVIGATION_TITLES.CONTACT}
            </a>
          </Link>
        </div>
        <div className="flex w-2/6 justify-center items-center m-[0_auto]">
          <Link href={NAVIGATION_ITEMS.SHOP}>
            <a className="text-2xl">･*。　 　･°　　　°。* 。　　･°</a>
          </Link>
        </div>
        <div className="flex w-1/6 justify-evenly">
          <Link href={SOCIAL_MEDIA_LINK.INSTAGRAM} passHref>
            <a target="_blank">
              <svg
                className="w-8 h-8"
                viewBox="0 0 26 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.2069 2.08337H7.79024C4.91376 2.08337 2.58191 4.41522 2.58191 7.29171V17.7084C2.58191 20.5849 4.91376 22.9167 7.79024 22.9167H18.2069C21.0834 22.9167 23.4152 20.5849 23.4152 17.7084V7.29171C23.4152 4.41522 21.0834 2.08337 18.2069 2.08337Z"
                  stroke="#ed7878"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17.1652 11.8437C17.2938 12.7106 17.1457 13.596 16.7421 14.3739C16.3384 15.1518 15.6997 15.7827 14.9169 16.1767C14.1341 16.5707 13.2469 16.7079 12.3817 16.5686C11.5164 16.4294 10.7171 16.0209 10.0973 15.4012C9.47764 14.7814 9.06911 13.9821 8.92988 13.1168C8.79064 12.2516 8.92779 11.3644 9.32181 10.5816C9.71583 9.79875 10.3467 9.16009 11.1246 8.75645C11.9025 8.3528 12.7879 8.20473 13.6548 8.33328C14.5391 8.46441 15.3578 8.87647 15.9899 9.5086C16.622 10.1407 17.0341 10.9594 17.1652 11.8437Z"
                  stroke="#ed7878"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.7277 6.77087H18.7372"
                  stroke="#ed7878"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </Link>
          <Link href={NAVIGATION_ITEMS.CART} passHref>
            <a>
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                {cart?.products && cart?.products?.length > 0 && (
                  <div className="flex text-xs border-redpink rounded-full border-4 bg-redpink text-white h-4 items-center scale-90">
                    <p className="text-white">{cart.products.length}</p>
                  </div>
                )}
              </div>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};
export default Navigation;
