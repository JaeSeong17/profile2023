import { Backdrop, Text, useMask } from '@react-three/drei';
import GLTFDoor from './GLTFDoor';
import DoorMask from './DoorMask';

export default function DoorWrapper() {
  const stencil = useMask(1);
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        castShadow
        position={[3, 5, 5]}
        intensity={1.5}
        shadow-mapSize={[1024, 1024]}
      />
      <Backdrop
        receiveShadow
        scale={[50, 10, 10]}
        floor={1.5}
        position={[-10, 0, 0]}
        rotation={[Math.PI / 2, Math.PI / 2, 0]}
        segments={100}
      >
        <meshLambertMaterial color='#1d1d1d' dithering={true} {...stencil} />
      </Backdrop>
      <GLTFDoor />
      <Text
        position={[0.8, 0.58, 0.01]}
        rotation={[0, 0, Math.PI / 2]}
        fontSize={0.2}
        color={'white'}
      >
        Scroll To Enter
      </Text>
      <pointLight
        color={'white'}
        position={[3, 0, 5]}
        distance={10}
        intensity={2}
      />
      <DoorMask />
    </>
  );
}
