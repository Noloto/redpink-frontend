import { useState } from 'react';
import styles from './Dialog.module.css';

type RequiredProps = {
  text: string;
  wrongValueText: string;
  hideIt: () => void;
  callback: () => void;
};
export const Dialog: React.FC<RequiredProps> = ({
  callback,
  text,
  wrongValueText,
  hideIt,
}) => {
  const [wrongValue, setWrongValue] = useState<boolean>(false);

  return (
    <>
      <div className={styles.modalContainer} onClick={() => hideIt()}></div>
      <div className={styles.emailModal}>
        <p>{text}</p>
        <input
          id="email"
          type="email"
          placeholder="Email"
          className={wrongValue ? styles.wrongValue : ''}
          onChange={(e) => {
            const validtity = new RegExp(
              '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'
            );
            console.log(e.target.value);
            if (!validtity.test(e.target.value)) {
              setWrongValue(true);
              return;
            }
            setWrongValue(false);
          }}
        ></input>
        {wrongValue && <span>{wrongValueText}</span>}
        <button
          disabled={wrongValue ? true : false}
          onClick={async () => {
            callback();
            setWrongValue(false);
            hideIt();
          }}
        >
          Yes please
        </button>
      </div>
    </>
  );
};
