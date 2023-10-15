import useScreenModeStore from '@/lib/modules/screenMode';
import { motion } from 'framer-motion';

export default function HorizontalLine() {
  const screenMode = useScreenModeStore((state) => state.screenMode);
  return screenMode === 'MobileVertical' ? (
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
        x={0}
        y={0}
        width={'100%'}
        height={'100%'}
        fill={'url(#horizontal)'}
        variants={{
          animOn: {
            scale: 0,
          },
          animOff: {
            scale: 1,
          },
        }}
        transition={{
          duration: 1,
        }}
      />
    </svg>
  ) : (
    <svg className='w-full h-[2px] overflow-hidden'>
      <defs>
        <linearGradient id='horizontal' x1='0%' y1='0%' x2='100%' y2='0%'>
          <stop offset='60%' stopColor='white' stopOpacity={1} />
          <stop offset='100%' stopColor='white' stopOpacity={0} />
        </linearGradient>
      </defs>
      <motion.rect
        x={0}
        y={0}
        width={'100%'}
        height={'100%'}
        fill={'url(#horizontal)'}
        variants={{
          animOn: {
            x: '0%',
          },
          animOff: {
            x: '-100%',
          },
        }}
        transition={{
          duration: 1,
        }}
      />
    </svg>
  );
}
