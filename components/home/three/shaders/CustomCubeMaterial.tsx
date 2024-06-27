import { useFrame } from '@react-three/fiber';
import { useRef, useLayoutEffect } from 'react';
import * as THREE from 'three';
import { noise, random } from './glslfunction';

export default function CustomCubeMaterial() {
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  useLayoutEffect(() => {
    (materialRef.current as THREE.MeshStandardMaterial).onBeforeCompile = (
      shader: THREE.Shader
    ) => {
      shader.uniforms = Object.assign(shader.uniforms, {
        uTime: { value: 0 },
        uProgress: { value: 0.5 },
        uResolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        uColor_light: { value: new THREE.Color('#eeeeee') },
        uColor_one: { value: new THREE.Color('#0014ad') },
        uColor_two: { value: new THREE.Color('#0172fe') },
        uColor_three: { value: new THREE.Color('#5ab2ef') },
        uColor_four: { value: new THREE.Color('#d4ded6') },
      });
      shader.vertexShader = shader.vertexShader.replace(
        '#include <common>',
        `
        #include <common>
        uniform float uTime;
        uniform float uProgress;
        attribute vec2 instanceUv;
        varying float vHeight;
        varying float vHeightUv;
        varying vec4 transition;
        varying vec2 vUv;
        varying vec3 vNoisedNormal;
        varying vec3 vNoisedPosition;
        ${noise}
        ${random}
        `
      );
      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
        #include <begin_vertex>
        float noise = pnoise((position*.03)  + (uTime * 0.5), vec3(10.)) * 10.0;
        vNoisedNormal = vNormal * noise;
        transformed += vNoisedNormal;
        vNoisedPosition = transformed;
        `
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <common>',
        `
        #include <common>
        uniform vec2 uResolution;
        uniform vec3 uColor_light;
        uniform vec3 uColor_one;
        uniform vec3 uColor_two;
        uniform vec3 uColor_three;
        uniform vec3 uColor_four;
        varying vec2 vUv;
        varying float vHeight;
        varying float vHeightUv;
        `
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <color_fragment>',
        `
        #include <color_fragment>
        vec2 st = gl_FragCoord.xy/ uResolution;
        float dist = distance(st, vec2(0.5))*1.5;
        diffuseColor.rgb = mix(uColor_two, uColor_four, dist);
        `
      );

      (materialRef.current as THREE.MeshStandardMaterial).userData.shader =
        shader;
    };
  });

  useFrame(({ clock }) => {
    if (!materialRef.current?.userData.shader) return;
    materialRef.current.userData.shader.uniforms.uTime.value =
      clock.getElapsedTime();
  });
  return <meshStandardMaterial ref={materialRef} />;
}
