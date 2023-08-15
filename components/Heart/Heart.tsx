import { useState, useEffect } from 'react';
import styles from './Heart.module.css';
import Image from 'next/image';

type RequiredProps = {
  product: Product;
  addToCart: () => void;
  playAudio: () => void;
};
export const Heart: React.FC<RequiredProps> = ({
  product,
  addToCart,
  playAudio,
}) => {
  const [beat, setBeat] = useState<boolean>(false);
  const [data, setData] = useState<any>();

  const sendListEmail = (productName: string, productImage: string) => {
    fetch('/api/email', {
      method: 'POST',
      body: JSON.stringify({
        productName: productName,
        productImage: productImage,
      }),
    });
  };

  return (
    <div className={`${styles.button} ${beat && styles.heart}`}>
      {product.tags.find((tag: string) => tag === 'buy') ? (
        <>
          <Image
            src={'/images/bye.png'}
            alt="Add to cart"
            style={{ objectFit: 'contain' }}
            fill={true}
            sizes="30vw"
            onClick={() => {
              addToCart();
              playAudio();
              setBeat((prev) => !prev);
              setTimeout(() => {
                setBeat((prev) => !prev);
              }, 3500);
            }}
          />
          <audio id="thankYou">
            <source src="/sounds/thank-you.m4a" typeof="audio/x-m4a" />
          </audio>
        </>
      ) : (
        <Image
          src={'/images/want.png'}
          alt="Sign up for product notifications"
          style={{ objectFit: 'contain' }}
          fill={true}
          sizes="30vw"
          onClick={() => {
            sendListEmail(product.title, product.images.edges[0].node.url);
          }}
        />
      )}
    </div>
  );
};
