import { Routes, Route } from "react-router-dom";
import IndexPage from "./pages/Index";
import ProjectPage from "./pages/Project";

const Content = ({ onContentLoaded }) => {
  return (
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
  );
};

export default Content;
