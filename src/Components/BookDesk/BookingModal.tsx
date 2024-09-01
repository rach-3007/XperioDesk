import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  Tabs,
  Tab,
  TextField,
  Button,
  MenuItem,
  Box,
  Slide,
  Typography,
  styled,
  Autocomplete,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
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
  width: "400px", // Adjust the width as needed
  backgroundColor: "#F5F6FF", // Background color to match the dialog content
  boxShadow: theme.shadows[5], // Optional: for a subtle shadow
}));

interface User {
  id: number;
  name: string;
}

const BookingModal: React.FC<BookingModalProps> = ({ open, onClose }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(dayjs());
  const [selectedEndDate, setSelectedEndDate] = useState<Dayjs | null>(dayjs()); 

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/admin/users");
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

  //booking logic
  const seatId = "1"; // Replace with actual seat selection logic

  const handleBookingSubmit = async (event: React.FormEvent) => {
    // Create the payload object
  const payload = {
    seat_id: seatId,
    user_id: selectedUser.id,
    start_date: selectedDate.format("YYYY-MM-DD"), 
    end_date: selectedEndDate.format("YYYY-MM-DD"), 
    booked_by: 1 // Replace with Auth::user()->id from your backend
  };

  // Log the payload to the console
  console.log("Booking payload:", payload);
    event.preventDefault();

    if (!selectedUser || !seatId || !selectedDate || !selectedTime) {
      // Handle missing data (e.g., show an error message)
      console.error("Missing required booking data");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/admin/assign-seat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add any necessary authentication headers here (e.g., 'Authorization': 'Bearer ' + yourAuthToken)
        },
        body: JSON.stringify({
          seat_id: seatId,
          user_id: selectedUser.id,
          start_date: selectedDate.format("YYYY-MM-DD"), 
          end_date: selectedEndDate.format("YYYY-MM-DD"), 
          booked_by: 1 // Replace with Auth::user()->id from your backend
        }),
      });

      if (response.ok) {
        const bookingData = await response.json();
        console.log("Booking successful:", bookingData);
        onClose(); 
      } else {
        const errorData = await response.json();
        console.error("Booking failed:", errorData);
        // Display a user-friendly error message based on errorData
      }
    } catch (error) {
      console.error("Error during booking:", error);
      // Display a generic error message
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
          width: "400px", // Adjust the width as needed
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
                Height: "900px",
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
                    centered
                    sx={{
                      ".MuiTab-root": {
                        color: "white", // Default text color
                      },
                      ".Mui-selected": {
                        color: "white", // Selected tab text color
                      },
                      ".MuiTabs-indicator": {
                        backgroundColor: "white", // Underline indicator color
                      },
                    }}
                  >
                    <Tab label="One-Time" />
                    <Tab label="Bulk" />
                    <Tab label="Permanent" />
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
                        id="user-select"
                        options={users}
                        getOptionLabel={(user) => user.name}
                        value={selectedUser}
                        onChange={(event, newValue) => {
                          setSelectedUser(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select User"
                            variant="outlined"
                          />
                        )}
                        fullWidth
                        margin="normal"
                      />

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
                          <TimePicker
                            label="Select Time"
                            value={selectedTime}
                            onChange={(newValue) => setSelectedTime(newValue)}
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
                            value={selectedEndDate} // Use selectedEndDate
                            onChange={(newValue) => setSelectedEndDate(newValue)}
                            slotProps={{
                              textField: {
                                variant: "outlined",
                                error: false,
                              },
                            }}
                          />
                          <TimePicker
                            label="Select Time"
                            value={selectedTime}
                            onChange={(newValue) => setSelectedTime(newValue)}
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
                            backgroundColor: "#0F0d21", // Slightly darker color on hover
                          },
                        }}
                      >
                        Confirm
                      </Button>
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
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      Selected Seats: TVM2-M1-WS-21
                    </Typography>
                    <TextField label="Organizer" fullWidth select>
                      <MenuItem value="organizer1">Organizer 1</MenuItem>
                    </TextField>
                    <TextField label="Enter Participants" fullWidth select>
                      <MenuItem value="participant1">Participant 1</MenuItem>
                    </TextField>
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
                          value={selectedDate} // You might want separate state for Bulk tab
                          onChange={(newValue) => setSelectedDate(newValue)}
                          slotProps={{
                            textField: {
                              variant: "outlined",
                              error: false,
                            },
                          }}
                        />
                        <TimePicker
                          label="Select Time"
                          value={selectedTime} // You might want separate state for Bulk tab
                          onChange={(newValue) => setSelectedTime(newValue)}
                          slotProps={{
                            textField: {
                              variant: "outlined",
                              error: false,
                            },
                          }}
                        />
                      </Box>
                    </Box>

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
                          value={selectedDate} // You might want separate state for Bulk tab
                          onChange={(newValue) => setSelectedDate(newValue)}
                          slotProps={{
                            textField: {
                              variant: "outlined",
                              error: false,
                            },
                          }}
                        />

                        <TimePicker
                          label="Select Time"
                          value={selectedTime} // You might want separate state for Bulk tab
                          onChange={(newValue) => setSelectedTime(newValue)}
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
                      variant="contained"
                      fullWidth
                      sx={{
                        marginTop: "20px",
                        backgroundColor: "#04122E",
                        "&:hover": {
                          backgroundColor: "#0F0d21", // Slightly darker color on hover
                        },
                      }}
                    >
                      Confirm
                    </Button>
                  </Box>
                )}
                {activeTab === 2 && (
                  <Box
                    sx={{
                      padding: "10px",
                      backgroundColor: "#f9f9f9",
                      borderRadius: "8px",
                    }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      Selected Seat: TVM2-M1-WS-21
                    </Typography>
                    <TextField label="User" fullWidth select>
                      <MenuItem value="user1">User 1</MenuItem>
                      <MenuItem value="user2">User 2</MenuItem>
                    </TextField>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        marginTop: "20px",
                        backgroundColor: "#04122E",
                        "&:hover": {
                          backgroundColor: "#0F0d21", 
                        },
                      }}
                    >
                      Confirm
                    </Button>
                  </Box>
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