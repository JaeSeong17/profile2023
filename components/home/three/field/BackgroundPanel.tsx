import { useFrame } from '@react-three/fiber';
import { useLayoutEffect, useRef } from 'react';
import { TextureLoader } from 'three';

export default function BackgroundPanel() {
  const materialRef = useRef<THREE.MeshLambertMaterial>(null);
  useLayoutEffect(() => {
    (materialRef.current as THREE.MeshLambertMaterial).onBeforeCompile = (
      shader: THREE.Shader
    ) => {
      shader.uniforms = Object.assign(shader.uniforms, {
        uTime: { value: 0 },
        uLeftTexture: {
          value: new TextureLoader().load('images/background/bg-left.jpg'),
        },
        uRightTexture: {
          value: new TextureLoader().load('images/background/bg-right.jpg'),
        },
      });
      shader.vertexShader = shader.vertexShader.replace(
        '#include <common>',
        `
        #include <common>
        varying vec2 vUv;
        `
      );
      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
        #include <begin_vertex>
        vUv = uv;
        `
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <common>',
        `
        #include <common>
        uniform float uTime;
        uniform sampler2D uLeftTexture;
        uniform sampler2D uRightTexture;
        varying vec2 vUv;
        #define NUM_WAVES 5
        float random(float x) {
            return fract(sin(x) * 43758.5453123);
        }
        float getWaveTime(float seed) {
            return random(seed) * 100.0;
        }
        `
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <color_fragment>',
        `
        #include <color_fragment>
        vec4 t;
        if (vUv.x < 0.5) {
          t = texture2D(uLeftTexture, vec2(vUv.x*1.4, vUv.y));
        } else {
          t = texture2D(uRightTexture, vec2((vUv.x-0.5)*1.4 + 0.3, vUv.y));
        }
      
        // float customTime = uTime;
        float pct = distance(vec2(vUv.x*2.0, vUv.y), vec2(1.0, 0.5))*2.;
        // float lowerBound = smoothstep(mod(customTime, 5.)-0.1, mod(customTime, 5.), pct);
        // float upperBound = smoothstep(mod(customTime, 5.), mod(customTime, 5.)+0.02, pct);
        // diffuseColor = mix(t, vec4(30.0), lowerBound);
        // diffuseColor = mix(diffuseColor, t, upperBound);

        vec4 waveTexture;
        for (int i = 0; i < NUM_WAVES; i++) {
          float waveTime = getWaveTime(float(i));
          float waveStart = mod(waveTime + uTime*0.4, 5.0);

          float lowerBound = smoothstep(waveStart - 0.1, waveStart, pct);
          float upperBound = smoothstep(waveStart, waveStart + 0.02, pct);

          vec4 waveColor = mix(t, vec4(20.0), lowerBound);
          waveColor = mix(waveColor, t, upperBound);

          waveTexture = max(waveTexture, waveColor);  // 여러 파동이 중첩될 수 있도록 혼합
        }
        diffuseColor = mix(diffuseColor, waveTexture, 0.9);
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
    <group>
      <mesh
        position={[900, 0, 30]}
        rotation={[-Math.PI / 2, -Math.PI / 2, Math.PI]}
        renderOrder={-1}
      >
        <planeGeometry args={[1200, 600]} />
        <meshLambertMaterial ref={materialRef} toneMapped={false} />
      </mesh>
    </group>
  );
}
