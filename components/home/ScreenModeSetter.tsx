'use client';

import useScreenModeStore from '@/lib/modules/screenMode';
import { useEffect } from 'react';

export default function ScreenModeSetter() {
  const ScreenModeState = useScreenModeStore();

  useEffect(() => {
    const handleResize = () => {
      ScreenModeState.setScreenMode(
        window.innerWidth < 640
          ? 'MobileVertical'
          : window.innerHeight < 600
          ? 'MobileHorizontal'
          : 'PC'
      );
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <></>;
}
