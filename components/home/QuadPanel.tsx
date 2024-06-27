'use client';

import {
  MutableRefObject,
  Suspense,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import IntroScene from './three/intro/IntroScene';
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
  const introSceneInfo = useRef<SceneInfo>(null);
  const fieldSceneInfo = useRef<SceneInfo>(null);
  const introRenderTarget = useFBO({
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
    generateMipmaps: true,
  });
  const shaderRef = useRef<THREE.ShaderMaterial>(null);

  useImperativeHandle(ref, () => ({
    setMode(mode: 0 | 1) {
      (shaderRef.current as THREE.ShaderMaterial).uniforms.uMode.value = mode;
    },
  }));

  useFrame(({ gl }) => {
    (introSceneInfo.current as SceneInfo).scene.visible = true;
    (fieldSceneInfo.current as SceneInfo).scene.visible = false;

    gl.setRenderTarget(introRenderTarget);
    gl.render(
      (introSceneInfo.current as SceneInfo).scene,
      (introSceneInfo.current as SceneInfo).camera
    );

    (introSceneInfo.current as SceneInfo).scene.visible = false;
    (fieldSceneInfo.current as SceneInfo).scene.visible = true;

    gl.setRenderTarget(fieldRenderTarget);
    gl.render(
      (fieldSceneInfo.current as SceneInfo).scene,
      (fieldSceneInfo.current as SceneInfo).camera
    );

    (introSceneInfo.current as SceneInfo).scene.visible = false;
    (fieldSceneInfo.current as SceneInfo).scene.visible = false;

    (shaderRef.current as THREE.ShaderMaterial).uniforms.uTexture1.value =
      introRenderTarget.texture;
    (shaderRef.current as THREE.ShaderMaterial).uniforms.uTexture2.value =
      fieldRenderTarget.texture;

    // console.log(
    //   (shaderRef.current as unknown as ShaderMaterial).uniforms.uMode.value
    // );

    gl.setRenderTarget(null);
  });
  return (
    <>
      <mesh>
        <planeGeometry args={[viewport.width, viewport.height]} />
        <transitionMaterial ref={shaderRef} />
      </mesh>
      <IntroScene ref={introSceneInfo} />
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
