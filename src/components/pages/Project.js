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
    onContentLoaded(null);
  }, []);

  return (
    <>
      <h1 className="lg">{slug}</h1>
      <div>{project?.content}</div>
      <img className="project__img" src={project?.image}></img>
    </>
  );
};

export default Test;
