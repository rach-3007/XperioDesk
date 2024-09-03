<<<<<<< HEAD
// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   Button,
//   Box,
//   Slide,
//   Typography,
//   styled,
// } from "@mui/material";
// import { DatePicker } from "@mui/x-date-pickers";
// import dayjs, { Dayjs } from "dayjs";

// interface BookingModalProps {
//   open: boolean;
//   onClose: () => void;
//   seatId: number;
// }

// const Transition = React.forwardRef(function Transition(
//   props: any,
//   ref: React.Ref<unknown>
// ) {
//   return <Slide direction="left" ref={ref} {...props} />;
// });

// const RightSideBox = styled(Box)(({ theme }) => ({
//   position: "absolute",
//   right: 0,
//   top: 0,
//   height: "100%",
//   width: "400px",
//   backgroundColor: "#F5F6FF",
//   boxShadow: theme.shadows[5],
// }));

// const BookingModal: React.FC<BookingModalProps> = ({ open, onClose, seatId }) => {
//   const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
//   const [selectedEndDate, setSelectedEndDate] = useState<Dayjs | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [message, setMessage] = useState<string | null>(null);

//   const handleBookingSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     // Check if both dates are selected
//     if (!selectedDate || !selectedEndDate) {
//       setError("Please select both start and end dates.");
//       return;
//     }

//     // Log the dates for debugging
//     console.log("Selected start date:", selectedDate.format("YYYY-MM-DD"));
//     console.log("Selected end date:", selectedEndDate.format("YYYY-MM-DD"));

//     // Prepare payload
//     const payload = {
//       seat_id: seatId,
//       start_date: selectedDate.format("YYYY-MM-DD"),
//       end_date: selectedEndDate.format("YYYY-MM-DD"),
//     };

//     try {
//       const response = await fetch("http://127.0.0.1:8000/api/user/book-seat", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${localStorage.getItem("token")}`, // Add authorization token if needed
//         },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         const bookingData = await response.json();
//         console.log("Booking successful:", bookingData);
//         setMessage("Booking successful!");
//         setError(null); // Clear any previous errors
//         onClose(); // Close the modal after successful booking
//       } else {
//         const errorData = await response.json();
//         console.error("Booking failed:", errorData);
//         setError(errorData.error || "Booking failed.");
//         setMessage(null); // Clear any previous messages
//       }
//     } catch (error) {
//       console.error("Error during booking:", error);
//       setError("An error occurred while booking the seat.");
//       setMessage(null); // Clear any previous messages
//     }
//   };

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       TransitionComponent={Transition}
//       keepMounted
//       fullScreen
//       sx={{
//         "& .MuiDialog-paper": {
//           position: "absolute",
//           right: 0,
//           top: 0,
//           height: "100vh",
//           width: "400px",
//           margin: 0,
//         },
//       }}
//     >
//       <RightSideBox>
//         <Box sx={{ backgroundColor: "#F5F6FF" }}>
//           <DialogContent>
//             <Box
//               sx={{
//                 backgroundColor: "#F5F6FF",
//                 maxWidth: "450px",
//                 height: "900px",
//               }}
//             >
//               <DialogContent>
//                 <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
//                   <Typography variant="body1">
//                     Gayathri Building <br /> Phase 1 TechnoPark
//                   </Typography>
//                 </Box>

//                 <Box
//                   sx={{
//                     padding: "10px",
//                     backgroundColor: "#F5F6FF",
//                     borderRadius: "2px",
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: "16px",
//                   }}
//                 >
//                   {/* From Section */}
//                   <Box
//                     sx={{
//                       display: "flex",
//                       flexDirection: "column",
//                       gap: "8px",
//                     }}
//                   >
//                     <Typography
//                       variant="subtitle2"
//                       sx={{ fontWeight: "bold" }}
//                     >
//                       From:
//                     </Typography>
//                     <Box
//                       sx={{
//                         display: "flex",
//                         flexDirection: "column",
//                         gap: "10px",
//                       }}
//                     >
//                       <DatePicker
//                         label="Select Date"
//                         value={selectedDate}
//                         onChange={(newValue) => setSelectedDate(newValue)}
//                         slotProps={{
//                           textField: {
//                             variant: "outlined",
//                             error: false,
//                           },
//                         }}
//                       />
//                     </Box>
//                   </Box>

//                   {/* To Section */}
//                   <Box
//                     sx={{
//                       display: "flex",
//                       flexDirection: "column",
//                       gap: "8px",
//                     }}
//                   >
//                     <Typography
//                       variant="subtitle2"
//                       sx={{ fontWeight: "bold" }}
//                     >
//                       To:
//                     </Typography>
//                     <Box
//                       sx={{
//                         display: "flex",
//                         flexDirection: "column",
//                         gap: "10px",
//                       }}
//                     >
//                       <DatePicker
//                         label="Select Date"
//                         value={selectedEndDate}
//                         onChange={(newValue) => setSelectedEndDate(newValue)}
//                         slotProps={{
//                           textField: {
//                             variant: "outlined",
//                             error: false,
//                           },
//                         }}
//                       />
//                     </Box>
//                   </Box>

