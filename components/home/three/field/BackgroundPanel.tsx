import { Plane } from '@react-three/drei';
import { useLoader, useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { TextureLoader, BackSide, sRGBEncoding } from 'three';

export default function BackgroundPanel() {
  const textures = [
    useLoader(TextureLoader, `/images/background/bg-left.jpg`),
    useLoader(TextureLoader, `/images/background/bg-right.jpg`),
  ];
  return (
    <group>
      <mesh position={[700, -350, 0]} rotation={[0, -Math.PI / 2, Math.PI]}>
        <planeGeometry args={[600, 700]} />
        <meshStandardMaterial map={textures[0]} fog={false} />
      </mesh>
      <mesh position={[700, 350, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[600, 700]} />
        <meshStandardMaterial map={textures[1]} fog={false} />
      </mesh>
    </group>
  );
}
