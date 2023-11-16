import useScrollPositionStore from '@/lib/modules/scrollPosition';
import throttle from '@/lib/trottle';
import {
  Instance,
  Instances,
  MeshReflectorMaterial,
  useMask,
} from '@react-three/drei';
import { gsap, ScrollTrigger } from 'gsap/all';
import { useEffect, useRef, useState } from 'react';
import {
  BoxGeometry,
  CatmullRomCurve3,
  Float32BufferAttribute,
  Group,
  Mesh,
  MeshStandardMaterial,
  TubeGeometry,
  Vector3,
} from 'three';

gsap.registerPlugin(ScrollTrigger);

export default function TunnelScene() {
  const endPoint = -300;
  const tunnelUnitLength = 80;
  const tunnelLightColor = '#0077ff';
  const tubePath = new CatmullRomCurve3([
    new Vector3(-1, 0, 0),
    new Vector3(-1 * tunnelUnitLength - 1, 0, 0),
  ]);
  const segments = 5;
  const tubeRadius = 2.6;
  const radialSegments = 3;

  const tubeRef = useRef<Mesh<TubeGeometry>>(null);
  const tunnelRef = useRef<Group>(null);
  const ringsRef = useRef<(Group | null)[]>([]);
  const [boxGeometries, setBoxGeometries] = useState<Mesh[][]>([]);
  const [boxScales, setBoxScales] = useState<number[]>([]);
  const [ringPositions, setRingPositions] = useState<number[]>([]);
  const [defaultRingPositions, setDefaultRingPositions] = useState<number[]>(
    []
  );
  const [boxPositions, setBoxPositions] = useState<number[][]>([]);
  const [boxRotations, setBoxRotations] = useState<number[]>([]);

  const stencil = useMask(1, true);

  // const scrollPosition = useScrollPositionStore(
  //   (state) => state.scrollPosition
  // );
  const lotationStart = 6500;
  const lotationEnd = 11200;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!tubeRef.current) return;
    const boxGeometry = new BoxGeometry();

    const vertices = (
      tubeRef.current.geometry.attributes.position as Float32BufferAttribute
    ).array;
    const boxGeometries1D: Mesh[] = [];
    const boxGeometries2D: Mesh[][] = [];

    for (let i = 0; i < vertices.length / 3; i++) {
      const box = new Mesh(boxGeometry);

      box.position.set(
        vertices[i * 3],
        vertices[i * 3 + 1],
        vertices[i * 3 + 2]
      );
      const size = Math.random() * 1 + 1.4;
      box.scale.set(size, size, size);
      const rotation = (Math.random() - 0.5) * Math.PI * 4;
      box.rotation.set(rotation, rotation, rotation);
      boxGeometries1D.push(box);
      setBoxScales((prevState) => [...prevState, size]);
      setBoxPositions((prevState) => [
        ...prevState,
        [vertices[i * 3], vertices[i * 3 + 1], vertices[i * 3 + 2]],
      ]);
      setBoxRotations((prevState) => [...prevState, rotation]);

      if (i % (radialSegments + 1) === 0) {
        setRingPositions((prevState) => [...prevState, vertices[i * 3]]);
        setDefaultRingPositions((prevState) => [...prevState, vertices[i * 3]]);
      }
    }
    for (let i = 0; i < boxGeometries1D.length; i += radialSegments + 1) {
      boxGeometries2D.push(boxGeometries1D.slice(i, i + radialSegments + 1));
    }
    setBoxGeometries(boxGeometries2D);
  }, []);

  useEffect(() => {
    if (!tunnelRef.current) return;
    const tl = gsap.timeline().to(tunnelRef.current.rotation, {
      x: Math.PI,
      ease: 'none',
    });

    ScrollTrigger.create({
      animation: tl,
      start: '3000 0',
      end: '+=7000',
      scrub: 2,
    });
  }, [tunnelRef]);

  // useEffect(() => {
  //   if (scrollPosition <= lotationStart) {
  //     setProgress(0);
  //   } else if (scrollPosition >= lotationEnd) {
  //     setProgress(Math.abs(endPoint) / tunnelUnitLength);
  //   } else {
  //     setProgress(
  //       (((scrollPosition - lotationStart) / (lotationEnd - lotationStart)) *
  //         Math.abs(endPoint)) /
  //         tunnelUnitLength
  //     );
  //   }
  // }, [endPoint, scrollPosition]);

  // useEffect(() => {
  // if (ringPositions.length === 0) return;
  // const newRingPositions = defaultRingPositions.map(
  //   (defaultRingPosition, idx) =>
  //     defaultRingPosition +
  //     (Math.floor(progress / 1) +
  //       (progress % 1 >= (1 / segments) * idx ? 1 : 0)) *
  //       -1 *
  //       tunnelUnitLength
  // );

  // ringsRef.current.forEach((ringRef, idx) => {
  //   if (!ringRef) return;
  //   ringRef.position.x = newRingPositions[idx];
  // });
  // }, [progress]);

  return (
    <>
      <group ref={tunnelRef} position={[0, 0.7, 1]}>
        <Instances
          limit={200}
          frustumCulled={false}
          material={
            new MeshStandardMaterial({
              color: 'black',
              metalness: 1,
              roughness: 0.6,
              ...stencil,
            })
          }
        >
          <boxGeometry />
          {boxGeometries.map((boxes, ringIndex) => {
            return (
              <group
                ref={(el) => {
                  ringsRef.current[ringIndex] = el;
                }}
                key={ringIndex}
                position={[ringPositions[ringIndex], 0, 0]}
              >
                {boxes.map((box, boxIndex) => {
                  return (
                    <Instance
                      key={boxIndex}
                      scale={
                        boxScales[ringIndex * (radialSegments + 1) + boxIndex]
                      }
                      position={[
                        0,
                        boxPositions[
                          ringIndex * (radialSegments + 1) + boxIndex
                        ][1],
                        boxPositions[
                          ringIndex * (radialSegments + 1) + boxIndex
                        ][2],
                      ]}
                      rotation={[
                        boxRotations[
                          ringIndex * (radialSegments + 1) + boxIndex
                        ],
                        boxRotations[
                          ringIndex * (radialSegments + 1) + boxIndex
                        ],
                        boxRotations[
                          ringIndex * (radialSegments + 1) + boxIndex
                        ],
                      ]}
                    />
                  );
                })}
              </group>
            );
          })}
        </Instances>
        <mesh ref={tubeRef}>
          <tubeGeometry
            args={[tubePath, segments, tubeRadius, radialSegments, false]}
          />
          <meshStandardMaterial {...stencil} />
        </mesh>
      </group>
      <mesh position={[endPoint, 0.7, 1]}>
        <boxGeometry args={[1, 10, 10]} />
        <MeshReflectorMaterial
          blur={[400, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={1}
          depthScale={10}
          minDepthThreshold={1}
          color='#ffffff'
          metalness={1}
          roughness={0.2}
          mirror={1}
        />
      </mesh>

      <pointLight
        color={tunnelLightColor}
        position={[endPoint * 0.97, 0.7, 1]}
        distance={80}
        intensity={70}
      />
      <pointLight
        color={tunnelLightColor}
        position={[endPoint * 0.95, 0.7, 1]}
        distance={70}
        intensity={60}
      />
      <pointLight
        color={tunnelLightColor}
        position={[endPoint * 0.93, 0.7, 1]}
        distance={50}
        intensity={60}
      />
      <pointLight
        color={tunnelLightColor}
        position={[endPoint * 0.91, 0.7, 1]}
        distance={40}
        intensity={60}
      />
      <pointLight
        color={tunnelLightColor}
        position={[endPoint * 0.88, 0, 0]}
        distance={30}
        intensity={60}
      />
    </>
  );
}
