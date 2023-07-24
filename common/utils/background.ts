const randomBackground = () => {
  const backgrounds = [
    'url(/images/bg1.jpeg)',
    'url(/images/bg2.jpeg)',
    'url(/images/bg3.jpeg)',
    'url(/images/bg4.jpeg)',
    'url(/images/bg5.jpeg)',
  ];

  return backgrounds[Math.floor(Math.random() * (4 - 0 + 0) + 0)];
};

export { randomBackground };
