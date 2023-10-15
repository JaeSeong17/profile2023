import { useIsomorphicLayoutEffect } from '@/helpers/isomorphicEffect';
import { useRef } from 'react';
import * as THREE from 'three';
import { PointLight } from 'three';
import {
  Lensflare,
  LensflareElement,
} from 'three/examples/jsm/objects/Lensflare';

interface FlareLightParams {
  position: [x: number, y: number, z: number];
  color: string;
}

export default function FlareLight({ position, color }: FlareLightParams) {
  const flareRef = useRef<PointLight>(null);
  useIsomorphicLayoutEffect(() => {
    if (!flareRef.current) return;
    const textureLoader = new THREE.TextureLoader();
    const textureFlare0 = textureLoader.load(
      '/images/lensflare/lensflare0.png'
    );
    const textureFlare2 = textureLoader.load(
      '/images/lensflare/lensflare2.png'
    );
    const textureFlare3 = textureLoader.load(
      '/images/lensflare/lensflare3.png'
    );
    const textureHexangle = textureLoader.load(
      '/images/lensflare/Hexangle.png'
    );
    const lensflare = new Lensflare();
    lensflare.addElement(
      new LensflareElement(textureFlare0, 100, 0, flareRef.current.color)
    );
    lensflare.addElement(
      new LensflareElement(textureFlare0, 200, 0, flareRef.current.color)
    );
    lensflare.addElement(
      new LensflareElement(textureFlare0, 300, 0, new THREE.Color('#535353'))
    );
    lensflare.addElement(new LensflareElement(textureFlare2, 100, 0.02));
    lensflare.addElement(new LensflareElement(textureFlare3, 700, 0));
    lensflare.addElement(new LensflareElement(textureHexangle, 100, 0.6));
    lensflare.addElement(new LensflareElement(textureHexangle, 70, 0.7));
    lensflare.addElement(new LensflareElement(textureHexangle, 120, 0.9));
    lensflare.addElement(new LensflareElement(textureHexangle, 70, 1));
    flareRef.current.add(lensflare);
  }, []);

  return (
    <pointLight
      ref={flareRef}
      color={color}
      position={position}
      distance={200}
      intensity={50}
    />
  );
}
