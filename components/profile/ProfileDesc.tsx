'use client';

import { Variants, motion } from 'framer-motion';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import useScreenModeStore from '@/lib/modules/screenMode';

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

export default function ProfileDesc() {
  return (
    <>
      <motion.div variants={fadeVarinats}>
        시각 효과와 디자인 및 UX/UI에 관심이 많은 프론트엔드 개발자
        안재성입니다. 매력적인이고 사용성이 높은 디자인으로 사용자들을 사로잡는
        소프트웨어들을 사랑합니다.
      </motion.div>

      <motion.div variants={fadeVarinats}>
        <FontAwesomeIcon icon={faEnvelope} size={'1x'} /> : dktmzh6@gmail.com{' '}
        <br />
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
    </>
  );
}
