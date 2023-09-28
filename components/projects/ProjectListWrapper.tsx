'use client';

import { motion } from 'framer-motion';
import ProjectListItemWrapper from './ProjectListItemWrapper';
import projectsData from '@/public/static/projectsData';

const horizontalLine = (
  <div className='w-full'>
    <svg width={'100%'} height={2}>
      <motion.line
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          ease: 'easeInOut',
          duration: 1.2,
        }}
        stroke='white'
        strokeWidth={1}
        x1='0'
        y1='0'
        x2='2000'
        y2='0'
      />
    </svg>
  </div>
);

const verticalLine = (
  <svg width={2} height={'100%'}>
    <motion.line
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{
        ease: 'easeInOut',
        duration: 1.2,
      }}
      stroke='white'
      strokeWidth={1}
      x1='0'
      y1='0'
      x2='0'
      y2='2000'
    />
  </svg>
);

const verticalLines = (
  <>
    <div className='absolute h-full left-[calc((100vw-60px)/2-250px)] lg:left-[calc((100vw-60px)/2-490px)]'>
      {verticalLine}
    </div>
    <div className='absolute h-full right-[calc((100vw-60px)/2-250px)] lg:right-[calc((100vw-60px)/2-490px)]'>
      {verticalLine}
    </div>
  </>
);

export default function ProjectListWrapper() {
  return (
    <div className='relative bg-neutral-900 min-h-screen flex flex-col items-center justify-center overflow-hidden'>
      <motion.div
        className='z-[2] text-6xl text-white mb-4'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        PROJECTS.
      </motion.div>
      {horizontalLine}
      <div className='flex lg:flex-row flex-col m-8'>
        {projectsData.map((data, idx) => (
          <ProjectListItemWrapper key={idx} data={data} />
        ))}
      </div>
      {horizontalLine}

      {verticalLines}

      {/* gradient boxes */}
      {/* top box */}
      <div
        className='absolute z-[1] top-0 w-full h-[50px] lg:h-[calc(50vh-250px)]
        bg-gradient-to-b from-neutral-900 via-neutral-900 from-40% via-60% to-90%'
      />
      {/* bottom box */}
      <div
        className='absolute z-[1] bottom-0 w-full h-[30px] lg:h-[calc(50vh-250px)]
      bg-gradient-to-t from-neutral-900 via-neutral-900 from-40% via-60% to-90%'
      />
      {/* left box */}
      <div
        className='absolute z-[1] left-0 w-[calc(50vw-350px)] lg:w-[calc(50vw-500px)] h-full
      bg-gradient-to-r from-neutral-900 via-neutral-900 from-40% via-60% to-90%'
      />
      {/* right box */}
      <div
        className='absolute z-[1] right-0 w-[calc(50vw-350px)] lg:w-[calc(50vw-500px)] h-full
      bg-gradient-to-l from-neutral-900 via-neutral-900 from-40% via-60% to-90%'
      />

      <div className='absolute top-[calc(50vh-298px)] left-[calc((100vw-60px)/2-589px)]'>
        <svg width={200} height={200}>
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              ease: 'easeInOut',
              duration: 1,
              repeat: Infinity,
              repeatType: 'mirror',
              repeatDelay: 2,
            }}
            stroke='white'
            strokeWidth={1}
            fill='transparent'
            d='M 100 150 A 50 50 90 1 1 150 100'
          />
        </svg>
      </div>

      <div className='absolute bottom-[calc(50vh-342px)] right-[calc((100vw-60px)/2-589px)]'>
        <svg width={200} height={200}>
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              ease: 'easeInOut',
              duration: 1,
              repeat: Infinity,
              repeatType: 'mirror',
              repeatDelay: 2,
            }}
            stroke='white'
            strokeWidth={1}
            fill='transparent'
            d='M 100 50 A 50 50 270 1 1 50 100'
          />
        </svg>
      </div>
    </div>
  );
}
