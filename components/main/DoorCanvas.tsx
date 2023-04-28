import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/helpers/isomorphicEffect';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FirstScene from './FirstScene';
import SecondScene from './SecondScene';
import DoorMask from './DoorMask';

gsap.registerPlugin(ScrollTrigger);

export default function DoorCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null);
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.to(canvasRef.current, {
        opacity: 0,
        ease: 'power2',
      });
      ScrollTrigger.create({
        animation: tl,
        start: '7000 0',
        end: '+=1000',
        scrub: 2,
      });
    }, canvasRef);
    return () => ctx.revert();
  }, [canvasRef.current]);

  return (
    <div
      ref={canvasRef}
      style={{ width: '100%', height: '100vh', position: 'fixed', zIndex: 1 }}
    >
      <Canvas
        className='canvas'
        shadows
        raycaster={{ params: { Line: { threshold: 0.15 } } }}
        camera={{ position: [20, 10, 10], fov: 20, up: [0, 0, 1] }}
      >
        <color attach='background' args={['#141414']} />
        <fog attach='fog' args={['#141414', 25, 100]} />
        <DoorMask />
        <FirstScene />
        <SecondScene />
        {/* <OrbitControls /> */}
      </Canvas>
    </div>
  );
}
