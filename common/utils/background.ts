const randomBackground = () => {
  const backgrounds = [
    'url(/images/backgrounds/bg1.jpeg)',
    'url(/images/backgrounds/bg2.jpeg)',
    'url(/images/backgrounds/bg3.jpeg)',
    'url(/images/backgrounds/bg4.jpeg)',
    'url(/images/backgrounds/bg5.jpeg)',
    'url(/images/backgrounds/bg6.jpeg)',
    'url(/images/backgrounds/bg7.jpeg)',
    'url(/images/backgrounds/bg8.jpeg)',
    'url(/images/backgrounds/bg9.jpeg)',
  ];

  return backgrounds[Math.floor(Math.random() * (8 - 0 + 0) + 0)];
};

export { randomBackground };
