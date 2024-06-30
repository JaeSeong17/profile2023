import { useFrame } from '@react-three/fiber';
import { useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';
import { random } from './glslfunction';

export default function CubeFieldInstanceMaterial() {
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  useLayoutEffect(() => {
    (materialRef.current as THREE.MeshStandardMaterial).onBeforeCompile = (
      shader: THREE.Shader
    ) => {
      shader.uniforms = Object.assign(shader.uniforms, {
        uTime: { value: 0 },
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
        attribute vec2 instanceUv;
        varying float vHeight;
        varying float vHeightUv;
        ${random}
        `
      );
      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
        #include <begin_vertex>
        float dist = distance(instanceUv, vec2(0.5, instanceUv.y));
        float random = random(vec2(instanceUv.x, instanceUv.y));
        transformed.z += (sin(random*10.+uTime*0.3))*pow((dist+1.14), 11.);
        vHeight = transformed.z;
        vHeightUv = clamp(position.z*2., 0., 1.);
        `
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <common>',
        `
        #include <common>
        uniform vec3 uColor_one;
        uniform vec3 uColor_two;
        uniform vec3 uColor_three;
        uniform vec3 uColor_four;
        varying float vHeight;
        varying float vHeightUv;
        `
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <color_fragment>',
        `
        #include <color_fragment>
        vec3 highlight = mix(uColor_three, uColor_four, vHeightUv);
        diffuseColor.rgb = mix(uColor_one, uColor_two, smoothstep( 0.3, 0.4, vHeight));
        diffuseColor.rgb = mix(diffuseColor.rgb, highlight, smoothstep( 13., 20.0, vHeight));
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
