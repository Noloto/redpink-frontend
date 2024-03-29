import { Button } from '@react-email/button';
import { Heading } from '@react-email/heading';
import { Html } from '@react-email/html';
import { Img } from '@react-email/img';
import { Text } from '@react-email/text';
import { Section } from '@react-email/section';
import { Font } from '@react-email/font';

type RequiredProps = {
  emailTo: string;
};

const UpdateRedpink: React.FC<RequiredProps> = ({ emailTo }) => {
  return (
    <Html style={{ overflowX: 'hidden' }}>
      <Font
        fontFamily="Raleway"
        fallbackFontFamily="Verdana"
        webFont={{
          url: 'https://fonts.gstatic.com/s/raleway/v28/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvaorCIPrEVIT9d0c8.woff2',
          format: 'woff2',
        }}
        fontWeight={400}
        fontStyle="normal"
      />
      <Section
        style={{
          position: 'relative',
          zIndex: 1,
          color: 'black',
          // backgroundImage: `url(${background.src})`,
          // backgroundRepeat: 'no-repeat',
          // backgroundSize: 'cover',
          backgroundColor: '#FFF',
        }}
      >
        <Heading as="h1">Added to List</Heading>
        <Button pX={0} pY={0} href="https://redpink.pink">
          <Img
            src="https://cdn.shopify.com/s/files/1/0624/1078/5007/files/banner-new.png?v=1692089746"
            alt="Redpink banner"
            width="300"
            height="200"
            style={{ marginTop: '-80px', marginLeft: '-40px' }}
          />
        </Button>
        <Section style={{ marginLeft: '30px' }}>
          <Text style={{ marginTop: '-50px', width: '90%' }}>{emailTo}</Text>
          <Section
            style={{
              display: 'flex',
              textAlign: 'center',
            }}
          >
            <Text>WANTS TO GET NOTIFIED ABOUT UPDATES REGARDING THE PAGE</Text>
          </Section>
          <Text style={{ color: 'black' }}>LOVE GETS LOVE</Text>
        </Section>
      </Section>
    </Html>
  );
};

export default UpdateRedpink;
