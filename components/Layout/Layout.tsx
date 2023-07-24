import Image from 'next/image';
import styles from './Layout.module.css';
import { ReactNode, useEffect, useState } from 'react';
import { randomBackground } from '../../common/utils/background';

type RequiredProps = {
  children: ReactNode;
};

const Layout: React.FC<RequiredProps> = ({ children }) => {
  const [background, setBackground] = useState<string>();
  useEffect(() => {
    setBackground(randomBackground());
  }, []);

  return (
    <>
      <div className={styles.container}>
        <a href={'/shop'}>
          <Image
            src="/images/banner-new.png"
            alt="redpink banner - 2 stripes"
            width={180}
            height={150}
            priority={true}
            sizes="(max-width: 768px) 100vw"
            className={styles.banner}
          />
        </a>
        <div className={styles.cart}>
          <a href={'/cart'} className={styles.cartLink}>
            {/*<p className={styles.amountIndicator}>|||</p>*/}
            <Image
              src="/images/disco-ball.gif"
              alt="redpink cart"
              fill={true}
              sizes="(max-width: 768px) 100vw"
              style={{ objectFit: 'contain' }}
            />
          </a>
        </div>
      </div>
      <main
        className={styles.mainContainer}
        style={{
          backgroundImage: randomBackground(),
        }}
      >
        {children}
      </main>
    </>
  );
};

export default Layout;
