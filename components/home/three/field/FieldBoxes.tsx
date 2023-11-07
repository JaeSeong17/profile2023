import { useIsomorphicLayoutEffect } from '@/helpers/isomorphicEffect';
import useScreenModeStore from '@/lib/modules/screenMode';
import { Grid, Instance, Instances } from '@react-three/drei';
import { useState } from 'react';
import { MeshStandardMaterial } from 'three';

export default function FieldBoxes() {
  const [positions, setPositions] = useState<Array<Array<number>>>([]);
  const [rotations, setRotations] = useState<Array<number>>([]);
  const [sizes, setSizes] = useState<Array<number>>([]);
  const screenMode = useScreenModeStore((state) => state.screenMode);

  useIsomorphicLayoutEffect(() => {
    let fieldWidth = 100;
    let boxesCount = 50;
    if (screenMode === 'MobileVertical') {
      fieldWidth = 30;
      boxesCount = 20;
    }

    for (let i = 0; i < boxesCount; i++) {
      setSizes((prevState) => [...prevState, Math.random() * 12 + 2]);
      setRotations((prevState) => [
        ...prevState,
        (Math.random() - 0.5) * Math.PI * 4,
      ]);
      setPositions((prevState) => [
        ...prevState,
        [
          Math.random() * 150 + 20,
          [1, -1][i % 2] * (Math.random() * fieldWidth + 12),
        ],
      ]);
    }
  }, [screenMode]);

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
