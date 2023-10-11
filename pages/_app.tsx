import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout/Layout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Analytics } from '@vercel/analytics/react';
import { Eina } from '../common/utils/fonts/fonts';
import MusicPlayer from '../components/MusicPlayer/MusicPlayer';
import { useEffect, useState } from 'react';
import { Dialog } from '../components/Dialog/Dialog';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const layoutNotNeeded = ![`/`].includes(router.pathname);
  const [earlyAccess, setEarlyAccess] = useState<boolean>(false);
  const [early, setEarly] = useState<boolean>(false);
  const [showEmailModal, setShowEmailModal] = useState<boolean>(false);

  useEffect(() => {
    if (
      localStorage.getItem('early-access') === process.env.EARLY_ACCESS_PASSWORD
    ) {
      setEarlyAccess(true);
    } else {
      setEarlyAccess(false);
    }
  }, [early]);

  const sendListEmail = (sendTo: string) => {
    fetch('/api/email-update', {
      method: 'POST',
      body: JSON.stringify({
        sendTo: sendTo,
      }),
    });
  };

  const onSendEmail = async () => {
    const inputValue = (document.getElementById('email') as HTMLInputElement)
      .value;

    await sendListEmail(inputValue);
  };

  if (process.env.EARLY_ACCESS === 'true') {
    return (
      <>
        <Head>
          <title>REDPINK</title>
          <meta name="description" content="REDPINK" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/images/banner.webp" />
        </Head>
        <main>
          <Analytics />
          {earlyAccess === true ? (
            <>
              <Head>
                <title>REDPINK</title>
                <meta name="description" content="REDPINK" />
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/images/banner.webp" />
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
          ) : (
            <>
              <MusicPlayer />
              <div className={`loginContainer ${Eina.className}`}>
                <p>USE EARLY ACCESS PASSWORD TO SHOP</p>
                <input type="password" id="earlyAccess"></input>
                <button
                  onClick={() => {
                    if (
                      (
                        document.getElementById(
                          'earlyAccess'
                        ) as HTMLInputElement
                      )?.value === process.env.EARLY_ACCESS_PASSWORD
                    ) {
                      localStorage.setItem(
                        'early-access',
                        process.env.EARLY_ACCESS_PASSWORD
                      );
                      localStorage.setItem('chrom-web-vitals-redpink', 'true');
                      setEarlyAccess(true);
                      setEarly((prev) => !prev);
                    } else {
                      return <p>wrong password</p>;
                    }
                  }}
                >
                  Access
                </button>
                <video autoPlay loop muted playsInline className="video">
                  <source src="/videos/main-mobile-new.mp4" type="video/mp4" />
                </video>
              </div>
            </>
          )}
        </main>
      </>
    );
  }

  if (process.env.MAINTENANCE === 'true') {
    return (
      <>
        <Head>
          <title>REDPINK</title>
          <meta name="description" content="REDPINK" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/images/banner.webp" />
        </Head>
        <main>
          <Analytics />
          <MusicPlayer />
          <div className={`maintenanceContainer ${Eina.className}`}>
            <h2
              onClick={() => setShowEmailModal(true)}
              style={{ cursor: 'pointer' }}
            >
              GET UPDATED
            </h2>
            <video autoPlay loop muted playsInline className="video">
              <source src="/videos/main-mobile-new.mp4" type="video/mp4" />
            </video>
          </div>
          {showEmailModal && (
            <Dialog
              text="thank you for the interest , love gets love ! add mail to get
      exclusivity on swag + more"
              wrongValueText="Please enter a valid Email Adress"
              hideIt={() => setShowEmailModal(false)}
              callback={() => onSendEmail()}
            />
          )}
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
        <link rel="icon" href="/images/banner.webp" />
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
