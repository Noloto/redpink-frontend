import Link from 'next/link';
import cx from 'classnames';
import Image from 'next/image';
import styles from './Navigation.module.css';

import {
  NAVIGATION_ITEMS,
  NAVIGATION_TITLES,
} from '../../common/enums/navigation';
import { SOCIAL_MEDIA_LINK } from '../../common/enums/social-media';
import { useEffect, useRef, useState } from 'react';
import { animate, AnimatePresence, motion, useCycle } from 'framer-motion';
import { BurgerX } from '../common/BurgerX/BurgerX';
import { useDimensions } from '../../common/utils/use-dimensions';

type OptionalProps = {
  className?: string;
};

const Navigation: React.FC<OptionalProps> = ({ className }) => {
  const [whereAmI, setWhereAmI] = useState<string>();

  const containerRef = useRef(null);
  const [showMe, setShowMe] = useCycle(false, true);
  const height = useDimensions(containerRef);

  useEffect(() => {
    setWhereAmI(`/${window.location.pathname.split('/', 2)[1]}`);
  }, []);

  const sidebar = {
    open: (height = 1000) => ({
      clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
      transition: {
        type: 'spring',
        stiffness: 20,
        restDelta: 2,
      },
    }),
    closed: {
      clipPath: 'circle(30px at 40px 40px)',
      transition: {
        delay: 0.5,
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
  };

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
                  <Image
                    src="/images/redpink-shopping-cart.png"
                    alt="instagram"
                    className="cursor-pointer"
                    width={35}
                    height={35}
                  />
                </a>
              </Link>
            </div>
          </div>

          <div
            className={`h-2/3 flex justify-center items-center flex-col gap-10 text-3xl `}
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
              <Image
                src="/images/redpink-shopping-cart.png"
                alt="instagram"
                className="cursor-pointer"
                width={35}
                height={35}
              />
            </a>
          </Link>
        </div>
      </div>

      {/**DESKTOP */}
      <div
        className={cx(
          'hidden lg:flex grid-flow-col grid-cols-3 h-[10vh] items-center justify-between px-52 pt-6 w-full',
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
            <a>
              <Image
                src="/images/instagram.svg"
                alt="instagram"
                className="cursor-pointer"
                width={35}
                height={35}
              />
            </a>
          </Link>
          <Link href={NAVIGATION_ITEMS.CART} passHref>
            <a>
              <Image
                src="/images/redpink-shopping-cart.png"
                alt="instagram"
                className="cursor-pointer"
                width={35}
                height={35}
              />
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};
export default Navigation;
