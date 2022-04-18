import type { NextPage } from 'next';
import Navigation from '../../components/Navigation/Navigation';
import Image from 'next/image';
const Home: NextPage = () => {
  return (
    <>
      <div className="bg-[url('/images/howlround.gif')] bg-no-repeat bg-center bg-fixed bg-cover min-h-screen">
        <Navigation></Navigation>
        <div className="flex items-center justify-center flex-col gap-10 h-[calc(100vh-30vh)] text-l">
          <h2 className="font-extrabold text-2xl text-redpink">Contact us</h2>
          <p>If you have questions about a product, order or shipment.</p>
          <p>Based in Switzerland</p>
          <a href="mailto:beispiel@example.org?subject=eine%20Mail%20von%20deinen%20Web-Seiten">
            redpink-help@hotmail.com
          </a>
        </div>
      </div>
    </>
  );
};

export default Home;
