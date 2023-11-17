'use client';

import useScrollPositionStore from '@/lib/modules/scrollPosition';
import throttle from '@/lib/trottle';
import { useEffect } from 'react';

export default function ScreenModeSetter() {
  const { setScrollPosition } = useScrollPositionStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    const throttleHandleScroll = throttle(handleScroll, 500);

    window.addEventListener('scroll', throttleHandleScroll);
    return () => {
      window.removeEventListener('scroll', throttleHandleScroll);
    };
  }, []);

  return <></>;
}
