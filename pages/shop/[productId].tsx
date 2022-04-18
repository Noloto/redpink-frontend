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
import { getCartById } from '../../common/queries/cart/getCartById.query';
import { addItemToCart } from '../../common/queries/cart/addItemToCart.mutation';
import { useCycle } from 'framer-motion';

type RequiredProps = {
  productData: any;
};

const ProductDetail: NextPage<RequiredProps> = ({ productData }) => {
  const [pathName, setPathName] = useState('');
  const [showMe, setShowMe] = useCycle(false, true);

  const [cart, updateCart] = useLocalStorage<Cart>('CART', {
    id: 'NOT INIZIALIZED',
    checkoutUrl: 'NOT INIZIALIZED',
    products: [],
  });

  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    setPathName(window.location.pathname);
  }, []);

  useEffect(() => {
    productData.map((p: any) => {
      if (p !== null) {
        setProduct({
          id: p.node?.id,
          title: p.node?.title,
          price: p.node?.priceRange?.minVariantPrice?.amount,
          images: p.node?.images?.edges,
          variants: p.node?.variants?.edges,
        });
      }
    });
  }, []);

  const addToCart = () => {
    const cartId = cart.id;
    const variantId = product?.variants[0].node.id;

    ShopifyClient.mutate({
      mutation: addItemToCart,
      variables: { cartId, variantId },
    }).then((res) => {
      console.log(res);
    });

    if (product) {
      const CartItem: CartItem = {
        id: product.id,
        uuid: nanoid(),
        title: product.title,
        price: product.price,
        images: product.images,
        variants: product.variants,
        onlyOne: false,
        amount: 1,
      };

      let newCart: Cart = cart;

      const isCartItem = cart.products.findIndex(
        (e: CartItem) => e.title === product?.title
      );

      if (isCartItem == -1) {
        let newProducts = cart.products;
        newProducts.push(CartItem);
        updateCart({ ...cart, products: newProducts });
      } else {
        newCart.products[isCartItem].amount =
          1 + newCart.products[isCartItem].amount!;
        updateCart(newCart);
      }
    }
  };

  if (pathName === '/shop/Two%20Face%20Reversible') {
    return (
      <>
        <div className="bg-[url('/images/howlround.gif')] bg-no-repeat bg-center bg-fixed bg-cover min-h-screen min-w-screen text-center justify-center">
          <Navigation
            showMe={showMe}
            setShowMe={() => setShowMe()}
          ></Navigation>
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
        <Navigation showMe={showMe} setShowMe={() => setShowMe()}></Navigation>
        <div className="grid md:grid-cols-2 sm:grid-cols-1 w-full h-[calc(100vh-30vh)] items-center justify-center">
          <div className="flex items-center justify-center">
            <Image
              src={product?.images[0].node.url ?? '/images/capo.png'}
              alt="product"
              width={500}
              height={450}
              className="object-cover"
            />
          </div>
          <div className="flex items-start justify-center flex-col gap-10 h-full w-full">
            <p className="text-xl">{product?.title}</p>
            <p className=" text-lg">{product?.price}</p>
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
