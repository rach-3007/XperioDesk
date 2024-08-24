import React, { useEffect, useState } from "react";
import { Box, Grid, Card, CardContent, Typography, FormControl, MenuItem, Select } from "@mui/material";
import BarChart from "./BarChart";
import DoughNut from "./DoughNut";
import PieChart from "./PieChart";
import SeatOccupancy from "./SeatOccupancy"; // Import SeatOccupancy component
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
          display: false, // Removes the grid lines on the x-axis
        },
        border: {
          display: false, // Removes the axis line on the x-axis
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
          display: false, // Removes the grid lines on the x-axis
        },
        border: {
          display: false, // Removes the axis line on the x-axis
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
        top: 0, // Adjust this value if you want to shift the entire chart content
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
  const [selectedOption, setSelectedOption] = useState<string>('');

  useEffect(() => {
    // Replace with your actual API call
    const fetchDropdownOptions = async () => {
      try {
        const response = await fetch('your_api_endpoint'); // Fetch data from your API
        const data = await response.json();
        setDropdownOptions(data.options); // Assuming your API response has an 'options' array
        setSelectedOption(data.options[0]); // Set the first option as the default selected option
      } catch (error) {
        console.error('Error fetching dropdown options:', error);
      }
    };

    fetchDropdownOptions();
  }, []);

  return (
    <Box>
      <Box sx={{ ml: 29, mb: 6 }}>
        <Navbar />
      </Box>

      <Box sx={{ ml: 33,mt:-4,mb:5 }}> 
        <FormControl sx={{ minWidth: 100 }}>
          <Select
            value={selectedOption}
            onChange={(event) => setSelectedOption(event.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="">
              <em>Select an option</em>
            </MenuItem>
            {dropdownOptions.map((option) => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ ml: 33 }}>
        <Grid container spacing={2}>
          {/* Row 1 */}

          <Grid
            container
            sx={{ display: "flex", justifyContent: "space-around" }}
          >
            <Grid item xs={12} md={7}>
              <Card sx={{ height: "100%" }}>
                <CardContent sx={{ height: "100%", padding: 2 }}>
                  <Box
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography variant="h6" sx={{ paddingBottom: "16px" }}>
                      Bar Chart 1
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
              <Card sx={{ height: "100%" }}>
                <CardContent sx={{ height: "100%", padding: 2 }}>
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
              <Card sx={{ height: "80%" }}>
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
                    Pie Chart
                  </Typography>
                  <Box sx={{ width: "100%", height: "100%" }}>
                    <PieChart
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={5}>
              <Card sx={{ height: "80%" }}>
                <CardContent>
                  <Typography variant="h6">Doughnut Chart</Typography>
                  <DoughNut data={doughnutData1} options={doughnutOptions1} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Row 3 */}
          <Grid container item xs={12} spacing={2} sx={{ mt: -12 }}>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: "95%" }}>
                <CardContent>
                  <Typography variant="h6">Another Doughnut Chart</Typography>
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
                      <Typography variant="h6">Bar Chart 2</Typography>
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
