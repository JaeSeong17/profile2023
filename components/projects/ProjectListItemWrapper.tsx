'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectListItemWrapperParams {
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

export default function ProjectListItemWrapper({
  data,
}: ProjectListItemWrapperParams) {
  const { label, title, titleSub, skills } = data;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      <div
        className='transition duration-150 
      block m-8 p-4 text-white border-2 border-white rounded-2xl cursor-pointer 
      hover:shadow-[0_0_40px_-15px] hover:shadow-white hover:scale-[1.02] active:scale-[0.98]'
      >
        <Link href={`/projects/${label}`}>
          <div className='text-5xl leading-[3.5rem]'>{title}</div>
          <div className='text-3xl leading-[3rem]'>{titleSub}</div>
          <div className='flex flex-wrap gap-2 max-w-[400px] mt-1'>
            {skills.map((skill, idx) => (
              <div className='text-xl border-2 rounded-lg p-1' key={idx}>
                {skill}
              </div>
            ))}
          </div>
          <div className='relative rounded-lg overflow-hidden mt-2.5 max-w-[400px] h-[200px]'>
            <Image
              src={`/images/portfolioImages/${label}/${label}0.png`}
              alt={`${label}0`}
              priority={true}
              fill={true}
              style={{ objectFit: 'cover' }}
              sizes='(max-width: 768px) 100vw, 50vw'
            />
          </div>
        </Link>
      </div>
    </motion.div>
  );
}
