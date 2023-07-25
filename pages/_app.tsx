import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout/Layout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Analytics } from '@vercel/analytics/react';
import { Eina } from '../common/utils/fonts/fonts';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  if (process.env.MAINTENANCE === 'true') {
    return (
      <>
        <Head>
          <title>REDPINK</title>
          <meta name="description" content="REDPINK" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/images/banner-new.png" />
        </Head>
        <main>
          <Analytics />
          <audio id="intro" autoPlay>
            <source src="/sounds/main.mp4" typeof="audio/mp4" />
          </audio>
          <div className={`maintenanceContainer ${Eina.className}`}>
            <h2>UNDER MAINTENANCE</h2>
            <video autoPlay loop muted playsInline className="video">
              <source src="/videos/main-mobile-new.mp4" type="video/mp4" />
            </video>
          </div>
        </main>
      </>
    );
  }
  const layoutNotNeeded = ![`/`].includes(router.pathname);
  return (
    <>
      <Head>
        <title>REDPINK</title>
        <meta name="description" content="REDPINK" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/banner-new.png" />
      </Head>
      {layoutNotNeeded ? (
        <Layout>
          <Analytics />
          <Component {...pageProps} />
        </Layout>
      ) : (
        <>
          <Analytics />
          <Component {...pageProps} />
        </>
      )}
    </>
  );
}
