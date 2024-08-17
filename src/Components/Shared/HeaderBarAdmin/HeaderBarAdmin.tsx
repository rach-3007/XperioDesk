import React from 'react'
import { Box, Container, Typography, Avatar, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface HeaderBarProps {
    title: string;
    username: string; 
  }

const HeaderBarAdmin:React.FC<HeaderBarProps> = ({title,username}) => {
  return (
    <div>
      <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb:0.3,
            backgroundColor: "white",
            padding: "16px 24px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            style={{ color: "#27314B", fontWeight: "bold" }}
            variant="h5"
          >
            {title}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton color="primary">
              <AccountCircleIcon />
            </IconButton>
            <Typography
              style={{ color: "#27314B", fontWeight: "bold" }}
              variant="body1"
            >
              {username}
            </Typography>
          </Box>
        </Box>
    </div>
  )
}

export default HeaderBarAdmin
