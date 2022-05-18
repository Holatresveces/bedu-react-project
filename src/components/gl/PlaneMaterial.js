import { extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";

const PlaneMaterial = shaderMaterial(
  {
    uScroll: 0,
    uTexture: null,
  },
  `varying vec2 vUv;
   uniform float uScroll;
      void main() {
        vUv = uv;
        vec3 transformed = position;
        transformed.y += sin(uv.x * 3.141592) * uScroll * 0.0002;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( transformed, 1.0 );
      }`,
  `varying vec2 vUv;
      uniform float uScroll;
      uniform sampler2D uTexture;
      void main() {
        vec2 uv = vUv;
        float scroll = uScroll * 0.0001;
        float r = texture2D(uTexture, uv - vec2(0.0, scroll)).r;
        float g = texture2D(uTexture, uv).g;
        float b = texture2D(uTexture, uv + vec2(0.0, scroll)).b;
        gl_FragColor = vec4(r, g, b, 1.0);
      }`
);

extend({ PlaneMaterial });

export default PlaneMaterial;
