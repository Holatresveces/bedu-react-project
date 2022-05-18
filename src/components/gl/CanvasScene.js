import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";

const CanvasScene = ({ data, smoothScroll }) => {
  return (
    <div className="r3f-canvas">
      <Canvas
        gl={{ toneMapping: THREE.NoToneMapping }}
        linear
        frameloop="never"
        antialias="false"
      >
        <Scene data={data} smoothScroll={smoothScroll} />
      </Canvas>
    </div>
  );
};

export default CanvasScene;
