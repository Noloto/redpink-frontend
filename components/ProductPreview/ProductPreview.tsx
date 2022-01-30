import styles from './ProductPreview.module.css';

type RequiredProps = {
  name: string;
};

const ProductPreview: React.FC<RequiredProps> = ({ name }) => {
  return (
    <>
      <p className={styles.color}>{name}</p>
    </>
  );
};
export default ProductPreview;
