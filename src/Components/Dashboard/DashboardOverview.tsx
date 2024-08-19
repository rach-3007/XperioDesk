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
    { title: "All Bookings", value: "230", icon: <EventAvailable fontSize="large" sx={{ color: '#3182CE' }} /> },
    { title: "Available Seats", value: "230", icon: <People fontSize="large" sx={{ color: '#38A169' }} /> },
    { title: "Average Desk Hours", value: "7 Hours", icon: <AccessTime fontSize="large" sx={{ color: '#DD6B20' }} /> },
    { title: "Booking Rate", value: "75%", icon: <PieChart fontSize="large" sx={{ color: '#D69E2E' }} /> },
    { title: "Booked Seats", value: "120", icon: <EventAvailable fontSize="large" sx={{ color: '#3182CE' }} /> },
    { title: "Utilization Rate", value: "75%", icon: <BarChart fontSize="large" sx={{ color: '#E53E3E' }} /> },
  ];

  const Notif = [
    { title: "Notifications", value: "0 Pending", icon: <ArrowRightAltIcon fontSize="large" sx={{ color: '#718096' }} /> },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", flexDirection: { xs: 'column', md: 'row' } }}>
        <Grid container spacing={3} sx={{ flex: 1 }}>
          {overviewItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                sx={{
                  p: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderRadius: 2,
                  height: '50%',
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                <Box>
                  <Typography sx={{ color: "#2D3748", fontSize: 14, fontWeight: 500 }}>
                    {item.title}
                  </Typography>
                  <Typography sx={{ color: "#1A202C", fontSize: 24, fontWeight: 700 }}>
                    {item.value}
                  </Typography>
                </Box>
                {item.icon}
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Box
          sx={{
            width: { xs: '100%', md: 320 },
            ml: { xs: 0, md: 4 },
            mt: { xs: 4, md: 0 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: '100%',
          }}
        >
          {Notif.map((item, index) => (
            <Paper
              key={index}
              sx={{
                p: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: 2,
                flexGrow: 1,
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              <Box>
                <Typography sx={{ color: "#2D3748", fontSize: 18, fontWeight: 500, borderBottom: '2px solid #CBD5E0', pb: 1 }}>
                  {item.title}
                </Typography>
                <Typography sx={{ color: "#1A202C", fontSize: 22, fontWeight: 700, mt: 1 }}>
                  {item.value}
                </Typography>
              </Box>
              {item.icon}
            </Paper>
          ))}
        </Box>
      </Box>

      {/* Attendance Log Card */}
      <Box mt={4}>
        <Paper
          sx={{
            p: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: 2,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
            },
          }}
        >
          <Box>
            <Typography sx={{ color: "#2D3748", fontSize: 18, fontWeight: 500, borderBottom: '2px solid #CBD5E0', pb: 1 }}>
              No Show Log
            </Typography>
            <Typography sx={{ color: "#1A202C", fontSize: 22, fontWeight: 700, mt: 1 }}>
              View detailed log of Login records
            </Typography>
          </Box>
          <ArrowRightAltIcon fontSize="large" sx={{ color: '#718096' }} />
        </Paper>
      </Box>
    </Box>
  );
};

export default DashboardOverview;
