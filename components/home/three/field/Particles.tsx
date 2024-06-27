import { shaderMaterial } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const ParticleShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uRadius: 30,
  },
  //vertex shader
  /*glsl*/ `
  uniform float uTime;
  uniform float uRadius;
  
  mat3 rotation3dY(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat3(
      c, 0.0, -s,
      0.0, 1.0, 0.0,
      s, 0.0, c
    );
  }
  
  void main() {
    float size = 2.;
    vec3 particlePosition = vec3(mod(position.x - uTime * 30., -700.), position.y, position.z);

    vec4 modelPosition = modelMatrix * vec4(particlePosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    gl_PointSize = size;
    // Size attenuation;
    // gl_PointSize *= (1.0 / - viewPosition.z);
  }
  `,

  //fragment shader
  /*glsl*/ `  
  void main() {
    gl_FragColor = vec4(0.33, 0.33, 0.93, 1.0);
  }`
);

extend({ ParticleShaderMaterial });

export default function Particles() {
  const points = useRef<THREE.Points>(null);
  const material = useRef<THREE.ShaderMaterial>(null);
  const count = 2000;
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      let x = Math.random() * 1000;
      let y = (Math.sqrt(Math.random()) - 0.5) * 600;
      let z = (Math.sqrt(Math.random()) - 0.5) * 200;
      positions.set([x, y, z], i * 3);
    }

    return positions;
  }, [count]);

  useFrame(({ clock }) => {
    if (!(material.current instanceof THREE.ShaderMaterial)) return;
    material.current.uniforms.uTime.value = clock.getElapsedTime();
    console.log();
  });

  return (
    <points ref={points} position={[500, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach='attributes-position'
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <particleShaderMaterial ref={material} depthWrite={false} />
    </points>
  );
}
