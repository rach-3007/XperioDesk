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
 
interface User {
  id: number;
  name: string;
}
 
const BookingModal: React.FC<BookingModalProps> = ({ open, onClose, seat }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [selectedEndDate, setSelectedEndDate] = useState<Dayjs | null>(dayjs());
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
 
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
          data.data.every((item) => {
            return typeof item.id === "number" && typeof item.name === "string";
          })
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
 
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(
        "http://127.0.0.1:8000/api/admin/assign-seat",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            layout_entity_id: seat.id,
            user_id: selectedUser.id,
            start_date: selectedDate.format("YYYY-MM-DD"),
            end_date: selectedEndDate.format("YYYY-MM-DD"),
            booked_by: 1,
          }),
        }
      );
 
      if (response.ok) {
        const bookingData = await response.json();
        console.log("Booking successful:", bookingData);
        alert("Booking Succesfull");
        onClose();
      } else {
        const errorData = await response.json();
        console.error("Booking failed:", errorData);
        alert("Booking failed")
      }
    } catch (error) {
      console.error("Error during booking:", error);
      alert("Error during booking");
    }
  };
 
  const handlePermanentBookingSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
 
    if (!selectedUser || !seat) {
      console.error("Missing required booking data");
      alert("Missing required booking data");
      return;
    }
 
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(
        "http://127.0.0.1:8000/api/assign-permanent-seat",
        {
          
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
        }
      );
 
      if (response.ok) {
        const bookingData = await response.json();
        console.log("Permanent Booking successful:", bookingData);
        alert("Permanent Booking Successful");
        onClose();
      } else {
        const errorData = await response.json();
        console.error("Permanent Booking failed:", errorData);
        alert(errorData.message);
      }
    } catch (error) {
      console.error("Error during permanent booking:", error);
      alert("Error during Permanent Booking");
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
                    <Tab label="Bulk " />
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
                          <TextField
                            {...params}
                            label="Select User"
                            variant="outlined"
                            fullWidth
                            required
                            sx={{ marginBottom: "16px" }}
                          />
                        )}
                      />
                      <DatePicker
                        label="Start Date"
                        value={selectedDate}
                        onChange={(newValue) =>
                          setSelectedDate(newValue ? dayjs(newValue) : null)
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            fullWidth
                            sx={{ marginBottom: "16px" }}
                            required
                          />
                        )}
                      />
                      {activeTab === 0 && (
                        <DatePicker
                          label="End Date"
                          value={selectedEndDate}
                          onChange={(newValue) =>
                            setSelectedEndDate(
                              newValue ? dayjs(newValue) : null
                            )
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              fullWidth
                              sx={{ marginBottom: "16px" }}
                              required
                            />
                          )}
                        />
                      )}
                      <Box sx={{ textAlign: "center" }}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          sx={{
                            width: "200px",
                            backgroundColor: "#04122E",
                            "&:hover": {
                              backgroundColor: "#0F0d21",
                            },
                          }}
                        >
                          Book Now
                        </Button>
                      </Box>
                    </Box>
                  </form>
                )}
                {activeTab === 1 && (
                  <Box
                    sx={{
                      padding: "10px",
                      backgroundColor: "#f9f9f9",
                      borderRadius: "8px",
                    }}
                  >
                    <Typography variant="body1">
                      Bulk Booking feature coming soon!
                    </Typography>
                  </Box>
                )}
                {activeTab === 2 && (
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
                          <TextField
                            {...params}
                            label="Select User"
                            variant="outlined"
                            fullWidth
                            required
                            sx={{ marginBottom: "16px" }}
                          />
                        )}
                      />
                      <Box sx={{ textAlign: "center" }}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          sx={{
                            width: "200px",
                            backgroundColor: "#04122E",
                            "&:hover": {
                              backgroundColor: "#0F0d21",
                            },
                          }}
                        >
                          Assign Permanent Seat
                        </Button>
                      </Box>
                    </Box>
                  </form>
                )}
              </DialogContent>
            </Box>
          </DialogContent>
        </Box>
      </RightSideBox>
    </Dialog>
  );
};
 
export default BookingModal;
