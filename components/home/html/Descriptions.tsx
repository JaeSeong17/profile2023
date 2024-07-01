'use client';

import Image from 'next/image';
import projectsData from '@/public/static/projectsData';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from 'gsap/all';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
gsap.registerPlugin(ScrollTrigger);

function Description({
  data,
  start,
  end,
}: {
  data: { title: string; desc: string; label: string; skills: string[] };
  start: number;
  end: number;
}) {
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, {
    damping: 50,
    stiffness: 400,
  });
  const pathLength = useTransform(smoothScrollY, [start, end], [0, 1]);

  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ct = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            start: start,
            end: end,
            scrub: 2,
          },
        })
        .to(wrapperRef.current, {
          opacity: 1,
          duration: 1,
        })
        .to(wrapperRef.current, {
          duration: 4,
        })
        .to(wrapperRef.current, {
          opacity: 0,
          duration: 1,
        });
    }, wrapperRef);
    return () => ct.revert();
  }, [end, start]);

  return (
    <div
      ref={wrapperRef}
      className='opacity-0 absolute right-[6%] sm:right-[10%] bottom-[10%]
          w-[88%] sm:w-[80%] max-w-[500px] p-[20px]
          bg-neutral-900/80 rounded-2xl shadow-[0_0_30px_-4px]
          text-white
          flex flex-col gap-5
          '
    >
      <div
        className='relative
          rounded-xl
          overflow-hidden
          shadow-[0_0_20px_0px_white]
          w-full
          aspect-[16/9]'
      >
        <Image
          src={`/images/portfolioImages/${data.label}/${data.label}0.png`}
          alt={`${data.label}0`}
          priority={true}
          fill={true}
          style={{ objectFit: 'cover' }}
          sizes='(max-width: 768px) 100vw, 50vw'
        />
      </div>
      <div className='text-5xl flex justify-between'>
        {data.title}

        <svg className='w-[34px] h-[34px]'>
          <motion.circle
            cx='17'
            cy='17'
            r='12'
            stroke='white'
            strokeWidth={5}
            fill='none'
            pathLength='1'
            initial={{ pathLength: 0, rotate: -90 }}
            style={{ pathLength }}
            transition={{
              duration: 0.3,
            }}
          />
        </svg>
      </div>
      <hr />

      <div className='text-3xl'>{data.desc}</div>
      <div className='flex flex-wrap gap-2 mt-1'>
        {data.skills.map((skill, idx) => (
          <div className='text-2xl border-2 rounded-lg p-1' key={idx}>
            {skill}
          </div>
        ))}
      </div>
      <div
        className='
            border border-white px-4 py-2 rounded-2xl self-end
            transition hover:scale-110
            '
      >
        <Link
          href={`/projects/${data.label}`}
          className='text-2xl'
          prefetch={false}
        >
          자세히
        </Link>
      </div>
    </div>
  );
}

export default function Descriptions() {
  const start = 15000;
  const interval = 1000;
  const length = 3000;

  return (
    <div className='fixed w-screen h-screen flex items-end justify-end'>
      {projectsData.map((data, idx) => (
        <Description
          key={idx}
          data={data}
          start={start + (length + interval) * idx}
          end={start + (length + interval) * idx + length}
        />
      ))}
    </div>
  );
}
