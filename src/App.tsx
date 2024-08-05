import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import AdminViewAllBookingsPage from './Pages/AdminViewAllBookingsPage';
import ViewOrEditBookingPage from './Pages/ViewOrEditBookingPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/admin-view-all-bookings" element={<AdminViewAllBookingsPage />} />
        <Route path="/view-or-edit-booking/:id" element={<ViewOrEditBookingPage />} />

      </Routes>
    </Router>
  );
};

export default App;
