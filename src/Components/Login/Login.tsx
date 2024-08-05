import {
  Box,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { bookings } from "../../data";
import styles from "./Login.module.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = bookings.find((booking) => booking.emailId === email);

    if (user) {
      localStorage.setItem("userRole", user.role);
      localStorage.setItem("username", user.employeeName);
      navigate("/home");
    } else {
      setError("Invalid email. Please try again.");
    }
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.rectangle178} />
      <Box className={styles.foreground}>
        <Box className={styles.rectangle1771}>
          <Box className={styles.rectangle177}>
            <Typography variant="h5" component="h1" className={styles.logoText}>
              <span style={{ color: "white", fontSize: "2.5rem" }}>
                XperioDesk
              </span>
            </Typography>
          </Box>
        </Box>
        <Box className={styles.loginForm}>
          <Typography variant="h6" color="black">
            LOGIN
          </Typography>
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              mb: 2,
              "& label": { color: "black" },
              "& .MuiOutlinedInput-root": {
                borderColor: "black",
                borderRadius: "15px",
              },
            }}
          />
          {error && <Typography color="error">{error}</Typography>}
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            sx={{
              mb: 2,
              "& label": { color: "black" },
              "& .MuiOutlinedInput-root": {
                borderColor: "black",
                borderRadius: "15px",
              },
            }}
          />
          <FormControlLabel
            control={<Checkbox sx={{ color: "black" }} />}
            label="Remember Me"
            sx={{ color: "black", mb: 2 }}
          />
          <Button
            fullWidth
            variant="contained"
            onClick={handleLogin}
            sx={{
              mb: 2,
              backgroundColor: "#04122E",
              "& .MuiOutlinedInput-root": {
                borderColor: "black",
                borderRadius: "15px",
              },
            }}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
