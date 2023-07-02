import Image from 'next/image';
import styles from './Layout.module.css';
import { ReactNode } from 'react';
import Link from 'next/link';

type RequiredProps = {
  children: ReactNode;
};

const Layout: React.FC<RequiredProps> = ({ children }) => {
  return (
    <>
      <div className={styles.container}>
        <a href={'/shop'}>
          <Image
            src="/images/redpink-banner.png"
            alt="redpink banner - 2 stripes"
            width={155}
            height={50}
            priority={true}
            sizes="(max-width: 768px) 100vw"
            className={styles.banner}
          />
        </a>
        <div className={styles.cart}>
          <a href={'/cart'} className={styles.cartLink}>
            <Image
              src="/images/cart-2.png"
              alt="redpink cart"
              fill={true}
              sizes="(max-width: 768px) 100vw"
              style={{ objectFit: 'contain' }}
            />
          </a>
        </div>
      </div>
      <main>{children}</main>
    </>
  );
};

export default Layout;
