import { IoVolumeHighSharp } from 'react-icons/io5';
import { IoMdVolumeOff } from 'react-icons/io';
import { useEffect, useState } from 'react';
import styles from './MusicPlayer.module.css';

const MusicPlayer: React.FC = ({}) => {
  const [play, setPlay] = useState<boolean>(false);
  const [audio, setAudio] = useState<HTMLAudioElement>();

  useEffect(() => {
    const audio = new Audio('/sounds/main.mp4');
    setAudio(audio);
  }, []);

  return (
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
  );
};

export default MusicPlayer;
