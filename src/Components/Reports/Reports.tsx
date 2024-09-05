import React, { useState, useEffect } from "react";
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
} from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from "react-router-dom";
 
// Interface to define the structure of booking data
interface Booking {
  employee_id: number;
  employee_name: string;
  booked_seat: string;
  office: string;
  start_date: string;
  end_date: string;
}
 
const Reports: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [datePickerAnchorEl, setDatePickerAnchorEl] = useState<null | HTMLElement>(null);
  const [currentColumn, setCurrentColumn] = useState<string>("");
  const [filters, setFilters] = useState<Partial<Booking>>({});
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof Booking>("employee_id");
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
 
  const [bookingsData, setBookingsData] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
 
  const navigate = useNavigate();
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/admin/bookings-details');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setBookingsData(result.data.original); // Handle nested data
      } catch (err) {
        setError('Error fetching booking data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
 
    fetchData();
  }, []);
 
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
    navigate(`/view-or-edit-booking/${booking.employee_id}`, { state: { booking } });
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
 
  const filteredBookings = bookingsData.filter((booking) => {
    return (
      Object.keys(filters).every((key) => {
        const filterValue = filters[key as keyof Booking];
        return booking[key as keyof Booking]
          ?.toString()
          .toLowerCase()
          .includes(filterValue?.toString().toLowerCase() || "");
      }) &&
      (!dateRange[0] || new Date(booking.start_date) >= dateRange[0]) &&
      (!dateRange[1] || new Date(booking.end_date) <= dateRange[1])
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
 
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", p: 2,width:"80vw" }}>
      
 
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
 
      <TableContainer component={Paper} sx={{ borderRadius: "8px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "employee_id"}
                  direction={orderBy === "employee_id" ? order : "asc"}
                  onClick={(event) => handleRequestSort(event, "employee_id")}
                >
                  Employee ID
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "employee_name"}
                  direction={orderBy === "employee_name" ? order : "asc"}
                  onClick={(event) => handleRequestSort(event, "employee_name")}
                >
                  Employee Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "seat"}
                  direction={orderBy === "seat" ? order : "asc"}
                  onClick={(event) => handleRequestSort(event, "seat")}
                >
                  Seat
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "office"}
                  direction={orderBy === "office" ? order : "asc"}
                  onClick={(event) => handleRequestSort(event, "office")}
                >
                  Office
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "start_date"}
                  direction={orderBy === "start_date" ? order : "asc"}
                  onClick={(event) => handleRequestSort(event, "start_date")}
                >
                  Start Date
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "end_date"}
                  direction={orderBy === "end_date" ? order : "asc"}
                  onClick={(event) => handleRequestSort(event, "end_date")}
                >
                  End Date
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedBookings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((booking) => (
              <TableRow
                key={booking.employee_id}
                hover
                onClick={() => handleRowClick(booking)}
                sx={{ cursor: "pointer" }}
              >
                <TableCell>{booking.employee_id}</TableCell>
                <TableCell>{booking.employee_name}</TableCell>
                <TableCell>{booking.seat}</TableCell>
                <TableCell>{booking.office}</TableCell>
                <TableCell>{booking.start_date}</TableCell>
                <TableCell>{booking.end_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredBookings.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
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
          <Typography variant="h6" mb={1}>
            Filter by {currentColumn}
          </Typography>
          <TextField
            label={`Filter by ${currentColumn}`}
            variant="outlined"
            fullWidth
            onChange={handleFilterChange}
          />
        </Box>
      </Popover>
 
      <Popover
        id={datePickerId}
        open={datePickerOpen}
        anchorEl={datePickerAnchorEl}
        onClose={handleDatePickerClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box p={2}>
          <Typography variant="h6" mb={2}>
            Select Date Range
          </Typography>
          <DatePicker
            label="Start Date"
            value={dateRange[0]}
            onChange={(date) => handleDateRangeChange(0, date)}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            label="End Date"
            value={dateRange[1]}
            onChange={(date) => handleDateRangeChange(1, date)}
            renderInput={(params) => <TextField {...params} />}
          />
        </Box>
      </Popover>
    </Box>
  );
};
 
export default Reports;