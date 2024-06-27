'use client';

import { mainSkillsData, subSkillsData } from '@/public/static/homeData';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);

function BeltItems({
  skills,
  baseVelocity,
}: {
  skills: Array<{ name: string; label: string }>;
  baseVelocity: number;
}) {
  const beltRef = useRef<HTMLDivElement>(null);
  const itemWidth = 350;
  const itemMargin = 10;

  useEffect(() => {
    const ct = gsap.context(() => {
      gsap.set('.item', {
        x: (idx) => (itemWidth + itemMargin) * idx,
      });
      const rotate = gsap.to('.item', {
        x: `+=${baseVelocity * (itemWidth + itemMargin) * skills.length * 2}`,
        repeat: -1,
        ease: 'none',
        duration: 200,
        modifiers: {
          x: (x) => {
            return (
              gsap.utils.wrap(
                -(itemWidth + itemMargin),
                (itemWidth + itemMargin) * (skills.length * 2 - 1)
              )(parseInt(x)) + 'px'
            );
          },
        },
      });

      ScrollTrigger.create({
        start: 9000,
        end: 15000,
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          if (velocity < 0.5 && velocity > -0.5) return;
          const velocityFactor = Math.sign(velocity);
          const timeScale = 3 * velocityFactor + velocity / 400;
          gsap
            .timeline()
            .to(rotate, { duration: 0.1, timeScale })
            .to(rotate, { duration: 1.5, timeScale: velocityFactor });
        },
      });
    }, beltRef);

    return () => ct.revert();
  }, [baseVelocity, skills.length]);

  return (
    <div ref={beltRef} className='m-[10px] w-[4200px] relative'>
      {Array.from({ length: 2 }, () =>
        skills.map((skill, idx) => (
          <div
            key={idx}
            className={`item absolute
          flex items-center justify-center border-2 border-black rounded-xl
          w-[${itemWidth}px] py-[10px] gap-5
        `}
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
    </div>
  );
}

function Belt({
  skills,
  baseVelocity,
}: {
  skills: Array<{ name: string; label: string }>;
  baseVelocity: number;
}) {
  return (
    <div className='flex flex-col h-[126px] bg-white'>
      <BeltItems skills={skills} baseVelocity={baseVelocity} />
    </div>
  );
}

export default function Skills() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ct = gsap.context(() => {
      const tl = gsap
        .timeline({
          scrollTrigger: {
            start: 10500,
            end: 13500,
            scrub: 2,
          },
        })
        .to(wrapperRef.current, {
          opacity: 0.7,
          duration: 1,
        })
        .to(wrapperRef.current, {
          duration: 6,
        })
        .to(wrapperRef.current, {
          opacity: 0,
          duration: 1,
        });
    }, wrapperRef);
    return () => ct.revert();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className='opacity-0 fixed w-screen h-screen flex flex-col justify-center
      text-[4rem] overflow-x-hidden gap-2'
    >
      <Belt skills={mainSkillsData} baseVelocity={3} />
      <Belt skills={subSkillsData} baseVelocity={-3} />
    </div>
  );
}
