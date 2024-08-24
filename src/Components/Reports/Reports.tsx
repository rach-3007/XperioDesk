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
  TableSortLabel,
  Typography,
  Paper,
} from "@mui/material";
import { ArrowDropDown, Download, Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { bookings } from "../../data";
import Sidebar from "../Shared/SidebarAdmin/Sidebar";

interface Booking {
  id: number;
  employeeName: string;
  expId: string;
  seatNumber: string;
  office: string;
  dateOfBooking: string;
  loginStatus: boolean;
  status: string;
}

const Reports: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentColumn, setCurrentColumn] = useState<string>("");
  const [filters, setFilters] = useState<Partial<Booking>>({
    employeeName: "",
    expId: "",
    seatNumber: "",
    office: "",
    dateOfBooking: "",
    loginStatus: "",
    status: "",
  });
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof Booking>("");

  const navigate = useNavigate();

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
    setFilters({
      ...filters,
      [currentColumn]: event.target.value,
    });
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Booking
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleRowClick = (booking: Booking) => {
    navigate(`/view-or-edit-booking/${booking.id}`, { state: { booking } });
  };

  const filteredBookings = bookings.filter((booking) =>
    Object.keys(filters).every((key) => {
      const filterValue = filters[key as keyof Booking];
      return booking[key as keyof Booking]
        ?.toString()
        .toLowerCase()
        .includes(filterValue?.toString().toLowerCase() || "");
    })
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
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <Box
        sx={{
          flexGrow: 1,
          ml: "30px",
          mt: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          mb={2}
          sx={{
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            padding: "10px",
            borderRadius: "8px",
            backgroundColor: "#fff",
            maxWidth: "970px",
          }}
        >
          <TextField
            label="Search"
            variant="outlined"
            sx={{
              width: "200px",
              "& .MuiInputBase-root": {
                borderRadius: "7px",
                backgroundColor: "#fff",
                height: "30px",
                padding: "0 8px",
                fontSize: "0.875rem",
                lineHeight: "1.2",
              },
              "& .MuiInputLabel-root": {
                fontSize: "0.75rem",
                lineHeight: "1.2",
                transform: "translate(14px, 10px) scale(1)",
              },
              "& .MuiInputLabel-shrink": {
                transform: "translate(14px, -6px) scale(0.75)",
              },
            }}
          />

          <Box>
            <IconButton sx={{ color: "#0F172A" }}>
              <Download />
            </IconButton>
            <IconButton sx={{ color: "#0F172A" }}>
              <Add />
            </IconButton>
          </Box>
        </Box>

        <Typography variant="h4" gutterBottom sx={{ color: "#0F172A" }}>
          All Bookings
        </Typography>

        <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
          <TableContainer
            component={Paper}
            sx={{ height: "100%", overflow: "auto" }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ padding: "6px 16px", lineHeight: 1.2 }}>
                    Serial No
                  </TableCell>
                  {[
                    "employeeName",
                    "expId",
                    "seatNumber",
                    "office",
                    "dateOfBooking",
                    "loginStatus",
                    "status",
                  ].map((column) => (
                    <TableCell
                      key={column}
                      sx={{ padding: "6px 16px", lineHeight: 1.2 }}
                    >
                      <TableSortLabel
                        active={orderBy === column}
                        direction={orderBy === column ? order : "asc"}
                        onClick={(event) => handleRequestSort(event, column)}
                        sx={{ lineHeight: 1, maxWidth: 95 }}
                        data-column={column}
                      >
                        {column
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
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
                    >
                      <TableCell sx={{ padding: "6px 16px", lineHeight: 1.2 }}>
                        {page * rowsPerPage + index + 1}
                      </TableCell>
                      <TableCell sx={{ padding: "6px 16px", lineHeight: 1.2 }}>
                        {booking.employeeName}
                        <br />
                        <span style={{ color: "#777", fontSize: "0.875rem" }}>
                          DU-6
                        </span>
                      </TableCell>
                      <TableCell sx={{ padding: "6px 16px", lineHeight: 1.2 }}>
                        {booking.expId}
                      </TableCell>
                      <TableCell sx={{ padding: "6px 16px", lineHeight: 1.2 }}>
                        {booking.seatNumber}
                      </TableCell>
                      <TableCell sx={{ padding: "6px 16px", lineHeight: 1.2 }}>
                        {booking.office}
                      </TableCell>
                      <TableCell sx={{ padding: "6px 16px", lineHeight: 1.2 }}>
                        {booking.dateOfBooking}
                      </TableCell>
                      <TableCell sx={{ padding: "6px 16px", lineHeight: 1.2 }}>
                        {booking.loginStatus ? "Yes" : "No"}
                      </TableCell>
                      <TableCell sx={{ padding: "6px 16px", lineHeight: 1.2 }}>
                        {booking.status}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <TablePagination
          rowsPerPageOptions={[10, 20]}
          component="div"
          count={sortedBookings.length}
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
    </Box>
  );
};

export default Reports;