import Image from 'next/image';
import styles from './Layout.module.css';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { randomBackground } from '../../common/utils/background';
import { tallys } from '../../common/data/tallys';
import { Eina } from '../../common/utils/fonts/fonts';
import { useRouter } from 'next/router';

type RequiredProps = {
  children: ReactNode;
};

const Layout: React.FC<RequiredProps> = ({ children }) => {
  const [background, setBackground] = useState<string>();
  const [length, setLength] = useState<number>();
  const router = useRouter();
  const bannerHorizontal = ![`/cart`].includes(router.pathname);
  const amount = useMemo(() => length, [length]);

  useEffect(() => {
    setBackground(randomBackground());
    if (window.localStorage.getItem('CART') !== null) {
      setLength(
        JSON.parse(window.localStorage.getItem('CART')!).products.length
      );
    }
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
            src="/images/banner.webp"
            alt="Redpink Banner"
            width={220}
            height={170}
            className={
              bannerHorizontal ? styles.bannerVertical : styles.bannerHorizontal
            }
          />
        </a>
        <div className={styles.cart}>
          <div className={styles.cartContainer}>
            <a href={'/cart'} className={styles.cartLink}>
              {amount !== undefined && amount > 0 && (
                <div className={styles.amountIndicator}>
                  {tallys[amount - 1]}
                </div>
              )}
              <Image
                src="/images/disco-ball.gif"
                alt="Shopping Cart"
                style={{ objectFit: 'contain' }}
                priority={true}
                fill={true}
                sizes="20vw"
              />
            </a>
          </div>
        </div>
      </div>
      <main
        className={`${styles.mainContainer} ${Eina.className}`}
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
