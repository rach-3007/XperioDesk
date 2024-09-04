import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";

interface Booking {
  id: number;
  start_date: string;
  end_date: string;
  seat: string;
}

const MyBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    // Fetch bookings from API
    const fetchBookings = async () => {
      try {
        const response = await axios.get("/api/bookings/user"); // Adjust the URL as needed
        const bookingData = response.data.data.map((booking: any) => ({
          id: booking.seat_id, // Assuming seat_id is unique
          start_date: booking.start_date,
          end_date: booking.end_date,
          seat: booking.booked_by, // Replace with actual seat data if needed
        }));
        setBookings(bookingData);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId: number) => {
    try {
      await axios.post("/api/user/cancel-booking", { booking_id: bookingId });
      setBookings(bookings.filter((booking) => booking.id !== bookingId));
      alert("Booking canceled successfully.");
    } catch (error) {
      console.error("Error canceling booking:", error);
      alert("Failed to cancel the booking.");
    }
  };

  return (
    <Box
      sx={{
        p: 4,
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#04122E",
          display: "flex",
          color: "#fff",
          p: 2,
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <Typography sx={{ pl: 4 }} variant="h4">
          My Bookings
        </Typography>
      </Box>
      <Box sx={{ mt: 10 }}>
        <Typography
          sx={{
            display: "flex",
            color: "#04122E",
            fontWeight: "1000",
            fontSize: "1.5rem",
          }}
          variant="h6"
        >
          Seats
        </Typography>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {bookings.map((booking) => (
            <Grid item xs={12} sm={6} md={6} key={booking.id}>
              <Card sx={{ borderRadius: 2, boxShadow: 1, py: 3, px: 4 }}>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      py: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        mb: 1,
                        backgroundColor: "#D9D9D9",
                        borderRadius: 10,
                        px: 1,
                        fontWeight: "800",
                        fontSize: "1.1rem",
                      }}
                    >
                      {booking.start_date}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        mb: 1,
                        backgroundColor: "#D9D9D9",
                        borderRadius: 10,
                        px: 1,
                        fontWeight: "800",
                        fontSize: "1.1rem",
                      }}
                    >
                      {booking.end_date}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      py: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
                    >
                      Selected Seat:
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
                    >
                      {booking.seat}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 2,
                      py: 1,
                    }}
                  >
                    <Button
                      variant="outlined"
                      sx={{
                        backgroundColor: "#04122E",
                        color: "white",
                        fontSize: "1.1rem",
                      }}
                      onClick={() => handleCancelBooking(booking.id)}
                    >
                      Cancel Booking
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default MyBookings;
