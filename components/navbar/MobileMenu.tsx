import { motion, useIsomorphicLayoutEffect } from 'framer-motion';
import MenuToggleButton from './MenuToggleButton';
import { MenuList } from './MenuList';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function MobileMenu({
  links,
}: {
  links: Array<{ href: string; label: string }>;
}) {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // 메뉴가 open일때 스크롤 잠금
  useIsomorphicLayoutEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-y-hidden');
    } else {
      document.body.classList.remove('overflow-y-hidden');
    }
  }, [isOpen]);

  // path가 바뀌면 항상 메뉴의 상태가 close이도록 초기화
  useIsomorphicLayoutEffect(() => {
    setIsOpen(false);
  }, [path]);

  return (
    <motion.div
      className='sm:hidden'
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
    >
      <MenuToggleButton toggle={() => setIsOpen(!isOpen)} />
      <MenuList isOpen={isOpen} links={links} />
    </motion.div>
  );
}
