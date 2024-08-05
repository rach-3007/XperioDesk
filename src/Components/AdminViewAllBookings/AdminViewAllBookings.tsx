import React, { useState } from "react";
import {
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
} from "@mui/material";
import { FilterList, Download, Add } from "@mui/icons-material";
import styles from "./AdminViewAllBookings.module.css";

const bookings = Array.from({ length: 20 }, (_, index) => ({
  employeeName: index % 2 === 0 ? "Sethu Manohar " : "Amal Rajeev",
  expId: Math.floor(Math.random() * 90000) + 10000,
  seatNumber: `TW-${Math.floor(Math.random() * 999)}WZ${Math.floor(
    Math.random() * 999
  )}`,
  office: `Module, 3, Gayathri Building Technopark Phase 1`,
  dateOfBooking: new Date().toLocaleDateString(),
}));

const AdminViewAllBookings: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.header}>
        <TextField
          label="Search"
          variant="outlined"
          className={styles.searchBar}
          sx={{
            width: "300px",
            "& .MuiInputBase-root": {
              borderRadius: "25px",
            },
          }}
        />
        <Box className={styles.actions}>
          <IconButton sx={{ color: "#0F172A" }}>
            <FilterList />
          </IconButton>
          <IconButton sx={{ color: "#0F172A" }}>
            <Download />
          </IconButton>
          <IconButton sx={{ color: "#0F172A" }}>
            <Add />
          </IconButton>
        </Box>
      </Box>
      <Box className={styles.tableContainer}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Serial No</TableCell> {/* New serial number column */}
                <TableCell>Employee Name</TableCell>
                <TableCell>EXP ID</TableCell>
                <TableCell>Seat Number</TableCell>
                <TableCell>Office</TableCell>
                <TableCell>Date of Booking</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((booking, index) => (
                  <TableRow key={index}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell> {/* Serial number */}
                    <TableCell>
                      {booking.employeeName}
                      <br />
                      <span className={styles.subContent}>DU-6</span>
                    </TableCell>
                    <TableCell>{booking.expId}</TableCell>
                    <TableCell>{booking.seatNumber}</TableCell>
                    <TableCell>{booking.office}</TableCell>
                    <TableCell>{booking.dateOfBooking}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <TablePagination
        rowsPerPageOptions={[6, 12, 18]}
        component="div"
        count={bookings.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Box>
  );
};

export default AdminViewAllBookings;
