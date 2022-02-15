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
      <div className="visible lg:hidden cursor-pointer" onClick={toggle}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 stroke-redpink"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </div>
      <div
        className={`w-screen h-screen bg-redpink text-redpink ${
          showMe?'block':'none'
        }`}
      >
        <p>Shop</p>
        <p>Contact</p>
      </div>

      <div
        className={cx(
          'hidden lg:flex grid-flow-col grid-cols-3 h-[10vh] items-center justify-between p-5  w-full',
          className
        )}
      >
        <div className="flex w-2/6 justify-evenly">
          <Link href={NAVIGATION_ITEMS.HOME} passHref>
            <a className="mx-10">{NAVIGATION_TITLES.HOME}</a>
          </Link>
          <Link href={NAVIGATION_ITEMS.SHOP} passHref>
            <a className="mx-10">{NAVIGATION_TITLES.SHOP}</a>
          </Link>
          <Link href={NAVIGATION_ITEMS.CONTACT} passHref>
            <a className="mx-10">{NAVIGATION_TITLES.CONTACT}</a>
          </Link>
        </div>
        <div className="flex w-2/6 justify-center items-center">
          <Link href={NAVIGATION_ITEMS.HOME}>
            <a>･*。 　 　･° 　　　°。 * 。 　　　　　　 ･°</a>
          </Link>
        </div>
        <div className="flex w-2/6 justify-evenly">
          <Link href={SOCIAL_MEDIA_LINK.INSTAGRAM} passHref>
            <Image
              src="/images/instagram.svg"
              alt="instagram"
              className="cursor-pointer"
              width={30}
              height={30}
            />
          </Link>
          <Link href={NAVIGATION_ITEMS.CONTACT} passHref>
            <Image
              src="/images/redpink-shopping-cart.png"
              alt="instagram"
              className="cursor-pointer"
              width={30}
              height={30}
            />
          </Link>
        </div>
      </div>
    </>
  );
};
export default Navigation;
