import { useMask } from '@react-three/drei';
import { useRef, useMemo, useEffect, RefObject } from 'react';
import { Group, InstancedMesh, Object3D, PerspectiveCamera } from 'three';
import { gsap, ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);

export default function TunnelSceneInstancedMesh({
  camera,
  count,
  layer = 10,
  dummy = new Object3D(),
}: {
  camera: RefObject<PerspectiveCamera>;
  count: number;
  layer?: number;
  dummy?: Object3D;
}) {
  const stencil = useMask(1, true);
  const mesh = useRef<InstancedMesh>(null);
  const tunnelRef = useRef<Group>(null);
  const tunnelLightColor = '#0077ff';
  const ringSpan = 10;
  const endPoint = -1 * layer * ringSpan;
  const vertices = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count * layer; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -6 - Math.floor(i / count) * ringSpan;
      const yFactor = 3 * Math.cos(i * ((Math.PI * 2) / count));
      const zFactor = 3 * Math.sin(i * ((Math.PI * 2) / count));
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count, layer]);

  useEffect(() => {
    if (!tunnelRef.current) return;
    const rotate = gsap.timeline().to(tunnelRef.current.rotation, {
      x: Math.PI,
      ease: 'none',
    });

    ScrollTrigger.create({
      animation: rotate,
      start: '3000 0',
      end: '+=7000',
      scrub: 2,
    });
  }, [tunnelRef]);

  useEffect(() => {
    vertices.forEach((vertex, i) => {
      let { t, xFactor, yFactor, zFactor } = vertex;
      dummy.position.set(xFactor, yFactor, zFactor);
      const s = Math.random() * 0.2 + 3;
      dummy.scale.setScalar(s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      (mesh.current as InstancedMesh).setMatrixAt(i, dummy.matrix);
    });
    (mesh.current as InstancedMesh).instanceMatrix.needsUpdate = true;
  }, [dummy, vertices]);
  return (
    <>
      <group ref={tunnelRef} position={[0, 0.7, 1]}>
        <instancedMesh
          ref={mesh}
          args={[undefined, undefined, count * layer]}
          frustumCulled={false}
        >
          <boxGeometry />
          <meshStandardMaterial
            color='#253e53'
            roughness={0.45}
            metalness={1}
            {...stencil}
          />
        </instancedMesh>
      </group>
      <mesh position={[endPoint, 0.7, 1]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[5, 5]} />
        <meshStandardMaterial toneMapped={false} />
      </mesh>

      <pointLight
        color={tunnelLightColor}
        position={[endPoint * 0.97, 0.7, 1]}
        distance={100}
        intensity={200}
      />
      <pointLight
        color={tunnelLightColor}
        position={[endPoint * 0.9, 0.7, 1]}
        distance={100}
        intensity={150}
      />
      <pointLight
        color={tunnelLightColor}
        position={[endPoint * 0.85, 0.7, 1]}
        distance={100}
        intensity={120}
      />
    </>
  );
}
