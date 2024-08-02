import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Card,
  CardContent,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const Home: React.FC = () => {
  const [building, setBuilding] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'center', mb:1 }}>
        <FormControl sx={{ minWidth: 800 }}>
          <InputLabel>Building</InputLabel>
          <Select
            value={building}
            onChange={(e) => setBuilding(e.target.value as string)}
          >
            <MenuItem value="Gayathri Block, Technopark">
              Gayathri Block, Technopark
            </MenuItem>
            <MenuItem value="Thejaswini Block, Technopark">
              Thejaswini Block, Technopark
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ display: "flex", justifyContent:"center" ,mb:2 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker sx={{ maxWidth: 200 ,mr:5}}
            label="Start Date"
            value={startDate}
            onChange={(date) => setStartDate(date)}
            slotProps={{
              textField: {
                variant: "outlined",
                fullWidth: true,
                margin: "normal",
              },
            }}
          />
          <DatePicker sx={{ maxWidth: 200 }}
            label="End Date"
            value={endDate}
            onChange={(date) => setEndDate(date)}
            slotProps={{
              textField: {
                variant: "outlined",
                fullWidth: true,
                margin: "normal",
              },
            }}
          />
        </LocalizationProvider>
      </Box>
      <Box sx={{ display: "flex", justifyContent: 'center', mb: 4 }}>
        <Button variant="contained">Book</Button>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Typography variant="h5">Recent Bookings</Typography>
        <Typography variant="h5">Upcoming Bookings</Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <Card key={index} sx={{ minWidth: 200 }}>
              <CardContent>
                <Typography variant="h6">Booking Date</Typography>
                <Typography>9:00 AM - 4:00 PM</Typography>
                <Typography>Seat: TYM2-M1-WS-21</Typography>
              </CardContent>
            </Card>
          ))}
      </Box>
    </Container>
  );
};

export default Home;
