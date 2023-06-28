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
        <Link href={'/shop'}>
          <Image
            src="/images/redpink-banner.png"
            alt="redpink banner - 2 stripes"
            width={155}
            height={50}
            className={styles.banner}
          />
        </Link>
        <div className={styles.cart}>
          <Link href={'/cart'}>
            <Image
              src="/images/cart.png"
              alt="redpink cart"
              fill={true}
              style={{ objectFit: 'contain' }}
            />
          </Link>
        </div>
      </div>
      <main>{children}</main>
    </>
  );
};

export default Layout;
