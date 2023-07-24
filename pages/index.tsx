import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { NextPage } from 'next';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

const Home: NextPage = ({}) => {
  const router = useRouter();
  return (
    <main>
      <audio id="intro" autoPlay>
        <source src="/sounds/main.mp4" typeof="audio/mp4" />
      </audio>
      <Link href={'/shop'} className={styles.videoLink}>
        <video autoPlay loop muted playsInline className={styles.video}>
          <source src="/videos/main-mobile-new.mp4" type="video/mp4" />
        </video>
      </Link>
    </main>
  );
};
export default Home;
