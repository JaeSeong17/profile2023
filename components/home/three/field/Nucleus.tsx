import NucleolusShaderMaterial from '../shaders/NucleolusShaderMaterial';
import NucleusShaderMaterial from '../shaders/NucleusShaderMaterial';

export default function Nucleus({
  position,
  radius = 20,
}: {
  position: [number, number, number];
  radius?: number;
}) {
  return (
    <group position={position}>
      <mesh>
        <icosahedronGeometry args={[radius, 20]} />
        <NucleusShaderMaterial radius={radius} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[radius / 2, 2]} />
        <NucleolusShaderMaterial />
      </mesh>
    </group>
  );
}
