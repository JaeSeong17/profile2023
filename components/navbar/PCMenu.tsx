'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function PCMenu({
  links,
}: {
  links: Array<{ href: string; label: string }>;
}) {
  const path = usePathname();

  return (
    <div className='hidden sm:flex'>
      {links.map((link) => (
        <div key={link.href} className='my-[20px]'>
          <Link
            className='relative no-underline decoration-inherit leading-2'
            href={link.href}
          >
            {link.href === path && (
              <motion.span
                layoutId='underline'
                className='absolute block w-1 h-full bg-black left-0 top-0 m-0'
              />
            )}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              {link.label}
            </motion.div>
          </Link>
        </div>
      ))}
    </div>
  );
}
