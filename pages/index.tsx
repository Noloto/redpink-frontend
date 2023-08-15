import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { IoVolumeHighSharp } from 'react-icons/io5';
import { IoMdVolumeOff } from 'react-icons/io';

const inter = Inter({ subsets: ['latin'] });

const Home: NextPage = ({}) => {
  const router = useRouter();
  const [play, setPlay] = useState<boolean>(false);
  const [audio, setAudio] = useState<HTMLAudioElement>();
  useEffect(() => {
    const audio = new Audio('/sounds/main.mp4');
    setAudio(audio);
  }, []);

  return (
    <main>
      <div className={styles.playMusic}>
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
      <Link href={'/shop'} className={styles.videoLink}>
        <video autoPlay loop muted playsInline className={styles.video}>
          <source src="/videos/main-mobile-new.mp4" type="video/mp4" />
        </video>
      </Link>
    </main>
  );
};
export default Home;
