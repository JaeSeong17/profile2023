'use client';

import { useIsomorphicLayoutEffect } from '@/helpers/isomorphicEffect';
import { useFrame } from '@react-three/fiber';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MutableRefObject, useRef } from 'react';
import { Mesh, PerspectiveCamera, Vector3 } from 'three';

gsap.registerPlugin(ScrollTrigger);

export default function IntroCamera({
  camera,
}: {
  camera: MutableRefObject<PerspectiveCamera | null>;
}) {
  const enterState = {
    position: new Vector3(10, 0.55, 1),
    target: new Vector3(0, 0.55, 1),
  };
  const endState = {
    position: new Vector3(-280, 0.7, 1),
    target: new Vector3(-300, 0.55, 1),
  };

  const targetRef = useRef<Mesh>(null);

  useIsomorphicLayoutEffect(() => {
    if (!targetRef.current) {
      return;
    }
    if (!camera.current) {
      return;
    }
    // 카메라 무브먼트
    const tl = gsap
      .timeline()
      .to(
        // 카메라 이동
        camera.current.position,
        {
          x: enterState.position.x,
          y: enterState.position.y,
          z: enterState.position.z,
          duration: 2,
          ease: 'power1.inOut',
        },
        'camMovement'
      )
      .to(
        targetRef.current.position,
        {
          x: enterState.target.x,
          y: enterState.target.y,
          z: enterState.target.z,
          duration: 2,
          ease: 'power1.inOut',
        },
        'camMovement'
      )
      .to(targetRef.current.position, {
        x: endState.target.x,
        y: endState.target.y,
        z: endState.target.z,
      })
      .to(camera.current.position, {
        x: endState.position.x,
        y: endState.position.y,
        z: endState.position.z,
        duration: 15,
        ease: 'power2.in',
      });

    ScrollTrigger.create({
      animation: tl,
      start: '1000 0',
      end: '+=9000',
      scrub: 2,
    });
  }, [camera]);

  useFrame(() => {
    if (targetRef.current && camera.current) {
      camera.current.lookAt(targetRef.current.position);
    }
  });

  return (
    <>
      <mesh ref={targetRef} position={[0, 0.5, 0.5]} />
    </>
  );
}
