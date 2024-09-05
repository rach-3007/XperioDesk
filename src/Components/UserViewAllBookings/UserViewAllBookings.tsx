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
import dayjs from "dayjs"; // A library to handle date comparisons
 
interface Booking {
  id: number;
  start_date: string;
  end_date: string;
  seat: string;
  deleted_at?: string; // Optional field for soft delete
}
 
const MyBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
 
  useEffect(() => {
    // Fetch bookings from API
    const fetchBookings = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get("http://127.0.0.1:8000/api/bookings/user",{
          headers: {
            Authorization: `Bearer ${accessToken}`, // Include the access token
            'Content-Type': 'application/json', // Optional: specify content type
          },
        });
        const bookingData = response.data.data.map((booking: any) => ({
          id: booking.id,
          start_date: booking.start_date,
          end_date: booking.end_date,
          seat: booking.seat_id,
          deleted_at: booking.deleted_at, // Add this field to check if booking is deleted
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
      const accessToken = localStorage.getItem("accessToken");
      await axios.post("http://127.0.0.1:8000/api/user/cancel-booking", { booking_id: bookingId },{
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the access token
          'Content-Type': 'application/json', // Optional: specify content type
        },
      });
      setBookings(bookings.filter((booking) => booking.id !== bookingId));
      alert("Booking canceled successfully.");
    } catch (error) {
      console.error("Error canceling booking:", error);
      alert("Failed to cancel the booking.");
    }
  };
 
  const isBookingActive = (startDate: string, endDate: string) => {
    const today = dayjs();
    return today.isAfter(dayjs(startDate)) && today.isBefore(dayjs(endDate));
  };
 
  return (
    <>
    <Box
      sx={{
        pl: 4,
        backgroundColor: "white",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        overflowX:"hidden"
      }}
    >
      
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          display: "flex",
          color: "#fff",
          p: 2,
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          boxShadow:"5"
        }}
      >
        <Typography sx={{ color:"#04122E",fontWeight:"bold",mt:7}} variant="h5">
    My Bookings
  </Typography>
      </Box>
      <Box sx={{ mt:20 }}>
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
              <Card sx={{ borderRadius: 2, boxShadow: 1, py: 1 , px: 5 }}>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      py: 1,
                    }}
                  >
                     <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        py: 1,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: "800", fontSize: "1.1rem",ml:"11px" }}
                      >
                        Seat No:
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{px:1, fontWeight: "bold",backgroundColor: "#D9D9D9",borderRadius:"10px", fontSize: "1.1rem" ,mr:9.5,width:"40px"}}
                      >
                        {booking.seat}
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
                        sx={{
                          // backgroundColor: "#D9D9D9",
                          borderRadius: 10,
                          px: 1,
                          fontWeight: "800",
                          fontSize: "1.1rem",
                          ml:"2px"
                        }}
                      >
                        Start Date:
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          backgroundColor: "#D9D9D9",
                          borderRadius: 10,
                          px: 1,
                          fontWeight: "800",
                          fontSize: "1.1rem",
                          mr:"20px",
                        }}
                      >
                        {dayjs(booking.start_date).format("YYYY-MM-DD")}
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
                        sx={{
                          // backgroundColor: "#D9D9D9",
                          borderRadius: 10,
                          px: 1,
                          fontWeight: "800",
                          fontSize: "1.1rem",
                          ml:"2px"
                        }}
                      >
                        End Date:
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          backgroundColor: "#D9D9D9",
                          borderRadius: 10,
                          px: 1,
                          fontWeight: "800",
                          fontSize: "1.1rem",
                          mr:"20px",
                        }}
                      >
                        {dayjs(booking.end_date).format("YYYY-MM-DD")}
                      </Typography>
                    </Box>
                   
                    {booking.deleted_at ? (
                      <Typography
                        variant="body2"
                        sx={{
                          color: "red",
                          fontWeight: "bold",
                          fontSize: "1.1rem",
                          mt: 2,
                          ml:"9px"
                        }}
                      >
                        Booking Cancelled
                      </Typography>
                    ) : (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mt: 2,
                          py: 1,
                        }}
                      >
                        {isBookingActive(booking.start_date, booking.end_date) && (
                          <Button
                            variant="outlined"
                            sx={{
                              backgroundColor: "#04122E",
                              color: "white",
                              fontSize: "1rem",
                              height:30
                            }}
                            onClick={() => handleCancelBooking(booking.id)}
                          >
                            Cancel Booking
                          </Button>
                        )}
                      </Box>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
    </>
  );
};
 
export default MyBookings;