import { useEffect } from "react";
import ItemCard from "../ItemCard";
import useContent from "../../hooks/useContent";

const Content = ({ onContentLoaded }) => {
  const items = useContent();

  useEffect(() => {
    if (!items) return;

    const imgElements = [...document.querySelectorAll("img")];

    const promises = imgElements.map((imgElement) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.addEventListener("load", () => {
          resolve(imgElement);
        });
        img.src = imgElement.src;
      });
    });

    Promise.all(promises).then((imgElements) => {
      const data = imgElements.map((imgElement) => {
        const src = imgElement.src;
        const { left, top, width, height } = imgElement.getBoundingClientRect();

        const bounds = {
          left,
          top: top + window.scrollY,
          width,
          height,
          initX: left + width / 2 - window.innerWidth / 2,
          initY: -top - height / 2 + window.innerHeight / 2,
        };

        console.log("bounds.initx", bounds.initX);

        return {
          domElement: imgElement,
          src,
          bounds,
        };
      });

      onContentLoaded(data);
    });
  }, [items]);

  return (
    <div className="content-container">
      <h1>Projects</h1>
      <div className="projects">
        {items?.map((item, i) => (
          <ItemCard key={i} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Content;
