'use client';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faCode, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

function IconButton({ href, icon }: { href?: string; icon: IconProp }) {
  return href ? (
    <Link
      href={href}
      className='text-4xl border-2 border-white 
            w-[54px] h-[46px] rounded-2xl flex items-center justify-center
            transition hover:scale-110 active:scale-100 '
      prefetch={false}
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
      <div className='icon'>
        <IconButton href={href} icon={icon} />
      </div>
      <div className='text-2xl w-[200px] overflow-hidden'>
        <div className='text'>{desc}</div>
      </div>
    </div>
  );
}

export default function Contact() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ct = gsap.context(() => {
      const tl = gsap
        .timeline({
          scrollTrigger: {
            toggleActions: 'play none none reverse',
            start: 23000,
          },
        })
        .to(
          wrapperRef.current,
          {
            opacity: 1,
            duration: 0.3,
            onStart: () => {
              (wrapperRef.current as HTMLDivElement).style.zIndex = '10';
            },
            onReverseComplete: () => {
              (wrapperRef.current as HTMLDivElement).style.zIndex = '-10';
            },
          },
          'intro'
        )
        .from(
          '#vertical',
          {
            x: '-100%',
          },
          'intro'
        )
        .from(
          '#horizontal',
          {
            x: '-100%',
          },
          'intro'
        )
        .from(
          '#title',
          {
            y: '100%',
          },
          'intro'
        )
        .from(
          '.icon',
          {
            scale: 0,
            stagger: 0.3,
          },
          'intro+=20%'
        )
        .from(
          '.text',
          {
            x: '-100%',
            stagger: 0.3,
          },
          'intro+=20%'
        );
    }, wrapperRef);
    return () => ct.revert();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className='opacity-0 fixed w-screen h-screen bg-neutral-900/80
        flex items-center justify-center text-white p-[30px] z-[-10]'
    >
      <svg className='w-[1px] h-[280px]'>
        <defs>
          <linearGradient id='color-vertical' x1='0%' y1='0%' x2='0%' y2='100%'>
            <stop offset='0%' stopColor='white' stopOpacity={0} />
            <stop offset='30%' stopColor='white' stopOpacity={1} />
            <stop offset='100%' stopColor='white' stopOpacity={0} />
          </linearGradient>
        </defs>

        <rect
          id='vertical'
          x='0'
          y='0'
          width='1'
          height='280'
          fill='url(#color-vertical)'
        />
      </svg>
      <div className='flex flex-col gap-6'>
        <div className='text-7xl sm:text-8xl px-5 font-black overflow-hidden'>
          <div id='title'>CONTACT</div>
        </div>

        <svg className='w-[300px] md:w-[550px] h-[2px]'>
          <defs>
            <linearGradient
              id='color-horizontal'
              x1='0%'
              y1='0%'
              x2='100%'
              y2='0%'
            >
              <stop offset='60%' stopColor='white' stopOpacity={1} />
              <stop offset='100%' stopColor='white' stopOpacity={0} />
            </linearGradient>
          </defs>

          <rect
            id='horizontal'
            x='0'
            y='0'
            width='100%'
            height='1'
            fill='url(#color-horizontal)'
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
    </div>
  );
}
