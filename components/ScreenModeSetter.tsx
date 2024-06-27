'use client';

import { useIsomorphicLayoutEffect } from '@/helpers/isomorphicEffect';
import useScreenModeStore from '@/lib/modules/screenMode';

export default function ScreenModeSetter() {
  const ScreenModeState = useScreenModeStore();

  useIsomorphicLayoutEffect(() => {
    ScreenModeState.setScreenMode(
      window.innerWidth < 640
        ? 'MobileVertical'
        : window.innerHeight < 600
        ? 'MobileHorizontal'
        : window.innerWidth < 768
        ? 'Tablet'
        : 'PC'
    );
  }, []);

  useIsomorphicLayoutEffect(() => {
    const handleResize = () => {
      ScreenModeState.setScreenMode(
        window.innerWidth < 640
          ? 'MobileVertical'
          : window.innerHeight < 600
          ? 'MobileHorizontal'
          : window.innerWidth < 768
          ? 'Tablet'
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
