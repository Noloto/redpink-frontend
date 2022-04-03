import ShopifyClient from '../../shopify-client';
import { productsQuery } from '../../common/queries/products/products.query';
import { GetStaticPaths, NextPage } from 'next';
import { useEffect, useState } from 'react';
import Navigation from '../../components/Navigation/Navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useLocalStorage } from '../../common/utils/useLocalStorage';
import { nanoid } from 'nanoid';
import { hoodieSizes } from '../../common/enums/constants';

type RequiredProps = {
  productData: any;
};

const ProductDetail: NextPage<RequiredProps> = ({ productData }) => {
  const [imageSrc, setImageSrc] = useState('/');
  const [price, setPrice] = useState('');
  const [name, setName] = useState('');
  const [pathName, setPathName] = useState('');
  const [quantity, setQuantity] = useState(1);

  const [cart, setCartItem] = useLocalStorage<Array<CartItem>>('CART', []);

  const addToCart = () => {
    const CartItem: CartItem = {
      uuid: nanoid(),
      productName: name,
      price: price,
      amount: quantity,
      imageSrc: imageSrc,
      onlyOne: false,
    };

    const isCartItem = cart.findIndex((e: any) => e.productName === name);
    // TODO: Check for variant
    if (isCartItem == -1) {
      setCartItem((prevState) => [...prevState, CartItem]);
    } else {
      let newCart = [...cart];
      newCart[isCartItem].amount = quantity + newCart[isCartItem].amount;
      setCartItem(newCart);
    }
  };

  useEffect(() => {
    productData.map((p: any) => {
      if (p != null) {
        const product: any = Object.values(p)[1];
        setImageSrc(product.images.edges[0].node.url);
        setPrice(product.priceRange.minVariantPrice.amount);
        setName(product.title);
      }
    });
  }, [imageSrc, price, name, productData]);

  useEffect(() => {
    setPathName(window.location.pathname);
  }, []);

  if (pathName === '/shop/Two%20Face%20Reversible') {
    return (
      <>
        <div className="bg-[url('/images/howlround.gif')] bg-no-repeat bg-center bg-fixed bg-cover min-h-screen min-w-screen text-center justify-center">
          <Navigation></Navigation>
          <div className="grid items-center justify-center mt-32">
            <p className="text-3xl">CHOOSE YOUR SIZE</p>
            <div className="grid sm:grid-cols-1 md:grid-cols-3 mt-16">
              {hoodieSizes.map((size) => {
                return (
                  <div
                    key={size}
                    className="border-2 border-redpink rounded-sm text-center py-3 text-xl mt-8 md:mr-8 md:px-16"
                  >
                    <Link href={`/shop/two-face-inside-out-variants/${size}`}>
                      <a className="">{size}</a>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="bg-[url('/images/howlround.gif')] bg-no-repeat bg-center bg-fixed bg-cover min-h-screen">
        <Navigation></Navigation>
        <div className="grid md:grid-cols-2 sm:grid-cols-1 w-full h-[calc(100vh-30vh)] items-center justify-center">
          <div className="flex items-center justify-center">
            <Image
              src={imageSrc}
              alt="product"
              width={500}
              height={450}
              className="object-cover"
            />
          </div>
          <div className="flex items-start justify-center flex-col gap-10 h-full w-full">
            <p className="text-xl">{name}</p>
            <p className=" text-lg">{price}</p>
            <button
              className="border-[#ed7878] border-[2px] border-solid px-10 py-5 bg-transparent text-redpink"
              onClick={addToCart}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps = async (context: any) => {
  const productId = context.params.productId;

  const { data } = await ShopifyClient.query({
    query: productsQuery,
  });

  const productData = Object.values(data.products.edges).map((product: any) => {
    if (product.node.title === productId) {
      return product;
    }
  });

  return {
    props: JSON.parse(JSON.stringify({ productData })),
  };
};
export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await ShopifyClient.query({
    query: productsQuery,
  });

  const paths = Object.values(data.products.edges).map((product: any) => {
    return {
      params: { productId: product.node.title },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export default ProductDetail;
