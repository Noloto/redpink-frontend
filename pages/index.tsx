import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { NextPage } from 'next';
import Link from 'next/link';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

const Home: NextPage = ({}) => {
  return (
    <main className={`${styles.main} ${inter.className}`}>
      <audio id="intro" autoPlay>
        <source src="/sounds/main.mp4" typeof="audio/mp4" />
      </audio>
      <Link href={'/shop'}>
        <video autoPlay loop muted playsInline className={styles.video}>
          <source src="/videos/main-mobile-new.mp4" type="video/mp4" />
        </video>
      </Link>
    </main>
  );
};
export default Home;
