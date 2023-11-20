import { useIsomorphicLayoutEffect } from '@/helpers/isomorphicEffect';
import { PerspectiveCamera } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { Vector3, Quaternion, Matrix4, Camera } from 'three';

// 카메라 회전각 계산
function getQuaternion(position: Vector3, target: Vector3): Quaternion {
  const cameraQuaternion = new Quaternion();
  const upDirection = new Vector3(0, 0, 1); // 카메라 상단 방향
  const cameraRotationMatrix = new Matrix4().lookAt(
    position,
    target,
    upDirection
  ); // 카메라위치 좌표, 바라볼 좌표, 카메라 상단 방향으로 바라보는 각도 계산
  cameraQuaternion.setFromRotationMatrix(cameraRotationMatrix); // quarternion 변환
  cameraQuaternion.normalize(); // 정규화
  return cameraQuaternion;
}

// 카메라 무브먼트
function cameraMovement(
  camera: Camera,
  position: Vector3,
  quaternion: Quaternion,
  label: string
): gsap.core.Timeline {
  return gsap
    .timeline()
    .to(
      // 카메라 이동
      camera.position,
      {
        x: position.x,
        y: position.y,
        z: position.z,
        duration: 2,
        ease: 'none',
      },
      label
    )
    .to(
      // 카메라 회전
      camera.quaternion,
      {
        x: quaternion.x,
        y: quaternion.y,
        z: quaternion.z,
        w: quaternion.w,
        duration: 2,
        ease: 'none',
      },
      label
    );
}

export default function FieldCamera() {
  const camera = useThree((state) => state.camera);
  const cameraPoint1 = {
    position: new Vector3(-200, 0, 80),
    target: new Vector3(0, 0, 0),
  };
  const cameraPoint2 = {
    position: new Vector3(-100, 0, 5),
    target: new Vector3(5, 0, 2),
  };
  const cameraPoint3 = {
    position: new Vector3(-15, -3, 3.5),
    target: new Vector3(2, 4, 2.5),
  };
  const cameraPoint4 = {
    position: new Vector3(-9, -13, 3.5),
    target: new Vector3(10, -4, 2.5),
  };
  const cameraPoint5 = {
    position: new Vector3(-50, -4, 8),
    target: new Vector3(100, 0, 5),
  };
  const cameraQuaternion1 = getQuaternion(
    cameraPoint1.position,
    cameraPoint1.target
  );
  const cameraQuaternion2 = getQuaternion(
    cameraPoint2.position,
    cameraPoint2.target
  );
  const cameraQuaternion3 = getQuaternion(
    cameraPoint3.position,
    cameraPoint3.target
  );
  const cameraQuaternion4 = getQuaternion(
    cameraPoint4.position,
    cameraPoint4.target
  );
  const cameraQuaternion5 = getQuaternion(
    cameraPoint5.position,
    cameraPoint5.target
  );

  useIsomorphicLayoutEffect(() => {
    // 카메라 무브먼트
    const tl = gsap
      .timeline()
      .add(
        cameraMovement(camera, cameraPoint1.position, cameraQuaternion1, 'cam1')
      )
      .add(
        cameraMovement(camera, cameraPoint2.position, cameraQuaternion2, 'cam2')
      )
      .add(
        cameraMovement(camera, cameraPoint3.position, cameraQuaternion3, 'cam3')
      )
      .add(
        cameraMovement(
          camera,
          cameraPoint4.position,
          cameraQuaternion4,
          'cam4'
        ),
        '+=4'
      )
      .add(
        cameraMovement(
          camera,
          cameraPoint5.position,
          cameraQuaternion5,
          'cam5'
        ),
        '+=4'
      );
    // .pause();

    ScrollTrigger.create({
      animation: tl,
      start: '10500 0',
      end: '+=13000',
      scrub: 2,
    });
  }, [camera]);
  return <></>;
}
