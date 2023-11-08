import { Cloud } from '@react-three/drei';
export default function CloudWrapper() {
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
  return (
    <group>
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
    </group>
  );
}
