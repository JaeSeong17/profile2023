'use client';

import IntroCanvas from './three/intro/IntroCanvas';
import FieldCanvas from './three/field/FieldCanvas';

export default function CanvasWrapper() {
  return (
    <div>
      <IntroCanvas />
      {/* <FieldCanvas /> */}
    </div>
  );
}
