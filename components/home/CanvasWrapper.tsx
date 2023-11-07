'use client';

import IntroCanvas from './three/intro/IntroCanvas';
import FieldCanvas from './three/field/FieldCanvas';
import { Suspense } from 'react';

export default function CanvasWrapper() {
  return (
    <div>
      <IntroCanvas />
      <Suspense fallback={null}>
        <FieldCanvas />
      </Suspense>
    </div>
  );
}
