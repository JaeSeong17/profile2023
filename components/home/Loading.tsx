'use client';

import { animate, motion, useIsomorphicLayoutEffect } from 'framer-motion';
import { useRef, useState } from 'react';

export default function Loading({ progress }: { progress: number }) {
  const [complete, setComplete] = useState(false);
  const [smoothProgress, setSmoothProgress] = useState(0);
  const progressTextRef = useRef(null);
  const progressBarRef = useRef(null);
  const wrapperRef = useRef(null);

  // 로딩중일 때 스크롤 잠금
  useIsomorphicLayoutEffect(() => {
    if (!complete) {
      document.body.classList.add('overflow-y-hidden');
    } else {
      document.body.classList.remove('overflow-y-hidden');
    }
  }, [complete]);

  // progress값을 부드럽게 만들기
  useIsomorphicLayoutEffect(() => {
    animate(0, progress, {
      duration: 1,
      onUpdate: (cv) => {
        setSmoothProgress(Math.floor(cv));
      },
    });
  }, [progress]);

  // 로딩 완료 업데이트
  useIsomorphicLayoutEffect(() => {
    if (smoothProgress === 100) {
      setComplete(true);
    }
  }, [smoothProgress]);

  // 로딩 완료 애니메이션
  useIsomorphicLayoutEffect(() => {
    if (
      progressTextRef.current === null ||
      progressBarRef.current === null ||
      wrapperRef.current === null
    ) {
      return;
    }
    if (complete) {
      animate([
        [progressTextRef.current, { y: '100%' }, { delay: 0.5 }],
        [progressBarRef.current, { y: '100%' }],
        [wrapperRef.current, { opacity: 0 }, { at: '+0.5', duration: 1 }],
      ]).then(
        () =>
          ((wrapperRef.current as unknown as HTMLDivElement).style.visibility =
            'hidden')
      );
    }
  }, [progressTextRef, progressBarRef, complete]);

  return (
    <motion.div
      ref={wrapperRef}
      className='fixed z-[10] w-screen h-screen bg-neutral-900
      flex flex-col gap-4 items-center justify-center'
    >
      <div className='overflow-hidden text-white text-xl'>
        <motion.div ref={progressTextRef}>{smoothProgress}</motion.div>
      </div>
      <div className='overflow-hidden'>
        <svg ref={progressBarRef} className='w-[100px] h-[4px] '>
          <rect x={0} y={0} width={'100%'} height={'100%'} fill={'gray'} />
          <motion.rect
            x={0}
            y={0}
            width={'100%'}
            height={'100%'}
            fill={'white'}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress * 0.01 }}
            transition={{ duration: 1 }}
          />
        </svg>
      </div>
    </motion.div>
  );
}
