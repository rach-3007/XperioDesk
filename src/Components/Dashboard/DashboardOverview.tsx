// DashboardOverview.tsx
import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import {
  AccessTime,
  EventAvailable,
  People,
  PieChart,
  BarChart,
} from "@mui/icons-material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const DashboardOverview: React.FC = () => {
  const overviewItems = [
    { title: "All Bookings", value: "230", icon: <EventAvailable /> },
    { title: "Available Seats", value: "230", icon: <People /> },
    { title: "Avg Desk Hours", value: "7 Hours", icon: <AccessTime /> },
    { title: "Booking Rate", value: "75%", icon: <PieChart /> },
    { title: "Booked Seats", value: "120", icon: <EventAvailable /> },
    { title: "Utilization Rate", value: "75%", icon: <BarChart /> },
  ];
  const Notif = [
    { title: "Notifications", value: "0 Pending", icon: <ArrowRightAltIcon /> },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ flex: 1, display: "flex", flexWrap: "wrap", gap: 2 }}>
        <Grid container rowSpacing={6} columnSpacing={1}>
          {overviewItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  minWidth: 50,
                }}
              >
                <Box>
                  <Typography variant="h8">{item.title}</Typography>
                  <Typography sx={{ fontWeight:'bold'}} variant="h6">{item.value}</Typography>
                </Box>
                {item.icon}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box
        sx={{
          width: 300,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          ml: 2,
        }}
      >
        {Notif.map((item, index) => (
          <Paper
            key={index}
            sx={{
              p: 2,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography sx={{ fontColor: "#525151" }} variant="h6">
                {item.title}
              </Typography>
              <Typography variant="h6">{item.value}</Typography>
            </Box>
            {item.icon}
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default DashboardOverview;