//                   <Button
//                     type="submit"
//                     variant="contained"
//                     fullWidth
//                     sx={{
//                       marginTop: "20px",
//                       backgroundColor: "#04122E",
//                       "&:hover": {
//                         backgroundColor: "#0F0d21",
//                       },
//                     }}
//                     onClick={handleBookingSubmit} // Trigger the booking function on click
//                   >
//                     Confirm
//                   </Button>

//                   {/* Display error or success message */}
//                   {error && <Typography color="error">{error}</Typography>}
//                   {message && <Typography color="success">{message}</Typography>}
//                 </Box>
//               </DialogContent>
//             </Box>
//           </DialogContent>
//         </Box>
//       </RightSideBox>
//     </Dialog>
//   );
// };

// export default BookingModal;

=======
>>>>>>> a4293540fb499591f5dcc70d97998fe0bd53cd9b
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  Button,
  Box,
  Slide,
  Typography,
  styled,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  seatId: number;
}

const Transition = React.forwardRef(function Transition(
  props: any,
  ref: React.Ref<unknown>
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const RightSideBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  right: 0,
  top: 0,
  height: "100%",
  width: "400px",
  backgroundColor: "#F5F6FF",
  boxShadow: theme.shadows[5],
}));

const BookingModal: React.FC<BookingModalProps> = ({ open, onClose, seatId }) => {
    console.log("Seat ID:", seatId);

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Dayjs | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleBookingSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    if (!selectedDate || !selectedEndDate) {
      setError("Please select both start and end dates.");
      return;
    }
  
    const startDate = dayjs(selectedDate).format("YYYY-MM-DD");
    const endDate = dayjs(selectedEndDate).format("YYYY-MM-DD");
  
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    console.log("Seat ID:", seatId.id); // Use seatId.id since seatId is an object

    const payload = {
        seat_id: seatId.id, // Use only the seat ID
        start_date: startDate,
      end_date: endDate,
    };
  
    try {
      const response = await fetch("http://127.0.0.1:8000/api/user/book-seat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzI1Mjk4MTUwLCJleHAiOjE3MjUzMDE3NTAsIm5iZiI6MTcyNTI5ODE1MCwianRpIjoiREdtbGpVQ3JycEZhcFJmTiIsInN1YiI6IjY2IiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.jmZKkWTnQwHcLMvxuUgXzQ_JQjqgIv85apTFlDPYyCY`, // Include the access token here
          },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        const bookingData = await response.json();
        console.log("Booking successful:", bookingData);
        setMessage("Booking successful!");
        setError(null);
        onClose();
      } else {
        const errorData = await response.json();
        console.error("Booking failed:", errorData);
        setError(errorData.error || "Booking failed.");
        setMessage(null);
      }
    } catch (error) {
      console.error("Error during booking:", error);
      setError("An error occurred while booking the seat.");
      setMessage(null);
    }
  };
  

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      keepMounted
      fullScreen
      sx={{
        "& .MuiDialog-paper": {
          position: "absolute",
          right: 0,
          top: 0,
          height: "100vh",
          width: "400px",
          margin: 0,
        },
      }}
    >
      <RightSideBox>
        <Box sx={{ backgroundColor: "#F5F6FF" }}>
          <DialogContent>
            <Box
              sx={{
                backgroundColor: "#F5F6FF",
                maxWidth: "450px",
                height: "900px",
              }}
            >
              <DialogContent>
                <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
                  <Typography variant="body1">
                    Gayathri Building <br /> Phase 1 TechnoPark
                  </Typography>
                </Box>

                <Box
                  sx={{
                    padding: "10px",
                    backgroundColor: "#F5F6FF",
                    borderRadius: "2px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  {/* From Section */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: "bold" }}
                    >
                      From:
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <DatePicker
                        label="Select Date"
                        value={selectedDate}
                        onChange={(newValue) => setSelectedDate(newValue)}
                        slotProps={{
                          textField: {
                            variant: "outlined",
                            error: false,
                          },
                        }}
                      />
                    </Box>
                  </Box>

                  {/* To Section */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: "bold" }}
                    >
                      To:
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <DatePicker
                        label="Select Date"
                        value={selectedEndDate}
                        onChange={(newValue) => setSelectedEndDate(newValue)}
                        slotProps={{
                          textField: {
                            variant: "outlined",
                            error: false,
                          },
                        }}
                      />
                    </Box>
                  </Box>

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      marginTop: "20px",
                      backgroundColor: "#04122E",
                      "&:hover": {
                        backgroundColor: "#0F0d21",
                      },
                    }}
                    onClick={handleBookingSubmit}
                  >
                    Confirm
                  </Button>

                  {/* Display error or success message */}
                  {error && <Typography color="error">{error}</Typography>}
                  {message && <Typography color="success">{message}</Typography>}
                </Box>
              </DialogContent>
            </Box>
          </DialogContent>
        </Box>
      </RightSideBox>
    </Dialog>
  );
};

<<<<<<< HEAD
export default BookingModal;
=======
export default BookingModal;
>>>>>>> a4293540fb499591f5dcc70d97998fe0bd53cd9b
