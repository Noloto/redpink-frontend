import Link from 'next/link';
import cx from 'classnames';
import Image from 'next/image';

import { NAVIGATION_ITEMS, NAVIGATION_TITLES } from '../../enums/navigation';
import { SOCIAL_MEDIA_LINK } from '../../enums/social-media';

type OptionalProps = {
  className?: string;
};

const Navigation: React.FC<OptionalProps> = ({ className }) => {
  return (
    <>
      <div
        className={cx(
          'flex h-[10vh] justify-between items-center p-5',
          className
        )}
      >
        <div>
          <Link href={NAVIGATION_ITEMS.HOME} passHref>
            <a className="m-20">{NAVIGATION_TITLES.HOME}</a>
          </Link>
          <Link href={NAVIGATION_ITEMS.SHOP} passHref>
            <a className="m-20">{NAVIGATION_TITLES.SHOP}</a>
          </Link>
          <Link href={NAVIGATION_ITEMS.CONTACT} passHref>
            <a className="m-20">{NAVIGATION_TITLES.CONTACT}</a>
          </Link>
        </div>
        <div>
          <Link href={NAVIGATION_ITEMS.HOME}>
            <a>･*。 　 　･° 　　　°。 * 。 　　　　　　 ･°</a>
          </Link>
        </div>
        <div className="flex items-center">
          <Link href={SOCIAL_MEDIA_LINK.INSTAGRAM} passHref>
            <Image
              src="/images/instagram.svg"
              alt="instagram"
              className="m-20 cursor-pointer"
              width={30}
              height={30}
            />
          </Link>
          <Link href={NAVIGATION_ITEMS.CONTACT} passHref>
            <a className="m-20">{NAVIGATION_TITLES.CART}</a>
          </Link>
        </div>
      </div>
    </>
  );
};
export default Navigation;
