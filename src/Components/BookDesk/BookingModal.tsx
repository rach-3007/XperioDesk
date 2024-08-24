import React, { useState } from "react";
import {
  Dialog,
  // DialogTitle,
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

const BookingModal: React.FC<BookingModalProps> = ({ open, onClose }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(dayjs());

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
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
          {/* <DialogTitle>Confirm Booking</DialogTitle> */}
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
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      User:
                    </Typography>
                    <TextField select>
                      <MenuItem value="user1">User 1</MenuItem>
                      <MenuItem value="user2">User 2</MenuItem>
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
                          value={selectedDate}
                          onChange={(newValue) => setSelectedDate(newValue)}
                          slotProps={{
                            textField: {
                              variant: "outlined",
                              error: false,
                              // helperText: "Select a date",
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
                          backgroundColor: "#0F0d21", // Slightly darker color on hover
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
