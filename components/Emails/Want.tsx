import { Button } from '@react-email/button';
import { Heading } from '@react-email/heading';
import { Html } from '@react-email/html';
import { Img } from '@react-email/img';
import { Text } from '@react-email/text';

import banner from '/images/banner.webp';
import Image from 'next/image';

type RequiredProps = {
  productName: string;
  productImage: string;
};

const Want: React.FC<RequiredProps> = ({ productName, productImage }) => {
  return (
    <Html>
      <Heading as="h1">Added to List</Heading>
      <Button
        pX={20}
        pY={12}
        href="https://redpink.pink"
        style={{ background: '#000', color: '#fff' }}
      >
        <Image src={banner} alt="Redpink banner" width="300" height="300" />
      </Button>
      <Text style={{ color: 'white' }}>
        Hey you. thank you for the interest in a piece that’s not out yet. Love
        gets love ! you will get priority on this piece , early access/privat
        code to bye… stay updated ! Peace
      </Text>
      <Img src={productImage} alt="Product Image" width="300" height="300" />
      <Text style={{ color: 'white' }}>YOUR ADDED TO LIST</Text>
      <Text style={{ color: 'white' }}>{productName}</Text>
      <Text style={{ color: 'white' }}>=</Text>
      <Text style={{ color: 'white' }}>EARLY ACCESSs</Text>
      <Text style={{ color: 'white' }}>+</Text>
      <Image
        src="/images/banner.webp"
        alt="Whatever"
        width="300"
        height="300"
      />
      <Text style={{ color: 'white' }}>LOVE GETS LOVE</Text>
      <Image
        src="/images/background.webp"
        alt="Background Image"
        width="300"
        height="300"
      />
    </Html>
  );
};

export default Want;
