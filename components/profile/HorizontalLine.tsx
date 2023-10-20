import useScreenModeStore from '@/lib/modules/screenMode';
import { motion } from 'framer-motion';

export default function HorizontalLine() {
  return (
    <svg className='w-full h-[2px] overflow-hidden'>
      <defs>
        <linearGradient id='horizontal' x1='0%' y1='0%' x2='100%' y2='0%'>
          <stop offset='0%' stopColor='white' stopOpacity={0} />
          <stop offset='30%' stopColor='white' stopOpacity={1} />
          <stop offset='70%' stopColor='white' stopOpacity={1} />
          <stop offset='100%' stopColor='white' stopOpacity={0} />
        </linearGradient>
      </defs>

      <motion.rect
        id='mob'
        x={0}
        y={0}
        width={'100%'}
        height={'100%'}
        fill={'url(#horizontal)'}
        variants={{
          animOn: {
            scale: 1,
          },
          animOff: {
            scale: 0,
          },
        }}
        transition={{
          duration: 1,
        }}
      />
    </svg>
  );
}
