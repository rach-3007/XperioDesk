import React, { useState } from "react";
import { Collapse } from "@mui/material";

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
  TableSortLabel,
  Typography,
  Paper,
  Tooltip,
} from "@mui/material";
import Edit from "@mui/icons-material/Edit";
import {
  ArrowDropDown,
  ArrowDropUp,
  FilterAlt,
  CalendarToday,
  Download,
  Add,
  CheckCircle,
  Cancel,
  Person,
  Lock,
} from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from "react-router-dom";
import { bookings } from "../../data";

interface Booking {
  id: number;
  employeeName: string;
  expId: number | string;
  seatNumber: string;
  office: string;
  dateOfBooking: string;
  loginStatus: string;
  status: string;
  bookedBy?: string;
  bookedFor?: string;
}

const Reports: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [datePickerAnchorEl, setDatePickerAnchorEl] = useState<null | HTMLElement>(null);
  const [currentColumn, setCurrentColumn] = useState<string>("");
  const [filters, setFilters] = useState<Partial<Booking>>({});
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof Booking>("expId");
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);

  const navigate = useNavigate();

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    event?.preventDefault();
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setCurrentColumn(event.currentTarget.getAttribute("data-column") || "");
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
    setCurrentColumn("");
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [currentColumn]: event.target.value });
  };

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Booking) => {
    event?.preventDefault();
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleRowClick = (booking: Booking) => {
    navigate(`/view-or-edit-booking/${booking.id}`, { state: { booking } });
  };

  const handleDateRangeChange = (index: number, date: Date | null) => {
    const newDateRange = [...dateRange];
    newDateRange[index] = date;
    setDateRange(newDateRange as [Date | null, Date | null]);
  };

  const handleDatePickerClick = (event: React.MouseEvent<HTMLElement>) => {
    setDatePickerAnchorEl(event.currentTarget);
  };

  const handleDatePickerClose = () => {
    setDatePickerAnchorEl(null);
  };

  const filteredBookings = bookings.filter((booking) => {
    return (
      Object.keys(filters).every((key) => {
        const filterValue = filters[key as keyof Booking];
        return booking[key as keyof Booking]
          ?.toString()
          .toLowerCase()
          .includes(filterValue?.toString().toLowerCase() || "");
      }) &&
      (!dateRange[0] || new Date(booking.dateOfBooking) >= dateRange[0]) &&
      (!dateRange[1] || new Date(booking.dateOfBooking) <= dateRange[1])
    );
  });

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
  const datePickerOpen = Boolean(datePickerAnchorEl);
  const id = open ? "filter-popover" : undefined;
  const datePickerId = datePickerOpen ? "date-picker-popover" : undefined;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Open":
        return <CheckCircle color="success" />;
      case "Closed":
        return <Cancel color="error" />;
      default:
        return <Typography>No Status</Typography>;
    }
  };

  const getLoginStatusIcon = (loginStatus: string) => {
    switch (loginStatus) {
      case "Logged In":
        return <Person color="primary" sx={{ animation: "swipe-in 0.5s ease-in-out" }} />;
      case "Logged Out":
        return <Lock color="disabled" sx={{ animation: "swipe-in 0.5s ease-in-out" }} />;
      default:
        return <Typography>No Status</Typography>;
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", p: 2 }}>
      {/* Top Bar */}
      <Box display="flex" justifyContent="space-between" mb={2} p={2} sx={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", borderRadius: "8px", backgroundColor: "#fff" }}>
        <TextField
          label="Search"
          variant="outlined"
          sx={{ width: "200px" }}
        />
        <Box display="flex" alignItems="center">
          <Tooltip title="Download Data">
            <IconButton sx={{ color: "#0F172A" }} size="small">
              <Download fontSize="inherit" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add New Booking">
            <IconButton sx={{ color: "#0F172A" }} size="small" ml={1}>
              <Add fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Header and Actions */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" sx={{ color: "#0F172A", fontWeight: 600 }}>
          All Bookings
        </Typography>
        <Box display="flex" alignItems="center">
          <Tooltip title="Filter">
            <IconButton
              sx={{ color: "#0F172A" }}
              onClick={handleFilterClick}
              size="small"
            >
              <FilterAlt fontSize="inherit" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Select Date Range">
            <IconButton
              sx={{ color: "#0F172A", ml: 1 }}
              onClick={handleDatePickerClick}
              size="small"
            >
              <CalendarToday fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ borderRadius: "8px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "employeeName"}
                  direction={orderBy === "employeeName" ? order : "asc"}
                  onClick={(event) => handleRequestSort(event, "employeeName")}
                >
                  Employee Name
                  {orderBy === "employeeName" ? (
                    order === "asc" ? (
                      <ArrowDropUp />
                    ) : (
                      <ArrowDropDown />
                    )
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "expId"}
                  direction={orderBy === "expId" ? order : "asc"}
                  onClick={(event) => handleRequestSort(event, "expId")}
                >
                  Employee ID
                  {orderBy === "expId" ? (
                    order === "asc" ? (
                      <ArrowDropUp />
                    ) : (
                      <ArrowDropDown />
                    )
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell>Booked Seat</TableCell>
              <TableCell>Office</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Login Status</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedBookings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((booking) => (
              <TableRow
                hover
                key={booking.id}
                onClick={() => handleRowClick(booking)}
              >
                <TableCell>{booking.employeeName}</TableCell>
                <TableCell>{booking.expId}</TableCell>
                <TableCell>{booking.seatNumber}</TableCell>
                <TableCell>{booking.office}</TableCell>
                <TableCell>{new Date(booking.dateOfBooking).toLocaleDateString()}</TableCell>
                <TableCell>{getLoginStatusIcon(booking.loginStatus)}</TableCell>
                <TableCell>{getStatusIcon(booking.status)}</TableCell>
                <TableCell>
                  <IconButton onClick={() => navigate(`/edit-booking/${booking.id}`)}>
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredBookings.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        sx={{ mt: 2 }}
      />

      {/* Filter Popover */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleFilterClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box p={2}>
          <Typography variant="h6" mb={2}>Filter by {currentColumn}</Typography>
          <TextField
            fullWidth
            label={`Filter by ${currentColumn}`}
            variant="outlined"
            value={filters[currentColumn as keyof Booking] || ""}
            onChange={handleFilterChange}
          />
        </Box>
      </Popover>

      {/* Date Picker Popover */}
      <Popover
        id={datePickerId}
        open={datePickerOpen}
        anchorEl={datePickerAnchorEl}
        onClose={handleDatePickerClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box p={2}>
          <Typography variant="h6" mb={2}>Select Date Range</Typography>
          <DatePicker
            label="Start Date"
            value={dateRange[0]}
            onChange={(date) => handleDateRangeChange(0, date)}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
          <DatePicker
            label="End Date"
            value={dateRange[1]}
            onChange={(date) => handleDateRangeChange(1, date)}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </Box>
      </Popover>
    </Box>
  );
};

export default Reports;
