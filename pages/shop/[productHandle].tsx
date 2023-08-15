import styles from '../../styles/Shop.module.css';
import ShopifyClient from '../../shopify-client';
import { productsQuery } from '../../common/queries/products/products.query';
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from 'next';
import Image from 'next/image';
import { getProductByHandle } from '../../common/queries/products/product.query';
import { useLocalStorage } from '../../common/utils/useLocalStorage';
import { useEffect, useState } from 'react';
import { getCartById } from '../../common/queries/cart/getCartById.query';
import { createCart } from '../../common/queries/cart/createCart.mutation';
import { nanoid } from 'nanoid';
import { addItemToCart } from '../../common/queries/cart/addItemToCart.mutation';
import { Eina } from '../../common/utils/fonts/fonts';
import { Heart } from '../../components/Heart/Heart';

type RequiredProps = {
  product: any;
};

const Product: NextPage<RequiredProps> = ({ product }) => {
  const [cart, updateCart] = useLocalStorage<Cart>('CART', {
    id: 'NOT INIZIALIZED',
    checkoutUrl: 'NOT INIZIALIZED',
    products: [],
  });
  const [p, setProduct] = useState<Product>();
  const [quantity, setQuantity] = useState(1);
  const [showEmailModal, setShowEmailModal] = useState<boolean>(true);

  useEffect(() => {
    let localCartData = JSON.parse(
      window.localStorage.getItem('CART') as string
    );

    if (localCartData && localCartData.id !== 'NOT INIZIALIZED') {
      const cartId = cart.id;
      ShopifyClient.query({
        query: getCartById,
        variables: { cartId },
      });

      updateCart({
        id: localCartData?.id,
        checkoutUrl: localCartData?.checkoutUrl,
        products: cart?.products,
      });
      return;
    }

    const getCart = async () => {
      const { data } = await ShopifyClient.mutate({
        mutation: createCart,
      });

      updateCart({
        id: data.cartCreate.cart.id,
        checkoutUrl: data.cartCreate.cart.checkoutUrl,
        products: cart.products,
      });
    };

    getCart();
  }, []);

  useEffect(() => {
    if (product.images.edges.length > 1) {
      product.images.edges.shift();
    }

    if (product !== null) {
      setProduct({
        id: product.id,
        handle: product.handle,
        title: product.title,
        description: product.description,
        price: product.priceRange?.minVariantPrice?.amount,
        images: product.images,
        variants: product.variants?.edges,
        tags: product.tags,
      });
    }
  }, [product]);

  const addToCart = async () => {
    const cartId = cart.id;
    const variantId = p?.variants[0].node.id;
    let lineId = '';

    const returnAmount = (): number => {
      const amount = cart.products.find((p) => {
        if (product.title === p?.title) {
          return true;
        }
      })?.amount;

      let q: number = 0;

      if (amount === null || amount === undefined) {
        q = 0;
      } else {
        q = amount;
      }

      const a = q + quantity;
      return a;
    };

    await ShopifyClient.mutate({
      mutation: addItemToCart,
      variables: { cartId, variantId, quantity },
    }).then((res: any) => {
      const index = res?.data?.cartLinesAdd.cart.lines.edges.length - 1;
      lineId = res?.data?.cartLinesAdd.cart.lines.edges[index].node.id;
    });

    if (product && p !== undefined) {
      const CartItem: CartItem = {
        id: p.id,
        handle: p.handle,
        lineId: lineId,
        uuid: nanoid(),
        description: p.description,
        title: p.title,
        price: p.price,
        images: p.images,
        variants: p.variants,
        onlyOne: false,
        amount: returnAmount(),
        tags: p.tags,
      };

      let newCart: Cart = cart;

      const isCartItem = cart.products.findIndex(
        (e: CartItem) => e.title === p?.title
      );

      if (isCartItem == -1) {
        let newProducts = cart.products;
        newProducts.push(CartItem);
        await updateCart({ ...cart, products: newProducts });
      } else {
        newCart.products[isCartItem].amount =
          quantity + newCart.products[isCartItem].amount!;
        await updateCart(newCart);
      }
    }
  };

  const playAudio = () => {
    const audio = document.getElementById('thankYou') as HTMLAudioElement;
    audio?.play();
  };

  const sendListEmail = (
    productName: string,
    productImage: string,
    sendTo: string
  ) => {
    console.log(sendTo);
    fetch('/api/email', {
      method: 'POST',
      body: JSON.stringify({
        productName: productName,
        productImage: productImage,
        sendTo: sendTo,
      }),
    });
  };

  const onSendEmail = () => {
    setShowEmailModal(true);
  };

  return (
    <main className={styles.container}>
      <div className={styles.product}>
        <Image
          src={product.images.edges[0].node.url}
          alt={product.images.edges[0].node.altText ?? ''}
          style={{ objectFit: 'contain' }}
          sizes="100vw"
          fill={true}
          priority={true}
        />
      </div>
      <div className={styles.productDetails}>
        <p className={Eina.className}>
          {product.title} {product.priceRange.minVariantPrice.amount} $
        </p>
        <p>{product.description}</p>
      </div>

      <Heart
        product={product}
        addToCart={() => addToCart()}
        playAudio={() => playAudio()}
        onSendEmail={() => onSendEmail()}
      />
      {showEmailModal && (
        <div className={styles.modalContainer}>
          <div className={styles.emailModal}>
            <p>
              Be the first person to be notified for the release and get that
              extra redpink drip
            </p>
            <input id="email" type="email"></input>

            <button
              onClick={async () => {
                await sendListEmail(
                  product.title,
                  product.images.edges[0].node.url,
                  (document.getElementById('email') as HTMLInputElement).value
                );
                setShowEmailModal(false);
              }}
            >
              submit
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await ShopifyClient.query({
    query: productsQuery,
  });

  const paths = Object.values(data.products.edges).map((product: any) => {
    return {
      params: {
        productHandle: product.node.handle,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const productHandle = context?.params?.productHandle;

  const { data } = await ShopifyClient.query({
    query: getProductByHandle,
    variables: { productHandle },
  });

  return {
    props: {
      product: JSON.parse(JSON.stringify({ data })).data.productByHandle,
    },
    revalidate: 60,
  };
};

export default Product;
