import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import CustomInstanceMaterial from '../shaders/CustomInstanceMaterial';
import { useFrame } from '@react-three/fiber';

const InfinityField = () => {
  const row = 30;
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
        const x = (i - 4) * (scale + 0.5);
        const y = (j - Math.floor(col / 2)) * (scale + 0.5);
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
      dummy.position.set(x, y, 100);
      dummy.updateMatrix();
      (imUpRef.current as THREE.InstancedMesh).setMatrixAt(i, dummy.matrix);
    });
    (imDownRef.current as THREE.InstancedMesh).instanceMatrix.needsUpdate =
      true;
    (imUpRef.current as THREE.InstancedMesh).instanceMatrix.needsUpdate = true;
  }, [boxes, dummy]);

  // useFrame(({ clock }) => {
  // boxes.forEach((box, i) => {
  //   let { x, y, z } = box;
  //   dummy.position.set(x, y, 0);
  //   dummy.updateMatrix();
  //   (imRef.current as THREE.InstancedMesh).setMatrixAt(i, dummy.matrix);
  // });
  // (imDownRef.current as THREE.InstancedMesh).instanceMatrix.needsUpdate =
  //   true;
  // });

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
        <CustomInstanceMaterial />
      </instancedMesh>
      {/* <mesh position={[0, 0, 60]} rotation={[Math.PI, 0, 0]}>
        <planeGeometry args={[500, 600]} />
        <MeshReflectorMaterial
          blur={[0, 0]} // Blur ground reflections (width, height), 0 skips blur
          mixBlur={0} // How much blur mixes with surface roughness (default = 1)
          mixStrength={1} // Strength of the reflections
          mixContrast={1} // Contrast of the reflections
          resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
          mirror={1} // Mirror environment, 0 = texture colors, 1 = pick up env colors
          depthScale={0} // Scale the depth factor (0 = no depth, default = 0)
          minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
          maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
          depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
          distortion={0}
          reflectorOffset={0} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
        />
      </mesh> */}
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
        <CustomInstanceMaterial />
      </instancedMesh>

      <pointLight position={[100, 0, 40]} intensity={1} distance={500} />
    </>
  );
};

export default InfinityField;
