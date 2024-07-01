'use client';

import { motion } from 'framer-motion';

interface ReviewsParams {
  reviews: Array<{
    title: string;
    content: string;
  }>;
  issues: Array<{
    title: string;
    content: string;
  }>;
}

export default function Reviews({ reviews, issues }: ReviewsParams) {
  return (
    <div className='flex flex-col lg:flex-row lg:items-stretch p-[30px] sm:p-[50px] gap-10'>
      <div className='relative flex-[1_0_0%] flex flex-col gap-8 overflow-hidden'>
        <div className='text-[2.5rem]'>주요 회고</div>
        {reviews.map((review, idx) => (
          <div key={idx} className='review'>
            <div className='text-[2.2rem] mb-3'>{review.title}</div>
            <div className='review-content'>{review.content}</div>
          </div>
        ))}

        <motion.div
          className='absolute top-0 left-0 w-[200%] h-[100%] 
        bg-gradient-to-r from-0% from-neutral-900 via-75% via-neutral-900 to-100% to-neutral-900/0'
          initial={{
            x: '0%',
          }}
          animate={{
            x: '-100%',
          }}
          transition={{
            duration: 1.5,
            delay: 2.5,
          }}
        />
      </div>

      <div className='block'>
        <svg className='w-full lg:w-[2px] h-[2px] lg:h-full'>
          <defs>
            <linearGradient id='vertical' x1='0%' y1='0%' x2='0%' y2='100%'>
              <stop offset='0%' stopColor='white' stopOpacity={0} />
              <stop offset='30%' stopColor='white' stopOpacity={1} />
              <stop offset='70%' stopColor='white' stopOpacity={1} />
              <stop offset='100%' stopColor='white' stopOpacity={0} />
            </linearGradient>
          </defs>
          <motion.rect
            x={0}
            y={0}
            width={'100%'}
            height={'100%'}
            fill={'url(#vertical)'}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ ease: 'easeOut', duration: 1, delay: 2.2 }}
          />
        </svg>
      </div>

      {/* <div className='contour-bottom' /> */}
      <div className='relative flex-[2_1_0%] flex flex-col gap-6 self-end overflow-hidden'>
        <div className='text-[2.5rem]'>주요 기술 이슈</div>
        {issues.map((issue, idx) => (
          <div key={idx} className='text issue'>
            <div className='text-[2.2rem] mb-3'>{issue.title}</div>
            <div className='text issue-content'>{issue.content}</div>
          </div>
        ))}
        <motion.div
          className='absolute top-0 left-[-100%] w-[200%] h-[100%] 
        bg-gradient-to-r from-0% from-neutral-900/0 via-25% via-neutral-900 to-100% to-neutral-900'
          initial={{
            x: '0%',
          }}
          animate={{
            x: '100%',
          }}
          transition={{
            duration: 1.5,
            delay: 2.5,
          }}
        />
      </div>
    </div>
  );
}
