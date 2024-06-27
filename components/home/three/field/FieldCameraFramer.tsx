import { useIsomorphicLayoutEffect } from '@/helpers/isomorphicEffect';
import { useFrame } from '@react-three/fiber';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MutableRefObject, useRef } from 'react';
import { Vector3, Camera, PerspectiveCamera, Mesh } from 'three';
gsap.registerPlugin(ScrollTrigger);

// 카메라 타겟 & 카메라 위치 애니메이션
function camAnim(
  camera: Camera,
  nextCamPos: Vector3,
  target: Mesh,
  nextTarPos: Vector3,
  label: string
) {
  return gsap
    .timeline()
    .to(
      camera.position,
      {
        x: nextCamPos.x,
        y: nextCamPos.y,
        z: nextCamPos.z,
        duration: 2,
        ease: 'none',
      },
      label
    )
    .to(
      target.position,
      {
        x: nextTarPos.x,
        y: nextTarPos.y,
        z: nextTarPos.z,
        duration: 2,
        ease: 'none',
      },
      label
    );
}

export default function FieldCamera({
  camera,
}: {
  camera: MutableRefObject<PerspectiveCamera | null>;
}) {
  const cameraPoint1 = {
    position: new Vector3(-150, -20, 27),
    target: new Vector3(100, 0, 20),
  };
  const cameraPoint2 = {
    position: new Vector3(-100, -20, 20),
    target: new Vector3(100, 0, 15),
  };
  const cameraPoint3 = {
    position: new Vector3(-50, -20, 45),
    target: new Vector3(160, 20, 35),
  };
  const cameraPoint4 = {
    position: new Vector3(0, -20, 45),
    target: new Vector3(220, 20, 35),
  };
  const cameraPoint5 = {
    position: new Vector3(-150, -4, 27),
    target: new Vector3(500, 0, 30),
  };

  const target = useRef<Mesh>(null);

  useIsomorphicLayoutEffect(() => {
    if (!camera.current || !target.current) {
      return;
    }
    // 카메라 무브먼트
    const tl = gsap
      .timeline()
      .add(
        camAnim(
          camera.current,
          cameraPoint1.position,
          target.current,
          cameraPoint1.target,
          'cam1'
        )
      )
      .add(
        camAnim(
          camera.current,
          cameraPoint2.position,
          target.current,
          cameraPoint2.target,
          'cam2'
        )
      )
      .add(
        camAnim(
          camera.current,
          cameraPoint3.position,
          target.current,
          cameraPoint3.target,
          'cam3'
        )
      )
      .add(
        camAnim(
          camera.current,
          cameraPoint4.position,
          target.current,
          cameraPoint4.target,
          'cam4'
        ),
        '+=4'
      )
      .add(
        camAnim(
          camera.current,
          cameraPoint5.position,
          target.current,
          cameraPoint5.target,
          'cam5'
        ),
        '+=4'
      );

    ScrollTrigger.create({
      animation: tl,
      start: '10500 0',
      end: '+=13000',
      scrub: 2,
    });
  }, [camera]);

  useFrame(() => {
    if (!camera.current || !target.current) return;
    camera.current.lookAt(target.current.position);
  });
  return (
    <>
      <mesh position={[100, 0, 40]} ref={target}>
        {/* <boxGeometry args={[5, 5, 5]} />
        <meshBasicMaterial color={'red'} /> */}
      </mesh>
    </>
  );
}
