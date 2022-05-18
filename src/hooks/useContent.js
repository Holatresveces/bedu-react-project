import { useEffect, useState } from "react";

const useData = () => {
  const [data, setData] = useState();

  useEffect(() => {
    fetch("/data.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const { projects } = data;
        setData(projects);
      });
  }, []);

  return data;
};

export default useData;
