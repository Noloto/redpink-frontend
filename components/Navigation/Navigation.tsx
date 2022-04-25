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

type RequiredProps = {
  showMe: boolean;
  setShowMe: () => void;
};
type OptionalProps = {
  className?: string;
};

const Navigation: React.FC<RequiredProps & OptionalProps> = ({
  className,
  showMe,
  setShowMe,
}) => {
  const [whereAmI, setWhereAmI] = useState<string>();

  const containerRef = useRef(null);
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
              </a>
            </Link>
          </div>
        </div>
      )}

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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                viewBox="0 0 24 24"
                fill="#ed7878"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </Link>
          <Link href={NAVIGATION_ITEMS.CART} passHref>
            <a>
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
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};
export default Navigation;
