'use client';

import Image from 'next/image';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { useEffect, useState } from 'react';
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

export default function Home() {
  const [mobileScreen, setMobileScreen] = useState(window.innerWidth < 640);
  useEffect(() => {
    const handleResize = () => {
      setMobileScreen(window.innerWidth < 640);
    };
    console.log(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      className='overflow-hidden 
    text-3xl text-white bg-neutral-900 p-[40px]'
    >
      <div className='flex flex-wrap items-center justify-center min-h-[calc(100vh-80px)] gap-16'>
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
          {mobileScreen ? (
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
                <motion.div variants={comeUpVariants}>
                  Closest To The User,
                </motion.div>
              </div>
              <div className='overflow-hidden'>
                <motion.div variants={comeUpVariants}>
                  Implement Attractive
                </motion.div>
              </div>
              <div className='overflow-hidden'>
                <motion.div variants={comeUpVariants}>
                  Vision With Code.
                </motion.div>
              </div>
            </div>
          )}

          <svg className='w-full h-[2px] overflow-hidden'>
            <defs>
              <linearGradient id='horizontal' x1='0%' y1='0%' x2='100%' y2='0%'>
                <stop offset='60%' stopColor='white' stopOpacity={1} />
                <stop offset='100%' stopColor='white' stopOpacity={0} />
              </linearGradient>
            </defs>
            <motion.rect
              x={0}
              y={0}
              width={'100%'}
              height={'100%'}
              fill={'url(#horizontal)'}
              variants={{
                animOn: {
                  x: '0%',
                },
                animOff: {
                  x: '-100%',
                },
              }}
              transition={{
                duration: 1,
              }}
            />
          </svg>

          <motion.div variants={fadeVarinats}>
            시각 효과와 디자인 및 UX/UI에 관심이 많은 프론트엔드 개발자
            안재성입니다. 매력적인이고 사용성이 높은 디자인으로 사용자들을
            사로잡는 소프트웨어들을 사랑합니다.
          </motion.div>

          <motion.div variants={fadeVarinats}>
            <FontAwesomeIcon icon={faEnvelope} size={'1x'} /> :
            dktmzh6@gmail.com <br />
            <FontAwesomeIcon icon={faGithub} size={'1x'} /> :
            https://github.com/JaeSeong17
          </motion.div>

          <div className='flex flex-col gap-4'>
            <motion.div variants={fadeVarinats}>
              경북대학교 글로벌소프트웨어융합 전공 졸업
              <br />
              2017.03 ~ 2023.02
            </motion.div>
            <motion.div variants={fadeVarinats}>
              India Christ University Internship
              <br />
              2021.Summer
            </motion.div>
            <motion.div variants={fadeVarinats}>
              SJSU Software Technology and Innovation Program
              <br />
              2021.Winter
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
