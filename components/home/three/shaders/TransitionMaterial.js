import { shaderMaterial } from '@react-three/drei';

const TransitionMaterial = shaderMaterial(
  {
    uProgress: 0,
    uMode: 0,
    uTexture1: undefined,
    uTexture2: undefined,
    uTransition: 0,
  },
  //vertex shader
  /*glsl*/ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,

  //fragment shader
  /*glsl*/ `
    uniform float uTime;
    uniform float uProgress;
    uniform float uMode;
    uniform int uTransition;
    uniform sampler2D uTexture1;
    uniform sampler2D uTexture2;

    varying vec2 vUv;
    
    void main() {
      vec2 uv = vUv;
      vec4 t1= texture2D(uTexture1, uv);
      vec4 t2= texture2D(uTexture2, uv);

      vec4 finalTexture;
      if(uMode == 0.){
        finalTexture = t1;
      } else {
        finalTexture = t2;
      }
     
      gl_FragColor = finalTexture;
      // gl_FragColor = mix(t1, t2, step(1.-uProgress, uv.x));
      // gl_FragColor = t1;
    }`
);

export default TransitionMaterial;
