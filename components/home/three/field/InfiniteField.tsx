import { useIsomorphicLayoutEffect } from '@/helpers/isomorphicEffect';
import {
  Cloud,
  Grid,
  Instance,
  Instances,
} from '@react-three/drei';
import {  useState } from 'react';
import { MeshStandardMaterial } from 'three';

export default function InfiniteField() {
  const [positions, setPositions] = useState<Array<Array<number>>>([]);
  const [rotations, setRotations] = useState<Array<number>>([]);
  const [sizes, setSizes] = useState<Array<number>>([]);
  const cloudPositions = [
    [300, 40, 10],
    [300, 30, 10],
    [300, -40, 10],
    [300, -30, 10],

    [200, 80, 10],
    [200, 60, 10],
    [200, 40, 10],
    [200, 30, 10],
    [200, -80, 10],
    [200, -60, 10],
    [200, -40, 10],
    [200, -30, 10],

    [150, 80, 10],
    [150, 70, 10],
    [150, 60, 10],
    [150, 40, 10],
    [150, -80, 10],
    [150, -70, 10],
    [150, -60, 10],
    [150, -40, 10],

    [100, 50, 20],
    [100, 80, 20],
    [100, 70, 20],
    [100, 60, 20],
    [100, -50, 20],
    [100, -80, 20],
    [100, -70, 20],
    [100, -60, 20],

    [70, 50, 25],
    [70, 80, 25],
    [70, 70, 25],
    [70, 60, 25],
    [70, -50, 25],
    [70, -80, 25],
    [70, -70, 25],
    [70, -60, 25],
  ];

  useIsomorphicLayoutEffect(() => {
    for (let i = 0; i < 500; i++) {
      setSizes((prevState) => [...prevState, Math.random() * 5 + 2]);
      setRotations((prevState) => [
        ...prevState,
        (Math.random() - 0.5) * Math.PI * 4,
      ]);
      setPositions((prevState) => [
        ...prevState,
        [Math.random() * 290 + 20, [1, -1][i % 2] * (Math.random() * 300)],
      ]);
    }
  }, []);

  return (
    <group>
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[700, 700]} />
        <meshStandardMaterial color={'#42bdcb'} />
      </mesh>

      <Grid
        position={[0, 0, 0.01]}
        rotation={[Math.PI / 2, 0, 0]}
        cellSize={1.2}
        cellThickness={1}
        cellColor='#6f6f6f'
        sectionSize={6}
        sectionThickness={1.5}
        sectionColor='#386bda'
        fadeDistance={250}
        fadeStrength={2}
        followCamera={false}
        infiniteGrid={true}
      />

      {cloudPositions.map((position, idx) => (
        <Cloud
          key={idx}
          position={position}
          opacity={0.8}
          speed={0.15} // Rotation speed
          width={20} // Width of the full cloud
          depth={1} // Z-dir depth
          segments={30} // Number of particles
        />
      ))}
      <Instances
        limit={500}
        frustumCulled={false}
        castShadow={true}
        material={
          new MeshStandardMaterial({
            color: 'black',
            metalness: 1,
            roughness: 0,
          })
        }
      >
        <boxGeometry />
        {positions.map((position, index) => {
          return (
            <Instance
              key={index}
              scale={sizes[index]}
              position={[position[0], position[1], sizes[index] / 2]}
              rotation={[0, 0, rotations[index]]}
            />
          );
        })}
      </Instances>
    </group>
  );
}
