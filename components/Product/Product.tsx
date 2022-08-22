import cx from 'classnames';
import Image from 'next/image';

type RequiredProps = {
  id: string;
  name: string;
  price: string;
  images: Image[];
  variants: Variant[];
};

type OptionalProps = {
  className?: string;
};

const Product: React.FC<RequiredProps & OptionalProps> = ({
  id,
  name,
  images,
  price,
  variants,
  className,
}) => {
  return (
    <>
      <div
        className={cx(
          className,
          'flex place-items-center flex-col text-sm mb-16'
        )}
      >
        <Image
          src={images[0].node.url}
          alt={images[0].node.altText}
          width={1920}
          height={1080}
          className="cursor-pointer object-cover"
        />
        <span>{name}</span>
      </div>
    </>
  );
};
export default Product;
