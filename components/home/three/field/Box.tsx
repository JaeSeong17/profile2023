import { useIsomorphicLayoutEffect } from '@/helpers/isomorphicEffect';
import { useLoader } from '@react-three/fiber';
import { gsap } from 'gsap';
import { useRef, useState } from 'react';
import { Group, Mesh, TextureLoader } from 'three';
import { ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);

interface BoxParams {
  name: string;
  position: [x: number, y: number, z: number];
  rotation: [x: number, y: number, z: number];
  activateScrollPosition: number;
}

export default function Box({
  name,
  position,
  rotation,
  activateScrollPosition,
}: BoxParams) {
  const boxRef = useRef<Group>(null);
  const imageRefs = useRef<Array<Mesh | null>>([]);
  const [activated, setActivated] = useState<boolean>(false);
  const [rotate, setRotate] = useState<any>(null);
  const imagesPosition: Array<[x: number, y: number, z: number]> = [
    [-0.85, 0, 0],
    [0, 0.85, 0],
    [0.85, 0, 0],
    [0, -0.85, 0],
  ];
  const imagesRotation: Array<[x: number, y: number, z: number]> = [
    [Math.PI / 2, -Math.PI / 2, 0],
    [Math.PI / 2, Math.PI, 0],
    [Math.PI / 2, Math.PI / 2, 0],
    [Math.PI / 2, 0, 0],
  ];

  const textures = [
    useLoader(TextureLoader, `/images/portfolioImages/${name}/${name}1.png`),
    useLoader(TextureLoader, `/images/portfolioImages/${name}/${name}2.png`),
    useLoader(TextureLoader, `/images/portfolioImages/${name}/${name}3.png`),
    useLoader(TextureLoader, `/images/portfolioImages/${name}/${name}4.png`),
  ];

  function imageUpScaleAnim(imageRef: Mesh) {
    return gsap.timeline().to(
      imageRef.scale,
      {
        x: 1,
        y: 1,
      },
      'img'
    );
  }

  function imageDownScaleAnim(imageRef: Mesh) {
    return gsap.timeline().to(
      imageRef.scale,
      {
        x: 0,
        y: 0,
      },
      'img'
    );
  }

  // On Off 애니메이션 등록
  useIsomorphicLayoutEffect(() => {
    if (!boxRef.current) return;
    // 애니메이션 활성화 영역 스크롤 등록
    ScrollTrigger.create({
      start: `${activateScrollPosition} 0`,
      end: '+=3000',
      onToggle: (self) => {
        setActivated(self.isActive);
      },
    });

    // 진입점 애니메이션 등록
    const enter = gsap
      .timeline({
        scrollTrigger: {
          start: `${activateScrollPosition} 0`,
          end: '+=700',
          scrub: 2,
        },
      })
      .to(
        boxRef.current.position,
        {
          z: 3.3,
        },
        'up'
      )
      .add(imageUpScaleAnim(imageRefs.current[0] as Mesh), 'up')
      .add(imageUpScaleAnim(imageRefs.current[1] as Mesh), 'up')
      .add(imageUpScaleAnim(imageRefs.current[2] as Mesh), 'up')
      .add(imageUpScaleAnim(imageRefs.current[3] as Mesh), 'up');

    // 탈출점 애니메이션 등록
    const leave = gsap
      .timeline({
        scrollTrigger: {
          start: `${activateScrollPosition + 2300} 0`,
          end: '+=700',
          scrub: 2,
        },
      })
      .to(
        boxRef.current.position,
        {
          z: 1,
        },
        'down'
      )
      .add(imageDownScaleAnim(imageRefs.current[0] as Mesh), 'down')
      .add(imageDownScaleAnim(imageRefs.current[1] as Mesh), 'down')
      .add(imageDownScaleAnim(imageRefs.current[2] as Mesh), 'down')
      .add(imageDownScaleAnim(imageRefs.current[3] as Mesh), 'down');
  }, [boxRef.current, imageRefs.current]);

  // 회전 애니메이션 등록
  useIsomorphicLayoutEffect(() => {
    if (!boxRef.current) return;
    setRotate(
      gsap.to(boxRef.current.rotation, {
        z: Math.PI * 2,
        repeat: -1,
        yoyo: true,
        duration: 20,
        ease: 'power1.inOut',
      })
    );
  }, [boxRef.current]);

  // 회전 애니메이션 On/Off
  useIsomorphicLayoutEffect(() => {
    if (!rotate) return;
    if (activated) {
      rotate.play();
    } else {
      rotate.pause();
    }
  }, [rotate, activated]);

  return (
    <group ref={boxRef} scale={2} position={position} rotation={rotation}>
      <mesh castShadow={true}>
        <boxGeometry />
        <meshStandardMaterial color='black' metalness={1} roughness={0} />
      </mesh>
      {textures.map((texture, idx) => (
        <mesh
          frustumCulled={false}
          key={idx}
          ref={(el) => (imageRefs.current[idx] = el)}
          scale={0}
          position={imagesPosition[idx]}
          rotation={imagesRotation[idx]}
        >
          <planeGeometry args={[1.6, 0.85]} />
          <meshBasicMaterial attach='material' map={texture} />
        </mesh>
      ))}
    </group>
  );
}
