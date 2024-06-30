import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import CubeFieldInstanceMaterial from '../shaders/CubeFieldInstanceMaterial';

export default function CubeField() {
  const row = 26;
  const col = 40;
  const scale = 30;
  const imDownRef = useRef<THREE.InstancedMesh>(null);
  const imUpRef = useRef<THREE.InstancedMesh>(null);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const instanceUv = useMemo(() => {
    const temp = new Float32Array(row * col * 2);
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        temp.set([j / col, i / row], (i * col + j) * 2);
      }
    }
    return new THREE.InstancedBufferAttribute(temp, 2);
  }, [row, col]);
  const boxes = useMemo(() => {
    const temp = [];
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        const x = (i - 4) * (scale * 1.05);
        const y = (j - Math.floor(col / 2)) * (scale * 1.05);
        const z = Math.random() * 10;
        temp.push({ x, y, z });
      }
    }
    return temp;
  }, [row, col]);

  useEffect(() => {
    boxes.forEach((box, i) => {
      let { x, y, z } = box;
      dummy.position.set(x, y, 0);
      dummy.updateMatrix();
      (imDownRef.current as THREE.InstancedMesh).setMatrixAt(i, dummy.matrix);
      dummy.position.set(x, y, 120);
      dummy.updateMatrix();
      (imUpRef.current as THREE.InstancedMesh).setMatrixAt(i, dummy.matrix);
    });
    (imDownRef.current as THREE.InstancedMesh).instanceMatrix.needsUpdate =
      true;
    (imUpRef.current as THREE.InstancedMesh).instanceMatrix.needsUpdate = true;
  }, [dummy, boxes]);

  return (
    <>
      <instancedMesh
        ref={imDownRef}
        args={[undefined, undefined, row * col]}
        frustumCulled={false}
      >
        <boxGeometry args={[scale, scale, scale]}>
          <instancedBufferAttribute
            attach={'attributes-instanceUv'}
            {...instanceUv}
          />
        </boxGeometry>
        <CubeFieldInstanceMaterial />
      </instancedMesh>
      <instancedMesh
        ref={imUpRef}
        args={[undefined, undefined, row * col]}
        frustumCulled={false}
      >
        <boxGeometry args={[scale, scale, scale]}>
          <instancedBufferAttribute
            attach={'attributes-instanceUv'}
            {...instanceUv}
          />
        </boxGeometry>
        <CubeFieldInstanceMaterial />
      </instancedMesh>

      <pointLight position={[100, 0, 40]} intensity={1} distance={500} />
    </>
  );
}
