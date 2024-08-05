
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
  Popover,
  Button,
  TableSortLabel,
  Typography,
  Paper,
} from "@mui/material";
import { FilterList, Download, Add, ArrowDropDown } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { bookings } from "../../data"; 
import styles from "./AdminViewAllBookings.module.css";

const AdminViewAllBookings: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentColumn, setCurrentColumn] = useState<string>("");
  const [filters, setFilters] = useState({
    employeeName: "",
    expId: "",
    seatNumber: "",
    office: "",
    dateOfBooking: "",
    status: "",
  });
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("");

  const navigate = useNavigate();

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>, column: string) => {
    setAnchorEl(event.currentTarget);
    setCurrentColumn(column);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
    setCurrentColumn("");
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [currentColumn]: event.target.value,
    });
  };

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleRowClick = (booking: any) => {
    navigate(`/view-or-edit-booking/${booking.id}`, { state: { booking } });
  };

  const filteredBookings = bookings.filter((booking) =>
    Object.keys(filters).every((key) =>
      booking[key]
        .toString()
        .toLowerCase()
        .includes(filters[key].toString().toLowerCase())
    )
  );

  const sortedBookings = filteredBookings.sort((a, b) => {
    if (a[orderBy] < b[orderBy]) {
      return order === "asc" ? -1 : 1;
    }
    if (a[orderBy] > b[orderBy]) {
      return order === "asc" ? 1 : -1;
    }
    return 0;
  });

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
              backgroundColor: "#fff",
            },
          }}
        />
        <Box className={styles.actions}>
          <IconButton sx={{ color: "#0F172A" }}>
            <Download />
          </IconButton>
          <IconButton sx={{ color: "#0F172A" }}>
            <Add />
          </IconButton>
        </Box>
      </Box>
      <Box className={styles.tableContainer}>
      <Typography variant="h4" gutterBottom sx={{ color: '#0F172A' }}>
  All Bookings
</Typography>
        <TableContainer component={Paper} className={styles.tablePaper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={styles.headerCell}>Serial No</TableCell>
                {["employeeName", "expId", "seatNumber", "office", "dateOfBooking", "status"].map((column) => (
                  <TableCell key={column} className={styles.headerCell}>
                    <TableSortLabel
                      active={orderBy === column}
                      direction={orderBy === column ? order : "asc"}
                      onClick={(event) => handleRequestSort(event, column)}
                    >
                      {column.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      <IconButton
                        size="small"
                        onClick={(event) => handleFilterClick(event, column)}
                      >
                        <ArrowDropDown />
                      </IconButton>
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedBookings
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((booking, index) => (
                  <TableRow
                    key={index}
                    onClick={() => handleRowClick(booking)}
                    className={styles.tableRow}
                  >
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>
                      {booking.employeeName}
                      <br />
                      <span className={styles.subContent}>DU-6</span>
                    </TableCell>
                    <TableCell>{booking.expId}</TableCell>
                    <TableCell>{booking.seatNumber}</TableCell>
                    <TableCell>{booking.office}</TableCell>
                    <TableCell>{booking.dateOfBooking}</TableCell>
                    <TableCell>{booking.status}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <TablePagination
        rowsPerPageOptions={[5, 12, 18]}
        component="div"
        count={sortedBookings.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        className={styles.pagination}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleFilterClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box p={2}>
          <TextField
            label={`Filter by ${currentColumn}`}
            variant="outlined"
            fullWidth
            value={filters[currentColumn]}
            onChange={handleFilterChange}
          />
        </Box>
      </Popover>
    </Box>
  );
};

export default AdminViewAllBookings;
