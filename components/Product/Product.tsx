import Image from 'next/image';

type RequiredProps = {
  price: string;
  imageSrc: string;
};

type OptionalProps = {
  name?: string;
  id?: number;
  href?: string;
  imageAlt?: string;
  className?: string;
};

const Product: React.FC<RequiredProps & OptionalProps> = ({
  id,
  name,
  href,
  price,
  imageSrc,
  imageAlt,
}) => {
  return (
    <>
      <div className="flex place-items-center flex-col">
        <Image src={imageSrc} alt={imageAlt} width={450} height={375} />
        <p>{name}</p>
      </div>
    </>
  );
};
export default Product;
