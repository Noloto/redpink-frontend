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

const Product: React.FC<RequiredProps & OptionalProps> = ({ name, images }) => {
  return (
    <>
      <div className="flex place-items-center flex-col text-sm">
        <Image
          src={images[0].node.url}
          alt={images[0].node.altText}
          width={341}
          height={341}
          className="object-cover"
        />
        <p>{name}</p>
      </div>
    </>
  );
};
export default Product;
