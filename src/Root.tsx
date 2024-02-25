import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import EducationPage from "./EducationPage";
import Home from "./HomePage";
import ProjectsPage from "./ProjectsPage";

const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/education" element={<EducationPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </Router>
  );
};

export default Root;
