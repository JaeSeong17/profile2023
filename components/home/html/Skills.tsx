'use client';

import useScrollPositionStore from '@/lib/modules/scrollPosition';
import { mainSkillsData, subSkillsData } from '@/public/static/homeData';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

function BeltItems({
  skills,
  baseVelocity,
}: {
  skills: Array<{ name: string; label: string }>;
  baseVelocity: number;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    if (t < 1000) return;
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  return (
    <motion.div className='flex flex-nowrap m-[10px] w-[4200px]' style={{ x }}>
      {Array.from({ length: 2 }, () =>
        skills.map((skill, idx) => (
          <div
            key={idx}
            className='
          flex items-center justify-center border-2 border-black rounded-xl
          w-[350px] mx-[10px] py-[10px] gap-5
        '
          >
            <div className='relative w-[80px] h-[80px]'>
              <Image
                src={`/images/skillsImages/${skill.name}.png`}
                alt={skill.name}
                fill={true}
                sizes='(max-width: 768px) 3rem,
              (max-width: 1200px) 4rem,
              5rem'
              />
            </div>
            <div>{skill.label}</div>
          </div>
        ))
      )}
    </motion.div>
  );
}

function Belt({
  skills,
  baseVelocity,
}: {
  skills: Array<{ name: string; label: string }>;
  baseVelocity: number;
}) {
  const scrollPosition = useScrollPositionStore(
    (state) => state.scrollPosition
  );

  return (
    <motion.div
      className='flex flex-col h-[126px] bg-white'
      variants={{
        on: {
          opacity: 0.7,
        },
        off: {
          opacity: 0,
        },
      }}
      initial={'off'}
      animate={
        scrollPosition >= 10500 && scrollPosition <= 13500 ? 'on' : 'off'
      }
    >
      <BeltItems skills={skills} baseVelocity={baseVelocity} />
    </motion.div>
  );
}

export default function Skills() {
  return (
    <div
      className='fixed w-screen h-screen flex flex-col justify-center
      text-[4rem] overflow-x-hidden gap-2'
    >
      <Belt skills={mainSkillsData} baseVelocity={3} />
      <Belt skills={subSkillsData} baseVelocity={-3} />
    </div>
  );
}
