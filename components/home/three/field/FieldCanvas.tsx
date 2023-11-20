'use client';
import { Environment, OrbitControls } from '@react-three/drei';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import FlareLight from './FlareLight';
import FieldBoxes from './FieldBoxes';
import { useIsomorphicLayoutEffect } from '@/helpers/isomorphicEffect';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FieldCamera from './FieldCamera';
import BoxesWrapper from './BoxesWrapper';
import CloudWrapper from './CloudWrapper';
import BackgroundPanel from './BackgroundPanel';

gsap.registerPlugin(ScrollTrigger);

export default function FieldCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null);
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const fade = gsap.timeline().from(canvasRef.current, {
        opacity: 0,
        ease: 'power2',
      });
      ScrollTrigger.create({
        animation: fade,
        start: '10500 0',
        end: '+=2000',
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
        camera={{ position: [-100, 0, 300], fov: 20, up: [0, 0, 1] }}
      >
        <fog attach='fog' args={['#00bffe', 200, 350]} />
        <color attach='background' args={['#00bffe']} />
        <ambientLight intensity={0.5} />
        <directionalLight
          castShadow
          position={[200, 0, 150]}
          intensity={1.5}
          shadow-mapSize={[5120, 5120]}
        >
          <orthographicCamera
            attach='shadow-camera'
            args={[-150, 150, -150, 300, 0.1, 400]}
          />
        </directionalLight>
        <Environment preset='city' />
        <FlareLight position={[800, 0, 30]} color={'white'} />
        <FieldBoxes />
        <BoxesWrapper />
        {/* <CloudWrapper /> */}
        {/* <BackgroundPanel /> */}
        <FieldCamera />
      </Canvas>
    </div>
  );
}
