import { Backdrop, Environment, useMask } from '@react-three/drei';
import GLTFDoor from './GLTFDoor';
import DoorCamera from './DoorCamera';

export default function FirstScene() {
  const stencil = useMask(1);
  return (
    <group>
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
      >
        <meshLambertMaterial color='#1a1a1a' {...stencil} />
      </Backdrop>
      <Environment preset='city' />
      <GLTFDoor />
      {/* <IndoorShader /> */}
      <pointLight
        color={'white'}
        position={[3, 0, 5]}
        distance={10}
        intensity={2}
      />
      <DoorCamera />
    </group>
  );
}
