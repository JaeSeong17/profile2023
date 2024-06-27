import { useFrame } from '@react-three/fiber';
import { useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';
import { noise } from './glslfunction';

export default function NucleolusShaderMaterial() {
  const materialRef = useRef<THREE.MeshLambertMaterial>(null);
  useLayoutEffect(() => {
    (materialRef.current as THREE.MeshLambertMaterial).onBeforeCompile = (
      shader: THREE.Shader
    ) => {
      shader.uniforms = Object.assign(shader.uniforms, {
        uTime: { value: 0 },
        uColor_light: { value: new THREE.Color('#eeeeee') },
        uColor_one: { value: new THREE.Color('#0014ad') },
        uColor_two: { value: new THREE.Color('#3e02e4') },
        uColor_three: { value: new THREE.Color('#0b3a5a') },
        uColor_four: { value: new THREE.Color('#d4ded6') },
        uColor_fresnel: { value: new THREE.Color('#ffffff') },
      });
      shader.vertexShader = shader.vertexShader.replace(
        '#include <common>',
        `
        #include <common>
        uniform float uTime;
        ${noise}
        `
      );
      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
        #include <begin_vertex>
        float pulse = (sin(uTime*5.54231) + cos(uTime*2.5262432413) + 100.0)*0.01;
        transformed *= pulse;
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
        uniform vec3 uColor_fresnel;
        `
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <color_fragment>',
        `
        #include <color_fragment>
        diffuseColor.rgb = uColor_two;

        float fresnelPower = 1.;
        float fresnelScale = 0.015;
        float fresnelBias = 5.0;
        float fresnel = fresnelBias + fresnelScale * pow(1.0 - dot(vViewPosition, vNormal), fresnelPower);
        diffuseColor.rgb = mix(diffuseColor.rgb, uColor_fresnel, fresnel);
        `
      );

      (materialRef.current as THREE.MeshLambertMaterial).userData.shader =
        shader;
    };
  });

  useFrame(({ clock }) => {
    if (!materialRef.current?.userData.shader) return;
    (
      materialRef.current as THREE.MeshLambertMaterial
    ).userData.shader.uniforms.uTime.value = clock.getElapsedTime();
  });
  return <meshLambertMaterial ref={materialRef} toneMapped={false} />;
}
