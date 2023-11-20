import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { TextureLoader, BackSide, sRGBEncoding } from 'three';

export default function BackgroundPanel() {
  const scene = useThree((state) => state.scene);

  useEffect(() => {
    const loader = new TextureLoader().load(
      'images/starfield.png',
      function (t) {
        scene.background = t;
      }
    );
  }, [scene]);

  return <></>;
}
