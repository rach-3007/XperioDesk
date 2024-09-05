import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  Tabs,
  Tab,
  TextField,
  Button,
  Box,
  Slide,
  Typography,
  styled,
  Snackbar,
  Alert, // Import Alert for better styling of Snackbar messages
  Autocomplete,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  seat: {
    id: number;
    name: string;
  } | null;
  onBookingSuccess: () => void;
}

const Transition = React.forwardRef(function Transition(props: any, ref: React.Ref<unknown>) {
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

interface User {
  id: number;
  name: string;
}

const BookingModal: React.FC<BookingModalProps> = ({ open, onClose, seat ,onBookingSuccess }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [selectedEndDate, setSelectedEndDate] = useState<Dayjs | null>(dayjs());
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false); // State for showing the Snackbar


  useEffect(() => {
    if (seat) {
      console.log("Selected Seat ID:", seat.id);
    }
  }, [seat]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch("http://127.0.0.1:8000/api/admin/users", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`, // Include the access token
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        if (
          Array.isArray(data.data) &&
          data.data.every((item) => typeof item.id === "number" && typeof item.name === "string")
        ) {
          setUsers(data.data);
        } else {
          console.error("Invalid API response format:", data);
          setUsers([]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      }
    };

    fetchUsers();
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleBookingSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    if (!selectedUser || !seat || !selectedDate || !selectedEndDate) {
      console.error("Missing required booking data");
      alert("Missing required booking data");
      return;
    }
  
    // Ensure selectedDate and selectedEndDate are Dayjs objects
    const startDate = dayjs(selectedDate);
    const endDate = dayjs(selectedEndDate);
  
    if (!startDate.isValid() || !endDate.isValid()) {
      console.error("Invalid date format");
      alert("Invalid date format");
      return;
    }
  
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch("http://127.0.0.1:8000/api/admin/assign-seat", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          layout_entity_id: seat.id,
          user_id: selectedUser.id,
          start_date: startDate.format("YYYY-MM-DD"),
          end_date: endDate.format("YYYY-MM-DD"),
          booked_by: 1,
        }),
      });
  
      if (response.ok) {
        const bookingData = await response.json();
        console.log("Booking successful:", bookingData);
        setMessage("Booking successful!");
        setError(null);
        setShowSnackbar(true); 

        onClose();
      } else {
        const errorData = await response.json();
        console.error("Booking failed:", errorData);
        setError(errorData.error || "Booking failed.");
        setMessage(null);
        setShowSnackbar(true); // Show the Snackbar
      }
    } catch (error) {
      console.error("Error during booking:", error);
      setError("An error occurred while booking the seat.");
      setMessage(null);
      setShowSnackbar(true); // Show the Snackbar
    }
  };
  

  const handlePermanentBookingSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedUser || !seat) {
      console.error("Missing required booking data");
      setError("Missing required Booking data");
      setMessage(null);
      return;
    }

    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch("http://127.0.0.1:8000/api/assign-permanent-seat", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          layout_entity_id: seat.id,
          user_id: selectedUser.id,
          booked_by: 1,
        }),
      });

      if (response.ok) {
        const bookingData = await response.json();
        console.log("Permanent Booking successful:", bookingData);
        onClose();
        setMessage("Permanent Booking successful!");
        setError(null);
        setShowSnackbar(true); // Show the Snackbar

       
      } else {
        const errorData = await response.json();
        console.error("Permanent Booking failed:", errorData);
        setError(errorData.error || "Permanent Booking failed.");
        setMessage(null);
        setShowSnackbar(true); // Show the Snackbar
      }
    } catch (error) {
      console.error("Error during permanent booking:", error);
      setError("Error during permanent booking.");
      setMessage(null);
      setShowSnackbar(true); // Show the Snackbar
    }
  };

  useEffect(() => {
    // Show Snackbar whenever there's a message or error
    if (message || error) {
      setShowSnackbar(true);
    }
  }, [message, error]);

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
    setMessage(null);
    setError(null);
  };

  return (
    <>
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
          maxHeight: "100vh",
        },
      }}
    >
      <RightSideBox>
        <Box sx={{ backgroundColor: "#F5F6FF", height: "100%" }}>
          <DialogContent sx={{ height: "100%", padding: "0" }}>
            <Box
              sx={{
                backgroundColor: "#F5F6FF",
                maxWidth: "450px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
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
                    marginBottom: "10px",
                    backgroundColor: "#06236F",
                    padding: "1px",
                  }}
                >
                  <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    scrollable
                    sx={{
                      ".MuiTab-root": {
                        color: "white",
                      },
                      ".Mui-selected": {
                        color: "white",
                      },
                      ".MuiTabs-indicator": {
                        backgroundColor: "white",
                      },
                    }}
                  >
                    <Tab label="One-Time " />
                    <Tab label="Permanent " />
                  </Tabs>
                </Box>
                {activeTab === 0 && (
                  <form onSubmit={handleBookingSubmit}>
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
                      <Autocomplete
                        options={users}
                        getOptionLabel={(option) => option.name}
                        onChange={(event, newValue) => {
                          setSelectedUser(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} label="Select User" required />
                        )}
                        value={selectedUser}
                      />
                      <DatePicker
                        label="Start Date"
                        value={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        renderInput={(params) => <TextField {...params} required />}
                      />
                      <DatePicker
                        label="End Date"
                        value={selectedEndDate}
                        onChange={(date) => setSelectedEndDate(date)}
                        renderInput={(params) => <TextField {...params} required />}
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          backgroundColor: "#06236F",
                          color: "white",
                          fontSize: "10px",
                          borderRadius: "0",
                          "&:hover": {
                            backgroundColor: "#c90d00",
                          },
                        }}
                      >
                        Book Seat
                      </Button>
                    </Box>
                  </form>
                )}
                {activeTab === 1 && (
                  <form onSubmit={handlePermanentBookingSubmit}>
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
                      <Autocomplete
                        options={users}
                        getOptionLabel={(option) => option.name}
                        onChange={(event, newValue) => {
                          setSelectedUser(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} label="Select User" required />
                        )}
                        value={selectedUser}
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          backgroundColor: "#06236F",
                          color: "white",
                          fontSize: "10px",
                          borderRadius: "0",
                          "&:hover": {
                            backgroundColor: "#c90d00",
                          },
                        }}
                      >
                        Book Permanent Seat
                      </Button>
                    </Box>
                  </form>
                )}
              </DialogContent>
            </Box>
          </DialogContent>
        </Box>
      </RightSideBox>
    </Dialog>
     {/* Snackbar for displaying messages */}
    <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={message ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {message || error}
        </Alert>
      </Snackbar>
    </>
   
  );
};

export default BookingModal;
