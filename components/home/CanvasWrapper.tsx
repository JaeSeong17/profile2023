'use client';

import IntroCanvas from './three/intro/IntroCanvas';
import FieldCanvas from './three/field/FieldCanvas';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { View } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useScrollPositionStore from '@/lib/modules/scrollPosition';
gsap.registerPlugin(ScrollTrigger);

export default function CanvasWrapper() {
  const [scene, setScene] = useState(0);
  const scrollPosition = useScrollPositionStore(
    (state) => state.scrollPosition
  );

  useEffect(() => {
    if (scrollPosition < 10000) {
      setScene(0);
    } else {
      setScene(1);
    }
  }, [scrollPosition]);

  useEffect(() => {});

  return (
    <div>
      {/* {scene === 0 && <IntroCanvas />}
      {scene === 1 && <FieldCanvas />} */}
      <IntroCanvas />
      <FieldCanvas />
    </div>
  );
}
