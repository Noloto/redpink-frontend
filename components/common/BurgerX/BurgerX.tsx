import * as React from 'react';
import { motion } from 'framer-motion';

const Path = (props: any) => (
  <motion.path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    stroke="#ed7878"
    {...props}
  />
);

type RequiredProps = {
  toggle: () => void;
};

type OptionalProps = {
  className?: string;
};

export const BurgerX: React.FC<RequiredProps & OptionalProps> = ({
  toggle,
  className,
}) => (
  <div className={className}>
    <svg
      fill="none"
      viewBox="0 0 24 24"
      className="flex justify-center cursor-pointer w-8 h-8"
      onClick={toggle}
    >
      <Path
        stroke="#000"
        variants={{
          closed: { d: 'M 2 2.5 L 20 2.5' },
          open: { d: 'M 3 16.5 L 17 2.5' },
        }}
        transition={{ duration: 0.5 }}
      />
      <Path
        d="M4 6h16M4 12h16M4 18h16"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        stroke="#000"
        variants={{
          closed: { d: 'M 2 16.346 L 20 16.346' },
          open: { d: 'M 3 2.5 L 17 16.346' },
        }}
        transition={{ duration: 0.5 }}
      />
    </svg>
  </div>
);
