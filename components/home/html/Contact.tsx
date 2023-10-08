'use client';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faCode, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Variants,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

const fadeVariants: Variants = {
  fadeOn: {
    opacity: 1,
    visibility: 'visible',
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
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

const titleVariants: Variants = {
  fadeOn: {
    y: 0,
    transition: {
      duration: 1,
    },
  },
  fadeOff: {
    y: 200,
  },
};

const lineVariants: Variants = {
  fadeOn: {
    x: 0,
    transition: {
      ease: 'easeOut',
      duration: 1.2,
    },
  },
  fadeOff: {
    x: '-100%',
    transition: {
      duration: 0.6,
    },
  },
};

function IconButton({ href, icon }: { href?: string; icon: IconProp }) {
  return href ? (
    <Link
      href={href}
      className='text-4xl border-2 border-white 
            w-[54px] h-[46px] rounded-2xl flex items-center justify-center
            transition hover:scale-110 active:scale-100 '
    >
      <FontAwesomeIcon icon={icon} size={'xl'} />
    </Link>
  ) : (
    <div
      className='text-4xl border-2 border-white 
    w-[54px] h-[46px] rounded-2xl flex items-center justify-center'
    >
      <FontAwesomeIcon icon={icon} size={'xl'} />
    </div>
  );
}

function ContactItem({
  href,
  icon,
  desc,
}: {
  href?: string;
  icon: IconProp;
  desc: string;
}) {
  return (
    <div className='flex gap-5 items-center'>
      <motion.div
        variants={{
          fadeOn: {
            scale: 1,
          },
          fadeOff: {
            scale: 0,
          },
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <IconButton href={href} icon={icon} />
      </motion.div>
      <div className='text-2xl w-[200px] overflow-hidden'>
        <motion.div
          variants={{
            fadeOn: {
              x: 0,
            },
            fadeOff: {
              x: -300,
            },
          }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          {desc}
        </motion.div>
      </div>
    </div>
  );
}

export default function Contact() {
  const { scrollY } = useScroll();
  const [hookedYPosition, setHookedYPosition] = useState(0);
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setHookedYPosition(latest);
  });

  const start = 23000;

  return (
    <motion.div
      className='fixed w-screen h-screen bg-neutral-900/80
        flex items-center justify-center text-white p-[30px]'
      initial={'fadeOff'}
      animate={hookedYPosition >= start ? 'fadeOn' : 'fadeOff'}
      variants={fadeVariants}
    >
      <svg className='w-[1px] h-[280px]'>
        <defs>
          <linearGradient id='vertical' x1='0%' y1='0%' x2='0%' y2='100%'>
            <stop offset='0%' stopColor='white' stopOpacity={0} />
            <stop offset='30%' stopColor='white' stopOpacity={1} />
            <stop offset='100%' stopColor='white' stopOpacity={0} />
          </linearGradient>
        </defs>

        <motion.rect
          x='0'
          y='0'
          width='1'
          height='280'
          fill='url(#vertical)'
          variants={lineVariants}
        />
      </svg>
      <div className='flex flex-col gap-6'>
        <div className='text-7xl sm:text-8xl px-5 font-black overflow-hidden'>
          <motion.div variants={titleVariants}>CONTACT</motion.div>
        </div>

        <svg className='w-[300px] md:w-[550px] h-[2px]'>
          <defs>
            <linearGradient id='horizontal' x1='0%' y1='0%' x2='100%' y2='0%'>
              <stop offset='60%' stopColor='white' stopOpacity={1} />
              <stop offset='100%' stopColor='white' stopOpacity={0} />
            </linearGradient>
          </defs>

          <motion.rect
            x='0'
            y='0'
            width='100%'
            height='1'
            fill='url(#horizontal)'
            variants={lineVariants}
          />
        </svg>

        <div className='flex flex-col text-4xl px-5 gap-6'>
          <div className='self-start'>
            <ContactItem icon={faEnvelope} desc={'dktmzh6@gmail.com'} />
          </div>
          <div className='self-center'>
            <ContactItem
              href={'https://github.com/JaeSeong17'}
              icon={faGithub}
              desc={"JaeSeong's Github Profile"}
            />
          </div>
          <div className='self-end'>
            <ContactItem
              href={'https://github.com/JaeSeong17/profile2023'}
              icon={faCode}
              desc={'This page is entirely owned by An JaeSeong.'}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
