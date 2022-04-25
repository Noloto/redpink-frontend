import type { NextPage } from 'next';
import Navigation from '../../components/Navigation/Navigation';
import Image from 'next/image';
import { useCycle } from 'framer-motion';
const Home: NextPage = () => {
  const [showMe, setShowMe] = useCycle(false, true);

  return (
    <>
      <div className="bg-[url('/images/howlround.gif')] bg-no-repeat bg-center bg-fixed bg-cover min-h-screen">
        <Navigation showMe={showMe} setShowMe={() => setShowMe()}></Navigation>
        <div className="flex items-center justify-center flex-col gap-10 h-[calc(100vh-30vh)] text-l px-9 md:px-0">
          <h2 className="font-extrabold text-2xl text-redpink">Contact us</h2>
          <p className="text-center">
            If you have questions about a product, order or shipment.
          </p>
          <p>Based in Switzerland</p>
          <a href={`mailto:redpink-help@hotmail.com?subject=REDPINk`}>
            redpink-help@hotmail.com
          </a>
        </div>
      </div>
    </>
  );
};

export default Home;
