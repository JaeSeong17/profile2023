'use client';

import useScreenModeStore from '@/lib/modules/screenMode';
import useScrollPositionStore from '@/lib/modules/scrollPosition';
import { introduceData } from '@/public/static/homeData';
import { motion } from 'framer-motion';

export default function Introduce() {
  const screenMode = useScreenModeStore((state) => state.screenMode);
  const scrollPosition = useScrollPositionStore(
    (state) => state.scrollPosition
  );

  return (
    <motion.div
      className={`
        fixed w-screen sm:w-[calc(100vw-60px)] h-[calc(100vh-60px)] sm:h-screen text-white
        flex items-center justify-center p-[30px] gap-[20px] 
        ${
          screenMode === 'MobileHorizontal'
            ? 'justify-items-stretch'
            : 'flex-col'
        }
      `}
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
        scrollPosition >= 6000 && scrollPosition <= 9000 ? 'textOn' : 'textOff'
      }
    >
      {introduceData.map((data, idx) => (
        <motion.div
          key={idx}
          className={`w-full max-w-[1200px] flex
          ${
            idx === 0 &&
            (screenMode === 'MobileHorizontal' ? 'self-start' : 'justify-start')
          }
          ${
            idx === 1 &&
            (screenMode === 'MobileHorizontal'
              ? 'self-center'
              : 'justify-center')
          }
          ${
            idx === 2 &&
            (screenMode === 'MobileHorizontal' ? 'self-end' : 'justify-end')
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
            <div
              className={`
              text-4xl mb-[16px] 
              ${screenMode !== 'MobileHorizontal' && 'md:text-5xl'}
            `}
            >
              {data.title}
            </div>
            <div
              className={`text-2xl ${
                screenMode !== 'MobileHorizontal' && 'md:text-3xl'
              }`}
            >
              {data.content}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
