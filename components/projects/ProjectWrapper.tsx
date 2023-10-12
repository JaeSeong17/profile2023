'use client';

import { motion } from 'framer-motion';
import Gallery from './Gallery';
import Summary from './Summary';
import Comment from './Comment';
import Reviews from './Reviews';

interface ProjectWrapperParams {
  data: {
    label: string;
    title: string;
    titleSub: string;
    desc: string;
    github?: string;
    site?: string;
    skills: Array<string>;
    comment: string;
    reviews: Array<{ title: string; content: string }>;
    issues: Array<{ title: string; content: string }>;
  };
}

export default function ProjectWrapper({ data }: ProjectWrapperParams) {
  const {
    label,
    title,
    titleSub,
    desc,
    github,
    site,
    skills,
    comment,
    reviews,
    issues,
  } = data;
  return (
    <div
      className='bg-neutral-900 w-full h-full text-[2rem] text-white
    flex flex-col items-center'
    >
      <div
        className='
       flex flex-col xl:flex-row items-center justify-center
       p-[24px] sm:p-[50px] w-full gap-4 sm:gap-20
       '
      >
        <Gallery label={label} />
        <Summary
          title={title}
          titleSub={titleSub}
          desc={desc}
          github={github}
          site={site}
          skills={skills}
        />
      </div>
      <Comment comment={comment} />
      <Reviews reviews={reviews} issues={issues} />
    </div>
  );
}
