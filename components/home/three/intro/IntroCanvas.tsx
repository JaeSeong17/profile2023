'use client';

import { Environment, OrbitControls, View } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { MutableRefObject, RefObject, useEffect, useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/helpers/isomorphicEffect';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DoorScene from './DoorScene';
import TunnelScene from './TunnelScene';
import DoorMask from './DoorMask';
import IntroCamera from './IntroCamera';
import IntroCameraFramer from './IntroCameraFramer';
import TunnelSceneTest from './TunnelSceneTest';
import useScreenModeStore from '@/lib/modules/screenMode';

gsap.registerPlugin(ScrollTrigger);

export default function IntroCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const screenMode = useScreenModeStore((state) => state.screenMode);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const fade = gsap.to(canvasRef.current, {
        opacity: 0,
        ease: 'power2',
      });
      ScrollTrigger.create({
        animation: fade,
        start: '9000 0',
        end: '+=1000',
        scrub: 2,
      });
    }, canvasRef);
    return () => ctx.revert();
  }, [canvasRef.current]);

  return (
    <div className='w-full h-screen fixed z-[-2]' ref={canvasRef}>
      <Canvas
        shadows
        raycaster={{ params: { Line: { threshold: 0.15 } } }}
        camera={{ position: [20, 10, 10], fov: 20, up: [0, 0, 1] }}
      >
        <color attach='background' args={['#141414']} />
        <fog attach='fog' args={['#141414', 15, 50]} />
        <Environment preset='city' />
        <DoorMask />
        <DoorScene />
        {/* <TunnelScene /> */}
        <TunnelSceneTest />

        {/* <IntroCamera /> */}
        <IntroCameraFramer />
        {/* <OrbitControls /> */}
      </Canvas>
    </div>
  );
}
