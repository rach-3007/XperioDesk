import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";

import DashboardPage from "./Pages/DashboardPage";
import AnalyticsPage from "./Pages/AnalyticsPage";
import ReportsPage from "./Pages/ReportsPage";





const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        
        <Route
          path="/home"
          element={<DashboardPage />}
        />
        <Route
          path="/Analytics"
          element={<AnalyticsPage/>}
        />
         <Route
          path="/Reports"
          element={<ReportsPage/>}
        />
        


       
      </Routes>
      

    </Router>
  );
};

export default App;
