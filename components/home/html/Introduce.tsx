'use client';

import useScreenModeStore from '@/lib/modules/screenMode';
import { introduceData } from '@/public/static/homeData';
import { gsap, ScrollTrigger, TextPlugin } from 'gsap/all';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
gsap.registerPlugin(ScrollTrigger, TextPlugin);

const SubIntro = forwardRef(function SubInfo(
  {
    title,
    content,
  }: {
    title: string;
    content: string;
  },
  ref
) {
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => ({
    get title() {
      return titleRef.current;
    },
    get content() {
      return contentRef.current;
    },
  }));
  return (
    <div className='flex flex-col gap-4 max-w-[320px] items-center md:items-stretch'>
      <div className='text-3xl md:text-5xl min-h-[30px]' ref={titleRef}>
        {title}
      </div>
      <div
        className='text-2xl md:text-4xl text-center md:text-start'
        ref={contentRef}
      >
        {content}
      </div>
    </div>
  );
});

type SubIntroRef = {
  title: () => HTMLDivElement;
  content: () => HTMLDivElement;
};
export default function IntroduceRework() {
  const screenMode = useScreenModeStore((state) => state.screenMode);
  const mainTextRef = useRef<HTMLDivElement>(null);
  const mainIntroRef = useRef<(HTMLDivElement | null)[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const subIntroRefs = useRef<SubIntroRef[]>([]);

  useEffect(() => {
    const ct = gsap.context(() => {
      const tl = gsap
        .timeline({})
        .to(wrapperRef.current, {
          opacity: 1,
          duration: 0,
        })
        .from(mainIntroRef.current, {
          opacity: 0,
          stagger: 0.1,
        })
        .to(
          mainIntroRef.current[0],
          {
            y: 100,
          },
          'assemble'
        )
        .to(
          mainIntroRef.current[1],
          {
            text: '사용자와 <br> 가장 <br> 가까이서',
          },
          'assemble'
        )
        .to(
          mainIntroRef.current[2],
          {
            y: -100,
          },
          'assemble'
        )
        .fromTo(
          mainTextRef.current,
          {
            x: screenMode === 'PC' ? '32%' : 0,
          },
          {
            x: screenMode === 'PC' ? '16%' : 0,
          }
        )
        .to(
          [
            subIntroRefs.current[0].title,
            subIntroRefs.current[1].title,
            subIntroRefs.current[0].content,
            subIntroRefs.current[1].content,
          ],
          {
            x: screenMode === 'PC' ? '-20%' : 0,
            y: screenMode === 'PC' ? '10%' : 0,
            duration: 0,
          }
        )
        .from([subIntroRefs.current[0].title, subIntroRefs.current[1].title], {
          text: '',
        })
        .from(
          [subIntroRefs.current[0].content, subIntroRefs.current[1].content],
          {
            opacity: 0,
          }
        )
        .to(wrapperRef.current, {
          opacity: 0,
        });
      ScrollTrigger.create({
        animation: tl,
        start: '4000 0',
        end: '+=5000',
        scrub: 1,
      });
    }, wrapperRef);

    return () => ct.revert();
  }, [screenMode]);

  return (
    <div
      className={`opacity-0
      fixed w-screen sm:w-[calc(100vw-60px)] h-[calc(100vh-60px)] sm:h-screen text-white
      flex md:flex-row items-center justify-center p-[30px] gap-[20px] 
      ${
        screenMode === 'MobileHorizontal' ? 'justify-items-stretch' : 'flex-col'
      }
    `}
      ref={wrapperRef}
    >
      <div
        ref={mainTextRef}
        className='text-8xl sm:text-[90px] flex flex-col align-start items-center md:items-start'
      >
        <div className='overflow-hidden'>
          <div ref={(el) => (mainIntroRef.current[0] = el)}>USER</div>
        </div>

        <div ref={(el) => (mainIntroRef.current[1] = el)}>AND</div>
        <div className='overflow-hidden'>
          <div ref={(el) => (mainIntroRef.current[2] = el)}>DEVELOPER</div>
        </div>
      </div>
      <div className='flex flex-col gap-14 justify-between'>
        {introduceData.map((data, idx) => (
          <SubIntro
            key={data.title}
            ref={(el: SubIntroRef) => (subIntroRefs.current[idx] = el)}
            title={data.title}
            content={data.content}
          />
        ))}
      </div>
    </div>
  );
}
