'use client';

import CanvasWrapper from '@/components/home/CanvasWrapper';
import HtmlWrapper from '@/components/home/HtmlWrapper';
import { useProgress } from '@react-three/drei';
import Loading from './Loading';

export default function HomeWrapper() {
  const progress = useProgress((state) => state.progress);

  return (
    <>
      <Loading progress={progress} />
      <CanvasWrapper />
      <HtmlWrapper />
    </>
  );
}
