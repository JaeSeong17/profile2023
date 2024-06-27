import { useFrame } from '@react-three/fiber';
import { useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';
import { random } from './glslfunction';

export default function CustomInstanceMaterial() {
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  useLayoutEffect(() => {
    (materialRef.current as THREE.MeshStandardMaterial).onBeforeCompile = (
      shader: THREE.Shader
    ) => {
      shader.uniforms = Object.assign(shader.uniforms, {
        uTime: { value: 0 },
        uProgress: { value: 0.5 },
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
        ${random}
        `
      );
      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
        #include <begin_vertex>
        float random = random(vec2(instanceUv.x, instanceUv.y));
        transformed.z -= (sin(random*10.+uTime*0.3))*3. + 8.;
        vUv = uv;
        vHeight = transformed.z;
        vHeightUv = clamp(position.z*2., 0., 1.);
        `
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <common>',
        `
        #include <common>
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
        vec3 highlight = mix(uColor_three, uColor_four, vHeightUv);
        diffuseColor.rgb = uColor_one;
        diffuseColor.rgb = mix(diffuseColor.rgb, uColor_two, vHeightUv);
        diffuseColor.rgb = mix(diffuseColor.rgb, highlight, smoothstep( 7., 9., vHeight));
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
  return <meshStandardMaterial ref={materialRef} roughness={1} />;
}
