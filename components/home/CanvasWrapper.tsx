'use client';

import IntroCanvas from './three/intro/IntroCanvas';
import FieldCanvas from './three/field/FieldCanvas';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function CanvasWrapper() {
  return (
    <div>
      <IntroCanvas />
      <FieldCanvas />
    </div>
  );
}
