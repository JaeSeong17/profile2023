'use client';
import { Environment, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import FlareLight from './FlareLight';
import FieldBoxes from './FieldBoxes';
import { useIsomorphicLayoutEffect } from '@/helpers/isomorphicEffect';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FieldCamera from './FieldCamera';
import BoxesWrapper from './BoxesWrapper';

gsap.registerPlugin(ScrollTrigger);

export default function FieldCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null);
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const fade = gsap.to(canvasRef.current, {
        opacity: 1,
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
    <div
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100vh',
        position: 'fixed',
        zIndex: -2,
        opacity: 0,
      }}
    >
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

        <FieldCamera />
      </Canvas>
    </div>
  );
}
