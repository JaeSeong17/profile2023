'use client';

import useScreenModeStore from '@/lib/modules/screenMode';
import { Variants, motion, useAnimation, useScroll } from 'framer-motion';
import { useEffect } from 'react';

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

export default function Title() {
  const screenMode = useScreenModeStore((state) => state.screenMode);
  const controls = useAnimation();
  const { scrollY } = useScroll();
  useEffect(() => {
    const handleScroll = () => {
      if (scrollY.get() <= 2000) {
        controls.start('titleOn');
      } else {
        controls.start('titleOff');
      }
    };

    // 스크롤 이벤트 리스너 등록
    const unsubscribe = scrollY.onChange(handleScroll);

    // 컴포넌트 언마운트 시 리스너 해제
    return () => {
      unsubscribe();
    };
  }, [scrollY, controls]);

  return (
    <motion.div
      className='
          fixed w-screen sm:w-[calc(100vw-60px)] h-[calc(100vh-60px)] sm:h-screen 
          text-white overflow-hidden   
          flex flex-col justify-between
        '
      initial='textOff'
      animate={controls}
    >
      <div
        className={`text-4xl overflow-hidden mx-[20px] my-[20px]
        ${screenMode !== 'MobileHorizontal' && 'sm:mx-[40px]'}
        `}
      >
        <motion.div
          className='flex items-center'
          variants={verticalTextVariants}
        >
          Dev Portfolio
        </motion.div>
      </div>

      <div
        className={`
        absolute top-[2%] sm:top-[4%] 
        
        overflow-hidden [writing-mode:vertical-lr] 
        ${
          screenMode === 'MobileHorizontal'
            ? 'text-4xl right-[60px]'
            : 'text-5xl leading-[4rem] sm:text-6xl sm:leading-[5rem] right-[15px] sm:right-[40px]'
        }
        `}
      >
        <motion.div variants={horizontalTextVariants}>
          2024 New Journey
        </motion.div>
      </div>

      <div className=''>
        <div className='w-screen'>
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
        <div
          className={`mx-[20px] my-[20px]
        ${screenMode !== 'MobileHorizontal' && 'sm:mx-[40px]'}
        `}
        >
          <div
            className={`overflow-hidden
          ${
            screenMode === 'MobileHorizontal'
              ? 'text-4xl'
              : 'text-4xl md:text-[5rem] md:leading-[7rem]'
          }
          `}
          >
            <motion.div variants={verticalTextVariants}>
              Front-end Developer
            </motion.div>
          </div>
          <div
            className={`overflow-hidden
          ${
            screenMode === 'MobileHorizontal'
              ? 'text-[4rem]'
              : 'text-[4rem] md:text-[10rem]'
          }
          `}
          >
            <motion.div variants={verticalTextVariants}>
              An Jae-seong
            </motion.div>
          </div>
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
    </motion.div>
  );
}
