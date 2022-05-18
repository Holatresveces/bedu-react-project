import { useEffect, useRef, useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useTexture, useFBO } from "@react-three/drei";
import ImageElement from "./ImageElement";
import gsap from "gsap";

const perspective = 5;

const Scene = ({ data, smoothScroll }) => {
  console.log("data", data);
  const ref = useRef();

  const textures = useTexture(
    !data ? [] : data.map((imgElement) => imgElement.src)
  );

  const { size, gl, scene, camera } = useThree();

  const [imgData, setImgData] = useState();

  const loadImageData = () => {
    const images = data ? data : [];

    const imgData = images.map((image) => {
      const src = image.src;
      const { left, top, width, height } =
        image.domElement.getBoundingClientRect();

      const bounds = {
        left,
        top: top + (smoothScroll ? smoothScroll.currentPos : window.scrollY),
        width,
        height,
        initX: left + width / 2 - size.width / 2,
        initY: -top - height / 2 + size.height / 2,
      };

      return {
        src,
        bounds,
      };
    });

    setImgData(imgData);
  };

  useEffect(() => {
    if (!smoothScroll) return;
    smoothScroll.on("update", ({ currentPos }) => {
      if (!ref.current) return;
      ref.current.position.y = currentPos;
      gl.render(scene, camera);
    });
  }, [smoothScroll]);

  useEffect(() => {
    camera.fov = (2 * Math.atan(size.height / 2 / perspective) * 180) / Math.PI;
    camera.updateProjectionMatrix();
    loadImageData();
  }, [size, data]);

  return (
    <>
      <group ref={ref} position={[0, 0, 0]}>
        {imgData?.map((img, index) => {
          const { bounds } = img;
          return (
            <ImageElement
              key={index}
              bounds={bounds}
              texture={textures[index]}
              smoothScroll={smoothScroll}
            />
          );
        })}
      </group>
    </>
  );
};

export default Scene;
