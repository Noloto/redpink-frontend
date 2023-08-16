import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import MusicPlayer from '../components/MusicPlayer/MusicPlayer';

const inter = Inter({ subsets: ['latin'] });

const Home: NextPage = ({}) => {
  const router = useRouter();

  return (
    <main>
      <MusicPlayer />
      <Link href={'/shop'} className={styles.videoLink}>
        <video autoPlay loop muted playsInline className={styles.video}>
          <source src="/videos/main-mobile-new.mp4" type="video/mp4" />
        </video>
      </Link>
    </main>
  );
};
export default Home;
