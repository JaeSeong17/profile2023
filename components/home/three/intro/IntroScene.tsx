'use client';

import { PerspectiveCamera } from '@react-three/drei';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import DoorMask from './DoorMask';
import DoorScene from './DoorScene';
import IntroCamera from './IntroCamera';
import * as THREE from 'three';
import Tunnel from './Tunnel';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const IntroScene = forwardRef(function IntroScene(props, ref) {
  const sceneRef = useRef<THREE.Scene>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useImperativeHandle(ref, () => ({
    get scene() {
      return sceneRef.current;
    },
    get camera() {
      return cameraRef.current;
    },
  }));

  return (
    <scene
      ref={sceneRef}
      fog={new THREE.Fog('#141414', 15, 60)}
      background={new THREE.Color('#141414')}
    >
      <PerspectiveCamera
        ref={cameraRef}
        position={[20, 10, 10]}
        up={[0, 0, 1]}
        fov={20}
        near={0.1}
        far={1000}
      />
      <IntroCamera camera={cameraRef} />
      <ambientLight intensity={1} />
      <DoorMask />
      <DoorScene />
      <Tunnel count={10} layer={25} camera={cameraRef} />
    </scene>
  );
});

export default IntroScene;
