import React from "react";
import AdminViewAllBookings from "../Components/Reports/Reports";
import NavBar from "../Components/Shared/NavBar/NavBar";
const username = "User";
const AdminViewAllBookingsPage: React.FC = () => {
  return (
    <div>
      <NavBar username={username} />
      <AdminViewAllBookings />
    </div>
  );
};

export default AdminViewAllBookingsPage;
