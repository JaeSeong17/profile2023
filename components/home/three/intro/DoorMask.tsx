import { Mask } from '@react-three/drei';

export default function DoorMask() {
  return (
    <>
      <Mask id={1} position={[0.3, -20, 1]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[50, 40]} />
        <meshBasicMaterial />
      </Mask>
      <Mask id={1} position={[0.3, 21.1, 1]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[50, 40]} />
        <meshBasicMaterial />
      </Mask>
      <Mask id={1} position={[0.3, 0, 17]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[30, 40]} />
        <meshBasicMaterial />
      </Mask>
      <Mask id={1} position={[0.3, 0, -15]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[30, 40]} />
        <meshBasicMaterial />
      </Mask>
    </>
  );
}
