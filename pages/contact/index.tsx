import styles from '../../styles/Contact.module.css';
import type { NextPage } from 'next';
import Navigation from '../../components/Navigation/Navigation';
import Image from 'next/image';
const Home: NextPage = () => {
  return (
    <>
      <Navigation></Navigation>
      <div className={styles.container}>
        <div className={styles.leftWrapper}>
          <p>Contact us</p>
          <p>if you have questions about a product, order or shipment.</p>
          <p>Based in Switzerland</p>
          <p>info@redpink.pink</p>
          <Image
            src="/images/instagram.svg"
            alt="instagram"
            width={30}
            height={30}
          />
        </div>
        <div className={styles.rightWrapper}>
          <p>hallo</p>
        </div>
      </div>
    </>
  );
};

export default Home;
