import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./Components/Shared/SidebarAdmin/Sidebar"; 
import LoginPage from "./Pages/LoginPage";
import UserViewAllBookingsPage from "./Pages/UserViewAllBookingsPage";
import DashboardPage from "./Pages/DashboardPage";
// import AnalyticsPage from "./Pages/AnalyticsPage";
import ReportsPage from "./Pages/ReportsPage";
import SettingsPage from "./Pages/SettingsPage";
// import NotificationsPage from "./Pages/NotificationsPage";
import OfficesPage from "./Pages/OfficesPage";
import AssignRolePage from "./Pages/AssignRolePage";
// import BookDeskPage from "./Pages/BookDeskPage";
import ManageLayoutPage from "./Pages/ManageLayoutPage";

const AppContent = () => {
  const location = useLocation();

  const isLoginPage = location.pathname === "/";

  return (
    <div style={{ display: 'flex' }}>
      {!isLoginPage && <Sidebar />}
      <div style={{ flexGrow: 1 }}>
        <Routes>
          {/* Default route to the Login Page */}
          <Route path="/" element={<LoginPage />} />

          {/* Route to the Dashboard Page */}
          <Route path="/home" element={<DashboardPage />} />
          {/* <Route path="/analytics" element={<AnalyticsPage />} /> */}
          <Route path="/reports" element={<ReportsPage />} />
          {/* <Route path="/notifications" element={<NotificationsPage />} /> */}
          <Route path="/assign-role" element={<AssignRolePage />} />
          {/* <Route path="/book-desk" element={<BookDeskPage />} /> */}
          <Route path="/offices" element={<OfficesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/manage-layout" element={<ManageLayoutPage />} />

          {/* Route to User View All Bookings Page */}
          <Route path="/user/bookings" element={<UserViewAllBookingsPage />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
