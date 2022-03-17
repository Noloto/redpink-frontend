import Link from 'next/link';
import cx from 'classnames';
import Image from 'next/image';

import { NAVIGATION_ITEMS, NAVIGATION_TITLES } from '../../enums/navigation';
import { SOCIAL_MEDIA_LINK } from '../../enums/social-media';
import { useState } from 'react';

type OptionalProps = {
  className?: string;
};

const Navigation: React.FC<OptionalProps> = ({ className }) => {
  const [showMe, setShowMe] = useState(false);
  function toggle() {
    setShowMe(!showMe);
  }

  return (
    <>
      {showMe ? (
        <>
          <p
            className="absolute bg-redpink text-[black] cursor-pointer p-5 text-5xl "
            onClick={toggle}
          >
            x
          </p>
          <div
            className={`w-screen h-screen bg-redpink ${
              showMe ? 'flex' : 'hidden'
            } flex justify-center items-center flex-col gap-10 text-5xl`}
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
        </>
      ) : (
        <div className="flex visible lg:hidden cursor-pointer p-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 stroke-redpink"
            fill="none"
            viewBox="0 0 24 24"
            onClick={toggle}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <div className="flex justify-self-center w-3/6 self-center m-[0_auto]">
            <Link href={NAVIGATION_ITEMS.HOME} passHref>
              <a className="flex text-2xl">
                ･*。 　 　･° 　　　°。 * 。 　　　　　　 ･°
              </a>
            </Link>
          </div>
          <div className="flex w-2/6 justify-evenly z-10">
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
      )}

      <div
        className={cx(
          'hidden lg:flex grid-flow-col grid-cols-3 h-[10vh] items-center justify-between p-5  w-full',
          className
        )}
      >
        <div className="flex w-2/6 justify-evenly text-xl">
          <Link href={NAVIGATION_ITEMS.HOME} passHref>
            <a>{NAVIGATION_TITLES.HOME}</a>
          </Link>
          <Link href={NAVIGATION_ITEMS.SHOP} passHref>
            <a>{NAVIGATION_TITLES.SHOP}</a>
          </Link>
          <Link href={NAVIGATION_ITEMS.CONTACT} passHref>
            <a>{NAVIGATION_TITLES.CONTACT}</a>
          </Link>
        </div>
        <div className="flex w-2/6 justify-center items-center m-[0_auto]">
          <Link href={NAVIGATION_ITEMS.HOME}>
            <a className="text-2xl">･*。　 　･°　　　°。* 。　　　　　　･°</a>
          </Link>
        </div>
        <div className="flex w-2/6 justify-evenly">
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
