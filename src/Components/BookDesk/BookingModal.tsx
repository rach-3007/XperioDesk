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
  selectedSeat: any;
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

const BookingModal: React.FC<BookingModalProps> = ({ open, onClose, selectedSeat }) => {
  const seatId = selectedSeat?.id || "";  
  const [activeTab, setActiveTab] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(dayjs());
  const [selectedEndDate, setSelectedEndDate] = useState<Dayjs | null>(dayjs()); 
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/admin/users");
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

    if (!selectedUser || !seatId || !selectedDate || !selectedEndDate) {
      console.error("Missing required booking data");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/admin/assign-seat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          seat_id: seatId,
          user_id: selectedUser.id,
          start_date: selectedDate.format("YYYY-MM-DD"),
          end_date: selectedEndDate.format("YYYY-MM-DD"),
          booked_by: 1, 
        }),
      });

      if (response.ok) {
        const bookingData = await response.json();
        console.log("Booking successful:", bookingData);
        onClose();
      } else {
        const errorData = await response.json();
        console.error("Booking failed:", errorData);
      }
    } catch (error) {
      console.error("Error during booking:", error);
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
                        marginBottom: "10px",
                      }}
                    >
                      <Autocomplete
                        options={users}
                        getOptionLabel={(option) => option.name}
                        value={selectedUser}
                        onChange={(event, newValue) => setSelectedUser(newValue)}
                        renderInput={(params) => (
                          <TextField {...params} label="User Name" />
                        )}
                        fullWidth
                        sx={{ marginBottom: "10px" }}
                      />

                      <DatePicker
                        label="Start Date"
                        value={selectedDate}
                        onChange={(newValue) => setSelectedDate(newValue)}
                        format="YYYY-MM-DD"
                        fullWidth
                        sx={{ marginBottom: "10px" }}
                      />

                      <DatePicker
                        label="End Date"
                        value={selectedEndDate}
                        onChange={(newValue) => setSelectedEndDate(newValue)}
                        format="YYYY-MM-DD"
                        fullWidth
                        sx={{ marginBottom: "10px" }}
                      />

                      <TimePicker
                        label="Select Time"
                        value={selectedTime}
                        onChange={(newValue) => setSelectedTime(newValue)}
                        fullWidth
                      />
                    </Box>

                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{
                        backgroundColor: "#06236F",
                        padding: "15px",
                        color: "#F5F6FF",
                      }}
                    >
                      Submit
                    </Button>
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
