import { useEffect, useRef, useState } from "react";
import "./PlaneMaterial";

const ImageElement = ({ bounds, texture, smoothScroll }) => {
  const { width, height, initX, initY } = bounds;
  const materialRef = useRef();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    smoothScroll.on("update", ({ currentPos, targetPos }) => {
      const scrollSpeed = targetPos - currentPos;
      if (materialRef.current) {
        materialRef.current.uScroll = scrollSpeed;
      }
    });
  }, [isMounted]);

  return (
    <mesh
      scale={[width, height, 1]}
      position={[initX, initY - smoothScroll?.currentPos, 0]}
    >
      <planeGeometry args={[1, 1, 10, 10]} />
      <planeMaterial uTexture={texture} ref={materialRef} />
    </mesh>
  );
};

export default ImageElement;
