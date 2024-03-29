import * as React from 'react';
import { motion } from 'framer-motion';

const Path = (props: any) => (
  <motion.path
    fill='transparent'
    strokeWidth='3'
    stroke='hsl(0, 0%, 18%)'
    strokeLinecap='round'
    {...props}
  />
);

export const MenuToggleButton = ({
  toggle,
  direction,
}: {
  toggle: () => void;
  direction: 'vertical' | 'horizontal';
}) => (
  <button onClick={toggle}>
    <svg
      className={`${direction === 'horizontal' && 'rotate-90'}`}
      width='40'
      height='40'
      viewBox='0 0 28 18'
    >
      <Path
        variants={{
          closed: { d: 'M 2 2.5 L 20 2.5' },
          open: { d: 'M 3 16.5 L 17 2.5' },
        }}
      />
      <Path
        d='M 2 9.423 L 20 9.423'
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: 'M 2 16.346 L 20 16.346' },
          open: { d: 'M 3 2.5 L 17 16.346' },
        }}
      />
    </svg>
  </button>
);

export default MenuToggleButton;
