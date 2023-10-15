'use client';

import '@fortawesome/fontawesome-svg-core/styles.css';
import { motion } from 'framer-motion';
import ProfileTitle from '@/components/profile/profileTitle';
import HorizontalLine from '@/components/profile/horizontalLine';
import ProfileImage from '@/components/profile/ProfileImage';
import ProfileDesc from '@/components/profile/ProfileDesc';

export default function Home() {
  return (
    <div
      className='overflow-hidden 
    text-3xl text-white bg-neutral-900 p-[40px]'
    >
      <div className='flex flex-wrap items-center justify-center min-h-[calc(100vh-80px)] gap-16'>
        <ProfileImage />
        <motion.div
          className='flex flex-col max-w-[540px] gap-10'
          initial={'animOff'}
          animate={'animOn'}
          variants={{
            animOn: {
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          <ProfileTitle />
          <HorizontalLine />
          <ProfileDesc />
        </motion.div>
      </div>
    </div>
  );
}
