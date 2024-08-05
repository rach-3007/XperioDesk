import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Box, TextField, Button, Typography, Grid, Paper } from "@mui/material";
import styles from "./VieworEditBooking.module.css";
import { bookings, updateBooking } from "../../data";

const ViewOrEditBooking: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<any>(null); 
  const [editable, setEditable] = useState<boolean>(false);

  useEffect(() => {
    const bookingData = bookings.find((booking) => booking.id === Number(id));
    if (bookingData) {
      setBooking(bookingData);
      setEditable(bookingData.status !== "Open");
    }
  }, [id]);

  const handleSave = () => {
    if (booking) {
      updateBooking(booking);
      navigate("/"); 
    }
  };

  const handleEdit = () => {
    setEditable(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setBooking((prevBooking) => ({
      ...prevBooking,
      [name]: value,
    }));
  };

  if (!booking) return <Typography>Loading...</Typography>;

  return (
    <div className={styles.containerWrapper}>
      <Box component={Paper} className={styles.viewOrEditContainer}>
        <Typography variant="h4" className={styles.header}>
          {editable ? "Edit Booking" : "View Booking"}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Employee Name"
              name="employeeName"
              value={booking.employeeName || ""}
              fullWidth
              onChange={handleChange}
              disabled={!editable}
              className={styles.textFieldInput}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="EXP ID"
              name="expId"
              value={booking.expId || ""}
              fullWidth
              onChange={handleChange}
              disabled={!editable}
              className={styles.textFieldInput}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Seat Number"
              name="seatNumber"
              value={booking.seatNumber || ""}
              fullWidth
              onChange={handleChange}
              disabled={!editable}
              className={styles.textFieldInput}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Office"
              name="office"
              value={booking.office || ""}
              fullWidth
              onChange={handleChange}
              disabled={!editable}
              className={styles.textFieldInput}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Date of Booking"
              name="dateOfBooking"
              value={booking.dateOfBooking || ""}
              fullWidth
              onChange={handleChange}
              disabled={!editable}
              className={styles.textFieldInput}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Status"
              name="status"
              value={booking.status || ""}
              fullWidth
              disabled
              className={styles.textFieldInput}
            />
          </Grid>
        </Grid>
        <Box className={styles.actionButtons}>
          {editable ? (
            <Button className={styles.saveButton} onClick={handleSave}>
              Save
            </Button>
          ) : (
            <Button className={styles.editButton} onClick={handleEdit}>
              Edit
            </Button>
          )}
        </Box>
      </Box>
      <div className={styles.abstractShape1} />
      <div className={styles.abstractShape2} />
    </div>
  );
};

export default ViewOrEditBooking;
