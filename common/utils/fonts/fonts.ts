import localFont from 'next/font/local';

const Eina = localFont({
  src: [
    {
      path: './Eina01-Light.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: './Eina01-SemiBold.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './Eina01-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
});

export { Eina };
