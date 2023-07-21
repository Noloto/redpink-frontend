import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout/Layout';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

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
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}
