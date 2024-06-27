import { Mesh } from 'three';
import CustomCubeMaterial from '../shaders/CustomCubeMaterial';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);

export default function ContentCube({
  position,
  scale = 12,
  startScrollY,
  endScrollY = startScrollY + 3000,
}: {
  position: [number, number, number];
  scale?: number;
  startScrollY: number;
  endScrollY?: number;
}) {
  const ref = useRef<Mesh>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!ref.current) return;
      const toggle = gsap
        .timeline()
        .from((ref.current as Mesh).position, {
          z: -50,
          ease: 'power2.out',
          duration: 1,
        })
        .to((ref.current as Mesh).position, {
          duration: 3,
        })
        .to((ref.current as Mesh).position, {
          z: -50,
          ease: 'power2.in',
          duration: 1,
        });

      ScrollTrigger.create({
        animation: toggle,
        start: `${startScrollY} 0`,
        end: '+=3000',
        scrub: 2,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <mesh ref={ref} position={position} frustumCulled={false}>
      <icosahedronGeometry args={[scale, 20]} />
      <CustomCubeMaterial />
    </mesh>
  );
}
