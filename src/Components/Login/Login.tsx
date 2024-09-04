import {
  Box,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Config/AxiosConfig"; // Adjust the import based on your project structure
import styles from "./Login.module.css";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../Config/authConfig";
import { callMsGraph } from "../../Config/graph";
import { AuthenticationResult } from "@azure/msal-browser";
import { postLogin } from "./api/postLogin";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const {instance}=useMsal();
  const navigate = useNavigate();
  // const navigate = useNavigate();

  // const handleLoginRedirect = () => {
  //   instance
  //     .loginRedirect({
  //       ...loginRequest,
  //       prompt: "create",
  //     })
  //     .catch((error) => console.log(error));
  // };
  const login = async (responce: AuthenticationResult): Promise<any> => {
    localStorage.clear();
    const response: any = await postLogin(responce.accessToken);
    console.log("response", response);

    if (!(response instanceof AxiosError)) {
        console.log("Logged User Details", response.user.data);

        // Store user details in local storage
        localStorage.setItem("accessToken", response.access_token);
        localStorage.setItem("roleId", response.XpeUser.role_id);
        localStorage.setItem("name", JSON.stringify(response.user.data.givenName));

        
        if (response.XpeUser.role_id === 1) {
            
            navigate("/userbook-desk");
        } else if (response.XpeUser.role_id === 2) {
         
            navigate("/book-desk");
        } else {
          
            navigate("/");
        }
    } else {
        alert("Error");
    }

    return response;
};

  const handleLoginRedirect = async() =>{
      try {
          const response = await instance.loginPopup(loginRequest);
          console.log(response.accessToken);
          const newGraph = await callMsGraph(response.accessToken);
          console.log(newGraph);
          console.log(newGraph.userPrincipalName);
          await login(response); //
      } catch (e) {
          console.log("error");
          console.error(e);
      }
  }

  // const handleLogin = async () => {
  //   try {
  //     // Call the backend API with email and password
  //     const response = await axiosInstance.post("/api/login", {
  //       email,
  //       password,
  //     });
  
  //     if (response.status === 200) {
  //       const { access_token, user } = response.data;
  
        // Store the required details in local storage
        // localStorage.setItem("accessToken", access_token);
        // localStorage.setItem("name", user.name);
        // localStorage.setItem("role_id", user.role_id.toString());
        // localStorage.setItem("du_id", user.du_id.toString());
        // localStorage.setItem("designation", user.designation);
  
  //       // Redirect based on role_id
  //       if (user.role_id === 1) {
  //         navigate("/userbook-desk"); // Redirect to User's page
  //       } else if (user.role_id === 2) {
  //         navigate("/book-desk"); // Redirect to Admin's page
  //       } else {
  //         setError("Unknown role. Please contact support.");
  //       }
  //     } else {
  //       setError("Invalid credentials. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     setError("An error occurred while logging in. Please try again.");
  //   }
  // };

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
            onClick={handleLoginRedirect}
            sx={{
              mb: 2,
              backgroundColor: "#04122E",
              "& .MuiOutlinedInput-root": {
                borderColor: "black",
                borderRadius: "15px",
              },
            }}
          >
            Login with Microsoft
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
