import {
  Variants,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';
import { useState } from 'react';

const verticalTextVariants: Variants = {
  titleOff: {
    y: 120,
    transition: {
      type: 'tween',
      duration: 1,
    },
  },
  titleOn: {
    y: 0,
    transition: {
      type: 'tween',
      duration: 1,
    },
  },
};

const horizontalTextVariants: Variants = {
  titleOff: {
    x: -120,
    transition: {
      type: 'tween',
      duration: 1,
    },
  },
  titleOn: {
    x: 0,
    transition: {
      type: 'tween',
      duration: 1,
    },
  },
};

const lineVariants: Variants = {
  titleOff: {
    pathLength: 0,
    transition: {
      ease: 'easeOut',
      duration: 0.6,
    },
  },
  titleOn: {
    pathLength: 1,
    transition: {
      ease: 'easeOut',
      duration: 0.6,
    },
  },
};

export default function TitleFramer() {
  const { scrollY } = useScroll();
  const [hookedYPostion, setHookedYPosition] = useState(0);
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setHookedYPosition(latest);
  });

  return (
    <div
      className='
      fixed w-screen sm:w-[calc(100vw-60px-8px)] h-screen px-[30px]
      text-white overflow-hidden  
    '
    >
      <motion.div
        initial='textOff'
        animate={hookedYPostion < 2000 ? 'titleOn' : 'titleOff'}
      >
        <div className='absolute top-[2%] sm:top-[4%] text-4xl overflow-hidden '>
          <motion.div
            className='flex items-center'
            variants={verticalTextVariants}
          >
            Dev Portfolio
          </motion.div>
        </div>

        <div className='absolute top-[2%] sm:top-[4%] right-[15px] sm:right-[40px] text-5xl leading-[4rem] sm:text-6xl sm:leading-[5rem] overflow-hidden [writing-mode:vertical-lr] '>
          <motion.div variants={horizontalTextVariants}>
            2023 New Journey
          </motion.div>
        </div>

        <div className='absolute bottom-[10%] md:bottom-[4%]'>
          <div className='overflow-hidden text-4xl md:text-[5rem] md:leading-[7rem] md:absolute md:bottom-[80%]'>
            <motion.div variants={verticalTextVariants}>
              Front-end Developer
            </motion.div>
          </div>
          <div className='overflow-hidden text-[4rem] md:text-[10rem]'>
            <motion.div variants={verticalTextVariants}>
              An Jae-seong
            </motion.div>
          </div>
        </div>

        <div className='absolute h-full top-0 right-[60px]  sm:right-[100px]  '>
          <svg width={4} height={'100%'}>
            <motion.line
              variants={lineVariants}
              stroke='white'
              strokeWidth={4}
              x1='0'
              y1='0'
              x2='0'
              y2='1000'
            />
          </svg>
        </div>

        <div className='absolute w-[110vw] bottom-[24%] left-0'>
          <svg width={'100%'} height={4}>
            <motion.line
              variants={lineVariants}
              stroke='white'
              strokeWidth={4}
              x1='0'
              y1='0'
              x2='2000'
              y2='0'
            />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
