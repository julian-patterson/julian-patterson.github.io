import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import EducationPage from "./EducationPage";
import Home from "./Home";

const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/education" element={<EducationPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default Root;
