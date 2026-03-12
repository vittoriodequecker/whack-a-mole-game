import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import GamePage from "../pages/GamePage";

const AppRoutes: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<GamePage />} />
    </Routes>
  </Router>
);

export default AppRoutes;