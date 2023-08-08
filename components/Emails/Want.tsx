import { Button } from '@react-email/button';
import { Heading } from '@react-email/heading';
import { Html } from '@react-email/html';
import { Img } from '@react-email/img';
import { Text } from '@react-email/text';
import { Section } from '@react-email/section';
import { Font } from '@react-email/font';

import banner from '../../public/images/banner.webp';
import background from '../../public/images/backgrounds/bg1.jpeg';
import Image from 'next/image';
import { Eina } from '../../common/utils/fonts/fonts';

type RequiredProps = {
  productName: string;
  productImage: string;
};

const Want: React.FC<RequiredProps> = ({ productName, productImage }) => {
  return (
    <Html>
      <Font
        fontFamily="Noto Serif Vithkuqi"
        fallbackFontFamily="Arial"
        webFont={{
          url: 'https://fonts.googleapis.com/css2?family=Noto+Serif+Vithkuqi&display=swap',
          format: 'woff2',
        }}
        fontWeight={400}
        fontStyle="normal"
      />
      <Image
        src={background}
        alt="Background Image"
        fill={true}
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
          zIndex: 0,
        }}
      />
      <Section style={{ position: 'relative', zIndex: 1 }}>
        <Heading as="h1">Added to List</Heading>
        <Button pX={0} pY={0} href="https://redpink.pink">
          <Image src={banner} alt="Redpink banner" width="300" height="200" />
        </Button>
        <Text>
          Hey you. thank you for the interest in a piece that’s not out yet.
          Love gets love ! you will get priority on this piece , early
          access/privat code to bye… stay updated ! Peace
        </Text>
        <Img src={productImage} alt="Product Image" width="300" height="300" />
        <Text>YOUR ADDED TO LIST</Text>
        <Text>{productName}</Text>
        <Text>=</Text>
        <Text>EARLY ACCESSs</Text>
        <Text>+</Text>
        <Image src={banner} alt="Whatever" width="300" height="300" />
        <Text style={{ color: 'black' }}>LOVE GETS LOVE</Text>
      </Section>
    </Html>
  );
};

export default Want;
