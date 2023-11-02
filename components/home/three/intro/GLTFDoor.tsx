import React, { useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAnimations } from '@react-three/drei';
import { AnimationAction, Group, LoopOnce } from 'three';
import { useIsomorphicLayoutEffect } from '@/helpers/isomorphicEffect';

gsap.registerPlugin(ScrollTrigger);

export default function GLTFDoor({ ...props }) {
  const groupRef = useRef<Group>(null);
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/Door.glb');
  const { actions } = useAnimations(animations, groupRef);

  useIsomorphicLayoutEffect(() => {
    if (!actions || !actions['Cube.002Action']) return;
    (actions['Cube.002Action'] as AnimationAction).setLoop(LoopOnce, 0);
    (actions['Cube.002Action'] as AnimationAction).clampWhenFinished = true;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: '2000 0',
        scrub: 4,
        // markers: true,
        onEnter: () => {
          (actions['Cube.002Action'] as AnimationAction).paused = false;
          (actions['Cube.002Action'] as AnimationAction).timeScale = 1;
          (actions['Cube.002Action'] as AnimationAction).play();
        },
        onLeaveBack: () => {
          (actions['Cube.002Action'] as AnimationAction).paused = false;
          (actions['Cube.002Action'] as AnimationAction).timeScale = -1;
          (actions['Cube.002Action'] as AnimationAction).play();
        },
      });
    });

    return () => ctx.revert();
  }, [actions]);

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]}>
        <group
          name='Cube001'
          position={[0.3, 0.99, -1.05]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        >
          <mesh
            name='Cube309'
            castShadow
            receiveShadow
            //@ts-ignorets-ignore
            geometry={nodes.Cube309.geometry}
            //@ts-ignorets-ignore
            material={nodes.Cube309.material}
            position={[0, 0.5, 0.02]}
          />
        </group>
        <group
          name='Cube002'
          position={[0.3, 0.99, -1.05]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        >
          <mesh
            name='Cube003'
            castShadow
            receiveShadow
            //@ts-ignorets-ignore
            geometry={nodes.Cube003.geometry}
            //@ts-ignorets-ignore
            material={nodes.Cube003.material}
          />
          <mesh
            name='Cube003_1'
            castShadow
            receiveShadow
            //@ts-ignorets-ignore
            geometry={nodes.Cube003_1.geometry}
            material={materials['Gagang Pintu']}
          />
        </group>
      </group>
    </group>
  );
}
