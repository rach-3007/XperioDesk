import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import BarChart from "./BarChart";
import DoughNut from "./DoughNut";
import PieChart from "./PieChart";
import SeatOccupancy from "./SeatOccupancy"; 
import { ChartOptions as ChartJSOptions, ScriptableContext } from "chart.js";

import Navbar from "./Navbar";

const Analytics: React.FC = () => {
  const barChartData1 = {
    labels: [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ],
    datasets: [
      {
        label: "Dataset 1",
        data: [10, 20, 30, 40, 50, 90, 70, 80, 90, 100, 110, 120],
        backgroundColor: (context: ScriptableContext<"bar">) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(
            0,
            0,
            0,
            context.chart.height
          );
          gradient.addColorStop(0, "#99A6B2"); // Lightened color at the top
          gradient.addColorStop(1, "#04122E"); // Dark color at the bottom
          return gradient;
        },
        borderColor: "white",
        borderWidth: 2,
        borderRadius: {
          topLeft: 30,
          topRight: 30,
          bottomLeft: 30,
          bottomRight: 30,
        },
        borderSkipped: false,
        barThickness: 12,
      },
    ],
  };

  const barChartOptions1: ChartJSOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: "Sample Bar Chart",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false, // Removes the grid lines on the y-axis
        },
        border: {
          display: false, // Removes the axis line on the y-axis
        },
      },
    },
  };

  const barChartData2 = {
    labels: [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ],
    datasets: [
      {
        label: "Dataset 1",
        data: [10, 20, 30, 40, 50, 90, 70, 80, 90, 100, 150, 120],
        backgroundColor: (context: ScriptableContext<"bar">) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(
            0,
            0,
            0,
            context.chart.height
          );
          gradient.addColorStop(0, "#FFFFFF"); // Lightened color at the top
          gradient.addColorStop(1, "#04122E"); // Dark color at the bottom
          return gradient;
        },
        borderColor: "white",
        borderWidth: 2,
        borderRadius: {
          topLeft: 30,
          topRight: 30,
          bottomLeft: 30,
          bottomRight: 30,
        },
        borderSkipped: false,
        barThickness: 12,
      },
    ],
  };

  const barChartOptions2: ChartJSOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: "Sample Bar Chart",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
    },
  };

  const doughnutData1 = {
    labels: ["Booked Seats", "Available Seats"],
    datasets: [
      {
        data: [20, 100],
        backgroundColor: ["#FFA726", "#FFE0B2"],
        hoverBackgroundColor: ["#FB8C00", "#FFB74D"],
        borderWidth: 0,
      },
    ],
  };

  const doughnutOptions1: ChartJSOptions<"doughnut"> = {
    responsive: true,

    plugins: {
      legend: {
        display: true,
        position: "right",
        labels: {
          color: "#666",
          boxWidth: 10,
          padding: 20,
        },
      },

      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw || "";
            return `${label}: ${value}%`;
          },
        },
      },
    },
    layout: {
      padding: {
        top: 0, 
        right: 0,
        bottom: 85,
        left: 0,
      },
    },
    cutout: "70%",
  };

  const doughnutData2 = {
    labels: ["Completed Tasks", "Pending Tasks"],
    datasets: [
      {
        data: [30, 70],
        backgroundColor: ["#66BB6A", "#C8E6C9"],
        hoverBackgroundColor: ["#4CAF50", "#A5D6A7"],
        borderWidth: 0,
      },
    ],
  };

  const doughnutOptions2: ChartJSOptions<"doughnut"> = {
    responsive: true,

    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "#666",
          boxWidth: 20,
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw || "";
            return `${label}: ${value}%`;
          },
        },
      },
    },
    cutout: "70%",
  };
  // dropdown
  const [dropdownOptions, setDropdownOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");
// fetch buildings  api goes here 
  useEffect(() => {
    
    const fetchDropdownOptions = async () => {
      try {
        const response = await fetch("your_api_endpoint"); 
        const data = await response.json();
        setDropdownOptions(data.options); 
        setSelectedOption(data.options[0]); 
      } catch (error) {
        console.error("Error fetching dropdown options:", error);
      }
    };

    fetchDropdownOptions();
  }, []);

  return (
    <Box sx={{ backgroundColor: "#F4F6F8" }}>
      <Box>
        <Navbar />
      </Box>

      <Box sx={{}}>
        <FormControl sx={{ minWidth: 100, mb: 5, mt: 2, ml: 3 }}>
          <Select
            value={selectedOption}
            onChange={(event) => setSelectedOption(event.target.value)}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="">
              <em>Select an option</em>
            </MenuItem>
            <MenuItem value="Gayatri Building">Gayatri Building</MenuItem>{" "}
            {/* Existing option */}
            <MenuItem value="Tejaswini Building">
              Tejaswini Building
            </MenuItem>{" "}
            {/* New option */}
            {dropdownOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box>
        <Grid container spacing={2}>
          {/* Row 1 */}

          <Grid
            container
            sx={{ display: "flex", justifyContent: "space-around" }}
          >
            <Grid item xs={12} md={6}>
              <Card sx={{ height: "100%", backgroundColor: "#F4F6F8" }}>
                <CardContent sx={{ height: "100%", padding: 2 }}>
                  <Box
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography variant="h6" sx={{ paddingBottom: "16px" }}>
                      Bookings
                    </Typography>
                    <Box sx={{ flex: 1 }}>
                      <BarChart
                        data={barChartData1}
                        options={barChartOptions1}
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={5}>
              <Card
                sx={{
                  height: "100%",
                  border: "none",
                  boxShadow: "none",
                  backgroundColor: "#F4F6F8",
                }}
              >
                <CardContent sx={{ height: "100%", padding: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{ paddingBottom: "16px", marginLeft: "35px" }}
                  >
                    Seat Occupancy
                  </Typography>
                  <SeatOccupancy />
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Row 2 */}
          <Grid
            container
            item
            xs={12}
            spacing={3}
            sx={{ mt: 1, display: "flex", justifyContent: "space-around" }}
          >
            <Grid item xs={12} md={5}>
              <Card sx={{ height: "80%", backgroundColor: "#F4F6F8" }}>
                <CardContent
                  sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="h6" align="left" sx={{ mt: 1, mr: 35 }}>
                    Du Occupancy
                  </Typography>
                  <Box sx={{ width: "100%", height: "100%" }}>
                    <PieChart />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={5}>
              <Card sx={{ height: "80%", backgroundColor: "#F4F6F8" }}>
                <CardContent>
                  <Typography variant="h6">Today's Booking</Typography>
                  <DoughNut data={doughnutData1} options={doughnutOptions1} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Row 3 */}
          <Grid container item xs={12} spacing={2} sx={{ mt: -12 }}>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: "95%", backgroundColor: "#F4F6F8" }}>
                <CardContent>
                  <Typography variant="h6">Today's Utilization rate</Typography>
                  <DoughNut data={doughnutData2} options={doughnutOptions2} />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={8}>
              <Card sx={{ height: "95%" }}>
                <CardContent sx={{ height: "100%", padding: 2 }}>
                  <Box
                    sx={{
                      height: "90%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h6">Utilization rate</Typography>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <BarChart
                        data={barChartData2}
                        options={barChartOptions2}
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Analytics;
