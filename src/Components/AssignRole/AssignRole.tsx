// AssignRolePage.tsx

import React, { useState } from "react";
import { Box, } from "@mui/material";
import SearchBar from "./SearchBar";
import UserRolesTable from "./UserRolesTable";
import HeaderBarAdmin from "../Shared/HeaderBarAdmin/HeaderBarAdmin";

const AssignRole: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const username = localStorage.getItem("Amal") || "Amal";
  return (
    <Box sx={{ display: "flex", width: "83vw", overFlowX: "hidden" }}>
      <Box sx={{display:'flex',flexDirection:'column', width: "98.6vw",mb:'10px'}}>
       <HeaderBarAdmin title="Assign Role" username={username}/>
      <Box
        component="main"
        sx={{
           display:'flex',
           flexDirection:'column' ,
          flexGrow: 1,
          pl: 3,
          pr: 3,
          backgroundColor: "#F4F6F8",
          minHeight: "100vh",
        }}
      >
        <Box sx={{pt:3}}>
        <SearchBar onSearch={(term) => setSearchTerm(term)} />
        </Box>
        <UserRolesTable searchTerm={searchTerm} />
      </Box>
      </Box>
    </Box>
  );
};

export default AssignRole;
