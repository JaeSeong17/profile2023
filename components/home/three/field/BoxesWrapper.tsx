import Box from './Box';

export default function BoxesWrapper() {
  return (
    <>
      <Box
        name={'blogthree'}
        position={[2, 4, 1]}
        rotation={[0, 0, Math.PI / 5]}
        activateScrollPosition={15000}
      />
      <Box
        name={'studywith'}
        position={[10, -4, 1]}
        rotation={[0, 0, Math.PI / 5]}
        activateScrollPosition={19000}
      />
    </>
  );
}
