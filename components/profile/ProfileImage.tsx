'use client';

import { Variants, motion } from 'framer-motion';
import Image from 'next/image';

const fadeVarinats: Variants = {
  animOn: {
    scale: 1,
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 1,
    },
  },
  animOff: {
    scale: 1.2,
    opacity: 0,
    filter: 'blur(20px)',
  },
};

export default function ProfileImage() {
  return (
    <div className='relative overflow-hidden max-w-[523px] max-h-[700px]'>
      <motion.div
        initial={'animOff'}
        animate={'animOn'}
        variants={fadeVarinats}
      >
        <motion.div
          className='absolute z-[1] w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] left-0 bottom-0'
          animate={{ rotate: 360 }}
          transition={{ ease: 'linear', duration: 10, repeat: Infinity }}
        >
          <Image
            src={'/images/profileImages/logo.png'}
            alt={'logo-image'}
            sizes={'(max-width: 640px) 100px, 150px'}
            fill={true}
          />
        </motion.div>
        <Image
          src={'/images/profileImages/portrait.jpg'}
          alt={'profile-image'}
          priority={true}
          width={523}
          height={700}
        />
      </motion.div>
    </div>
  );
}
