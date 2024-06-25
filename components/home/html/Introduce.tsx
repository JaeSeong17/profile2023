'use client';

import useScreenModeStore from '@/lib/modules/screenMode';
import { introduceData } from '@/public/static/homeData';
import { motion, useAnimation, useScroll } from 'framer-motion';
import { useEffect } from 'react';

export default function Introduce() {
  const screenMode = useScreenModeStore((state) => state.screenMode);
  const controls = useAnimation();
  const { scrollY } = useScroll();
  useEffect(() => {
    const handleScroll = () => {
      if (6000 <= scrollY.get() && scrollY.get() <= 9000) {
        controls.start('textOn');
      } else {
        controls.start('textOff');
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
      animate={controls}
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
