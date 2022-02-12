import '../styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <audio src="/music/redpink-beat.mpeg" autoPlay loop />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
