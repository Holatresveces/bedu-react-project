import IndexPage from "./components/pages/Index";
import ProjectPage from "./components/pages/Project";
import CanvasScene from "./components/gl/CanvasScene";
import { useEffect, useState, useMemo } from "react";
import ASScroll from "@ashthornton/asscroll";
import { Routes, Route, useLocation } from "react-router-dom";
import gsap from "gsap";

const App = () => {
  const [data, setData] = useState();
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  const [isAppMounted, setIsAppMounted] = useState(false);
  const location = useLocation();
  const smoothScroll = useMemo(() => {
    if (!isAppMounted) return;

    const asscroll = new ASScroll({
      disableRaf: true,
    });

    gsap.ticker.add(() => {
      asscroll.update();
    });

    return asscroll;
  }, [isAppMounted]);

  useEffect(() => {
    setIsAppMounted(true);
  }, []);

  useEffect(() => {
    if (!smoothScroll || !isContentLoaded) return;
    smoothScroll.enable();
  }, [isContentLoaded]);

  useEffect(() => {
    setIsContentLoaded(false);
    setData(null);
    if (smoothScroll) {
      smoothScroll.currentPos = 0;
    }
  }, [location.pathname]);

  const onContentLoaded = (data) => {
    setData(data);
    setIsContentLoaded(true);
  };

  return (
    <>
      <CanvasScene
        isContentLoaded={isContentLoaded}
        data={data}
        smoothScroll={smoothScroll}
      />
      <div asscroll-container="true" className="smooth-scroll">
        <div className="container">
          <Routes>
            <Route
              exact
              path="/"
              element={<IndexPage onContentLoaded={onContentLoaded} />}
            />
            <Route
              exact
              path="/projects/:slug"
              element={<ProjectPage onContentLoaded={onContentLoaded} />}
            />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
