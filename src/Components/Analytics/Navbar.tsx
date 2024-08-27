import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
const Navbar: React.FC = () => {
  return (
    <AppBar position="static"  sx={{ backgroundColor: 'white' }}>
      <Toolbar>
        {" "}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 ,color:"black"}}>
          Analytics
        </Typography>
        {/* You can add more elements here for navigation or actions */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
