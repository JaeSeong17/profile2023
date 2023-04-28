import { useIsomorphicLayoutEffect } from '@/helpers/isomorphicEffect';
import { useThree } from '@react-three/fiber';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Matrix4, Quaternion, Vector3 } from 'three';

gsap.registerPlugin(ScrollTrigger);

export default function DoorCamera() {
  const camera = useThree(({ camera }) => {
    camera.lookAt(0, 0.5, 0.5);
    return camera;
  });
  const cameraEnterState = {
    position: new Vector3(10, 0.5, 1),
    target: new Vector3(0, 0.5, 1),
  };

  useIsomorphicLayoutEffect(() => {
    // 카메라 회전을 위한 quarternion 계산
    const cameraQuaternion = new Quaternion();
    const upDirection = new Vector3(0, 0, 1); // 카메라 상단 방향
    const cameraRotationMatrix = new Matrix4().lookAt(
      cameraEnterState.position,
      cameraEnterState.target,
      upDirection
    ); // 카메라위치 좌표, 바라볼 좌표, 카메라 상단 방향으로 바라보는 각도 계산
    cameraQuaternion.setFromRotationMatrix(cameraRotationMatrix); // quarternion 변환
    cameraQuaternion.normalize(); // 정규화

    // 카메라 무브먼트
    const tl = gsap
      .timeline()
      .to(
        // 카메라 이동
        camera.position,
        {
          x: cameraEnterState.position.x,
          y: cameraEnterState.position.y,
          z: cameraEnterState.position.z,
          duration: 2,
          ease: 'power1.inOut',
        },
        'camMovement'
      )
      .to(
        // 카메라 회전
        camera.quaternion,
        {
          x: cameraQuaternion.x,
          y: cameraQuaternion.y,
          z: cameraQuaternion.z,
          w: cameraQuaternion.w,
          duration: 2,
          ease: 'power1.inOut',
        },
        'camMovement'
      )
      .to(camera.position, {
        x: -280,
        y: 0.7,
        z: 1,
        duration: 15,
        ease: 'power2.in',
      });
    // .pause();
    // .pause();

    ScrollTrigger.create({
      animation: tl,
      start: '500 0',
      end: '+=7000',
      scrub: 2,
    });
  }, [camera]);

  return <></>;
}
