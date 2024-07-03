# Profile Page 2024

![스크린샷 2024-07-03 100436](https://github.com/JaeSeong17/profile2024/assets/37216958/ed72441f-930a-4bd0-a4e6-ea0a686b93aa)
![스크린샷 2024-07-03 100612](https://github.com/JaeSeong17/profile2024/assets/37216958/6d9ce8e8-519e-4ac1-a029-8644884a83f9)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Threejs](https://img.shields.io/badge/threejs-black?style=for-the-badge&logo=three.js&logoColor=white)
![GSAP](https://img.shields.io/badge/greensock-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

<br>

- [Scene Transition](#scene-transition)
- [InstancedMesh & Shader](#instancedmesh-&-shader)

---

## Scene Transition

### v0.0.1 -> v1.0.0 화면 전환 방식 수정으로 프레임 드랍 개선

#### :pushpin: v0.0.1: 각 Scene마다 개별 Canvas를 생성, opacity로 전환 효과를 구현합니다.

```C
const CanvasWrapper = () => {
  const s1 = useRef<Canvas>();
  const s2 = useRef<Canvas>();
  useEffect(() => {
    // gsap 스크롤 애니메이션
    const tl = gsap.timeline()
    // Scene1을 보이지 않게
    .to(s1.current, {
      opacity: 0
    })
    // Scene2를 보이게
    .from(s2.current, {
      opacity: 0
    })
    ScrollTrigger.create({
      start: startScrollY,
      end: endScrollY,
      scrub: true,
    })
  },[])

  return(
    <Canvas ref={s1}/> // Scene1
    <Canvas ref={s2}/> // Scene2
  )
}
```

- 이 방식은 자원 사용량이 상당히 큰 Canvas를 Scene마다 생성해야 하기 해당 Scene이 보이지 않는 상태에서도 렌더링을 수행하면서 많은 량의 자원이 낭비됩니다.
- 특히 모바일에서 심각한 프레임 저하를 유발합니다.

#### :pushpin: v.1.0.0: Scene을 WebGLRenderTarget에 각각 렌더링하고, 하나의 Canvas에 있는 panel의 ShaderMaterial에 각 Scene이 그려진 렌더타겟을 texture로 전달하여 전환하는 방식으로 구현합니다.

```C
// Scene을 WebGLRenderTarget에 각각 렌더링합니다
...
// R3F/drei 렌더타겟 생성
const s1RenderTarget = useFBO();
const s2RenderTarget = useFBO();

useFrame((gl) => {
  // 각 장면을 별도의 렌더타겟에 렌더링
  gl.setRenderTarget(s1RenderTarget);
  gl.render(s1.current, c1.current);

  gl.setRenderTarget(s2RenderTarget);
  gl.render(s2.current, c2.current);

  // 셰이더에 렌더타겟 장면을 texture로 전달
  shader.uniforms.uTexture1.value = s1RenderTarget.texture;
  shader.uniforms.uTexture2.value = s2RenderTarget.texture;

  gl.setRenderTarget(null) // 렌더러 초기화
})

return (
  <Canvas>
    <mesh>
      <panelGeometry /> // 두 장면이 그려질 패널
      <customShaderMaterial ref={shader}/> // 장면 전환을 수행하는 Shader
    </mesh>
    <scene ref={s1}>
      <perspectiveCamera ref={c1}/>
    </scene>
    <scene ref={s2}>
      <perspectiveCamera ref={c2}/>
    </scene>
  </Canvas>
)
...

```

```C
// 셰이더에서 전달받은 텍스쳐로 장면을 전환합니다.
const CustomshaderMaterial = shaderMaterial(
  uTexture1: undefined,
  uTexture2: undefined,

  //vertex shader
  ...

  //fragment shader
  /*glsl*/`
  uniform float uMode;
  uniform sampler2D uTexture1;
  uniform sampler2D uTexture2;

  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    vec4 t1= texture2D(uTexture1, uv);
    vec4 t2= texture2D(uTexture2, uv);

    // 장면 전환 방식에 따라 수정
    vec4 finalTexture;
    if(uMode == 0.){
      finalTexture = t1;
    } else {
      finalTexture = t2;
    }

    gl_FragColor = finalTexture;
  }`
)
```

- 해당 방식으로 자원 소모가 큰 캔버스 수를 장면 수만큼 생성하지 않고 전환이 가능합니다.
- 해당 프로젝트에서 구현한 페이드 아웃/인 방식 이외에도 와이프, 디졸브 등의 다른 전환 방식으로 구현 할 수 있습니다.
- 전체적인 프레임 및 화면 전환 시 프레임 드랍이 개선되었습니다.
  <video src="https://github.com/JaeSeong17/profile2024/assets/37216958/b746ec9e-8b7d-47ad-83f3-25ab0316fdd7" width="50%" height="50%" autoplay loop muted/>

---

## InstancedMesh & Shader

### v0.0.1 -> v1.0.0 Field의 Cube 생성 및 애니메이션 방식 수정으로 CPU사용량 및 Drawcall 감소

#### :pushpin: v0.0.1: Tunnel Scene과 Field Scene의 Cube를 useFrame 훅 내에서 제어합니다.

```C
...
const dummy = useMemo(() => new THREE.Object3D(), []);
const boxes = useMemo(() => {
  const temp = [];
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      const x = (i - 4) _ (scale _ 1.05);
      const y = (j - Math.floor(col / 2)) _ (scale _ 1.05);
      const z = 0
      temp.push({ x, y, z });
    }
  }
  return temp;
}, [row, col]);

// 매 프레임마다 위치를 재설정하며 애니메이션 구현
useFrame(({clock}) => {
  boxes.forEach((box, i) => {
    let { x, y, z } = box;
    dummy.position.set(x, y, z + Math.sin(i + clock.getElapsedTime()));
    dummy.updateMatrix();
    imRef.current.setMatrixAt(i, dummy.matrix);
  });
  imRef.current.instanceMatrix.needsUpdate = true;
})

return (
  <instancedMesh ref={imRef}>
    <boxGeometry>
      // Shader에서 사용할 수 있도록 attribute로 instanceUv를 전달
      <instancedBufferAttribute
      attach={'attributes-instanceUv'}
      {...instanceUv}
      />
    </boxGeometry>
    <customInstancedMaterial />
  </instancedMesh>
)

```

- useFrame 훅 내에서 각 인스턴스 위치를 재설정하기 때문에 매 프레임마다 인스턴스 전체를 순회하며 위치를 설정해야 하므로 CPU 사용량이 높아집니다.

#### :pushpin: v1.0.0: Tunnel Scene과 Field Scene의 Cube들을 InstancedMesh로 교체하고 애니메이션을 Shader로 제어합니다.

```C
// Field의 InstancedMesh 구현 방식
// Field는 BoxGeometry가 row*col 행렬 배치되는 형태

...
// 행렬에서 각 instancedMesh가 배치될 좌표로 uv 생성
// (x,y) ~ (0~1,0~1)
const instanceUv = useMemo(() => {
  const temp = new Float32Array(row * col * 2);
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      temp.set([j / col, i / row], (i * col + j) * 2);
    }
  }
  // 버퍼로 전달될 uv는 1차원 배열이므로 단위를 설정 - (x,y) 좌표 단위 이므로 2로 설정
  return new THREE.InstancedBufferAttribute(temp, 2);
}, [row, col]);

// 마운트시 인스턴스 위치 초기화
useEffect(() => {
  boxes.forEach((box, i) => {
    let { x, y, z } = box;
    dummy.position.set(x, y, z);
    dummy.updateMatrix();
    (imRef.current as THREE.InstancedMesh).setMatrixAt(i, dummy.matrix);
  });
  imRef.current.instanceMatrix.needsUpdate = true;
}, [dummy, boxes]);

return (
  <instancedMesh ref={imRef}>
    <boxGeometry>
      // Shader에서 사용할 수 있도록 attribute로 instanceUv를 전달
      <instancedBufferAttribute
        attach={'attributes-instanceUv'}
        {...instanceUv}
      />
    </boxGeometry>
    <customInstancedMaterial />
  </instancedMesh>
)
```

```C
// Three.js 기존 Material을 커스텀 하는 방식 - 광원 및 그림자 등 설정을 유지하면서 셰이더 커스텀 가능
export default function CustomInstancedMaterial() {
  const materialRef = useRef<MeshStandardMaterial>();
  useLayoutEffect(() => {
    materialRef.current.onBeforeCompile = (
    shader: THREE.Shader
    ) => {
    shader.uniforms = Object.assign(shader.uniforms, {
      uTime: { value: 0 },
    });
    shader.vertexShader = shader.vertexShader.replace(
    '#include <common>',
    ` #include <common>
      uniform float uTime;
      attribute vec2 instanceUv;
    `
    );
    shader.vertexShader = shader.vertexShader.replace(
    '#include <begin_vertex>',
    ` #include <begin_vertex>
      float random = random(vec2(instanceUv.x, instanceUv.y));
      transformed.z += (sin(random*10.+uTime*0.3))*pow((dist+1.14), 11.);
    `
    );

    materialRef.current.userData.shader = shader;
  };
});

  useFrame(({ clock }) => {
    materialRef.current.userData.shader.uniforms.uTime.value =
    clock.getElapsedTime();
  });
  return <meshStandardMaterial ref={materialRef} />;
}

```

- Shader로 연산을 넘겨주면 CPU가 수행하던 연산을 GPU에 넘겨주면서 CPU 사용량을 줄일 수 있습니다.
- Shader내에서는 GPU가 각 픽셀 단위로 연산을 병렬로 처리하기 때문에 CPU가 연산 하는 것보다 효율적으로 처리할 수 있습니다.
- CPU 사용량 9~10% -> 5~6%로 개선되었습니다.
  Use CPU (useFrame) | Use GPU (Shader)
  :-------------------------:|:-------------------------:
  ![스크린샷 2024-07-03 052300](https://github.com/JaeSeong17/profile2024/assets/37216958/9c625eaa-86c3-4e3c-a050-3ee58ee15483) | ![스크린샷 2024-07-03 052406](https://github.com/JaeSeong17/profile2024/assets/37216958/d46a2b25-9035-4d28-8b8c-716bc93194f4)
