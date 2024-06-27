'use client';

import { Canvas, ShaderMaterialProps } from '@react-three/fiber';
import QuadPanel from './QuadPanel';
import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      transitionMaterial: ShaderMaterialProps;
      cubeShaderMaterial: ShaderMaterialProps;
      nucleusShaderMaterial: ShaderMaterialProps;
      particleShaderMaterial: ShaderMaterialProps;
    }
  }
}

type SceneMode = {
  setMode: (mode: 0 | 1) => void;
};

export default function CanvasWrapper() {
  const canvasRef = useRef(null);
  const sceneModeRef = useRef<SceneMode>(null);
  useEffect(() => {
    if (!sceneModeRef.current) return;
    if (window.scrollY > 10500) {
      (sceneModeRef.current as SceneMode).setMode(1);
    }
    const ctx = gsap.context(() => {
      const fade = gsap
        .timeline()
        .to(canvasRef.current, {
          opacity: 0,
          ease: 'power2',
          duration: 2,
        })
        .to(canvasRef.current, {
          duration: 1,
          onComplete: () => {
            if (!sceneModeRef.current) return;
            sceneModeRef.current.setMode(1);
          },
          onReverseComplete: () => {
            if (!sceneModeRef.current) return;
            sceneModeRef.current.setMode(0);
          },
        })
        .to(canvasRef.current, {
          opacity: 1,
          ease: 'power2',
          duration: 4,
        });
      ScrollTrigger.create({
        animation: fade,
        start: '9000 0',
        end: '+=3500',
        scrub: 1,
      });
    }, canvasRef);
    return () => ctx.revert();
  }, [sceneModeRef.current]);
  return (
    <div className='w-full h-screen fixed z-[-1]'>
      <Canvas
        ref={canvasRef}
        shadows
        gl={{
          antialias: true,
          autoClear: true,
        }}
      >
        <QuadPanel ref={sceneModeRef} />
        {/* <FieldScene /> */}
        {/* <OrbitControls /> */}
      </Canvas>
      {/* <FieldCanvas /> */}
      {/* <IntroCanvas /> */}
    </div>
  );
}
