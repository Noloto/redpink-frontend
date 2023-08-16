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
          src={product.images.edges[0].node.url}
          alt={product.images.edges[0].node.altText ?? ''}
          style={{ objectFit: 'contain', cursor: 'pointer' }}
          sizes="100vw"
          fill={true}
          priority={true}
          onClick={() => router.push(`/shop/${product.handle}`)}
        />
      </div>
    </div>
  );
};

export default Product;
