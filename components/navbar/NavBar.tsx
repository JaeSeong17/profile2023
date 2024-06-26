'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import PCMenu from './PCMenu';
import MobileMenu from './MobileMenu';
import useScreenModeStore from '@/lib/modules/screenMode';

const links = [
  { href: '/profile', label: 'Profile' },
  { href: '/projects', label: 'Projects' },
];

export default function NavBar() {
  const screenMode = useScreenModeStore((state) => state.screenMode);
  const { scrollY } = useScroll();
  const smoothVelocity = useSpring(scrollY, {
    damping: 50,
    stiffness: 400,
  });
  const rotate = useTransform(smoothVelocity, [0, 25000], [0, 3000]);

  return (
    <nav
      className='z-[100] fixed bg-white top-0 
        h-[60px] w-screen [writing-mode:horizontal-tb] 
        px-4 sm:py-4
        sm:h-screen sm:w-[60px] sm:[writing-mode:vertical-lr]
        text-4xl font-bold sm:text-5xl
        flex items-center justify-between '
    >
      <Link
        className='relative no-underline decoration-inherit'
        href='/'
        prefetch={false}
        scroll={false}
      >
        <div className='flex items-center gap-4'>
          <motion.div
            initial={{ rotate: 0 }}
            style={{ rotate }}
            transition={{
              ease: 'linear',
            }}
          >
            <Image
              src='/icons/Gear-black.png'
              alt={'gear-scroll'}
              width={50}
              height={50}
            />
          </motion.div>
          {screenMode !== 'MobileHorizontal' && (
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              JS&apos;s Portfolio
            </motion.div>
          )}
        </div>
      </Link>

      {screenMode === 'PC' && <PCMenu links={links} />}
      {screenMode === 'MobileVertical' && (
        <MobileMenu links={links} direction='vertical' />
      )}
      {screenMode === 'MobileHorizontal' && (
        <MobileMenu links={links} direction='horizontal' />
      )}
    </nav>
  );
}
