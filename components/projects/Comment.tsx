'use client';

import { motion } from 'framer-motion';

export default function Comment({ comment }: { comment: string }) {
  return (
    <div className='relative max-w-[1020px] mx-[30px] sm:mx-[60px]'>
      <div className='text-[3rem] italic'>&quot;{comment}&quot;</div>
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
          delay: 1.5,
        }}
      />
    </div>
  );
}
