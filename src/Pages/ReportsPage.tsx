import React from "react";
import Reports from "../Components/Reports/Reports";
import { LocalizationProvider } from "@mui/x-date-pickers";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const ReportsPage: React.FC = () => {
  return (
    <div>
 <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Reports />
    </LocalizationProvider>    </div>
  );
};

export default ReportsPage;
