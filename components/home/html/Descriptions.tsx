'use client';

import useScrollPositionStore from '@/lib/modules/scrollPosition';
import projectsData from '@/public/static/projectsData';
import { Variants, motion } from 'framer-motion';
import Link from 'next/link';

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

export default function Descriptions() {
  const scrollPosition = useScrollPositionStore(
    (state) => state.scrollPosition
  );
  const start = 15000;
  const interval = 4000;
  const length = 3000;

  return (
    <div className='fixed w-screen h-screen flex items-end justify-end'>
      {projectsData.map((data, idx) => (
        <motion.div
          key={idx}
          className='absolute right-[6%] sm:right-[10%] bottom-[10%]
          w-[88%] sm:w-[80%] max-w-[500px] p-[20px]
          bg-neutral-900/80 rounded-2xl shadow-[0_0_30px_-4px]
          text-white
          flex flex-col gap-5
          '
          initial={'fadeOff'}
          animate={
            scrollPosition >= start + interval * idx &&
            scrollPosition <= start + interval * idx + length
              ? 'fadeOn'
              : 'fadeOff'
          }
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
                animate={{
                  pathLength:
                    scrollPosition < start + interval * idx
                      ? 0
                      : ((scrollPosition - (start + interval * idx)) /
                          interval) *
                        1.4,
                }}
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
      ))}
    </div>
  );
}
