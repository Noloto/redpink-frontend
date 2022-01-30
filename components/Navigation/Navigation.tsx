import Link from 'next/link';
import styles from './Navigation.module.css';
import cx from 'classnames';

import { NAVIGATION_ITEMS, NAVIGATION_TITLES } from '../../enums/navigation';
import {
  SOCIAL_MEDIA_LINK,
  SOCIAL_MEDIA_TITLE,
} from '../../enums/social-media';

type OptionalProps = {
  className?: string;
};

const Navigation: React.FC<OptionalProps> = ({ className }) => {
  return (
    <>
      <div className={cx(styles.navigationWrapper, className)}>
        <div className={styles.navigationSection}>
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
        <div className={styles.titleWrapper}>
          <Link href={NAVIGATION_ITEMS.HOME}>
            <a>･*。 　 　･° 　　　°。 * 。 　　　　　　 ･°</a>
          </Link>
        </div>
        <div className={styles.cartSection}>
          <Link href={SOCIAL_MEDIA_LINK.INSTAGRAM} passHref>
            <a>{SOCIAL_MEDIA_TITLE.INSTAGRAM}</a>
          </Link>
          <Link href={NAVIGATION_ITEMS.CONTACT} passHref>
            <a>{NAVIGATION_TITLES.CART}</a>
          </Link>
        </div>
      </div>
    </>
  );
};
export default Navigation;
