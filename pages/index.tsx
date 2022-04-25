import Head from 'next/head';
import Image from 'next/image';

import type { NextPage } from 'next';
import { NAVIGATION_ITEMS } from '../common/enums/navigation';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>･*。 　 　･° 　　　°。 * 。 　　　　　　 ･°</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="favicon.ico" />
      </Head>

      <a href={NAVIGATION_ITEMS.SHOP}>
        <div className="flex w-screen h-screen max-h-screen">
          <Image
            src="/images/heroAnimation.gif"
            className="object-cover md:object-contain"
            width={1920}
            height={1080}
            alt="Click to get to the shop"
          />
        </div>
      </a>
    </>
  );
};

export default Home;
