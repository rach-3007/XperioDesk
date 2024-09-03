import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Sidebar from "./Components/Shared/SidebarAdmin/Sidebar";
import LoginPage from "./Pages/LoginPage";
import UserViewAllBookingsPage from "./Pages/UserViewAllBookingsPage";
import DashboardPage from "./Pages/DashboardPage";
import AnalyticsPage from "./Pages/AnalyticsPage";
import ReportsPage from "./Pages/ReportsPage";
import SettingsPage from "./Pages/SettingsPage";
import UserBookDeskPage from './Pages/UserBookDeskPage';
// import NotificationsPage from "./Pages/NotificationsPage";
import OfficesPage from "./Pages/OfficesPage";
import AssignRolePage from "./Pages/AssignRolePage";
import BookDesk from "./Components/BookDesk/BookDesk";
import ManageLayoutPage from "./Pages/ManageLayout/ManageLayoutPage";
import Moduless from "./Components/Offices/Moduless";
import NavBar from "./Components/Shared/NavBar/NavBar";

const AppContent = () => {
  const location = useLocation();

  const isLoginPage = location.pathname === "/";
const isUserBookDeskPage=location.pathname==="/userbook-desk";
  return (
    <div style={{ display: "flex" }}>
      {!isLoginPage && !isUserBookDeskPage && <Sidebar />}
      {isUserBookDeskPage && <NavBar />}
      <div style={{ flexGrow: 1 }}>
        <Routes>
          {/* Default route to the Login Page */}
          <Route path="/" element={<LoginPage />} />

          {/* Route to the Dashboard Page */}
          <Route path="/home" element={<DashboardPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          {/* <Route path="/notifications" element={<NotificationsPage />} /> */}
          <Route path="/assign-role" element={<AssignRolePage />} />
          <Route path="/book-desk" element={<BookDesk />} />
          <Route path="/offices" element={<OfficesPage />} />
          <Route path="/userbook-desk" element={<UserBookDeskPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/manage-layout" element={<ManageLayoutPage />} />
          <Route path="/modules" element={<Moduless />} />

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
