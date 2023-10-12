import { IconDefinition, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Variants, motion } from 'framer-motion';

interface SummaryParams {
  title: string;
  titleSub: string;
  desc: string;
  github?: string;
  site?: string;
  skills: Array<string>;
}

const comeUpVariants: Variants = {
  animOn: {
    y: '0%',
    transition: {
      duration: 1,
    },
  },
  animOff: {
    y: '120%',
  },
};

export default function Summary({
  title,
  titleSub,
  desc,
  github,
  site,
  skills,
}: SummaryParams) {
  return (
    <motion.div
      className='
        flex flex-col
        w-full
        sm:min-w-[500px]
        max-w-[650px]
        justify-center
        gap-6  p-4
      '
      initial={'animOff'}
      animate={'animOn'}
      transition={{
        staggerChildren: 0.1,
      }}
    >
      <div className='flex flex-col'>
        <div className='overflow-hidden'>
          <motion.div className='text-[5rem]' variants={comeUpVariants}>
            {title}
          </motion.div>
        </div>
        <div className='overflow-hidden'>
          <motion.div className='text-[2.75rem]' variants={comeUpVariants}>
            {titleSub}
          </motion.div>
        </div>
      </div>

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

      <div className='overflow-hidden'>
        <motion.div variants={comeUpVariants}>{desc}</motion.div>
      </div>

      <div>
        {(
          [
            [github, faGithub],
            [site, faLink],
          ] as Array<[string, IconDefinition]>
        ).map((items) => {
          return (
            items[0] && (
              <div className='overflow-hidden'>
                <motion.div variants={comeUpVariants}>
                  <div className='flex items-center'>
                    <div className='w-[25px] h-[25px]'>
                      <FontAwesomeIcon icon={items[1]} size={'1x'} />
                    </div>
                    &nbsp;:&nbsp;&nbsp;
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <a
                        className='styled-link'
                        href={items[0]}
                        target='_blank'
                      >
                        {items[0]}
                      </a>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            )
          );
        })}
      </div>

      <div className='flex flex-wrap gap-4'>
        {skills.map((skill) => (
          <motion.div
            key={skill}
            className='border-2 border-white rounded-xl px-2'
            variants={{
              animOn: {
                scale: 1,
                transition: {
                  type: 'spring',
                  duration: 0.5,
                },
              },
              animOff: {
                scale: 0,
              },
            }}
          >
            {skill}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
