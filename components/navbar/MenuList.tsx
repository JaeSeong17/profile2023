import { Variants, motion } from 'framer-motion';
import Link from 'next/link';

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

export const MenuList = ({
  isOpen,
  links,
  direction,
}: {
  isOpen: boolean;
  links: Array<{ href: string; label: string }>;
  direction: 'vertical' | 'horizontal';
}) => {
  return (
    <>
      <motion.ul
        className={`
          fixed z-[10] bg-white
          flex flex-col items-end justify-even gap-8 p-8
          ${direction === 'vertical' ? 'top-[59px] w-screen' : ' top-0'}
          ${direction === 'horizontal' ? 'left-[59px] h-screen' : ' left-0'}
        `}
        variants={{
          open: {
            clipPath: 'inset(0% 0% 0% 0%)',
            transition: {
              type: 'spring',
              bounce: 0,
              duration: 0.7,
              delayChildren: 0.3,
              staggerChildren: 0.05,
            },
          },
          closed: {
            clipPath:
              direction === 'vertical'
                ? 'inset(0% 0% 100% 0%)'
                : 'inset(0% 100% 0% 0%)',
            transition: {
              type: 'spring',
              bounce: 0,
              duration: 0.3,
            },
          },
        }}
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      >
        {links.map((link) => (
          <motion.li
            key={link.label}
            whileTap={{ scale: 0.9 }}
            variants={itemVariants}
          >
            <Link href={link.href}>{link.label}</Link>
          </motion.li>
        ))}
      </motion.ul>
      <motion.div
        className={`
          fixed z-[-10]
          ${direction === 'vertical' ? 'top-[60px]' : 'top-0'}
          ${direction === 'horizontal' ? 'left-[60px]' : 'left-0'}
          w-screen h-screen bg-neutral-900 opacity-0
        `}
        variants={{
          open: {
            opacity: 0.8,
            visibility: 'visible',
            transition: {
              duration: 0.5,
            },
          },
          closed: {
            opacity: 0,
            visibility: 'hidden',
            transition: {
              durtaion: 0.5,
              visibility: { delay: 0.5 },
            },
          },
        }}
      />
    </>
  );
};
