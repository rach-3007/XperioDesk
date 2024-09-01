// import React from "react";
// import { Box, Typography } from "@mui/material";

// interface CircleProps {
//   value: number;
//   label: string;
//   color: string;
//   sx?: object; // Add sx prop to CircleProps interface to pass custom styles
// }

// const Circle: React.FC<CircleProps> = ({ value, label, color, sx }) => {
//   // Adjusted size calculation and styling based on the new design
//   const size = Math.sqrt(value) * 10 + 50;

//   return (
//     <Box
//       sx={{
//         width: size,
//         height: size,
//         borderRadius: "50%",
//         backgroundColor: color,
//         display: "flex",
//         flexDirection: "column", // Arrange content vertically
//         alignItems: "center",
//         justifyContent: "center",
//         position: "absolute", // Changed to absolute positioning
//         margin: "10px",
//         boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Add a subtle shadow
//         ...sx, // Spread the sx prop to apply custom styles
//       }}
//     >
//       <Typography variant="h4" sx={{ color: "#fff", fontWeight: "bold" }}>
//         {value}
//       </Typography>
//       <Typography variant="body1" sx={{ color: "#fff", marginTop: "5px" }}>
//         {label}
//       </Typography>
//     </Box>
//   );
// };

// const SeatOccupancy: React.FC = () => {
//   const data = [
//     { value: 200, label: "Permanently Allocated", color: "#f59e0b" }, // Updated color
//     { value: 62, label: "Vacant", color: "#0284c7" }, // Updated color
//     { value: 45, label: "Booked", color: "#6366f1" }, // Updated color
//   ];

//   return (
//     <Box
//       sx={{
//         position: "relative",
//         height: "260px", // Adjust height as needed
       
//       }}
//     >
//       {/* First circle (bottom right) */}
//       <Circle
//         {...data[0]}
//         sx={{ top: "35%", left: "60%", transform: "translate(-50%, -50%)" }}
//       />

//       {/* Second circle (bottom left) */}
//       <Circle
//         {...data[1]}
//         sx={{ top: "70%", left: "18%", transform: "translate(-50%, -50%)" }}
//       />

//       {/* Third circle (top center) */}
//       <Circle
//         {...data[2]}
//         sx={{ top: "20%", left: "20%", transform: "translate(-50%, -50%)" }}
//       />
//     </Box>
//   );
// };

// export default SeatOccupancy;
