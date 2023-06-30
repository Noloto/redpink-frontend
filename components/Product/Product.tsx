import { useRouter } from 'next/router';
import styles from './Product.module.css';
import Image from 'next/image';

type RequiredProps = {
  product: Product;
};

type OptionalProps = {
  className?: string;
};

const Product: React.FC<RequiredProps & OptionalProps> = ({
  product,
  className,
}) => {
  const router = useRouter();

  return (
    <div className={`${styles.product} ${className}`}>
      <div className={styles.imageContainer}>
        <Image
          src={product.images[0].node.url}
          alt={product.images[0].node.altText ?? ''}
          fill={true}
          style={{ objectFit: 'contain', cursor: 'pointer' }}
          sizes="(max-width: 768px) 100vw"
          priority={true}
          onClick={() => router.push(`/shop/${product.handle}`)}
        />
      </div>
    </div>
  );
};

export default Product;
