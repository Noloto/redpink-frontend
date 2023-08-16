import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout/Layout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Analytics } from '@vercel/analytics/react';
import { Eina } from '../common/utils/fonts/fonts';
import { IoVolumeHighSharp } from 'react-icons/io5';
import { IoMdVolumeOff } from 'react-icons/io';
import { useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const layoutNotNeeded = ![`/`].includes(router.pathname);
  const [play, setPlay] = useState<boolean>(false);
  const [audio, setAudio] = useState<HTMLAudioElement>();

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
          <div className="playMusic">
            <audio id="audio" src="/sounds/main.mp4"></audio>
            {play ? (
              <IoVolumeHighSharp
                size={32}
                onClick={() => {
                  setPlay((prev) => !prev);
                  audio?.pause();
                }}
                style={{ color: 'red' }}
              />
            ) : (
              <IoMdVolumeOff
                size={32}
                onClick={() => {
                  setPlay((prev) => !prev);
                  audio?.play();
                }}
                style={{ color: 'red' }}
              />
            )}
          </div>
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
