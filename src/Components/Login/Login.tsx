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
import axiosInstance from "../../Config/AxiosConfig"; // Adjust the import based on your project structure
import styles from "./Login.module.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Call the backend API with email and password
      const response = await axiosInstance.post("/api/login", { email, password });
      console.log("API Response:", response.data);
      
  
      if (response.status === 200) {
        const { access_token, user } = response.data;
  
        if (!user || !user.role_id || !user.du_id) {
          setError("Incomplete user data received from the server.");
          return;
        }
  
        if (user) {
          localStorage.setItem("name", user.name || "");
          localStorage.setItem("role_id", user.role_id ? user.role_id.toString() : "");
          localStorage.setItem("du_id", user.du_id ? user.du_id.toString() : "");
          localStorage.setItem("designation", user.designation || "");
        } else {
          setError("Invalid user data. Please try again.");
        }
        
  
        // Redirect based on role_id
        if (user.role_id === 1) {
          navigate("/userbook-desk"); // Redirect to User's page
        } else if (user.role_id === 2) {
          navigate("/book-desk"); // Redirect to Admin's page
        } else {
          setError("Unknown role. Please contact support.");
        }
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      // Ensure we capture the error details properly
      if (axios.isAxiosError(err)) {
        console.error("Login error:", err);
  
        if (err.response) {
          setError(
            `Login failed: ${err.response.data?.error || err.response.statusText}`
          );
        } else if (err.request) {
          setError("No response from the server. Please try again later.");
        } else {
          setError("An error occurred while logging in. Please try again.");
        }
      } else {
        console.error("Unexpected error:", err);
        setError("An unexpected error occurred. Please try again.");
      }
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
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
