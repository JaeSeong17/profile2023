'use client';

import { Environment, OrbitControls, useProgress } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/helpers/isomorphicEffect';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DoorScene from './DoorScene';
import TunnelScene from './TunnelScene';
import DoorMask from './DoorMask';
import IntroCamera from './IntroCamera';

gsap.registerPlugin(ScrollTrigger);

export default function IntroCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null);
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const fade = gsap.to(canvasRef.current, {
        opacity: 0,
        ease: 'power2',
      });
      ScrollTrigger.create({
        animation: fade,
        start: '9500 0',
        end: '+=1000',
        scrub: 2,
      });
    }, canvasRef);
    return () => ctx.revert();
  }, [canvasRef.current]);

  return (
    <div className='w-full h-screen fixed z-[-1]' ref={canvasRef}>
      <Canvas
        shadows
        raycaster={{ params: { Line: { threshold: 0.15 } } }}
        camera={{ position: [20, 10, 10], fov: 20, up: [0, 0, 1] }}
      >
        <color attach='background' args={['#141414']} />
        <fog attach='fog' args={['#141414', 25, 100]} />
        <Environment preset='city' />
        <DoorMask />
        <DoorScene />
        <TunnelScene />

        <IntroCamera />
        {/* <OrbitControls /> */}
      </Canvas>
    </div>
  );
}
