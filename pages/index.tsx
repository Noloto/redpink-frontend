import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { NextPage } from 'next';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

const Home: NextPage = ({}) => {
  return (
    <main className={`${styles.main} ${inter.className}`}>
      <Link href={'/shop'}>
        <video autoPlay loop muted playsInline className={styles.video}>
          <source src="/videos/main_mobile.mp4" type="video/mp4" />
        </video>
      </Link>
    </main>
  );
};
export default Home;
