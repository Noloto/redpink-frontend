import Image from 'next/image';
import styles from './Layout.module.css';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { randomBackground } from '../../common/utils/background';
import { tallys } from '../../common/data/tallys';

type RequiredProps = {
  children: ReactNode;
};

const Layout: React.FC<RequiredProps> = ({ children }) => {
  const [background, setBackground] = useState<string>();
  const [length, setLength] = useState<number>();
  const amount = useMemo(() => length, [length]);

  useEffect(() => {
    setBackground(randomBackground());
    setLength(JSON.parse(window.localStorage.getItem('CART')!).products.length);
  }, []);

  useEffect(() => {
    window.addEventListener('storage', () => {
      setLength(
        JSON.parse(window.localStorage.getItem('CART')!).products.length
      );
    });
  }, [length]);

  return (
    <>
      <div className={styles.container}>
        <a href={'/shop'}>
          <Image
            src="/images/banner-new.png"
            alt="redpink banner - 2 stripes"
            width={180}
            height={150}
            sizes="(max-width: 768px) 100vw"
            className={styles.banner}
          />
        </a>
        <div className={styles.cart}>
          <a href={'/cart'} className={styles.cartLink}>
            {amount !== undefined && amount > 0 && (
              <div className={styles.amountIndicator}>{tallys[amount - 1]}</div>
            )}
            <Image
              src="/images/disco-ball.gif"
              alt="redpink cart"
              fill={true}
              priority={true}
              sizes="(max-width: 768px) 100vw"
              style={{ objectFit: 'contain' }}
            />
          </a>
        </div>
      </div>
      <main
        className={styles.mainContainer}
        style={{
          backgroundImage: background,
        }}
      >
        {children}
      </main>
    </>
  );
};

export default Layout;
