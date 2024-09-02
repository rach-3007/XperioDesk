import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import axios from "axios";
import AddOfficeDrawer from "./AddOfficeDrawer";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

interface Office {
  id: number;
  name: string;
  enabled: boolean;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

const Offices: React.FC = () => {
  const [offices, setOffices] = useState<Office[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  useEffect(() => {
    fetchOffices();
  }, []);

  const fetchOffices = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<Office[]>("/api/offices");
  
      // Check if the response data is an array
      if (Array.isArray(response.data)) {
        setOffices(response.data);
      } else {
        console.error("API did not return an array of offices:", response.data);
        setError("Unexpected data format from the server.");
        setOffices([]); 
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch offices.");
    } finally {
      setLoading(false);
    }
  };

  const toggleOfficeStatus = async (id: number): Promise<void> => {
    const office = offices.find((office) => office.id === id);
    if (!office) return;

    try {
      await axios.put(`/api/offices/${id}`, {
        enabled: !office.enabled,
      });
      setOffices((prevOffices) =>
        prevOffices.map((office) =>
          office.id === id ? { ...office, enabled: !office.enabled } : office
        )
      );
      setSnackbar({
        open: true,
        message: `Office ${office.enabled ? "disabled" : "enabled"} successfully.`,
        severity: "success",
      });
    } catch (err: any) {
      setSnackbar({
        open: true,
        message: err.response?.data?.message || "Failed to update office status.",
        severity: "error",
      });
    }
  };

  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const handleAddOffice = (newOffice: Office) => {
    setOffices((prevOffices) => [...prevOffices, newOffice]);
    setSnackbar({
      open: true,
      message: "New office added successfully.",
      severity: "success",
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#fff",
          padding: "16px 24px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          position: "fixed",
          top: 0,
          height: "60px",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          zIndex: 1000,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "#1A202C",
            fontWeight: 700,
            letterSpacing: "0.5px",
          }}
        >
          Offices
        </Typography>
      </Box>

      <Box
        sx={{
          marginTop: "80px",
          padding: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          minHeight: "calc(100vh - 130px)",
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Grid container spacing={3} justifyContent="center">
            {offices.map((office) => (
              <Grid item xs={12} sm={6} md={4} key={office.id}>
                <Card
                  sx={{
                    textAlign: "center",
                    padding: 2,
                    borderRadius: "20px",
                    height: "220px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      backgroundColor: office.enabled ? "#202a44" : "#b0b0b0",
                      color: "white",
                      borderRadius: "50%",
                      width: 80,
                      height: 80,
                      display: "inline-flex",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "auto",
                      marginTop: 2,
                    }}
                  >
                    {getInitials(office.name)}
                  </Typography>
                  <CardContent>
                    <Typography variant="h6" sx={{ marginBottom: 2 }}>
                      {office.name}
                    </Typography>
                    <Button
                      variant={office.enabled ? "outlined" : "contained"}
                      sx={{
                        borderRadius: "20px",
                        textTransform: "none",
                      }}
                      color={office.enabled ? "error" : "primary"}
                      onClick={() => toggleOfficeStatus(office.id)}
                    >
                      {office.enabled ? "Disable" : "Enable"}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}

            {/* Card to add a new office */}
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  textAlign: "center",
                  padding: 2,
                  borderRadius: "20px",
                  height: "220px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  backgroundColor: "#f0f0f0",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                  },
                }}
                onClick={handleOpenDrawer}
              >
                <CardContent>
                  <Typography variant="h6" color="primary">
                    + Add an Office
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Box>

      {/* AddOfficeDrawer component */}
      <AddOfficeDrawer
        open={drawerOpen}
        onClose={handleCloseDrawer}
        onAddOffice={handleAddOffice} // Pass the handler to update offices
      />

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Offices;
