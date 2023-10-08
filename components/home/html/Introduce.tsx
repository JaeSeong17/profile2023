'use client';

import { introduceData } from '@/public/static/homeData';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';

export default function Introduce() {
  const { scrollY } = useScroll();
  const [hookedYPostion, setHookedYPosition] = useState(0);
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setHookedYPosition(latest);
  });

  return (
    <motion.div
      className='
      fixed w-screen sm:w-[calc(100vw-60px)] h-[calc(100vh-60px)] sm:h-screen text-white
      flex flex-col items-center justify-center p-[30px] gap-[20px]
    '
      variants={{
        textOn: {
          transition: {
            staggerChildren: 0.15,
          },
        },
        textOff: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
      initial='textOff'
      animate={
        hookedYPostion >= 6000 && hookedYPostion <= 9000 ? 'textOn' : 'textOff'
      }
    >
      {introduceData.map((data, idx) => (
        <motion.div
          key={idx}
          className={`w-full max-w-[1200px] flex
          ${
            idx === 0
              ? 'justify-start'
              : idx === 1
              ? 'justify-center'
              : 'justify-end'
          }
        `}
          variants={{
            textOn: {
              opacity: 1,
            },
            textOff: {
              opacity: 0,
            },
          }}
        >
          <div
            className='
            p-[16px] rounded-2xl bg-neutral-900/50
            max-w-[400px] md:min-h-[200px] shadow-[0_0_40px_-12px] shadow-white
          '
          >
            <div className='text-4xl md:text-5xl mb-[16px]'>{data.title}</div>
            <div className='text-2xl md:text-3xl'>{data.content}</div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
