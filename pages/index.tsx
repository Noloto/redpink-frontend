import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import MusicPlayer from '../components/MusicPlayer/MusicPlayer';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

const Home: NextPage = ({}) => {
  const router = useRouter();

  useEffect(() => {
    router.push('/shop');
  });

  return <main></main>;
};
export default Home;
