import useScreenModeStore from '@/lib/modules/screenMode';
import { Variants, motion } from 'framer-motion';

const comeUpVariants: Variants = {
  animOn: {
    y: '0%',
    transition: { duration: 0.8 },
  },
  animOff: {
    y: '140%',
  },
};

export default function ProfileTitle() {
  const screenMode = useScreenModeStore((state) => state.screenMode);

  return screenMode === 'MobileVertical' ? (
    <div
      className='
        self-center
        relative w-[310px] h-[290px]
      text-[4.6rem]
      leading-[5.2rem] font-bold
      '
    >
      <div className='absolute left-0 top-0'>
        <div className='overflow-hidden'>
          <motion.div variants={comeUpVariants}>CLOSEST</motion.div>
        </div>
        <div className='overflow-hidden'>
          <motion.div variants={comeUpVariants}>TO THE</motion.div>
        </div>
        <div className='overflow-hidden'>
          <motion.div variants={comeUpVariants}>USER,</motion.div>
        </div>
      </div>
      <div className='overflow-hidden rotate-90 absolute right-[-70px] bottom-[60px] flex flex-col items-end'>
        <div className='overflow-hidden'>
          <motion.div variants={comeUpVariants}>IMPLEMENT</motion.div>
        </div>
        <div className='overflow-hidden'>
          <motion.div variants={comeUpVariants}>ATTRACTIVE</motion.div>
        </div>
        <div className='overflow-hidden'>
          <motion.div variants={comeUpVariants}>VISION</motion.div>
        </div>
      </div>
      <div className='overflow-hidden absolute left-0 bottom-0'>
        <div className='overflow-hidden'>
          <motion.div variants={comeUpVariants}>WITH</motion.div>
        </div>
        <div className='overflow-hidden'>
          <motion.div variants={comeUpVariants}>CODE.</motion.div>
        </div>
      </div>
    </div>
  ) : (
    <div
      className='
      text-[4rem] md:text-[5rem]
      leading-[5.4rem] md:leading-[6.4rem] font-bold
      '
    >
      <div className='overflow-hidden'>
        <motion.div variants={comeUpVariants}>Closest To The User,</motion.div>
      </div>
      <div className='overflow-hidden'>
        <motion.div variants={comeUpVariants}>Implement Attractive</motion.div>
      </div>
      <div className='overflow-hidden'>
        <motion.div variants={comeUpVariants}>Vision With Code.</motion.div>
      </div>
    </div>
  );
}
