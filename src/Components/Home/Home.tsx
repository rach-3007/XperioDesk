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
  Divider,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";


interface BookingCardProps {
  date: string;
}

const BookingCard: React.FC<BookingCardProps> = ({ date }) => (
  <Card sx={{ minWidth: 200, borderRadius: 4,}}>
    <CardContent>
      <Typography variant="h6">{date}</Typography>
      <img src="path_to_image" alt="Desk" style={{ width: "100%", borderRadius: 4, }} />
      <Typography>9:00 AM - 4:00 PM</Typography>
      <Typography>Seat: TYM2-M1-WS-21</Typography>
    </CardContent>
  </Card>
);

const Home: React.FC = () => {
  const [building, setBuilding] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <Container maxWidth="lg" sx={{ padding: '0!important'}} >
      <Box sx={{backgroundColor:"beige",minHeight:"40vh",minWidth:"100vw"}}>
      <Box sx={{ mb: 1,mt:5, display: "flex", justifyContent: "center" }}>
        <FormControl sx={{ minWidth: 800, borderRadius: 4,}}>
          <InputLabel>Building</InputLabel>
          <Select
            value={building}
            onChange={(e) => setBuilding(e.target.value as string)}
            sx={{ borderRadius: 4 }}
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
      <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(date) => setStartDate(date)}
            slotProps={{
              textField: {
                variant: "outlined",
                fullWidth: true,
                margin: "normal",
                sx: { width: "30%", mr: 5 },
                InputProps: { sx: { borderRadius: 4 } },
              },
            }}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(date) => setEndDate(date)}
            slotProps={{
              textField: {
                variant: "outlined",
                fullWidth: true,
                margin: "normal",
                sx: { width: "30%" },
                InputProps: { sx: { borderRadius: 4 } },
              },
            }}
          />
        </LocalizationProvider>
      </Box>
      <Box sx={{ textAlign: "center", mb: 1 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#0F172A",
            "&:hover": {
              backgroundColor: "#0F171B",
            },
            width: 200,
            borderRadius: 2,
          }}
        >
          Book
        </Button>
      </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent:'space-around', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'Flex-start' }}>
          <Typography variant="h5">Recent Bookings</Typography>
          <Box sx={{ display: 'flex', gap: 2,mt:1}}>
            {['29 July 2024', '26 July 2024', '22 July 2024'].map((date, index) => (
              <BookingCard key={index} date={date} />
            ))}
          </Box>
        </Box>
        <Divider orientation="vertical" flexItem sx={{ mx: 4 }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start'  }}>
          <Typography variant="h5">Upcoming Bookings</Typography>
          <Box sx={{ display: 'flex', gap: 2,mt:1}}>
            {['31 July 2024','21 July 2024'].map((date, index) => (
              <BookingCard key={index} date={date} />
            ))}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
