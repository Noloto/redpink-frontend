import { Button } from '@react-email/button';
import { Html } from '@react-email/html';
import * as React from 'react';

type RequiredProps = {
  productName: string;
  productImage: string;
  senderEmail: string;
};

const Want: React.FC = ({}) => {
  return (
    <Html>
      <Button
        pX={20}
        pY={12}
        href="https://redpink.pink"
        style={{ background: '#000', color: '#fff' }}
      >
        hey you. thank you for the interest in a piece that’s not out yet. Love
        gets love ! you will get priority on this piece , early access/privat
        code to bye… stay updated ! Peace
      </Button>
    </Html>
  );
};

export default Want;
