'use client';

import { PerspectiveCamera } from '@react-three/drei';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import BackgroundPanel from './BackgroundPanel';
import FieldCamera from './FieldCamera';
import CubeField from './CubeField';
import Nucleus from './Nucleus';
import Particles from './Particles';
import ContentCube from './ContentCube';

const FieldScene = forwardRef(function FieldScene(props, ref) {
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
    <scene ref={sceneRef}>
      <PerspectiveCamera
        ref={cameraRef}
        position={[-250, -30, 27]}
        up={[0, 0, 1]}
        rotation={[0, 0, -Math.PI / 2]}
        fov={20}
        near={0.1}
        far={2000}
        // makeDefault
      />
      <ambientLight intensity={0.1} />
      <directionalLight
        castShadow
        position={[800, 0, 100]}
        intensity={0.5}
        shadow-mapSize={[2000, 2000]}
      />

      <ContentCube position={[160, 30, 40]} startScrollY={15000} />
      <ContentCube position={[220, 30, 40]} startScrollY={19000} />
      <CubeField />
      <Nucleus position={[800, 0, 30]} radius={100} />
      <Particles />
      <BackgroundPanel />

      <FieldCamera camera={cameraRef} />
    </scene>
  );
});

export default FieldScene;
