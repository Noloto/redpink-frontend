import styles from './ProductPreview.module.css';
import Image from 'next/image';

type RequiredProps = {
  name: string;
  price: string;
  imageSrc: string;
};

type OptionalProps = {
  id?: number;
  href?: string;
  imageAlt?: string;
};

const ProductPreview: React.FC<RequiredProps & OptionalProps> = ({
  id,
  name,
  href,
  price,
  imageSrc,
  imageAlt,
}) => {
  return (
    <>
      <div className={styles.productWrapper}>
        <div className={styles.imageWrapper}>
          <Image src={imageSrc} alt={imageAlt} width={450} height={375} />
        </div>
        <p className={styles.productName}>{name}</p>
      </div>
    </>
  );
};
export default ProductPreview;
