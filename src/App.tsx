import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import AdminViewAllBookingsPage from "./Pages/ReportsPage";
import UserViewAllBookingsPage from "./Pages/UserViewAllBookingsPage";
import DashboardPage from "./Pages/DashboardPage";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        
        <Route
          path="//home"
          element={<DashboardPage />}
        />
       
      </Routes>
      

    </Router>
  );
};

export default App;
