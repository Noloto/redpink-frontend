import cx from 'classnames';
import Image from 'next/image';

type RequiredProps = {
  name: string;
  images: Image[];
};

type OptionalProps = {
  className?: string;
};

const Product: React.FC<RequiredProps & OptionalProps> = ({
  name,
  images,
  className,
}) => {
  return (
    <>
      <div
        className={cx(className, 'flex items-center flex-col text-sm mb-16')}
      >
        <Image
          src={images[0].node.url}
          alt={images[0].node.altText}
          width={1920}
          height={1080}
          className="object-contain"
        />
        <span>{name}</span>
      </div>
    </>
  );
};
export default Product;
