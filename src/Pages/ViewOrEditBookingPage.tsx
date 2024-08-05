import NavBar from "../Components/Shared/NavBar/NavBar";
import ViewOrEditBooking from "../Components/VieworEditBooking/ViewOrEditBooking";

const username = "User";

const ViewOrEditBookingPage = () => {
  return (
    <div>
      <NavBar username={username} />

      <ViewOrEditBooking />
    </div>
  );
};

export default ViewOrEditBookingPage;
