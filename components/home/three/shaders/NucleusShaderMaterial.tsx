import { useFrame } from '@react-three/fiber';
import { useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';
import { random, noise } from './glslfunction';

export default function NucleusShaderMaterial({ radius }: { radius: number }) {
  const materialRef = useRef<THREE.MeshLambertMaterial>(null);
  useLayoutEffect(() => {
    (materialRef.current as THREE.MeshLambertMaterial).onBeforeCompile = (
      shader: THREE.Shader
    ) => {
      shader.uniforms = Object.assign(shader.uniforms, {
        uTime: { value: 0 },
        uRadius: { value: radius },
        uResolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        uColor_light: { value: new THREE.Color('#eeeeee') },
        uColor_one: { value: new THREE.Color('#0014ad') },
        uColor_two: { value: new THREE.Color('#0172fe') },
        uColor_three: { value: new THREE.Color('#5ab2ef') },
        uColor_four: { value: new THREE.Color('#d4ded6') },
        uColor_fresnel: { value: new THREE.Color('#91e0ff') },
      });
      shader.vertexShader = shader.vertexShader.replace(
        '#include <common>',
        `
        #include <common>
        uniform float uTime;
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
        float noise = pnoise((position*.03) + (uTime * 0.7), vec3(60.)) * 20.0;
        vNoisedNormal = vNormal * noise;
        transformed += vNormal * noise;
        vNoisedPosition = transformed;
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
        uniform vec2 uResolution;
        uniform float uRadius;
        varying vec3 vNoisedNormal;
        varying vec3 vNoisedPosition;
        `
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <color_fragment>',
        `
        #include <color_fragment>
        vec2 st = gl_FragCoord.xy/ uResolution;
        diffuseColor.rgb = uColor_one;
        diffuseColor.rgb = mix(uColor_light*vec3(100.),diffuseColor.rgb, step(uRadius*0.993, length(vNoisedPosition)));
        diffuseColor.a *= smoothstep(uRadius*0.985, uRadius*1.015, length(vNoisedPosition));

        float fresnelPower = 1.0;
        float fresnelScale = 0.001;
        float fresnelBias = 0.1;
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
  return (
    <meshLambertMaterial
      ref={materialRef}
      transparent
      toneMapped={false}
      side={THREE.DoubleSide}
    />
  );
}
