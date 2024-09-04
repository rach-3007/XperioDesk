import Sidebar from "./Components/Shared/SidebarAdmin/Sidebar";
import LoginPage from "./Pages/LoginPage";
import UserViewAllBookingsPage from "./Pages/UserViewAllBookingsPage";
import DashboardPage from "./Pages/DashboardPage";
import AnalyticsPage from "./Pages/AnalyticsPage";
// import ReportsPage from "./Pages/ReportsPage";
import SettingsPage from "./Pages/SettingsPage";
// import NotificationsPage from "./Pages/NotificationsPage";
import OfficesPage from "./Pages/OfficesPage";
import AssignRolePage from "./Pages/AssignRolePage";
import BookDesk from "./Components/BookDesk/BookDesk";
import ManageLayoutPage from "./Pages/ManageLayout/ManageLayoutPage";
import Moduless from "./Components/Offices/Moduless";
import EditLayout from "./Components/EditLayout/EditLayout";
import UserBookDesk from "./Components/UserBookDesk/UserBookDesk";
import UserBookDeskPage from "./Pages/UserBookDeskPage";
import NavBar from "./Components/Shared/NavBar/NavBar";
import { Route, Routes } from "react-router-dom";

export const AppContent = () => {
  const roleId = parseInt(localStorage.getItem("roleId") || "0", 10); // Parse roleId as a number
  
  return (
    <><div style={{display:"flex"}}>
      {roleId === 2 ? <Sidebar /> : roleId === 1 ? <NavBar /> : <p>Loading...</p>}
      <Routes>
        {/* Default route to the Login Page */}
        {/* <Route path="/" element={<LoginPage />} /> */}

        {/* Route to the Dashboard Page */}
        <Route path="/" element={<BookDesk />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/reports" element={<UserBookDesk />} />
        {/* <Route path="/notifications" element={<NotificationsPage />} /> */}
        <Route path="/assign-role" element={<AssignRolePage />} />
        <Route path="/book-desk" element={<BookDesk />} />
        <Route path="/userbook-desk" element={<UserBookDeskPage />} />
        <Route path="/edit-layout" element={<EditLayout />} />
        <Route path="/offices" element={<OfficesPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/manage-layout" element={<ManageLayoutPage />} />
        <Route path="/modules" element={<Moduless />} />

        {/* Route to User View All Bookings Page */}
        <Route path="/user/bookings" element={<UserViewAllBookingsPage />} />
      </Routes>
      </div>
    </>
  );
};
