'use client';

import { PerspectiveCamera } from '@react-three/drei';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import TunnelCamera from './TunnelCamera';
import * as THREE from 'three';
import Tunnel from './Tunnel';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DoorWrapper from './DoorWrapper';
gsap.registerPlugin(ScrollTrigger);

const TunnelScene = forwardRef(function TunnelScene(props, ref) {
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
      <TunnelCamera camera={cameraRef} />
      <ambientLight intensity={1} />
      <DoorWrapper />
      <Tunnel count={10} layer={25} camera={cameraRef} />
    </scene>
  );
});

export default TunnelScene;
