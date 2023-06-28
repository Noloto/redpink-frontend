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
      <Image
        src={product.images[0].node.url}
        alt={product.images[0].node.altText ?? ''}
        fill={true}
        style={{ objectFit: 'contain', cursor: 'pointer' }}
        onClick={() => router.push(`/shop/${product.handle}`)}
      />
    </div>
  );
};

export default Product;
