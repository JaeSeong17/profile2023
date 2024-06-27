'use client';

import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei';
import FlareLight from './FlareLight';
import FieldBoxes from './FieldBoxes';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import BoxesWrapper from './BoxesWrapper';
import BackgroundPanel from './BackgroundPanel';
import FieldCameraFramer from './FieldCameraFramer';
import { Color, Fog, Vector3 } from 'three';
import InfinityField from './InfinityField';
import Nucleus from './Nucleus';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import Particles from './Particles';
import { useFrame } from '@react-three/fiber';
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
    <scene
      ref={sceneRef}
      fog={new Fog('#303030', 1000, 2000)}
      background={new Color('#303030')}
    >
      <PerspectiveCamera
        ref={cameraRef}
        // position={[-100, 0, 300]}
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
        position={[200, 0, 150]}
        intensity={0.5}
        shadow-mapSize={[5120, 5120]}
      >
        <orthographicCamera
          attach='shadow-camera'
          args={[-150, 150, -150, 300, 0.1, 400]}
        />
      </directionalLight>
      {/* <FlareLight position={[500, 0, 30]} color={'white'} /> */}

      <ContentCube position={[160, 30, 40]} startScrollY={15000} />
      <ContentCube position={[220, 30, 40]} startScrollY={19000} />
      <InfinityField />
      <Nucleus position={[800, 0, 30]} radius={100} />
      <Particles />
      <BackgroundPanel />

      <FieldCameraFramer camera={cameraRef} />
      {/* <EffectComposer>
        <Bloom
          luminanceThreshold={1}
          mipmapBlur
          luminanceSmoothing={0.0}
          intensity={1}
        />
      </EffectComposer> */}
      {/* <OrbitControls /> */}
    </scene>
  );
});

export default FieldScene;
