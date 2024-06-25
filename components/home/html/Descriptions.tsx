'use client';

import projectsData from '@/public/static/projectsData';
import {
  Variants,
  motion,
  useAnimation,
  useScroll,
  useTransform,
} from 'framer-motion';
import Link from 'next/link';
import { useEffect } from 'react';

const fadeVariants: Variants = {
  fadeOn: {
    opacity: 1,
    visibility: 'visible',
    transition: {
      duration: 0.5,
    },
  },
  fadeOff: {
    opacity: 0,
    visibility: 'hidden',
    transition: {
      duration: 0.5,
      visibility: { delay: 0.5 },
    },
  },
};

function Description({
  data,
  start,
  end,
}: {
  data: { title: string; desc: string; label: string; skills: string[] };
  start: number;
  end: number;
}) {
  const controls = useAnimation();
  const { scrollY } = useScroll();
  const pathLength = useTransform(scrollY, [start, end], [0, 1]);
  useEffect(() => {
    const handleScroll = () => {
      if (start <= scrollY.get() && scrollY.get() <= end) {
        controls.start('fadeOn');
      } else {
        controls.start('fadeOff');
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
      className='absolute right-[6%] sm:right-[10%] bottom-[10%]
          w-[88%] sm:w-[80%] max-w-[500px] p-[20px]
          bg-neutral-900/80 rounded-2xl shadow-[0_0_30px_-4px]
          text-white
          flex flex-col gap-5
          '
      initial={'fadeOff'}
      animate={controls}
      variants={fadeVariants}
    >
      <div className='text-5xl flex justify-between'>
        {data.title}

        <svg className='w-[34px] h-[34px]'>
          <motion.circle
            cx='17'
            cy='17'
            r='12'
            stroke='white'
            strokeWidth={5}
            fill='none'
            pathLength='1'
            initial={{ pathLength: 0, rotate: -90 }}
            style={{ pathLength }}
            transition={{
              duration: 0.3,
            }}
          />
        </svg>
      </div>
      <hr />

      <div className='text-3xl'>{data.desc}</div>
      <div className='flex flex-wrap gap-2 mt-1'>
        {data.skills.map((skill, idx) => (
          <div className='text-2xl border-2 rounded-lg p-1' key={idx}>
            {skill}
          </div>
        ))}
      </div>
      <div
        className='
            border border-white px-4 py-2 rounded-2xl self-end
            transition hover:scale-110
            '
      >
        <Link href={`/projects/${data.label}`} className='text-2xl'>
          자세히
        </Link>
      </div>
    </motion.div>
  );
}

export default function Descriptions() {
  const start = 15000;
  const interval = 1000;
  const length = 3000;

  return (
    <div className='fixed w-screen h-screen flex items-end justify-end'>
      {projectsData.map((data, idx) => (
        <Description
          key={idx}
          data={data}
          start={start + (length + interval) * idx}
          end={start + (length + interval) * idx + length}
        />
      ))}
    </div>
  );
}
