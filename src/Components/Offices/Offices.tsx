import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
} from "@mui/material";
import AddOfficeDrawer from "./AddOfficeDrawer";

interface Office {
  id: number;
  name: string;
  enabled: boolean;
}

const officesData: Office[] = [
  { id: 1, name: "Gaythri Office", enabled: true },
  { id: 2, name: "Thejaswini", enabled: false },
];

const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("");
};

const Offices: React.FC = () => {
  const [offices, setOffices] = useState<Office[]>(officesData);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleOfficeStatus = (id: number): void => {
    setOffices((prevOffices) =>
      prevOffices.map((office) =>
        office.id === id ? { ...office, enabled: !office.enabled } : office
      )
    );
  };

  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
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
          height: "50px",
          width: "100vw",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#1A202C",
            fontWeight: 800,
            letterSpacing: "0.5px",
            zIndex: 1000,
          }}
        >
          Offices
        </Typography>
      </Box>

      <Box
        sx={{
          marginTop: "80px",
          padding: 3,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 130px)', // Full height minus top bar and margin
        }}
      >
        <Grid container spacing={3} justifyContent="center">
          {offices.map((office) => (
            <Grid item xs={12} sm={6} md={4} key={office.id}>
              <Card
                sx={{
                  textAlign: "center",
                  padding: 2,
                  borderRadius: "20px",
                  height: "200px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    backgroundColor: "#202a44",
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
                    variant="outlined"
                    sx={{
                      borderRadius: "20px",
                      textTransform: "none",
                    }}
                    color={office.enabled ? "primary" : "secondary"}
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
                height: "200px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                backgroundColor: "#f0f0f0",
                cursor: "pointer",
              }}
              onClick={handleOpenDrawer} // Open the drawer when clicked
            >
              <CardContent>
                <Typography variant="h6" color="primary">
                  + Add an Office
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* AddOfficeDrawer component */}
      <AddOfficeDrawer
        open={drawerOpen}
        onClose={handleCloseDrawer}
      />
    </>
  );
};

export default Offices;
