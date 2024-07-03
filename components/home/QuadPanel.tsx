'use client';

import { forwardRef, useImperativeHandle, useRef } from 'react';
import TunnelScene from './three/tunnel/TunnelScene';
import { extend, useFrame, useThree } from '@react-three/fiber';
import TransitionMaterial from './three/shaders/TransitionMaterial.js';
import { useFBO } from '@react-three/drei';
import * as THREE from 'three';
import { Bloom, EffectComposer, SMAA } from '@react-three/postprocessing';
import FieldScene from './three/field/FieldScene';
import { gsap, ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);

extend({ TransitionMaterial });

type SceneInfo = {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
};

const QuadPanel = forwardRef(function QuadPanel(props, ref) {
  const viewport = useThree((state) => state.viewport);
  const tunnelSceneInfo = useRef<SceneInfo>(null);
  const fieldSceneInfo = useRef<SceneInfo>(null);
  const tunnelRenderTarget = useFBO({
    stencilBuffer: true,
    type: THREE.HalfFloatType,
    format: THREE.RGBAFormat,
    encoding: THREE.sRGBEncoding,
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
  });
  const fieldRenderTarget = useFBO({
    type: THREE.HalfFloatType,
    format: THREE.RGBAFormat,
    encoding: THREE.sRGBEncoding,
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
  });
  const shaderRef = useRef<THREE.ShaderMaterial>(null);

  useImperativeHandle(ref, () => ({
    setMode(mode: 0 | 1) {
      (shaderRef.current as THREE.ShaderMaterial).uniforms.uMode.value = mode;
    },
  }));

  useFrame(({ gl }) => {
    (tunnelSceneInfo.current as SceneInfo).scene.visible = true;
    (fieldSceneInfo.current as SceneInfo).scene.visible = false;

    gl.setRenderTarget(tunnelRenderTarget);
    gl.render(
      (tunnelSceneInfo.current as SceneInfo).scene,
      (tunnelSceneInfo.current as SceneInfo).camera
    );

    (tunnelSceneInfo.current as SceneInfo).scene.visible = false;
    (fieldSceneInfo.current as SceneInfo).scene.visible = true;

    gl.setRenderTarget(fieldRenderTarget);
    gl.render(
      (fieldSceneInfo.current as SceneInfo).scene,
      (fieldSceneInfo.current as SceneInfo).camera
    );

    (tunnelSceneInfo.current as SceneInfo).scene.visible = false;
    (fieldSceneInfo.current as SceneInfo).scene.visible = false;

    (shaderRef.current as THREE.ShaderMaterial).uniforms.uTexture1.value =
      tunnelRenderTarget.texture;
    (shaderRef.current as THREE.ShaderMaterial).uniforms.uTexture2.value =
      fieldRenderTarget.texture;

    gl.setRenderTarget(null);
  });
  return (
    <>
      <mesh>
        <planeGeometry args={[viewport.width, viewport.height]} />
        <transitionMaterial ref={shaderRef} />
      </mesh>
      <TunnelScene ref={tunnelSceneInfo} />
      {/* <Suspense> */}
      <FieldScene ref={fieldSceneInfo} />
      {/* </Suspense> */}
      <EffectComposer>
        <SMAA />
        <Bloom
          luminanceThreshold={1}
          mipmapBlur
          luminanceSmoothing={0.0}
          intensity={1}
        />
      </EffectComposer>
    </>
  );
});

export default QuadPanel;
