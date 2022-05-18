import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useContent from "../../hooks/useContent";

const Test = ({ onContentLoaded }) => {
  const location = useLocation();
  const slug = location.pathname.replace("/projects/", "");

  const data = useContent();

  const project = data?.find((item) => {
    return item.slug === slug;
  });

  useEffect(() => {
    if (!data) return;

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
  }, [data]);

  return (
    <>
      <h1 className="lg">{slug}</h1>
      <div>{project?.content}</div>
      <img className="project__img" src={project?.image}></img>
    </>
  );
};

export default Test;
