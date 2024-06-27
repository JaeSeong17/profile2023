'use client';

import useScreenModeStore from '@/lib/modules/screenMode';
import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);

export default function Title() {
  const screenMode = useScreenModeStore((state) => state.screenMode);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ct = gsap.context(() => {
      const tl = gsap
        .timeline({
          scrollTrigger: {
            toggleActions: 'play reverse play reverse',
            start: -1,
            end: 2000,
          },
        })
        .to(
          '.line-vertical',
          {
            y: '+=100%',
          },
          'label'
        )
        .to(
          '.line-horizontal',
          {
            x: '+=100%',
          },
          'label'
        )
        .to(
          '.text-vertical',
          {
            y: '-=100%',
          },
          'label'
        )
        .to(
          '.text-horizontal',
          {
            x: '+=100%',
          },
          'label'
        );
    }, wrapperRef);
    return () => ct.revert();
  }, [screenMode]);

  return (
    <div
      ref={wrapperRef}
      className='
          fixed w-screen sm:w-[calc(100vw-60px)] h-[calc(100vh-60px)] sm:h-screen 
          text-white overflow-hidden   
          flex flex-col justify-between
        '
    >
      <div
        className={`text-4xl overflow-hidden mx-[20px] my-[20px]
        ${screenMode !== 'MobileHorizontal' && 'sm:mx-[40px]'}
        `}
      >
        <div className='text-vertical translate-y-full flex items-center'>
          Dev Portfolio
        </div>
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
        <div className='text-horizontal -translate-x-full'>
          2024 New Journey
        </div>
      </div>

      <div>
        <div className='line-horizontal -translate-x-full w-screen'>
          <svg width={'100%'} height={4}>
            <line
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
            <div className='text-vertical translate-y-full'>
              Front-end Developer
            </div>
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
            <div className='text-vertical translate-y-full'>An Jae-seong</div>
          </div>
        </div>
      </div>

      <div className='line-vertical -translate-y-full absolute h-full top-0 right-[60px]  sm:right-[100px]  '>
        <svg width={4} height={'100%'}>
          <line stroke='white' strokeWidth={4} x1='0' y1='0' x2='0' y2='1000' />
        </svg>
      </div>
    </div>
  );
}
