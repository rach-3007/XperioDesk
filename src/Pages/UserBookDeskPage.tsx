import React from "react";
import UserBookDesk from '../Components/UserBookDesk/UserBookDesk'
import { LocalizationProvider } from "@mui/x-date-pickers";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";


const UserBookDeskPage = () => {
  return (
    <div>
<LocalizationProvider dateAdapter={AdapterDateFns}>
      <UserBookDesk/>
    </LocalizationProvider>  
       </div>
  )
}

export default UserBookDeskPage
